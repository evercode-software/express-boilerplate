const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses')
const fs = require('fs')
const path = require('path')
const errorHandler = require('./errorHandler')
const { aws } = require('../config')
const mustache = require('mustache')

// Set SES Client credentials
const client = new SESClient(aws)

// Mail param
const createSendEmailCommand = (toAddress, fromAddress, instance) => {
    // Define sender name
    const fromName = process.env.MAIL_FROM_NAME || 'Express SES Mailer'

    // Define mail data
    const data = {
        greeting: instance.greeting(),
        content: instance.content(),
        button: instance.button(),
        footer: instance.footer()
    }

    // Render HTML template with data from instance
    const templatePath = path.join(__dirname, '../resources/templates/mail/mail.html')
    const template = fs.readFileSync(templatePath, 'utf8')
    const html = mustache.render(template, data)

    // Create SES send email instance
    return new SendEmailCommand({
        Destination: { /* required */
            CcAddresses: [
                /* more items */
            ],
            ToAddresses: [
                toAddress,
                /* more items */
            ],
        },
        Message: { /* required */
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: html,
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: instance.subject(),
            },
        },        
        Source: `${fromName} <${fromAddress}>`, /* required */
        ReplyToAddresses: [
            /* more items */
        ],
    });
}

exports.send = async (to, instance, res) => {
    try {
        const from = instance.from() ?? process.env.MAIL_FROM_ADDRESS
        if (!from) {
            throw new Error('Attribute FROM is missing')
        }
        const command = createSendEmailCommand(to, from, instance)
        await client.send(command);
    } catch (error) {
        res.status(error.code || 500).json(errorHandler.message(error))
    }
}