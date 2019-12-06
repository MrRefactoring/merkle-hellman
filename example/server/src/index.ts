import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as cors from 'cors';
import { Decoder, Encoder } from 'merkle-hellman';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const decoder = new Decoder();

const clients: { nickname: string; ws: WebSocket, publicKey: bigint[] }[] = [];

const replacer = (_, value) => {
  if (typeof value === 'bigint') {
    return value.toString() + 'n';
  } else {
    return value;
  }
}

const reviver = (_: any, value: any) => {
  if (typeof value === 'string' && /^\d+n$/.test(value)) {
    // @ts-ignore
    return BigInt(value.slice(0, value.length - 1));
  }

  return value;
}

const makeId = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

app.use(cors());

wss.on('connection', (ws: WebSocket) => {
  ws['id'] = makeId(6);

  ws.on('message', (message: string) => {
    const decodedMessage = decoder.decode(JSON.parse(message, reviver));
    const { command, data, publicKey } = JSON.parse(decodedMessage, reviver);

    switch (command) {
      case 'nickname':
        clients.push({ nickname: data, ws, publicKey });

        clients.forEach(client => {
          const encoder = new Encoder(client.publicKey);
          client.ws.send(JSON.stringify(encoder.encode(JSON.stringify({ command: 'join', data })), replacer))
        });
        break;
      case 'message':
        const { nickname } = clients.find(client => client.ws['id'] === ws['id']);

        clients.forEach(client => {
          const encoder = new Encoder(client.publicKey);
          client.ws.send(JSON.stringify(encoder.encode(JSON.stringify({ command: 'message', data: { owner: nickname, message: data } })), replacer));
        });
        break;
    }
  });
});

app.get('/public', (req, res) => {
  res.send(JSON.stringify(decoder.publicKey, replacer));
});

server.listen(9000, () => console.log('http://localhost:9000'));
