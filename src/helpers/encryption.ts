import { Random } from './random';
import { modularInverse } from './modularInverse';

const generateSecret = (): number[] => {
  let sum = 0;

  return Array(8).fill(0).map(() => {
    const current = Random.getRandomInteger((sum + 1), (sum + 1) * 2);

    sum += current;

    return current;
  });
};

export namespace Encryption {
  export interface IKeys {
    reversedSecret: number[];
    secretKey: number[];
    publicKey: number[];
    q: number;
    r: number;
    modularInverseOfR: number;
  }

  export const generatePublicKey = (
    {
      secretKey,
      q,
      r,
    }: {
      secretKey: number[];
      q: number;
      r: number;
    }
  ): number[] => {
    return secretKey.map(key => (key * r) % q);
  };

  export const getKeys = (): IKeys => {
    const q = 79627;
    const r = 38329;

    const secretKey = generateSecret();
    const publicKey = generatePublicKey({ secretKey, q, r });
    const reversedSecret = [...secretKey].reverse();
    const modularInverseOfR = modularInverse(r, q);

    return {
      modularInverseOfR,
      reversedSecret,
      secretKey,
      publicKey,
      q,
      r,
    };
  };
}
