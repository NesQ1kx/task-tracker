import { Module } from '@nestjs/common';
import { MessengerService } from 'src/services/messenger.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: [MessengerService],
  exports: [MessengerService],
})
export class MessengerModule {}