// Imports
const express = require('express');
const User = require('./users/model.js');
const server = express();

//Middleware
server.use(express.json());

//Endpoints

//GET users
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                err: err.message,
                stack: err.stack
            })
        })
})

//GET users by ID
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                });
            }
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({
                message: 'The user information could not be retrieved',
                err: err.message,
                stack: err.stack
            })
        })
});

// Server Export
module.exports = server;  
