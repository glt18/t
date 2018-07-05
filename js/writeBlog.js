(function(){
  var reportBtn = document.getElementById('reportBtn');
  var title = document.getElementById('title');
  var content = document.getElementById('content');
  var type = document.getElementById('type');
  var tags = document.getElementById('tags');
  reportBtn.onclick = function(){
    if (title.value=='' || content.value=='' || type.value=='' || tags.value=='') {
      alert('数据不能为空！');
      return 0;
    }
    var time = new Date();
    var reportTime = time.getFullYear() + '-' + parseInt(time.getMonth()+1) + '-' + time.getDate();
    $.ajax({
      type : 'post',
      dataType : 'text',
      data : {
        title : title.value,
        content : content.value,
        type : type.value,
        tags : tags.value,
        reportTime : reportTime
      },
      url : "http://localhost/blog/php/addBlog.php",
      success : function(data) { 
        if (data == 'succeed') {
          window.location.href = "index.html";
        } else if (data == 'failed') {
          window.location.reload();
        }
      }
    })
  }
})();