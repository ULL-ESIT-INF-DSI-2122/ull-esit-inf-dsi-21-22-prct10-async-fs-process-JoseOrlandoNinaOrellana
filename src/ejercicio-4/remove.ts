import * as yargs from 'yargs';
import { rm } from 'fs';

yargs.command({
    command: 'remove',
    describe: 'Remove a path',
    builder: {
        path: {
            describe: 'Path',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.path === 'string') {
            rm(argv.path, { recursive: true }, (err) => {
                if(err)
                    return console.error(err.message);
                else
                    console.log("File deleted successfully");
            });
        }
    },
});

yargs.parse();