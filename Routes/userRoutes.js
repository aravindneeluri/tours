const express = require('express')
const { signup } = require('./../controllers/authController');
const fs = require('fs');
const {getAllUsers} = require('./../controllers/userController');




const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const UpdateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const DeleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const userRouter = express.Router();



userRouter
    .route('/')
    .get(getAllUsers)
    .post(signup)
userRouter
    .route('/:id')
    .patch(UpdateUser)
    .delete(DeleteUser)
    .get(getUser);

module.exports = userRouter;