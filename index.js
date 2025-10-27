const yargs = require('yargs')
const pkg = require('./package.json')
const { addNote, printNotes, removeNote } = require('./notes.controller')

yargs(process.argv.slice(2))
    .command({
        command: 'add',
        describe: 'Add new note to list',
        builder: {
            title: {
                type: 'string',
                describe: 'Note title',
                demandOption: true
            }
        },
        handler({ title }) {
            addNote(title)
        }
    })
    .command({
        command: 'list',
        describe: 'Print all notes',
        async handler() {
            printNotes()
        }
    })
    .command({
        command: 'remove',
        describe: 'Remove note by id',
        builder: {
            id: {
                type: 'string',
                describe: 'Note id',
                demandOption: true
            }
        },
        async handler({ id }) {
            removeNote(id)
        }
    })
    .parse();