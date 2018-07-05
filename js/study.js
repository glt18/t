(function getData() {
  $.ajax({
    dataType : 'json',
    url : "http://localhost/blog/php/blog.php",
    success : function(data) {
      setStudyCon(data);
    }
  })
})();
function setStudyCon (data){
  var artStuList = $$$('artStuList')[0];
  for (var i = 0; i < data.result.length; i++) {
    if(data.result[i].type === 'study') {
      var article = document.createElement('li');
      article.value = data.result[i].id;
      artStuList.appendChild(article);
      var titlea = document.createElement('a');
      titlea.href = 'article.html';
      titlea.innerHTML = '----' + data.result[i].title;
      article.appendChild(titlea);
    }
  }
  studyClick(data);
}
function studyClick(data) {
  var artStuList = $$$('artStuList')[0];
  var artStuListLi = artStuList.getElementsByTagName('li');
  for (var i = 0; i < artStuListLi.length; i++) {
    artStuListLi[i].onclick = (function(i){
      return function(){
        var val = artStuListLi[i].getAttribute('value');
        document.cookie = 'article=' + val;
      }
    })(i);
  }
}