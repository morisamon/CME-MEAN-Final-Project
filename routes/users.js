const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('cme', ['users']);
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
const passport = require('passport');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
  
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({data: user.toJSON()}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },
                    expiresIn: token.expiresIn
                })
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});
  
module.exports = router;
