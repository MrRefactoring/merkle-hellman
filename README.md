# Merkle–Hellman knapsack cryptosystem

The Merkle–Hellman knapsack cryptosystem was one of the earliest public key cryptosystems invented by Ralph Merkle and Martin Hellman in 1978. The ideas behind it are simpler than those involving RSA, and it has been broken. Source: [© WikiPedia](https://en.wikipedia.org/wiki/Merkle%E2%80%93Hellman_knapsack_cryptosystem)

# Installation

Via npm:

```bash
npm i markle-hellman
```

via yarn:

```bash
yarn add markle-hellman
```

# ⚠️ Attention!

Do not use this system in projects where a cryptographic encryption algorithm is required. The crypto-system is easy to be cracked

# Usage

Use `Encoder` class and `encode` method for encoding source message 

Use `Decoder` class and `decode` method for decoding encoded message

Use `Cracker` class and `crack` method for getting secret key from public key

# Example

Encoding/Decoding messages:

```typescript
import {
  Decoder,
  Encoder,
} from 'merkle-hellman';

const decoder = new Decoder();
const encoder = new Encoder(decoder.publicKey);

const message = 'Lorem ipsum dolor sit amet.';

const encodedMessage = encoder.encode(message);
const decodedMessage = decoder.decode(encodedMessage);

console.log(`Source message: ${message}`);
console.log(`Encoded message: ${encodedMessage}`);
console.log(`Decoded message: ${decodedMessage}`);
```

Cracking public key:

```typescript
import {
  Decoder,
  Cracker,
  Encoder,
} from 'merkle-hellman';

const q = 881;
const r = 588;
const secretKey = [2, 7, 11, 21, 42, 89, 180, 354];
const publicKey = [295, 592, 301, 14, 28, 353, 120, 236];

const originalDecoder = Decoder.from({ secretKey, q, r });
const encoder = new Encoder(originalDecoder.publicKey);
const cracker = new Cracker();

const secretInfo = cracker.crack(originalDecoder.publicKey);

const crackBaseDecoder = Decoder.from(secretInfo);

const message = 'Lorem ipsum dolor sit amet.';

const encodedMessage = encoder.encode(message);
const decodedMessage = crackBaseDecoder.decode(encodedMessage);

console.log(`Source message: ${message}`);
console.log(`Encoded message: ${encodedMessage}`);
console.log(`Decoded message: ${decodedMessage}`);

console.log();

console.log(`Public key: ${publicKey}`);
console.log(`Secret key: ${secretKey}`);
console.log(`Cracked secret key: ${secretInfo.secretKey}`);
```
