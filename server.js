const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// GET Route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// GET API Route for notes that reads the db.json file and returns all saved notes.
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST API Route to add a note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        const noteString = JSON.stringify(newNote);

        fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            } else {
                const parsedNotes = JSON.parse(data);
            }
            fs.writeFile(
                `./db/db.json`,
                JSON.stringify(parsedNotes),
                (writeErr) =>
                    writeErr
                        ? console.error(err)
                        : console.log(
                            `Note ${newNote.title} has been written to JSON file`
                        )
            )
        });
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);