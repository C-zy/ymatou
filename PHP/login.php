<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $connect=new mysqli("localhost","root","123456","ymatou");
    $phone = $_POST["phone"];
	$paw = $_POST["password"];
	// $phone="123456";
	// $paw="123456";
    $select="select * from user where phone={$phone};";
    $data=$connect->query($select);
    if ($data) {
		while($arr=$data->fetch_assoc()) {
			if($paw==$arr["password"]){
			   session_start();
			   $_SESSION["phone"]=$phone;
			   echo(111);
			   echo ($arr["name"]);
			   $n=$arr["name"];
			   header('location:../index.html?n='.$n);
		   } else {
			   header('location:../login.html');
			// echo(2222);
		   }
		}   
   }
	// print_r($arrs);
?>