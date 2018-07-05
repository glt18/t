(function (){
  $.ajax({
    dataType : 'json',
    url : "http://localhost/blog/php/blog.php",
    success : function(data) {
      var id = getCookie("article");
      setArticleCon(id,data);
      getComments();
    }
  })
})();
function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
function setArticleCon(id,data) {
  var title = $$('articleTitleS');
  var content = $$('articleContentS');
  var aboutArticle = $$('aboutArticleUl').getElementsByTagName('li');
  var nextArticleS = $$('nextArticleS');
  var commentBtn = $$('commentBtn');
  var arrLength = data.result[0].id;
  commentBtn.onclick = function() {
    reportComments();
  }
  for (var j = 1; j < data.result.length; j++) {
    if (parseInt(data.result[j].id) > arrLength) {
      arrLength = parseInt(data.result[j].id);
    }
  }
  for (var i = 0; i < data.result.length; i++) {
    if (id === data.result[i].id) {
      console.log(id)
      console.log(arrLength)
      title.innerHTML = data.result[i].title;
      content.innerHTML = data.result[i].content;
      aboutArticle[0].innerHTML = "发布时间：" + data.result[i].reporttime.split(' ')[0];
      aboutArticle[1].innerHTML = "分类：" + data.result[i].type;
      id === data.result[i].id;
      if (id < arrLength) {
        nextArticleS.innerHTML = "下一篇：" + data.result[i+1].title;
      } else {
        nextArticleS.innerHTML = "已是最后一篇文章啦";
      }
      nextArticleS.onclick = (function(i){
        return function() {
          if ((id) == parseInt(data.result[data.result.length-1].id)) {
            window.location.reload();
          }else {
            document.cookie = "article=" + (parseInt(data.result[i+1].id));
            var thisid = getCookie("article");
            window.location.reload();
          }
        }
      })(i);
    }
  }
}
function setUserID() {
  var x = 10000000;
  var y = 1;
  var rand = String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0)) + String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0)) + "_" + parseInt(Math.random() * (x - y + 1) + y); 
  return rand;
}
function reportComments() {
  var articleId = getCookie('article');
  var userId = setUserID();
  var time = new Date();
  var commentTime = time.getFullYear() + '-' + parseInt(time.getMonth() + 1) + '-' + time.getDate();
  var commentCon = $$('comment').value;
  document.cookie = 'userId=' + userId;
  $.ajax({
    type : 'post',
    dataType : 'json',
    data : {
      userId : userId,
      commentTime : commentTime,
      commentsId : 'ganltong',
      commentCon : commentCon,
      articleId : articleId
    },
    url : 'http://localhost/blog/php/addComments.php',
    success : function(data) {
    }
  })
}
function getComments() {
  $.ajax({
    dataType : 'json',
    url : 'http://localhost/blog/php/comments.php',
    success : function(comments) {
      console.log(comments);
      setPrintComments(comments);
    }
  })
}
function setPrintComments(comments) {
  var articleCommentS = $$("articleCommentS");
  var articleId = getCookie('article');
  var thisComments = []; // 将当前文章的所有评论存在其中
  for (var i = 0; i < comments.result.length; i++) {
    if (parseInt(articleId) === parseInt(comments.result[i].articleid)) {
      thisComments.push(comments.result[i])
    }
  }
  for (var j = 0; j < thisComments.length; j++) {
    var comments = document.createElement('div');
    var userinfo = document.createElement('div');
    var commentCon = document.createElement('div');
    commentCon.innerHTML = thisComments[j].content;
    var img = document.createElement('img');
    img.src = 'images/head.jpg';
    var span = document.createElement('span');
    span.innerHTML = thisComments[j].userid;
    var mngComment = document.createElement('ul');
    var timeli = document.createElement('li');
    timeli.innerHTML = thisComments[j].commenttime;
    var replyli = document.createElement('li');
    replyli.innerHTML = '回复';
    comments.className = 'comments';
    userinfo.className = 'userinfo';
    commentCon.className = 'commentCon';
    mngComment.className = 'mngComment';
    articleCommentS.appendChild(comments);
    comments.appendChild(userinfo);
    comments.appendChild(commentCon);
    comments.appendChild(mngComment);
    userinfo.appendChild(img);
    userinfo.appendChild(span);
    mngComment.appendChild(timeli);
    mngComment.appendChild(replyli);
    replyli.onclick = (function(j) {
      return function() {
        var alreadyHave = $$('replyHave');
        if (alreadyHave) {
          return 0;
        } else {
          var identity = getCookie('PHPSESSID');
          var parentNode = $$$('comments')[j];
          var textarea = document.createElement('textarea');
          var replyBtn = document.createElement('input');
          textarea.id = 'replyHave';
          textarea.className = 'replyCon';
          replyBtn.value = '回复';
          replyBtn.type = 'submit';
          replyBtn.style.marginLeft = '10%';
          parentNode.appendChild(textarea);
          parentNode.appendChild(replyBtn);
          replyBtn.onclick = (function(j){
            return function(){
              var articleId = getCookie('article');
              if (identity) {
                var replyuserid = 'ganltong';
              } else{
                var replyuserid = setUserID();
              }
              var time = new Date();
              var replyTime = time.getFullYear() + '-' + parseInt(time.getMonth() + 1) + '-' + time.getDate();
              var replyCon = $$$('replyCon')[0].value;
              $.ajax({
                type : 'post',
                dataType : 'json',
                data : {
                  userId : replyuserid,
                  commentTime : replyTime,
                  commentsId : thisComments[j].userid,
                  commentCon : '回复用户' + thisComments[j].userid + ':' + replyCon,
                  articleId : articleId
                },
                url : 'http://localhost/blog/php/addComments.php',
                success : function(data) {
                  // alert('回复评论成功');
                  window.location.reload();
                }
              })
            }
          })(j);
        }
      }
    })(j);
  }
  setClear();
}
function setClear() {
  var box = $$('articleCommentS');
  var div = document.createElement('div');
  div.style.clear = 'both';
  box.appendChild(div);
}