<?php 
  require "Parsedown.php";
  header("Content-Type: json; charset:utf-8");
  $userId = $_POST['userId'];
  $messageTime = $_POST['messageTime'];
  $messageCon = $_POST['messageCon'];
  $Parsedown = new Parsedown();
  $messageCon = htmlspecialchars($Parsedown->text($messageCon),ENT_QUOTES);
  $db = new mysqli("localhost","root","","blog");
  if (mysqli_connect_errno()) {
    echo "连接失败".mysqli_connect_error();
    exit();
  }
  $db->query("set names utf8");
  $sql = "insert into messages(userid,messagetime,content)values('{$userId}','{$messageTime}','".mysql_escape_string($messageCon)."')";
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