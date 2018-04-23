// alert("message")

$(function(){
	ajaxUserList();
});

/**
 * [获取我关注的设计师，需求，作品]
 * @Author   郑国庆
 * @DateTime 2017-09-08T09:52:51+0800
 * @param    {[type]} type [获取的数据类型，all=所有的；user=设计师;project=需求；works=作品；news=文章；circle=帖子]
 * @param    {[type]} per_page [每页显示几条数据]
 * @param    {[type]} page     [第几页]
 */
function ajaxUserList(type, per_page, page){
	var type = type || "user";
	var per_page = per_page || 12;
	var page = page || 1;
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_my_favorite_list/'+type+"/0/0/"+per_page+"/"+page, 
        type: "POST",
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id")
        }
	})
	.done(function(req) {
		if (req.success) {
			if (req.data.item_list.length > 0) {
				switch (type) {
					case 'user':
						var template1 = $("#template5User").html();
            			$("#mixdb").empty().append(doT.template(template1)(req.data.item_list));
            			proPagePaper5("user",req.data.total_pages, page);						
						break;	
					case 'project':
						var template2 = $("#template5Project").html();
            			$("#view5Project").empty().append(doT.template(template2)(req.data.item_list));
            			proPagePaper5("project",req.data.total_pages, page);						
						break;	
					case 'works':
						var template3 = $("#template5Work").html();
						$("#view5Work").empty().append(doT.template(template3)(req.data.item_list));
            			$("#view5Work .delay.maxImgWidth").load(function(event) {
            				waterfall();
            				$('.hkw-work-list li').off();
            				hoverWork();
            			});						
            			proPagePaper5("works",req.data.total_pages, page);
						break;					
				}
				
			} else {
				var className = "."+type + "-tempNull2";
				$(className).empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
			}
		}
	})
	.fail(function(err) {
		console.log(err);
	});		
}

function proPagePaper5(type, totalPage, pageNo) {
	var pageNo = pageNo || 1;
    //生成分页
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
        	// console.log(n);
            //手动选中按钮
            this.selectPage(n);
            ajaxUserList(type, 12, n);
            return false;
        }
    },true);
}

/**
 * [删除我的关注]
 * @Author   郑国庆
 * @DateTime 2017-09-08T20:42:32+0800
 * @param    {[String]} type [删除类型]
 * @param    {[Number]} id   [关注的id]
 * @param    {[Object]} $dom   [删除按钮]
 */
function deleteLove(type, id, $dom){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPath()+'my_love_delete',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			id: id
		}
	})
	.done(function(req) {
		// layer.msg(req.message,{time:1000});	
		$dom.html("收藏");
		layer.msg(req.message,{time:1000});	
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
