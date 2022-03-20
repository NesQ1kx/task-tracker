import { MessengersType } from "./messenger-types.enum";

export type MessengerEvent = {
  messenger: MessengersType,
  [key: string]: string,
}

export type Messenger = {
  id: number,
  messengerName: string,
  connectDate: number,
  fingerPrints: string[],
}

export type ConnectMessenger = {
  userEmail: string,
  messenger: Messenger,
  fingerPrint: string,
}

export type RemoveMessenger = ConnectMessenger;

export type Tracker = {
  id: number,
  messengerName: string,
  connectDate: number,
  [key: string]: string | number,
}