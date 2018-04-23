// function waterfall(parent, li) {
// 	var $aLi = $('ul.pblUl>li'); //获取li
// 	var LiW = $('ul.pblUl>li').eq(0).width() + 27; //获取li的宽度
// 	// $('ul.pblUl').css({
// 	// 	'width': LiW * 4
// 	// });
// 	var LiHArr = [] //用于存储 没列中所有块相加的高度

// 	$('ul.pblUl').each(function() {
// 		$(this).children('li').each(function(index, value) {
// 			var LiH = $(this).parent().children('li').eq(index).height();
// 			if (index < 4) {
// 				LiHArr[index] = LiH;
// 			} else {
// 				var minH = Math.min.apply(null, LiHArr);
// 				var minHIndex = $.inArray(minH, LiHArr);
// 				$(value).finish().css({
// 					'position': 'absolute',
// 					'top': minH + 35,
// 					'left': $(this).parent().children('li').eq(minHIndex).position().left
// 				});
// 				//数组 最小高元素的高 + 添加上的aLi[i]块框高
// 				LiHArr[minHIndex] += $(this).parent().children('li').eq(index).height() + 35;
// 				var maxH = Math.max.apply(null, LiHArr);
// 				var maxHIndex = $.inArray(maxH, LiHArr);
// 				$(this).parent().finish().css({
// 					'height': maxH,
// 					'margin-bottom': '80px'
// 				});
// 			}
// 		});
// 	});
// }

$("body").on("mouseenter mouseleave", "#view5Work li,#view0Work li,#view1Work li", function (event) {
    event.preventDefault();
    if (event.type == "mouseenter") {
        $(this).find('div.caption,div.privacy').finish().slideDown(100);
        $(this).children('.iInspir-block').css({
            'border': '1px solid #03a5ee'
        });
    } else if (event.type == "mouseleave") {
        $(this).find('div.caption,div.privacy').finish().slideUp(100);
        $(this).children('.iInspir-block').css({
            'border': '1px solid #ececec'
        });
    }
});

$(function(){
    ajaxAllWorksList("all");
});

function renderLoadMor1(page, maxPage){
	if (maxPage == "0") {
		$("#error_workslist_designer").css("display","block");
	}
	if (page >= maxPage) {
		$("#workListAddMoreContent_designer").css("display","none");
	} else {
		$("#workListAddMoreContent_designer").css("display","block");
	}
	$("#workListAddMoreContent_designer h2").attr("data-page", page);
	$("#workListAddMoreContent_designer h2").attr("data-maxPage", maxPage);
}

$("body").on("click", "#workListAddMoreContent_designer h2", function (e) {
	var page = $(this).attr("data-page");
	var maxPage = $(this).attr("data-maxPage");
	maxPage > page ? ajaxAllWorksList("all", (parseInt(page) + 1)) : "";
});

/**
 * [获取案例展示的作品]
 * @Author   郑国庆
 * @DateTime 2017-09-08T09:52:51+0800
 * @param    {[type]} type [判断是显示案例展示的所有作品，还是显示推荐到主页的作品，前者为all,或者为important]
 * @param    {[type]} per_page [每页显示几条数据]
 * @param    {[type]} page     [第几页]
 */
function ajaxAllWorksList(type, page, per_page){
	var type = type || "all";
	var page = page || 1;
	var per_page = per_page || 20;
	var user_id = getCookie("user_id");
	var is_home_page = "";
	if (type == "important") {
		is_home_page = 1;
	};
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_works_list_by_self/'+user_id+'/'+per_page+'/'+page, 
        type: "POST",
        dataType: 'JSON',
        data: {
        	is_home_page: is_home_page
        }
	})
	.done(function(req) {
		if (req.success) {
			if (req.data.item_list.length > 0) {
				var viewID = "#view0Work";
				var templateID = "#template0Work";
				if (type != "important") {
					viewID = "#view1Work";
					templateID = "#template1Work";
				}
				//自定义页面锚点
                req.data.item_list[0].diyAnchorPage = "page_"+ page;
				page == 1 ? $(viewID).empty() : "";
				var template3 = $(templateID).html();
				$(viewID).append(doT.template(template3)(req.data.item_list));
				// var className = viewID+" .page_"+ page+" .delay.maxImgWidth";
            	// $(className).load(function(event) {
            	// 	waterfall();
            	// 	$('.hkw-work-list li').off();
            	// });						
            	// proPagePaper5("works",req.data.total_pages, page);				
			} else {
				// $("#mixdb").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
			}
			if (type != "important") {
				renderLoadMor1(page, req.data.total_pages); //加载更多，相当于分页功能
			} else {
				renderLoadMor0(page, req.data.total_pages);
			}
		}
	})
	.fail(function(err) {
		console.log(err);
	});		
}

/**
 * [修改作品信息，比如隐藏，取消首页展示，删除.]
 * @Author   郑国庆
 * @DateTime 2017-09-08T20:42:32+0800
 * @param    {[String]} type [修改类型]
 * @param    {[String]} value [修改类型的值，为1 和0.]
 * @param    {[Number]} id   [关注的id]
 * @param    {[Object]} $dom   [删除按钮]
 */
function changeWorkInfo(type, value, id, $dom){
	var is_show_out = ""; //是否隐藏，0为隐藏，1为不隐藏（原意为是否显示，默认1显示，0不显示）
	var is_home_page = ""; //是否在首页展示，1为是，0位否
	var delete_work_info = ""; //是否删除，1为删除
	switch (type) {
		case "hide":
			is_show_out = value;
			break;
		case "important":
			is_home_page = value;
			break;
	}
	if (window.ajaxChangeWorkInfo != null) {
		window.ajaxChangeWorkInfo.abort();
	}
	window.ajaxChangeWorkInfo = $.ajax({
		url: CONFIG.getUrl()+CONFIG.getPath()+'change_work_info',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			work_id: id,
			is_home_page: is_home_page,
			is_show_out:is_show_out,
			delete_work_info:delete_work_info
		}
	})
	.done(function(req) {
		// layer.msg(req.message,{time:1000});
		// if (req.message.type == "delete") {
		// 	$dom.html("收藏");
		// 	layer.msg("删除成功",{time:1000});		
		// }
		// if (req.message.type == "add") {
		// 	$dom.html("已收藏");
		// 	layer.msg("收藏成功",{time:1000});		
		// }	
		if (req.success) {
			$dom.attr("data-value", value); //设置新的value
			switch (type) {
				case "hide":
					if (value == "0") {
						$dom.html("已隐藏");
						$dom.addClass("yes");
						$dom.removeClass("no");
					} else {
						$dom.html("隐藏");
						$dom.addClass("no");
						$dom.removeClass("yes");
					}
				break;
				case "important":
					if (value == "0") {
						$dom.html("主页展示");
						$dom.addClass("no");
						$dom.removeClass("yes");
					} else {
						$dom.html("取消主页展示");
						$dom.addClass("yes");
						$dom.removeClass("no");
					}
				break;
			}
		}
	})
	.fail(function(err) {
		console.log(err);
	});
	
}


//点击隐私设置按钮
$("body").on('click', '.privacy .sc', function(event) {
	// event.preventDefault();
	var $dom = $(this);
	var type = $dom.attr("data-type");
	var id = $dom.attr('data-id');
	var value = $dom.attr("data-value");
	//翻转value
	value == "1" ? value = "0" : value = "1";
	if (type != "delete") {
		changeWorkInfo(type, value, id, $dom);
	}
});

//点击删除某个作品
$("body").on("click", ".privacy .sc.delete", function () {
	var $dom = $(this);
	var id = $dom.attr('data-id');

	layer.alert("是否删除该作品？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		deleteWorkInfo(id, $dom); //ajax删除作品
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

/**
 * ajax删除某个作品
 * 
 * @author ZhengGuoQing
 * @param {any} id 
 * @param {any} $dom 
 */
function deleteWorkInfo(id, $dom){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPath()+'delete_work_info',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			work_id: id
		},
		success: function (res) {
			if (res.success) {
                layer.msg(res.message,{time:1000},function(){
					$dom.parent().parent().parent().remove(); //删除DOM
					waterfall();
            		$('.hkw-work-list li').off();
				});
            } else {
				layer.msg(res.message,{time:1000});
			}
		}
	});
}