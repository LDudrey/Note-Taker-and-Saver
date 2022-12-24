const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET Route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

// GET API Route for notes that reads the db.json file and returns all saved notes.
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });




  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);