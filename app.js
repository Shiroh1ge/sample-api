/**
 * Created by Bo on 09-May-17.
 */
(function (Application) {

    global.rootRequire = function (name) {
        return require(__dirname + '/' + name);
    };
    let express = require('express');
    let config = require('./config');
    let mongoose = require('mongoose');
    let User = require('./models/user');
    let port = process.env.PORT || 3000;
    let path = require('path');

    let app = express();

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });

    mongoose.connect(config.connectionString(), (error) => {
        if (error) {
            console.log(error);
        }
        console.log('Successfully connected to database');
    });

    app.listen(port, () => {
        console.log('Example app listening on port 3000!')
    });

    console.log('bako');

})(exports);
