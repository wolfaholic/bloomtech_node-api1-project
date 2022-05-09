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

//PUT Update User
server.put ('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let user = req.body;

    User.update(id, user)
        .then(possibleUser => {
            if(!possibleUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else if(!user.name || !user.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            res.json(possibleUser)
        }
    })
})

// DELETE remove user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    User.remove(id)
        .then(removedUser => {
            if(!removedUser) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else {
                res.status(200).json(removedUser)
            }
        }) 
        .catch(err =>{
            res.status(500).json({
                message: 'The user could not be removed',
                err: err.message
            })
        })
})




// Server Export
module.exports = server;  
