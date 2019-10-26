import { Encryption, AdvancedMath } from './helpers';

export class Decoder {
  private keys: Encryption.IKeys;
  private reversedSecret: bigint[];
  private invertedR: bigint;

  constructor(keys?: Encryption.IKeys) {
    this.keys = keys || Encryption.getKeys();
    this.reversedSecret = [...this.keys.secretKey].reverse();
    this.invertedR = AdvancedMath.arithmetic.multiplicativeInverse(this.keys.secretPair.r, this.keys.secretPair.q);
  }

  public decode(data: number[] | bigint[]): string {
    return data
      //@ts-ignore
      .map((dataElement: number | bigint): string => {
        let number = (BigInt(dataElement) * this.invertedR) % this.keys.secretPair.q;

        const binaryRepresentation: number[] = [];

        this.reversedSecret.forEach((element, index) => {
          const i = this.keys.secretKey.length - index - 1;

          if (number >= element) {
            binaryRepresentation[i] = 1;
            number -= element;
          } else {
            binaryRepresentation[i] = 0;
          }
        });

        return String.fromCharCode(parseInt(binaryRepresentation.join('').padStart(16, '0'), 2));
      })
      .join('');
  }

  public get publicKey(): bigint[] {
    return this.keys.publicKey;
  }

  public static from(
    keys: {
      secretKey: bigint[];
      secretPair: { q: bigint, r: bigint };
    }
  ): Decoder {
    return new Decoder({
      ...keys,
      publicKey: Encryption.generatePublicKey(keys.secretKey, keys.secretPair)
    });
  }
}
