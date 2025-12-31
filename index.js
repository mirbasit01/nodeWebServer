const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const mongoose = require('mongoose');
const { type } = require('os');


//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/nodeWebServer')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Mongo Error', err)
    );

//schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }

}
    , { timestamps: true }
)

//model
const User = mongoose.model('User', userSchema);



// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {
    fs.appendFile(
        "access.log",
        `${new Date().toISOString()} - ${req.ip} ${req.method} - ${req.url}\n`,
        (err, data) => {
            next();
        }
    )
})

app.get('/users', async (req, res) => {
    const dbuser = await User.find({});
    const html = `
    <ul>
        ${dbuser.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users', async (req, res) => {
    const dbuser = await User.find({});
    res.setHeader('X-Developer-By', 'mirbasit01')
    res.json(dbuser);
});

app.route('/api/users/:id').get(async (req, res) => {
    const id = req.params.id;
    const dbuser = await User.findById(id);
    res.json(dbuser);
})
    .patch(async (req, res) => {
        // edit user
        await User.findByIdAndUpdate(req.params.id, req.body);
        const updatedUser = await User.findById(req.params.id);
        res.json({ status: 'User Updated', user: updatedUser })
    })
    .delete(async (req, res) => {
        // delete user
        await User.findByIdAndDelete(req.params.id);
        res.json({ status: 'User Deleted' })
    });


app.post('/api/users', async (req, res) => {
    //TOOD : Create new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: 'Missing required fields' });

    }
    console.log(body, 'body')
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    console.log(result, ' user : ')
    return res.status(201).json({ msg: 'User Created', user: result })

});









app.listen(port, () => { console.log(`Server is running on port ${port}`) });