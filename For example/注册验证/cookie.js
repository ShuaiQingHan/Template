function setCookie(name, value, date, path){
	//var str = name+"="+ encodeURIComponent(value);
	var json = {
		"val": value
	}
	var jsonstr = JSON.stringify(json);
	var str = name+"="+encodeURIComponent(jsonstr);
	
	if( date ){
		var dt = new Date();
		dt.setDate(dt.getDate()+date);
		str += ";expires="+dt.toGMTString();
	}
	if( path ){
		str += ";path="+path;
	}
	document.cookie = str;
}

function getCookie(name){
	var str = decodeURIComponent(document.cookie);
	//console.log(str);
	var arr = str.split("; ");
	for( var i=0,len=arr.length; i<len; i++ ){
		var str2 = arr[i];
		var ind = str2.indexOf("=");
		var _name = str2.substring(0, ind);
		var _value = str2.substring(ind+1);
		if( name == _name ){
			//return _value;
			return JSON.parse(_value).val;
		}
	}	
}

function getCookieAll(reg, cb){
	var num = 0;
	var arr = document.cookie.split("; ");
	for( var i=0,len=arr.length; i<len; i++ ){
		var str = arr[i];
		var ind = str.indexOf("=");
		var cookieName = str.substring(0, ind);
		var cookieValue = str.substring(ind+1);
		if(  reg.test(cookieName)  ){
			//console.log( JSON.parse(decodeURIComponent(cookieValue)).val );
			if( cb ){
				cb( cookieName, JSON.parse(decodeURIComponent(cookieValue)).val );
			}
			num++;
		}
	}	
	return num;
}


function removeCookie(_name){
	setCookie(_name, "", -1);
}

function removeCookieAll(reg){
	var num = 0;
	var arr = document.cookie.split("; ");
	for( var i=0,len=arr.length; i<len; i++ ){
		var str = arr[i];
		var ind = str.indexOf("=");
		var cookieName = str.substring(0, ind);
		var cookieValue = str.substring(ind+1);
		if(  reg.test(cookieName)  ){
			removeCookie(cookieName);
			num++;
		}
	}	
	return num;
}
