import { Encoder, Decoder } from '../out';

describe('Encoder tests', () => {
  it('should be defined', () => {
    const encoder = new Encoder([]);

    expect(encoder).toBeDefined();
  });

  it('should return encoded message', () => {
    const decoder = new Decoder();
    const encoder = new Encoder(decoder.publicKey);

    const message = 'message';
    const encodedMessage = encoder.encode(message);

    const isBigNumberArray = encodedMessage.every(el => typeof el === 'bigint');

    expect(encodedMessage).toHaveLength(message.length);
    expect(isBigNumberArray).toEqual(true);
  });
});
