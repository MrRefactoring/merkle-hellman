import * as logic from './logical';
import * as arithmeticMath from './arithmetic';
import * as bigIntMath from './bigInt';
import { randomRange } from './cryptoRandom';

export namespace AdvancedMath {
  export const logical = logic;

  export const crypto = {
    randomRange,
  };

  export const bigint = bigIntMath;

  export const arithmetic = arithmeticMath;
}
