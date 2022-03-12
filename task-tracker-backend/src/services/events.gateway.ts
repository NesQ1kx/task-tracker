import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEvents } from 'src/utils/socket-events.enum';
import { ConnectMessenger } from 'src/utils/types';
import { ConnectMessengerService } from './connect-messenger.service';

@WebSocketGateway(9000, {
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  private socketActionsMap = {
    [SocketEvents.CONNECT_MESSENGER]: async (payload: ConnectMessenger) => this.connectMessengerService.connectMessenger(payload),
  }

  constructor(private connectMessengerService: ConnectMessengerService) {
    
  }
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    const event = JSON.parse(payload);
    await this.socketActionsMap[event.event](event.payload);
    client.emit('events', JSON.stringify({ event: SocketEvents.MESSENGER_CONNECTED }));
  }
}
