var ucad=ucad||{};window.ucad=ucad;ucad.version="1.0.1_8.6.0";ucad.udb="ucad_div_big_";ucad.uds="ucad_div_small_";ucad.uib="ucad_img_big_";ucad.uis="ucad_img_small_";ucad.ub="ucad_big_";ucad.us="ucad_small_";
ucad.util={fade:function(a,c,e,d,f,g,h){var i,k=ucad.memory.process,j=d>0;g&&g();(function(){f(c);c+=d;c<e&&j||c>e&&!j?(clearTimeout(i),ucad.memory.process==k&&(i=setTimeout(arguments.callee,a))):h&&h()})()},stopPPG:function(a){a=a||window.event;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0;clearTimeout(ucad.memory.timer)},scroll:function(a){ucad.util.canTouch()&&window.addEventListener("touchend",a,!1);try{window.addEventListener("scroll",a,!1)}catch(c){document.body.attachEvent("onscroll",
a,!1)}},jump:function(a,c){if((c||"_self")=="_self")ucad.memory.canStat=!1,location.href=a},canTouch:function(){return"ontouchstart"in window?!0:!1},param:function(){var a={},c=window.innerHeight;a.innerWidth=window.innerWidth;a.innerHeight=c;a.scrollTop=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;return a},opacity:function(a,c){if(a==void 0)return!1;a.style.opacity=c/100;a.style.filter="alpha(opacity="+c+")";a.style.MozOpacity=c/100;a.style.KhtmlOpacity=
c/100},display:function(a,c){if(a==void 0)return!1;a.style.display=c?"block":"none"},displays:function(a){if(a)for(var c=0;c<a.length;c++){var e=a[c];ucad.util.display(ucad.$(e.id),e.value)}},memoryObjs:function(a){var c=ucad.memory.raddata[a];c.udb=ucad.$(ucad.udb+a);c.uds=ucad.$(ucad.uds+a);c.uib=ucad.$(ucad.uib+a);c.uis=ucad.$(ucad.uis+a);c.ub=ucad.$(ucad.ub+a);c.us=ucad.$(ucad.us+a)},canShow:function(a){a=ucad.util.storage.get(a);return a==null||(new Date).getTime()-ucad.config.config.hideTime>
parseInt(a)?!0:!1}};ucad.remote={};ucad.local={};ucad.debug={};ucad.memory={};ucad.memory.raddata=[];ucad.memory.canShowRad=!0;ucad.memory.canStat=!0;ucad.showAd=function(){ucad.memory.canShowRad=!0;ucad.memory.gnbtimer=void 0;for(var a in ucad.memory.raddata){var c=ucad.memory.raddata[a];if(c.exist==!0){clearTimeout(ucad.memory.gnbtimer);var e=ucad.local.action.onload[c.meta_type],d=""+a;c.timer=setTimeout(function(){e(d,!0)},3E3)}}};
ucad.hideAd=function(){ucad.memory.canShowRad=!1;for(var a in ucad.memory.raddata){var c=ucad.memory.raddata[a];c.exist==!0&&(clearTimeout(c.timer),ucad.local.action.hide[c.meta_type](a,!0,!0))}};ucad.$=function(a){return document.getElementById(a)};
ucad.run=function(){for(var a=document.getElementsByTagName("ins"),c="",e=a.length-1;0<=e;--e){var d=a[e].getAttribute("data-ucad-poid");a[e].setAttribute("id","ucad_poid_"+d);d!=void 0&&(c+=d+",")}c=c.replace(/,$/g,"");ucad.debug("poids:"+c);if(c=="")return!0;ucad.remote.getAdinfos(c)};
ucad.show=function(a){ucad.debug("code:"+a.rt_code);if(a.rt_code!=200)return ucad.debug("but ["+a.rt_msg+"]<br />EXIT!!! "),!1;ucad.memory.time=a.time;for(var c=0;c<a.adinfos.length;c++)try{ucad.local.inject(ucad.local.build(a.adinfos[c]))}catch(e){ucad.debug("err:"+e.message)}};
ucad.debug=function(a){if(ucad.config.debug){var c=document.getElementById("ucad_debugdiv");if(c==void 0)c=document.createElement("DIV"),c.setAttribute("id","ucad_debugdiv"),c.style.border="1px red solid",c.style.zIndex=9999,document.body.appendChild(c);c.innerHTML+=a+"<br />";window.onerror=function(a,c,f){a=a.replace(/\'/ig,'"');ucad.debug("<span style='color:red'>"+a+"</span> "+c+"["+f+"]");return!0}}};ucad.util.storage={save:function(a,c){c=c||(new Date).getTime();ucad.config.config.storageType=="cookie"&&ucad.util.storage._setCookie(a,c)},get:function(a){if(ucad.config.config.storageType=="cookie")return ucad.util.storage._getCookie(a)},_setCookie:function(a,c){var e=new Date;e.setTime(e.getTime()+6048E5);document.cookie=a+"="+escape(c)+";expires="+e.toGMTString()},_getCookie:function(a){var c;return(c=document.cookie.match(RegExp("(^| )"+a+"=([^;]*)(;|$)")))?unescape(c[2]):null},_setLocalStorage:function(){},
_getLocalStorage:function(){}};ucad.util.request=function(a,c){ucad.config.config.requestType=="jsonp"?(a+=c||"",ucad.util._request.jsonp.request(a)):ucad.debug(""+ucad.config.config.requestType+" not supported.")};
ucad.util._request={jsonp:{request:function(a){try{var c=document.createElement("script");c.setAttribute("type","text/javascript");c.setAttribute("src",a+"&rand="+Math.random());document.body.appendChild(c);void 0!==b&&(c.onload=c.onreadystatechange=function(){if(!this.readyState||"loaded"===this.readyState||"complete"===this.readyState)b(),c.onload=c.onreadystatechange=null})}catch(e){}}}};ucad.remote.getAdinfos=function(a){ucad.config.config.requestFrom=="remote"?ucad.util.request(ucad.config.url.slot_root+"?poids="+a+"&uc_param_str="+ucad.config.config.uc_param_str,"&callback=ucad.show"):ucad.show(ucad.util.cache.slotjson)};ucad.remote.log={stat:function(a,c,e){e=ucad.memory.raddata[e];if(a=="big"&&e.bigLoad==!1||a=="small"&&e.smallLoad==!1)return!1;ucad.remote.log._stat(a,c,e.poid,e.pid,e.adverid,e.channelid,e.meta_type,e.token)},_stat:function(a,c,e,d,f,g,h,i){a=ucad.config.url.stat_root+"?pic_type="+a+"&action="+c+"&meta_type="+h+"&poid="+e+"&pid="+d+"&adverid="+f+"&channelid="+g+"&token="+i+"&uc_param_str="+ucad.config.config.uc_param_str+"&time="+ucad.memory.time;ucad.util.request(a);ucad.debug("<br /><font color=red>req:</font>"+
a.replace(/&/g,"<br />&"))}};ucad.local.build=function(a){for(var c={poid:a.poid,target:void 0,adarr:[]},e=0;e<a.adlist.length;e++){var d=a.adlist[e];d.poid=a.poid;var f=void 0;ucad.debug("poid:"+d.poid);ucad.debug("ad_type\uff1a"+d.ad_type);if(d.ad_type=="txt"||d.ad_type=="pic"||d.ad_type=="html"||d.ad_type=="multi_link")f=ucad.local._buildNormalAd(d);else if(d.ad_type=="rad")f=ucad.local._buildRichAd(d),c.target=f.target,c.unqkey=f.unqkey;f!=void 0&&c.adarr.push(f)}return c};
ucad.local._buildMeta=function(a){function c(a){var c=" ";if(a==void 0)return c;for(var e in a)a[e]!=void 0&&a[e]!=""&&(c+=e+":"+a[e]+";");c!=" "&&(c=" style='"+c+"' ");return c}if(a==void 0)return"";var e="";if(a.meta_type=="html")return a.html;else a.meta_type=="pic"?(a.pic.alt=a.pic.alt||"",e="<img border='0' src='"+a.pic.img_url+"'"+c(a.pic.style)+" alt='"+a.pic.alt+"'/>",a.link!=void 0&&(e="<a "+(a.link==void 0?" ":" href='"+a.link+"' ")+"  >"+e+"</a>")):a.meta_type=="txt"&&(e="<a "+(a.link==
void 0?" ":" href='"+a.link+"' ")+c(a.txt.style)+">"+a.txt.text+"</a>");ucad.debug("gen:"+e);return e};ucad.local._buildNormalAd=function(a){for(var c=ucad.local._buildMeta(a.delimiter),e=[],d=0;d<a.items.length;d++){var f=a.items[d];e.push(ucad.local._buildMeta(f.prefix)+ucad.local._buildMeta(f.content)+ucad.local._buildMeta(f.suffix))}return{html:e.join(c),onload:void 0}};
ucad.local._buildRichAd=function(a){function c(a,c){var d;if(a==void 0)return"";d=ucad.config.url.img_root;d+=a.can_close==1?"/close.png":"/down.png";return d="<div id='ucad_div_{"+c+"_id}' class='ucad_div {"+c+"_div_class}' style='{"+c+"_style}' ><div id='ucad_{"+c+"_id}' style='position:relative'><div class='{"+c+"_close_class}' onclick='{"+c+"_on_close}'><img id='ucad_close_img_{"+c+"_id}' can_close='"+a.can_close+"'  src='"+d+"' onclick='{"+c+"_on_close}' /></div><img id='ucad_img_{"+c+"_id}' src='"+
a.img_url+"' class='{"+c+"_img_class}' style='{"+c+"_img_style}' onclick='{"+c+"_on_click}'></div></div>"}if(!(a.items==void 0||a.items.length==0)){var e=c(a.items[0].content.big_pic,"big")+c(a.items[0].content.small_pic,"small"),d={html:"",target:"top_body",onload:void 0,poid:a.poid,pid:a.pid,adverid:a.adverid,channelid:a.channelid,token:a.token,sLoad:void 0,bLoad:void 0,sClose:!1,bClose:!1},f=a.items[0].content;d.meta_type=f.meta_type;if(f.big_pic!=void 0)d.duration=f.big_pic.duration,d.duration=
d.duration||5;ucad.debug("build:"+f.meta_type);var g=""+a.poid+a.adverid;d.unqkey=g;e=e.replace(/\{big_id\}/g,"big_"+a.poid+a.adverid).replace(/\{small_id\}/g,"small_"+a.poid+a.adverid).replace(/\{big_img_class\}/ig,"ucad_banner_img").replace(/\{big_on_click\}/ig,"ucad.local.action.onclick."+f.meta_type+'(event,"big","manual_click","'+f.link+'","'+g+'")').replace(/\{small_on_click\}/ig,"ucad.local.action.onclick."+f.meta_type+'(event,"small","manual_click","'+f.link+'","'+g+'")').replace(/\{big_on_close\}/ig,
"ucad.local.action.onclose."+f.meta_type+'(event,"big","manual_close",undefined,"'+g+'")').replace(/\{small_on_close\}/ig,"ucad.local.action.onclose."+f.meta_type+'(event,"small","manual_close",undefined,"'+g+'")');if(f.meta_type=="top_follow_banner")e=e.replace(/\{small_img_style\}/ig,"width:100%").replace(/\{big_close_class\}/ig,"ucad_close_on_right").replace(/\{big_div_class\}/ig,"ucad_banner").replace(/\{small_close_class\}/ig,"ucad_close_on_right").replace(/\{small_img_class\}/ig,"ucad_banner_img").replace(/\{small_style\}/ig,
"position:relative;");else if(f.meta_type=="top_big_banner")e=e.replace(/\{small_div_class\}/ig,"ucad_banner").replace(/\{big_close_class\}/ig,"ucad_close_on_right").replace(/\{big_div_class\}/ig,"ucad_banner").replace(/\{big_style\}/ig,"position:absolute;").replace(/\{small_style\}/ig,"position:relative;").replace(/\{small_img_class\}/ig,"ucad_banner_img").replace(/\{small_img_style\}/ig,"width:100%"),e=e.replace(/\{small_close_class\}/ig,"ucad_close_on_right");else if(f.meta_type=="idea_banner")d.target=
"bottom_body",e=e.replace(/\{small_div_class\}/ig,"ucad_slider").replace(/\{big_close_class\}/ig,"ucad_close_on_right").replace(/\{big_div_class\}/ig,"ucad_banner").replace(/\{small_img_class\}/ig,"ucad_slider_img").replace(/\{small_close_class\}/ig,"ucad_close_on_top"),ucad.util.canTouch()&&(e=e.replace(/onclick=/ig,"ontouchend="));else if(f.meta_type=="float_banner_right")d.target="bottom_body",e=e.replace(/\{small_div_class\}/ig,"ucad_slider").replace(/\{big_close_class\}/ig,"ucad_close_on_right").replace(/\{big_div_class\}/ig,
"ucad_banner").replace(/\{small_img_class\}/ig,"ucad_slider_img").replace(/\{small_close_class\}/ig,"ucad_close_on_top");else if(f.meta_type=="float_banner_to_left")d.target="bottom_body",e=e.replace(/\{small_div_class\}/ig,"ucad_slider").replace(/\{big_close_class\}/ig,"ucad_close_on_top").replace(/\{big_div_class\}/ig,"ucad_banner_nobg").replace(/\{big_style\}/ig,"position:fixed;").replace(/\{small_style\}/ig,"position:fixed;").replace(/\{small_img_class\}/ig,"ucad_slider_img").replace(/\{small_close_class\}/ig,
"ucad_close_on_top");else return;e=e.replace(/\{\w+?\}/g,"");d.html=e;d.onload=ucad.local.action.onload[f.meta_type];return ucad.memory.raddata[g]=d}};ucad.local.action={show:{top_follow_banner:function(a){ucad.util.displays([{id:ucad.uds+a,value:!0}])},top_big_banner:function(a){ucad.util.displays([{id:ucad.udb+a,value:!0},{id:ucad.uds+a,value:!1}])},idea_banner:function(a){ucad.util.displays([{id:ucad.udb+a,value:!0},{id:ucad.uds+a,value:!1}])},float_banner_right:function(a){ucad.util.displays([{id:ucad.uds+a,value:!0}])},float_banner_to_left:function(a){var c=ucad.memory.raddata[a];c.udb.style.height=c.uib.height;ucad.util.fade(50,1,100,5,function(a){c.udb.style.width=
a+"%"},function(){c.udb.style.display="block";c.uds.style.display="none";c.udb.style.width="1%"},function(){c.udb.style.width="100%"})}},hide:{top_follow_banner:function(a){var c=ucad.memory.raddata[a];ucad.util.fade(55,0,100,5,function(a){ucad.util.opacity(c.uds,100-a)},void 0,function(){c.uds.style.display="none"})},top_big_banner:function(a,c,e){var d=ucad.memory.raddata[a];if(e)return d.udb.style.display="none",d.uds.style.display=c?"none":"block",!1;ucad.util.fade(55,0,100,5,function(a){ucad.util.opacity(d.udb,
100-a)},void 0,function(){d.udb.style.display="none";ucad.util.opacity(d.udb,100);d.uds.style.display=c?"none":"block"})},idea_banner:function(a,c,e){var d=ucad.memory.raddata[a];if(e)return d.udb.style.display="none",d.uds.style.display=c?"none":"block",!1;var f=d.udb.style.top,g=parseInt(f.replace("px","")),h=100;ucad.util.fade(55,0,100,8,function(){g-=8;h/=1.2;ucad.util.opacity(d.udb,h);d.udb.style.top=g+"px"},function(){if(d.udb.style.display!="none")d.uds.style.display="block"},function(){d.udb.style.display=
"none";ucad.util.opacity(d.udb,100);d.udb.style.top=f;d.uds.style.display=c?"none":"block"})},float_banner_right:function(a){ucad.$(ucad.uds+a).style.display="none"},float_banner_to_left:function(a,c,e){var d=ucad.memory.raddata[a];if(e)return d.udb.style.display="none",d.uds.style.display=c?"none":"block",!1;ucad.util.fade(80,0,90,5,function(a){d.udb.style.width=100-a+"%"},function(){d.uds.style.display="none";d.udb.style.width="1%"},function(){d.udb.style.display="none";d.udb.style.width="100%";
d.uds.style.display=c?"none":"block"})}},onload:{top_follow_banner:function(a,c){var e=ucad.memory.raddata[a],d=function(){function c(){e.uds.style.top=ucad.util.param().scrollTop+"px"}if(e.uis.width==0||e.sLoad!=!0||ucad.memory.canShowRad==!1)return!1;ucad.local.action.show.top_follow_banner(a);ucad.remote.log.stat("small","auto_show",a);c();ucad.util.scroll(function(){c()})};e.uis.onload=function(){e.sLoad=!0;d()};c&&d()},top_big_banner:function(a,c){function e(){var a=ucad.util.param().scrollTop;
d.udb.style.top=a+"px";d.uds.style.top=a+"px"}var d=ucad.memory.raddata[a];d.uib.onload=function(){if(d.uib.width>ucad.util.param().innerWidth)d.uib.style.width="100%";d.bLoad=d.uib.width!=0?!0:!1;f()};d.uib.onerror=function(){d.bLoad=!1;f()};d.uis.onload=function(){d.sLoad=d.uis.width!=0?!0:!1;f()};d.uis.onerror=function(){d.sLoad=!1;f()};var f=function(){if(d.uis.width==0||d.sLoad==!1||d.sLoad==void 0||d.bLoad==void 0||ucad.memory.canShowRad==!1)return!1;d.bLoad==!0&&ucad.util.canShow(a)?(ucad.util.storage.save(a),
ucad.local.action.show.top_big_banner(a),ucad.remote.log.stat("big","auto_show",a),ucad.memory.timer=setTimeout(function(){d.udb.style.display!="none"&&(ucad.local.action.hide.top_big_banner(a),ucad.remote.log.stat("small","auto_show",a))},d.duration*1E3)):(ucad.local.action.hide.top_big_banner(a,void 0,!0),ucad.remote.log.stat("small","auto_show",a))};e();ucad.util.scroll(function(){e()});c&&f()},idea_banner:function(a,c){function e(){var a=ucad.util.param().scrollTop,c=ucad.util.param().innerHeight,
d=a+c/2-f.uib.height/2+"px",a=a+c/2-f.uis.height-66;a<40&&(a=42);f.udb.style.top=d;f.uds.style.top=a+"px"}function d(c){if(f.uis.width==0||f.sLoad==!1||f.sLoad==void 0||f.bLoad==void 0||ucad.memory.canShowRad==!1)return!1;e();f.bLoad==!0&&ucad.util.canShow(a)?(ucad.util.storage.save(a),ucad.local.action.show.idea_banner(a),ucad.remote.log.stat("big","auto_show",a),ucad.memory.timer=setTimeout(function(){f.udb.style.display!="none"&&(ucad.local.action.hide.idea_banner(a),ucad.remote.log.stat("small",
"auto_show",a))},f.duration*1E3)):ucad.util.canShow(a+"_small")&&(ucad.local.action.hide.idea_banner(a,void 0,!0),c||ucad.remote.log.stat("small","auto_show",a))}var f=ucad.memory.raddata[a];f.uib.onload=function(){if(f.uib.width>ucad.util.param().innerWidth)f.uib.style.width="100%";f.bLoad=f.uib.width!=0?!0:!1;d()};f.uib.onerror=function(){f.bLoad=!1;d()};f.uis.onload=function(){f.sLoad=f.uis.width!=0?!0:!1;d()};f.uis.onerror=function(){f.sLoad=!1;d()};c&&f.sClose==!1&&d(!0)},float_banner_right:function(a){function c(a){var c=
ucad.util.param(),c=c.scrollTop+c.innerHeight/2-e.uis.height/2;if(a!=void 0)return e.uds.style.top=c+"px",!1;a=parseInt((e.uds.style.top+"").replace("px",""));e.uds.style["-webkit-transition-duration"]="1s";e.uds.style["-webkit-transform"]="translate(0,"+(c-(a||0))+"px)"}var e=ucad.memory.raddata[a];e.uis.onload=function(){if(e.uis.width==0)return!1;e.sLoad=!0;ucad.util.scroll(function(){c()});c(!0);ucad.local.action.show.float_banner_right(a);ucad.remote.log.stat("small","auto_show",a)}},float_banner_to_left:function(a,
c){function e(){var a=ucad.util.param().innerWidth;d.uib.style.width=a+"px";a=a/d.uib.width*d.uib.height;d.uis.style.width=a+"px";d.uis.style.height=a+"px";d.udb.style.bottom="0px";d.uds.style.bottom="0px"}var d=ucad.memory.raddata[a];d.uib.onload=function(){d.bLoad=d.uib.width!=0?!0:!1;f()};d.uib.onerror=function(){d.bLoad=!1;f()};d.uis.onload=function(){d.sLoad=d.uis.width!=0?!0:!1;f()};d.uis.onerror=function(){d.sLoad=!1;f()};var f=function(){if(d.uis.width==0||d.sLoad==!1||d.sLoad==void 0||d.bLoad==
void 0||ucad.memory.canShowRad==!1)return!1;d.bLoad==!0&&ucad.util.canShow(a)?(ucad.util.storage.save(a),ucad.local.action.show.float_banner_to_left(a),ucad.remote.log.stat("big","auto_show",a),ucad.memory.timer=setTimeout(function(){d.udb.style.display!="none"&&(ucad.local.action.hide.float_banner_to_left(a),ucad.remote.log.stat("small","auto_show",a))},d.duration*1E3)):(ucad.local.action.hide.float_banner_to_left(a,void 0,!0),ucad.remote.log.stat("small","auto_show",a));e();ucad.util.scroll(function(){e()});
c&&f()}}},onclick:{top_follow_banner:function(a,c,e,d){ucad.util.jump(d);ucad.util.stopPPG(a)},top_big_banner:function(a,c,e,d,f){ucad.util.jump(d);ucad.util.stopPPG(a);c=="big"&&ucad.local.action.hide.top_big_banner(f,!0,!0)},idea_banner:function(a,c,e,d,f){ucad.util.stopPPG(a);if(c=="big")ucad.util.jump(d),ucad.local.action.hide.idea_banner(f,!0,!0);else{var g=ucad.memory.raddata[f];if(g.bLoad==void 0||g.bLoad==!1)return!1;ucad.local.action.show.idea_banner(f);ucad.remote.log.stat("big","manual_show",
f);ucad.memory.timer=setTimeout(function(){g.udb.style.display!="none"&&(ucad.local.action.hide.idea_banner(f),ucad.remote.log.stat("small","auto_show",f))},g.duration*1E3)}},float_banner_right:function(a,c,e,d){ucad.util.stopPPG(a);ucad.util.jump(d)},float_banner_to_left:function(a,c,e,d,f){ucad.util.stopPPG(a);ucad.util.jump(d);c=="big"&&ucad.local.action.hide.float_banner_to_left(f,!0,!0)}},onclose:{top_follow_banner:function(a,c,e,d,f){ucad.util.stopPPG(a);ucad.local.action.hide.top_follow_banner(f);
ucad.remote.log.stat(c,e,f)},top_big_banner:function(a,c,e,d,f){ucad.util.stopPPG(a);c=="big"?(ucad.local.action.hide.top_big_banner(f),ucad.remote.log.stat(c,e,f),ucad.remote.log.stat("small","auto_show",f)):(a=ucad.$("ucad_close_img_small_"+f).getAttribute("can_close"),a=="1"||a=="true"?(ucad.local.action.hide.top_big_banner(f,!0,!0),ucad.remote.log.stat(c,e,f)):(ucad.local.action.show.top_big_banner(f),ucad.remote.log.stat("big","manual_show",f)))},idea_banner:function(a,c,e,d,f){ucad.util.stopPPG(a);
c=="big"?(ucad.local.action.hide.idea_banner(f),ucad.remote.log.stat("small","auto_show",f)):(ucad.local.action.hide.idea_banner(f,!0,!0),ucad.memory.raddata[f].sClose=!0,ucad.util.storage.save(f+"_small",ucad.util.storage.get(f)));ucad.remote.log.stat(c,e,f)},float_banner_right:function(a,c,e,d,f){ucad.util.stopPPG(a);ucad.local.action.hide.float_banner_right(f);ucad.remote.log.stat(c,e,f)},float_banner_to_left:function(a,c,e,d,f){ucad.util.stopPPG(a);ucad.remote.log.stat(c,e,f);c=="big"?(ucad.local.action.hide.float_banner_to_left(f),
ucad.remote.log.stat("small","auto_show",f)):ucad.local.action.hide.float_banner_to_left(f,!0,!0)}}};ucad.local.inject=function(a){ucad.debug("inject: ucad_poid_"+a.poid+",target:"+a.target);if(a==void 0)return!1;for(var c="",e=0;e<a.adarr.length;e++)c+=a.adarr[e].html+"<br />";c=c.replace(/<br \/>$/i,"");e=document.getElementById("ucad_poid_"+a.poid);if(e==void 0)return ucad.debug("cant found"),!1;var d=document.createElement("div");d.style.padding=0;d.style.margin=0;d.innerHTML=c;a.target=="top_body"?(document.body.insertBefore(d,document.body.firstChild),c=""):a.target=="bottom_body"&&(document.body.appendChild(d),
c="");e.outerHTML=c;for(e=0;e<a.adarr.length;e++)if(a.adarr[e].onload!=void 0)ucad.debug("exec action"),c=a.unqkey,ucad.util.memoryObjs(c),a.adarr[e].onload(c),a.adarr[e].exist=!0};
        
        ucad.config={
            config:{
                requestType:'jsonp',
                storageType:'cookie',
                requestFrom:'remote',
                hideTime:24*60*60*1000, 
                uc_param_str:"cpligiwisndnfrpfbivesslabtntuppifx"
            },
            url:{
                img_root:"http//mat.ads.uc.cn/jsi/res/img",
                stat_root:"http//appstat.ads.uc.cn/appstat/rad", 
                slot_root:"http//adslot.uc.cn/jsi"

            },
            debug:false
        }
        ucad.run();
