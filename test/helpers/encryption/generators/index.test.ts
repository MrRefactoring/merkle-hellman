import * as generators from '../../../../out/helpers/encryption/generators';

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

function gcd(a: bigint, b: bigint): bigint {
  while (b != BigInt(0)) {
    const t = a;
    a = b;
    b = t % b;
  }

  return a;
}

describe('Encryption generators tests', () => {
  describe('Secret key generation', () => {
    it('should return secret key array', () => {
      const secretKey = generators.generateSecret();

      expect(secretKey).toBeDefined();
      expect(Array.isArray(secretKey)).toEqual(true);
    });

    it('should be a super sequence', () => {
      const secretKey = generators.generateSecret();

      expect(isSuperSequence(secretKey)).toEqual(true);
    });

    describe('Key length', () => {
      it('should return 16 items', () => {
        const secretKey = generators.generateSecret();

        expect(secretKey).toHaveLength(16);
      });

      it('should return 16 items with 0 as argument', () => {
        const secretKey = generators.generateSecret(0);

        expect(secretKey).toHaveLength(16);
        expect(isSuperSequence(secretKey)).toEqual(true);
      });

      it('should return 2 items', () => {
        const secretKey = generators.generateSecret(2);

        expect(secretKey).toHaveLength(2);
        expect(isSuperSequence(secretKey)).toEqual(true);
      });

      it('should return 128 items', () => {
        const secretKey = generators.generateSecret(128);

        expect(secretKey).toHaveLength(128);
        expect(isSuperSequence(secretKey)).toEqual(true);
      });
    });
  });

  describe('Secret pair generation', () => {
    it('should return key pair', () => {
      const secretKey = generators.generateSecret();
      const secretPair = generators.generateSecretPair(secretKey);

      expect(secretPair).toBeDefined();
      expect(secretPair.q).toBeDefined();
      expect(secretPair.r).toBeDefined();
    });

    it('q must be greater than the secret key amount', () => {
      const secretKey = generators.generateSecret();
      const secretPair = generators.generateSecretPair(secretKey);
      const amount = secretKey.reduce((accumulator, current) => accumulator + current);

      expect(secretPair.q > amount).toEqual(true);
    });

    it('q must be greater than the secret key amount (128 length key)', () => {
      const secretKey = generators.generateSecret(128);
      const secretPair = generators.generateSecretPair(secretKey);
      const amount = secretKey.reduce((accumulator, current) => accumulator + current);

      expect(secretPair.q > amount).toEqual(true);
    });

    it('q must be greater than the r', () => {
      const secretKey = generators.generateSecret();
      const secretPair = generators.generateSecretPair(secretKey);

      expect(secretPair.q > secretPair.r).toEqual(true);
    });

    it('q must be coprime with r', () => {
      const secretKey = generators.generateSecret();
      const { q, r } = generators.generateSecretPair(secretKey);

      const isCoprime = gcd(r, q) === BigInt(1) && gcd(q, r) === BigInt(1);

      expect(isCoprime).toEqual(true);
    });
  });

  describe('Public key generation', () => {
    it('should be defined', () => {
      const secretKey = generators.generateSecret();
      const secretPair = generators.generateSecretPair(secretKey);
      const publicKey = generators.generatePublic(secretKey, secretPair);

      expect(publicKey).toBeDefined();
      expect(Array.isArray(publicKey)).toEqual(true);
    });

    it('should have 16 length', () => {
      const secretKey = generators.generateSecret(16);
      const secretPair = generators.generateSecretPair(secretKey);
      const publicKey = generators.generatePublic(secretKey, secretPair);

      expect(publicKey).toHaveLength(16);
    });

    it('should have 128 length', () => {
      const secretKey = generators.generateSecret(128);
      const secretPair = generators.generateSecretPair(secretKey);
      const publicKey = generators.generatePublic(secretKey, secretPair);

      expect(publicKey).toHaveLength(128);
    });
  });
});
