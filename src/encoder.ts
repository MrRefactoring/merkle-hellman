export class Encoder {
  constructor(private readonly publicKey: number[]) { }

  public encode(data: string): number[] {
    const output = data.split('').map((char => {
      const binaryRepresentation = char
        .normalize()
        .charCodeAt(0)
        .toString(2)
        .padStart(8, '0');

      return binaryRepresentation
        .split('')
        .reduce((accumulator, bit, index) => accumulator + parseInt(bit, 10) * this.publicKey[index], 0);
    }));

    return output;
  }
}
