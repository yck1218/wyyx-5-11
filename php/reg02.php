<?php 

header("Content-Type: text/html;charset=utf-8"); 
$name=$_POST["name"]; 
$password=$_POST["password"]; 
$cons=mysqli_connect("localhost","root","","nz");
    $sql="INSERT INTO usname(name,password) VALUE ('{$name}','{$password}')";
$result=mysqli_query($cons,$sql);
mysqli_close($cons);
// $arr =mysqli_fetch_all($result,MYSQLI_ASSOC);
// $arr =mysqli_fetch_array($result,MYSQLI_ASSOC);
// echo json_encode($arr);
// echo count($arr);
// echo ($result);
if($result == 1){
    echo 1;
}else {
    echo 0;
}
?>



