/**
 * Created by Bo on 13-May-17.
 */
let express = require('express');
let router = express.Router();
let UsersController = require('../controllers/users');
let GamesController =  require('../controllers/games');
let newGame = require('./new-game');

router.get('/', UsersController.isAuthenticated, (req, res, next) => {
    GamesController.getAllGames().then(games => {
        res.render('browse', {
            partials: {
                head: 'head',
                header: 'header',
                scripts: 'scripts'
            },
            games: games
        });
    });

});

router.post('/', UsersController.createNewUser);

router.use('/new-game', newGame);
module.exports = router;
