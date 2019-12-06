import { Decoder, Encoder } from 'merkle-hellman';

export type Handler = (message: Message) => void;

export interface Message {
  date: Date;
  text: string;
  nickname: string;
}

export class Messenger {
  private nickname: string;
  private messages: Message[];
  private handlers: Handler[];
  private client: WebSocket;
  private decoder: Decoder | undefined;
  private encoder: Encoder | undefined;

  constructor(nickname: string) {
    this.handlers = [];
    this.messages = [];
    this.nickname = nickname;

    this.client = new WebSocket('ws://localhost:9000');
  }

  public async init() {
    const publicKeyString = await (await fetch('http://localhost:9000/public')).text();
    const publicKey = JSON.parse(publicKeyString, this.reviver);

    return new Promise((resolve) => {
      this.decoder = new Decoder();
      this.encoder = new Encoder(publicKey);

      while (this.client.readyState !== this.client.OPEN);

      this.client.addEventListener('message', (event) => this.receiveMessage(JSON.parse(this.decoder!.decode(JSON.parse(event.data, this.reviver)), this.reviver)));

      this.client.send(
        JSON.stringify(
          this.encoder!.encode(
            JSON.stringify({
              command: 'nickname',
              data: this.nickname,
              publicKey: this.decoder!.publicKey,
            }, this.replacer)),
          this.replacer
        )
      );

      resolve();
    });
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public sendMessage(text: string): void {
    while (this.client.readyState !== this.client.OPEN);
    this.client.send(
      JSON.stringify(
        this.encoder!.encode(
          JSON.stringify({
            command: 'message',
            data: text,
            publicKey: this.decoder!.publicKey,
          }, this.replacer)),
        this.replacer
      )
    );
  }

  public onMessageReceived(handler: Handler): void {
    this.handlers.push(handler);
  }

  private receiveMessage({ command, data }: { command: string; data: any; }): void {
    if (command === 'message') {
      const message: Message = {
        text: data.message,
        date: new Date(),
        nickname: data.owner,
      };

      this.messages.push(message);
      try {
        this.handlers.forEach(handler => handler(message));
      } catch (e) {
        // ignore
      }
    }
  }

  private replacer(_: any, value: any) {
    if (typeof value === 'bigint') {
      return `${value.toString()}n`;
    }

    return value;
  }

  private reviver(_: any, value: any) {
    if (typeof value === 'string' && /^\d+n$/.test(value)) {
      // @ts-ignore
      return BigInt(value.slice(0, value.length - 1));
    }

    return value;
  }
}
