







btn.onclick=function(){
	startMove(aside,{left:0})
}
var x=aside.offsetWidth
btn1.onclick=function(){
	startMove(aside,{left:-x})
}
title.innerHTML='购物车'
var ul=cart.children[0]
var data={
	10001:{src:"img1/1.jpg",title:"降价了，降价了",ID:10001,price:68},
	10002:{src:"img1/2.jpg",title:"便宜了，便宜了",ID:10002,price:78},
	10003:{src:"img1/3.jpg",title:"快买呀，快买呀",ID:10003,price:88},
	10004:{src:"img1/4.jpg",title:"来呀，来呀！",ID:10004,price:98}
}
if(getCookie('love')){
	var arr=JSON.parse(getCookie('love'))
}
load()

var aJia=getByClass('jia')
var aJian=getByClass('jian')
var aXz=getByClass('xz')
var aBtn3=getByClass('btn3')
for(let i=0;i<aJia.length;i++){
	aJia[i].onclick=function(){
		aJia[i].parentNode.children[1].innerHTML=++arr[aJia[i].getAttribute('idd')]
		var str4=JSON.stringify(arr)
		setCookie('love',str4,7)
		money()
	}
	aJian[i].onclick=function(){
		if(arr[aJian[i].getAttribute('idd')]<=1){
			arr[aJian[i].getAttribute('idd')]=1
		}
		aJia[i].parentNode.children[1].innerHTML=--arr[aJian[i].getAttribute('idd')]
		str4=JSON.stringify(arr)
		setCookie('love',str4,7)
		money()
	}
}
var a=pay.children[1].children[0]
for(let i=0;i<aXz.length;i++){
	aXz[i].onclick=function(){
		money()
	}
}
btn4.checked=false
btn4.onclick=function(){
	if(btn4.checked==true){
			for(i=0;i<aXz.length;i++){
			aXz[i].checked=true
		}
	}else{
			for(i=0;i<aXz.length;i++){
			aXz[i].checked=false
		}
	}
	money()
}
for(let i=0;i<aBtn3.length;i++){
	aBtn3[i].onclick=function(){
		var b=this.parentNode.children[3].children[0].getAttribute('idd')
		delete arr[b]
		var str6=JSON.stringify(arr)
		setCookie('love',str6,7)
		ul.removeChild(this.parentNode)
		money()
	}
}
function money(){
	var sum=0
	for(var j=0;j<aXz.length;j++){
		if(aXz[j].checked==true){
			var k=aXz[j].parentNode.children[3].children[0].getAttribute('idd')
			var per=aXz[j].parentNode.children[4].children[0].innerHTML
			sum+=arr[k]*per
		}
	}
	a.innerHTML=sum
}
function load(){
	var str3=''
	for(var i in arr){
	str3+=`
		<li>
			<input type="checkbox" class="xz">
			<img src="${data[i].src}" alt="">
			<p>${data[i].title}</p>
			<strong>数量<a class="jian" idd='${i}' href="javascript:;">&#xe729;</a><i>${arr[i]}</i>
			<a class="jia" idd='${i}' href="javascript:;">&#xe727;</a></strong>
			<span>单价￥<b>${data[i].price}</b></span>
			<input type="button" class="btn3" value="删除">
		</li>`
	}
	ul.innerHTML=str3	
}

function getByClass(sClass){
	if(document.getElementsByClassName){
		return document.getElementsByClassName(sClass);
	}
	var newArr=[];
	var All=document.getElementsByTagName('*')
	for(var i=0;i<All.length;i++){
		var a=All[i].className
		var arr=a.split(' ')
		for(var j=0;j<arr.length;j++){
			if(arr[j]==sClass){
				newArr.push(All[i])
			}
		}
	}
	return newArr;
}


