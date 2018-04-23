
$(".neirong .neirong-top .tab").click(function (e) { 
    e.preventDefault();
    $(".neirong .neirong-top .tab").removeClass("cur");
    $(this).addClass("cur");
    var index = $(this).parent().index();
    // console.log(index);
    $(".neirong .Wrap").css("display","none");
    $(".neirong .Wrap").eq(index).css("display","block");
    if (index == 0) {
        // $("#kkpager").css("display","block");
        $('.Wrap:eq(0)').css({ 'display': 'block' });
        $('.Wrap:eq(1)').css({ 'display': 'none' });
        getNoticeList();
    } else {
        // $("#kkpager").css("display","none");  
        $('.Wrap:eq(0)').css({ 'display': 'none' });
        $('.Wrap:eq(1)').css({ 'display': 'block' });  
        getSysNoticeList();
    }
});

$(".baocun").click(function() {
	sendUserInfoAjax(getUserInfo);
});

function sendUserInfoAjax(getUserInfo) {
    console.log(getUserInfo());
    $.ajax({
            url: CONFIG.getUrl()+CONFIG.getPath()+'change_user_info',
            type: 'POST',
            dataType: 'JSON',
			xhrFields: {
            withCredentials: true
        	},
        	crossDomain: true,            
            data: getUserInfo()
        })
        .done(function(res) {
            $(".baocun").html("已保存");
        })
        .fail(function(err) {
            alertUploadMsg(err.message);
        });
}
function getUserInfoAjax() {
    $.ajax({
            url: CONFIG.getUrl()+CONFIG.getPath()+'get_user_base_info',
            type: 'POST',
            dataType: 'JSON',
        	data: {
        		user_id: getCookie("user_id")
        	},
			xhrFields: {
            	withCredentials: true
        	},
        	crossDomain: true
        })
        .done(function(res) {
			if (res.success) {
            	renderUserInfo(res.data);
            };
        })
        .fail(function(err) {
            console.log(err);
        });
}
$(function(){
	getUserInfoAjax();
	getNoticeList();
	// getSysNoticeList();
	$(".bottm,.icon-closeB").click(function () {
        $(".Ojs-upload-avatar").css("display","none");
    })
});


function renderUserInfo(data){
	// console.log(data);
	var infoDOM = $(".formWrapInput");
	infoDOM[0].value = data.nick_name || "";
	infoDOM[1].value = data.username || "";
	infoDOM[2].value = data.company || "";
	infoDOM[3].value = data.qq || "";
    data.sex == "男" ? infoDOM[4].checked = true : infoDOM[5].checked = true;
    
	infoDOM[6].value = data.email || "";
	infoDOM[7].value = data.job_name || "";
	infoDOM[8].value = data.weixin || "";
	$("#Ojs-view img").attr('src', data.path);
}

function getUserInfo(){
	var infoDOM = $(".formWrapInput");
    return {
		user_id: getCookie("id"),
		nick_name: infoDOM[0].value,
		company: infoDOM[2].value,
		qq: infoDOM[3].value,
		sex: infoDOM[4].checked ? 1 : 2,
		job_name: infoDOM[7].value,
		weixin: infoDOM[8].value,
	};
}
$(".formWrap").keyup(function() {
    $(".baocun").html("保存");
    $(window).bind('beforeunload', function(e) {
        e = e || window.event;
        if (e) {
            e.returnValue = '请确定数据已经保存';
        }
        return '请确定数据已经保存';
    });
});

function getNoticeList(per_page, page){
	var per_page = per_page || 10;
	var page = page || 1;
    $.ajax({
            url: CONFIG.getUrl()+CONFIG.getPath()+'get_my_notice_list/'+per_page+'/'+page,
            type: 'POST',
            dataType: 'JSON',
        	data: {
        		user_id: getCookie('user_id'),
        	},
			xhrFields: {
            	withCredentials: true
        	},
        	crossDomain: true
        })
        .done(function(res) {
			if (res.success) {
                // console.log(res.data.item_list)
                if (res.data.item_list.length > 0 ) {
                    $(".neirong-top .wddt .num").html(" (" + res.data.item_list.length+")");
                    var template1 = $("#templatePersona1Notice").html();
                    $("#viewPersona1Notice").empty().append(doT.template(template1)(res.data.item_list));                   
                } else {
                    $("#viewPersona1Notice").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
                }
                proPagePaper(res.data.total_pages, page);
            }            
        })
        .fail(function(err) {
            console.log(err);
        });
}

function getSysNoticeList(per_page, page){
    var per_page = per_page || 10;
    var page = page || 1;
    $.ajax({
            url: CONFIG.getUrl()+CONFIG.getPath()+'get_my_sys_notice_list',
            type: 'POST',
            dataType: 'JSON',
        	data: {
        		user_id: 24
        	},
			xhrFields: {
            	withCredentials: true
        	},
        	crossDomain: true
        })
        .done(function(res) {
        	// console.log(res);
			if (res.success) {
                if (res.data.item_list.length > 0) {
                    $(".neirong-top .xttz .num").html(" (" + res.data.item_list.length + ")");
                    var template1 = $("#templatePersona1SysNotice").html();
                    $("#viewPersona1SysNotice").empty().append(doT.template(template1)(res.data.item_list));            	                    
                } else {
                    $("#viewPersona1SysNotice").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
                }
                proPagePaper(res.data.total_pages, page);
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}

function proPagePaper(totalPage, pageNo) {
    var pageNo = pageNo || 1;
    //生成分页
    // kkpager.generPageHtml({
    //     pno: pageNo,
    //     //总页码
    //     total: totalPage,
    //     //总数据条数
    //     mode: 'click', //默认值是link，可选link或者click
    //     click: function(n) {
    //     	// console.log(n);
    //         //手动选中按钮
    //         this.selectPage(n);
    //         getNoticeList(10, n);
    //         return false;
    //     }
    // });
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        mode: 'click', //默认值是link，可选link或者click
        click: function (n) {
            // console.log(n);
            //手动选中按钮
            this.selectPage(n);
            var tabIndex = $(".personal .neirong-top .tab.cur").index();
            if (tabIndex == 0) {
                getNoticeList(10, n);
            } else {
                getSysNoticeList(10, n);
            }
            return false;
        }
    }, true);
}

// 以下是修改手机号和修改邮箱的代码

/**
 * 点击修改手机号按钮
 */
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
			tokeen: $("#personal1Val").val().toUpperCase()
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
		if (req.success) {
			SMSCountdown($dom);
		}
        layer.msg(req.message,{time:1500});
	})
	.fail(function(err) {
		console.log(err);
	});
}

function SMSCountdown($dom){
	var second = 60;
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
                // console.log(res);
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
/*图片验证码*/
var codePlusNum1 = 10;
$(document).on("click","#personalImgCode",function () {
    codePlusNum1++;
    $(this).attr('src', 'images/loading.gif');
    setTimeout(function () {
        $("#personalImgCode").attr('src', baseLink + 'index.php/verifycode/index/' + codePlusNum1);
    },300);
});
//验证图形验证码
function picCheck(phone,ele) {
    $.ajax({
        url: "https://www.huakewang.com/verifycode/check",
        type: "POST",
        dataType: "JSON",
        data: {
            secode: $("#personal1Val").val().toUpperCase()
        },
        success: function(res) {
            console.log(res);
            if (res.success) {
                ajaxGetSMSCode(phone, ele);
            } else {
                layer.msg("请输入正确的图形验证码！",{time:1000});
                $('#personalImgCode').click();
            };
        }
    });
};