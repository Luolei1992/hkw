$(function () {
    ajaxNewsList();
});
$(".news-tab-ul .news-tab-li").click(function (event) {
    $('.news-tab-ul .news-tab-li').removeClass('cur');
    $(this).toggleClass('cur');
    //获取tab标签，然后向后台发送数据。
    var param = $(".news-tab-ul .news-tab-li.cur").attr('data-type');
    ajaxNewsList(1, 10, param); //向后台发送数据。
});

/**
 * ajax获取新闻
 * 
 * @author ZhengGuoQing
 * @param {any} page 
 * @param {any} per_page 
 * @param {any} param 
 */
function ajaxNewsList(page, per_page, param){
    var page = page || 1;
    var per_page = per_page || 10;
    var param = param || "id";
    $.ajax({
        url: CONFIG.getUrl() + CONFIG.getPath() + 'get_news_list/445/' + param + '/0/0/' + per_page + '/' + page,
        type: "GET",
        dataType: "JSON"
    })
    .done(function (res) {
        if (res.success) {
            var template1 = $("#templateNews").html();
            $("#viewNews").html(doT.template(template1)(res.data));
            proPagePaper2(res.data.total_pages, page);
        } else {
            
        }
    }).fail(function (err) {
        console.log(err);
    });
}

function proPagePaper2(totalPage, pageNo) {
    var pageNo = pageNo || 1;
    //生成分页
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        mode: 'click', //默认值是link，可选link或者click
        click: function (n) {
            //手动选中按钮
            this.selectPage(n);
            
            ajaxNewsList(n, 10);
            return false;
        }
    }, true);
}

function imgOnLoad(then){
    then = $(then);
    then.parent().css("background","none");
    then.css("visibility","visible");
}