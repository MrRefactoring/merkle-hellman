import * as crypto from 'crypto';
import { Config } from '../../config';

export const randomRange = (min: bigint, max: bigint): bigint => {
  if (min > max) {
    throw Error('The minimum value is greater than the maximum');
  }

  const randomBuffer = crypto.randomBytes(Config.cryptoRandom.bytesLength);

  const randomNumber = BigInt('0x' + randomBuffer.toString('hex'));
  const maxRandomNumber = BigInt(2) ** (BigInt(8) * BigInt(Config.cryptoRandom.bytesLength));

  return (randomNumber * BigInt(max - min) / maxRandomNumber) + min;
};
