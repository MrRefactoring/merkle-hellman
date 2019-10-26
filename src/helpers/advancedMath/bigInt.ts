const zero = BigInt(0);

export const max = (...values: bigint[]): bigint | undefined => {
  if (values.length === 0) {
    return undefined;
  }

  return values.reduce((accumulator, current) =>
    accumulator < current ? current : accumulator
  );
};
