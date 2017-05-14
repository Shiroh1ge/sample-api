/**
 * Created by Bo on 12-May-17.
 */
let express = require('express');
let router = express.Router();
let UsersController = require('../controllers/users');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res, next) => {
    res.render('login', {
        partials: {
            head: 'head',
            header: 'header',
            scripts: 'scripts'
        },
    });

    console.log(res.locals);
});

passport.use(new LocalStrategy((username, password, done) => {
    UsersController.getUserByUsername(username, (err, user) => {
        user = user.toObject();

        if (err) {
            throw new Error('User does not exist')
        }
        if (!user) {
            console.log('Unknown user');
            return done();
        }
        UsersController.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });

        passport.serializeUser(function (user, done) {
            return done(null, user._id);
        });

        passport.deserializeUser(function (id, done) {
            UsersController.getUserById(id, function (err, user) {
                return done(err, user);
            });
        });


    });

}));

router.post('/', (req, res, next) => {
    passport.authenticate('local', {session: true}, (err, user) => {
        let thirtyDays = 2592000000;
        req.session.cookie.expires = new Date(Date.now() + thirtyDays);
        req.session.cookie.maxAge = thirtyDays;

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });

    })(req, res, next)
});

module.exports = router;

