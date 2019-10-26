import { Config } from '../../../config';
import { AdvancedMath } from '../../advancedMath';
import { ISecretPair } from './iSecretPair';

const zero = BigInt(0);
const one = BigInt(1);
const two = BigInt(2);

export const generateSecret = (length?: number): bigint[] => {
  length = length || Config.keyLength;

  let sum = zero;

  return Array(length).fill(zero).map(() => {
    const current = AdvancedMath.crypto.randomRange(sum + one, (sum + one) * two);

    sum += current;

    return current;
  });
};

export const generateSecretPair = (secretKey: bigint[]): ISecretPair => {
  const sum = secretKey.reduce((accumulator, current) => accumulator + current);

  const genNewQ = () => AdvancedMath.crypto.randomRange(sum + one, (sum + one) * two);
  const genNewR = () => AdvancedMath.crypto.randomRange(one, q - one);

  let q = genNewQ();
  let r = genNewR();

  while (!AdvancedMath.logical.coprime(r, q)) {
    q = genNewQ();
    r = genNewR();
  }

  return { q, r };
};

export const generatePublic = (secretKey: bigint[], secretPair: ISecretPair): bigint[] => {
  return secretKey.map(value => (value * secretPair.r) % secretPair.q);
};

export * from './iSecretPair';
