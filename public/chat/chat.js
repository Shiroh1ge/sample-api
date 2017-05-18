/**
 * Created by Bo on 16-May-17.
 */
$(document).ready(function () {
    var socket = io('http://localhost:3000');
    let chatInput = $('#chat-input');
    let currentUser = {};

    socket.on('getConnectedUsers', (users) => {
        console.log('user connected', users);
        let currUsers = users.filter(user => user.username !== currentUser.username);
        console.log('currUsers',currUsers);
        loadConnectedUsers(currUsers);
    });

    socket.on('newUserConnected', (user) => {
        currentUser = user;
        console.log('currentUser', user);
    });

    socket.on('getMessages', (messages) => {
        loadMessages(messages);
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

    function loadMessages(messages) {
        $('.chat-container').html(messages.map(function (message) {
            return (`
            <div class="bubble bubble">
            <p style="font-size: 18px;font-weight: bold;">${message.author}</p>
                <p>${message.message}</p>
            </div>
            <span class="datestamp">${new Date(message.createdOn).toLocaleString()}</span>
`);
        }).join(""));
        $(".chat-container").scrollTop($(".chat-container")[0].scrollHeight);
    }
    function newMessage(messageData) {
        let message = messageData.message;
        let username = messageData.user.username;
        let parentContainer = $('.chat-container');

        let messageNode = $(`
            <div class="bubble bubble">
            <p style="font-size: 18px;font-weight: bold;">${username}</p>
                <p class="message"></p>
            </div>
            <span class="datestamp">${new Date(new Date().getTime()).toLocaleString()}</span>
`);
        $('.message').text(message);
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
            socket.emit('newMessage', {user: currentUser,message: chatInput.val()});
            chatInput.val('');

        }
    });

    socket.on('newMessage', (messageData) => {
        console.log('message: ', messageData);
        newMessage(messageData);
        $(".chat-container").scrollTop($(".chat-container")[0].scrollHeight);
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