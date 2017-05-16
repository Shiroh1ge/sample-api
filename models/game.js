/**
 * Created by Bo on 13-May-17.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Game = new Schema({
    title: {type: String, required: true, unique: true},
    category: {type: String, enum: ['fps', 'rts', 'rpg'], required: true, unique: false},
    uuid: {type: String, required: true, unique: true},
    createdOn: {
        type: Date,
        default: (new Date()).getTime()
    },
    publisher: {type: String, required: true},
    index: {type: Number, unique: true, default: 0}
});

module.exports = mongoose.model('Game', Game);