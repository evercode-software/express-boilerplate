class Mail {
    constructor() {
    }

    from() {
        return '';
    }

    subject() {
        return '';
    }

    greeting() {
        return 'Halo,';
    }

    content() {
        return ``;
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

module.exports = Mail;