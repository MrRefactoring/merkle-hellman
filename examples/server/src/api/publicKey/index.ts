import { Singleton } from '../../singleton';
import { Decoder } from 'merkle-hellman';

export const getPublicKey = (req: any, res: any) => {
  res.send(Singleton.getInstance(Decoder).publicKey);
};
