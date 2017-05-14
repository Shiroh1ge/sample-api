/**
 * Created by Bo on 13-May-17.
 */
(function(GamesController){
    let uuid = require('uuid');
    let Game = require('../models/game');

    GamesController.createNewGame = (req, res, next) => {
        let gameData = {
            title: req.body.title,
            category: req.body.category,
            publisher: req.body.publisher,
        };
        return when.promise((resolve, reject) => {
            Game.findOne({title: gameData.title}, (err, game) => {
                if(err) {
                    console.log(error);
                }
                if(game) {
                    throw new Error('Game already exists')
                }
            })
        })
    }
}());