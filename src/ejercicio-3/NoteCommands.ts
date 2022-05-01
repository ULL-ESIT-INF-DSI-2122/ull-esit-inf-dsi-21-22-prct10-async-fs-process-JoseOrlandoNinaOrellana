import * as yargs from 'yargs';
import { NoteManager } from './NoteManager';
import { Note } from './Note';

let noteManager = new NoteManager();

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Note color',
            demandOption: true,
            type: 'string',
        }

    },
    handler(argv) {
        if(typeof argv.user=== 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string')
        {
            let NewNote = new Note(argv.title, argv.body, argv.color);
            console.log(noteManager.writeNote(argv.user, NewNote));
        }
    },
});

yargs.command({
    command: 'list',
    describe: 'list the notes of a person',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.user=== 'string') {
            console.log(noteManager.listNotes(argv.user));
        }
    },
});

yargs.command({
    command: 'read',
    describe: 'read the body of a note',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.user=== 'string' && typeof argv.title === 'string') {
            console.log(noteManager.readNote(argv.user, argv.title));
        }
    },
});

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.user=== 'string' && typeof argv.title === 'string') {
            console.log(noteManager.removeNote(argv.user, argv.title));
        }
    },
});

yargs.parse();