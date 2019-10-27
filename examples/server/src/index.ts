import { router } from './api';
import * as express from 'express';

const app = express();

app.use(router);

app.listen(8080, () => console.log('Server are started on http://localhost:8080'));
