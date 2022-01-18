import { Body, Controller, Post, Res } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { AuthService } from "src/services/auth.service";
import { Request, Response } from 'express';

@Controller('/api/v1/auth')
export class AuthContrloller {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public async signup(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const { accessToken } = await this.authService.signup(createUserDto);
    response.json({ accessToken });
  }
}