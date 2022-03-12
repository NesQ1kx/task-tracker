import { Module } from '@nestjs/common';
import { ConnectMessengerService } from 'src/services/connect-messenger.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: [ConnectMessengerService],
  exports: [ConnectMessengerService],
})
export class MessengerModule {}