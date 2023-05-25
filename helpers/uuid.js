// uuid.js used to generate a unique identifier for each note
const { v4: uuidv4 } = require('uuid');

// function to generate a unique id
const generateUUID = () => {
    return uuidv4();
};

module.exports = generateUUID;
