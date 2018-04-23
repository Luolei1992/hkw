window.signUpList = {}; //缓存报名列表的数字
$(function(){
	ajaxPublishDemandList();
	ajaxSignUpDemandList(10, 1, "status");
	ajaxReceiveDemandList(10, 1, "status")
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
    // if (tabIndex == 0) {
    // 	$('.Wrap:eq(0)').css({'display':'block'});
	// 	$('.Wrap:eq(1)').css({'display':'none'});

	// 	$(".neirong-b.publish").css("display", "block");
	// 	$(".neirong-b.signUp").css("display", "none");

    // 	// kkpager.selectPage(1); 
    // 	ajaxPublishDemandList();
    // } else {
    // 	$('.Wrap:eq(0)').css({'display':'none'});
	// 	$('.Wrap:eq(1)').css({'display':'block'}); 
		
	// 	$(".neirong-b.publish").css("display", "none");
	// 	$(".neirong-b.signUp").css("display", "block");
		
    // 	// kkpager.selectPage(1);
    // 	ajaxSignUpDemandList();
	// }
	//增加收到的需求后更新
	$('.Wrap').css({ 'display': 'none' });
	$(".neirong-b").css("display", "none");

	switch (tabIndex) {
		case 0:
			$('.Wrap:eq(0)').css({ 'display': 'block' });
			$(".neirong-b.publish").css("display", "block");
			ajaxPublishDemandList();
			break;
		case 1:
			$('.Wrap:eq(1)').css({ 'display': 'block' });
			$(".neirong-b.signUp").css("display", "block");
			ajaxPublishDemandList();
			break;
		case 2:
			$('.Wrap:eq(2)').css({ 'display': 'block' });
			$(".neirong-b.receive").css("display", "block");
			ajaxReceiveDemandList();
			break;
	}
});

//发布的需求
function ajaxPublishDemandList(per_page, page, status){
	var status = status || "paging"; //判断此时是否需要加载分页，默认是添加分页，只有第一次页面初始化时不加载分页，此时只是为了获取数据条数.
	var per_page = per_page || 10;
	var page = page || 1;
	var offset = per_page*(page -1);

	var personal12Param = getPersonal12Param();	
	//判断是不是一元提案
	if (personal12Param.demandType == "1") {
		$.ajax({
			url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_simple_proposal_list',
			type: 'POST',
			dataType: 'JSON',
			data: {
				user_id: getCookie("user_id"), //getCookie("user_id")66979
				offset: offset,
				limit: per_page
			}
        })
        .done(function(res) {
			if (res.success) {
				$(".neirong-top .wddt .num").html(" (" + (res.data.total_count ? res.data.total_count : 0) + ")");
				if (res.data.item_list.length > 0) {
					var template1 = $("#templateOneDollar").html();
					$("#viewPersona12").empty().append(doT.template(template1)(serializeData(res.data.item_list)));
				} else {
					$("#viewPersona12").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
				if (status == "paging") {
					proPagePaper12(res.data.total_count, page);
				}
            }            
        })
        .fail(function(err) {
            console.log(err);
        });			
		return;	
	}
    $.ajax({
            // url: CONFIG.getMockUrl()+CONFIG.getPath()+'get_project_list',
            // type: 'POST',
            // dataType: 'JSON',
        	// data: {
        	// 	user_id: getCookie("user_id"),
        	// 	per_page: per_page,
        	// 	page: page,
			// 	demandState: personal12Param.demandState || "0",
			// 	keyword: personal12Param.keyword || ""        		
			// }
			url: CONFIG.getUrl()+CONFIG.getPath()+'get_my_project_list',
			type: 'POST',
			dataType: 'JSON',
			data: {
				user_id: getCookie("user_id"), //getCookie("user_id")66979
				is_sign_up: 0,
				per_page: per_page,
				page: page,
				display : personal12Param.demandState,
				project_name: personal12Param.keyword
			}
        })
        .done(function(res) {
			if (res.success) {
				$(".neirong-top .wddt .num").html(" (" + (res.data.total_projects ? res.data.total_projects : 0) + ")");
				if (res.data.item_list.length > 0) {
					var template1 = $("#templatePersona12").html();
					$("#viewPersona12").empty().append(doT.template(template1)(serializeData(res.data.item_list)));
				} else {
					$("#viewPersona12").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
				if (status == "paging") {
					proPagePaper12(res.data.total_projects, page);
				}
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}
//报名的需求
function ajaxSignUpDemandList(per_page, page, status){
	var status = status || "paging";
	var per_page = per_page || 10;
	var page = page || 1;

	var personal12Param = getPersonal12ParamSigUp();	
    $.ajax({
            // url: CONFIG.getMockUrl()+CONFIG.getPath()+'get_project_signUp_list',
            // type: 'POST',
            // dataType: 'JSON',
        	// data: {
        	// 	user_id: getCookie("user_id"),
        	// 	per_page: per_page,
        	// 	page: page,
			// 	demandState: personal12Param.demandState || "0",
			// 	operationState: personal12Param.operationState || "0",
			// 	keyword: personal12Param.keyword || ""        		
			// }
			url: CONFIG.getUrl()+CONFIG.getPath()+'get_my_project_list',
			type: 'POST',
			dataType: 'JSON',
			data: {
				user_id: getCookie("user_id"), 
				is_sign_up: 1,
				per_page: per_page,
				page: page,
				display: personal12Param.demandState,
				quote_status: personal12Param.operationState,
				project_name: personal12Param.keyword
			}
        })
        .done(function(res) {
			if (res.success) {
				$(".neirong-top .xttz .num").html(" (" + (res.data.total_projects ? res.data.total_projects : 0) + ")");
				if (res.data.item_list.length > 0) {
					var template1 = $("#templatePersona12SignUp").html();
					$("#viewPersona12SignUp").empty().append(doT.template(template1)(res.data.item_list));
				} else {
					$("#viewPersona12SignUp").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
				if (status == "paging") {
					proPagePaper12(res.data.total_projects, page);
				}
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}
//收到的需求
function ajaxReceiveDemandList(per_page, page, status){
	var status = status || "paging";
	var per_page = per_page || 10;
	var page = page || 1;

	var sort = $('#receiveSortState option:selected').val();
	var keyword = $(".neirong-b.receive input").val();
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getPath() + "get_project_list/0/" + sort + "/0/0/"+ per_page + "/" + page,
		type: 'POST',
		dataType: 'JSON',
		data: {
			auth_user_id: getCookie("user_id"),
			keycode: keyword
		}
	})
	.done(function (res) {
		if (res.success) {
			$(".neirong-top .receive .num").html(" (" + (res.data.total_projects ? res.data.total_projects : 0) + ")");
			if (res.data.item_list.length > 0) {
				var template1 = $("#templatePersona12Receive").html();
				$("#viewPersona12Receive").empty().append(doT.template(template1)(res.data.item_list));
			} else {
				$("#viewPersona12Receive").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
			}
			if (status == "paging") {
				proPagePaper12(res.data.total_projects, page);
			}
		}
	})
	.fail(function (err) {
		console.log(err);
	});	
}
function getPersonal12Param(){
	var demandStateValue = $('#demandState option:selected').val();
	var demandTypeValue = $('#demandType option:selected').val();

	//根据是不是一元提案，判断是否显示需求状态（一元提案没有需求状态）
	var demandStateDiv = $(".sele1.selePub.demandStateDiv");
	if (demandTypeValue == "1") {
		demandStateDiv.css("display","none");
	} else {
		demandStateDiv.css("display","inline");	
	}

	var keyword = $(".neirong-b.publish input").val();
	return {
		demandState: demandStateValue,
		demandType: demandTypeValue,
		keyword: keyword
	}
}

function getPersonal12ParamSigUp(){
	var demandStateValue = $('#demandStateSingUp option:selected').val();
	var operationStateValue = $('#operationState option:selected').val();
	var keyword = $(".neirong-b.signUp input").val();
	return {
		demandState: demandStateValue,
		operationState: operationStateValue,
		keyword: keyword
	}
}

/**
 * ajax获取数据后，根据display确定显示的状态，添加stateTxt字段
 * @Author   郑国庆
 * @DateTime 2017-08-30T10:31:31+0800
 * @param    {[type]} res [原始数据]
 * @return   {[type]}      [修改后的数据]
 */
function serializeData(res){
	var data = res;
	for (var i = 0; i < data.length; i++) {
		var display = data[i].display;
		if(!display) display = "0";
		switch (display) {
			case '0':
				data[i].stateTxt = "审核中";
				break;
			case '1':
				data[i].stateTxt = "发布中";
				break;
			case '2':
				data[i].stateTxt = "审核不通过";
				break;
			case '3':
				data[i].stateTxt = "被处罚";
				break;
			case '4':
				data[i].stateTxt = "已取消";
				break;
			case '5':
				data[i].stateTxt = "超时";
				break;
			case '6':
				data[i].stateTxt = "下架";
				break;					
		}
	}
	return data;
}

/**
 * 发布的需求在审核中时点击取消
 * @Author   郑国庆
 * @DateTime 2017-08-30T11:11:43+0800
 */
$("body").on('click', '.personMeetCancle', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-id');
	layer.alert("确认取消发布？",{
		title:"取消后仍可以重新发布！",
		btn: ['确定', '取消']
	}, function(index, layero){
		ajaxCancelDemand(id);
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

function ajaxCancelDemand(id){
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getPath() +'change_project_info',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			project_id: id,
			display: 4
		},
	})
	.done(function(res) {
		layer.msg("取消需求成功",{time:1000},function(){
			location.reload(); 
		});
	})
	.fail(function(err) {
		console.log(err);
	});
}

/**
 * 删除需求
 * @Author   郑国庆
 * @DateTime 2017-08-30T11:11:43+0800
 */
$("body").on('click', '.xmDelate.demand', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-id');
	var $dom = $(this);
	layer.alert("确认删除需求？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		// then.parent().css("display","none");
		ajaxDeleteDemand(id, $dom);
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

function ajaxDeleteDemand(id, $dom){
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getPath() +'delete_project',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			project_id: id
		},
	})
	.done(function(res) {
		layer.msg("删除需求成功",{time:1000},function(){
			$dom.parent().css("display","none");
		});
	})
	.fail(function(err) {
		console.log(err);
	});
}

/**
 * 下架需求
 * @Author   郑国庆
 * @DateTime 2017-08-30T11:11:43+0800
 */
$("body").on('click', '.personMeetDown', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-id');
	var then = $(this);
	layer.alert("下架后，他人将不能查看该项需求！您也可以在下架后重新发布。确认下架需求？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		ajaxUndercarriageDemand(id);
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

function ajaxUndercarriageDemand(id){
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getPath() +'change_project_info',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			project_id: id,
			display: 6
		},
	})
	.done(function(res) {
		layer.msg("下架需求成功",{time:1000},function(){
			location.reload();
		});
	})
	.fail(function(err) {
		console.log(err);
	});
}

/**
 * 点击报名列表
 * @Author   郑国庆
 * @DateTime 2017-09-01T14:40:17+0800
 */
$("body").on('click', '.signUpNumber', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-id');
	var number = $(this).attr('data-number');
	window.signUpList.id = id;
	window.signUpList.number = number;
	window.signUpList.limit = 5;
	ajaxGetSignUpNumber(id, number, window.signUpList.limit);
});

/**
 * ajax获取已经报价人数
 * @Author   郑国庆
 * @DateTime 2017-09-01T14:41:15+0800
 * @param    {[string]} id [报价单id]
 * @param    {[string]} number [有多少人报价]
 */
function ajaxGetSignUpNumber(id, number, limit){
	var limit = limit || 5;
	var signUpNumberParam = getSignUpNumberParam();
	$.ajax({
		// url: CONFIG.getMockUrl()+CONFIG.getPath()+'personal_12_signUpNumber',
		// type: 'GET',
		// dataType: 'JSON',
		// data: {
		// 	user_id: getCookie("user_id"),
		// 	demand_id: id,
		// 	offset: 0,
		// 	limit: 5,
		// 	sort: signUpNumberParam.sortType,
		// 	filter: signUpNumberParam.filterType
		// },
		url: CONFIG.getUrl()+CONFIG.getPath()+'get_project_quote_list',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),//getCookie("user_id")
			project_id: id,
			per_page: limit,
			page: 0,
			operate_state: signUpNumberParam.filterType,     
			sort: signUpNumberParam.sortType     
		}
	})
	.done(function(res) {
		if (res.success) {
			renderSignUpNumber(res.data.item_list);
			// var maxPage = Math.ceil(res.data.total_count/limit);
			var maxPage = res.data.total_pages;
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
    		    title: number+'人报价',
    		    content: $("#ViewSignUpNumber")
    		});
		}
	})
	.fail(function(err) {
		console.log(err);
	});
}

/**
 * [渲染数据到列表]
 * @Author   郑国庆
 * @DateTime 2017-09-01T15:58:18+0800
 * @param    {[Array]} data [返回的数据，数组]
 */
function renderSignUpNumber(data){
	var template1 = $("#templateSignUpNumber").html();
    $("#ViewSignUpNumberBox").empty().append(doT.template(template1)(data));	
}

/**
 * 当用户点击分页按钮时，ajax向后端获取下一页
 * @Author   郑国庆
 * @DateTime 2017-09-03T11:27:35+0800
 * @param    {[number]} id     [当前需求的id]
 * @param    {[number]} offset [偏移值]
 * @param    {[number]} limit  [每页数量]
 */
function ajaxGetSignUpNumberNextPage(id, offset, limit){
	var page = (offset/limit) +1;
	var signUpNumberParam = getSignUpNumberParam();
	if (window.abortAjax) {
		window.abortAjax.abort();
	}
	window.abortAjax = $.ajax({
		// url: CONFIG.getMockUrl()+CONFIG.getPath()+'personal_12_signUpNumber',
		// type: 'GET',
		// dataType: 'JSON',
		// data: {
		// 	user_id: getCookie("user_id"),
		// 	demand_id: id,
		// 	offset: offset,
		// 	limit: limit,
		// 	sort: signUpNumberParam.sortType,
		// 	filter: signUpNumberParam.filterType			
		// },
		url: CONFIG.getUrl()+CONFIG.getPath()+'get_project_quote_list',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),//getCookie("user_id")
			project_id: id,
			per_page: limit,
			page: page,
			operate_state: signUpNumberParam.filterType,     
			sort: signUpNumberParam.sortType     
		}
	})
	.done(function(res) {
		if (res.success) {
			var limit = window.signUpList.limit;
			var maxPage = Math.ceil(res.data.total_count/limit);
			window.signUpList.maxPage = maxPage;
			//显示数据
			renderSignUpNumber(res.data.item_list);
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

$(".bottom-page .arrow-btn.arrow-left").click(function(event) {
	if (window.signUpList.nowPage > 1) {
		window.signUpList.nowPage -= 1;
		var id =  window.signUpList.id;
		var limit = window.signUpList.limit;	
		var offset = (window.signUpList.nowPage - 1)*limit;
		ajaxGetSignUpNumberNextPage(id, offset, limit);
		//显示页数
		renderPageNumber(); 		
	}
});

$(".bottom-page .arrow-btn.arrow-right").click(function(event) {
	var nowPage = window.signUpList.nowPage;
    var maxPage = window.signUpList.maxPage;
    if (nowPage + 1 <= maxPage) {
    	window.signUpList.nowPage += 1;
		var id =  window.signUpList.id;
		var limit = window.signUpList.limit;	
		var offset = (window.signUpList.nowPage - 1)*limit;
		ajaxGetSignUpNumberNextPage(id, offset, limit);
		//显示页数
		renderPageNumber();     	
    }	
});

//点击合适
$("body").on('click', '.ul-box .doing .ok', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-customerid');
	ajaxSelectQuote(id, true);
});
//点击不合适
$("body").on('click', '.ul-box .doing .no', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-customerid');
	ajaxSelectQuote(id, false);
});

/**
 * 向后台发送信息，是否合适某个报价
 * @Author   郑国庆
 * @DateTime 2017-09-03T15:36:25+0800
 * @param    {[String]} id     [报名id]
 * @param    {[Boolean]} select [是否选择合适或者不合适]
 */
function ajaxSelectQuote(id, select){
	var operate = select ? 1 : 2;
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPath()+'change_project_quote_status',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			quote_id: id,
			operate_state: operate
		}
	})
	.done(function(res) {
		if (res.success) {
			layer.msg(res.message,{time:1000},function(){
				//重新渲染当前页
				var id =  window.signUpList.id;
				var limit = window.signUpList.limit;	
				var offset = (window.signUpList.nowPage - 1)*limit;
				ajaxGetSignUpNumberNextPage(id, offset, limit);
			});			
		}
		layer.msg(res.message);
	})
	.fail(function(err) {
		console.log(err);
	});	
}

function getSignUpNumberParam(){
	var sortTypeValue = $('#sortType option:selected').val();
	var filterTypeValue = $('#filterType option:selected').val();
	return {
		sortType: sortTypeValue,
		filterType: filterTypeValue,
	}
}

$("#sortType").change(function(event) {
	var id =  window.signUpList.id;
	window.signUpList.nowPage = 1;
	var limit = window.signUpList.limit;	
	var offset = (window.signUpList.nowPage - 1)*limit;
	ajaxGetSignUpNumberNextPage(id, offset, limit);	
});
$("#filterType").change(function(event) {
	var id =  window.signUpList.id;
	window.signUpList.nowPage = 1;
	var limit = window.signUpList.limit;	
	var offset = (window.signUpList.nowPage - 1)*limit;
	ajaxGetSignUpNumberNextPage(id, offset, limit);	
});

function proPagePaper12(totalPage, pageNo) {
	var pageNo = pageNo || 1;
	var total = Math.ceil(totalPage/10);
    //生成分页
    kkpager.generPageHtml({
        pno: pageNo,
        //每页数
        total: total,
        //总数据条数
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
            //手动选中按钮
            this.selectPage(n);
            var tabIndex = $(".personal .neirong-top .tab.cur").index();
            if (tabIndex == 0) {
            	ajaxPublishDemandList(10, n);
			} else if (tabIndex == 1) {
            	ajaxSignUpDemandList(10, n);
			} else if (tabIndex == 2) {
				ajaxReceiveDemandList(10, n);
			}
            return false;
        }
    },true);
}

$("#demandState").change(function(event) {
	minix();
});

$("#demandType").change(function(event) {
	minix();
});

$("#demandStateSingUp").change(function(event) {
	minix();
});

$("#operationState").change(function(event) {
	minix();
});

$(".neirong-b i").click(function (event) {
	minix();
});

/**
 * 收到的需求，选择排序操作
 */
$("#receiveSortState").change(function (event) {
	minix();
});

function minix(){
	kkpager.selectPage(1); 
	var tabIndex = $(".personal .neirong-top .tab.cur").index();
	if (tabIndex == 0) {
		ajaxPublishDemandList();	
	} else if (tabIndex == 1) {
    	ajaxSignUpDemandList();	
	} else if (tabIndex == 2) {
		ajaxReceiveDemandList();
	} 
}

/**
 * 取消一元提案
 * @Author   郑国庆
 * @DateTime 2017-08-30T11:11:43+0800
 */
$("body").on('click', '.personMeetRefuse', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-id');
	var $dom = $(this);
	layer.alert("取消后，画客网将不再为您匹配设计师！",{
		btn: ['确定', '取消']
	}, function(index, layero){
		ajaxCancelOneDollar(id, $dom); //取消一元提案
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

/**
 * ajax取消一元提案
 * 
 * @author ZhengGuoQing
 * @param {any} id 提案id
 * @param {any} $dom Jquery DOM元素
 */
function ajaxCancelOneDollar(id, $dom){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'cancel_simple_proposal',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			proposal_id: id
		},
	})
	.done(function(res) {
		if (res.success) {
			layer.msg("取消成功",{time:1000},function(){
				location.reload(); //刷新本页
			});			
		} else {
			layer.msg(res.message,{time:1000});	
		}
	})
	.fail(function(err) {
		console.log(err);
	});
}

/**
 * 删除一元提案
 * @Author   郑国庆
 * @DateTime 2017-08-30T11:11:43+0800
 */
$("body").on('click', '.xmDelate.oneDollar', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-id');
	var $dom = $(this);
	layer.alert("确认删除一元提案？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		// then.parent().css("display","none");
		ajaxDeleteOneDollar(id, $dom);
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

/**
 * ajax删除一元提案
 * 
 * @author ZhengGuoQing
 * @param {any} id 
 * @param {any} $dom 
 */
function ajaxDeleteOneDollar(id, $dom){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'delete_simple_proposal',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			proposal_id: id
		},
	})
	.done(function(res) {
		if (res.success) {
			layer.msg("删除成功",{time:1000},function(){
				$dom.parent().css("display","none");
			});			
		} else {
			layer.msg(res.message,{time:1000});
		}
	})
	.fail(function(err) {
		console.log(err);
	});
}