const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

