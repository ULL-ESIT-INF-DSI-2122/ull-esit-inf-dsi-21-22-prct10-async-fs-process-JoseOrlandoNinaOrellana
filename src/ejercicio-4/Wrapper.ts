import { spawn } from 'child_process';
import { lstatSync, readdir, lstat, mkdir, readFile, rm } from 'fs';

/**
 * Clase Wrapper
 * Permite ejecutar comandos empleados en Linux para el manejo de ficheros y directorios
 */
export class Wrapper {
    /**
     * Dada una ruta comprueba si es un directorio o un fichero
     * @param path Ruta
     */
    check(path: string) {
        lstat(path, (err, stats) => {
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

    /**
     * Lista todos los archivos de un directorio
     * @param path Ruta del directorio
     */
    listFiles(path: string) {
        // Comprobamos si el path existe
        if(!lstatSync(path).isDirectory())
            console.log('The path is not a directory');
        else {
            // Leemos los nombres de los ficheros del directorio
            readdir(path, (err, files) => {
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

    /**
     * Crea un directorio dada una ruta
     * @param path Ruta
     */
    makeDirectory(path: string) {
        mkdir(path, (err) => {
            if(err)
                return console.error(err);
            else
                console.log('The directory has been created ');
        });
    }

    /**
     * Muestra el contenido de un fichero dado un ruta
     * @param path Ruta del fichero
     */
    read(path: string) {
        readFile(path, 'utf8' , (err, data) => {
            if(err)
                return console.error(err.message);
            else
                console.log(data);
        });
    }

    /**
     * Elimina un directorio o fichero
     * @param path Ruta
     */
    remove(path: string) {
        rm(path, { recursive: true }, (err) => {
            if(err)
                return console.error(err.message);
            else
                console.log("File deleted successfully");
        });
    }

    /**
     * Cambia el nombre o mueve ficheros
     * @param oldPath Ruta origen
     * @param newPath Ruta destino
     */
    move(oldPath: string, newPath: string) {
        const mv = spawn('mv', [`${oldPath}`, `${newPath}`]);

        mv.on('close', () => {
            console.log(oldPath + ' -> ' + newPath);
        });
    }
}