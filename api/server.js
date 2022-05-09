// Imports
const express = require('express');
const User = require('./users/model.js');
const server = express();

//Middleware
server.use(express.json());

//Endpoints

//POST new user creation
server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name|| !user.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        })
    } else {
        User.insert(user)
            .then(createdUser => {
                res.status(201).json(createdUser)
            })
            .catch(err => {
                res.status(500).json ({
                    message: 'There was an error while saving the user to the database',
                    err: err.message,
                    stack: err.stack
                })
            })
    }
})


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

//

// Server Export
module.exports = server;  
