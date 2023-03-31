const program = require('commander');
const fs = require('fs');
const path = require('path');
const mailTemplate = require('../../resources/templates/command/mail');

program
    .command('create <classname>')
    .description('Create a new mail class')
    .action((classname) => {
        const filePath = path.join(__dirname, '../mails', `${classname}.js`);
        const fileContent = mailTemplate(classname);

        if (fs.existsSync(filePath)) {
            console.error(`File ${classname} already exists`);
            return;
        }

        fs.writeFile(filePath, fileContent, (err) => {
            if (err) throw err;
            console.log(`Mail class for ${classname}.js created successfully`);
        });
    });

program.parse(process.argv);
