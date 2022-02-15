import { Injectable } from '@nestjs/common';
import { Airgram, Auth, toObject } from 'airgram';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AirgramService {
  public async run(): Promise<void> {
    const airgram = new Airgram({
      apiHash: process.env.TELEGRAM_API_HASH,
      apiId: Number(process.env.TELEGRAM_API_ID),
      command: process.env.TDLIB_COMMAND,
      logVerbosityLevel: 2,
    });

    const auth = new Auth({
      // code: '32398',
      phoneNumber: '+79675081489',
    });

    airgram.use(auth);
    airgram.on('updateNewMessage', async ({ update }, next) => {
      const { message } = update;
      console.log('[new message]', message.content['text']);
      return next();
    });
  }
}
