import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/dto/create-user.dto";
import { ISuccessLogin } from "src/interfaces/success-login.interface";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  
  public async signup(createUserDto: CreateUserDto): Promise<ISuccessLogin> {
    await this.userService.createUser(createUserDto);
    return {
      accessToken: this.createAccessToken(createUserDto.email)
    };
  }

  public decode(token: string): string {
    return this.jwtService.decode(token)['email'];
  }

  private createAccessToken(email: string): string {
    return this.jwtService.sign({ email });
  }
}