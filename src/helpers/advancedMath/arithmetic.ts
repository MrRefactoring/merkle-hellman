const zero = BigInt(0);
const one = BigInt(1);

export function gcd(first: bigint | number, second: bigint | number): bigint {
  let a = BigInt(first);
  let b = BigInt(second);

  while (b != BigInt(0)) {
    const t = a;
    a = b;
    b = t % b;
  }

  return a;
}

export const multiplicativeInverse = (r: bigint | number, q: bigint | number): bigint => {
  let r1 = BigInt(r);
  let q1 = BigInt(q);

  r1 %= q1;

  for (let x = one; x < q1; x++) {
    if ((r1 * x) % q1 == one) {
      return x;
    }
  }

  return zero;
};
