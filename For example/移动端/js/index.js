





var aLi=ul.children;
var perWidth=aLi[0].offsetWidth
ul.style.width=aLi.length*perWidth+'px'
var i=0;
var timer=null
var aList=list.children
clearInterval(timer)
timer=setInterval(function(){
	move()
},2000)
function move(){
	i++
	if(i==aLi.length){
		ul.style.left=0;
		i=1
	}
	for(var j=0;j<aList.length;j++){
		aList[j].className=''
	}
	if(i==aLi.length-1){
		aList[0].className='hover'
	}else{
		aList[i].className='hover'
	}
	startMove(ul,{left:-perWidth*i})
}
banner.onmouseover=function(){
	clearInterval(timer)
}
banner.onmouseout=function(){
	timer=setInterval(function(){
		move()
	},2000)
}
for(let j=0;j<aList.length;j++){
	aList[j].onmouseover=function(){
		i=j-1
		move()
	}	
}
btn.onclick=function(){
	aside.style.display='block'
}

title.innerHTML='首页'
btn.onclick=function(){
	startMove(aside,{left:0})
}
var x=aside.offsetWidth
btn1.onclick=function(){
	startMove(aside,{left:-x})
}
var data={
	10001:{src:"img1/1.jpg",title:"降价了，降价了",ID:10001,price:68},
	10002:{src:"img1/2.jpg",title:"便宜了，便宜了",ID:10002,price:78},
	10003:{src:"img1/3.jpg",title:"快买呀，快买呀",ID:10003,price:88},
	10004:{src:"img1/4.jpg",title:"来呀，来呀！",ID:10004,price:98}
}
var str=''
for(var k in data){
	str+=`
		<li>
			<a id='${data[k].ID}' href="detail.html">
				<img src="${data[k].src}" alt="">
				<p>${data[k].title}</p>
				<span>售价: ￥<b>${data[k].price}</b></span>
			</a>
		</li>`
}
xinxi.innerHTML=str

var aLA=section.getElementsByTagName('a')
for(let j=0;j<aLA.length;j++){
	aLA[j].onclick=function(){
		setCookie('detail',aLA[j].id,7)
	}
}

