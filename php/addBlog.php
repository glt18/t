<?php 
  require "Parsedown.php";
  header("Content-Type:text/html; charset:utf-8");
  $title = $_POST['title'];
  $content = $_POST['content'];
  $reportTime = $_POST['reportTime'];
  $Parsedown = new Parsedown();
  $type = $_POST['type'];
  $tags = $_POST['tags'];
  $title = htmlspecialchars($title,ENT_QUOTES);
  $content = htmlspecialchars($Parsedown->text($content),ENT_QUOTES);
  $type = htmlspecialchars($type,ENT_QUOTES);
  $tags = htmlspecialchars($tags,ENT_QUOTES);
  $db = new mysqli("localhost","root","","blog");
  if (mysqli_connect_errno()) {
    echo "连接失败".mysqli_connect_error();
    exit();
  }
  $db->query("set names utf8");
  $sql = "insert into article(id,title,reporttime,type,tags,content)values('','{$title}','{$reportTime}','$type','$tags','$content')";
  $result = $db->query($sql);
  $row = $db->affected_rows;
  if ($row > 0) {
    echo "succeed";
  } else {
    echo "failed";
  }
 ?>