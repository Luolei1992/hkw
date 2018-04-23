$(function(){
    var countNum = 10;
	ajaxFinancialList();  //账户记录
    getYeNum();           //获取余额
    getStaticMoney();     //冻结资金
    authentication();     //获取认证状态
    getTrueMoneyList();   //获取待支付金额
	/*点击显示充值方式*/
	$(".trueNameValidateR .btn2").click(function () {
		$(".smrq").addClass("cur");
		$(".smrqwrap").css("display","block");
	});
	/**充值方式切换**/
	$('div.smrq ul li').click(function() {
		$('div.smrq ul li').removeClass('cur');
		$(this).toggleClass('cur');
		$(this).parents('div.smrq').find('div.sewm').css('display', 'none');
		var liIndex = $('div.smrq ul li').index($(this));
		$('div.sewm:eq(' + liIndex + ')').css({
			'display': 'block'
		});
	});
	/**充值方式切换**/
	/**点击.close关闭div.smrq**/
	$('div.smrq div.smrqTop span.close').click(function() {
		$(this).parents('div.smrq').removeClass('cur');
        $(this).parents('div.smrq').prev().css("display","none");
	});
	/**点击.close关闭div.smrq**/
    $(".smrqwrap").click(function () {
        $(this).css("display","none");
        $(".smrq").removeClass("cur");
    })
    //提现
    $("body").on("click",".trueNameValidateR .btn1",function () {
        $(".getTrueMoney").slideToggle(200);
        $(".getTrueMoneyWayPhone").val($(".bk img").attr("data-phone"));
    });
    //充值
    $(document).on("keyup",".payCashApplys",function () {
        //中断之前的ajax请求
        if(num != 0) {
            stopAjax.abort();
        };
        $(this).parent().find(".payZxMoney").html(($(this).val()-0).toFixed(2));
        $(this).parent().find(".payCashApplyImg").attr("src","images/zwwem.png");
        var num1 = $(this).val(),
            num2 = "",
            num3 = $(this).parent().find(".payZxMoney").html(),
            $this=$(this),
            modeltype = $(this).attr("data-modeltype");
        //键盘弹起生成二维码
        if(num1 > 0) {
            if(num1.indexOf(".") != -1 && num1.split(".")[1].length > 0){
                getPostErweima(num2,num3,'other',$this,modeltype);
            }else if(num1.indexOf(".") == -1){
                getPostErweima(num2,num3,'other',$this,modeltype);
            };
        }else if(num1 == ""){
            $this.parent().find(".payZxMoney").html("0.00");
            $this.parent().find(".payCashApplyImg").attr("src","images/zwwem.png");
        };
    });
    //短信验证码获取
    $("#trueNameCode").click(function () {
        var $val = $(".getTrueMoneyWayPhone").val();
        if(phoneValid($val)){
            picCheck($(this),$val);
        }else{
            $(".fkfsPub").addClass("borderRed");
        };
    });
    //确认提现
    $("#sureGetMoney").click(function () {
        var datas = {};
        if($(".getTrueMoneyWay1").val() == ""){
            alertUploadMsg("请输入支付宝账号");
            return false;
        }else if($(".getTrueMoneyWay2").val() == ""){
            alertUploadMsg("请输入支付宝账号姓名");
            return false;
        }else if($(".getTrueMoneyWay4").val() == ""){
            alertUploadMsg("请输入提现金额");
            return false;
        }else if($(".getTrueMoneyWayPhone").val() == ""){
            alertUploadMsg("请输入正确的手机号");
            return false;
        }else if($(".getTrueMoneyWay3").val() == ""){
            alertUploadMsg("请输入验证码");
            return false;
        };
        datas.user_id = getCookie("user_id");
        datas.phone = $(".getTrueMoneyWayPhone").val();
        datas.code = $(".getTrueMoneyWay3").val();
        datas.alipay_account = $(".getTrueMoneyWay1").val();
        datas.alipay_user_name = $(".getTrueMoneyWay2").val();
        datas.amount = $(".getTrueMoneyWay4").val();
        sureGetMoney(datas);
    });
    //验证图形验证码
    function picCheck(ele,$val) {
        $.ajax({
            url: "https://www.huakewang.com/verifycode/check",
            type: "POST",
            dataType: "JSON",
            data: {
                secode: $(".getTrueMoneyWay5").val().toUpperCase()
            },
            success: function(res) {
                if (res.success) {
                    hqdxyzm(ele,$val);
                } else {
                    alertUploadMsg("请输入正确的图形验证码！");
                    $('#wrapYZM').click();
                };
            }
        });
    };
    $(document).on("click","#truePicCode",function () {
        countNum++;
        $(this).attr('src', 'images/loading.gif');
        setTimeout(function () {
            $("#truePicCode").attr('src', baseLink + 'index.php/verifycode/index/' + countNum);
        },300);
    });
});

/**
 * 获取交易记录
 * @Author   郑国庆
 * @DateTime 2017-09-07T10:49:07+0800
 * @param    {[type]} per_page  [每页数量]
 * @param    {[type]} page [第几页]
 */
function ajaxFinancialList(per_page, page){
	var per_page = per_page || 10;
	var page = page || 1;
	var offset = per_page*(page - 1);	
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_financial_list', 
        type: "POST",
        dataType: 'JSON',
        data: {
        	user_id: getCookie("id"), 
        	offset: offset,
        	limit : per_page
        }
	})
	.done(function(req) {
		if (req.success) {
			var template1 = $("#templatePersonal4").html();
            $("#viewPersonal4").empty().append(doT.template(template1)(req.data.item_list));
            proPagePaper4(req.data.total_count, page);						
		}
	})
	.fail(function(err) {
		console.log(err);
	});	

};
/**
 * 充值记录
 * @param total_count
 * @param pageNo
 */
function proPagePaper4(total_count, pageNo) {
	var pageNo = pageNo || 1;
	var totalPage = Math.ceil(total_count/10);
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
            ajaxFinancialList(10, n);
            return false;
        }
    },true);
};
//获取余额
function getYeNum() {
    $.ajax({
        url:baseLink+'payapi/get_blance',
        type:"post",
        dataType:"json",
        data:{
            user_id:getCookie("user_id")
        },
        success:function (res) {
            if(res.success){
                $(".trueNameMoney").html((res.message-0).toFixed(2));
                $(".canGetMoney").html((res.message-0).toFixed(2));
            }else{
                alertUploadMsg(res.message);
                window.clearInterval(timers);
            };
        },error:function () {
            alertUploadMsg("余额获取失败！");
            window.clearInterval(timers);
        }
    })
};
/**
 * 充值二维码生成
 * @param id[空]
 * @param paymoney
 * @param mod [支付模块other]
 */
var timers,num = 0,staus = 0;
function getPostErweima(id,paymoney,mod,el,modeltype) {
    num++;
    var stopAjax = $.ajax({
        url:baseLink+'payapi/get_pay_qrcode',
        type:"post",
        data:{
            user_id:getCookie("user_id"),     //支付用户的id
            totalAmount:paymoney,         //费用总数
            pay_type:modeltype,           //AliPay：支付宝支付，WxPay：微信支付
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
            }else{
                alertUploadMsg(res.message);
                window.clearInterval(timers);
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
        url:baseLink+'payapi/get_pay_status',
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
                    $(".smrq").removeClass("cur");
                    $(".smrqwrap").css("display","none");
                    getYeNum();
                    window.clearInterval(timer);
                };
            }else{
                alertUploadMsg("支付失败！");
            };
        }
    });
}
/**
 * 获取冻结的金额
 */
function getStaticMoney() {
    $.ajax({
        url:baseLink+"payapi/get_frozen_cash",
        type:"post",
        data:{
            user_id:getCookie("user_id")
        },
        dataType:"json",
        success:function (res) {
            if(res.success){
                $(".frozen_cash").html((res.message).toFixed(2));
            }else{
                alertUploadMsg(res.message);
            };
        }
    });
};
/**
 * 点击获取二维码的按钮，提现
 * @param $ele
 * @param phone
 */
function hqdxyzm($ele,phone) {
    $.ajax({
        url: baseURL + 'get_reg_sms_code',
        type: 'post',
        data: {
            type: "withdraw",
            mobile: phone,
            tokeen: $(".getTrueMoneyWay5").val().toUpperCase()
        },
        dataType: 'json',
        success: function (res) {
            if (res.success) {
                SMSCountdown($ele);
            } else {
                alertUploadMsg(res.message);
            };
        },
        error: function () {
            alertUploadMsg("验证码获取失败！");
        }
    });
};
/**
 * 验证码倒计时
 * @param $dom
 * @constructor
 */
function SMSCountdown($dom) {
    var second = 60;
    function render() {
        var value = second + "秒后重试";
        $dom.html(value);
        second--;
        if (second == 0) {
            window.clearInterval(token);
            $dom.html("获取验证码");
        };
    };
    var token = window.setInterval(render, 1000);
};
function sureGetMoney(data) {
    $.ajax({
        url:baseLink+'payapi/applay_for_withdraw',
        type:"post",
        data:data,
        dataType:"json",
        success:function (res) {
            if(res.success){
                alertUploadMsg("申请成功");
            }else{
                alertUploadMsg(res.message);
            }
        }
    })
}

/**
 * 获取待提现余额
 */
function getTrueMoneyList() {
    $.ajax({
        url:baseLink+'payapi/get_withdraw_info',
        type:"post",
        data:{
            user_id:getCookie("user_id")
        },
        dataType:"json",
        success:function (res) {
            if(res.success){
                $(".trueNameMoneys").css("display","inline").find("i").html(res.data.amount);
            } else {
                $(".trueNameMoneys").css("display","none");
            }
        }
    })
}

/**
 * 获取认证状态
 */
function authentication() {
    $.ajax({
        url:baseURL+'get_real_name_auth',
        type:"post",
        data:{
            user_id:getCookie("user_id")
        },
        dataType:"json",
        success:function (res) {
            if(res.success){
                var flag = res.data.real_name_status;
                if(flag == 0 || flag == null){
                    $(".btn1").attr("disabled");
                    $(".trueNameValidate span").html("您还未实名认证，");
                    $(".trueNameValidate a").html("请认证>>");
                    return false;
                }else if(flag == 1){
                    $(".btn1").attr("disabled");
                    $(".trueNameValidate span").html("实名认证审核中，");
                    $(".trueNameValidate a").html("查看>>");
                    return false;
                }else if(flag == 2){
                    $(".btn1").removeAttr("disabled");
                    $(".btn1s").css("display","none");
                    $(".trueNameValidate span").html("已实名认证，");
                    $(".trueNameValidate a").html("查看>>");
                    return false;
                }else if(flag == 3){
                    $(".btn1").attr("disabled");
                    $(".trueNameValidate span").html("认证失败，"+res.data.real_name_auth_message);
                    $(".trueNameValidate a").html("修改>>");
                    return false;
                }else if(flag == 4){
                    $(".btn1").attr("disabled");
                    $(".trueNameValidate span").html("认证超时，");
                    $(".trueNameValidate a").html("重新认证>>");
                    return false;
                };
            };
        }
    });
};




/**
 * 验证手机号
 * @param $val
 * @returns {boolean}
 */
function phoneValid($val) {
    if($val != "" && /^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|16|17|18|19)\d{9}$/.test($val)){
        return true;
    }else{
        return false;
    };
};









