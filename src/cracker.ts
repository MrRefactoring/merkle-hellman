import { AdvancedMath } from './helpers';

const one = BigInt(1);
const two = BigInt(2);

export interface ICrackResult {
  secretKey: bigint[];
  secretPair: {
    q: bigint;
    r: bigint;
  };
}

export class Cracker {
  public crack(publicKey: bigint[]): ICrackResult {
    const start = AdvancedMath.bigint.max(...publicKey)! + one;
    const end = (AdvancedMath.bigint.max(...publicKey)! + one) * two;

    for (let q = start; q < end; q++) {
      for (let r = one; r < q - one; r++) {
        if (!AdvancedMath.logical.coprime(r, q)) {
          continue;
        }

        const secretKey = publicKey.map(key => (key * r) % q);

        if (AdvancedMath.logical.isSuperSequence(secretKey)) {
          const sum = secretKey.reduce((accumulator, current) => accumulator + current);

          if (q > sum) {
            return {
              secretKey,
              secretPair: {
                q,
                r: AdvancedMath.arithmetic.multiplicativeInverse(r, q),
              },
            };
          }
        }
      }
    }

    throw Error('Cannot find secret key');
  }
}
