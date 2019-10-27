const zero = BigInt(0);

export const max = (...values: number[] | bigint[]): bigint | undefined => {
  if (values.length === 0) {
    return undefined;
  }

  // @ts-ignore
  return values.reduce((accumulator: bigint, current: number | bigint) =>
    accumulator < current ? BigInt(current) : accumulator
  );
};
