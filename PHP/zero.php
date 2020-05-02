<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $id=$_GET["id"];
    $connect=new mysqli("localhost","root","123456","ymatou");
    $update="update commodity set mark=0 where id={$id};";
    $date=$connect->query($update);
    while($arr=$data->fetch_assoc()){
        $arrs[]=$arr;
    }
    echo json_encode($arrs);
?>
