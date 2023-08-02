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
//动态创建元素
function createEle(ele){
	return document.createElement(ele);
}




//运动框架
//obj要操作的对象
//target  目标值
// attr  操作的样式属性，宽高透明度什么的
//obj.timer让每个对象都有一个自己的定时器，
//callback回调函数，回头再调用，上一个动作完成进入下一个动作；
function startMove(obj,target,attr,collback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var current = 0;
		if( attr == "opacity" ){ //如果操作的是透明度
			current = parseFloat( getStyle(obj,attr) ) * 100;
			//将函数的调用单独提出来，string类型不能直接使用，将字符串转成小数,透明度放大100倍操作
		}else{
			current = parseInt( getStyle(obj,attr) ) ; //其他属性的操作将字符串转成整数
		}
		
		var speed = (target-current)/10;
		//改变速度，target是固定不变的值，obj.offsetLeft值越大，除10之后speed值越小；从而实现速度的改变
		speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		//如果speed值大于0就向上取整；如果speed值小于0就向下取整；为的是不丢失小数点后面的数，以免
		//物体到不了target就停止或左右跳动
		if( current==target ){
			clearInterval( obj.timer );
			collback();//函数的调用，适用在链式运动
		}else{
			if( attr == "opacity" ){ //透明度的操作
				obj.style[attr] = (current + speed) / 100;
				//当前获取到的样式值加速度除以100返回之前的透明度
			}else{
				obj.style[attr] = current + speed + "px";//
			}
		}
	},30)
}

//获取非行内元素样式    实际值  
function getStyle(obj,attr){ //操作的是哪个对象的哪个属性
	if( getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];//false可写可不写，没有什么意义
	}else{
		return obj.currentStyle[attr];//兼容ie
	}
}




//obj要操作的对象
// json 代表 多个attr和target   { "width" : 3 ,"height":3000 }
// callback 表示一个函数    一个函数作为参数，这样的函数 叫做   回调函数
function startMove2(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//如果值为真  表示所有动作都已经完成 可以停止定时器了
		for( var attr in json ){
			var current = 0;
			if( attr == "opacity" ){ //透明度
				current = parseFloat( getStyle(obj,attr) ) * 100;
				//将函数的调用单独提出来，string类型不能直接使用，将字符串转成小数,透明度放大100倍操作
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle(obj,attr) ) ;
			}else{
				current = parseInt( getStyle(obj,attr) ) ; 
			}
			
			var speed = (json[attr]-current)/10;
			//改变速度，target是固定不变的值，obj.offsetLeft值越大，除10之后speed值越小；从而实现速度的改变
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			//如果speed值大于0就向上取整；如果speed值小于0就向下取整；为的是不丢失小数点后面的数，以免
			//物体到不了target就停止或左右跳动
			if( current!=json[attr] ){//没有达到目标值  将开关变成false
				flag = false;
			} 
			
			if( attr == "opacity" ){ //透明度的操作
				obj.style[attr] = (current + speed) / 100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
	
		//如果flag值为真  表示所有动作都已经完成 可以停止定时器了
		if( flag ){
			clearInterval( obj.timer );
			//上个动作结束后进入下一个动作   
			if( callback ){
				callback();
			}
		}
	},30)
}


//获取非行内元素样式    实际值  
function getStyle(obj,attr){ 
	if( getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}

//碰撞函数
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetWidth + obj1.offsetLeft;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetHeight + obj1.offsetTop;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetWidth + obj2.offsetLeft;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetHeight + obj2.offsetTop;
	
	//如果碰不上   返回false  碰上了就返回true
	if( R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2){
		return false;
	}else{
		return true; //碰上了
	}
}