import {
  generatePublic,
  generateSecret,
  generateSecretPair,
  ISecretPair,
} from './generators';

export namespace Encryption {
  export interface IKeys {
    secretKey: bigint[];
    publicKey: bigint[];

    secretPair: ISecretPair;
  }

  export function getKeys(length?: number): IKeys {
    const secretKey = generateSecret(length);
    const secretPair = generateSecretPair(secretKey);
    const publicKey = generatePublic(secretKey, secretPair);

    return {
      secretKey,
      secretPair,
      publicKey,
    };
  }

  export const generatePublicKey = generatePublic;
}
