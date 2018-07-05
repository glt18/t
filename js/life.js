(function getData() {
  $.ajax({
    dataType : 'json',
    url : "http://localhost/blog/php/blog.php",
    success : function(data) {
      console.log(data);
      setLifeCon(data);
    }
  })
})();
function setLifeCon (data){
  var artLifeList = $$$('artLifeList')[0];
  for (var i = 0; i < data.result.length; i++) {
    if(data.result[i].type === 'life') {
      var article = document.createElement('li');
      article.value = data.result[i].id;
      artLifeList.appendChild(article);
      var titlea = document.createElement('a');
      titlea.href = 'article.html';
      titlea.innerHTML = '----' + data.result[i].title;
      article.appendChild(titlea);
    }
  }
  lifeClick(data);
}
function lifeClick(data) {
  var artLifeList = $$$('artLifeList')[0];
  var artLifeListLi = artLifeList.getElementsByTagName('li');
  for (var i = 0; i < artLifeListLi.length; i++) {
    artLifeListLi[i].onclick = (function(i){
      return function(){
        var val = artLifeListLi[i].getAttribute('value');
        document.cookie = 'article=' + val;
      }
    })(i);
  }
}