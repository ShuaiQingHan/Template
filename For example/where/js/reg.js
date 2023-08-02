
var flag1=false;
var flag2=false;
$("#user").change(function () {
	var reg = /^\w{3,6}$/;
	var str=$(this).val();
	if (reg.test(str)){
		$("#user_jg").css("display", "none");
		flag1= true;
	} else {

		$("#user_jg").text("用户名要是数字字母下划线，6位组成");
		$("#user_jg").css({ "display": "block", "font-size": "12px", "color": "red" });
		flag1 = false;
	}

});
$("#pw").change(function () {
	var reg = /^.{6,}$/;
	var str=$(this).val();
	if (reg.test(str)){
		$("#user_jg1").css("display", "none");
		flag1= true;
	} else {

		$("#user_jg1").text("密码输入错误哦,要至少6位.");
		$("#user_jg1").css({ "display": "block", "font-size": "12px", "color": "red" });
		flag1 = false;
	}

});
//$("#pw").()
$("#btn").click(function(){
		var a=$("#user").val();
		var b=$("#pw").val();
		var c=$("#eml").val();
		var d=$("#na");
		var e=$("#nv");
		console.log(a,b,c,d,e);
		if(d.prop("checked")==true){
			var f="男"
		}else{
			var f="女"
		}
		$.post("http://h6.duchengjiu.top/shop/api_user.php",
			{
				status:"register",
				"username":a,
				"password":b,
				// "email":c,
				// "sex":f,
			},
			// function(data){
			// 	console.log(data);
			// 	var mes=data.message;
			// 	if(data.code==0){
			// 		mes="成功";
			// 	}else{
			// 		mes="失败";
			// 	}
			// 	$("#info").text(mes);
			// }
				function(data){
				console.log(data);
				var mes=data.message;
				if(data.code==1000){
					mes="失败";
				}
				$("#info").text(mes);
			}
		)
	});
