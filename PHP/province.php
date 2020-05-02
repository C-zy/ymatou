<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $connect=new mysqli("localhost","root","123456","ymatou");
    $select="select * from hat_province;";
    $data=$connect->query($select);
    while($arr=$data->fetch_assoc()){
        $arrs[]=$arr;
    }
    echo json_encode($arrs);
?>