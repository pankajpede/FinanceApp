const https = require('https');

const options = {
    hostname: 'api.github.com',
    path: '/repos/praveenpuglia/indian-banks',
    headers: { 'User-Agent': 'node.js' }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log(`Default Branch: ${json.default_branch}`);
            console.log(`HTML URL: ${json.html_url}`);
        } catch (e) {
            console.error(e.message);
            console.log(data);
        }
    });
});
