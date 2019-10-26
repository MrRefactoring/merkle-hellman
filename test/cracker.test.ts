import { Cracker } from '../out';

describe('Cracker tests', () => {
  it('should be defined', () => {
    const cracker = new Cracker();

    expect(cracker).toBeDefined();
  });
});
