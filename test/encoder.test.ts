import { Encoder, Decoder } from '../out';

describe('Encoder tests', () => {
  it('should be defined', () => {
    const encoder = new Encoder([]);

    expect(encoder).toBeDefined();
  });
});
