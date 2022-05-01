import * as yargs from 'yargs';
import { readFile } from 'fs';

yargs.command({
    command: 'read',
    describe: 'Read the content of a file',
    builder: {
        path: {
            describe: 'Path',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.path === 'string') {
            readFile(argv.path, 'utf8' , (err, data) => {
                if(err)
                    return console.error(err.message);
                else
                    console.log(data);
            });
        }
    },
});

yargs.parse();