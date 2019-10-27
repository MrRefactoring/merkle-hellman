const { Cracker } = require('merkle-hellman');
const { parentPort } = require('worker_threads');

parentPort.once('message', (publicKey) => {
  const cracker = new Cracker();

  try {
    const data = cracker.crack(publicKey);
    parentPort.emit('message', data);
  } catch(e) {
    parentPort.emit('error', e);
  }
});
