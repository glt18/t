<?php 
  header("Content-Type: text;charset: utf-8");
  $title = $_POST['title'];
  $db = new mysqli("localhost","root","","blog");
  if (mysqli_connect_errno()) {
    echo "连接失败".mysqli_connect_error();
    exit();
  }
  $db->query("set names utf8");
  $sql = "delete from article where title='{$title}'";
  $result = $db->query($sql);
  $row = $db->affected_rows;
  if ($row > 0) {
    echo "succeed";
  } else {
    echo "failed";
  }
 ?>