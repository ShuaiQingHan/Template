//obj要操作的对象
// json 代表 多个attr和target   { "width" : 3 ,"height":3000 }
// callback 表示一个函数    一个函数作为参数，这样的函数 叫做   回调函数
function startMove(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//如果值为真  表示所有动作都已经完成 可以停止定时器了
		for( var attr in json ){
			var current = 0;
			if( attr == "opacity" ){ //透明度
				current = parseFloat( getStyle(obj,attr) ) * 100;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle(obj,attr) ) ;
			}else{
				current = parseInt( getStyle(obj,attr) ) ; 
			}
			
			var speed = (json[attr]-current)/10;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
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
