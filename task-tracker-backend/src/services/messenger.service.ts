import { Injectable } from "@nestjs/common";
import { ConnectMessenger, RemoveMessenger } from "src/utils/types";
import { UserService } from "./user.service";

@Injectable()
export class MessengerService {
  constructor (private userService: UserService) {}

  public async connectMessenger(payload: ConnectMessenger): Promise<void> {
    const messenger = payload.messenger;
    messenger.fingerPrints = [payload.fingerPrint];
    await this.userService.addMessenger(payload.userEmail, payload.messenger);
  }

  public async removeMessenger(payload: RemoveMessenger): Promise<void> {
    await this.userService.removeMessenger(payload.userEmail, payload.messenger);
  }
}