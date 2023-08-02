//判断字符串中每个字母数字符号等出现了多少次
function fnCount(str){
 		for(var code = 0;code <= 122;code ++){//根据code值得到对应的字符；
 			var ch = String.fromCharCode(code);
 			//判断ch在字符中出现的次数；
 			var count=0;//次数;
 			for(var i = 0;i <str.length;i ++){
 				if(str.charAt(i) == ch ){//字符串用引号括起来；
 				count ++;
 			 	}
 			}
 			if(count>0){
 				console.log("字符"+ch+"出现了"+count+"次");
 			}
 		}
 	}

 	
 	
//根据id查找页面元素
function $id(id){
	return document.getElementById(id);
}

//获取任意区间值
function rand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}

//随机颜色值获取
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i =1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );
	}
	return color;
}
//日期时间格式封装
function dateToString(sign){
	//如果用户不传递任何参数  默认日期间隔符号是  - 
	sign = sign || "-";//如果sign是未定义，就按默认值 "-"
	var d = new Date();
	var y = d.getFullYear();
	var m =toTwo( d.getMonth() + 1 ) ;
	var _date =toTwo( d.getDate() );
	var h =toTwo( d.getHours() );
	var min =toTwo( d.getMinutes() );
	var s =toTwo( d.getSeconds() );
	return y + sign + m + sign + _date + " " + h + ":" + min + ":" + s;
}
//如果得到的是小于10的数 就 拼接0
function toTwo(val){
	return val < 10 ? "0" + val : val;
}

//定义一个时间差函数  
function timeDiff(start,end){
	return Math.abs( start.getTime()-end.getTime() ) / 1000;
}