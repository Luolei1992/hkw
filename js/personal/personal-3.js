$(function(){
    ajaxOrderList();
    getuseraddress();
});

/**
 * tab切换选择服务方还是需求方
 * @Author   郑国庆
 * @DateTime 2017-08-24T16:38:31+0800 */
$(".personal .neirong-top .tab >span").click(function(event) {
    $('.personal .neirong-top .tab').removeClass('cur');
    $(this).parent().toggleClass('cur');
    var tabIndex = $(".personal .neirong-top .tab.cur").index();
    if (tabIndex == 0) {
    	$('.Wrap:eq(0)').css({'display':'block'});
    	$('.Wrap:eq(1)').css({'display':'none'});
    	$('.forCash').css({'display':'block'});
    	$('.sele1.selePub.demand').css('display', 'none');
    	// kkpager.selectPage(1); 
    	ajaxOrderList(10, 1);
    } else {
    	$('.Wrap:eq(0)').css({'display':'none'});
    	$('.Wrap:eq(1)').css({'display':'block'});    	
    	$('.forCash').css({'display':'none'});
    	$('.sele1.selePub.demand').css('display', 'block');    	
    	// kkpager.selectPage(1);
    	ajaxOrderDemandList(10, 1);
    }
});

function ajaxOrderList(per_page, page){

	var per_page = per_page || 10;
    var page = page || 1;
    var offset = (page - 1)*per_page;
	var filter = $(".sele1.selePub.serve select option:selected").val();
	// var personal3Param = getPersonal3Param();	
    $.ajax({
            // url: CONFIG.getMockUrl()+CONFIG.getPath()+'personal_3',
            // type: 'POST',
            // dataType: 'JSON',
        	// data: {
        	// 	user_id: getCookie("id"),
        	// 	per_page: per_page,
        	// 	page: page,
        	// 	filter: filter		
            // }
            url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_project_invoice_list',
            type: 'POST',
            dataType: 'JSON',
            data: {
                user_id: getCookie("id"),
                limit: per_page,
                offset: offset,
                is_quoter: 1, //是否服务方，1是服务方，其他需求方
                invoice_status: filter // 发票状态，0未操作，1申请发票，2已开具发票
            }
        })
        .done(function(res) {
			if (res.success) {
                // console.log(res.data);
                if (res.data.item_list.length > 0) {
                    var template1 = $("#templatePersona3").html();
                    $("#viewPersona3").empty().append(doT.template(template1)(res.data));
                } else {
                    $("#viewPersona3").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
                }
                proPagePaper3(res.data.total_pages, page); 
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}
function ajaxOrderDemandList(per_page, page){

	var per_page = per_page || 10;
    var page = page || 1;
    var offset = (page - 1)*per_page;
	var filter = $(".sele1.selePub.demand select option:selected").val();
	// var personal3Param = getPersonal3Param();	
    $.ajax({
            // url: CONFIG.getMockUrl()+CONFIG.getPath()+'personal_3',
            // type: 'POST',
            // dataType: 'JSON',
        	// data: {
        	// 	user_id: getCookie("id"),
        	// 	per_page: per_page,
        	// 	page: page,
        	// 	filter: filter		
            // }
            url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_project_invoice_list',
            type: 'POST',
            dataType: 'JSON',
            data: {
                user_id: getCookie("id"),
                limit: per_page,
                offset: offset,
                is_quoter: 2, //是否服务方，1是服务方，其他需求方
                invoice_status: filter // 发票状态，0未操作，1申请发票，2已开具发票
            }
        })
        .done(function(res) {
			if (res.success) {
                // console.log(res.data);
                if (res.data.item_list.length > 0) {
                    var template1 = $("#templatePersona3Demand").html();
                    $("#viewPersona3Demand").empty().append(doT.template(template1)(res.data));
                } else {
                    $("#viewPersona3Demand").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');                    
                }
                proPagePaper3(res.data.total_pages, page);
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}

function checkboxMini(){
	var num = 0;
    var tax = 0;
    $(".divWrapCheckbox").each(function () {
        if($(this).hasClass("selectedColor")){
            num ++;
            tax += parseFloat($(this).attr("data-price")); 
        }
    });
    if(num == $(".divWrapCheckbox").length){
        $(".allCheck").addClass("selectedColor");
    }else{
        $(".allCheck").removeClass("selectedColor");
    }
    if (num > 0) {
        $(".forCash .forCashT .selected .number").html(num);
        $(".forCash .forCashT .selected .money").html(tax.toFixed(2));
        $(".forCash .forCashT .selected").css('display', 'inline');
    }else{
        $(".forCash .forCashT .selected").css('display', 'none');
    }	
}

function proPagePaper3(totalPage, pageNo) {
	var pageNo = pageNo || 1;
    //生成分页
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
        	// console.log(n);
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

$(".sele1.selePub.serve select").change(function(event) {
	// alert($(this).children('option:selected').val());
	ajaxOrderList();
});

$(".sele1.selePub.demand select").change(function(event) {
	// alert($(this).children('option:selected').val());
	ajaxOrderDemandList();
});

/**
 * 点击管理发票按钮
 */
$("body").on("click" ,"#manageInvoiceClick", function () {
    event.preventDefault();
    ajaxManageInvoice(true);
});

/**
 * 用ajax向后端获取发票基本信息列表
 * 
 * @author ZhengGuoQing
 * @param {Boolean} type 有两种显示发票抬头的方式，一种是修改信息，一种是选择发票抬头，一种是编辑发票抬头，true为新增修改信息
 * @param {Number} limit 每页数量
 * @param {Number} offset 偏移量
 */
function ajaxManageInvoice(type, limit, offset){
    var limit = limit || 10;
    var offset = offset || 0;
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"get_invoice_base_list",
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            limit: limit,
            offset: offset
        },
        success: function (res) {
            // console.log(res);
            if(res.success){
                var areaWidth = renderManageInvoice(res.data, type);
                layer.open({
                    type: 1,
                    title: "",
                    area: areaWidth,
                    content: $("#ManageInvoice")
                });
            }
        }
    });
}

/**
 * 渲染发票基本信息列表
 * 
 * @author ZhengGuoQing
 * @param {Object} data 数据对象
 * * @param {Boolean} type 有两种显示发票抬头的方式，一种是修改信息，一种是选择发票抬头，一种是编辑发票抬头，true为新增修改信息
 */
function renderManageInvoice(data, type){
    var template1 = $("#templateManageInvoice").html();
    $("#viewManageInvoice").empty().append(doT.template(template1)(data));

    if(type){
        //此时为新增，编辑发票抬头
        $("#ManageInvoice .zero").addClass("display-none");
        $("#ManageInvoice .three").removeClass("display-none");

        $(".manage-invoice-new-add.confirm").css("display","none");
        $(".manage-invoice-new-add.add").css("display","block");
    } else {
        $("#ManageInvoice .zero").removeClass("display-none");
        $("#ManageInvoice .three").addClass("display-none");

        $(".manage-invoice-new-add.confirm").css("display","block");
        $(".manage-invoice-new-add.add").css("display","none");
    }
    return type ? "450px" : "400px";
}

/**
 * 新增发票管理信息
 * 
 * @author ZhengGuoQing
 */
$("body").on("click", ".manage-invoice-new-add.add", function () {
    $("#viewManageInvoice").append(
        '<ul>'+
        '<li class="zero">'+
        '<input type="radio" name="select" style="margin-top: 12px;">'+
        '</li>'+
        '<li class="one">'+
        '<input type="text" name="company" class="input-border">'+
        '</li>'+
        '<li class="two">'+
        '<input type="text" name="taxNumber" class="input-border">'+
        '</li>'+
        '<li class="three">'+
        '<a href="javascript:void(0);" class="save">保存</a>'+
        '<a data-id="{{=val.id}}" href="javascript:void(0);" style="display: none;">删除</a>'+
        '</li>'+
        '</ul>'
    );
});

$("body").on("click", "#viewManageInvoice .three a", function () {
    var $then = $(this);
    var html = $then.html();
    var id = $then.attr('data-id');
    switch (html) {
        case '删除':
            layer.alert("是否删除该发票信息？", {
                btn: ['确定', '取消']
            },function(index, layero){
                ajaxDelInvoiceAddr(id,$then);
                layer.close(index);
            });
            break;
        case '保存':
            var isSave =  saveInvoiceAddr(id, $then);
            if(isSave){
                $then.parent().parent().find("input").css("border", "0 none").attr("disabled", "true");
                $then.html("修改 / ").siblings().css("display", "inline-block");
            }
            break;
        case '修改 / ':
            $then.parent().parent().find("input").removeAttr("disabled").css("border", "1px solid #ccc");
            $then.html("保存").siblings().css("display", "none");
            break;
    }
});

/**
 * 删除某个发票信息
 * 
 * @author ZhengGuoQing
 * @param {Number} id
 *  * @param {Object} $then 
 */
function ajaxDelInvoiceAddr(id,$then){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"delete_invoice_base_info",
        type: 'POST',
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
            invoice_base_id: id
        }
    })
    .done(function(res) {
        if (res.success) {
            layer.msg("删除成功",{time:1000},function(){
                $then.parent().parent().css("display", "none");
            });
        }
    })
    .fail(function(err) {
        console.log(err);
    });
}

/**
 * 新增或者保存发票信息
 * 
 * @author ZhengGuoQing
 * @param {any} invoice_id 
 * @param {any} $then 
 */
function saveInvoiceAddr(invoice_id, $then){
    var invoice_id = invoice_id || "";
    var title = $then.parent().parent().find("input[name='company']").val();
    var tax_no = $then.parent().parent().find("input[name='taxNumber']").val();
    // console.log(title);
    if(!title){
        layer.msg("发票抬头不能为空",{time:1000});
        return false;
    }
    if(!tax_no){
        layer.msg("企业税号不能为空",{time:1000});
        return false;
    }
    var listValue = {
        "user_id": getCookie("user_id"),
        "invoice_base_id": invoice_id,
        "title": title,
        "tax_no": tax_no
    };
    ajaxSaveInvoiceAddr(invoice_id, listValue);
    return true;
}

/**
 * 发送ajax,新增或者保存发票信息
 * 
 * @author ZhengGuoQing
 * @param {any} id 
 * @param {any} param 
 */
function ajaxSaveInvoiceAddr(id, param){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"save_invoice_base",
        type: "POST",
        dataType: "JSON",
        data: param,
        success: function (res) {
            if (res.success) {
                layer.msg("保存成功",{time:1000});
            }
        }
    });
}

/**
 * 点击发票抬头弹窗的确认按钮
 */
$("body").on("click",".manage-invoice-new-add.confirm", function () {
    var index = $("#viewManageInvoice .zero input:checked").parent().parent().index();
    var title = $("#viewManageInvoice .one input").eq(index).val();
    var tax_no = $("#viewManageInvoice .two input").eq(index).val();
    $("#inputInvoice .title").val(title);
    $("#inputInvoice .tax_no").val(tax_no);
    layer.close(layer.index);
});

/**
 * 点击选择发票信息按钮，弹出发票信息
 */
$("body").on("click","#inputInvoice .select-invoice", function () {
    ajaxManageInvoice(false);
});

/**
 * 点击索要发票按钮
 */
$("body").on("click" ,".request-invoice", function () {
    event.preventDefault();
    // ajaxManageInvoice(false);
    var project_id = $(this).attr("data-projectId");
    alertInputInvoice(project_id);
});

/**
 * 点击索要发票按钮的弹出框
 * 
 * @param {Number} project_id 申请开发票的项目id
 */
function alertInputInvoice(project_id ){
    $("#inputInvoice .seeApub.ok-invoice").attr("data-projectId", project_id);
    window.alertInputInvoiceIndex = layer.open({
        type: 1,
        title: "",
        area: "500px",
        zIndex: 2,
        content: $("#inputInvoice")
    });
}

$("body").on("click" ,".seeApub.ok-invoice", function () {
    event.preventDefault();
    var project_id = $(this).attr("data-projectId");
    var type = $("#inputInvoice .type input:checked").val();
    var title = $("#inputInvoice .title input").val();
    var id_code = $("#inputInvoice .id-code input").val();
    var rcv_address = $("#suggestId").val();
    if(rcv_address.length) {
        saveuseraddress(rcv_address);
    };
    if(!title){
        layer.msg("发票抬头不能为空",{time:1000});
        return false;
    }
    if(!id_code){
        layer.msg("企业税号不能为空",{time:1000});
        return false;
    }
    var listValue = {
        "user_id": getCookie("user_id"),
        "project_id": project_id,
        "type": type,
        "title": title,
        "id_code": id_code,
        "rcv_address": rcv_address
    };
    ajaxRequestInvoice(listValue);
});

/**
 * 发送ajax，索要发票
 * 
 * @param {Object} data ajax参数
 */
function ajaxRequestInvoice(data){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"apply_for_invoice",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (res) {
            if(res.success){
                layer.msg("索要发票成功",{time:1000},function(){
                    layer.close(window.alertInputInvoiceIndex);
                });
            }
        }
    });
}