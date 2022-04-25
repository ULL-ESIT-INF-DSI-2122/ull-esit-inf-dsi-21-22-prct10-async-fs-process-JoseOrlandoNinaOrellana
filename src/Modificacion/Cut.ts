import * as fs from 'fs';

export class Cut {
    private matrix: string[][] = [];

    read(fileName: string) {
        const file = fs.readFileSync(fileName).toString();
        let array: string[] = file.split('\n');
        for(let i = 0; i < array.length; ++i)
            this.matrix.push(array[i].split(',')); 
    }

    makeCut(option: number): string {
        let result: string = "";
        for(let i = 0; i < this.matrix.length; ++i)
            for(let j = option - 1; j < this.matrix[i].length; j += 3)
                result += this.matrix[i][j] + '\n';    

        return result;
    }
}

