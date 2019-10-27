import { AdvancedMath } from '.';

export const coprime = (a: bigint | number, b: bigint | number): boolean => {
  return AdvancedMath.arithmetic.gcd(a, b) === BigInt(1);
};

export const isSuperSequence = (sequence: bigint[]): boolean => {
  let sum = BigInt(0);

  for (const element of sequence) {
    if (element <= sum) {
      return false;
    }

    sum += element;
  }

  return true;
};
