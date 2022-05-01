import * as yargs from 'yargs';
import { access, constants } from 'fs';
import { spawn } from 'child_process';

yargs.command({
    command: 'countWords',
    describe: 'Count the words of a file',
    builder: {
        file: {
            describe: 'File',
            demandOption: true,
            type: 'string',
        },
        word: {
            describe: 'Word',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.file === 'string' && typeof argv.word === 'string' ) {
            // Comprobamos si el fichero existe
            access(argv.file, constants.F_OK, (err) => {
                if(err)
                    console.log('File ' + argv.file + ' does not exist');
                else {
                    let output: string = '';
                    
                    // Creamos los procesos
                    const cat = spawn('cat', [`${argv.file}`]);
                    const grep = spawn('grep', [`${argv.word}`]);
                    
                    // Conectamos la salida del cat con el grep
                    cat.stdout.pipe(grep.stdin);

                    // Guadamos la data
                    grep.stdout.on('data', (element) => {
                        output += element;
                    });

                    // Cuando se acaben los procesos contamos la palabras
                    // con una expresión regular
                    grep.on('close', () => {
                        let rg: RegExp = RegExp(argv.word as string, 'gm');
                        let count: number = output.match(rg)?.length as number;

                        console.log(count + ' times in ' + argv.file)
                    })
                }
            })
        }
    },
});

yargs.parse();