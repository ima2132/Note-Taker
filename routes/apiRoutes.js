// Route to get all notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });
  
  // Route to add a note
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();  // Assign a unique id
  
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      notes.push(newNote);
  
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
        res.status(200).json(newNote);
      });
    });
  });
  