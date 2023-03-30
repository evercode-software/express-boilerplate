const program = require('commander');
const fs = require('fs');
const path = require('path');

program
  .command('create <classname>')
  .description('Create a new mail class')
  .action((classname) => {
    const filePath = path.join(__dirname, '../mails' ,`${classname}.js`);
    const fileContent = 
`class ${classname} {
    constructor() {
    }

    from() {
        return '';
    }

    subject() {
        return '';
    }

    greeting() {
        return '';
    }

    content() {
        return \`\`;
    }

    button() {
        return {
            text: '',
            link: ''
        }
    }

    footer() {
        return '';
    }
}

module.exports = ${classname};`;

    fs.writeFile(filePath, fileContent, (err) => {
      if (err) throw err;
      console.log(`Mail class ${classname}.js created successfully`);
    });
  });

program.parse(process.argv);
