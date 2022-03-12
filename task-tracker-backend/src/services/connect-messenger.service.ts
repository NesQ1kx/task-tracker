import { Injectable } from "@nestjs/common";
import { ConnectMessenger } from "src/utils/types";
import { UserService } from "./user.service";

@Injectable()
export class ConnectMessengerService {
  constructor (private userService: UserService) {}

  public async connectMessenger(payload: ConnectMessenger): Promise<void> {
    await this.userService.addMessenger(payload.userEmail, payload.messenger);
  }
}