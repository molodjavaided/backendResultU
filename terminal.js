const yargs = require('yargs')
const { updateNote } = require('./notes.controller')

yargs.command({
    command: 'edit',
    describe: 'Edit title note by id',
    builder: {
        id: {
            describe: 'Note id',
            demandOption: true,
            type: 'string'
        },
        title: {
            describe: 'New title note',
            demandOption: true,
            type: 'string'
        }
    },
    async handler(data) {
        updateNote(data.id, data.title)
    }
}).parse()