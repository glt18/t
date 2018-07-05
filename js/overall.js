(function() {
  getData();
})();
function $$(id) {
  return document.getElementById(id);
}
function $$$(className) {
  return document.getElementsByClassName(className);
}
function $$$$(tagName) {
  return document.getElementsByTagName(tagName);
}
function getData() {
  $.ajax({
    dataType : 'json',
    url : "http://localhost/blog/php/blog.php",
    success : function(data) {
      console.log(data);
      headerclick();
      articleSort(data);
      tagClass(data);
    }
  })
}
function headerclick() {
  var menulist = $$('menu').getElementsByTagName('li');
  menulist[0].onclick = function () {
    window.location.href = 'index.html';
  }
  menulist[1].onclick = function () {
    window.location.href = 'study.html';
  }
  menulist[2].onclick = function () {
    window.location.href = 'life.html';
  }
  menulist[3].onclick = function () {
    window.location.href = 'comments.html';
  }
}
// 对文章发表时间排序，更新最新动态列表
function articleSort(data) {
  var reportTime = [];// 用来存每篇文章的发布时间
  var article = [];// 
  var list = [];// 用来存最新动态列表中午篇文章的数据
  var latestList = $$$('latestList');
  // 对数据库中每篇文章的发布时间进行排序返回结果timeSort
  for(var i = 0 ; i < data.result.length ; i++) {
    reportTime.push(data.result[i].reporttime);
  }
  timeSort = reportTime.sort(function(a, b){  
    return a < b ? 1 : -1; // 时间最近的在前  
  }); 
  timeSort = deleteCom(timeSort);
  // 最新动态列表更新
  for(var j = 0 ; j < 5 ; j++) {
    for (var k = data.result.length-1; k >= 0; k--) {
      if (timeSort[j] == data.result[k].reporttime) {
        list.push(data.result[k]);
      }
    }
  }
  for (var i = 0; i < 5; i++) {
    if (i < list.length) {
      latestList[i].innerHTML = list[i].title;
    }
  }
  // 当点击最新动态列表中某篇文章时将其id存到cookie
  for(var i = 0 ; i < 5 ; i++) {
    latestList[i].onclick = (function(i){
      return function() {
        for(var j = 0 ; j < list.length ; j++) {
          if (latestList[i].innerHTML == list[j].title) {
            document.cookie = "article=" + list[j].id;
          }
        }
      }
    })(i);
  }
}
// 去除数组重复项返回新数组
function deleteCom(arr) {
  var res = [];
  var json = {};
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
}
// 从数据库获得所有的tag存到tags数组
function tagClass(data) { 
  var tag = [];   // 用来存放所有文章tag的数组
  var length = 0;
  var tags = [];
  for(var i = 0 ; i < data.result.length ; i++) {
    tag.push(data.result[i].tags);
  }
  for (var j = 0; j < tag.length; j++) {
    for (var k = 0; k < tag[j].split('|').length; k++) {
      tags.push(tag[j].split('|')[k]);
    }
  }
  var res = deleteCommon(tags);
  showTags(res);
}
// 去除tags数组的重复项
function deleteCommon(arr) {
  var result = [];
  var obj = {};
  var json = {};
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      result.push(arr[i]);
      json[arr[i]] = 1;
      obj[arr[i]] = 0;
    }
  }
  for (var j = 0; j < arr.length; j++) {
    if(arr[j] in obj) {
      obj[arr[j]] = parseInt(obj[arr[j]]+1);
    }
  }
  return obj;
}
// 在页面展示标签分类
function showTags(res) {
  var showTags = $$$('showTags')[0];
  for (var name in res) {
    var tag = document.createElement('li');
    tag.innerHTML = name + '(' + res[name] + ')';
    tag.className = 'tagClassStyle';
    showTags.appendChild(tag);
  }
}
function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}