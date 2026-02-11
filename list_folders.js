const https = require('https');

const options = {
    hostname: 'api.github.com',
    path: '/repos/praveenpuglia/indian-banks/contents/logos',
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
                    if (item.type === 'dir') {
                        console.log(item.name);
                    }
                });
            } else {
                console.log('Not an array');
                console.log(data);
            }
        } catch (e) {
            console.error(e.message);
        }
    });
});
