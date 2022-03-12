import { MessengersType } from "./messenger-types.enum";

export type MessengerEvent = {
  messenger: MessengersType,
  [key: string]: string,
}

export type Messenger = {
  id: number,
  messengerName: string,
}

export type ConnectMessenger = {
  userEmail: string,
  messenger: Messenger,
}