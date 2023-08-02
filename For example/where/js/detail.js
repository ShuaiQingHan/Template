 $(function(){
	$("a").attr("target","_blank");
	//登录相关
//	$("a").attr("target","_blank");
	//登录相关
	loglive();
   	})

 //获取显示数据
   	var str = location.href;
   	str = str.split("?")[1];  //"pid=shop16&cname=classify002"
   	var arr = str.split("&");   // ["pid=shop16","cname=classify002"]
   	var pid = arr[0].split("=")[1];
   	var cname = arr[1].split("=")[1];
   	$.ajax({
   		url : "../json/data.json",
   		type : "get",
   		success : function(json){
   			var str = "";
   			for( var i = 0 ; i < json[cname].list.length ; i++ ){
   				var pro = json[cname].list[i];
   				if( pid == pro.id ){//找到了要显示的商品
   					str = `<div class="pic"><img src="img/${pro.src}" alt="" /></div>
   							<script type="text/javascript">
   								 magnifier(".pic",400,400,"img/${pro.src}",200,200,400)
							</script>
   							<div class="text">
							<p id="pis">${pro.name}</p>
							<p>${pro.price}</p>
							 <button id="b1">立即购买</button>
							</div>`;
   					break;
   				}
   				
   			}
   			$(".shopinfo").html( str );
   		}
 		   	
   	})
 

   	//按钮点击跳转

