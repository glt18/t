<?php 
  header("Content-Type: text/html;charset:utf-8");
  $username = $_POST['username'];
  $password = $_POST['password'];
  if ($username == 'ganlintong' && $password == 'glt0204') {
    session_start();
    // $final = array('status' => 'succeed','identity' => 'manager');
    // echo json_encode($final);
    echo "manager";
  } else {
    // $final = array('status' => 'failed','identity' => 'user');
    // echo json_encode($final);
    echo "user";
  }
 ?>