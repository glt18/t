(function (){
  getMessage();
})();
function setUserID() {
  var x = 10000000;
  var y = 1;
  var rand = String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0)) + String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0)) + "_" + parseInt(Math.random() * (x - y + 1) + y); 
  return rand;
}
function reportMessage() {
  var userId = setUserID();
  var time = new Date();
  var messageTime = time.getFullYear() + '-' + parseInt(time.getMonth() + 1) + '-' + time.getDate();
  var messageCon = $$('message').value;
  $.ajax({
    type : 'post',
    dataType : 'json',
    data : {
      userId : userId,
      messageTime : messageTime,
      messageCon : messageCon,
    },
    url : 'http://localhost/blog/php/addMessage.php',
    success : function(data) {
    }
  })
}
function getMessage() {
  var messageBtn = $$('messageBtn');
  messageBtn.onclick = function() {
    alert(1)
    reportMessage();
  }
  $.ajax({
    dataType : 'json',
    url : 'http://localhost/blog/php/messages.php',
    success : function(message) {
      console.log(message)
      setPrintMessage(message);
    }
  })
}
function setPrintMessage(message) {
  var commentsList = $$$("commentsList")[0];
  var messagesList = message.result;
  for (var j = 0; j < messagesList.length; j++) {
    var messages = document.createElement('div');
    var userinfo = document.createElement('div');
    var commentCon = document.createElement('div');
    commentCon.innerHTML = messagesList[j].content;
    var img = document.createElement('img');
    img.src = 'images/head.jpg';
    var span = document.createElement('span');
    span.innerHTML = messagesList[j].userid;
    var mngComment = document.createElement('ul');
    var timeli = document.createElement('li');
    timeli.innerHTML = messagesList[j].messagetime;
    var replyli = document.createElement('li');
    replyli.innerHTML = '回复';
    messages.className = 'comments';
    userinfo.className = 'userinfo';
    commentCon.className = 'commentCon';
    mngComment.className = 'mngComment';
    commentsList.appendChild(messages);
    messages.appendChild(userinfo);
    messages.appendChild(commentCon);
    messages.appendChild(mngComment);
    userinfo.appendChild(img);
    userinfo.appendChild(span);
    mngComment.appendChild(timeli);
    mngComment.appendChild(replyli);
    replyli.onclick = (function(j) {
      return function() {
        var identity = getCookie('PHPSESSID');
        if (identity) {
          var alreadyHave = $$('replyHave');
          if (alreadyHave) {
            return 0;
          } else {
            var parentNode = $$$('comments')[j];
            var textarea = document.createElement('textarea');
            var replyBtn = document.createElement('input');
            textarea.id = 'replyHave'
            textarea.className = 'replyCon';
            replyBtn.value = '回复';
            replyBtn.type = 'submit';
            replyBtn.style.marginLeft = '10%';
            parentNode.appendChild(textarea);
            parentNode.appendChild(replyBtn);
            replyBtn.onclick = (function(j){
              return function(){
                var time = new Date();
                var replyTime = time.getFullYear() + '-' + parseInt(time.getMonth() + 1) + '-' + time.getDate();
                var replyCon = $$$('replyCon')[0].value;
                $.ajax({
                  type : 'post',
                  dataType : 'json',
                  data : {
                    userId : 'ganltong',
                    messageTime : replyTime,
                    messageCon : '回复用户' + messagesList[j].userid + ':' + replyCon
                  },
                  url : 'http://localhost/blog/php/addMessage.php',
                  success : function(data) {
                    window.location.reload();
                  }
                })
              }
           })(j);
          }
        } else {
          return 0;
        }
      }
    })(j);
  }
  setClear();
}
function setClear() {
  var box = $$$('commentsList')[0];
  var div = document.createElement('div');
  div.style.clear = 'both';
  box.appendChild(div);
}
function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}