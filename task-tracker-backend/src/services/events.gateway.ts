import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEvents } from 'src/utils/socket-events.enum';
import { ConnectMessenger, ConnectTracker, CreateJiraIssue, CreateTrelloIssue, Messenger, RemoveTracker, Tracker } from 'src/utils/types';
import { MessengerService } from './messenger.service';
import { TrackerService } from './tracker.service';

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
    },
    [SocketEvents.CONNECT_TRACKER]: async (payload: ConnectTracker, client: Socket) => {
      await this.trackerService.addTracker(payload);
      client.emit('events', JSON.stringify({ event: SocketEvents.TRACKER_CONNECTED }));
    },
    [SocketEvents.REMOVE_TRACKER]: async (payload: RemoveTracker, client: Socket) => {
      await this.trackerService.removeTracker(payload);
      client.emit('events', JSON.stringify({ event: SocketEvents.TRACKER_REMOVED }));
    },
    [SocketEvents.GET_JIRA_PROJECTS]: async (payload: Tracker, client: Socket) => {
      const res = await this.trackerService.getJiraProjects(payload);
      client.emit('events', JSON.stringify({
        event: SocketEvents.GET_JIRA_PROJECTS,
        payload: {
          data: res.data,
        }
      }));
    },
    [SocketEvents.CREATE_JIRA_ISSUE]: async (payload: CreateJiraIssue, client: Socket) => {
      try {
        const res = await this.trackerService.createJiraIssue(payload);
        client.emit('events', JSON.stringify({
          event: SocketEvents.JIRA_ISSUE_CREATED,
          payload: res.data,
        }))
      } catch (e) {
        console.log(e);
      }
    },
    [SocketEvents.GET_TRELLO_BOARDS]: async (payload: Tracker, client: Socket) => {
      try {
        const res = await this.trackerService.getTrelloBoards(payload);
        client.emit('events', JSON.stringify({
          event: SocketEvents.GET_TRELLO_BOARDS,
          payload: res.data,
        }))
      } catch(e) {
        console.log(e);
      }
    },
    [SocketEvents.CREATE_TRELLO_ISSUE]: async (payload: CreateTrelloIssue, client: Socket) => {
      try {
        const res = await this.trackerService.createTrelloIssue(payload);
        client.emit('events', JSON.stringify({
          event: SocketEvents.TRELLO_ISSUE_CREATED,
          payload: res.data,
        }));
      } catch(e) {
        console.log(e);
      }
    }
  }

  constructor(private messengerService: MessengerService, private trackerService: TrackerService) {
    
  }
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    const event = JSON.parse(payload);
    await this.socketActionsMap[event.event](event.payload, client);
  }
}
