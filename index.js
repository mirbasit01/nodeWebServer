const http = require('http');
const fs = require('fs');


const myserver = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Request Received\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        switch(req.url){
            case '/': res.end('Home Page');
            break;
            case '/about': res.end('About Page');
            break;
            default: res.end('404 Page Not Found');
            break;
        }
        
    });
});
myserver.listen(8000, () => {
    console.log('Server is listening on port 8000');
})

