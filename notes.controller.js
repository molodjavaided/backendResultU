const fs = require('fs/promises') // Стандартный модуль file sistem
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')


async function addNote(title) {
    // const buffer = await fs.readFile(notesPath)
    // const notes = Buffer.from(buffer).toString('utf-8')
    // const notes = await fs.readFile(notesPath, {encoding: 'utf-8'}) // тоже самое что верхние две строчки

    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await updateData(notes)
    console.log(chalk.bgRed('Note was added!'));

}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function updateData(data) {
    await fs.writeFile(notesPath, JSON.stringify(data))
}

async function printNotes() {
    const notes = await getNotes()
    notes.forEach(note => {
        console.log(`Here is the list of notes: ${note.id} ${note.title}`);
    });
}

async function removeNote(id) {
    const notes = await getNotes()
    const noteFilter = notes.filter(note => note.id !== id)
    await updateData(noteFilter)
    console.log(noteFilter);
}

async function updateNote(id, newTitle) {
    const notes = await getNotes();
    const noteIndex = notes.findIndex(note => note.id === id)
    notes[noteIndex].title = newTitle;
    await updateData(notes);
}

module.exports = {
    addNote, removeNote, getNotes, updateNote
}
