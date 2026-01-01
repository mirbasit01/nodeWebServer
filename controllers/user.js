const User = require('../models/user');

const handleGetAllUsers = async (req, res) => {
    const dbuser = await User.find({});
    res.setHeader('X-Developer-By', 'mirbasit01')
    res.json(dbuser);
}

const handleGetUserbyId = async (req, res) => {
    const id = req.params.id;
    const dbuser = await User.findById(id);
    res.json(dbuser);
}

const handleUpdateUserbyId = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    const updatedUser = await User.findById(req.params.id);
    res.json({ status: 'User Updated', user: updatedUser })
}

const handleDeleteUserbyId = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ status: 'User Deleted' })
}

const handleCreateNewUser = async (req, res) => {
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


}


module.exports = {
    handleGetAllUsers,
    handleGetUserbyId,
    handleUpdateUserbyId,
    handleDeleteUserbyId,
    handleCreateNewUser
}