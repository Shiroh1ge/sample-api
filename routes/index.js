/**
 * Created by Bo on 10-May-17.
 */
let router = require('express').Router();
let usersRoutes = require('./signup');
let loginRoutes = require('./login');
let browseRoutes = require('./browse');

router.use('/signup', usersRoutes);
router.use('/login', loginRoutes);
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
        console.log('Successfully logged out');
    });
});
router.use('/browse', browseRoutes);
module.exports = router;
