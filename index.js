const express = require('express');
const user = require('./MOCK_DATA.json');
const app = express();
const port = 3000;
const fs = require('fs');

// middleware
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
    fs.appendFile(
        "access.log",
        `${new Date().toISOString()} - ${req.ip} ${req.method} - ${req.url}\n`,
        (err , data)=> {
            next();
        }
    )
})

 
    



app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${user.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users', (req, res) => {
    res.setHeader('X-Developer-By', 'mirbasit01')
    res.json(user);
});

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user1 = user.find((user) => user.id === id);
    res.json(user1);
})
    .patch((req, res) => {
        // edit user
        const id = Number(req.params.id);
        const body = req.body;
        const userIndex = user.findIndex((user) => user.id === id);
        user[userIndex] = { ...user[userIndex], ...body };
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err, response) => {
            return res.json({ status: 'User Updated' })
        })
    })
    .delete((req, res) => {
        // delete user
        const id = Number(req.params.id);
        const userIndex = user.findIndex((user) => user.id === id);
        user.splice(userIndex, 1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err, response) => {
            return res.json({ status: 'User Deleted' })
        })
    });


app.post('/api/users', express.json(), (req, res) => {
    //TOOD : Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email ||  !body.gender){
        return res.status(400).json({ msg: 'Missing required fields' });
        
    }
    console.log(body, 'body')
    user.push({ ...body, id: user.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err, response) => {
        return res.status(201).json({ status: 'User Created', id: user.length })
    })
});









app.listen(port, () => { console.log(`Server is running on port ${port}`) });