/**
 * Created by Bo on 10-May-17.
 */
let express = require('express');
let router = express.Router();
let UsersController = require('../controllers/users');
let passport = require('passport');

router.get('/', UsersController.getAllUsers);

router.post('/', UsersController.createNewUser);

module.exports = router;
