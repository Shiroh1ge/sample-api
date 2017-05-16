/**
 * Created by Bo on 16-May-17.
 */
$(document).ready(function(){
    var socket = io('http://localhost:3000');

    $('.user-profile').click(function() {
        if(!$(this).hasClass('active')){

            $('.user-profile.active').removeClass('active');
            $(this).addClass('active');

            var temp =   $('#'+$(this).attr('data-up'));

            hideUI('.chat-container')
            showUI('#'+$(this).attr('data-up'));
            temp.addClass('active').removeClass('hidechat');
            temp.prevAll('.chat-container').addClass('hidechat').removeClass('active');
            temp.nextAll('.chat-container').removeClass('active').removeClass('hidechat');
        }
    });
    showUI('#cont1');


    $(document).keypress(function(e) {
        if(e.which == 13) {
            socket.emit('newMessage', chatInput.val());
            chatInput.val('');
        }
    });

socket.on('newMessage', (messageData) => {

})

});

function newMessage(messageData) {
    let chatInput = $('#chat-input');
    let parentContainer = $('cont1');
    let messageNode = $(`
            <div class="bubble">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut sapien vitae eros consectetur vehicula lacinia at nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum aliquet elit nec erat rutrum rutrum. Mauris ligula
                    magna, dignissim id tortor eu, aliquet dapibus ipsum</p>
            </div>
            <span class="datestamp">May 20, 2016, 4:16 PM</span>
`);
}

function showUI(ele){
    console.log($(ele));
    var kids = $(ele).children(), temp;
    for( var i = kids.length-1 ; i >=0  ; i-- ){
        temp  = $(kids[i]);

        if(temp.is('div')){
            temp.animate({
                marginTop:0,
            },400).css({opacity:1}).fadeIn()
        }
        else{
            temp.css({opacity:1}).fadeIn()
        }
    }
}

function hideUI(ele){
    console.log($(ele));
    var kids = $(ele).children(), temp;
    for( var i = kids.length-1 ; i >=0  ; i-- ){
        temp  = $(kids[i]);

        if(temp.is('div')){
            temp.animate({
                marginTop:'30px',
            }).css({opacity:0});
        }
        else{
            temp.css({opacity:0});
        }
    }
}