const express = require('express');
const router = express.Router();
const {
    handleGetAllUsers,
    handleGetUserbyId,
    handleUpdateUserbyId,
    handleDeleteUserbyId,
    handleCreateNewUser
} = require('../controllers/user');


router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);


router
    .route('/:id')
    .get(handleGetUserbyId)
    .patch(handleUpdateUserbyId)
    .delete(handleDeleteUserbyId);


    
module.exports = router;