const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware function to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));