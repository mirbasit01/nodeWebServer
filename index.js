const express = require('express');
const app = express();
const { connectDB } = require('./connection');
const port = 3000;
const userRouter = require('./routes/user');
const { logReqRes } = require('./middleware');



// connect to database
connectDB('mongodb://127.0.0.1:27017/nodeWebServer').then(() => console.log('MongoDB connected'))
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes('access.log'));
// routes
app.use('/api/users', userRouter);

app.listen(port, () => { console.log(`Server is running on port ${port}`) });