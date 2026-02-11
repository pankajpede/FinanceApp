const https = require('https');

const variations = [
    'ICICI',
    'ICICI_Bank',
    'ICICI-Bank',
    'icici',
    'Icici',
    'ICICI%20Bank'
];

const branches = ['main', 'master'];

variations.forEach(v => {
    branches.forEach(b => {
        const url = `https://raw.githubusercontent.com/praveenpuglia/indian-banks/${b}/logos/${v}/symbol.png`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`FOUND: ${url}`);
            }
        });
    });
});
