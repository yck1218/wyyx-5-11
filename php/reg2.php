<?php 

header("Content-Type: text/html;charset=utf-8"); 
$name=$_GET["name"]; 
// $password=$_GET["password"]; 
$cons=mysqli_connect("localhost","root","","nz");
    $sql="SELECT * FROM `usname`  WHERE name='{$name}'";
$result=mysqli_query($cons,$sql);
mysqli_close($cons);
$arr =mysqli_fetch_all($result,MYSQLI_ASSOC);
// $arr =mysqli_fetch_array($result,MYSQLI_ASSOC);
// echo json_encode($arr);
echo count($arr);
?>
