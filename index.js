const http = require('http');
const fs = require('fs');
const url = require('url');


const myserver = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return; res.end();
    const log = `${Date.now()}: ${req.url} New Request Received\n`;
    const myurl = url.parse(req.url, true);
    console.log(myurl)
    fs.appendFile('log.txt', log, (err, data) => {
        switch(myurl.pathname){
            case '/': res.end('Home Page');
            break;
            case '/about': 
            const username = myurl.query.myname;
            console.log(username);
            res.end(`About Page. Hello, ${username}`);
            break;
            case '/search':
                const search = myurl.query.search_query;
                res.end(`You searched for: ${search}`);
            default: res.end('404 Page Not Found');
            break;
        }
        
    });
});
myserver.listen(8000, () => {
    console.log('Server is listening on port 8000');
})

