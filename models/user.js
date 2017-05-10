/**
 * Created by Bo on 09-May-17.
 */
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let User = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('User', User);