var timer=null;
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(auto,30);
	function auto(){
		var flag=true;
		for(var attr in json){
			var target=json[attr];
			var current=0;
			if(attr=="opacity"){
				current=parseFloat(getStyle(obj,attr))*100;
			}else{
				current=parseInt(getStyle(obj,attr));
			}
			var speed=(target-current)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(attr=="opacity"){
					obj.style.opacity=(current+speed)/100;
					obj.style.filter="alpha(opacity:"+(current+speed)+")";
				}else{
					obj.style[attr]=current+speed+"px";
				}
				if(current!=target){
					flag=false;
				}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	}
}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
