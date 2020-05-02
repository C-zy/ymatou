<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $n=$_GET["page"];
    // echo $page;
    $con=new mysqli("localhost","root","123456","ymatou");
    $select="select * from commodity limit {$n},5;";
    $txt=$con->query($select);
    // $demo=array();
    while($arr=$txt->fetch_assoc()){
        $demo[]=$arr;
    }
    echo json_encode($demo);
    $con->close();
?>