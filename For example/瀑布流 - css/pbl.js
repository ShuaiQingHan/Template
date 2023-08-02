window.onload = function(){
	wf();
	
	//触发滚动条
	window.onscroll = function(){
		//当最后一个box的高度的一半  进入到可视区时  开始加载图片
		var lastBox = boxs[boxs.length-1];
		//最后一个盒子高度
		lastBoxHeight = lastBox.offsetTop + lastBox.offsetHeight/2;
		//窗口的高度和页面滚走距离
		var wHeight = window.innerHeight;
		var sTop = document.documentElement.scrollTop||document.body.scrollTop;
		if( lastBoxHeight < wHeight+sTop ){
			//开始加载图片
			var json = { data : [{src:"2.jpg"},{src:"20.jpg"},{src:"12.jpg"},{src:"15.jpg"}] };
			for( var i = 0 ; i < json.data.length ; i ++ ){
				var box = createEle("div");
				box.className = "box";
				$id("main").appendChild(box);
				
				var pic = createEle("div");
				pic.className = "pic";
				box.appendChild(pic);
				
				var oimg = createEle("img");
				oimg.src = "images/" + json.data[i].src;
				pic.appendChild(oimg);
			}
		}
		wf();
	}
}
/*
			 <div class="box">
				<div class="pic">
					<img src="images/20.jpg" />
				</div>
			</div>
 * */
var boxs = document.getElementsByClassName("box");
//瀑布流功能实现
function wf(){
	//找到所有要操作的图片的box
	//获取一个box的宽度
	var boxW = boxs[0].offsetWidth;
	
	//定义一个空数组 用来存放每一列的高度
	hArr = [];
	
	//遍历所有的boxs  将前六张图片的高度值存入到数组中   定位第七张及其后面的所有图片
	for( var i = 0 ; i < boxs.length ; i++ ){
		if( i < 6 ){//将前六张图片的高度值存入到数组中
			hArr.push( boxs[i].offsetHeight );
		}else{
			//获取数组中列高最小的下标
			var index = minHeightIndex();
			//定位第七张及其后面的所有图片
			boxs[i].style.position = "absolute";
			boxs[i].style.left = index * boxW + "px";
			boxs[i].style.top = hArr[index] + "px";
			
			//将index对应的数组中的高度值改变   数组中原来的值 + 当前图片的高度值
			hArr[index] += boxs[i].offsetHeight;
		}
	}
	console.log( hArr );
}

//查找数组中最小值的下标
function minHeightIndex(){
	var minHeight = hArr[0];
	var index = 0;
	for( var i = 0 ; i < hArr.length ; i++ ){
		if( minHeight > hArr[i] ){
			minHeight = hArr[i];
			index = i;
		}
	}
	return index;
}
