/**
 * Created by Bo on 10-May-17.
 */
(function (UsersController) {
    let User = require('../models/user');
    let Message = require('../models/message');
    let bcrypt = require('bcrypt');
    let uuid = require('uuid');
    let when = require('when');

    UsersController.getAllUsers = (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.send(users);
            }
        })
    };

    UsersController.createNewUser = (req, res, next) => {
        let userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'free_user'
        };

        return when.promise((resolve) => {
            User.find({username: userData.username, email: userData.email}, function (err, docs) {
                if (docs.length) {
                    console.log('User already exists ', docs);
                    throw new Error('User already exists')
                } else {
                    console.log('Username available');
                    resolve()
                }
            });
        }).then(() => {
            return when.promise(function (resolve, reject) {
                bcrypt.genSalt(12, function (err, salt) {
                    bcrypt.hash(userData.password, salt, function (err, hash) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(hash);
                    });
                });
            });
        }).then((hash) => {
            let newUser = new User({
                username: userData.username,
                email: userData.email,
                password: hash,
                role: userData.role || 'free-user',
                uuid: 'user-uuid-' + uuid.v4(),
                createdOn: (new Date()).getTime()
            });
            newUser.save(function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('User successfully saved');
                    req.logIn(newUser, (err, user) => {
                        console.log(err);
                        return res.redirect('/');
                    })
                }
            });
        });
    };

    UsersController.isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    };

    UsersController.getUserByUsername = (username, callback) => {
        User.findOne({username: username}, callback)
    };

    UsersController.getUserById = (id, callback) => {
        User.findById(id, callback)
    };

    UsersController.comparePassword = (password, hash, callback) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) {
                console.log(err);
            }
            callback(null, isMatch)
        })
    };

    UsersController.newMessage = (messageData, callback) => {
       let author = messageData.user.username;
       let message = messageData.message;
        let newMessage = new Message({
            author: author,
            message: message,
        });
        newMessage.save(() => callback());
    };
        
    UsersController.getMessages = (callback) => {
        Message.find().limit(10).sort('createdOn').exec((err, res) => {
           return callback(res);
        })
    }
    
}(exports));
