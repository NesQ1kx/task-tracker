import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { AirgramService } from './services/airgram.service';
import { AppGateway } from './services/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
  ],
  controllers: [],
  providers: [AppGateway, AirgramService],
})
export class AppModule {}
