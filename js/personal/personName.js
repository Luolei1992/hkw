/**
 * tab切换选择服务方还是需求方
 * @Author   郑国庆
 * @DateTime 2017-08-14T11:05:42+0800
 */
$(".personal .neirong-top .tab >span").click(function (event) {
    $('.personal .neirong-top .tab').removeClass('cur');
    $(this).parent().toggleClass('cur');
    var tabIndex = $(".personal .neirong-top .tab.cur").index();
    if (tabIndex == 0) {
        $('.Wrap:eq(0)').css({ 'display': 'block' });
        $('.Wrap:eq(1)').css({ 'display': 'none' });
        // kkpager.selectPage(1); 
        ajaxFavoriteList(10, 1);
    } else {
        $('.Wrap:eq(0)').css({ 'display': 'none' });
        $('.Wrap:eq(1)').css({ 'display': 'block' });
        // kkpager.selectPage(1);
        ajaxBlackList(10, 1);
    }
});

/**
 * 获取粉丝列表
 * 
 * @author ZhengGuoQing
 * @param {any} per_page 每页数量
 * @param {any} page 第几页
 */
function ajaxFavoriteList(per_page, page) {
    var per_page = per_page || 10;
    var page = page || 1;

    $.ajax({
        url: CONFIG.getUrl() + CONFIG.getPath() + 'get_favoriter_favorite_list/user' + '/0/0/' + per_page + '/' + page + '/' + getCookie("user_id"),
        type: "POST",
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id")
        }
    })
    .done(function (res) {
        if (res.success) {
            if (res.data.item_list.length > 0) {
                var template1 = $("#templatePersonNameFavorite").html();
                $("#viewPersonNameFavorite").empty().append(doT.template(template1)(res.data.item_list));   			
            } else {
                $("#viewPersonNameFavorite").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
            }
            proPagePaper(res.data.total_pages, page);
        }
    })
    .fail(function (err) {
        console.log(err);
    });	
}

/**
 * 获取黑名单列表
 * 
 * @author ZhengGuoQing
 * @param {any} per_page 每页数量
 * @param {any} page 第几页
 */
function ajaxBlackList(per_page, page) {
    var per_page = per_page || 10;
    var page = page || 1;

    $.ajax({
        url: CONFIG.getUrl() + CONFIG.getPath() + 'get_my_user_black_list' + '/0/0/' + per_page + '/' + page,
        type: "POST",
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id")
        }
    })
        .done(function (res) {
            if (res.success) {
                if (res.data.item_list.length > 0) {
                    var template1 = $("#templatePersonNameBlack").html();
                    $("#viewPersonNameBlack").empty().append(doT.template(template1)(res.data.item_list));
                } else {
                    $("#viewPersonNameBlack").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
                }
                proPagePaper(res.data.total_pages, page);
            }
        })
        .fail(function (err) {
            console.log(err);
        });
}



/**
 * [添加我的关注，如果该设计师已经被关注，则取消关注]
 * @Author   郑国庆
 * @DateTime 2017-09-08T20:42:32+0800
 * @param    {[String]} model [删除类型]
 * @param    {[Number]} id   [关注的id]
 * @param    {[Object]} $dom   [删除按钮]
 */
function addLove(model, id, $dom) {
    if (window.ajaxAddLove != null) {
        window.ajaxAddLove.abort();
    }
    window.ajaxAddLove = $.ajax({
        url: CONFIG.getUrl() + CONFIG.getPath() + 'add_favorite',
        type: 'POST',
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
            id: id,
            type: model
        }
    })
        .done(function (req) {
            // layer.msg(req.message,{time:1000});
            if (req.message.type == "delete") {
                $dom.attr("title", "点击关注").html("<span>+</span> 关注").css({
                    "border": "1px solid dodgerblue",
                    "color": "dodgerblue"
                });
            }
            if (req.message.type == "add") {
                $dom.attr("title", "点击取消关注").html("✔ 已关注").css({
                    "border": "0 none",
                    "color": "#555"
                });
            }
        })
        .fail(function (err) {
            console.log(err);
        });

}

function proPagePaper(totalPage, pageNo) {
    var pageNo = pageNo || 1;
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        mode: 'click', //默认值是link，可选link或者click
        click: function (n) {
            //手动选中按钮
            this.selectPage(n);
            var tabIndex = $(".personal .neirong-top .tab.cur").index();
            if (tabIndex == 0) {
                ajaxFavoriteList(10, n);
            } else {
                ajaxBlackList(10, n);
            }
            return false;
        }
    }, true);
}

/**
* 取消黑名单
* 
* @author ZhengGuoQing
* @param {any} id 
* @param {any} $dom 
*/
function deleteBlack(id, $dom) {
    if (window.ajaxDeleteBlack != null) {
        window.ajaxDeleteBlack.abort();
    }
    window.ajaxDeleteBlack = $.ajax({
        url: CONFIG.getUrl() + CONFIG.getPath() + 'delete_user_black',
        type: 'POST',
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
            to_user_id: id
        }
    })
    .done(function (res) {
        if (res.success) {
            $dom.parent().parent().css("display", "none");
        }
    })
    .fail(function (err) {
        console.log(err);
    });
}