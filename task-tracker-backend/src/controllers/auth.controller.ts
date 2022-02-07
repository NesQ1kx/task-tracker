import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { AuthService } from "src/services/auth.service";
import { Request, response, Response } from 'express';
import { SignupConfirmDto } from "src/dto/signup-confirm.dto";
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post('confirm')
  public async confirm(
    @Body() signupConfirmDto: SignupConfirmDto,
    @Res() response: Response,
    @Req() request: Request, 
  ): Promise<void> {
    const authToken = request.headers.authorization.split('Bearer ')[1];
    const res = await this.authService.signupConfirm(signupConfirmDto, authToken.trim());
    response.json(res);
  }
}