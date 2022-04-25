import {connect} from 'net';
import {MessageEventEmitterClient} from './eventEmitterClient';

const client = new MessageEventEmitterClient(connect({port: 60300}));

client.on('message', (message) => {
  if (message.type === 'watch') {
    console.log(`Connection established: watching file ${message.file}`);
  } else if (message.type === 'cut') {
    console.log('File has been cuted.');
    console.log(`Result of cut: ${message.resultCut}`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});