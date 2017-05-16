/**
 * Created by Bo on 13-May-17.
 */
(function (GamesController) {
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
        return when.promise((resolve, reject) => {
            let gameData = {
                title: req.body.title,
                category: req.body.category,
                publisher: req.body.publisher,
            };
            let newGame = {};

            Game.findOne({title: gameData.title}, (err, game) => {
                if (err) {
                    res.status(500).send({error: err})
                }
                if (game) {
                    res.status(500).send({error: err})
                }
            }).then(() => {
                newGame = new Game({
                    title: gameData.title,
                    category: gameData.category,
                    publisher: gameData.publisher,
                    uuid: uuid.v4()
                });

                 return Game.findOne({}, {}, {sort: {index: -1}});
            }).then(prevGame => {
                if(prevGame) {
                    newGame.index = prevGame.index + 1;
                }

                newGame.save(function (err) {
                    if (err) {
                        res.send({error: err})
                    }
                    else {
                        console.log('Game successfully saved');
                        return res.send(newGame);
                    }
                });
            })
        })
    };

    GamesController.deleteGame = (req,res,next) => {
        let gameTitle = req.body.title;

        Game.find({title: gameTitle}).remove((err, game) => {
            res.status(200).send(gameTitle)
        })
    };

    GamesController.updateGame = (req,res,next) => {
        let gameData = {
            gameTitle: req.body.title,
            gameCategory: req.body.category,
            gamePublisher: req.body.publisher
        };

        let updatedGameData ={};

        for (var prop in gameData) {
            if(gameData[prop]) {
                updatedGameData[prop] =  gameData[prop];
            }
        }
        Game.update({title: gameData.gameTitle}, {updatedGameData}, (err, data) => {
            res.send(data);
            console.log(data);
        })
    }
}(exports));