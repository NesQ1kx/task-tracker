import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TrackerService } from 'src/services/tracker.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, HttpModule],
  providers: [TrackerService],
  exports: [TrackerService],
})
export class TrackerModule {}