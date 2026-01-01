const mongoose = require('mongoose');
//connect to mongodb

async function connectDB(url) {
    return mongoose.connect(url)
}
module.exports = {
    connectDB,
};
 