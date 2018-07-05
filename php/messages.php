<?php 
  header("Content-Type:json;charset:utf-8");
  $db = new mysqli("localhost","root","","blog");
  if (mysqli_connect_errno()) {
    echo "连接失败".mysqli_connect_error();
    exit();
  }
  $data = [];
  $db->query("set names utf8");
  $sql = "select * from messages";
  $result = $db->query($sql);
  $num = $db->affected_rows;
  for ($i=0; $i < $num; $i++) { 
    $row = $result->fetch_array();
    $row["content"] = htmlspecialchars_decode($row["content"],ENT_QUOTES);
    $arrayLenth = array_push($data,$row);
  }
  if ($arrayLength = 4) {
    $final = array('result' => $data);
    $print = json_encode($final);
    echo $print;
  }else {
    $final = array('result' => "error");
    $print = json_encode($final);
    echo $print;
  }
 ?>