(function(){
  getData();
})();
function getData() {
  $.ajax({
    dataType : 'json',
    url : 'http://localhost/blog/php/blog.php',
    success : function(data){
      deleteBlog(data)
    }
  })
}
function deleteBlog(data){
  var showArticle = $$('showArticle')
  for (var i = 0; i < data.result.length; i++) {
    var article = document.createElement('li')
    article.innerHTML = data.result[i].title;
    var deleteBtn = document.createElement('input')
    deleteBtn.type = 'submit'
    deleteBtn.value = '删除'
    deleteBtn.className = 'deleteBtn'
    showArticle.appendChild(article)
    article.appendChild(deleteBtn)
  }
  var articles = showArticle.getElementsByTagName('li');
  for (var j = 0; j < articles.length; j++) {
    articles[j].getElementsByTagName('input')[0].onclick = (function(j){
      return function() {
        articles[j].style.display = 'none';
        var deleteTitle = articles[j].innerHTML.split('<')[0];
        $.ajax({
          type : 'post',
          dataType : 'text',
          data : {
            title : deleteTitle
          },
          url : 'http://localhost/blog/php/deleteBlog.php',
          success : function(data) {
            console.log(data)
          }
        })
      }
    })(j);
  }
}