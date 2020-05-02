<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $connect=new mysqli("localhost","root","123456","ymatou");
    $phone = $_POST["phone"];
    $paw = $_POST["password"];
    $user = $_POST["user"];
    // $phone = '123123';
    // $paw = "123123";
    // $user = '123123';
    $select="INSERT INTO user (name, password, phone) VALUES ('{$user}', '{$paw}', '{$phone}')";
    // $connect->query($select);
    if ($connect->query($select) === TRUE) {
        echo "注册成功";
		header('location:../index.html?n='.$user);
    } else {
        echo "Error: " . $select . "<br>" . $connect->error;
    }
     
    $connect->close();
    
?>