import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { MessengerModule } from './modules/messenger.module';
import { StatisticModule } from './modules/statistic.module';
import { TrackerModule } from './modules/tracker.module';
import { AppGateway } from './services/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    MessengerModule,
    TrackerModule,
    // StatisticModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
