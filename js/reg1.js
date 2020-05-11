
$("#dl").click(function(){
$.post("./php/reg1.php",{

    name:`${$("#name").val()}`,
    password:`${$("#password").val()}`
},(a)=>{
    if(a==1){
       console.log("登入成功！！！");
       addCookie("userName",$("#name").val(),7);
       open("./index.html","_self");
    }else if(a==0){
        $(this).prev("span").html("账号或密码不正确，请重新输入！！！");
    }
});

});

$("#name").focus(function(){

    $("#dl").prev("span").html("");   
});
$("#password").focus(function(){

    $("#dl").prev("span").html("");   
});


function addCookie(key,value,date,path,domain){
    let  datE= new Date();
    let d =datE.getDate()+date;
     datE.setDate(d);
     document.cookie =`${key}=${value};expires=`+datE.toGMTString();
}