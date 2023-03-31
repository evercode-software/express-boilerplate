## Express Boilerplate
This repository was created with the aim of helping developers to easily create RESTful APIs using Node.js and Express framework.

This repo is inspired by [Laravel](https://laravel.com), so it will be easier for you guys who have been using Laravel for a while.

There are already several features included in this repository, such as:
- User authentication using passwordless-OTP method
- Email sending using AWS SES
- Rate limiter configuration to prevent brute force attacks
- Service to create and verify OTP
- Basic Sequelize ORM configuration

You are free to fork and modify this repository according to your needs.

## Package Installed
Here is a list of installed packages for this repository.
- @aws-sdk/client-ses
- axios
- bcrypt
- commander
- cookie-parser
- cors
- dotenv
- express
- express-rate-limit
- helmet
- jsonwebtoken
- mustache
- mysql2
- sequelize

## Installation
Install the dependencies and start the server. We recommend you to install nodemon to watch changes.

```sh
git clone https://github.com/evercode-software/express-boilerplate.git
cp .env.example .env
npm i
npm start
sequelize db:migrate
sequelize db:seed:all
```

And please make sure to configure the `.env` according to your needs.
```sh
...
PORT=9001
...
```

## Feature
Please adjust the settings for the following features according to your needs.

#### Configuration
All the utilities file stored in `utils/` folder.

Inside the `config/` folder, there is an index.js file. This file is used to collect all the configuration settings in that folder and make them a centralized dependency.

The dependency name uses the file name and the file must use `module.exports` so that it can be called using the centralized dependency.

Here is an example of an AWS configuration file:

```sh
require('dotenv').config()
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION } = process.env

const credentials = {
    region: AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
}

module.exports = credentials
```

Now you can use the configuration file as follows:

```sh
const { aws } = require('./path/to/config')
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses')

// Set SES Client credentials
const client = new SESClient(aws)
```

One thing to note is that you do not need to enter the full path to the file, but rather just the path to the config folder.

```sh
// instead of 
const aws = require('./path/to/config/aws')

// do this
const { aws } = require('./path/to/config')
```

### Utilities
All the utilities file stored in `utils/` folder. 

Inside the `utils/` folder, there is an index.js file. This file is used to collect all the utility files in that folder and make them a centralized dependency.

Here is an example usage of `errorHandler.js`

```sh
exports.message = (error) => {
    if (process.env.NODE_ENV === 'production') {
        const errorMessage = { error: error.message}
        console.error(errorMessage);
        return errorMessage
    } else {
        const errorMessage = { message: error.message, stack: error.stack }
        console.error(errorMessage);
        return errorMessage
    }
}
```

Now you can use the errorHandler as follows:
```sh
const { errorHandler } = require('./path/to/utils')
...
```

### Router
If you look at the `server.js` you'll only find one line of route

```sh
...
app.use(require('./routes'))
..
```

If you want to add more routes, you can create a new route file and add it in `routes/index.js` as follows:

```sh
...
const userRoutes = require('./user')

router.use('/api/users', userRoutes)
...
```

Here is an example usage of `user.js`

```sh
const router = require('express').Router()
const UserController = require('../app/controllers/userController')

router.get('/', UserController.index)
router.get('/:userId', UserController.show)

module.exports = router
```

route above will produce endpoint `example.com/api/user` and `example.com/api/user/1` 

### Controllers
The controller uses OOP class and you can create new methods to be called in the router.

Here is an example usage of `userController.js`

```sh
const { errorHandler } = require('../../utils')
const { User } = require('../../database/models')

class UserController {
    async index (req, res) {
        try {        
            const users = await User.findAll()
            return res.json(users)
        } catch (error) {
            console.log(error);
            return res.status(error.code||500).json(errorHandler.message(error))
        }
    }
    ...
    // more methods here
    ...
module.exports = new UserController
```

Of course you can add more method in that file.

### Model
We're using [Sequelize](https://sequelize.org/) ORM to interact with database.

It's better to read the documentation because in this repo we only implement basic usage of sequelize.

### Mailer
You need an AWS account because in this repo we use `AWS-SDK/SES` to send email and make sure that you set configuration for aws in `config/aws.js`

We use [Commander](https://www.npmjs.com/package/commander) to create a new email instance.

Here is an example to create a `notification` mail instance.

```sh
node app/commands/mail.js create Invoice
```

It will create a new mail instance `app/mails/Invoice.js`, and the file will look like this

```sh
class Invoice {

    /**
     * Create a new email instance
     * 
     * @return void
    */
    constructor() {
    }

    /**
     * Set the sender name.
     *
     * @return string
     */
    from() {
        return '';
    }

    /**
     * Set the email subject .
     *
     * @return string
     */
    subject() {
        return '';
    }

    /**
     * Set the email greeting.
     * This will be the first line of your email.
     *
     * @return string
     */
    greeting() {
        return 'Halo,';
    }

    /**
     * Set the email content.
     * You can put the html tag here.
     * 
     * @return string | html
     */
    content() {
        return ``;
    }

    /**
     * Set the email button if available.
     * If link property is empty then button would not be shown.
     * 
     * @return array
     */
    button() {
        return {
            // text: 'Click Here',
            // link: ''
        };
    }

    /**
     * Set the email footer.
     * This will be the last line of your email.
     * 
     * @return string
     */
    footer() {
        return '';
    }
}

module.exports = Invoice
```

And then of course you need to modify the `app/mails/Invoice.js` like this

```sh
class Invoice {

    /**
     * Create a new email instance
     * 
     * @return void
    */
    constructor(invoice) {
        this.invoice = invoice
    }
    
    /**
     * Set the email content.
     * You can put the html tag here.
     * 
     * @return string | html
     */
    content() {
        return `Your invoice for ${this.invoice.month} is ${this.invoice.total}`;
    }

    /**
     * Set the email button if available.
     * If link property is empty then button would not be shown.
     * 
     * @return array
     */
    button() {
        return {
            text: 'Pay Now',
            link: this.invoice.link
        };
    }
...
```

To send email you can do as follows:

```sh
const { mailer } = require('../../utils')
const Invoice = require('../mails/Invoice')

function async send(){
    // 
    const invoice = {
        month: 'January',
        total: 'Rp 2.500.000',
        linkPayment: 'linkpayment.com/this-invoice'
    }
    await mailer.send('rio@example.com', new Invoice(invoice), res)
}
...
```

This instance will generate an email with a 'Pay Now' button. You can leave button function empty to create an email without a link.
