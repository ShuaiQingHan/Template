


// 登录相关
//function islogin(){
//	var obj=getCookie("login");
//	if(obj==undefined)return {};
//	if(obj){
//		obj=JSON.parse(obj);
//		var name=obj.name;
//		var str=`<span>${name}</span>
//				<a href="login.html" id="logon">退出</a>
//				<a href="cart.html" id="cart">购物车 <b>0</b> 件</a>
//				`;
//				
//		$("p").html(str);
//		
//		var url="http://47.104.244.134:8080/cartlist.do?token="+obj.token;
//		$.get(url,function(data){
//			var count=0
//			for(var i=0;i<data.length;i++){
//				count+=data[i].count;
//			}
//			$("#cart b").text(count);
//		})
//		
//		$("#logon").click(function(){
//			removeCookie("login");
//		})
//		return {flag:true,token:obj.token};
//	};
//	
//	
//};





function setCookie1(name, val, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	if(!n){
		document.cookie = name + "=" + val ;
	}else{
		document.cookie = name + "=" + val + ";expires=" + oDate;
	}
}

function getCookie1(name) {
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if(newArr[0] == name) {
			return newArr[1];
		}
	} 
}

function removeCookie1(name) {
	setCookie(name, 1, -1);
}




// cookie账户登录登出
function cookieLogin(){
	var loginObj=getCookie1("login");
	if(loginObj){
		loginObj=JSON.parse(loginObj);
		return loginObj
	}
}
function cookieLogon(){
	removeCookie1("login");
};


// 登录相关
function loglive(){
	var obj=cookieLogin();
	if(obj==undefined){
		$("#cartHref").click(function(){
			alert("请先登录");
			return false;
		});
		return false;
	}
	$(".topWrap p").html("Hi,"+ obj.name + "<a href='login.html' id='logon'>退出</a>");
	
	// 登出相关
	$("#logon").click(function(){
		cookieLogon();
	});
	
	if(obj.goods){
		$("#cartNum").text(function(){
			var num=0;
			for(var i in obj.goods){
				num+=obj.goods[i];
			}
			return num;
		});
	}
	
	return true;
}
