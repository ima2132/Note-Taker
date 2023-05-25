const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 1000;

const { readFromFile, writeToFile, readAndAppend, readAndDelete } = require('./helpers/fsUtils');

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// route to get all notes
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// route to add a note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // assigns a unique id

  readAndAppend(newNote, './db/db.json')
    .then(() => res.status(200).json(newNote))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


// route to delete a note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  readAndDelete(noteId, './db/db.json')
    .then(() => res.status(200).json({ message: 'Note deleted successfully' }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// route to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// starts the server
app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));



