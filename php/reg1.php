<?php 

header("Content-Type: text/html;charset=utf-8"); 
$name=$_POST["name"]; 
$password=$_POST["password"]; 
$cons=mysqli_connect("localhost","root","root","goodsAndShoppingCart");
    // $sql="SELECT * FROM `usname`  WHERE name='{$name}'";
    $sql="SELECT * FROM  usname WHERE  `name`='{$name}' AND `password`='{$password}'";
$result=mysqli_query($cons,$sql);
mysqli_close($cons);
$arr =mysqli_fetch_all($result,MYSQLI_ASSOC);
// $arr =mysqli_fetch_array($result,MYSQLI_ASSOC);
// echo json_encode($arr);
// echo count($arr);
if(count($arr)==1){
    echo 1;
}else if(count($arr)==0){
    echo 0;
}
?>
