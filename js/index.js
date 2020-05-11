// 获取cookie
 // 获取 cookie 的键
// 旧的浏览器有中文的问题（乱码）,需要使用unescape进行解码
function getCookieKey(key){ 
    let ciy =unescape(document.cookie);
  let a =ciy.split("; ");    // split  把字符串用； 分隔成数组
  for (let i =0 ;i<a.length;i++){
      if(a[i].indexOf(key+"=")==0){
          let b=a[i].split("=");
          return b[1]; 
      }
  }
  return null;
   
}

 let  userName =getCookieKey("userName");
 console.log(userName);
$(".reg-c").children("span").html(`欢迎您：${userName}`);


// banner 轮播图
class Swiper{
    constructor(selector,obj){
        this.$box=$(selector);
        this.$span=this.$box.find("span");
        this.$img=this.$box.find("img");
        this.$lis =this.$box.find("li");
        this.$width =this.$box.width();
        let  def={
            width:this.$width,
            ord:0,
            liColor:"#fff",
            liHiColir:"#ccc",
            timelong:4000,
            time:null
        }
        if(obj){
            for(let key in obj){
                def[key]=obj[key];
            }
        }
        for (let key in def){
            this[key]=def[key];
        }
        this.autoplay();
        this.addevent();
    }
    
    autoplay(){
     this.time = setInterval(()=>{
        this.goImg(this.ord+1);
    },this.timelong)

    }

    goImg(transOrd){

        if(transOrd==this.ord){
            return
        }

        let  outOrd=this.ord; //把当前图片保存，使它将要出去
        this.ord=transOrd; // 把传入的图片序号，使它将要进入

        if(this.ord >this.$img.length-1){
            this.ord=0;
        }
        if(this.ord<0){
            this.ord =this.$img. length-1;
        }
        this.$img.eq(outOrd).fadeOut(this.timelong/3);
        this.$img.eq(this.ord).fadeIn(this.timelong/3);
        this.$lis.css({"background":this.liColor});
        this.$lis.eq(this.ord).css({"background":this.liHiColir}); 
    }
    addevent(){
            this.$span.eq(0).click(()=>{
            this.goImg(this.ord-1);

        });
        this.$span.eq(1).click(()=>{
            
            this.goImg(this.ord+1);
        });
        this.$lis.click((event)=>{
 
            let s =$(event.target).index();

           this.goImg(s);
        });
        this.$box.hover(()=>{
            clearInterval(this.time);
            this.time=null;
        },()=>{
            this.autoplay();
        });

    }

}

new Swiper($(".banner-c"));



