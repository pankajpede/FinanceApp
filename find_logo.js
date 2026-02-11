const https = require('https');

const repos = ['praveenpuglia/indian-banks', 'PravinPuglia/indian-banks'];
const variations = [
    'ICICI',
    'ICICI%20Bank',
    'Icici',
    'Icici%20Bank',
    'ICICI-Bank'
];
const branches = ['main', 'master'];

repos.forEach(repo => {
    variations.forEach(v => {
        branches.forEach(b => {
            // Check symbol.png
            const url = `https://raw.githubusercontent.com/${repo}/${b}/logos/${v}/symbol.png`;
            // Check logo.png as fallback
            const url2 = `https://raw.githubusercontent.com/${repo}/${b}/logos/${v}/logo.png`;

            [url, url2].forEach(u => {
                https.get(u, (res) => {
                    if (res.statusCode === 200) {
                        console.log(`FOUND: ${u}`);
                    }
                }).on('error', (e) => { });
            });
        });
    });
});
