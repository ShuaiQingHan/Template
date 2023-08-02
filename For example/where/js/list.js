$(function(){
//	$("a").attr("target","_blank");
	//登录相关
	loglive();

window.onload=function(){
		$.ajax({           
			type : "get",
			url : "json/data.json",
			success : function(json){
				var str = "";
				var html = "";
				for(var attr in json){//遍历的json里的键name，用for...in
					str+=`<span cname='${attr}'>${json[attr].name}</span>`;
					//cname='${attr}'自定义属性
					for(var i = 0 ;i<json[attr].list.length;i++){
						//遍历的json里的键list,数组遍历正常用for
						var pro =json[attr].list[i]; //用一个变量接这一大串
						html+=`
							<li>
							    <a href="../detail.html?pid=${pro.id}&cname=${attr}">
								<img src="img/${pro.src}" alt="" />
								<p>${pro.name}</p>
								<p>${pro.price}</p>
							    </a>
							    <button data-name='${pro.name}' data-price='${pro.price}' data-src='${pro.src}' data-id='${pro.id}' >加入购物车</button>
						    </li>`

					}
				}
				$(".nav").html(str);
				$(".shoplist").html(html);
				//分类显示功能
				$(".nav span").mouseenter(function(){//鼠标移入两个大标题时
					//alert( $(this).attr("cname") )
					var page = "";
					var cname = $(this).attr("cname");
					for(var i = 0 ;i<json[cname].list.length;i++){
						
						var pro =json[cname].list[i]; 
						page+=`
							<li>
							    <a href="../detail.html?pid=${pro.id}&cname=${attr}">
								<img src="img/${pro.src}" alt=""  class="li_img"/>
								<p>${pro.name}</p>
								<p>${pro.price}</p>
							    </a>
							    <button data-name='${pro.name}' data-price='${pro.price}' data-src='${pro.src}' data-id='${pro.id}'>加入购物车</button>
						    </li>`

					}
					$(".shoplist").html(page);
//					$(".shoplist").html(page);
				})
				
			}
		}); 
		//为每一个加入购物车添加事件，使用委托的方式
		$(".shoplist").on("click","button",function(){
			var arr = [];     //定义一个空数组[{},{},{},{}....]
			var flag = true;//如果值为true  就想数组中添加产品
			var json = {
				id : $(this).data("id"),
				name : $(this).data("name"),
				price : $(this).data("price"),
				src:$(this).data("src"),
				count : 1
			}
			//console.log(json);
			//console.log(json);
			var oldCookie=getCookie("shoplist");//将cookie的数据取出来进行遍历
			if(oldCookie.length!=0){    
				arr=oldCookie;
				for(var i=0;i<arr.length;i++){
					if(json.id==arr[i].id&&json.name==arr[i].name){
						//如果json里的id名字和数组里的id名字一样，说明当前操作的商品已经存进购物车，
						//json.name==arr[i].name意义一样为了程序更加严谨，以免第一次有重复的id名判断不准确
						arr[i].count++;
						flag = false;//上面已经加完不用再加了
						break;
					}
				}
			}
			if(flag){
				arr.push(json);//将json放到数组里
			}

			setCookie("shoplist",JSON.stringify(arr));
			console.log(document.cookie);
			alert("添加成功");

		})

	}
//侧边对联广告
	$(function (){
		//创建网页监听
		$(window).scroll(function(){
			var offset=$("html,body").scrollTop();
			//判断滚动条的高度
			if (offset>=200){
				$(".left,.right").show(1000);
			}else{
				$(".left,.right").hide(1000);
			}
		})
	})

//右下角弹窗广告
		$(function(){
			//监听span的点击事件，清除div
			$("span").click(function(){
				$(".ad").remove();
			})
			$(".ad").stop().slideDown(1000).fadeOut(1000).fadeIn(1000);

})
		})