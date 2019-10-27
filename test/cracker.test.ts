import { Cracker, Decoder } from '../out';
import { Encryption } from '../out/helpers';

function isSuperSequence(secretKey: bigint[]): boolean {
  let sum = BigInt(0);

  for (const element of secretKey) {
    if (element <= sum) {
      return false;
    }

    sum += element;
  }

  return true;
}

function amount(array: bigint[]): bigint {
  return array.reduce((accumulator, current) => accumulator + current);
}

function gcd(a: bigint, b: bigint): bigint {
  while (b != BigInt(0)) {
    const t = a;
    a = b;
    b = t % b;
  }

  return a;
}

describe('Cracker tests', () => {
  it('should be defined', () => {
    const cracker = new Cracker();

    expect(cracker).toBeDefined();
  });

  it('should return secret key case 1', () => {
    const cracker = new Cracker();
    const publicKey = [295, 592, 301, 14, 28, 353, 120, 236];

    const { secretKey, secretPair } = cracker.crack(publicKey);
    const isCoprime = gcd(secretPair.r, secretPair.q) === BigInt(1) && gcd(secretPair.q, secretPair.r) === BigInt(1);

    expect(isSuperSequence(secretKey)).toEqual(true);
    expect(secretPair.q > amount(secretKey)).toEqual(true);
    expect(secretPair.q > secretPair.r).toEqual(true);
    expect(isCoprime).toEqual(true);
  });

  it('should return secret key case 2', () => {
    const cracker = new Cracker();
    const publicKey = [53, 106, 92, 50, 100, 80];

    const { secretKey, secretPair } = cracker.crack(publicKey);
    const isCoprime = gcd(secretPair.r, secretPair.q) === BigInt(1) && gcd(secretPair.q, secretPair.r) === BigInt(1);

    expect(isSuperSequence(secretKey)).toEqual(true);
    expect(secretPair.q > amount(secretKey)).toEqual(true);
    expect(secretPair.q > secretPair.r).toEqual(true);
    expect(isCoprime).toEqual(true);
  });

  it('should return secret key case 3', () => {
    const cracker = new Cracker();
    const decoder = new Decoder(Encryption.getKeys(8));

    const { secretKey, secretPair } = cracker.crack(decoder.publicKey);
    const isCoprime = gcd(secretPair.r, secretPair.q) === BigInt(1) && gcd(secretPair.q, secretPair.r) === BigInt(1);

    expect(secretKey).toHaveLength(8);
    expect(decoder.publicKey).toHaveLength(8);
    expect(isSuperSequence(secretKey)).toEqual(true);
    expect(secretPair.q > amount(secretKey)).toEqual(true);
    expect(secretPair.q > secretPair.r).toEqual(true);
    expect(isCoprime).toEqual(true);
  });

  // Performance issue
  it.skip('should return secret key case 4', () => {
    const cracker = new Cracker();
    const decoder = new Decoder();

    const { secretKey, secretPair } = cracker.crack(decoder.publicKey);
    const isCoprime = gcd(secretPair.r, secretPair.q) === BigInt(1) && gcd(secretPair.q, secretPair.r) === BigInt(1);

    expect(secretKey).toHaveLength(16);
    expect(decoder.publicKey).toHaveLength(16);
    expect(isSuperSequence(secretKey)).toEqual(true);
    expect(secretPair.q > amount(secretKey)).toEqual(true);
    expect(secretPair.q > secretPair.r).toEqual(true);
    expect(isCoprime).toEqual(true);
  });
});
