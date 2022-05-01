import { existsSync, watch } from 'fs';
import { spawn } from 'child_process';

export class WatcherNotes {
    watchFolderUser(path: string) {
        watch(path, (eventType, fileName) => {
            if(eventType === 'rename')
            {
                if(existsSync(path + '/' + fileName))
                {
                    console.log('Se ha creado ' + fileName);
                    this.viewFile(path + '/' + fileName);
                }
                else
                    console.log('Se ha borrado ' + fileName);
            }
            else if(eventType === 'change')
            {
                console.log('Se ha modificado ' + fileName);
                this.viewFile(path + '/' + fileName);
            }
        });
    }

    viewFile(fileName: string) {
        const cat = spawn('cat', [`${fileName}`]);
        console.log('Contenido de ' + fileName + ':');

        let output: string = '';
        cat.stdout.on('data', (element) => {
            output += element;
        });

        cat.stdout.on('close', () => {
            console.log(output);
        });
    }
}