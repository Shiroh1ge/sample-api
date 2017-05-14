/**
 * Created by Bo on 13-May-17.
 */
let express = require('express');
let router = express.Router();
let UsersController = require('../controllers/users');

router.get('/', UsersController.isAuthenticated, (req, res, next) => {
    res.render('browse', {
        partials: {
            head: 'head',
            header: 'header',
            scripts: 'scripts'
        },
    });
});

router.post('/', UsersController.createNewUser);

module.exports = router;
