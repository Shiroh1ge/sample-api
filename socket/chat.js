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

module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('newMessage', (message) => {
            console.log(message);
            io.sockets.emit('newMessage', message)
        })
    });

    io.sockets.on('newMessage', (message) => {
    })
};