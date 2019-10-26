import {
  Decoder,
  Encoder,
} from './src';

const decoder = new Decoder();
const encoder = new Encoder(decoder.publicKey);

const message = 'Это тестируемое сообщение';

const encodedMessage = encoder.encode(message);

const decodedMessage = decoder.decode(encodedMessage);

console.log(`Исходное сообщение: ${message}`);
console.log(`Закодированное сообщение:`, encodedMessage);
console.log(`Раскодированное сообщение: ${decodedMessage}`);
