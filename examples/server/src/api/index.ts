import { getPublicKey } from './publicKey';
import { Router } from 'express';

const router = Router();

router.get('/publicKey', getPublicKey);

export { router };
