import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthContrloller } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { UserModule } from './user.module';
import * as dotenv from 'dotenv';
import { MailModule } from './mail.module';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRATION_TIME,
      }
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AuthContrloller],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
