/**
 * Created by Bo on 16-May-17.
 */
$(document).ready(function () {
    var socket = io('http://localhost:3000');
    let chatInput = $('#chat-input');
    let currentUser = $('#currentUser').innerHTML;

    socket.on('newUserConnected', (users) => {
        // users.push(Object.assign(user,{socketId: socket.id}));
        console.log('user connected', users);
        loadConnectedUsers(users);
    });

    socket.on('userDisconnected', (socketId) => {
        // console.log(socketId);
        // users = users.filter(user => user.socketId == socketId);
        //
        //  console.log(users);
        //  console.log('user disconnected', users);
        //  let noDuplicatedUsers = users.filter(function (user, i, a) { return a.indexOf(user) === i; });
        //  loadConnectedUsers(users);
    });

    function loadConnectedUsers(users) {
        $("#connected-users-container").html(users.map(function (user) {
            return (`
              <div  class="user-profile-container">
                <div class="user-profile active" data-up='cont1'></div>
                <span >${user.username}</span>
            </div>
`);
        }).join(""));
    }

    function newMessage(messageData) {
        let message = messageData.message;
        let username = messageData.username;

        let parentContainer = $('.chat-container');
        let messageNode = $(`
            <div class="bubble bubble">
            <p style="font-size: 18px;font-weight: bold;">${username}</p>
                <p>${message}</p>
            </div>
            <span class="datestamp">${new Date(new Date().getTime()).toLocaleString()}</span>
`);
        parentContainer.append(messageNode);
    }

    $('.user-profile').click(function () {
        if (!$(this).hasClass('active')) {

            $('.user-profile.active').removeClass('active');
            $(this).addClass('active');

            var temp = $('#' + $(this).attr('data-up'));

            hideUI('.chat-container');
            showUI('#' + $(this).attr('data-up'));
            temp.addClass('active').removeClass('hidechat');
            temp.prevAll('.chat-container').addClass('hidechat').removeClass('active');
            temp.nextAll('.chat-container').removeClass('active').removeClass('hidechat');
        }
    });
    showUI('#cont1');


    $(document).keypress(function (e) {
        if (e.which == 13) {
            socket.emit('newMessage', chatInput.val());
            chatInput.val('');
        }
    });

    socket.on('newMessage', (messageData) => {
        console.log('message: ', messageData);
        newMessage(messageData);
    })

});


function showUI(ele) {
    var kids = $(ele).children(), temp;
    for (var i = kids.length - 1; i >= 0; i--) {
        temp = $(kids[i]);

        if (temp.is('div')) {
            temp.animate({
                marginTop: 0,
            }, 400).css({opacity: 1}).fadeIn()
        }
        else {
            temp.css({opacity: 1}).fadeIn()
        }
    }
}

function hideUI(ele) {
    var kids = $(ele).children(), temp;
    for (var i = kids.length - 1; i >= 0; i--) {
        temp = $(kids[i]);

        if (temp.is('div')) {
            temp.animate({
                marginTop: '30px',
            }).css({opacity: 0});
        }
        else {
            temp.css({opacity: 0});
        }
    }
}