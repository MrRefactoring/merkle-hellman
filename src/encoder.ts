export class Encoder {
  constructor(private readonly publicKey: bigint[]) { }

  public encode(data: string): bigint[] {
    const output = data.split('').map((char => {
      const binaryRepresentation = char
        .normalize()
        .charCodeAt(0)
        .toString(2)
        .padStart(16, '0');

      return binaryRepresentation
        .split('')
        .reduce((accumulator, bit, index) => accumulator + BigInt(parseInt(bit, 10)) * this.publicKey[index], BigInt(0));
    }));

    return output;
  }
}
