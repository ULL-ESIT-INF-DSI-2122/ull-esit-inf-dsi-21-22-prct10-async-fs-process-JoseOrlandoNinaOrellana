import * as yargs from 'yargs';
import { mkdir } from 'fs';

yargs.command({
    command: 'makeDirectory',
    describe: 'Creates a new directory',
    builder: {
        path: {
            describe: 'Path of the directory',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.path === 'string') {
            //comprobar si el path existe
            

            // Creamos el directorio
            mkdir(argv.path, (err) => {
                if(err)
                    return console.error(err);
                else
                    console.log('The directory has been created ');
            });
        }
    },
});

yargs.parse();