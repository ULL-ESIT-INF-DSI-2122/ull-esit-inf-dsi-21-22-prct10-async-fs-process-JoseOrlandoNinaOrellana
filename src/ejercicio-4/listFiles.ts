import * as yargs from 'yargs';
import { lstatSync, readdir, lstat } from 'fs';

yargs.command({
    command: 'listFiles',
    describe: 'List files of a directoty',
    builder: {
        path: {
            describe: 'Path of the directory',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.path === 'string') {
            // Comprobamos si el path existe
            if(!lstatSync(argv.path).isDirectory())
                console.log('The path is not a directory');
            else {
                // Leemos los nombres de los ficheros del directorio
                readdir(argv.path, (err, files) => {
                    if(err)
                        return console.error(err.message);
                    else {
                        files.forEach(file => {
                        console.log(file);
                        });
                    }
                });
            }
        }
    },
});

yargs.parse();