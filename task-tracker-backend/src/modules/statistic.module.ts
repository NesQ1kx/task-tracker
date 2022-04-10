import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticController } from 'src/controllers/statistic.controller';
import { StatisticSchema } from 'src/schemas/statistic.schema';
import { StatisticService } from 'src/services/statistic.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'statistics',  schema: StatisticSchema }]),
    AuthModule
  ],
  providers: [StatisticService],
  exports: [StatisticService],
  controllers: [StatisticController],
})
export class StatisticModule {}