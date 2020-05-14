// 获取cookie
// 获取 cookie 的键
// 旧的浏览器有中文的问题（乱码）,需要使用unescape进行解码
function getCookieKey(key) {
    let ciy = unescape(document.cookie);
    let a = ciy.split("; ");    // split  把字符串用； 分隔成数组
    for (let i = 0; i < a.length; i++) {
        if (a[i].indexOf(key + "=") == 0) {
            let b = a[i].split("=");
            return b[1];
        }
    }
    return null;
}
let userName = getCookieKey("userName");
function shoppingTrolley() {   //  shopping trolley 购物车
    let htmlRes = "";
    $.get("./php/getShoppingCart.php", { "vipName": userName }, function (data) {
        console.log(data);
        data.forEach(goods => {
            htmlRes += `   
                <div>
                    <div><input type="checkbox" class="btn"></div>
                    <div>
                        <img src="${goods.goodsImg}" title="${goods.goodsName}">
                        <li>
                            <span>${goods.goodsId}</span>
                            <p>${goods.goodsName}</p>
                            <em>${goods.goodsDesc}</em>
                        </li>
                    </div>
                    <div>￥${goods.goodsPrice}</div>
                    <div>
                        <input type="button" value="-" class="minus">
                        <input type="text" value="${goods.goodsCount}">
                        <input type="button" value="+" class="add">
                    </div>
                    <div>￥${goods.goodsCount * goods.goodsPrice}</div>
                    <div><input type="button" value="删除"></div>
                </div>
        `;
        $(".content-c").html(htmlRes);
        // 添加复选框事件 
        $(".content-top > div:nth-child(1) input").check($(".btn"));
        $(".content-bottom > div:nth-child(1) input").check($($(".btn")));
        // 修改购物车信息
        function change(num,id,own){
            $.get("./php/updateGoodsCount.php",{
                "vipName":userName,
                "goodsId":id,
                "goodsCount":num
            },(data)=>{
                if(data==1){
                    own.parent().children().eq(1).val(num);
                    let a=own.parent().prev().html();
                    let money = parseInt((own.parent().children().eq(1).val())*a.substring(1));
                    own.parent().next().html(`￥${money}`);
                } else{
                    alert("系统出错啦！！！！");
                }
            });
        }
        // 给加号添加事件
        $(".add").click(function(){
            let own=$(this);
            let id =$(this).parent().prev().prev().children("li").children("span").html();
            let num =$(this).prev().val();
            num++;
            change(num,id,own);
        });

        // 给减号添加事件
        $(".minus").click(function(){
            let own=$(this);
            let id =$(this).parent().prev().prev().children("li").children("span").html();
            let num =$(this).next().val();
            num--;
            if(num<1){
                return;
            }
            change(num,id,own);
        });
        // 删除购物车信息
        $("input[value=删除]").click(function () {
          if(confirm("您确定要删除吗？")){
               $.get("./php/deleteGoods.php", {
                "vipName": userName,
                "goodsId": goods.goodsId
            }, function (data) {
                if (data == 1) {
                    alert("删除成功");
                    shoppingTrolley();
                } else if (data == 0) {
                    console.log("删除失败！！！");
                }
            });
          }
        });
        });
    }, "json");
}
$(function () {   // 页面打开加载
    shoppingTrolley(); //获取购物车数据
  
});