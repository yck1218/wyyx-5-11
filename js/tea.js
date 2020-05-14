function furniture() {
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
   let goodsId = location.search.split("=")[1];   //   获取浏览器窗口问号后面的参数 也就是商品列表传入的参数

   $.get("./php/getGoodsInfo.php", { "goodsId": goodsId }, function (data) {

      $(".tea-content-l > div > img").attr("src", `${data.goodsImg}`);   //    获取到图片

      $(".tea-content-l > div > em").html(`2020新品${data.goodsType}系列>`);
      $(".prodict > p:nth-child(1) span").html(`
  <i>￥</i>
  ${data.goodsPrice}
  
  `);

      $(".tea-content-r > p:nth-of-type(3) span ").html(data.goodsDesc);
      $(".tea-content-r > p:nth-of-type(1) > em").html(`${data.goodsName}`);  // 获取对应标题

      $(".tea-content-l > ul > li").eq(0).find("img").attr("src", `${data.goodsImg}`);
      $(".tea-content-l > ul > li").eq(1).find("img").attr("src", `${data.beiyong1}`);
      $(".tea-content-l > ul > li").eq(2).find("img").attr("src", `${data.beiyong2}`);
      $(".tea-content-l > ul > li").eq(3).find("img").attr("src", `${data.beiyong3}`);
      $(".tea-content-l > ul > li").eq(4).find("img").attr("src", `${data.goodsImg}`);

      $(".tea-content-l > ul > li").eq(0).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.goodsImg}`);
      });

      $(".tea-content-l > ul > li").eq(1).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.beiyong1}`);
      });

      $(".tea-content-l > ul > li").eq(2).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.beiyong2}`);
      });

      $(".tea-content-l > ul > li").eq(3).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.beiyong3}`);
      });

      $(".tea-content-l > ul > li").eq(4).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.goodsImg}`);
      });
   }, "json");

   $(".tea-content-r>p:nth-of-type(5) span:nth-of-type(2) ").click(function () { //点击购物车发送ajax请求保存数据
      $.post("./php/addShoppingCart.php", {
         "vipName": userName,
         "goodsId": goodsId,
         "goodsCount": $("#num").val(),
      }, function (data) {
         if (data == 1) {
            console.log("添加成功！！！");
         }

      })
   });


   $("#minus").click(function () {  // 增加数量
      let num = $(this).next().val();
      num--;
      if (num <= 1) {
         // return;
         $(this).prop('disabled', true);   //添加禁用
         // $(this).next().val(num);

      }
      $(this).next().val(num);
   });

   $("#add").click(function () {  // 减少数量
      let num = $(this).prev().val();
      num++;
      $(this).prev().val(num);
   });

}

$(function () {
   furniture();

});