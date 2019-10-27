import * as path from 'path';
import { Worker } from 'worker_threads';

export class HackingService {
  private keys: Array<Array<bigint>>;
  private publicKeys: Array<Array<bigint>>;
  private callbacks: any[];

  constructor() {
    this.keys = [];
  }

  public addItem(publicKey: Array<bigint>, callback: (err: any, publicKey: any) => void) {
    this.keys.push(publicKey);
    this.callbacks.push(callback);

    const worker = new Worker(path.resolve(__dirname, 'hacker.js'));
    worker.on('error', (err) => callback(err, null));
    worker.on('message', (message) => callback(null, message));
    worker.postMessage(publicKey);
  }
}
