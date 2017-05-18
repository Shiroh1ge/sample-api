/**
 * Created by Bo on 09-May-17.
 */
(function (Application) {

    global.rootRequire = function (name) {
        return require(__dirname + '/' + name);
    };

    let express = require('express');
    let app = express();
    let port = process.env.PORT || 3000;
    let server = require('http').createServer(app);
    let config = require('./config');
    let mongoose = require('mongoose');
    let path = require('path');
    let bodyParser = require('body-parser');
    let cookieParser = require('cookie-parser');
    let session = require('express-session');
    let passport = require('passport');
    let io = require('socket.io').listen(server);

    let socketModules = require('./socket')(app, io);

    app.use('/static', express.static(__dirname + '/public'));
    app.use('/node', express.static(__dirname + '/node_modules'));
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
        // if (req.user) {
        //     io.sockets.emit('newUserConnected', app.locals.user);
        // }

        next();
    });
    app.use(require('./routes'));

    app.get('/', (req, res) => {
        res.render('index', {
            timestamp: new Date(),
            partials: {
                header: 'header',
                head: 'head',
                scripts: 'scripts',
                chat: 'chat/chat',
                footer: 'footer'
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

    server.listen(port, () => {
        console.log('Example app listening on port: ', port)
    });

    let users = [];
    io.on('connection', function (socket) {
        if (app.locals.user) {
            app.locals.user.socketId = socket.id;
            let user = {};
            users.push(Object.assign(user, app.locals.user._doc,{socketId: socket.id}));
            io.sockets.emit('newUserConnected', users);
        }
        console.log('socket connected');

        socket.on('disconnect', () => {
            users = users.filter(user => user.socketId !== socket.id);
            console.log(users);
            io.sockets.emit('userDisconnected', users)
        })
    });

})(exports);
