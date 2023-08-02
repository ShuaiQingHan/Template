/**
 * jQuery扩展
 */
$(function(){
	var o = $({});//自定义事件对象
	/**
	 * 观察者模式
	 */
    $.each({
    	/**
    	 * 消费
    	 * $.publish('app.myevent', "asdsad");
    	 */
        trigger: 'publish',
        /**
    	 * 订阅
    	 * $.subscribe('app.myevent', function(e, results) {
                console.log(results);
            });
    	 */
        on: 'subscribe',
        /**
         * 取消
         * $.unsubscribe('app.myevent', "asdsad");
         */
        off: 'unsubscribe'
    }, function(key, val) {
        jQuery[val] = function() {
            o[key].apply(o, arguments);
        };
    });
    var notifyOptions = {
        style: 'metro',
        /*globalPosition:'top center',*/
        hideAnimation: "fadeOut",
        showDuration: 0,
        hideDuration: 1000,
        autoHideDelay: 1500,
        autoHide: true,
        clickToHide: true
    }
    $.extend(
		$.messager.niftyAlert = function(effect,header,text){

	        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
	        var uniqid = randLetter + Date.now();
	
	        $modal =  '<div class="md-modal '+effect+'" id="'+uniqid+'">';
	        $modal +=    '<div class="md-content">';
	        $modal +=      '<h3>'+header+'</h3>';
	        $modal +=      '<div class="md-modal-body">'+text;
	        $modal +=      '</div>';
	        $modal +=    '</div>';
	        $modal +=  '</div>';
	
	        $("body").prepend($modal);
	
	        window.setTimeout(function () {
	            $("#"+uniqid).addClass("md-show");
	            $(".md-overlay,.md-close").click(function(){
	                $("#"+uniqid).removeClass("md-show");
	                window.setTimeout(function () {$("#"+uniqid).remove();},500);
	            });
	        },100);
	
	        return false;
	    },

	    $.messager.notifyError = function(title, text){
	        if(text == undefined) {
	            text = title;
	            title = null;
	        }
	        var n = {
	            text: text,
	            image: "<i style='color:#fff;font-size: 20px;' class='fa fa-times' aria-hidden='true'></i>"
	        };
	        if(title)
	            $.extend(n,{title:title});
	        $(".notifyjs-wrapper").remove();
	        $.notify(n, $.extend({className: 'error'}, notifyOptions));
	    },

	    $.messager.notifyWarning = function(title, text){
	        if(text == undefined) {
	            text = title;
	            title = null;
	        }
	        var n = {
	            text: text,
	            image: "<i class='icon-attention'></i>"
	        };
	        if(title)
	            $.extend(n,{title:title});
	        $(".notifyjs-wrapper").remove();
	        $.notify(n, $.extend({className: 'warning'}, notifyOptions));
	    },

	    $.messager.notifyInfo = function(title, text){
	        if(text == undefined) {
	            text = title;
	            title = null;
	        }
	        var n = {
	            text: text,
	            image: "<i class='icon-info-circled'></i>"
	        };
	        if(title)
	            $.extend(n,{title:title});
	        $(".notifyjs-wrapper").remove();
	        $.notify(n, $.extend({className: 'info'}, notifyOptions));
	    },

	    $.messager.notifySuccess = function(title, text){
	        if(text == undefined) {
	            text = title;
	            title = null;
	        }
	        var n = {
	            text: text,
	            image: "<i style='color:#fff;font-size: 20px;' class='fa fa-check' aria-hidden='true'></i>"
	        };
	        if(title)
	            $.extend(n,{title:title});
	        $(".notifyjs-wrapper").remove();
	        $.notify(n, $.extend({className: 'success'}, notifyOptions));
	    }
	    ,$.fn.async = function(opt){
			var $this = $(this)
			opt = opt || {};
			var fn = {
				context: $this
	        };
			for(var key in fn){
				if(opt[key]){  
					fn[key] = opt[key];  
				}
			}
			$.ajax($.extend({},opt,fn));
		}
		, $.fn.asyncGet = function(url, data, callback, dataType){
			var $this = $(this);
			var opt = {
				url:url
				,type:"GET"
				,context: $this
			};
			if(data) {
				opt.data = data;
			}
			if(callback) {
				opt.success = callback;
			}
			if(dataType) {
				opt.dataType = dataType;
			}
			this.async(opt);
	    }
	    , $.fn.asyncPost = function(url, data, callback, dataType){
	    	var $this = $(this);
	    	var opt = {
				url:url
				,type:"POST"
				,context: $this
			};
			if(data) {
				opt.data = data;
			}
			if(callback) {
				opt.success = callback;
			}
			if(dataType) {
				opt.dataType = dataType;
			}
			this.async(opt);
	    }
	);
    
	$(document).ajaxComplete(function(event, jqXHR, options) {
		if(options["showMask"]) {
			$(event.target).unmask();
		}
	});
	$( document ).ajaxSend(function(event, jqXHR, options) {
		if(options["showMask"]) {
			$(event.target).mask(options["maskMessage"]||"加载中");
		}
	});
	$( document ).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
		if(jqXHR.status == 404) {
			alert("404,页面不存在");
		} else if(jqXHR.status == 405) {
			alert("405,资源被禁止");
		} else if(jqXHR.status == 401) {
			top.location = top.location;
		} else if(jqXHR.status == 500) {
			alert("500,服务器内部错误");
		} else if(jqXHR.status == 418) {
			//自定义错误
			window.location = jqXHR.responseText;
		}
	});
	
	// //////////////// jquery相关 //////////////////////
	$.getUrlParam = function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
});

/*$.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=window;
        for (j=0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};*/