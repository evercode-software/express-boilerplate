module.exports = (classname) => {
    return `class ${classname} {
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
        return \`\`;
    }

    button() {
        return {
            text: '',
            link: ''
        };
    }

    footer() {
        return '';
    }
}

module.exports = ${classname}`;
};
  