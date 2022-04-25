import * as net from 'net';
import * as fs from 'fs';

function read(fileName: string): string[][] {
    let matrix: string[][] = [];
    const file = fs.readFileSync(fileName).toString();
    let array: string[] = file.split('\n');
    for(let i = 0; i < array.length; ++i)
        matrix.push(array[i].split(',')); 
    return matrix;
}

function makeCut(matrix: string[][], option: number): string {
    let result: string = "";
    for(let i = 0; i < matrix.length; ++i)
        for(let j = option - 1; j < matrix[i].length; j += 3)
            result += matrix[i][j] + '\n';    

    return result;
}

if(process.argv.length !== 4 && typeof process.argv[2] === "string" && typeof process.argv[3] === "number") {
    console.log('Please, provide a filename and an option to cut');
} 
else {
    const fileName = process.argv[2];
    //if(fs.accessSync(fileName)) {
        const option: number = Number(process.argv[3]);
        if(option <= 3 && option <= 1) {
            const file = fs.readFileSync(fileName).toString();
            let matrix: string[][] =[];
            let array: string[] = file.split('\n');
            for(let i = 0; i < array.length; ++i)
                matrix.push(array[i].split(','));

            net.createServer((connection) => {
                console.log('A client has connected.');

                connection.write(JSON.stringify({'type': 'watch', 'file': fileName}) + '\n');

                fs.watchFile(fileName, () => {
                    connection.write(JSON.stringify({
                    'type': 'cut', 'resultCut': makeCut(read(fileName), option)}) + '\n');
                });

                connection.on('close', () => {
                    console.log('A client has disconnected.');
                });
            }).listen(60300, () => {
                console.log('Waiting for clients to connect.');
            });
        }
    //}
    else
        console.log('Option not supported');
}