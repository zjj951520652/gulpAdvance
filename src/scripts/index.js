//js的入口文件

//引入swiper

var Swiper = require("./components/swiper/swiper-3.3.1.min.js");
//引入swiper animate
var SwiperAnimate = require("./components/swiper/swiper.animate1.0.2.min.js");
//引入zepto  里面不包含ajax;
var $ = require("./components/zepto-modules/_custom");

//这里面包含ajax;
var s = require("./components/zepto-modules/_default");


var bgArr=["url(../images/logo/h5.jpg)","url(../images/logo/cs.png)","url(../images/logo/jquery.jpg)","url(../images/logo/anjularjs.jpg)","url(../images/logo/swiper.png)"];
     
//tap点击
     $("#enter").tap(function(){
     	$("#mainContent").show();
      $(".swiper-container").hide();
      $("#footer div").eq(0).css({"background":"#fff"});
      $("#footer div").eq(0).css("color","#66CC00");
      //ajax请求
      s.post("/api/skill",{},function(response){
      //console.log(response);
     var html="";
     for(var i=0;i<response.length;i++){
          html+="<li>"+"category:"+response[i].category+"<br/>"
          +"name:"+response[i].name+"<br/>"
          +"time:"+response[i].time+"<br/>"
          +"level:"+response[i].level+"</li>";
     }
     $("#header").html("Skill");
     $("#scroller ul").html(html);
      //iscroll的js
      myScroll = new IScroll('#wrapper', { mouseWheel: true });
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        })
  })
//点击显示请求数据
 $("#footer div").tap(function(){
      var apiTarget = $(this).attr("id");
      $("#footer div").css("background","#444");
      $("#footer div").css("color","#eee");
      $(this).css({"background":"#fff"});
      $(this).css("color","#66CC00");
    //进行post请求 请求api、skill 数据并将数据显示到iscroll里;
    s.post("/api/"+apiTarget,{},function(response){
      //console.log(response);
     var html="";
     
      for(var i=0;i<response.length;i++){
        if(apiTarget==="skill"){
          html+="<li>"+"category:"+response[i].category+"<br/>"
          +"name:"+response[i].name+"<br/>"
          +"time:"+response[i].time+"<br/>"
          +"level:"+response[i].level+"</li>";
     }else if(apiTarget==="project"){
          html+="<li>"+"category:"+response[i].category+"<br/>"
          +"name:"+response[i].name+"<br/>"
          +"url:"+response[i].url+"<br/>"
          +"description:"+response[i].description+"<br/>"
          +"detail:"+response[i].detail+"<br/>"
          +"tech:"+response[i].tech+"</li>";
     }else if(apiTarget==="work"){
          html+="<li>"+"category:"+response[i].category+"<br/>"
          +"name:"+response[i].name+"<br/>"
          +"url:"+response[i].url+"<br/>"
          +"time:"+response[i].time+"<br/>"
          +"posts:"+response[i].posts+"<br/>"
          +"reportto:"+response[i].reportto+"<br/>"
          +"peoples:"+response[i].peoples+"<br/>"
          +"projects:"+response[i].projects+"</li>";
     }
        

     }
     
            $("#header").html(apiTarget);
            $("#scroller ul").html(html);
            $(function(){
            var aLi=$("#scroller ul li");
            console.log(aLi);
            for(var i=0;i<aLi.length;i++){
            $("#scroller ul li").eq(i).css("backgroundImage",bgArr[i]);
            }
            });

      //iscroll的js
      myScroll = new IScroll('#wrapper', { mouseWheel: true });
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
})

      })

//加入load优化页面
var interval = setInterval(function(){
    if(document.readyState==="complete"){
      clearInterval(interval);
      $("#preload").hide();
      $(".swiper-container").show();
      mySwiper.updateContainerSize();
      mySwiper.updateSlidesSize();
    }else{
      $("#preload").show();
    }
},100)







//引入iscroll
var IScroll = require("./components/iscroll/iscroll.js");
console.log(IScroll);


var mySwiper = new Swiper ('.swiper-container', {
  effect:"cube",
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
  })      

//设置iscroll对象默认hide;
$("#mainContent").hide();
$(".swiper-container").hide();
























/*var dateUtil=require("./commom/utils/dataUtil.js");
var List=require("./modules/list.js");
var Detail=require("./modules/detail.js");
var $=require("./commom/libs/jquery-1.12.4.js");

$.post("/api/skill",{},function(response){
	console.log(response);
	var html="<ul>"
	for(var i=0;i<response.length;i++){
		html+="<li>"+response[i].name+"</li>";	
	}
	html+="</ul>";
	$("#list").html(html);
})
*/

/*console.log($);
console.log(List("222"));
console.log(Detail);*/

/*var detailInstance = new Detail();*/

/*console.log(detailInstance.say("3333"));

console.log("main js");
console.log(dateUtil.getDate());
*/