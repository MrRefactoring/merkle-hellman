import {
  Decoder,
  Encoder,
  Cracker
} from '../src';

describe('Integration test', () => {
  it('Decoder + Encoder + Cracker test', () => {
    // arrange

    const originalDecoder = new Decoder();
    const encoder = new Encoder(originalDecoder.publicKey);
    const cracker = new Cracker();

    const secretInfo = cracker.crack(originalDecoder.publicKey);

    const crackBaseDecoder = Decoder.from(secretInfo);

    const sourceMessage = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,';

    // act

    const encodedMessage = encoder.encode(sourceMessage);
    const decodedMessage = crackBaseDecoder.decode(encodedMessage);

    // assert

    expect(decodedMessage).toEqual(sourceMessage);
  });
});
