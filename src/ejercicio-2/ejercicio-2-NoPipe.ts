import * as yargs from 'yargs';
import {access, constants } from 'fs';
import { spawn } from 'child_process';

/**
 * Comando countWords si pipe
 */
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
        if(typeof argv.file === 'string' && typeof argv.word === 'string' )
        {
            // Comprobamos si el fichero existe
            access(argv.file, constants.F_OK, (err) => {
                if(err)
                    console.log('File ' + argv.file + ' does not exist');
                else {
                    let output: string = '';
                    
                    // Creamos el proceso grep y le pasamos la palabra
                    // y el nombre del fichero
                    const grep = spawn('grep', [`${argv.word}`, `${argv.file}`]);
                    
                    // Guadamos la data
                    grep.stdout.on('data', (element) => {
                        output += element;
                    });

                    // Cuando se acaben el proceso contamos la palabras
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