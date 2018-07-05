(function setData(){
  $.ajax({
    dataType : 'json',
    url : "http://localhost/blog/php/blog.php",
    success : function(data) {
      setContent(data);
    }
  })
})();
// 设置首页显示内容
function setContent(data) {
  showPower();
  setArticleNum(data);
  enterArticle(data);
  showMore(data);// 对每篇文章显示更多做点击事件
  showDateSub(data);// 显示文章发表日期距当前日期的时间差
  setTags(data);// 对每篇文章的tags进行整理与分类
}
function showPower() {
    var login = $$("login");
    var loginForm = $$$("loginBox")[0];
    var rightSlider = $$("rightSlider");
    var loginbtn = $$('loginbtn');
    login.onclick = function() {
      loginForm.style.display = "block";
      $$$('contentbox')[0].style.opacity = '.2';
      $$$('contentbox')[0].style.pointerEvents = 'none';
      $$('nologin').onclick = function(){
        loginForm.style.display = "none";   
        $$$('contentbox')[0].style.opacity = '1';
        $$$('contentbox')[0].style.pointerEvents = 'auto';   
      }
    }
    loginbtn.onclick = function() {
      $.ajax({
        type : 'post',
        data : {
          username : $$('username').value,
          password : $$("password").value
        },
        dataType : 'text',
        url : "http://localhost/blog/php/login.php",
        success : function(data) {
          if (data === "manager" ) {
            loginForm.style.display = "none";   
            $$$('contentbox')[0].style.opacity = '1';
            $$$('contentbox')[0].style.pointerEvents = 'auto'; 
            var span = $$("login");
            var showpowers = $$('power');
            var powers = $$$("showPowers")[0];
            var write = document.createElement('li');
            var writea = document.createElement('a');
            var deleteBlog = document.createElement('li');
            var deleteBloga = document.createElement('a');
            span.style.display = 'none';
            showpowers.style.display = 'block';
            writea.href = 'writeBlog.html';
            writea.innerHTML = '发表博客';
            powers.appendChild(write);
            write.appendChild(writea);
            deleteBloga.href = 'deleteBlog.html';
            deleteBloga.innerHTML = '删除博客';
            powers.appendChild(deleteBlog);
            deleteBlog.appendChild(deleteBloga);
          } else if (data === 'user') {
            window.location.reload();
          }
        }
      })
    }
}
// 将每篇文章显示在首页上
function setArticleNum(data) {
  var leftSlider = $$('leftSlider');
  for (var i = 0; i < data.result.length; i++) {
    var article = document.createElement('div');
    article.className = "articles";
    leftSlider.appendChild(article);
    var articleTitle = document.createElement('h2');
    articleTitle.className = "articleTitle";
    article.appendChild(articleTitle);
    var articleTitlea = document.createElement('a');
    articleTitlea.className = 'articleTitlea';
    articleTitlea.href='article.html';
    articleTitle.appendChild(articleTitlea);
    var articleCon = document.createElement('p');
    articleCon.className = "articleCon";
    article.appendChild(articleCon);
    var dispMore = document.createElement('div');
    dispMore.className = "dispMore";
    article.appendChild(dispMore);
    var dispMorea = document.createElement('a');
    dispMorea.href='article.html';
    dispMorea.innerHTML = '显示更多';
    dispMore.appendChild(dispMorea);
    var articleTime = document.createElement('div');
    articleTime.className = "articleTime";
    article.appendChild(articleTime);
  }
}
// 当点击某篇文章的标题时进入文章
function enterArticle(data) {
  var article = $$$('articles');
  var title = $$$('articleTitlea');
  for(var i = 0 ; i < article.length ; i++) {
    title[i].onclick = (function(i){
      return function() {
        for(var j = 0 ; j < data.result.length ; j++) {
          if (title[i].innerHTML == data.result[j].title) {
            document.cookie = "article=" + data.result[j].id;
          }
        }
      }
    })(i);
  }
}
// 对每篇文章显示更多做点击事件
function showMore(data) {
  var showMoreBtn = $$$('dispMore');
  for(var i = 0 ; i < showMoreBtn.length ; i++) {
    showMoreBtn[i].onclick = (function(i){
        return function(){
              document.cookie = "article=" + data.result[i].id;
          }          
    })(i);
  }
}
// 每篇文章的小标签设置添加
function setTags(data) {
  var articles = $$$('articles');
  var articleTags = [];     // 用来存放每篇文章的tags的数组，长度为文章数量
  for(var i = 0 ; i < data.result.length ; i++) {
    articleTags.push(data.result[i].tags);
  }
  for(var j = 0 ; j < articleTags.length ; j++) {
    articleTags[j] = articleTags[j].split('|');
  }
  for (var k = 0; k < articles.length; k++) {
    for (var s = 0; s < articleTags[k].length; s++) {
      var tag = document.createElement('div');
      tag.className = "articleTags";
      articles[k].appendChild(tag);
      var tags = articles[k].getElementsByClassName('articleTags');
      tags[s].innerHTML = articleTags[k][s];
    }
  }
}
// 显示文章发表日期距当前日期的时间差
function showDateSub(data) {
  var article = $$$('articles');
  var title = $$$('articleTitlea');
  var content = $$$('articleCon');
  // var tags = $$$('articleTags');
  var time = $$$('articleTime');
  // 说明文章发表时间距现在的天数
  for(var i = 0 ;i < article.length ; i++) {
    var myDate = new Date();
    var mytime = myDate.toLocaleDateString();//当前日期
    var reporttime = data.result[i].reporttime.split(' ')[0];//文章发表日期
    title[i].innerHTML = data.result[i].title;
    title[i].className = "articleTitlea";
    content[i].innerHTML = data.result[i].content;
    var time1 = new Date(mytime.split('/')[0],mytime.split('/')[1],mytime.split('/')[2]);
    var time2 = new Date(reporttime.split('-')[0],reporttime.split('-')[1],reporttime.split('-')[2]);
    var timeSub = parseInt((time1  -  time2)/1000/60/60/24); 
    if (timeSub == 0) {
      time[i].innerHTML = '今天';
    } else {
      time[i].innerHTML = timeSub + '天之前。。';
    }
  }
}