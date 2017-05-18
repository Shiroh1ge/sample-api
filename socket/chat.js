/**
 * Created by Bo on 16-May-17.
 */
// (function (ChatSocket) {
//
//     ChatSocket.sendMessage = (socket, data) => {
//         console.log(data);
//     }
//
// }(exports));

let UserController = require('../controllers/users');

module.exports = function(app, io) {
    io.on('connection', (socket) => {
        socket.on('newMessage', (message) => {
            io.sockets.emit('newMessage', Object.assign({}, app.locals.user._doc,{message:message}))
        })
    });

    io.sockets.on('newMessage', (message) => {
    });
};