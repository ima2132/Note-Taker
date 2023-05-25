const fs = require('fs');
const util = require('util');

// reads db.json file and returns all saved notes 
const readFromFile = util.promisify(fs.readFile);

// lets you write new notes to the db.json file 
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// reads json file, appends new content, and then writes the updated data back to the file
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// reads json file, filters out the note to delete, and then writes the updated data back to the file
const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        let parsedData = JSON.parse(data);
        parsedData = parsedData.filter((note) => note.id !== id);
        writeToFile(file, parsedData);
      }
    });
  };
  

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };

