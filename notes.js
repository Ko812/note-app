const fs = require('fs')


const getNotes = function (title) {
    if (fs.existsSync('notes.json')) { 
        notesJSON = loadNotes()
        if (title) {
            const note = notesJSON.filter(function (v, i, a) {
                return v.title === title
            })
            if (note.length > 0) {
                console.log(`${note.length} note(s) found.`)
                return note
            } else { 
                console.log('No note with matching title found.')
            }

        } else { 
            return notesJSON
        }

    }
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = function (title) { 
    const notes = loadNotes()
    const matchingNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (matchingNotes.length === 0) {
        console.log(`No matching note with title ${title}`)
    } else {
        for (var n of notes) { 
            if (n.title === title) {
                notes.splice(notes.indexOf(n),1)
            }
        }
        saveNotes(notes);
        console.log('Note removed!')
    }
}

const listNotes = function () { 
    const notes = loadNotes()
    let noteString
    notesShort = notes.map(function (val, ind, arr) {
        noteString = `${ind + 1}. ${val.title}: `
        if (val.body.length > 10) {
            noteString = noteString + `${val.body.substring(0, 10)}...`
        } else { 
            noteString = noteString + `${val.body}`
        }
        return noteString
    })
    return notesShort
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    listNotes: listNotes,
    removeNote: removeNote
}