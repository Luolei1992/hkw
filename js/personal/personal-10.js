window.signUpList = {}; //缓存联系人列表的有关数字,模仿的报名列表
$(function(){
    ajaxInvoiceInfo();
    getuseraddress();
});

/**
 * 向后端获取基本数据
 * 
 * @author ZhengGuoQing
 * @returns 
 */
function ajaxInvoiceInfo(){
    var project_id = getLocationParam("id");
    if(!project_id){return;}
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"get_invoice_info",
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            project_id: project_id
        },
        success: function (res) {
            if (res.success) {
                renderInvoiceInfo(res.data);  
            }
        }
    });
}

/**
 * 渲染发票基本数据，这些数据都可以修改
 * 
 * @author ZhengGuoQing
 * @param {Object} data 数据
 */
function renderInvoiceInfo(data){
    if (data.type) {
        $(".fpsqT .invoice-type").eq(parseInt(data.type)).attr("checked",true);
    }
    if (data.title) {
        $(".fpsqM .invoice-title").val(data.title);
    }
    if (data.id_code) {
        $(".fpsqM .invoice-id_code").val(data.id_code);
    }
    if (data.total_amount) {
        $(".fpsqM .price").html(data.total_amount);
    }
}


$("body").on("click", "#sublimeInvoice",  function () {
    ajaxSendInvoiceInfo();
});

/**
 * 获取页面输入的内容并返回
 * 
 * @author ZhengGuoQing
 * @returns 返回页面输入的内容对象
 */
function getInvoiceInfo() {
    var type = $(".fpsqT .invoice-type:checked").val();
    var title = $(".fpsqM .invoice-id_code").val();
    var id_code = $(".fpsqM .invoice-id_code").val();
    var reg_info = $(".cashOtherMsg .addrPhone").val();
    var bank_account = $(".cashOtherMsg .bank").val();
    var remark = $(".cashOtherMsg .remark").val();
    var rcv_name = $(".fpsqB .rcv_name").val();
    var rcv_phone = $(".fpsqB .rcv_phone").val();
    // 还缺地址没有传过去
    var rcv_address = $("#suggestId").val();
    if(rcv_address.length){
        saveuseraddress(rcv_address);
    };
    return {
        "user_id": getCookie("user_id"),
        "project_id": getLocationParam("id"),
        "type": type,
        "title": title,
        "id_code": id_code,
        "reg_info": reg_info,
        "bank_account": bank_account,
        "remark": remark,
        "rcv_name": rcv_name,
        "rcv_phone": rcv_phone,
        "rcv_address": rcv_address
    };
}

/**
 * ajax发送发票信息
 * 
 * @author ZhengGuoQing
 */
function ajaxSendInvoiceInfo(){
    var param = getInvoiceInfo();
    if (!param.project_id) { 
        alert("未找到项目ID!");
        return ; 
    }
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"invoice_for_project",
        type: "POST",
        dataType: "JSON",
        data: param,
        success: function (res) {
            if (res.success) {
                layer.msg(res.message,{time:1500},function(){
                    window.opener=null;
                    window.close();
                });
                
            } else {
                layer.msg(res.message);
            }
        }
    });
}

/**
 * 点击选择联系人
 */
$("body").on("click", "#getLinkPerson2", function () {
    event.preventDefault();
    window.signUpList.limit = 10;
    ajaxGetCustomers();
});

/**
 * 获取联系人列表
 * 
 * @author ZhengGuoQing
 * @param {any} offset 
 * @param {any} limit 
 */
function ajaxGetCustomers(offset, limit){
    var offset = offset || 0;
    var limit = limit || 10; 
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"getCustomers",
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            offset: offset,
            limit: limit
        },
        success: function (res) {
            if (res.success) {
                renderCustomers(res.data.item_list);
                var maxPage = Math.ceil(res.data.total_count/limit);
                window.signUpList.maxPage = maxPage;
                window.signUpList.nowPage = 1;
                if (maxPage < 2) {
                    //隐藏页数
                    $(".bottom-page").css('display', 'none');
                } else {
                    //显示页数
                    renderPageNumber();        	
                }        				
                layer.open({
                    type: 1,
                    title: '选择客户',
                    area: "760px",
                    content: $("#customersList")
                });
            }
        }
    });
}

/**
 * 渲染联系人列表
 * 
 * @author ZhengGuoQing
 * @param {any} data 
 */
function renderCustomers(data){
    var template1 = $("#templateCustomers").html();
    $("#viewCustomers").empty().append(doT.template(template1)(data));
}
/**
 * 当用户点击分页按钮时，ajax向后端获取下一页
 * @Author   郑国庆
 * @DateTime 2017-09-03T11:27:35+0800
 * @param    {[number]} offset [偏移值]
 * @param    {[number]} limit  [每页数量]
 */
function ajaxGetSignUpNumberNextPage(offset, limit){
	if (window.abortAjax) {
		window.abortAjax.abort();
	}
	window.abortAjax = $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"getCustomers",
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            offset: offset,
            limit: limit
        }
	})
	.done(function(res) {
		if (res.success) {
			var limit = window.signUpList.limit;
			var maxPage = Math.ceil(res.data.total_count/limit);
			window.signUpList.maxPage = maxPage;
			//显示数据
			renderCustomers(res.data.item_list);
			//显示页数
			renderPageNumber();			
		}
	})
	.fail(function(err) {
		console.log(err);
	});
}
//显示页数以及其他细节
function renderPageNumber(){
	$(".bottom-page .page-number .now").html(window.signUpList.nowPage);
	$(".bottom-page .page-number .max").html(window.signUpList.maxPage);

	var arrowLeft = $(".bottom-page .arrow-btn.arrow-left");
	var arrowRight = $(".bottom-page .arrow-btn.arrow-right");

	if (window.signUpList.nowPage == 1) {
		arrowLeft.css('color', '#ccc');
		arrowLeft.css('cursor', 'default');
	}else{
		arrowLeft.css('color', '#000');
		arrowLeft.css('cursor', 'pointer');
	}
	if (window.signUpList.nowPage == window.signUpList.maxPage) {
		arrowRight.css('color', '#ccc');
		arrowRight.css('cursor', 'default');
	}else{
		arrowRight.css('color', '#000');
		arrowRight.css('cursor', 'pointer');
	}	 	
}

/**
 * 上一页
 */
$(".bottom-page .arrow-btn.arrow-left").click(function(event) {
	if (window.signUpList.nowPage > 1) {
		window.signUpList.nowPage -= 1;
		var limit = window.signUpList.limit;	
		var offset = (window.signUpList.nowPage - 1)*limit;
		ajaxGetSignUpNumberNextPage(offset, limit);
		//显示页数
		renderPageNumber(); 		
	}
});

/**
 * 下一页
 */
$(".bottom-page .arrow-btn.arrow-right").click(function(event) {
	var nowPage = window.signUpList.nowPage;
    var maxPage = window.signUpList.maxPage;
    if (nowPage + 1 <= maxPage) {
    	window.signUpList.nowPage += 1;
		var limit = window.signUpList.limit;	
		var offset = (window.signUpList.nowPage - 1)*limit;
		ajaxGetSignUpNumberNextPage(offset, limit);
		//显示页数
		renderPageNumber();     	
    }	
});

/**
 * 点击选择客户弹窗的确认按钮
 */
$("body").on("click",".manage-invoice-new-add.confirm", function () {
    // var index = $("#viewCustomers .zero input:checked").attr("data-eq");
    // var rcv_name = $("#viewCustomers .one span").eq(index).html();
    // var rcv_phone = $("#viewCustomers .two span").eq(index).html();
    var checkedDOM = $("#viewCustomers .zero input:checked");
    var rcv_name = checkedDOM.parent().find("span").html();
    var rcv_phone = checkedDOM.parent().parent().find(".one span").html();
    $("#rcv_name").val(rcv_name);
    $("#rcv_phone").val(rcv_phone);
    layer.close(layer.index);
});