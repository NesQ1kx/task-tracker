import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AirgramService } from './airgram.service';

@WebSocketGateway(9000, {
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(private airgramService: AirgramService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    console.log(client.id);
    this.server.emit('events', payload);
    this.airgramService.run();
  }
}
