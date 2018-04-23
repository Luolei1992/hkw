$(function(){
	ajaxOrderList();
	ajaxOrderDemandList(10, 1, "status");
});

/**
 * tab切换选择服务方还是需求方
 * @Author   郑国庆
 * @DateTime 2017-08-14T11:05:42+0800
 */
$(".personal .neirong-top .tab >span").click(function(event) {
    $('.personal .neirong-top .tab').removeClass('cur');
    $(this).parent().toggleClass('cur');
    var tabIndex = $(".personal .neirong-top .tab.cur").index();
    if (tabIndex == 0) {
    	$('.Wrap:eq(0)').css({'display':'block'});
    	$('.Wrap:eq(1)').css({'display':'none'});
    	// kkpager.selectPage(1); 
    	ajaxOrderList(10, 1);
    } else {
    	$('.Wrap:eq(0)').css({'display':'none'});
    	$('.Wrap:eq(1)').css({'display':'block'});    	
    	// kkpager.selectPage(1);
    	ajaxOrderDemandList(10, 1);
    }

});

/**
 * 调用接口，根据type获取不同报价阶段的报价，不传type。返回所有报价
 * 
 * @author ZhengGuoQing
 * @param {Number} per_page  每页数量
 * @param {Number} page 第几页
 */
function ajaxOrderList(per_page, page){
	var per_page = per_page || 10;
	var page = page || 1;

	var personal9Param = getPersonal9Param();
    $.ajax({
			url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_main_project_list',
            type: 'POST',
            dataType: 'JSON',
            data: {
            	user_id: getCookie("id"),
            	per_page: per_page,
            	page: page,
				is_quoter: 1,
				type: 1,
            	quote_status: personal9Param.projectStatus || "",
				send_time: personal9Param.sendTime || "",
				project_name: personal9Param.keyword || ""  
            }  
        })
        .done(function(res) {
            if (res.success) {
				$(".neirong-top .wddt .num").html(" (" + (res.data.total_projects ? res.data.total_projects : 0) + ")");
				if (res.data.item_list.length > 0) {
					var template1 = $("#templatePersona9").html();
					$("#viewPersona9").empty().append(doT.template(template1)(res.data.item_list));
				} else {
					$("#viewPersona9").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
				proPagePaper9(res.data.total_pages, page);
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}
function ajaxOrderDemandList(per_page, page){
	var status = status || "paging";
	var per_page = per_page || 10;
	var page = page || 1;

	var personal9Param = getPersonal9Param();
    $.ajax({
			url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_main_project_list',
            type: 'POST',
            dataType: 'JSON',
            data: {
				user_id: getCookie("user_id"),
            	per_page: per_page,
            	page: page,
				is_quoter: 0,
				type: 1,
            	quote_status: personal9Param.projectStatus || "",
				send_time: personal9Param.sendTime || "",
				project_name: personal9Param.keyword || ""  
            }
        })
        .done(function(res) {
            if (res.success) {
				$(".neirong-top .xttz .num").html(" (" + (res.data.total_projects ? res.data.total_projects : 0) + ")");
				if (res.data.item_list.length > 0) {
					//全局变量暂时保存数据
					window.orderDemandListData = res.data.item_list;
					// if (personal9Param.projectStatus == "1") {
					// 	window.orderDemandListData = res.data.item_list;
					// } else {
					// 	window.orderDemandListData = null;
					// }
					var template1 = $("#templatePersona9Demand").html();
					$("#viewPersona9Demand").empty().append(doT.template(template1)(res.data.item_list));	
				} else {
					$("#viewPersona9Demand").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
				if (status == "paging") {
					proPagePaper9(res.data.total_pages, page); 
				}        	
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}


function proPagePaper9(totalPage, pageNo) {
	var pageNo = pageNo || 1;
    //生成分页
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
            //手动选中按钮
            this.selectPage(n);
            var tabIndex = $(".personal .neirong-top .tab.cur").index();
            if (tabIndex == 0) {
            	ajaxOrderList(10, n);
            } else {
            	ajaxOrderDemandList(10, n);
            }
            return false;
        }
    },true);
}

function getPersonal9Param(){
	// var tabIndex = $(".personal .neirong-top .tab.cur").index();
	var projectStatusValue = $('#projectStatus option:selected').val();
	var sendTimeValue = $('#sendTimeDate option:selected').val();
	var keyword = $(".neirong-b input").val();
	return {
		projectStatus: projectStatusValue,
		sendTime: sendTimeValue,
		keyword: keyword
	}
}

$("#projectStatus").change(function(event) {
	// alert($(this).children('option:selected').val());
	minix();
});

$("#sendTimeDate").change(function(event) {
	// alert($(this).children('option:selected').val());
	minix();
});
$(".neirong-b i").click(function(event) {
	minix();
});

function minix(){
	kkpager.selectPage(1); 
	var tabIndex = $(".personal .neirong-top .tab.cur").index();
	if (tabIndex == 0) {
		ajaxOrderList();		
	} else {
    	ajaxOrderDemandList();		
	}
}

$("body").on('click', '.divWrap .seeBj.delete', function(event) {
	event.preventDefault();
	var caoGaoId = $(this).attr('data-caoGaoId');
	var then = this;
	layer.alert("是否删除该草稿？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		ajaxDeleteDraft(caoGaoId, then);
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
	
});

function ajaxDeleteDraft(id, then){
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getQuotePath() +'delete_main_project',
        type: 'POST',
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id"),
        	project_id: id      		
        }
	})
	.done(function(req) {
		if (req.success) {
			$(then).parent().parent().remove();	
		}
		layer.msg(req.message,{time:3000});
	})
	.fail(function(err) {
		console.log(err);
	});
	
}

$("body").on('click', '.btnWrapTwo .BtnC.cancel', function(event) {
	event.preventDefault();
	var project_id = $(this).attr('data-projectId');
	var then = this;
	layer.alert("是否取消该报价？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		ajaxCancelOrder(project_id, then);
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

function ajaxCancelOrder(id, then){
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getQuotePath() +'change_main_project_status',
        type: 'POST',
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id"),
			project_id: id,
			quote_status: 4,
			auth_user_id: getCookie("user_id")   		
        }
	})
	.done(function(req) {
		if (req.success) {
			$(then).parent().parent().remove(); //删除DOM
		}
		layer.msg(req.message,{time:3000});
	})
	.fail(function(err) {
		console.log(err);
	});	
}

function popupRefuse(dom, type){
	if (type) {
		dom.css('display', 'block');
		$("#mask-layer").css('display', 'block');
		
	} else {
		dom.css('display', 'none');
		$("#mask-layer").css('display', 'none');
	}
}

$("body").on('click', '.btnWrapTwo .Refuse.BtnC', function(event) {
	event.preventDefault();
	var popRefuse = $(this).parent().parent().find('.popRefuse.BtnCtc');
	popupRefuse(popRefuse, true);
});

$("body").on('click', '.popRefuse .BtnCtcC', function(event) {
	event.preventDefault();
	var popRefuse = $(this).parent();
	popupRefuse(popRefuse, false);
});

$("body").on('click', '.popRefuse .BtnCtcSD', function(event) {
	event.preventDefault();
	var project_id = $(this).parent().attr('data-projectId');
	var refuseValue = $(this).parent().find('select option:selected').val();
	var popRefuse = $(this).parent();
	var then = $(this);
	popupRefuse(popRefuse, false);
	ajaxRejectOrder(project_id,refuseValue, then); //拒绝报价
});

function ajaxRejectOrder(id, reason, then){
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getQuotePath() +'change_main_project_status',
        type: 'POST',
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id"),
			project_id: id,    
			quote_status: 3,
			auth_customer_id: getCookie("user_id"),		
			message: reason      		
        }
	})
	.done(function(req) {
		if (req.success) {
			then.parent().parent().remove();
		}
		layer.msg(req.message,{time:3000});
	})
	.fail(function(err) {
		console.log(err);
	});	
}

$("body").on('click', '.divWrap .xmDelate.demand', function(event) {
	event.preventDefault();
	var projectId = $(this).attr('data-projectId');
	var then = this;
	layer.alert("是否删除该报价？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		ajaxDeleteOrder(projectId, then);
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
	
});

function ajaxDeleteOrder(id, then){
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getQuotePath() + 'delete_main_project',
        type: 'POST',
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id"),
        	project_id: id      		
        }
	})
	.done(function(req) {
		if (req.success) {
			$(then).parent().remove();	
		}
		layer.msg(req.message,{time:3000});
	})
	.fail(function(err) {
		console.log(err);
	});
	
}

/**
 * 以下为支付功能
 */

 //update
//点击遮罩层，发送服务下单的ajax 点击微信支付遮罩层
$("body").on("click", "#click-pay-id2", function (e) {
	e.preventDefault();
	showClickPay("正在刷新中...");
	var payid = $(this).attr("data-payid");
	var paymoney = $(".ewm .RMB")[0].innerHTML;
	getErweima(payid, paymoney, "project", "WxPay");
});
//点击遮罩层，发送服务下单的ajax
$("body").on("click", "#click-pay-id", function (e) {
	e.preventDefault();
	showClickPay("正在刷新中...");
	var payid = $(this).attr("data-payid");
	var paymoney = $(".ewm .RMB")[0].innerHTML;
	getErweima(payid, paymoney, "project");
});
//不显示遮罩层，修改二维码url地址
function hidenClickPay(url){
	var url = url || "images/ewma1.png";
	$(".ewmLeft .click-pay").addClass("display-none");
	$(".ewmLeft .ewmimg").attr("src", url);
	$(".TzLink").removeClass("display-none");
}

//显示遮罩层，不让扫码,参数书文字，表示遮罩层上面显示的文字
function showClickPay(txt){
	var txt = txt || "点击刷新二维码";
	$(".ewmLeft .click-pay").removeClass("display-none");
	$(".ewmLeft .click-pay .click-pay-span").html(txt);
	$(".ewmLeft .ewmimg").attr("src", "images/ewma1.png"); //放假的二维码图片

	$(".TzLink").addClass("display-none");
}

$("body").on("click", "#pay-detailed textarea", function (e) {
	e.preventDefault();
	showClickPay();
});
//获取支付状态是定时器，支付宝，微信，有两个，用一个数组保存
window.PayStausTimer = [];
/**
 * 支付二维码生成，为订单付款
 * @param id[约见id]
 * @param paymoney
 * @param mod [支付模块meet]
 */
function getErweima(id, paymoney, mod, payType) {
	var payType = payType || "AliPay";
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_pay_qrcode',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: 69734,     //支付用户的id,getCookie("user_id")
			totalAmount: paymoney,                //费用总数
			pay_type: payType,                //AliPay：支付宝支付，WeiXinPay：微信支付
			pay_model: mod,                    //支付模块
			model_id: id                       //约见id
		},
		success: function (res) {
			if (res.success) {
				hidenClickPay(res.data.qr_path); //不显示遮罩层，修改二维码url地址
				changeWeb(res.data.out_trade_no); //点击跳转到网页版支付
				//定时查询支付状态
				var waitingTime = 0;
				var timer = setInterval(function () {
					waitingTime ++;
					getPayStaus(res.data.out_trade_no, timer);
					if (waitingTime > 90) {
						clearInterval(timer);
						showClickPay();
					}

				}, 3000);
				window.PayStausTimer.push(timer);
			} else {
				layer.alert(res.message);
				showClickPay("点击重新刷新");
			};
		}, error: function () {
			showClickPay("点击重新刷新");
			alert("数据获取异常！");
		}
	});
};

//点击跳转到网页版支付
function changeWeb(key) {
	$(document).on("click",".TzLink",function () {
		$.ajax({
			url: CONFIG.getUrl()+CONFIG.getPayPath()+'turn_to_pay_page/'+key,
			type:"get",
			dataType:"html",
			success:function (res) {
				$("#newWebHtml").html(res);
			},error:function () {
				alert("数据获取异常！");
			}
		});
	});
}

//获取约见的支付状态
function getPayStaus(key, timer) {
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_pay_status',
		type: "post",
		data: {
			user_id: 69734,
			out_trade_no: key
		},
		dataType: "json",
		success: function (res) {
			if (res.success) {
				if (res.data.trade_status == "TRADE_SUCCESS") {
					// 付款成功
					//清除定时器轮询订单状态
					window.PayStausTimer.map(function (value, index, elem) {
						clearInterval(value);
					});
					showClickPay();
					$("#mask-close").trigger("click"); //关闭弹窗
					paySuccessAlert();
				};
			} else {
				alert("支付失败！");
			};
		},
		error: function (params) {
			//清除定时器轮询订单状态
			window.PayStausTimer.map(function (value, index, elem) {
				clearInterval(value);
			});
		}
	});
};

function paySuccessAlert(){
	layer.open({
	  title: '支付成功',
	  icon: 1,
	  content: '您已成功支付报价单',
	  btn: ["刷新本页面","关闭"],
	  yes: function(index, layero){
		// var url = "Personal-2.html";
		// window.open(url, "_blank");
		layer.close(index);
		window.location.reload(); 
	  },
	  btn2: function(index, layero){
		layer.close(index);
	  }
	});      
}

//获取余额
function getYeNum() {
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_blance',
		type:"post",
		dataType:"json",
		data:{
			user_id:getCookie("user_id")
		},
		success:function (res) {
			if(res.success){
				$(".ewm .color .money").html((res.message-0).toFixed(2));
				if(res.message < $(".ewm .RMB")[0].innerHTML){
					$(".dqye2 .notMoreBalance").css("display","block");
					$(".dqye2 .qrzf").addClass("no");
				} else {
					$(".dqye2 .notMoreBalance").css("display","none");
					$(".dqye2 .qrzf").removeClass("no");
				}
			}else{
				layer.alert(res.message);
			};
		},error:function () {
			alert("余额获取失败！");
		}
	});
}

/**
 * 点击确认支付，弹出手机号验证弹窗
 */
$("body").on("click" ,".dqye2 .qrzf", function (event) {
	event.preventDefault();
	if ($(this).hasClass("no")) {
		return;
	}

	$(".smrq").removeClass("cur"); //隐藏充值弹窗

	var paymoney = $(".ewm .RMB")[0].innerHTML;
	$("#ok-change-phone").html("确认支付"+paymoney+"元");
    window.alertInputValidatePhone = layer.open({
        type: 1,
        title: "",
        area: "340px",
        content: $("#changePhonePouup")
    });
});

//点击获取短信验证码事件
$("body").on('click', '#SMS-code-txt', function(event) {
	event.preventDefault();
	var $dom = $(this);
	var phone = $("#new-phone-val").val();
	if (testPhone(phone) && $dom.html() == "获取验证码" ) {
		picCheck(phone, $dom);
	}
});

function testPhone(val){
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
        layer.msg("请输入正确手机号！",{time:2000});
    	return false;        
    } else {
    	return true; 
    }
}

function testSMSCode(val){
	if (!(/^\d{4}$/.test(val))) {
        layer.msg("请输入4位数字短信验证码！",{time:2000});
		return false;
	} else {
		return true;
	}
}

/**
 * 发送获取短信验证码的请求
 * @Author   郑国庆
 * @DateTime 2017-08-28T10:00:49+0800
 * @param    {[number]} phone [手机号]
 * @param    {[jquery object]} $dom [点击元素]
 */
function ajaxGetSMSCode(phone, $dom) {
    //余额支付
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_reg_sms_code', //真实接口
        type: 'POST',
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
        	type: "pay",
		    mobile: phone,
			tokeen: $("#new-pic-val").val().toUpperCase()
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
};

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
};

/**
 * 获取短信验证码后向后端发送确认余额支付
 */
$("body").on("click", "#ok-change-phone", function (event) {
	event.preventDefault();
	if ($(this).hasClass("paying")) {
		return;
	}
    var phone = $("#new-phone-val").val();
	var SMSCode = $("#SMS-code-val").val();
    if (testPhone(phone) && testSMSCode(SMSCode)) {
		$("#ok-change-phone").html("确认支付中...");
		$(this).addClass("paying");
		var payid = $("#click-pay-id").attr("data-payid");
		ajaxPayByBlance(payid, SMSCode); //获取订单ID后,ajax余额支付
		// ajaxBookService2(SMSCode);
	};
});

/**
 * ajax余额支付
 * 
 * @author ZhengGuoQing
 * @param {any} model_id 订单ID
 * @param {any} code 短信验证码
 */
function ajaxPayByBlance(model_id, code){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPayPath()+'pay_by_blance',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			pay_model: "project",
			model_id: model_id,
			code: code
		},
		success: function (res) {
            if (res.success) {
				layer.close(layer.index);
				$("#mask-close").trigger("click"); //关闭弹窗
				paySuccessAlert();
			} else {
				layer.msg(res.message,{time:2000});
			}
			$("#ok-change-phone").removeClass("paying");
			var paymoney = $(".ewm .RMB")[0].innerHTML;
			$("#ok-change-phone").html("确认支付"+paymoney+"元");
		}, 
		error: function () {
			layer.close(layer.index);
			alert("数据获取异常！");
		}
	});
}

/**
 * ajax发送服务下单
 * 
 * @author ZhengGuoQing
 * @param {any} code 短信验证码
 */
function ajaxBookService2(code){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'book_service',
		type: "POST",
		dataType: "JSON",
		data: paramBookService(),
		success: function (res) {
			if (res.success) {
				// var paymoney = $(".ewm .RMB")[0].innerHTML;
				ajaxPayByBlance(res.data, code); //获取订单ID后,ajax余额支付
			} else {
				$("#ok-change-phone").html("确认订单失败，请重试");
			}
		}, error: function () {
			alert("数据获取异常！");
		}
	});
}

/*点击显示充值方式*/
$("body").on("click", ".ewm .dqye2 .zhcz", function () {
	$(".smrq").addClass("cur");
});

/**充值方式切换**/
$("body").on("click", "div.smrq ul li", function () {
	$('div.smrq ul li').removeClass('cur');
	$(this).toggleClass('cur');
	$(this).parents('div.smrq').find('div.sewm').css('display', 'none');
	var liIndex = $('div.smrq ul li').index($(this));
	$('div.sewm:eq(' + liIndex + ')').css({
		'display': 'block'
	});
	window.PostStausTimer.map(function (value, index, elem) {
		clearInterval(value);
	});	
});

/**充值方式切换**/
/**点击.close关闭div.smrq**/
$("body").on("click", "div.smrq div.smrqTop span.close", function () {
	$(this).parents('div.smrq').removeClass('cur');
});
/**点击.close关闭div.smrq**/

//充值
$(document).on("keyup",".payCashApplys",function () {
    //中断之前的ajax请求
    if(num != 0) {
		stopAjax.abort();
		window.PostStausTimer.map(function (value, index, elem) {
			clearInterval(value);
		});
    };
    $(this).parent().find(".payZxMoney").html(($(this).val()-0).toFixed(2));
    $(this).parent().find(".payCashApplyImg").attr("src","images/zwwem.png");
    var num1 = $(this).val(),
        num2 = "",
        num3 = $(this).parent().find(".payZxMoney").html(),
        $this=$(this);
    //键盘弹起生成二维码
    if(num1 > 0) {
        if(num1.indexOf(".") != -1 && num1.split(".")[1].length > 0){
            getPostErweima(num2,num3,'other',$this);
        }else if(num1.indexOf(".") == -1){
            getPostErweima(num2,num3,'other',$this);
        };
    }else if(num1 == ""){
        $this.parent().find(".payZxMoney").html("0.00");
        $this.parent().find(".payCashApplyImg").attr("src","images/zwwem.png");
    };
});
window.PostStausTimer = [];
/**
 * 充值二维码生成
 * @param id[空]
 * @param paymoney
 * @param mod [支付模块other]
 */
var timers,num = 0;
function getPostErweima(id,paymoney,mod,el) {
	var pay_type = "AliPay";
	if (el.attr("data-type") == "WxPay") {
		pay_type = "WxPay";
	}
    num++;
    var stopAjax = $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_pay_qrcode',
        type:"post",
        data:{
            user_id:getCookie("user_id"),     //支付用户的id
            totalAmount:paymoney,         //费用总数
			pay_type: pay_type,            //AliPay：支付宝支付，WeiXinPay：微信支付
            pay_model:mod,                    //支付模块
            model_id:id                       //约见id
        },
        dataType:"json",
        success:function (res) {
            if(res.success){
                el.parent().find(".payCashApplyImg").attr("src",res.data.qr_path);
                //定时查询充值支付状态
                timers = setInterval(function () {
                    getPostStaus(res.data.out_trade_no,timers);
				},3000);
				window.PostStausTimer.push(timers);
            }else{
                alert(res.message);
            };
        }
    });
    window.stopAjax = stopAjax;
};

/**
 * 获取充值的支付状态
 * @param key
 * @param timer
 */
function getPostStaus(key,timer) {
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_pay_status',
        type:"post",
        data:{
            user_id:getCookie('user_id'),
            out_trade_no:key
        },
        dataType:"json",
        success:function (res) {
            if(res.success) {
                if(res.data.trade_status == "TRADE_SUCCESS") {
                    // 约见费用付款成功
                    $(".smrq").css("display", "none");
                    getYeNum();
					window.PostStausTimer.map(function (value, index, elem) {
						clearInterval(value);
					});
                };
            }else{
                alert("支付失败！");
            };
		},
		error: function () {
			window.PostStausTimer.map(function (value, index, elem) {
				clearInterval(value);
			});
		}
    });
}
/*图片验证码*/
var codePlusNum9 = 10;
$(document).on("click","#codePouup",function () {
    codePlusNum9++;
    $(this).attr('src', 'images/loading.gif');
    setTimeout(function () {
        $("#codePouup").attr('src', baseLink + 'index.php/verifycode/index/' + codePlusNum9);
    },300);
});
//验证图形验证码
function picCheck(phone,ele) {
    $.ajax({
        url: "https://www.huakewang.com/verifycode/check",
        type: "POST",
        dataType: "JSON",
        data: {
            secode: $("#new-pic-val").val().toUpperCase()
        },
        success: function(res) {
            if (res.success) {
                ajaxGetSMSCode(phone, ele);
            } else {
                layer.msg("请输入正确的图形验证码！",{time:1000});
                $('#codePouup').click();
            };
        }
    });
};
/*
 * 输入类型的限定
 * */
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    obj.value = obj.value.replace(/^\.*$/, '');//开头不能为"."

    if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
        obj.value = parseFloat(obj.value);
    };
};