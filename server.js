const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route wildcard
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// });

// GET Route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// GET Route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// GET API Route for notes that reads the db.json file and returns all saved notes.
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile('./db/db.json', (error, data) => res.json(JSON.parse(data)));
});

// POST API Route to add a note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedNotes = JSON.parse(data);
            req.body.id = uuid();
            parsedNotes.push(req.body)
            fs.writeFile(`./db/db.json`,
                JSON.stringify(parsedNotes),
                (writeErr) =>
                    writeErr
                        ? console.error(err)
                        : res.json(parsedNotes)
            )
        }
        console.log(`Note has been written to JSON file`)
    });

}
);
console.log(req.params.id)
// DELETE 
// app.delete('/api/notes/:id', (req, res) => {
//     // console.info(`${req.method} request received to add a note`);
//     // console.log(req.body);
//     fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
//         if (err) {
//             console.error(err)
//         } else {
//             const parsedNotes = JSON.parse(data);
//             const newNotes = [];
//             for (let i = 0; i < parsedNotes.length; i++) {
//                 if (parsedNotes[i].id != req.params.id)
//                 newNotes.push(parsedNotes[i])
//             }
            
//             fs.writeFile(`./db/db.json`,
//                 JSON.stringify(newNotes),
//                 (writeErr) =>
//                     writeErr
//                         ? console.error(err)
//                         : res.json(newNotes)
//             )
//         }
//         // console.log(`Note ${newNote.title} has been written to JSON file`)
//     });

// }
// );



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);