import { Encryption } from '../../../out/helpers/encryption';

describe('Encryption tests', () => {
  it('should define all properties', () => {
    const keys = Encryption.getKeys();

    expect(keys).toBeDefined();

    expect(keys.secretKey).toBeDefined();
    expect(keys.secretPair).toBeDefined();
    expect(keys.publicKey).toBeDefined();

    expect(Array.isArray(keys.secretKey)).toEqual(true);
    expect(Array.isArray(keys.publicKey)).toEqual(true);

    expect(keys.secretPair.q).toBeDefined();
    expect(keys.secretPair.r).toBeDefined();
  });
});
