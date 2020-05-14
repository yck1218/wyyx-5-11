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

   function getBackgroundImg(){  //获取相应的背景图片
      let w =$(".tea-content-l > div > img").attr("src");
       $(".tea-content-l > div > div ").css({"background-image":`url(${w})`})
   }
    
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
         getBackgroundImg();
      });

      $(".tea-content-l > ul > li").eq(1).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.beiyong1}`);
         getBackgroundImg();
      });

      $(".tea-content-l > ul > li").eq(2).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.beiyong2}`);
         getBackgroundImg();
      });

      $(".tea-content-l > ul > li").eq(3).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.beiyong3}`);
         getBackgroundImg();
      });

      $(".tea-content-l > ul > li").eq(4).click(function () {
         $(".tea-content-l > div > img").attr("src", `${data.goodsImg}`);
         getBackgroundImg();
      });
      getBackgroundImg();

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
   let  minBox=null;
   $(".tea-content-l >div").hover(function(){

           $(this).children("div").css({"display":"block"})
      minBox =document.createElement("span");  // 创建一个盒子代表查看区域

      $(this).mousemove(function(event){
         let e= event || window.event;
      let left1=this.offsetLeft; //  获取盒子的偏移量 left
      let top1=this.offsetTop;  // 获取盒子得偏移量 top

      minBox.style.cssText=`
         width: 200px;
         height: 200px;
         background: gold;
         opacity: .2;
         display: block;
         position: absolute;
         z-index:10
      `;
      this.appendChild(minBox);

      
      let width1=minBox.offsetWidth;  //获取元素的宽度
      let height1=minBox.offsetHeight; // 获取元素的高度
    
      let lefT = e.pageX - left1 -width1/2;
      let toP =  e.pageY - top1 - height1/2;     
         if(lefT<0){
            lefT=0;
      }else if(lefT+width1>this.offsetWidth){
            lefT = this.offsetWidth- width1;
      }
      
      if(toP<0){
            toP=0;
      }else if(toP+height1>this.offsetWidth){
            toP = this.offsetWidth- height1;
      }

      minBox.style.left = lefT+"px";
      minBox.style.top = toP+"px";   
      
      $(".tea-content-l >div>div").css({"backgroundPosition":`-${lefT*2}px -${toP*2}px`})
      
      });
      

   },function(){
      $(this).children("div").css({"display":"none"})
      // this.removeChild(minBox);
      this.removeChild($(this).children('span')[0]);


   });

   function magniffy(){  // 放大镜效果

   }
magniffy();
}

$(function () {
   furniture();
 

});