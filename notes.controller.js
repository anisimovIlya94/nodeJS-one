const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green("Note was added"))
}

async function removeNote(id) {
    const notes = await getNotes()
    const filteredNotes = notes.filter((note) => note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
    console.log(chalk.red("Note was removed"))
}

async function editNote(id, title) {
    const notes = await getNotes()
    const noteIndex = notes.findIndex((note) => note.id === id)
    notes[noteIndex].title = title
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: "utf-8"})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue("There is notes list:"))
    notes.forEach((note)=>console.log(chalk.blue(note.id, note.title)))
}

module.exports = {
    addNote, printNotes, removeNote, getNotes, editNote
}