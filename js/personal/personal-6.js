$(function(){
    ajaxGetThirdPartBind(); //获取第三方登录绑定信息
    ajaxGetNoticeSetList(); //ajax获取通知设置列表
    ajaxGetPrivacySetList(); //ajax获取隐私设置列表，不包括关闭个人主页
    ajaxGetUserBaseInfo(); //ajax获取个人基本信息，用来查看邮箱，手机，隐私设置关闭个人主页
});
/**
 * 点击修改手机号按钮
 */
var codePlusNum6 = 10;
$("body").on("click" ,"#phoneBind2", function (event) {
    event.preventDefault();
    window.alertInputChangePhone = layer.open({
        type: 1,
        title: "",
        area: "340px",
        content: $("#changePhonePouup")
    });
});

/**
 * 点击修改邮箱账号按钮
 */
$("body").on("click" ,"#emailBind2", function (event) {
    event.preventDefault();
    window.alertInputChangeEmail = layer.open({
        type: 1,
        title: "",
        area: "350px",
        content: $("#changeEmailPouup")
    });
});

//修改手机账号时，获取短信验证码
$("body").on('click', '#SMS-code-txt', function(event) {
	event.preventDefault();
	var $dom = $(this);
	var phone = $("#new-phone-val").val();
	if (testPhone(phone) && $dom.html() == "获取验证码" ) {
		picCheck(phone, $dom);
	}
});

//修改邮箱账号时，获取邮箱验证码
$("body").on('click', '#SMS-code-txt0', function(event) {
	event.preventDefault();
	var $dom = $(this);
	var email = $("#new-phone-val0").val();
	if (testEmail(email) && $dom.html() == "获取验证码" ) {
		ajaxGetEmailCode(email, $dom);
	}
});

//测试邮箱是否正确
function testEmail(val){
    if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val))) {
        layer.msg("请输入正确邮箱账号！",{time:1000});
    	return false;        
    } else {
    	return true; 
    }
}

function testPhone(val){
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
        layer.msg("请输入正确手机号！",{time:1000});
    	return false;        
    } else {
    	return true; 
    }
}

function testSMSCode(val){
	if (!(/^\d{4}$/.test(val))) {
        layer.msg("请输入4位数字短信验证码！",{time:1000});
		return false;
	} else {
		return true;
	}
}

/**
 * 修改手机号，向后端发送获取短信验证码的请求
 * @Author   郑国庆
 * @DateTime 2017-08-28T10:00:49+0800
 * @param    {[number]} phone [手机号]
 * @param    {[jquery object]} $dom [点击元素]
 */
function ajaxGetSMSCode(phone, $dom) {
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_reg_sms_code', //真实接口
        type: 'POST',
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
        	type: "change",
		    mobile: phone,
			tokeen: $("#personal6").val().toUpperCase()
        }
	})
	.done(function(req) {
		if (req.success) {
			SMSCountdown($dom);
		}
        layer.msg(req.message,{time:1500});
	})
	.fail(function(err) {
		console.log(err);
	});
}

/**
 * 修改邮箱号码，向后端发送获取邮箱验证码的请求
 * @Author   郑国庆
 * @DateTime 2017-08-28T10:00:49+0800
 * @param    {[number]} email [邮箱号码]
 * @param    {[jquery object]} $dom [点击元素]
 */
function ajaxGetEmailCode(email, $dom) {
    var token = SMSCountdown($dom);
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_validate_code_by_email', //真的接口
        type: 'POST',
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
		    email: email		
        }
	})
	.done(function(req) {
		if (!req.success) {
            window.clearInterval(token);
            $dom.html("获取验证码");
		}
        layer.msg(req.message,{time:1500});
	})
	.fail(function(err) {
		console.log(err);
	});
}

function SMSCountdown($dom){
    var second = 60;
    render(); //初始值60秒
	function render(){
		var value = second + "秒后重试";
		$dom.html(value);
		second --;
		if (second == 0) {
			window.clearInterval(token);
            $dom.html("获取验证码");
		}
	}
    var token = window.setInterval(render, 1000);
    return token;
}

/**
 * 获取短信验证码后向后端发送确认修改手机号码的信息
 */
$("body").on("click", "#ok-change-phone", function (event) {
    event.preventDefault();
    var phone = $("#new-phone-val").val();
	var SMSCode = $("#SMS-code-val").val();
    if (testPhone(phone) && testSMSCode(SMSCode)) {
		ajaxImportantInfo(phone, "phone", SMSCode);
	}
});

/**
 * 获取邮箱验证码后向后端发送确认修改邮箱账号的信息
 */
$("body").on("click", "#ok-change-phone0", function (event) {
    event.preventDefault();
    var email = $("#new-phone-val0").val();
	var SMSCode = $("#SMS-code-val0").val();
    if (testEmail(email) && testSMSCode(SMSCode)) {
		ajaxImportantInfo(email, "email", SMSCode);
	}
});

/**
 * 修改个人重要信息，包括手机号和邮箱地址
 * 
 * @author ZhengGuoQing
 * @param {String} info 新的邮箱地址或新的手机号码
 * @param {String} type 需要修改的字段类型,emial/phone
 * @param {Number} code 验证码
 */
function ajaxImportantInfo(info, type, code){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'change_self_important_info',
        type: "POST",
        dataType: "JSON",
        data: {
            info: info,
            type: type,
            code: code,
            user_id: getCookie("user_id")
        },
        success: function (res) {
            if (res.success) {
                layer.msg(res.message, {time: 1500},function(){
                    if (type == "phone") {
                        layer.close(window.alertInputChangePhone);
                    }
                    if (type == "email") {
                        layer.close(window.alertInputChangeEmail);
                    }
                });
            } else {
                layer.msg(res.message, {time: 1500});
            }
        }
    });
}

/**
 * ajax获取第三方登录绑定信息
 */
function ajaxGetThirdPartBind(){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_third_part_bind_list',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id")
        },
        success: function (res) {
            if (res.success) {
                renderThirdPartBind(res.data);
            }
        }
    }); 
}

/**
 * 根据是否绑定第三方登录平台，显示按钮
 * 
 * @param {any} data 
 */
function renderThirdPartBind(data){
    var weixinURL = "https://www.huakewang.com/wxopenapi/auth_redirect";
    var sinaURL = "http://www.huakewang.com/main/sina_oauth.html";
    var qqURL = "http://www.huakewang.com/main/qq_oauth.html";
    var weixinTitle = data.weixin.is_weixin_bind ? data.weixin.nickname : "微信";
    var sinaTitle = data.sina.is_sina_bind ? data.sina.nickname : "新浪";
    var qqTitle = data.qq.is_qq_bind ? data.qq.nickname : "QQ";

    var weixinRealUrl = data.weixin.is_weixin_bind ? "" : weixinURL;
    var sinaRealUrl = data.sina.is_sina_bind ? "" : sinaURL;
    var qqRealUrl = data.qq.is_qq_bind ? "" : qqURL;

    renderOneThirdPartBind(".disanfang .wx",weixinTitle,weixinRealUrl);
    renderOneThirdPartBind(".disanfang .wb",sinaTitle,sinaRealUrl);
    renderOneThirdPartBind(".disanfang .qq",qqTitle,qqRealUrl);
}

/**
 * 渲染你一条第三方登录平台显示按钮
 * 
 * @param {any} className 类名，用于找到DOM元素
 * @param {any} title 显示昵称还是绑定
 * @param {any} url 点击解绑还是绑定
 */
function renderOneThirdPartBind(className,title,url){
    $(className).find("span.title").html(title);
    var urlReal = url ? url : "javascript:;";
    var txt = url ? "绑定" : "解绑";
    $(className).find("a").attr("href",urlReal);
    $(className).find("a").html(txt);

    switch (className) {
        case ".disanfang .wx" :
            !url ? $(".disanfang .weixin_icon").css("background-image","url(./images/weixin-iconB.png)") : $(".disanfang .weixin_icon").css("background-image","url(./images/weixin-icon.png)");
            return ;
        case ".disanfang .wb" :
            !url ? $(".disanfang .weibo_icon").css("background-image","url(./images/weibo-iconB.png)") : $(".disanfang .weibo_icon").css("background-image","url(./images/weibo-icon.png)");
            return ;
        case ".disanfang .qq" :
            !url ? $(".disanfang .qq_icon").css("background-image","url(./images/qq-iconB.png)") : $(".disanfang .qq_icon").css("background-image","url(./images/qq-icon.png)");
            return ;
    }
}
//取消绑定微信
// $(".disanfang .wx a[href='javascript:;']").click(function (e) { 

    
// });
$("body").on("click", ".disanfang .wx a[href='javascript:;']", function (e) {
    e.preventDefault();
    layer.alert('取消绑定微信吗？', function(index){
        ajaxUnbindThirdPart("weixin");
        layer.close(index);
      }); 
});
//取消绑定新浪
// $(".disanfang .wb a[href='javascript:;']").click(function (e) { 

// });
$("body").on("click", ".disanfang .wb a[href='javascript:;']", function (e) {
    e.preventDefault();
    layer.alert('取消绑定新浪吗？', function(index){
        ajaxUnbindThirdPart("sina");
        layer.close(index);
      }); 
});
//取消绑定QQ
// $(".disanfang .qq a[href='javascript:;']").click(function (e) { 

// });
$("body").on("click", ".disanfang .qq a[href='javascript:;']", function (e) {
    e.preventDefault();
    layer.alert('取消绑定QQ吗？', function(index){
        ajaxUnbindThirdPart("qq");
        layer.close(index);
      }); 
});

/**
 * ajax解除第三方绑定
 * 
 * @param {any} name 第三方名称 weixin、qq、sina
 */
function ajaxUnbindThirdPart(name){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'unbind_third_part_login',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            third_part_name: name
        },
        success: function (res) {
            if (res.success) {
                layer.msg(res.message,{time:1000},function(){
                    ajaxGetThirdPartBind(); //重新获取第三方登录绑定信息
                });
            } else {
                layer.msg(res.message,{time:1000});
            }
        }
    }); 
}

$("body").on("click", "#changePasswordConfirms", function (e) {
    e.preventDefault();
    var parent = $(this).parent();
    var old_password = parent.find(".old_password").val();
    var new_password = parent.find(".new_password").val();
    var confirm_password = parent.find(".confirm_password").val();

    if (!old_password) {
        layer.msg("原始密码不能为空",{time:1000});
        return ;
    }
    if (!new_password) {
        layer.msg("新密码不能为空",{time:1000});
        return ;
    }
    if (!(new_password === confirm_password)) {
        layer.msg("前后两次输入的新密码不一致",{time:1000});
        return ;
    }
    ajaxChangePassword(old_password, new_password, confirm_password);

});

/**
 * 修改密码
 * 
 * @author ZhengGuoQing
 * @param {any} old_password 
 * @param {any} new_password 
 * @param {any} confirm_password 
 */
function ajaxChangePassword(old_password, new_password, confirm_password){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'change_password',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            old_password: old_password,
            new_password: new_password,
            confirm_password: confirm_password
        },
        success: function (res) {
            if (res.success) {
                layer.msg(res.message,{time:1000},function(){
                    $("#changePasswordConfirms").parent().css("display","none");
                    $("#changePasswordConfirms").parent().find("input").val("");
                });
            } else {
                layer.msg(res.message,{time:1000});
            }
        }
    }); 
}

/**
 * 渲染通知设置
 * 
 * @author ZhengGuoQing
 * @param {any} data 
 * @param {any} id 
 */
function renderNoticeSetList(data,id){
    var parent = $(id);
    for (var key in data) {
        if (data.hasOwnProperty(key) && key != "show_my_home") {
            var element = false;
            if (data[key] == 1) {
                element= true;
            }
            var className = "." + key;
            if (key == "show_love_users" || key == "show_love_works") {
                parent.find(className).attr("checked", !element);
            } else {
                parent.find(className).attr("checked", element);
            }
        }
    }
}

/**
 * ajax获取通知设置列表
 * 
 * @author ZhengGuoQing
 */
function ajaxGetNoticeSetList(){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_notice_set_list',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id")
        },
        success: function (res) {
            if (res.success) {
                renderNoticeSetList(res.data, "#noticeSetList");
            }
        }
    }); 
}

/**
 * ajax获取隐私设置列表
 * 
 * @author ZhengGuoQing
 */
function ajaxGetPrivacySetList(){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_privacy_set_list',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id")
        },
        success: function (res) {
            if (res.success) {
                renderNoticeSetList(res.data, "#privacySetList");
            }
        }
    }); 
}

/**
 * 点击通知设置列表的input
 */
$("body").on("click", "#noticeSetList input", function (e) {
    var className = $(this).prop("class");
    var isChecked = $(this).prop("checked");
    ajaxSetNoticeSetList(className, isChecked);
});

/**
 * 点击隐私设置列表的input
 */
$("body").on("click", "#privacySetList input", function (e) {
    var className = $(this).prop("class");
    var isChecked = $(this).prop("checked");
    if (className != "show_my_home") {
        ajaxSetPrivacySetList(className, isChecked);
    } else {
        //修改是否显示我的主页
        ajaxChangeUserInfo(isChecked);
    }
});

/**
 * ajax设置通知设置的某一项
 * 
 * @author ZhengGuoQing
 * @param {any} notice_type 
 * @param {any} is_set 
 */
function ajaxSetNoticeSetList(notice_type, is_set){
    var is_set = is_set ? 1 : 0;
    if (window.ajaxSetNoticeSet != null) {
        window.ajaxSetNoticeSet.abort();
    }
    window.ajaxSetNoticeSet = $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'change_notice_set',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            notice_type: notice_type,
            is_set: is_set
        },
        success: function (res) {
            if (!res.success) {
                //报错提示
                layer.msg(res.message,{time:1000});
            }
        }
    });
}

/**
 * ajax设置隐私设置的某一项，不包括关闭个人主页
 * 
 * @author ZhengGuoQing
 * @param {any} notice_type 
 * @param {any} is_set 
 */
function ajaxSetPrivacySetList(notice_type, is_set){
    var is_set = is_set ? 0 : 1;
    if (window.ajaxSetPrivacySet != null) {
        window.ajaxSetPrivacySet.abort();
    }
    window.ajaxSetPrivacySet = $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'change_privacy_set',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            privacy_type: notice_type,
            is_set: is_set
        },
        success: function (res) {
            if (!res.success) {
                //报错提示
                layer.msg(res.message,{time:1000});
            }
        }
    });
}

/**
 * 隐私设置，设置我的主页是否显示
 * 
 * @author ZhengGuoQing
 * @param {any} isChecked 改input输入框是否选中
 */
function ajaxChangeUserInfo(isChecked){
    var display = isChecked ? 3 : 1;
    if (window.ajaxSetPrivacyDisplay != null) {
        window.ajaxSetPrivacyDisplay.abort();
    }
    window.ajaxSetPrivacyDisplay = $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'change_user_info',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            display: display
        },
        success: function (res) {
            if (!res.success) {
                //报错提示
                layer.msg(res.message,{time:1000});
            }
        }
    });
}

/**
 * ajax获取个人基本信息，用来查看邮箱，手机，隐私设置关闭个人主页
 * 
 * @author ZhengGuoQing
 */
function ajaxGetUserBaseInfo(){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_user_base_info',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id")
        },
        success: function (res) {
            if (res.success) {
                renderEmailPhone(res.data);
            }
        }
    });
}

/**
 * 判断邮箱和手机是否已绑定，并渲染相应的DOM，同时渲染关闭个人主页input
 * 
 * @author ZhengGuoQing
 * @param {any} data 
 */
function renderEmailPhone(data){
    var email = data.email;
    var mobile = data.mobile;
    var display = data.display;

    if (email) {
        $("#emailHTML").html(email);
        $("#emailBind2").html("修改");
    } else {
        $("#emailHTML").html("绑定后可使用该邮箱直接登录当前账户");
        $("#emailBind2").html("绑定");
    }

    if (mobile) {
        $("#phoneHTML").html(mobile);
        $("#phoneBind2").html("修改");
    } else {
        $("#phoneHTML").html("绑定后可使用该手机号直接登录当前账户");
        $("#phoneBind2").html("绑定");
    }

    if (display == 3) {
        $("#privacySetList .show_my_home").prop("checked",true);
    } else {
        $("#privacySetList .show_my_home").prop("checked",false);
    }
}

/*图片验证码*/
$(document).on("click","#codePersonal6",function () {
    codePlusNum6++;
    $(this).attr('src', 'images/loading.gif');
    setTimeout(function () {
        $("#codePersonal6").attr('src', baseLink + 'index.php/verifycode/index/' + codePlusNum6);
    },300);
});
//验证图形验证码
function picCheck(phone,ele) {
    $.ajax({
        url: "https://www.huakewang.com/verifycode/check",
        type: "POST",
        dataType: "JSON",
        data: {
            secode: $("#personal6").val().toUpperCase()
        },
        success: function(res) {
            if (res.success) {
                ajaxGetSMSCode(phone, ele);
            } else {
                layer.msg("请输入正确的图形验证码！",{time:1000});
                $('#codePersonal6').click();
            };
        }
    });
};