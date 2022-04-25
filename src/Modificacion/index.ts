import { Cut } from './Cut'

if(process.argv.length === 4) {
    let option = Number(process.argv[3]);
    if(option > 3 || option < 1)
        console.log('La opción es entre 1 y 3');
    else {
        let cut = new Cut();
        cut.read(String(process.argv[2]));
        console.log(cut.makeCut(option));
    }
}
else {
    console.log('Faltan argumentos');
}