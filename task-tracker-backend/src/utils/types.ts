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
  trackerName: string,
  connectDate: number,
  [key: string]: string | number,
}

export type ConnectTracker = {
  userEmail: string,
  tracker: Tracker,
}

export type RemoveTracker = ConnectTracker;

export type JiraIssue = {
  summary: string,
  projectId: string,
  description: string,
}

export type CreateJiraIssue = JiraIssue & Tracker;

export type TrelloIssue = {
  listId: string,
  taskName: string,
  description: string,
}

export type CreateTrelloIssue = TrelloIssue & Tracker;