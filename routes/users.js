let express = require('express');
let router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');

let config = require('../config/database');
let UserModel = require('../models/userModel');

//registration middleware service
router.post('/register', (req, res, next) => {
    let newUser = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    UserModel.addUser(newUser, (err, user) => {
        if (!err) {
            res.json({
                success: true,
                message: 'added new user'
            });
        } else {
            res.json({
                success: false,
                message: 'failed to register user'
            });
        }
    });
});

//authentication middleware service
router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;


    UserModel.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                message: 'Username not found!'
            });
        }
        UserModel.comparePassword(password, user.password, (err, match) => {
            if (err) throw err;
            if (match) {
                let token = jwt.sign(user, config.secret, {
                    expiresIn: 86400
                });
                return res.json({
                    success: true,
                    token: `JWT ${token}`,
                    user: {
                        id: user._id,
                        name: `${user.firstname} ${user.lastname}`
                    }
                });
            } else {
                return res.json({
                    success: false,
                    message: 'wrong password!'
                });
            }
        });
    })
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({
        user: req.user
    });
});
module.exports = router;