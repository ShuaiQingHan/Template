/**
 * 清除空格
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 查找字符串开始
 */
String.prototype.startsWith = function(prefix) {
	return this.substring(0, prefix.length) == prefix;
};
/**
 * 查找字符串结尾
 */
String.prototype.endsWith = function(suffix) {
	return this.substring(this.length - suffix.length) == suffix;
};
/**
 * java中的替换
 */
String.prototype.replaceAll = function(target, replacement) {
	return this.split(target).join(replacement);
};
/**
 * 字符串千分位 必须为数字组合的字符串
 */
String.prototype.thousandth = function() {
	return this.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
};

/**
 * 字符串首字母转换为大写
 */
String.prototype.capitaliseFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * 判断对象是否是字符串
 */
String.prototype.isString = function() {
	return typeof this === "string" || this instanceof String;
}

/**
 * 判断字符串是否url
 */
String.prototype.isValidURL = function() {
	var urlRegExp=/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if(urlRegExp.test(this)){
        return true;
    }else{
        return false;
    }
}

/**
 * 字符串转int
 */
String.prototype.toInt = function() {
	var v = parseInt(this, 10);
	return isNaN(v) ? null : v;
}

/**
 * 字符串转float
 */
String.prototype.toFloat = function() {
	var v = parseFloat(this);
	return isNaN(v) ? null : v;
}

/**
 * 金额三分位
 */
String.prototype.formatMoney = function(){   
    if(!/^(\+|-)?(\d+)(\.\d+)?$/.test(this)){
		//alert("wrong!");
		return this;
	}   
    var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;   
    var re = new RegExp().compile("(\\d)(\\d{3})(,|$)");   
    while(re.test(b))
		b = b.replace(re, "$1,$2$3");   
    return a + "" + b + "" + c;  
}

/**
 * 获取url参数
 */
String.prototype.parseURLparam = function() {
	var reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
	var result = {}, match, key, value;
	while (match = reg.exec(this)) {
		key = match[2];
		value = match[3] || '';
		result[key] = decodeURIComponent(value);
	}
	return result;
};
/**
 * 更改URL的参数，如果没有，则增加
 */
String.prototype.changeUrlParam = function(name,value){
	var newUrl="";
	var reg = new RegExp("(^|)"+ name +"=([^&]*)(|$)");
	var tmp = name + "=" + value;
	if(this.match(reg) != null) {
		newUrl= this.replace(eval(reg),tmp);
	}
	else {
		if(this.match("[\?]")) {
			newUrl= this + "&" + tmp;
		}
		else {
			newUrl= this + "?" + tmp;
		}
	}
	
	return newUrl;
};

/**
 * 为URL加上时间戳，时间戳的名称可以自己定义，默认是timeflag
 */
String.prototype.randomURL = function(flag) {
	var url = this;
	flag = flag || "timeflag";
	var _timeflag = Math.uuidExp("xxxxxxxxxxxxx"), pattern = new RegExp(flag
			+ "=\\w{13}");
	if (url.indexOf(flag + "=") >= 0) {
		url = url.replace(pattern, flag + "=" + _timeflag);
		return url;
	}
	url += (/\?/.test(url)) ? "&" : "?";
	return (url + flag + "=" + _timeflag);
};

// encode URL
String.prototype.encURL = function(flag) {
	var url = this;
	var index = url.indexOf("?");
	if (index === -1)
		return flag ? url.randomURL(flag) : url;

	var result = url.substring(0, index + 1), params = url.substring(index + 1)
			.split("&");

	for (var i = 0; i < params.length; i++) {
		if (i > 0)
			result += "&";
		var param = params[i].split("=");
		result += param[0] + "=" + encodeURIComponent(param[1]);
	}

	return flag ? result.randomURL(result, flag) : result;
}

/**
 * 保留2位小数，如：2，会在2后面补上00.即2.00
 */
Number.prototype.toDecimal2 = function() {
	var f = parseFloat(this);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(this * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
};

/**
 * 返回延时调用函数 wait:延迟毫秒数 如：a.debounce(1000,true)("a","b","c")
 */
Function.prototype.debounce = function(wait, immediate) {
	var _timeout, _result, _func = this;
	return function() {
		var args = arguments;
		var later = function() {
			_timeout = null;
			if (!immediate)
				_result = _func(args);
		};
		var callNow = immediate && !_timeout;
		clearTimeout(_timeout);
		_timeout = setTimeout(later, wait);
		if (callNow)
			_result = _func(args);
		return _result;
	};
}

/**
 * 时间格式化
 */
Date.prototype.format = function(format) {
	/**
	 * eg:format="yyyy-MM-dd hh:mm:ss";
	 */
	if (!format) {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	var o = {
		"M+" : this.getMonth() + 1,
		/** month */
		"d+" : this.getDate(),
		/** day */
		"h+" : this.getHours(),
		/** hour */
		"m+" : this.getMinutes(),
		/** minute */
		"s+" : this.getSeconds(),
		/** second */
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		/** quarter */
		"S" : this.getMilliseconds()
	/** millisecond */

	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

/**
 * 字符串是否日期格式 format ：日期格式
 */
String.prototype.isDateTime = function(format) {
	format = format || 'yyyy-MM-dd';
	var input = this, o = {}, d = new Date();
	var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format
			.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
	var len = f1.length, len1 = f3.length;
	if (len != f2.length || len1 != f4.length)
		return false;
	for (var i = 0; i < len1; i++)
		if (f3[i] != f4[i])
			return false;
	for (var i = 0; i < len; i++)
		o[f1[i]] = f2[i];
	o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
	o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
	o.dd = s(o.dd, o.d, d.getDate(), 31);
	o.hh = s(o.hh, o.h, d.getHours(), 24);
	o.mm = s(o.mm, o.m, d.getMinutes());
	o.ss = s(o.ss, o.s, d.getSeconds());
	o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
	if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0)
		return false;
	if (o.yyyy < 100)
		o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
	d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
	var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM
			&& d.getDate() == o.dd && d.getHours() == o.hh
			&& d.getMinutes() == o.mm && d.getSeconds() == o.ss
			&& d.getMilliseconds() == o.ms;
	return d;
	function s(s1, s2, s3, s4, s5) {
		s4 = s4 || 60, s5 = s5 || 2;
		var reVal = s3;
		if (s1 != undefined && s1 != '' || !isNaN(s1))
			reVal = s1 * 1;
		if (s2 != undefined && s2 != '' && !isNaN(s2))
			reVal = s2 * 1;
		return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
	}
};

/**
 * 数组取最大值
 */
Array.prototype.max = function(){ 
	return Math.max.apply({},this) 
} 
/**
 * 数组取最小值
 */
Array.prototype.min = function(){ 
	return Math.min.apply({},this) 
}

/**
 * 数组对象去除重复，只支持一级对象
 * 根据对象的key去除重复
 * @returns {Array}
 */
Array.prototype.unique = function(key) {
	var res = [], hash = {};
	for (var i = 0, elem; (elem = this[i]) != null; i++) {
		if(key && !hash[elem[key]]) {
			res.push(elem);
			hash[elem[key]] = true;
		} else if (!key && !hash[elem]) {
			res.push(elem);
			hash[elem] = true;
		}
	}
	return res;
};

/**
 * 判断元素是否在数组内
 */
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}

/**
 * uuid相关
 */
var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
		.split('');

Math.uuid = function(len, radix) {
	var chars = CHARS, uuid = [], i;
	radix = radix || chars.length;

	if (len) {
		// Compact form
		for (i = 0; i < len; i++)
			uuid[i] = chars[0 | Math.random() * radix];
	} else {
		// rfc4122, version 4 form
		var r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data. At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
};

// A more performant, but slightly bulkier, RFC4122v4 solution. We boost
// performance
// by minimizing calls to random()
Math.uuidFast = function() {
	var chars = CHARS, uuid = new Array(36), rnd = 0, r;
	for (var i = 0; i < 36; i++) {
		if (i == 8 || i == 13 || i == 18 || i == 23) {
			uuid[i] = '-';
		} else if (i == 14) {
			uuid[i] = '4';
		} else {
			if (rnd <= 0x02)
				rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
			r = rnd & 0xf;
			rnd = rnd >> 4;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	}
	return uuid.join('');
};

// A more compact, but less performant, RFC4122v4 solution:
Math.uuidCompact = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};
// A more compact, but less performant, RFC4122v4 solution:
Math.uuidExp = function(exp) {
	return exp.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

/**
 * 动态加载资源
 */
var dynamicLoading = {
	css : function(path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	},
	js : function(path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = path;
		script.type = 'text/javascript';
		head.appendChild(script);
	}
}

function Map() {
	var d = function(g, h) {
		this.key = g;
		this.value = h
	};
	var f = function(h, j) {
		for (var g = 0; g < this.arr.length; g++) {
			if (this.arr[g].key === h) {
				this.arr[g].value = j;
				return
			}
		}
		this.arr[this.arr.length] = new d(h, j)
	};
	var b = function(h) {
		for (var g = 0; g < this.arr.length; g++) {
			if (this.arr[g].key === h) {
				return this.arr[g].value
			}
		}
		return null
	};
	var a = function(j) {
		var g;
		for (var h = 0; h < this.arr.length; h++) {
			g = this.arr.pop();
			if (g.key === j) {
				continue
			}
			this.arr.unshift(g)
		}
	};
	var c = function() {
		return this.arr.length
	};
	var e = function() {
		return this.arr.length <= 0
	};
	this.arr = new Array();
	this.get = b;
	this.put = f;
	this.remove = a;
	this.size = c;
	this.isEmpty = e
};