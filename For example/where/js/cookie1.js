//  value值  类型是一个  对象  设置cookie
function setCookie(name,val,n){
    var now = new Date();
    now.setTime(now.getTime() + n*24*60*60*1000 )
    document.cookie=name+"="+val + ";expires="+now;
}
function getCookie(name){
    //如果cookie中有数据  才可以获取数据
    if(document.cookie){
        var cookieInfo = document.cookie;
        //cookie中可能会包含一些 额外的数据，这些数据特点是由   分号和空格间隔的
        //所以 先将 分号和空格  替换掉   替换成  ;
        var arr = cookieInfo.replace(/;\s/g,';').split(";");
        for(var i=0;i<arr.length;i++){
            item = arr[i].split("=");
            if(item[0] == name){
                brr = item[1];
                return JSON.parse(brr);//如果找到 我们想要的键，将值转成数组返回
            }
        }
        //如果cookie中 没有我们想获取的键值，直接返回一个空数组
        return [];
    }
    //如果cookie中没有数据，直接返回一个空数组
    return [];
}
function removeCookie(name){
    setCookie(name,"",-1);
}


