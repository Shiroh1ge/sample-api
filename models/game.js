/**
 * Created by Bo on 13-May-17.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Game = new Schema({
    title: {type: String, required: true, unique: true},
    category: {type: String,enum: ['fps', 'rts', 'rpg'], required: true, unique: true},
    uuid: {type: String, required: true, unique: true},
    createdOn: {
        type: Date,
        default: (new Date()).getTime()
    },
    publisher: {type: String, required: true}
});

module.exports = mongoose.model('Game', Game);