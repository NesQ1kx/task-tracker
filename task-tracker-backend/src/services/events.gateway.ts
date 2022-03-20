import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEvents } from 'src/utils/socket-events.enum';
import { ConnectMessenger, Messenger } from 'src/utils/types';
import { MessengerService } from './messenger.service';

@WebSocketGateway(9000, {
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  private socketActionsMap = {
    [SocketEvents.CONNECT_MESSENGER]: async (payload: ConnectMessenger, client: Socket) => {
      await this.messengerService.connectMessenger(payload);
      client.emit('events', JSON.stringify({ event: SocketEvents.MESSENGER_CONNECTED }));
    },
    [SocketEvents.REMOVE_MESSENGER]: async (payload: ConnectMessenger, client: Socket) => {
      await this.messengerService.removeMessenger(payload);
      client.emit('events', JSON.stringify({ event: SocketEvents.MESSENGER_REMOVED, id: payload.messenger.id }));
    }
  }

  constructor(private messengerService: MessengerService) {
    
  }
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    const event = JSON.parse(payload);
    await this.socketActionsMap[event.event](event.payload, client);
  }
}
