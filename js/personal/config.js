var Config = function(){
	var _url = 'https://www.huakewang.com';
	// var _url = 'http://www.huakewang.com';
	// var _localUrl = 'http://localhost:30001';
	var _mockUrl = 'https://www.easy-mock.com/mock/59906216a1d30433d85febb2';
	var _path = '/hkw_newapi/';
	var _quotePath = '/quoteApi/';
	var _payPath = '/payapi/';
	this.getUrl = function(){
		return _url;
	}
	this.getMockUrl = function(){
		return _mockUrl;
	}
	this.getPath = function(){
		return _path;
	}
	this.getQuotePath = function(){
		return _quotePath;
	}
	this.getPayPath = function(){
		return _payPath;
	}		
	/**
	 * 工具函数，根据某一天的时间戳，判断是几时几分
	 * @Author   郑国庆
	 * @DateTime 2017-08-10T18:58:54+0800
	 * @param    {[number]} stamp [某一天的时间戳]
	 * @return   {[string]}       [小时和分钟]
	 */
	this.utilTime = function(stamp){
		var h = parseInt(stamp/1000/60/60/24);
		var m = parseInt((stamp - h*1000*60*60*24)/1000/60/60);
		if (h < 10) {
			h = "0"+h;
		}
		if (m < 10) {
			m = "0"+m;
		}		
		return h+":"+m;
	}
}
var CONFIG = new Config();

/**
 * 这是一个全局函数
 * 简单的防止XSS攻击，所有用户输入的字符串都应该进行HTML转义
 * @Author   郑国庆
 * @DateTime 2017-06-16T15:40:09+0800
 * @param    {[string]} str [原始字符串]
 * @return   {[string]}     [返回的是HTML转义后的安全字符串]
 */
function html_encode(str){
	var s="";
	if (str.length == 0) {return "";}
	s= str.replace(/&/g,"&amp;");
	s= s.replace(/</g,"&lt;");
	s= s.replace(/>/g,"&gt;");
	s= s.replace(/\s/g,"&nbsp;");
	s= s.replace(/\'/g,"&#39;");
	s= s.replace(/\"/g,"&quot;");
	s= s.replace(/\n/g,"<br>");
	return s;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//全局函数，不需要页面加载完成就可以执行
//获取当前页面的URL参数
function getLocationParam(name){
    var url = window.location.search;
    if (~url.indexOf("?")) {
        var search = {};
        var arrayParam = url.split("?")[1].split("&");
        arrayParam.map(function(value,index, elem) {
            var key = value.split("=")[0];
            var val = value.split("=")[1];
            search[key] = val;
        });
    	if (name in search){
    	    return search[name];                
    	}else{
    	    return "";
    	}
    }
    return "";
}

if (typeof Array.prototype.map != "function") {
	Array.prototype.map = function (fn, context) {
	  var arr = [];
	  if (typeof fn === "function") {
		for (var k = 0, length = this.length; k < length; k++) {
		   arr.push(fn.call(context, this[k], k, this));
		}
	  }
	  return arr;
	};
  }

if (!document.getElementsByClassName) {
	document.getElementsByClassName = function (cls) {
		var ret = [];
		var els = document.getElementsByTagName('*');
		for (var i = 0, len = els.length; i < len; i++) {

			if (els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
				ret.push(els[i]);
			}
		}
		return ret;
	}
}

if (!window.getComputedStyle) {
	window.getComputedStyle = function (element, att){
		return element.currentStyle;
	}
}