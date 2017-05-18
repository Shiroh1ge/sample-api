/**
 * Created by Bo on 13-May-17.
 */
let express = require('express');
let router = express.Router();
let UsersController = require('../controllers/users');
let GamesController = require('../controllers/games');
let newGame = require('./new-game');
let hogan = require('hogan.js');

// var jsdom = require("jsdom").jsdom;
// var doc = jsdom();
// var window = doc.defaultView;

// Load jQuery with the simulated jsdom window.
// $ = require('jquery')(window);

router.get('/', UsersController.isAuthenticated, (req, res, next) => {
    GamesController.getAllGames().then(games => {
        res.render('browse', {
            partials: {
                head: 'head',
                header: 'header',
                scripts: 'scripts',
                chat: 'chat/chat',
                footer: 'footer'
            },
            games: games
        });
    });
});

router.post('/', UsersController.createNewUser);
router.delete('/', GamesController.deleteGame);
router.put('/', GamesController.updateGame);
router.use('/new-game', newGame);
module.exports = router;


