import { Encryption, modularInverse } from "./helpers";

export class Decoder {
  private keys: Encryption.IKeys;

  constructor(keys?: Encryption.IKeys) {
    this.keys = keys || Encryption.getKeys();
  }

  public decode(data: number[]): string {
    return data
      .map((number) => {
        number = (number * this.keys.modularInverseOfR) % this.keys.q;

        const binaryRepresentation: number[] = [];

        this.keys.reversedSecret.forEach((element, index) => {
          const i = this.keys.secretKey.length - index - 1;

          if (number >= element) {
            binaryRepresentation[i] = 1;
            number -= element;
          } else {
            binaryRepresentation[i] = 0;
          }
        });

        return String.fromCharCode(parseInt(binaryRepresentation.join('').padStart(8, '0'), 2));
      })
      .join('');
  }

  public get publicKey() {
    return this.keys.publicKey;
  }

  public static from({ secretKey, q, r }: { secretKey: number[], q: number, r: number }): Decoder {
    const publicKey = Encryption.generatePublicKey({ secretKey, q, r });

    return new Decoder({
      publicKey,
      secretKey,
      q,
      r,
      modularInverseOfR: modularInverse(r, q),
      reversedSecret: [...secretKey].reverse(),
    });
  }
}
