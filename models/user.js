/**
 * Created by Bo on 09-May-17.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    uuid: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdOn: {
        type: Date,
        default: (new Date()).getTime()
    },
    role: {type: String, enum:['admin', 'free_user'], default: 'free_user'}
});

module.exports = mongoose.model('User', User);