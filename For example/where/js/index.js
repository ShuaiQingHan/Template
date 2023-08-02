
$(function(){
//	$("a").attr("target","_blank");
	//登录相关
	loglive();

////获取接口数据
//$(function(){
//	$.get("http://47.104.244.134:8080/goodsbytid.do?tid=13&page=2&limit=10",function(data){
//		var arr=data.data;
//		for(var i=0;i<arr.length;i++)
//	}
//})

//轮播图
  var index = 0;
  var timer = null;
  var oUl = $id("img-list");//运动的ul
  var ulist = oUl.children;
  var olist = $id("banner-nav-list").children;
                    
  timer = setInterval(autoPlay , 2000);
  function autoPlay(){
      index++;
      for( var i = 0 ; i < olist.length ; i++ ){
          olist[i].className = "";
      }
      if( index == 5 ){
          oUl.style.left = 0;
          index = 1;
      }
      startMove( oUl , {left : -index*945} );
                    
      olist[index==4 ? 0 : index].className = "active";
  }
                    
  //鼠标移入移出操作定时器   同时箭头显示和隐藏
  $id("banner").onmouseover = function(){
      clearInterval(timer);
      startMove( $id("arr") , {"opacity":100})
  }
  $id("banner").onmouseout = function(){
      timer = setInterval(autoPlay , 2000);
      startMove( $id("arr") , {"opacity":0})
  }
  //操作下标
  for( let i = 0 ; i < olist.length ; i++ ){
      olist[i].onmouseover = function(){
          index = i-1;
          autoPlay();
      }
  }
  
  //回到顶部
  function $(id){
		return document.getElementById(id);
	}
	window.onscroll = function(){
		var sTop = document.body.scrollTop || document.documentElement.scrollTop;
		if( sTop > 0 ){
			$("gotop").style.display = "block";
		}
	}
	$("gotop").onclick = function(){
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		$("gotop").style.display = "none";
	}
})		

