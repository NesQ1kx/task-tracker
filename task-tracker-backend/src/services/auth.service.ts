import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SigninUserDto } from 'src/dto/signin-user.dto';
import { SignupConfirmDto } from 'src/dto/signup-confirm.dto';
import { ISuccessLogin } from 'src/interfaces/success-login.interface';
import { ISuccessOperation } from 'src/interfaces/success-operation.interface';
import { User } from 'src/schemas/user.schema';
import { StatusCodes } from 'src/utils/status-codes.enum';
import { MailService } from './mail.service';
import { UserService } from './user.service';

const CODE_LENGTH = 6;
@Injectable()
export class AuthService {
  private usersCodesMap: Map<string, string> = new Map<string, string>();

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  public async signup(createUserDto: CreateUserDto): Promise<ISuccessLogin> {
    const userDto = { ...createUserDto };
    const isUserExist = await this.userService.isUserExist(userDto.email);
    if (isUserExist) {
      throw new HttpException(
        { statusCode: StatusCodes.USER_EXIST },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      userDto.isConfirmed = false;
      await this.userService.createUser(userDto);
      const confirmationCode = this.generateConfirmationCode();
      this.usersCodesMap.set(userDto.email, confirmationCode);
      await this.mailService.sendConfirmationCode(
        confirmationCode,
        userDto.email,
      );
      return {
        authToken: this.createAuthToken(userDto.email),
      };
    }
  }

  public async signin(signinUserDto: SigninUserDto): Promise<ISuccessLogin> {
    const userDto = { ...signinUserDto };
    const isUserExist = await this.userService.isUserExist(userDto.email);
    if (isUserExist) {
      const user = await this.userService.getUserByEmail(userDto.email);

      if (
        this.userService.checkUserPassword(
          user.password,
          await this.userService.generateHash(userDto.password),
        )
      ) {
        return {
          authToken: this.createAuthToken(userDto.email),
        };
      } else {
        throw new HttpException(
          { statusCode: StatusCodes.INVALID_EMAIL_OR_PASSWORD },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        { statusCode: StatusCodes.INVALID_EMAIL_OR_PASSWORD },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async signupConfirm(
    signupConfirmDto: SignupConfirmDto,
    authToken: string,
  ): Promise<ISuccessOperation> {
    const { code } = signupConfirmDto;
    const email = this.decode(authToken);

    if (code === this.usersCodesMap.get(email)) {
      await this.userService.updateConfirmationStatus(email);
      this.usersCodesMap.delete(email);
      return {
        statusCode: StatusCodes.CONFIRM_SUCESS,
      };
    } else {
      throw new HttpException(
        { statusCode: StatusCodes.INVALID_CONFIRMATION_CODE },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getUserProfile(
    authToken: string,
  ): Promise<Exclude<User, 'password'>> {
    const email = this.decode(authToken);
    return await this.userService.getUserData(email);
  }

  private decode(token: string): string {
    return this.jwtService.decode(token)['email'];
  }

  private createAuthToken(email: string): string {
    return this.jwtService.sign({ email });
  }

  private generateConfirmationCode(): string {
    let code = '';

    for (let i = 0; i < CODE_LENGTH; i++) {
      code += Math.floor(Math.random() * 10);
    }

    return code;
  }
}
