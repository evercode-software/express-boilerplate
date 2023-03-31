class LoginCode {
    constructor(code) {
        this.code = code;
    }

    from() {
        return 'node@evcd.dev';
    }

    subject() {
        return 'Kode Login';
    }

    greeting() {
        return 'Halo,';
    }

    content() {
        return `Berikut adalah kode login kamu: <strong>${this.code}</strong>`;
    }

    button() {
        return { 
            // text: 'Masuk', 
            // link: 'https://contoh.com/masuk'
        }
    }

    footer() {
        return 'Terima kasih';
    }
}

module.exports = LoginCode;