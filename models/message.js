/**
 * Created by Bo on 18-May-17.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Message = new Schema({
    message: {type: String, required: true, unique: true},
    author: {type: String, required: true},
    createdOn: {
        type: Number,
        default: Date.now()
    },
});

module.exports = mongoose.model('Message', Message);