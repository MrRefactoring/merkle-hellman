import { Decoder } from '../out';

describe('Decoder tests', () => {
  it('should be defined', () => {
    const decoder = new Decoder();

    expect(decoder).toBeDefined();
  });
});
