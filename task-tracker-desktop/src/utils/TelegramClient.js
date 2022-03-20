import TdClient from 'tdweb';

export class TelegramClient {
  constructor() {
    this.client = new TdClient({
      readOnly: false,
      mode: 'wasm',
      useDatabase: false,
      jsLogVerbosityLevel: 2,
    });
  }

  async init() {
    await this.client.send({
      '@type': 'setTdlibParameters',
      parameters: {
        use_test_dc: false,
        api_id: 17854937,
        api_hash: '2cc35d700aba4ebb081a582e5a4e70c7',
        use_message_database: false,
        use_file_database: false,
        use_secret_chats: false,
        system_language_code: 'en',
        device_model: 'Task Tracker',
        application_version: '0.1',
      }
    });
  }

  onUpdate(cb) {
    this.client.onUpdate = cb;
  }

  async sendRequest(data) {
    await this.client.send(data);
  }
}