const fs = require('fs');


function logReqRes(filname) {
    return (req, res, next) => {
        fs.appendFile(
            filname,
            `${new Date().toISOString()} - ${req.ip} ${req.method} - ${req.url}\n`,
            (err, data) => {
                next();
            }
        )
    }
}

module.exports = {
    logReqRes,
}