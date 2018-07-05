<?php 
  require "Parsedown.php";
  header("Content-Type: json; charset:utf-8");
  $userId = $_POST['userId'];
  $commentTime = $_POST['commentTime'];
  $commentCon = $_POST['commentCon'];
  $commentsId = $_POST['commentsId'];
  $articleId = $_POST['articleId'];
  $Parsedown = new Parsedown();
  $commentCon = htmlspecialchars($Parsedown->text($commentCon),ENT_QUOTES);
  $db = new mysqli("localhost","root","","blog");
  if (mysqli_connect_errno()) {
    echo "连接失败".mysqli_connect_error();
    exit();
  }
  $db->query("set names utf8");
  $sql = "insert into comments(userid,commenttime,content,commentsid,articleid)values('{$userId}','{$commentTime}','{$commentCon}','{$commentsId}','{$articleId}')";
  $result = $db->query($sql);
  $row = $db->affected_rows;
  if ($row > 0) {
    $print = array('status' => 'succeed');
    echo json_encode($print);
  } else {
    $print = array('status' => 'failed');
    echo json_encode($print);
  }
 ?>