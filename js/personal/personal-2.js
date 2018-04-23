$(function(){
	ajaxOrderList();
	ajaxOrderDemandList(10, 1, "status");
});
var countNumPlus = 10;
/**
 * tab切换选择服务方还是需求方
 * @Author   郑国庆
 * @DateTime 2017-08-24T16:38:31+0800 */
$(".personal .neirong-top .tab >span").click(function(event) {
    $('.personal .neirong-top .tab').removeClass('cur');
    $(this).parent().toggleClass('cur');
    var tabIndex = $(".personal .neirong-top .tab.cur").index();
    if (tabIndex == 0) {
    	resetSelect();
    	$('.Wrap:eq(0)').css({'display':'block'});
    	$('.Wrap:eq(1)').css({'display':'none'});
    	// kkpager.selectPage(1); 
    	ajaxOrderList(10, 1);
    } else {
    	resetSelect();
    	$('.Wrap:eq(0)').css({'display':'none'});
    	$('.Wrap:eq(1)').css({'display':'block'});    	
    	// kkpager.selectPage(1);
    	ajaxOrderDemandList(10, 1);
    }

});

function ajaxOrderList(per_page, page, status){
	var status = status || "paging"; //判断此时是否需要加载分页，默认是添加分页，只有第一次页面初始化时不加载分页，此时只是为了获取数据条数.
	var per_page = per_page || 10;
	var page = page || 1;

	var personal2Param = getPersonal2Param();	
    $.ajax({
            url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_main_project_list',
            type: 'POST',
            dataType: 'JSON',
            data: {
            	user_id: getCookie("user_id"),
            	per_page: per_page,
            	page: page,
            	/*quote_status：2表示订单*/
            	quote_status: 2,
            	/*is_quoter：1表示报价方*/
				is_quoter: 1,
            	type: personal2Param.orderType || "",
            	stage_id: personal2Param.progress || "",
            	send_time: personal2Param.publishTime || "",
            	project_name: personal2Param.keyword || "" 
            }
        })
        .done(function(res) {
			if (res.success) {
				$(".neirong-top .wddt .num").html(" (" + (res.data.total_projects ? res.data.total_projects : 0) + ")");
				if (res.data.item_list.length > 0) {
					var template1 = $("#templatePersona2").html();
					$("#viewPersona2").empty().append(doT.template(template1)(res.data));	
				} else {
					$("#viewPersona2").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
				if (status == "paging") {
					proPagePaper2(res.data.total_pages, page);
				}
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}
function ajaxOrderDemandList(per_page, page, status){
	var status = status || "paging";
	var per_page = per_page || 10;
	var page = page || 1;

	var personal2Param = getPersonal2Param();	
    $.ajax({
            url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_main_project_list',
            type: 'POST',
            dataType: 'JSON',
            data: {
            	user_id: getCookie("user_id"),
            	per_page: per_page,
            	page: page,
            	/*quote_status：2表示订单*/
            	quote_status: 2,
            	/*is_quoter：0表示服务方*/
				is_quoter: 0,
            	type: personal2Param.orderType || "",
            	stage_id: personal2Param.progress || "",
            	send_time: personal2Param.publishTime || "",
            	project_name: personal2Param.keyword || "" 
            }
        })
        .done(function(res) {
			if (res.success) {
				$(".neirong-top .xttz .num").html(" (" + (res.data.total_projects ? res.data.total_projects : 0) + ")");
				if (res.data.item_list.length > 0) {
					var template1 = $("#templatePersona2Demand").html();
					$("#viewPersona2Demand").empty().append(doT.template(template1)(res.data));						
				} else {
					$("#viewPersona2Demand").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
				if (status == "paging") {
					proPagePaper2(res.data.total_pages, page);         	
				}
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}
function getPersonal2Param(){
	// var tabIndex = $(".personal .neirong-top .tab.cur").index();
	var orderTypeValue = $('#orderType option:selected').val();
	var progressValue = $('#progress option:selected').val();
	var publishTimeValue = $('#publishTime option:selected').val();
	var keyword = $(".neirong-b input").val();
	return {
		orderType: orderTypeValue,
		progress: progressValue,
		publishTime: publishTimeValue,
		keyword: keyword
	}
}

$("#orderType").change(function(event) {
	// alert($(this).children('option:selected').val());
	minix();
});

$("#progress").change(function(event) {
	// alert($(this).children('option:selected').val());
	minix();
});

$("#publishTime").change(function(event) {
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

function proPagePaper2(totalPage, pageNo) {
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

/**
 * 提醒验收，一天只能验收三次
 * @Author   郑国庆
 * @DateTime 2017-08-25T15:19:31+0800
 */
$("body").on('click', '.moreWarringT', function(event) {
	event.preventDefault();
	var $this = $(this);
	var order_id = $(this).attr("data-orderId");
	var $sibling = $(this).parent().next();
	if ($this.html() == "提醒验收") {
		ajaxWarnOrder(order_id,$this,$sibling);
	}
});

function ajaxWarnOrder(order_id,$this,$sibling) {
    $.ajax({
        url: CONFIG.getUrl() + CONFIG.getQuotePath() + 'project_pay_ask',
        type: "POST",
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
            project_id: order_id
        }
    }).done(function (req) {
        if (req.success) {
            $sibling.css({
                "display": "block"
            });
            setTimeout(function () {
                $sibling.css({
                    "display": "none"
                });
            }, 1600);
        } else {
            layer.msg(req.message, {time: 1500});
        }
    }).fail(function (err) {
        console.log(err);
    });
    $.ajax({
        url: CONFIG.getUrl() + CONFIG.getQuotePath() + 'project_pay_remind',
        type: "POST",
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
            project_id: order_id
        }
    }).done(function (req) {
        // console.log(req);
        //环信
    }).fail(function (err) {
        // console.log(err);
    });
}

/**
 * 提交对某个订单的评价
 * @Author   郑国庆
 * @DateTime 2017-08-26T13:31:16+0800
 * @param    {[type]} orderId [订单id]
 * @param    {[type]} rating  [星级评分]
 * @param    {[type]} text    [评论内容]
 */
function ajaxSendComment(orderId, rating, text){
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+'do_appraise', 
        type: "POST",
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id"),
        	project_id: orderId,
        	appraise_score: rating, 
        	appraise_txt : text 
        }
	})
	.done(function(req) {
		if (req.success) {
			layer.msg(req.message, {time: 1500});			
		}
	})
	.fail(function(err) {
		console.log(err);
	});
}

$("body").on('click', '.demand .onSMSCode', function(event) {
	event.preventDefault();
	var $dom = $(this);
	var phone = $dom.attr('data-phone');
	if (testPhone(phone, $dom) && $dom.html() == "获取验证码" ) {
        picCheck(phone, $dom);
	}
});

function testSMSCode(val, $dom){
	if (!(/^\d{4}$/.test(val))) {
		layer.tips("请输入4位数字短信验证码！", $dom, {skin: 'diyTips',time: 1600 });
		return false;
	} else {
		return true;
	}
}

/**
 * 获取手机号，向后端发送获取短信验证码的请求
 * @Author   郑国庆
 * @DateTime 2017-08-28T10:00:49+0800
 * @param    {[number]} phone [手机号]
 * @param    {[jquery object]} $dom [点击元素]
 */
function ajaxGetSMSCode(phone, $dom) {
    //确认验收  project_pay_confirm
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_reg_sms_code', //真实接口
        type: 'POST',
        dataType: 'JSON',
        data: {
        	type: "project_pay_confirm",
		    mobile: phone,
			tokeen: $("#PersonalVal2").val().toUpperCase()
        }
	})
	.done(function(req) {
		if (req.success) {
			SMSCountdown($dom);
		}
		layer.tips(req.message, $dom, {skin: 'diyTips',time: 1600 });
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

function testPhone(val,$dom){
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
    	layer.tips("手机号错误！", $dom, {skin: 'diyTips',time: 1600 });
    	return false;        
    } else {
    	return true; 
    }
}

$("body").on('click', '.moreValidateSure.demand', function(event) {
	event.preventDefault();
	var order_id = $(this).attr('data-orderId');
	var phone = $(this).parent().find('a.onSMSCode');
	var SMSCode = $(this).parent().find('input.ma.ma');
	if (testPhone(phone.attr('data-phone'), phone) && testSMSCode(SMSCode.val(), SMSCode)) {
		ajaxConfirmOrder(order_id, phone.attr('data-phone'), SMSCode.val());
		$(this).parent().css("display","none")
	}
});

/**
 * 收到验证码后向后端发送确认验收的通知
 * @Author   郑国庆
 * @DateTime 2017-08-28T12:25:06+0800
 */
function ajaxConfirmOrder(order_id, phone, SMSCode){
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+'project_pay_confirm', //同意验收
        type: 'POST',
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id"),
        	project_id: order_id,
        	code: SMSCode, 
        	rsponse  : ""   		
        }
	})
	.done(function(req) {
		if (req.success) {
			layer.msg(req.message, {time: 1500},function(){
				location.reload();
			});
		} else {
			layer.msg(req.message, {time: 1500});			
		}
	})
	.fail(function(err) {
		console.log(err);
	});
}

/**
 * 重置select下拉框
 * @Author   郑国庆
 * @DateTime 2017-09-06T21:02:21+0800
 * @return   {[type]}                 [description]
 */
function resetSelect(){
	$('#orderType option').attr('selected', false);
	$('#orderType option').eq(0).attr('selected', true);

	$('#progress option').attr('selected', false);
	$('#progress option').eq(0).attr('selected', true);

	$('#publishTime option').attr('selected', false);
	$('#publishTime option').eq(0).attr('selected', true);

	$(".neirong-b input").val("");	
}
/*图片验证码*/
$(document).on("click","#codePersonal2",function () {
    countNumPlus++;
    $(this).attr('src', 'images/loading.gif');
    setTimeout(function () {
        $("#codePersonal2").attr('src', baseLink + 'index.php/verifycode/index/' + countNumPlus);
    },300);
});
//验证图形验证码
function picCheck(phone,ele) {
    $.ajax({
        url: "https://www.huakewang.com/verifycode/check",
        type: "POST",
        dataType: "JSON",
        data: {
            secode: $("#PersonalVal2").val().toUpperCase()
        },
        success: function(res) {
            if (res.success) {
                ajaxGetSMSCode(phone, ele);
            } else {
                alertUploadMsg("请输入正确的图形验证码！");
                $('#wrapYZMs').click();
            };
        }
    });
};