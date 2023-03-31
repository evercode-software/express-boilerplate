require('dotenv').config()
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const config = {}

// Read all config files from config directory
fs.readdirSync(path.join(__dirname))
.filter(
    file => file.endsWith('.js') &&
    file !== basename
)
.forEach(file => {
    const item = require(path.join(__dirname, file));
    config[file.slice(0, -3)] = item;
});

module.exports = config;
