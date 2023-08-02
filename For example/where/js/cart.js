$(function(){
//	$("a").attr("target","_blank");
	//登录相关
	loglive();
})
	var arr = getCookie("shoplist");
	var html = "";
	for( var i = 0 ; i < arr.length ; i++ ){
		var shopinfo = arr[i];//[{},{},{}]
		html += '<div class="shop-item clearfix">'+
					'<p class="fl"><input type="checkbox" class="ck"/></p>'+
					'<img class="fl" src="img/'+ shopinfo.src +'" alt="" />'+
					'<p class="fl f2">'+ shopinfo.name +'</p>'+
					'<span class="fl">'+ '￥'+shopinfo.price +'元</span>'+
					'<p class="fl count" '+
						'data-id="'+ shopinfo.id +'" '+
						'data-price="'+ shopinfo.price +'" data-count="'+ shopinfo.count +'"'+
						'data-name="'+ shopinfo.name +'" data-src="'+ shopinfo.src +'"'+
						'>'+
						'<span class="updateCount" data-number="-1">-</span>'+
						'<span class="shop-count">'+ shopinfo.count +'</span>'+
						'<span class="updateCount" data-number="1">+</span>'+
					'</p>'+
					'<em class="fl sumPrice">'+ (shopinfo.count * shopinfo.price) +'元</em>'+
					'<i class="fl delBtn">删除</i>'+
				'</div>';
	}
	$(".shoplist").html( html );
		
	//结算
	function jiesuan(){
		//获取被选中的复选框的商品数量  累加
		var sumCount = 0;
		var sumMoney = 0;
		$(".ck:checked").each(function(){
			sumCount += parseInt( $(this).parent().parent().find(".shop-count").html() );
			sumMoney += parseInt( $(this).parent().parent().find(".sumPrice").html() );
		})
		$(".count2").html( sumCount );
		$(".money2").html( sumMoney );
		$("#cartNum").html( sumCount );
	}
	$(".ck").click(function(){
		jiesuan();
	})
	//全选
	$("#selectAll").click(function(){
		$(".ck").prop("checked",$(this).prop("checked"));
		jiesuan();
	})
	//加减操作
	$(".updateCount").click(function(){
		
		//获取页面要操作的商品编号和名称
		var pid = $(this).parent().data("id");
		var pname = $(this).parent().data("name");
		//取出操作符
		var sign = $(this).data("number");
		var count = $(this).parent().find(".shop-count").html();
		if( count == 1 && sign == "-1" ){
			return ;
		}
		//操作cookie
		for( var i = 0 ; i < arr.length ; i++ ){
			if( arr[i].id == pid && arr[i].name == pname ){ //确定要操作cookie中的哪一个商品
				//判断++  -- 
				sign==1 ? arr[i].count++ : arr[i].count--;
				//操作cookie 把数组重新存入到cookie
				setCookie("shoplist",JSON.stringify(arr));
//				set Cookie("shoplist"JSON.stringify(arr));
				//操作页面
				$(this).parent().find(".shop-count").html( arr[i].count );
				$(this).parent().parent().find(".sumPrice").html( arr[i].count*arr[i].price +"元" );
				break;
			}
		}
		jiesuan();
	})
	//删除 
	$(".delBtn").click(function(){
		var pid = $(this).parent().find(".count").data("id");
		var pname =  $(this).parent().find(".count").data("name");
		//操作cookie
		for( var i = 0 ; i < arr.length ; i++){
			if( arr[i].id == pid && arr[i].name == pname ){
				//操作数组 
				arr.splice( i,1 );
				//将数组重新存入到cookie
				setCookie("shoplist",JSON.stringify(arr));
				break;
			}
		}
		$(this).parent().remove();
	})
	
//	//操作页码显示对应页的数据   委托
//	pageUl.onclick = function(e){
//		var e = e || event;
//		var target = e.target || e.srcElement;
//		if( target.nodeName == "LI" ){
//			//获取当前页码的index
//			index = parseInt( target.innerHTML );
//			getData();
//		}
//	}
//	//首页
//	oSpans_Left.onclick=function(){
//		getData(index=1);
//	}
//	//尾页
//	oSpanw_Right.onclick=function(){
//		getData(index = pageTotle);
//	}

		
//	}
//	
//	
//});

		
		

