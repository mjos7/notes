const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./db/db.json');

// Express middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/assets/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/assets/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes.slice(1));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {
  let newNote = req.body;
  notes.push(newNotes);
  fs.writeFileSync('/db/db.json', JSON.stringify(notes));
  res.json(notes);
});

// Listening

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
