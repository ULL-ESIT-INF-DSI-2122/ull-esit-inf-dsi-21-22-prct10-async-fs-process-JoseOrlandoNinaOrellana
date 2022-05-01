import * as yargs from 'yargs';
import { Wrapper } from './Wrapper';

const wrapper = new Wrapper();

/**
 * Comando check
 */
yargs.command({
    command: 'check',
    describe: 'Check if a path is a file or directory',
    builder: {
        path: {
            describe: 'Path',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.path === 'string') {
            wrapper.check(argv.path);
        }
    },
});

/**
 * Comando listFiles
 */
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
            wrapper.listFiles(argv.path);
        }
    },
});

/**
 * Comando makeDirectory
 */
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
            wrapper.makeDirectory(argv.path);
        }
    },
});

/**
 * Comando move
 */
yargs.command({
    command: 'move',
    describe: 'Move a file or dir to a new path',
    builder: {
        oldPath: {
            describe: 'Old Path',
            demandOption: true,
            type: 'string',
        },
        newPath: {
            describe: 'New Path',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.oldPath === 'string' && typeof argv.newPath === 'string') {
            wrapper.move(argv.oldPath, argv.newPath);
        }
    },
});

/**
 * Comando read
 */
yargs.command({
    command: 'read',
    describe: 'Read the content of a file',
    builder: {
        path: {
            describe: 'Path',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.path === 'string') {
            wrapper.read(argv.path);
        }
    },
});

/**
 * Comando remove
 */
yargs.command({
    command: 'remove',
    describe: 'Remove a path',
    builder: {
        path: {
            describe: 'Path',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.path === 'string') {
            wrapper.remove(argv.path);
        }
    },
});

yargs.parse();