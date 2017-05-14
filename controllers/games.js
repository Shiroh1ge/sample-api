/**
 * Created by Bo on 13-May-17.
 */
(function(GamesController){
    let uuid = require('uuid');
    let Game = require('../models/game');
    let when = require('when');

    GamesController.getAllGames = () => {
        return when.promise((resolve, reject) => {
            Game.find({}, (err, games) => {
                if (err) {
                    console.log(err);
                }
                else {
                    resolve(games)
                }
            })
        })
    };

    GamesController.createNewGame = (req, res, next) => {
        let gameData = {
            title: req.body.title,
            category: req.body.category,
            publisher: req.body.publisher,
        };
        return when.promise((resolve, reject) => {
            Game.findOne({title: gameData.title}, (err, game) => {
                if(err) {
                   throw err;
                }
                if(game) {
                    throw new Error('Game already exists');
                }
            }).then(() => {
                let newGame = new Game({
                    title: gameData.title,
                    category: gameData.category,
                    publisher: gameData.publisher,
                    uuid: uuid.v4()
                });
                newGame.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Game successfully saved');
                    }
                });
                next();
            })
        })
    }
}(exports));