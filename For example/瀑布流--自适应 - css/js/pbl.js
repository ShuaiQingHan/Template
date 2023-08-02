window.onload = function(){
	waterFall();
}
//$(window).resize(function(){})
window.onresize = function(){
	waterFall();
}
//瀑布流功能
function waterFall(){
	var divBox = $("#wrap");
	var divList = divBox.children();
	var boxWidth = divBox.outerWidth(); //大容器宽度
	var imgWidth =  divBox.children().eq(0).outerWidth(); //一张图片宽度
	//确定列数
	var colCount  = Math.floor(boxWidth / imgWidth);
	
	//确定水平间隙 = 取整（（容器宽度-一张图片的宽度*列数）/(列数+1)）
	var hSpace = Math.floor( (boxWidth - imgWidth*colCount)/(colCount+1) );
	//确定垂直间隙
	var vSpace = 10;
	
	//定义一个数组  用来存放n列的坐标   便于设定图片的位置
	positionArr = [];
	//  left ： n*水平间隙 + （n-1）* 一张图片的宽度
	for( var n = 1 ; n <= colCount ; n++ ){
		var json = {
			left : n*hSpace + (n-1)*imgWidth,
			top : vSpace
		}
		positionArr.push( json );
	}
	//拿到所有的图片  开始定位 ：定位原则：找数组中最小的top值     找到最小top值下标即可
	for( var i = 0 ; i < divList.length ; i++ ){
		var index = getMinTopIndex();
		divList.eq(i).animate({
			left : positionArr[index].left ,
			top : positionArr[index].top
		},1)
		//改变数组中index位置处的top值
		positionArr[index].top += divList.eq(i).outerHeight() + vSpace;
	}
}

//找数组中最小top值的下标
function getMinTopIndex(){
	var index = 0;//假设最小值的下标是 0
	for( var i = 0 ; i < positionArr.length ; i++ ){
		if( positionArr[i].top < positionArr[index].top ){
			index = i;
		}
	}
	return index;
}
