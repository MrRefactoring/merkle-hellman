import axios from 'axios';
import * as express from 'express';
import { Constants } from './constants';
import { joinUrl } from './helpers';
import { HackingService } from './services/hackingService';

void (async () => {
  const app = express();

  const hackingService = new HackingService();
  const serverPublicKey = (await axios.get(joinUrl(Constants.realServerUrl, 'publicKey'))).data;

  hackingService.addItem(serverPublicKey, (err, secretKey) => { console.log(err, secretKey); });

  app.listen(4040, () => console.log('Server are started on http://localhost:4040'));
})();
