import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(9000, {
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  handleMessage(client: Socket, payload: string): void {
    console.log(client.id);
    this.server.emit('events', payload);
  }


}