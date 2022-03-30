import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from 'src/services/auth.service';
import { Request, Response } from 'express';
import { SignupConfirmDto } from 'src/dto/signup-confirm.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SigninUserDto } from 'src/dto/signin-user.dto';
import { UpdateUserSettingsDto } from 'src/dto/update-user-settings.dto';

@Controller('/api/v1/auth')
export class AuthContrloller {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public async signup(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const { authToken } = await this.authService.signup(createUserDto);
    response.json({ authToken });
  }

  @Post('signin')
  public async signin(
    @Body() signinUserDto: SigninUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const { authToken } = await this.authService.signin(signinUserDto);
    response.json({ authToken });
  }

  @UseGuards(JwtAuthGuard)
  @Post('confirm')
  public async confirm(
    @Body() signupConfirmDto: SignupConfirmDto,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const authToken = request.headers.authorization.split('Bearer ')[1];
    const res = await this.authService.signupConfirm(
      signupConfirmDto,
      authToken.trim(),
    );
    response.json(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getUser(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const authToken = request.headers.authorization.split('Bearer ')[1];
    const userProfile = await this.authService.getUserProfile(authToken);

    response.json({ userProfile });
  }

  @UseGuards(JwtAuthGuard)
  @Post('settings')
  public async updateUserSettings(
    @Req() request: Request,
    @Res() res: Response,
    @Body() updateUserSettingsDto: UpdateUserSettingsDto
  ): Promise<void> {
    const authToken = request.headers.authorization.split('Bearer ')[1];
    const response = await this.authService.updateUserSettings(authToken.trim(), updateUserSettingsDto);

    res.json(response);
  }
}
