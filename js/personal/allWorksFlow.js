var key = decodeURI(getLocationParam("keyword"));
function waterfall(parent, li) {
    var $aLi = $('ul.pblUl>li'); //获取li
    var LiW = $('ul.pblUl>li').eq(0).width() + 27; //获取li的宽度
    // $('ul.pblUl').css({
    // 	'width': LiW * 4
    // });
    var LiHArr = []; //用于存储 没列中所有块相加的高度

    $('ul.pblUl').each(function () {
        $(this).children('li').each(function (index, value) {
            var LiH = $(this).parent().children('li').eq(index).height();
            if (index < 4) {
                LiHArr[index] = LiH;
            } else {
                var minH = Math.min.apply(null, LiHArr);
                var minHIndex = $.inArray(minH, LiHArr);
                $(value).finish().css({
                    'position': 'absolute',
                    'top': minH + 35,
                    'left': $(this).parent().children('li').eq(minHIndex).position().left
                });
                //数组 最小高元素的高 + 添加上的aLi[i]块框高
                LiHArr[minHIndex] += $(this).parent().children('li').eq(index).height() + 35;
                var maxH = Math.max.apply(null, LiHArr);
                var maxHIndex = $.inArray(maxH, LiHArr);
                $(this).parent().finish().css({
                    'height': maxH,
                    'margin-bottom': '80px'
                });
            }
        });
    });
}

$("body").on("mouseenter mouseleave", "#view5Work li", function (event) {
    event.preventDefault();
    if (event.type == "mouseenter") {
        $(this).find('div.caption').finish().slideDown(100);
        $(this).children('.iInspir-block').css({
            'border': '1px solid #03a5ee'
        });
    } else if (event.type == "mouseleave") {
        $(this).find('div.caption').finish().slideUp(100);
        $(this).children('.iInspir-block').css({
            'border': '1px solid transparent'
        });
    }
});

/**
 * ajax获取作品列表的参数
 * 
 * @author ZhengGuoQing
 * @param {any} page [第几页]
 * @param {any} per_page [每页显示几条数据]
 */
function paramWorksList(page, per_page){
	var offset = (page - 1)*per_page;
	//其他参数怎么获取再说

	return {
		offset: offset,
		limit: per_page,
		sort: "add_time",
		user_id: getCookie("user_id"),
		firstid: "",
		secondid: "",
		keyword: key,
	};
}

/**
 * [获取作品列表]
 * @Author   郑国庆
 * @DateTime 2017-09-08T09:52:51+0800
 * @param    {[type]} per_page [每页显示几条数据]
 * @param    {[type]} page     [第几页]
 */
function ajaxWorksList(page, per_page){
	var page = page || 1;
	var per_page = per_page || 30;
	
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_works_list_ex', 
        type: "POST",
        dataType: 'JSON',
        data: paramWorksList(page, per_page),
	})
	.done(function(req) {
		if (req.success) {
			if (req.data.item_list.length > 0) {
				//自定义页面锚点
                req.data.item_list[0].diyAnchorPage = "page_"+ page;
				page == 1 ? $("#view5Work").empty() : "";
				var template3 = $("#template5Work").html();
				$("#view5Work").append(doT.template(template3)(req.data.item_list));
				var className = "#view5Work "+".page_"+ page+" .delay.maxImgWidth";
            	$(className).load(function(event) {
            		waterfall();
            		$('.hkw-work-list li').off();
            		// hoverWork();
            	});						
            	// proPagePaper5("works",req.data.total_pages, page);				
				renderLoadMore(page, per_page, req.data.total_count); //加载更多，相当于分页功能
			} else {
				// $("#mixdb").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
			}
		}
	})
	.fail(function(err) {
		console.log(err);
	});		
}

/**
 * [添加我的关注，如果该作品已经被关注，则取消关注]
 * @Author   郑国庆
 * @DateTime 2017-09-08T20:42:32+0800
 * @param    {[String]} model [删除类型]
 * @param    {[Number]} id   [关注的id]
 * @param    {[Object]} $dom   [删除按钮]
 */
function addLove(model, id, $dom){
	if (window.ajaxAddLove != null) {
		window.ajaxAddLove.abort();
	}
	window.ajaxAddLove = $.ajax({
		url: CONFIG.getUrl()+CONFIG.getPath()+'add_favorite',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			id: id,
			type:model
		}
	})
	.done(function(req) {
		// layer.msg(req.message,{time:1000});
		if (req.message.type == "delete") {
			$dom.html("收藏");
			layer.msg("删除成功",{time:1000});		
		}
		if (req.message.type == "add") {
			$dom.html("已收藏");
			layer.msg("收藏成功",{time:1000});		
		}	
	})
	.fail(function(err) {
		console.log(err);
	});
	
}


//点击已收藏，取消收藏
$("body").on('click', '.deleteWroks', function(event) {
	event.preventDefault();
	var $dom = $(this);
	var id = $(this).attr('data-id');
	// deleteLove("works", id, $dom); //原来的删除接口
	addLove("works", id, $dom);
});

/**
 * 点击加载更多的事件
 */
$("body").on("click", "#workListAddMoreContent h2", function (e) {
	var page = $(this).attr("data-page");
	var maxPage = $(this).attr("data-maxPage");
	maxPage > page ? ajaxWorksList(parseInt(page) + 1) : "";
});

/**
 * 渲染加载更多按钮，判断是显示加载更多还是显示没有更多了
 * 同时将当前页和页面总数写到DOM上
 * 
 * @author ZhengGuoQing
 * @param {any} page 
 * @param {any} maxPage 
 */
function renderLoadMore(page, per_page, total_count){
	var maxPage = Math.ceil(total_count/per_page);
	if (page == maxPage) {
		$("#workListAddMoreContent h2").html("没有更多了");
	}
	$("#workListAddMoreContent h2").attr("data-page", page);
	$("#workListAddMoreContent h2").attr("data-maxPage", maxPage);
}