import * as yargs from 'yargs';
import { WatcherNotes } from './WatcherNotes';

const watcher = new WatcherNotes();

yargs.command({
    command: 'watcherUserNotes',
    describe: 'Watch all notes of an user',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.user=== 'string')
        {
            watcher.watchFolderUser('./src/ejercicio-3/notes/' + argv.user);
        }
    },
});

yargs.parse();