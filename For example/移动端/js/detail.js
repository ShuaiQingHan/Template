






title.innerHTML='详情'


var x=aside.offsetWidth
btn1.onclick=function(){
	startMove(aside,{left:-x})
}
var data={10001:"这是第一条的详细信息",
		  10002:"这是第二条的详细信息",
		  10003:"这是第三条的详细信息",
		  10004:"这是第四条的详细信息"}
var a=getCookie('detail')
var p=detail.children[0]
p.innerHTML=data[a]

if(getCookie('love')){
	var obj=JSON.parse(getCookie('love'))
}else{
	obj={}
}
btn2.onclick=function(){
	if(obj[a]==undefined){
		obj[a]=1
	}else{
		obj[a]++
	}
	var str2=JSON.stringify(obj)
	setCookie('love',str2,7)
	alert('加入成功')
}
var fanhui=header.children[0]
fanhui.onclick=function(){
	history.go(-1)
}



