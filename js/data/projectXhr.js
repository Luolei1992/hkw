// var baseURL = 'http://www.huakewang.com/hkw_newapi//';

/*
*user_id	用户ID：0=获取所有的需求列表；大于0时表示获取某用户的需求列表
*sort	排序：distance=距离 ，add_time=最新发布，comment_time=最新评论，comment_count=最多评论，hits=最多浏览，love_count=最多喜欢，favorite_count=最多收藏，favorite_time=最近收藏
*longitude	经度
*latitude	纬度
*per_page	每页数
*page	    第几页
* */
$(function () {
    var srclng = getLocationParam("lng"),
        srclat = getLocationParam("lat");
    if(srclng && srclat){
        sort = 'distance';lng = srclng;lat = srclat;
        projectListData(0,sort,lng,lat,9,1,$("#caProWrap"),true);
    }else{
        //首次根据ip定位，map.js
    };
    //需求页面顶部数据加载一次
    $.ajax({
        url:baseURL+"get_project_list/0/add_time/0/0/1/1",
        type:"get",
        dataType:"json",
        success:function (datas) {
            var prodata = datas.data;
            $("#topHeader").html('共有外包项目 '+prodata.total_projects+' 份； 涉及金额：'+prodata.total_price+'万元； 最高单价 '+prodata.Max_price+'万元； 最低单价：'+prodata.Min_price+'元； 平均每单 '+(prodata.Avg_price-0).toFixed(2)+'万元；(引领创意内涵的正确尊重和理解！)');
        }
    });
    //需求发送预报价
    $(document).on("click","#big-orange",function (e) {
        e.preventDefault();
        var baseSrc = $(this).parents(".ca-item-main").find(".ca-item-photo a").attr("href");
        var proPriceId = baseSrc.split("=")[1];
        var $this = $(this);
        needProPrice(proPriceId,-1,$this);
    });
    $(document).on("mouseleave","#proPrice",function () {
        $(this).css("display","none");
    });
    $(document).on("click",".proPriceBtn button",function () {
        var baseSrc = $(this).parents(".ca-item-main").find(".ca-item-photo a").attr("href");
        var proPriceId = baseSrc.split("=")[1];
        var pri = $(this).parents("#proPrice").find(".proPriceMoney input").val();
        var $this = $(this);
        if(pri) {
            needProPrice(proPriceId,pri,$this);
        }else{
            alertUploadMsg("请填写报价金额！");
        }
    })
});
function needProPrice(proPriceId,pri,$this) {
    $.ajax({
        url:baseLink+"quoteApi/project_quote",
        type:"post",
        dataType:"json",
        data:{
            user_id:getCookie("user_id"),
            project_id:proPriceId,
            price:pri,      //-1表示只是查询，有金额表示报名
        }
    }).done(function (data) {
        if(data.success){
            var str = '<div id="proPrice" class="baoming_box_success_show " style="display: block;">'+
                '<a style="font-size: 18px;">您的预报价是：<a class="baoming_box_success_show_money" style="color: red;font-size: 18px;" >'+data.data.price+'</a><a style="font-size: 18px;"> 元</a></a>'+
                '<p style="text-align: left;margin-top: 5px;text-indent: 2em;">需求方筛选为合适的报价后将和设计师进行进一步沟通</p>'+
                '<p style="text-align: left;text-indent: 2em;">届时你可以对其发送详细报价，</p>'+
                '<p style="text-align: left;text-indent: 2em;">双方会有更大的几率进行合作！</p>'+
                '<div class="baoming_price_send_check1 proPriceBtn" style="margin-top: 15px;">'+
                '<a class="proPriceSuc">已报名</a>'+
                '<p style="display: inline;">现在已有<span>'+data.data.quote_count+'</span>人报名</p>'+
                '</div>'+
                '</div>';
            var proPrice = '<div id="proPrice">' +
                '<div class="proPriceDes">' +
                '<p>请根据需求提供大致的总报价金额，</p>' +
                '<p>需求方会筛选合适的报价进一步沟通！</p>' +
                '</div>' +
                '<div class="proPriceMoney">' +
                '<span>预报价：</span><input type="number">元' +
                '</div>' +
                '<div class="proPriceBtn">' +
                '<button>报名</button><p>现在已有<span>'+data.data.quote_count+'</span>人报名</p>' +
                '</div>' +
                '</div>';
            //判断当前人是否报过价
            if(data.data.has_quote == 1) {
                $(".proPriceBtn span").html(data.data.quote_count);  //已经报过价了
                $("#proPrice").remove();
                $this.parents(".ca-item-main").append(str).find("#proPrice").css("display","block");
            }else{
                $("#proPrice").remove();
                $this.parents(".ca-item-main").append(proPrice).find("#proPrice").css("display","block");
                if(pri != -1) {
                    $this.parents(".ca-item-main").append(str).find("#proPrice").css("display","block");    //报价成功
                    $(".proPriceBtn span").html(data.data.quote_count);
                    alertUploadMsg("报名成功");
                }else{
                    $(".proPriceBtn span").html(data.data.quote_count);
                };
            };
        }else{
            alertUploadMsg(data.message);
        }
    });
}
















