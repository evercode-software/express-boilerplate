const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const utils = {};

// Read all utility files from utils directory
fs.readdirSync(path.join(__dirname))
.filter(
    file => file.endsWith('.js') &&
    file !== basename
)
.forEach(file => {
    const util = require(path.join(__dirname, file));
    utils[file.slice(0, -3)] = util;
});

module.exports = utils;
