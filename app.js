/**
 * Created by Bo on 09-May-17.
 */
(function (Application) {

    global.rootRequire = function (name) {
        return require(__dirname + '/' + name);
    };

    let express = require('express');
    let app = express();
    let config = require('./config');
    let mongoose = require('mongoose');
    let port = process.env.PORT || 3000;
    let path = require('path');
    let bodyParser = require('body-parser');
    let cookieParser = require('cookie-parser');
    let session = require('express-session');
    let passport = require('passport');


    app.use('/static', express.static(__dirname + '/public'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: 'secret',
        saveUninitialized: false,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.engine('html', require('hogan-express'));
    app.set('views', __dirname + '/public');
    app.set('view engine', 'html');
    app.use((req, res, next) => {
        app.locals.user = req.user || null;
        if (req.user) {
            // console.log('current user: ', app.locals.user);
        }
        next();
    });
    app.use(require('./routes'));

    app.get('/', (req, res) => {
        res.render('index', {
            timestamp: new Date(),
            myArray: [{username: "one", index: 1}, {username: "two", index: 2}, {index: 3}],
            partials: {
                header: 'header',
                head: 'head',
                scripts: 'scripts'
            },

        });
    });
    app.post('/', (req, res) => {
        res.render('index', {
            myVar: req.body.email,
            req: req.body.username
        })
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

})(exports);
