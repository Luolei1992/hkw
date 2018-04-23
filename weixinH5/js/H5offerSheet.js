var Config2 = function(){
	// var _url = 'http://139.224.68.145:8080';
	var _url = 'https://www.huakewang.com';
	var _path = '/hkw_newapi/';
	var _quotePath = '/quoteApi/';
	var _payPath = '/payapi/';
	this.getUrl = function(){
		return _url;
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

}
var CONFIG2 = new Config2();

//全局函数，不需要页面加载完成就可以执行
//获取当前页面的URL参数
function getLocationParam(name){
    var url = window.location.search;
    if (~url.indexOf("?")) {
        var search = {};
        var arrayParam = url.split("?")[1].split(",");
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

//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时 (失效时间)，如12小时则是：h12
//d是天数，30天则：d30
function setCookie(name,value,time) {
	// var strsec = getsec(time);
	// var exp = new Date();
	// exp.setTime(exp.getTime() + strsec*1);
	// document.cookie = name + "="+ encodeURIComponent(value) + ";expires=" + exp.toGMTString();
	return window.localStorage.setItem(name, value);
};
function getCookie(name) {
    // var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	// if (arr != null)  return decodeURIComponent(arr[2]); return null;
	return window.localStorage.getItem(name);
};
// function getsec(str) {
// 	if(str == "" || str == null) {
// 		str = "d3";
// 	}
// 	var str1=str.substring(1,str.length)*1;
// 	var str2=str.substring(0,1);
// 	if (str2=="s") {
// 		return str1*1000;
// 	} else if (str2=="h") {
// 		return str1*60*60*1000;
// 	} else if (str2=="d") {
// 		return str1*24*60*60*1000;
// 	}
// }

//判断是否调用删除二维码的ajax，当前四个获取数据的接口返回后最后一次就调用这个接口。
window.deleteQrcodeIndex = 0;
//判断三个接口是否有一个返回失败
window.failQrcodeIndex = 0;

function selfInfo() {
    //客户个人信息
    $.ajax({
        url: CONFIG2.getUrl() + CONFIG2.getQuotePath() + "get_customer_info",
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
			project_id: getLocationParam('id'),
			timestamp: getLocationParam('timestamp')
        },
        success: function (response) {
			var res = JSON.parse(response);
			setCookie("user_id",res.data.auth_user_id);
			deleteQrcode();
            if (res.success) {
                var name = res.data.yunLinkName ? res.data.yunLinkName : "";
                var phone = res.data.yunLinkPhone ? res.data.yunLinkPhone : "";
                var email = res.data.yunLinkEmail ? res.data.yunLinkEmail : "";
				$(".one-row .name").html(name);
				if (phone || email) {
					$(".one-row .contact").html("(" + phone + " " + email + ")");
				}
            }
        }
    });
}
window.mainProjectInfo = {}; //定义分享连接上可能会用到的数据
window.sharePreviewImageSrc = ""; //定义分享连接上的预览图片
window.globalPhotoSwipeItems = []; //全局保存画廊的数据数组
function projectInfo() {
	//项目信息
	$.ajax({
		url: CONFIG2.getUrl() + CONFIG2.getQuotePath() + "get_main_project_info",
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			project_id: getLocationParam('id'),
			timestamp: getLocationParam('timestamp')
		},
		success: function (response) {
			deleteQrcode();
			var res = JSON.parse(response);
			if (res.success) {
				window.mainProjectInfo = res.data;
				// wxShareAppMessage(); //分享给朋友
				var title = res.data.projectName ? res.data.projectName : "";
				var description = res.data.projectDescription ? res.data.projectDescription : "";
				var appendixs = res.data.appendixs ? res.data.appendixs : "";
				if (appendixs.length > 0) {
					$(".enclosure-sum").html("共"+appendixs.length+"个");
					var appendixsDOM = "";
					appendixs.map(function(value, index){
						var name = value.name.split(".")[0];
						name.length > 8 ? name = name.substr(0,8) : "";
						var href = value.path || "javascript:;";
						var src = appendixsImgSrc(value) || "images/aunknown.png";
						var appendixsDOMOne = '<div class="photo-swipe-items">'+
							'<a href="javascript:;" data-src="'+href+'">' +
							'<img src="' + src + '">' + '<span>' + name+'</span>'+
							'</a>' +
							'</div>';
						appendixsDOM += appendixsDOMOne;
						//构建画廊数据数组 start
						var item = {};
						item.src = src;
						item.w = value.width != "0" ? parseInt(value.width) : 48;
						item.h = value.height != "0" ? parseInt(value.height) : 48;
						item.title = value.width != "0" ? value.name : value.name+" (该附件不是图片，请在电脑上下载观看)";
						window.globalPhotoSwipeItems.push(item);
						//构建画廊数据数组 end
						//设置分享链接上的预览图片
						if (!window.sharePreviewImageSrc) {
							if (value.width != "0") {
								window.sharePreviewImageSrc = value.path;
							}
						}
					});
					$(".appendixs-box").html(appendixsDOM);
				} else {
					$(".enclosure-sum").parent().css("display","none");
				}
				$(".big.title").html(title);
				$(".description").html(description);
			} else {
				window.failQrcodeIndex++;
			}
		},
		error: function (xhr, type) {
			layerMsg("网络故障", 5);
		}
	});
}

function projectDetailsInfo() {
	//项目详细信息
	$.ajax({
		url: CONFIG2.getUrl() + CONFIG2.getQuotePath() + "get_sub_project_list",
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			project_id: getLocationParam('id'),
			timestamp: getLocationParam('timestamp')
		},
		success: function (response) {
			deleteQrcode();
			var res = JSON.parse(response);
			if (res.success) {
				var project = $("#project");
				var htmlString = ''; //section DOM String;
				var sumRateArray = []; //总税收;
				var totalAll = 0;
				res.data.map(function (value, index) {
					// console.log(value);
					// console.log(index);
					var htmlChapter = '';
					value.parts.map(function (value) {
						// console.log(value);
						var description = value.description ? value.description : "";
						htmlChapter += '<div class="line"><div>' + description + '</div>';
						var sumPrice = 0;
						value.part.map(function (value) {
							sumPrice += parseFloat(value.price) * parseInt(value.number);
							sumRateArray.push(value.rate);
						});
						htmlChapter += '<div>' + sumPrice + '元</div></div>';
					});
					var priceName = value.priceName ? value.priceName : "";
					htmlString +=
						'<section>' +
						'<h2>' + (index + 1) + '，' + priceName + '</h2>' +
						htmlChapter +
						'</section>';
					totalAll += parseFloat(value.totalAll);
				});
				project.html(htmlString);
				var sumRate = 0;
				sumRateArray.map(function (value) {
					sumRate += parseFloat(value);
				});
				// console.log(sumRate);
				if (res.data[0].cash) {
					//显示税收
					$(".sum-price .tax").html(res.data[0].cash);
				}
				$(".tax.row span").html(sumRate + "元");
				$(".price-div .price").html(totalAll + "元");
				$(".price-div .price").html(totalAll + "元");
			} else {
				window.failQrcodeIndex++;
			}
		},
		error: function (xhr, type) {
			layerMsg("网络故障", 5);
		}
	});
}

function moneyInfo() {
	//金额信息
	$.ajax({
		url: CONFIG2.getUrl() + CONFIG2.getQuotePath() + "get_pay_stage_list",
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			project_id: getLocationParam('id'),
			timestamp: getLocationParam('timestamp')
		},
		success: function (response) {
			deleteQrcode();
			var res = JSON.parse(response);
			if (res.success) {
				var total = res.data.arrTotal ? res.data.arrTotal : 0;
				var discount = res.data.arrDiscount ? res.data.arrDiscount : 0;
				$(".sum-price .total").html(parseFloat(total) + "元");
				if (discount) {
					$(".sum-price .discount").html(parseFloat(discount) + "元");
					window.finalPrice = parseFloat(discount); //有优惠的最终价格
				} else {
					$(".sum-price .discount-title").remove();
					window.finalPrice = parseFloat(total); //没有优惠的最终价格
				}
			} else {
				window.failQrcodeIndex++;
			}
		},
		error: function (xhr, type) {
			layerMsg("网络故障", 5);
		}
	});
}


$("#submit").on("click", function (e) {
	// showLoginPopUp();
	// var res = "https://new.huakewang.com/payapi/wx_page_pay_test";
	// var res = "https://new.huakewang.com/wxapi/get_share_params/H5offerSheet.html";
	// window.open(res);
	// console.log(response);
	// $(this).attr("href",res);
	// wxRedirect();
	// wxShare();
	// getWxConfig();
	if (getLocationParam('count') == 'myself') {
		//是本人
		showMask();
		
	} else {
		//不是本人
		selectPayPopUp();
	}
});
// $(function(){
// 	var myEvent = new Event('click');
// 	document.getElementsByClassName("submit")[0].dispatchEvent(myEvent);
// });

/**
 * 显示登录的弹窗
 * 
 * @author ZhengGuoQing
 */
function showLoginPopUp(){
	layer.open({
		type: 1,
		content: document.getElementById("showLoginPopUp").innerHTML,
		className: 'showLoginPopUp',
		anim: 'up',
		btn: '确定',
		shadeClose: false,
		shade: 'background-color: rgba(204,204,204,1)',
		yes: function(index){
			if (buttonLogin()) {
				window.indexShowLoginPopUp = index;
			}
		}
	  });	
}

window.mainState = getLocationParam('count'); //设置页面状态
/**
 * 判断是否登录，是否是本人操作(本人操作显示分享按钮，发给别人后显示付款按钮)
 * 给URL添加参数count，如果参数为myself，则为自己，否则为别人，
 * 
 * @author ZhengGuoQing
 */
function isLogin(){
	if (getLocationParam('count') != 'myself') {
		//不是本人
		$("#submit").html("同意报价并付款");
		// if (!getCookie("user_id")) {
		// 	//没有登录
		// 	return false;
		// } else {
		// 	if (!getLocationParam('id')) {
		// 		show404();
		// 		return false;
		// 	}
		// 	return true;
		// }
		if (!getLocationParam('id')) {
			show404();
			return false;
		}
		return true;
	} else {
		//是本人，取参数中的user_id设置到cookie里
		// var userId = getLocationParam('user_id');
		// if (userId) {
		// 	setCookie("user_id",userId);
		// 	return true;
		// } else {
		// 	show404();
		// 	return true;
		// }
		$("#submit").html("发送报价并分享");
		return true;
	}
}

function show404(text){
	// return 0;
	var text = text || "此页面已失效，请刷新二维码。";
	layer.open({
		type: 1
		, className: 'show404'
		, content: text
		, style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
	});
}

/**
 * tips提示
 * 
 * @author ZhengGuoQing
 * @param {any} txt 
 * @param {number} time 
 */
function layerMsg(txt, time){
	var time = time || 2;
	layer.open({
		content: txt
		, skin: 'msg'
		, time: time //time秒后自动关闭
	});
}

function testPhone(val){
    if (!(/^1(2|3|4|5|6|7|8|9)\d{9}$/.test(val))) {
		layerMsg("请输入正确手机号！");
    	return false;        
    } else {
    	return true; 
    }
}

function testSMSCode(val){
	if (!(/^\d{4}$/.test(val))) {
		layerMsg("请输入4位数字短信验证码！");
		return false;
	} else {
		return true;
	}
}
//点击图形验证码
window.codePlusH5offerSheet = 0;
$(document).on("click", ".showLoginPopUp .codeH5offerSheet", function () {
	window.codePlusH5offerSheet++;
	$(".showLoginPopUp .codeH5offerSheet img").attr('src', 'images/loading.gif');
	setTimeout(function () {
		$(".showLoginPopUp .codeH5offerSheet img").attr('src', CONFIG2.getUrl() + '/index.php/verifycode/index/' + window.codePlusH5offerSheet);
	}, 300);
});

//修改手机账号时，获取短信验证码
$("body").on('click', '.showLoginPopUp .h5offerSpan', function(event) {
	// event.preventDefault();
	var $dom = $(this);
	var phone = $(".verification-phone").html();
	if (testPhone(phone) && $dom.html() == "获取验证码" ) {
		// ajaxGetSMSCode(phone, $dom);
		picCheck(phone, $dom);
	}
});

//验证图形验证码
function picCheck(phone, ele) {
	$.ajax({
		url: "https://www.huakewang.com/verifycode/check",
		type: "POST",
		dataType: "JSON",
		data: {
			secode: $(".showLoginPopUp .h5offerInput").val().toUpperCase()
		},
		success: function (res) {
			var res = JSON.parse(res);
			// console.log(res);
			if (res.success) {
				ajaxGetSMSCode(phone, ele);
			} else {
				layerMsg("请输入正确的图形验证码！", 5);
				$('.showLoginPopUp .codeH5offerSheet').click();
			};
		}
	});
};
/**
 * 修改手机号，向后端发送获取短信验证码的请求
 * @Author   郑国庆
 * @DateTime 2017-08-28T10:00:49+0800
 * @param    {[number]} phone [手机号]
 * @param    {[jquery object]} $dom [点击元素]
 */
function ajaxGetSMSCode(phone, $dom) {
	//更新 start 因为短信验证设置了类型
	var SMSType = $(".showLoginPopUp .money").attr("data-type");
	SMSType = SMSType ? "pay" : "login";
	//更新 end
	$.ajax({
        url: CONFIG2.getUrl()+CONFIG2.getPath()+'get_reg_sms_code',
        type: 'POST',
        dataType: 'JSON',
        data: {
			type: SMSType,
			mobile: phone,
			tokeen: $(".showLoginPopUp .h5offerInput").val().toUpperCase() 		
		},
		success: function (res){
			var res = JSON.parse(res);
			if (res.success) {
				SMSCountdown($dom);
			}
			layerMsg(res.message, 3);
		},
		error: function (xhr, type){
			layerMsg("网络故障!", 5);
		}
	});
}

function SMSCountdown($dom){
	$dom.html("60秒后重试");
	$dom.removeClass("allow");
	var second = 60;
	function render(){
		var value = second + "秒后重试";
		$dom.html(value);
		second --;
		if (second == 0) {
			window.clearInterval(token);
			$dom.html("获取验证码");
			$dom.addClass("allow");
		}
	}
	var token = window.setInterval(render, 1000);
}

/**
 * 点击登录按钮
 */
function buttonLogin(){
	var phone = $(".verification-phone").html();
	var SMSCode = $(".verification-code").eq(3).val();
    if (testPhone(phone) && testSMSCode(SMSCode)) {
		ajaxLogin(phone, SMSCode);
		return true;
	} else {
		return false;
	}
}

/**
 * 获取短信验证码后向后端发送确认登录的ajax
 * 
 * @author ZhengGuoQing
 * @param {any} phone 
 * @param {any} SMSCode 
 */
function ajaxLogin(phone, SMSCode){
	$.ajax({
        url: CONFIG2.getUrl()+CONFIG2.getPath()+'login_with_auto_reg',
        type: 'POST',
        dataType: 'JSON',
        data: {
			username: phone,
			code: SMSCode		
		},
		success: function (res){
			var res = JSON.parse(res);
			if (res.success) {
				// console.log(res);
				setCookie("user_id",res.data.id);
				layer.close(window.indexShowLoginPopUp);
				//渲染数据
				// selfInfo();
				projectInfo();
				projectDetailsInfo();
				moneyInfo();
				$("#Initialization").remove();
			} else {
				layerMsg(res.message, 1);
			}
		},
		error: function (xhr, type){
			layerMsg("网络故障!", 5);
		}
	});
}

/**
 * 获取URL地址上的手机号和姓名，用于登录框显示
 * 
 * @author ZhengGuoQing
 * @returns 
 */
function getUrlInfo(){
	var phone = getLocationParam("phone");
	var name = getLocationParam("name")
	if (name) {
		name = decodeURI(name);
		$(".customer-name").html(name);
		if (getLocationParam("count") == "myself") {
			$(".one-row .name").html(name);	
		} else {
			name = getLocationParam("seller_name");
			name = decodeURI(name);
			$(".one-row .name").html(name);
			$("h2.customer").html("我的服务方");
		}
	}
	if (phone) {
		$(".customer-phone").html(phone);
		if (getLocationParam("count") == "myself") {
			$(".one-row .contact").html("(" + phone + ")");
		} else {
			phone = getLocationParam("seller_phone");
			$(".one-row .contact").html("(" + phone + ")");
		}
		
		return true;
	} else {
		return false;
	}
}

/**
 * 删除二维码
 * 
 * @author ZhengGuoQing
 */
function ajaxDeleteQrcode(){
	$.ajax({
        url: CONFIG2.getUrl()+CONFIG2.getQuotePath()+'del_quote_qrcode',
        type: 'POST',
        dataType: 'JSON',
        data: {
			// user_id: getCookie("user_id"),
			project_id: getLocationParam('id')
		},
		success: function (res){
			var res = JSON.parse(res);
			// console.log(res);
			if (res.success) {

			} else {
				layerMsg(res.message, 1);
			}
		},
		error: function (xhr, type){
			layerMsg("网络故障!", 5);
		}
	});
}

/**
 * 判断是否调用删除二维码的ajax，当前四个获取数据的接口返回后最后一次就调用这个接口。
 * 
 * @author ZhengGuoQing
 */
function deleteQrcode(){
	window.deleteQrcodeIndex++;
	if (window.deleteQrcodeIndex == 3) {
		ajaxDeleteQrcode();
		if (window.failQrcodeIndex > 0) {
			if (window.mainState != "myself") {
				// window.location.href = encodeURIComponent(location.href.split('#')[0]);
				var count = getLocationParam("count");
				if (count == "other") {
					window.location.href = "https://www.huakewang.com/wxapi/wx_auth_redirect?redirect_uri=" + encodeURIComponent(location.href.split('#')[0].replace(/other/, "oauth"));	
				} else {
					showLoginPopUp();  //temp	
				}
				// redirectClick();
			} else {
				show404();
			}
		}
	}
}
// $(function(){
// 	$("#redirect").click(function (e) { 

// 	});
// });

/**
 * 模拟点击，重定向
 * 
 * @author ZhengGuoQing
 */
// function redirectClick(){
// 	var myEvent = new Event('click');
// 	document.getElementById("redirect").dispatchEvent(myEvent);
// }

/**
 * 获取微信配置信息
 * 
 * @author ZhengGuoQing
 */
function getWxConfig(){
	$.ajax({
        url: CONFIG2.getUrl()+CONFIG2.getPayPath()+'wx_page_pay_test',
        type: 'GET',
        dataType: 'JSON',
		success: function (res){
			alert(res);
			var res = JSON.parse(res);
			if (res.success) {

			} else {
				layerMsg(res.message, 1);
			}
		},
		error: function (xhr, type){
			layerMsg(xhr, 5);
			layerMsg("网络故障!", 5);
		}
	});
}

/**
 * 微信认证，然后重定向
 * 
 * @author ZhengGuoQing
 */
function wxRedirect(){
	var url = encodeURIComponent(location.href.split('#')[0]); 
	$.ajax({
        url: CONFIG2.getUrl()+'/wxapi/wx_auth_redirect',
        type: 'GET',
		dataType: 'JSON',
		data: {
			redirect_uri: url
		},
		success: function (res){
			window.location.href = "https://www.huakewang.com/wxapi/wx_auth_redirect?redirect_uri=" + encodeURIComponent(location.href.split('#')[0].replace(/other/, "oauth"));
			// window.location.href = location.href.split('#')[0];
		},
		error: function (xhr, type){
			layerMsg(xhr, 5);
			layerMsg("网络故障!", 5);
		}
	});
}

$(function(){
	//首先判断是不是微信浏览器
	if (judgeBrowser() == "MicroMessenger") { //temp
		wxShare();//分享		
		if (getUrlInfo()) {
			if (isLogin()) {
				//渲染数据
				// selfInfo();
				projectInfo();
				projectDetailsInfo();
				moneyInfo();
				$("#Initialization").remove();
			} else {
				showLoginPopUp();
			}	
		} else {
			show404();
		}
	} else {
		show404("请在微信上浏览此页面！");
	}
});

function wxShare(){
	var link = encodeURIComponent(location.href.split('#')[0]);
	$.ajax({
        url: CONFIG2.getUrl()+'/wxapi/get_share_params/'+link,
        type: 'POST',
		dataType: 'JSON',
		success: function (res){
			var res = JSON.parse(res);
			if (res.success) {
				// console.log(res);
				wxInit(res.data.timestamp, res.data.nonceStr, res.data.signature, res.data.url);
			} else {
				layerMsg(res.message, 1);
			}
		},
		error: function (xhr, type){
			layerMsg("网络故障!", 5);
		}
	});
}

function wxInit(timestamp, nonceStr, signature, link){
	wx.config({
		debug: false, 
		appId: 'wx04301edcd16d6d92', 
		timestamp: timestamp, // 必填，生成签名的时间戳
		nonceStr: nonceStr, // 必填，生成签名的随机串
		signature: signature,// 必填，签名，见附录1
		jsApiList: ['checkJsApi', 'onMenuShareAppMessage', 'chooseWXPay']
	});
	wx.ready(function(){
		// console.log("初始化")
		wx.checkJsApi({
			jsApiList: ['onMenuShareAppMessage'], 
			success: function(res) {
				// console.log("接口测试成功");
				// console.log(res);
			},
			fail: function(res){
				alert("微信版本太低，请升级微信！");
				// console.log(res);
			}
		});
		pollingWxShareAppMessage(); //分享给朋友，轮询
	});
	wx.error(function(res){
		console.log("初始化错误");
		console.log(res);
	});
}

function wxShareAppMessage(){
	console.log("分享开始呀！！！");
	var link = location.href.split('#')[0].replace(/myself/,"other");
	var title = window.mainProjectInfo.projectName || document.title;
	var desc = window.mainProjectInfo.projectDescription || "";
	var imgUrl = window.sharePreviewImageSrc || "../../images/renzheng.png";
	// alert(link);
	wx.onMenuShareAppMessage({
		title: title, // 分享标题
		desc: desc, // 分享描述
		link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: imgUrl, // 分享图标
		// type: 'link', // 分享类型,music、video或link，不填默认为link
		// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function (res) { 
			// 用户确认分享后执行的回调函数
			// alert("成功分享");
			console.log("分享成功！！！");
			console.log(res);
		},
		complete: function(res){
			console.log("分享结束！！！");
			console.log(res);
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
}

/**
 * 由于调用分享给朋友的接口需要取到标题和描述，而这两个过程是异步的，所以采用定时器轮询的方式吧。
 * 
 * @author ZhengGuoQing
 */
function pollingWxShareAppMessage(){
	var count = 0;
	var timer = setInterval(function(){
		count ++;
		if (window.mainProjectInfo.projectName || count >10) {
			clearInterval(timer);
			wxShareAppMessage();
		} 
	},300);
}

/**
 * 判断浏览器是不是微信浏览器
 * 
 * @author ZhengGuoQing
 */
function judgeBrowser(){
	var browser = {
		versions: function () {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {     //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	if (browser.versions.mobile) {
		//判断是否是移动设备打开。browser代码在下面
		var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			//在微信中打开
			return "MicroMessenger";
		}
		if (ua.match(/WeiBo/i) == "weibo") {
			//在新浪微博客户端打开
			return "WeiBo";
		}
		if (ua.match(/QQ/i) == "qq") {
			//在QQ空间打开
			return "QQ";
		}
		if (browser.versions.ios) {
			//是否在IOS浏览器打开
			return "IOS";
		} 
		if(browser.versions.android){
			//是否在安卓浏览器打开
			return "android";
		}
		return "other";
	} else {
		//否则就是PC浏览器打开
		return "PC";
	}
}

/**
 * 设置是否显示提示用户右上角分享额遮罩
 * 
 * @author ZhengGuoQing 
 */
function showMask(){
	layer.open({
		type: 1,
		content: document.getElementById("showMask").innerHTML,
		className: 'showMask',
		anim: 'scale',
		shadeClose: false,
		shade: 'background-color: rgba(0,0,0,0.8)'
	});
}
$(document).on("click", ".showMaskKnow", function (e) {
	e.preventDefault();
	layer.closeAll();
});

/**
 * 底部弹框选择付款方式，微信支付或余额支付
 * 
 * @author ZhengGuoQing
 */
function selectPayPopUp(){
	layer.open({
		content: '请选择付款方式'
		, btn: ['取消','余额支付','微信支付']
		, skin: 'footer'
		, no: function (index){
			console.log("取消");
		}
		, yes: function (index){
			console.log("余额支付");
			layer.close(index);
			var money = window.finalPrice; //最终价格
			getYeNum(money); //获取余额
			// selectBalancePayPopUp(666,2333); //底部弹框选择余额付款方式，确认支付或账户充值
		}
		, ok: function (index){
			console.log("微信支付");
			var money = window.finalPrice; //价格
			var projectId = getLocationParam("id"); //项目id
			payWeiXin(money, projectId);
			// wxRedirect();
			layer.close(index);
		}
	});
}


/**
 * 底部弹框选择余额付款方式，确认支付或账户充值
 * 
 * @author ZhengGuoQing
 */
function selectBalancePayPopUp(finalPrice, balancePrice) {
	var finalPrice = finalPrice ? finalPrice + "元" : "未知";
	var balancePrice = balancePrice ? balancePrice + "元" : "未知";
	var titleDOM = '实付款<span class="finalPrice-popup">' + finalPrice + '</span>(账户余额 <span class="balancePrice-popup">' + balancePrice +'</span> )';
	var balanceState = false; //余额的状态，判断余额是否足够支付该订单，弹窗好几个地方需要用到。
	balanceState = (parseFloat(finalPrice) <= parseFloat(balancePrice)) ? true : false;
	var confirmPayTxt = balanceState ? "确认支付" : "<span class='balanceState-popup'>确认支付 (余额不足，请充值)</span>";
	layer.open({
		content: titleDOM
		, btn: ['取消', confirmPayTxt, '账户充值']
		, skin: 'footer'
		, no: function (index) {
			console.log("取消");
		}
		, yes: function (index) {
			console.log("确认支付");
			if (balanceState) {
				balancePaySMSPopUp(finalPrice); //弹出余额支付的弹窗
				layer.close(index);
			}
		}
		, ok: function (index) {
			console.log("账户充值");
			// var money = window.finalPrice; //价格
			var projectId = getLocationParam("id"); //项目id
			rechargePopUp();
			// wxRedirect();
			layer.close(index);
		}
	});
}

/**
 * 调用微信支付
 * 
 * @author ZhengGuoQing
 * @param {any} money 金钱数量
 * @param {any} projectId 项目ID
 */
function payWeiXin(money, projectId, pay_model){
	var pay_model = pay_model || "project";
	$.ajax({
		url: CONFIG2.getUrl() + '/payapi/get_pay_page',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),     //支付用户的id
			totalAmount: money,                //费用总数
			pay_type: 'WxPay',                //AliPay：支付宝支付，WeiXinPay：微信支付
			pay_model: pay_model,                    //支付模块
			model_id: projectId                       //约见id
		},
		success: function (res) {
			var res = JSON.parse(res);
			// console.log(res);
			if (res.success) {
				var data = JSON.parse(res.data);
				console.log(data);
				funChooseWXPay(data.appId, data.timeStamp, data.nonceStr, data.package, data.signType, data.paySign, pay_model);
			} else if (res.field == "openid") {
				// wxRedirect();
				window.location.href = "https://www.huakewang.com/wxapi/wx_auth_redirect?redirect_uri=" + encodeURIComponent(location.href.split('#')[0].replace(/other/, "oauth"));
				// window.location.href = "http://www.baidu.com";
			} else {
				alert(JSON.stringify(res));
			};
		}, error: function () {
			alert("数据获取异常！");
		}
	});
}

/**
 * 调用微信jssdk支付接口
 * 
 * @author ZhengGuoQing
 * @param {any} appId
 * @param {any} timestamp
 * @param {any} nonceStr 
 * @param {any} package 
 * @param {any} signType 
 * @param {any} paySign
 * @param {any} pay_model //支付类型，如果为"project"则为支付报价单，如果为"other"则为给账户余额充值
 */
function funChooseWXPay(appId, timestamp, nonceStr, package, signType, paySign, pay_model){
	wx.chooseWXPay({
		appId: appId,
		timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
		package: package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		paySign: paySign, // 支付签名
		success: function (res) {
			// 支付成功后的回调函数
			console.log("支付成功");
			console.log(res);

			var payType = "支付成功";
			payType = pay_model == "project" ? "支付成功" : "充值成功";
			alert(payType);
		},
		fail: function (res){
			console.log("支付失败");
			console.log(res);
			// alert(JSON.stringify(res))
			alert("支付失败");
		},
		cancel: function (res){
			alert("取消支付");
		}
	});
}

function funChooseWXPay2(appId, timestamp, nonceStr, package, signType, paySign) {
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest', {
			"appId": appId,     //公众号名称，由商户传入       
			"timeStamp": timestamp,         //时间戳，自1970年以来的秒数       
			"nonceStr": nonceStr, //随机串       
			"package": package,
			"signType": signType,         //微信签名方式：       
			"paySign": paySign //微信签名   
		},
		function (res) {
			if (res.err_msg == "get_brand_wcpay_request:ok") { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。  
				console.log("支付成功");
			} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
				alert("用户取消支付!");
			} else {
				alert(JSON.stringify(res));
			}   
		}
	);
}  

//余额支付开始

/**
 * 获取余额
 * 
 * @author ZhengGuoQing
 * @param {any} finalPrice 最后的价格
 */
function getYeNum(finalPrice) {
	$.ajax({
		url: CONFIG2.getUrl() + CONFIG2.getPayPath() + 'get_blance',
		type: "post",
		dataType: "json",
		data: {
			user_id: getCookie("user_id")
		},
		success: function (res) {
			console.log(res);
			if (res.success) {
				var balance = (res.message - 0).toFixed(2);
				selectBalancePayPopUp(finalPrice, balance);
			} else {
				alert("余额获取失败！");
				// alert(JSON.stringify(res));
			};
		}, error: function () {
			alert("余额获取失败！");
		}
	});
}

/**
 * 充值输入框弹窗
 * 
 * @author ZhengGuoQing
 */
function rechargePopUp(){
	layer.open({
		type: 1,
		content: document.getElementById("rechargePopUp").innerHTML,
		className: 'rechargePopUp',
		anim: 'up',
		btn: '确认充值( <i class="money">0.00</i>元 )',
		shadeClose: true,
		shade: 'background-color: rgba(0,0,0,0.5)',
		yes: function (index) {
			if (buttonRecharge()) {
				// window.indexRechargePopUp = index;
				layer.close(index);
			}
		}
	});
} 

$("body").on("keyup", ".rechargePopUp .input-recharge-money", function () {
	if (this.value !== "") {
		var val = (this.value - 0).toFixed(2);
		var valData = this.getAttribute("data-value");
		if (isNaN(val) || val < 0) {
			this.value = valData;
		}
		this.setAttribute("data-value", val);
		$(".rechargePopUp .layui-m-layerbtn .money").html(val);
	} else {
		this.setAttribute("data-value", 0);
		$(".rechargePopUp .layui-m-layerbtn .money").html("0.00");
	}
});

/**
 * 点击确认付款
 * 
 * @author ZhengGuoQing
 * @returns 
 */
function buttonRecharge() {
	var inputMoney = $(".rechargePopUp .layui-m-layerbtn .money").html();
	if (isNaN(inputMoney)) {
		layerMsg("请输入数字！");
		return false;
	}
	if (inputMoney <=0 ) {
		layerMsg("充值金额必须大于0！");
		return false;
	}
	payWeiXin(inputMoney, 0, "other");
	return true;
}

/**
 * 余额支付短信验证码确认的弹窗
 * 
 * @author ZhengGuoQing
 * @param {any} money 
 */
function balancePaySMSPopUp(money) {
	//更新 start 因为短信验证码设置了类型
	// $(".showLoginPopUp .code").attr("data-type","pay");
	//更新 end
	var money = parseFloat(money) || "0.00";
	var btn = '确认支付( <i data-type="pay" class="money">' + money+'</i>元 )'
	layer.open({
		type: 1,
		content: document.getElementById("showLoginPopUp").innerHTML,
		className: 'showLoginPopUp balancePaySMSPopUp',
		anim: 'up',
		btn: btn,
		shadeClose: true,
		shade: 'background-color: rgba(0,0,0,0.5)',
		yes: function (index) {
			var buttonBalancePayReturn = buttonBalancePay();
			if (buttonBalancePayReturn) {
				var model_id = getLocationParam("id"); //项目id
				//首先得判断用户是否重复点击，既正在支付中
				if (window.buttonBalancePayStateDisabled) {
					ajaxPayByBlance(model_id, buttonBalancePayReturn.SMSCode, index); //发送ajax向后端请求余额支付
				}
			}
		}
	});
}

/**
 * 点击余额支付的确认支付按钮,验证手机和短信验证码是否正确输入
 * 
 * @author ZhengGuoQing
 */
function buttonBalancePay(){
	var phone = $(".verification-phone").html();
	var SMSCode = $(".verification-code").eq(1).val();
	if (testPhone(phone) && testSMSCode(SMSCode)) {
		return {
			phone: phone,
			SMSCode: SMSCode
		};
	} else {
		return false;
	}
}

window.buttonBalancePayStateDisabled = true; //余额支付的按钮，默认是让点击的，
/**
 * ajax余额支付
 * 
 * @author ZhengGuoQing
 * @param {any} model_id 订单ID
 * @param {any} code 短信验证码
 * @param {any} index 弹窗index，用于关闭弹窗
 */
function ajaxPayByBlance(model_id, code, index) {
	//开始支付时，不让点击按钮，同时，按钮上的文字显示正在支付中,设置状态为不可点击
	window.buttonBalancePayStateDisabled = false; //false不让点击。
	// buttonBalancePayState(window.buttonBalancePayStateDisabled);
	$.ajax({
		url: CONFIG2.getUrl() + CONFIG2.getPayPath() + 'pay_by_blance',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			pay_model: "project",
			model_id: model_id,
			code: code
		},
		success: function (res) {
			var res = JSON.parse(res);
			if (res.success) {
				layer.close(index);
				alert("支付成功");
			} else {
				layerMsg(res.message, 2);
			}
			window.buttonBalancePayStateDisabled = true;
		},
		error: function () {
			window.buttonBalancePayStateDisabled = true;
			layer.close(index);
			alert("数据获取异常！");
		}
	});
}

/**
 * 判断余额支付的按钮是否让点击，显示相应的内容，不让点击时显示正在支付中
 * 
 * @author ZhengGuoQing
 * @param {any} disabled 
 * @param {any} money 
 */
function buttonBalancePayState(disabled, money){
	var money = money || "0.00";
	var btn = $(".balancePaySMSPopUp .layui-m-layerbtn span");
	if (disabled) {
		//让点击
		btn.html('确认支付( <i class="money">' + money + '</i>元 )');
		btn.css({
			"color":"#fff"
		});
	} else {
		//不让点击，正在支付中
		btn.css({
			"color": "#ccc"
		});
		btn.html('正在支付中......');
	}
}

/**
 * 展示项目附件时，根据返回的数据名称name，判断是什么类型的文件，然后显示相应的图标
 * 
 * @author LuoLei
 * @param {any} json 
 * @returns 
 */
function appendixsImgSrc(json){
	var src = "";
	var fileTypeSrc = ['images/adoc.png', 'images/ajpg.png', 'images/amp3.png', 'images/amp4.png', 'images/apdf.png', 'images/appt.png', 'images/atxt.png', 'images/aunknown.png', 'images/axls.png', 'images/azip.png'];
	if ('.jpg.png.gif.bmp.tif'.indexOf(json.ext) != -1) {
		src = json.path ? json.path : fileTypeSrc[1];
	} else if ('.doc.docx'.indexOf(json.ext) != -1) {
		src = fileTypeSrc[0];
	} else if ('.xls.xlsx'.indexOf(json.ext) != -1) {
		src = fileTypeSrc[8];
	} else if ('.ppt.pptx'.indexOf(json.ext) != -1) {
		src = fileTypeSrc[5];
	} else if ('.pdf'.indexOf(json.ext) != -1) {
		src = fileTypeSrc[4];
	} else if ('.txt'.indexOf(json.ext) != -1) {
		src = fileTypeSrc[6];
	} else if ('.mp3'.indexOf(json.ext) != -1) {
		src = fileTypeSrc[2];
	} else if ('.mp4'.indexOf(json.ext) != -1) {
		src = fileTypeSrc[3];
	} else if ('.zip.rar'.indexOf(json.ext) != -1) {
		src = fileTypeSrc[9];
	} else {
		src = fileTypeSrc[7];
	};
	return src;
}

var openPhotoSwipe = function (items, index) {
	var pswpElement = document.querySelectorAll('.pswp')[0];
	var options ={
		index: index,
		showAnimationDuration: 100,
		hideAnimationDuration: 100
	}
	var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();
}

$("body").on("click", ".appendixs-box .photo-swipe-items", function (event) {
	event.stopPropagation();
	var index = $(".photo-swipe-items").index(this);
	openPhotoSwipe(window.globalPhotoSwipeItems, index);
});