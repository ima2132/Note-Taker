const fs = require('fs');
const util = require('util');

// promisify the fs.readFile and fs.writeFile functions
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// function to read from a file and return the parsed JSON data
const readFromFile = (file) => {
  return readFileAsync(file, 'utf8').then((data) => JSON.parse(data));
};

// function to write content to a file
const writeToFile = (file, content) => {
  const data = JSON.stringify(content, null, 4);
  return writeFileAsync(file, data);
};

// function to append new content to a file
const readAndAppend = (content, file) => {
  return readFromFile(file)
    .then((data) => {
      data.push(content);
      return writeToFile(file, data);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

// function to read from a file, filter out the note to delete, and write the updated data back to the file
const readAndDelete = (id, file) => {
  return readFromFile(file)
    .then((data) => {
      let parsedData = data.filter((note) => note.id !== id);
      return writeToFile(file, parsedData);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };




