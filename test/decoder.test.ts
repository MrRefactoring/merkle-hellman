import { Decoder, Encoder } from '../out';

describe('Decoder tests', () => {
  it('should be defined', () => {
    const decoder = new Decoder();

    expect(decoder).toBeDefined();
  });

  it('should encode and decode message', () => {
    const decoder = new Decoder();
    const encoder = new Encoder(decoder.publicKey);

    'A B C D E F G H I K L M N O P Q R S T V X Y Z'.split(' ').forEach((sym) => {
      const encodedSymbol = encoder.encode(sym);
      const decodedSymbol = decoder.decode(encodedSymbol);

      expect(sym).toEqual(decodedSymbol);
    });
  });
});
