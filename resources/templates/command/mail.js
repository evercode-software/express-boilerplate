module.exports = (classname) => {
    return `class ${classname} {

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
        return \`\`;
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
     * Set the email greeting.
     * This will be the last line of your email.
     * 
     * @return string
     */
    footer() {
        return '';
    }
}

module.exports = ${classname}`;
};
  