$(function(){
    $("#btn").click(function(){
		var a=$("#user").val();
		var b=$("#pw").val();
		$.post("http://h6.duchengjiu.top/shop/api_user.php",
			{
				status:"login",
				username:a,
				password:b,
			},
	       function(data){
                var mes=data.message;
                console.log(data);
                if(data.code==1000){
                    mes="失败";
                }
                $("#info").text(mes);

                if(data.code==0){
                 window.location.href="index.html";
                    var obj={
                        name:a
                    }
                    obj=JSON.stringify(obj);
                    setCookie1("login",obj,1);
                }
            }
		)
	});

})
