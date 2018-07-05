(function(){
  var identity = getCookie('PHPSESSID');
  if (identity) {
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
  }
})();