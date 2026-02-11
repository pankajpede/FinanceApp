const https = require('https');

const options = {
    hostname: 'api.github.com',
    path: '/repos/praveenpuglia/indian-banks/contents/assets',
    headers: { 'User-Agent': 'node.js' }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (Array.isArray(json)) {
                json.forEach(item => {
                    console.log(item.name, item.type);
                });
            } else {
                console.log(data);
            }
        } catch (e) {
            console.error(e.message);
        }
    });
});
