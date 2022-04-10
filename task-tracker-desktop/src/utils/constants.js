export const AVAILABLE_MESSENGERS = [
  {
    id: 1,
    name: "Telegram",
    isAvailable: true,
    connectComponentName: "ConnectTelegram"
  },
  {
    id: 2,
    name: "Whatsapp",
    isAvailable: true,
    connectComponentName: "ConnectWhatsapp"
  },
  {
    id: 3,
    name: "VK",
    isAvailable: false,
    connectComponentName: "ConnectVK"
  }
]

export const SOCKET_EVENTS = {
  MESSENGER_CONNECTED: 'MESSENGER_CONNECTED',
  MESSENGER_REMOVED: 'MESSENGER_REMOVED',
  TRACKER_CONNECTED: 'TRACKER_CONNECTED',
  TRACKER_REMOVED: 'TRACKER_REMOVED',
  GET_JIRA_PROJECTS: 'GET_JIRA_PROJECTS',
  JIRA_ISSUE_CREATED: 'JIRA_ISSUE_CREATED',
  GET_TRELLO_BOARDS: 'GET_TRELLO_BOARDS',
  TRELLO_ISSUE_CREATED: 'TRELLO_ISSUE_CREATED',
}

export const AVAILABLE_TRACKERS = [
  {
    id: 1,
    name: "Jira",
    connectComponentName: "ConnectJira",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Trello",
    connectComponentName: "ConnectTrello",
    isAvailable: true,
  }
]