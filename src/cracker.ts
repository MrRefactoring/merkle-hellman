import { modularInverse } from "./helpers";

export class Cracker {
  public crack(publicKey: number[]): { secretKey: number[], q: number, r: number } {
    const range = this.generateRange(
      Math.max(...publicKey) + 1,
      (Math.max(...publicKey) + 1) * 2
    );

    for (const q of range) {
      const rRange = this.generateRange(1, q - 1);

      for (const r of rRange) {
        if (!this.coprime(r, q)) {
          continue;
        }

        const secretKey = publicKey.map(key => (key * r) % q);

        if (this.isSuperSequence(secretKey)) {
          const sum = secretKey.reduce((accumulator, current) => accumulator + current);

          if (q > sum) {
            return { secretKey, q, r: modularInverse(r, q) };
          }
        }
      }
    };

    throw new Error('Cannot find secret key');
  }

  private generateRange(start: number, end: number): number[] {
    return Array(end - start + 1)
      .fill(0)
      .map((_, index) => index + start);
  }

  private coprime(a: number, b: number): boolean {
    return this.gcd(a, b) === 1;
  }

  private isSuperSequence(sequence: number[]): boolean {
    let sum = 0;

    for (const element of sequence) {
      if (element <= sum) {
        return false;
      }

      sum += element;
    }

    return true;
  }

  private gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) { var temp = a; a = b; b = temp; }
    while (true) {
      if (b == 0) return a;
      a %= b;
      if (a == 0) return b;
      b %= a;
    }
  }
}
