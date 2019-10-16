export const modularInverse = (r: number, q: number) => {
  r %= q;

  for (let x = 1; x < q; x++) {
    if ((r * x) % q == 1) {
      return x;
    }
  }

  return 0;
};
