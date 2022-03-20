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
    isAvailable: false,
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
    isAvailable: false,
  }
]