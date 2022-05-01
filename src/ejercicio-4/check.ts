import * as yargs from 'yargs';
import { lstat } from 'fs';

yargs.command({
    command: 'check',
    describe: 'Check if a path is a file or directory',
    builder: {
        path: {
            describe: 'Path',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.path === 'string') {
            lstat(argv.path, (err, stats) => {
                if(err)
                    return console.error(err.message);
                else {
                    if(stats.isFile())
                        console.log('The path is a file');
                    else if (stats.isDirectory())
                        console.log('The path is a directory');
                    else
                        console.log('The path is neither a directory nor a file.')
                }
            });
        }
    },
});

yargs.parse();