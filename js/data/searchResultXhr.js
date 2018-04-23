var key = decodeURI(getLocationParam("keyword")),
    getSearchResultData,activeData,
    index = getLocationParam("idx");
/**
 * 搜索结果得到各部分的数量
 * @param keyword
 */
function getSearchResult(keyword) {
    $.ajax({
        url:baseURL+"search",
        type:"post",
        data:{
            keycode:keyword
        },
        dataType:"json",
        success:function (res) {
            if(res.success){
                num = 12;
                getSearchResultData = res.data;
                $("#seachResult-nav li:eq(0)").find(".txt").html("("+getSearchResultData.works_total_count+")");
                $("#seachResult-nav li:eq(1)").find(".txt").html("("+getSearchResultData.user_total_count+")");
                $("#seachResult-nav li:eq(2)").find(".txt").html("("+getSearchResultData.project_total_count+")");
            }else{
                alertUploadMsg(res.message);
            };
        }
    });
};
function getActiveList() {
    $.ajax({
        url:baseURL+"activity",
        type:"get",
        dataType:"json",
        success:function (res) {
            var string = "";
            if(res.success){
                if(res.data.length > 0){
                    activeData = res.data;
                    $("#seachResult-nav li:eq(3)").find(".txt").html("("+res.data.length+")");
                    for(var i = 0;i < res.data.length;i++) {
                        string += '<div class="ca-item activity-item">'
                            +'<div class="ca-item-main activity-item-main activity-item-wrap">'
                            +'<div class="itemWrap1">'
                            +'<div class="activityHide">'+res.data[i].acttitle+'</div>'
                            +'<a href="activityDetail.html?idx='+i+'"><img src="'+res.data[i].actcover+'" class="image" alt="'+(res.data[i].alt?res.data[i].alt:"活动图片")+'"></a>'
                            // +'<div class="fn-hide activity-title"><h3>'+res.data[i].acttitle+'</h3></div>'
                            +'</div>'
                            +'<div class="itemWrap2">'
                            +'<div class="item-innerwrap">'
                            +'<div class="itemNotice">'
                            +'<i class="activity_clock"></i>'
                            +'<span>'+res.data[i].starttime+'</span>'
                            +'</div>'
                            +'<div class="itemNotice">'
                            +'<i class="activity_local"></i>'
                            +'<span>'+res.data[i].actcity +'|'+ res.data[i].actaddress+'</span>'
                            +'</div>'
                            +'<div class="itemNotice">'
                            +'<i class="activity_sponsor"></i>'
                            +'<span>主办方：'+res.data[i].sponsor+'</span>'
                            +'</div>'
                            +'</div>'
                            +'<span class="itemTitle2">'+(res.data[i].type == 0?"免费":"￥<h3>30000</h3>")+'</span>'
                            +'<span class="itemEnroll1">已报名<span class="itemNumber">'+res.data[i].joinpeople+'</span>人/ 限<span class="itemNumber">'+res.data[i].people+'</span>人</span>'
                            +'<a class="itemEnroll2 itemEnrollActive" href="javascript:;" style="background-color:'+(res.data[i].deletes == 0?"#ccc":"")+';">'+(res.data[i].deletes == 0?"活动结束":"我要报名")+'</a>'
                            +'</div>'
                            +'</div>'
                            +'</div>';
                    };
                    $(".researchResult-acitvity").html(string);
                    $(".activity-item").hover(function () {
                        $(this).find(".activityHide").slideToggle(100);
                    });
                    if(index) {
                        renderActive(index,activeData);
                        $(".activityDetail-bodyAfter-afterWrap").html(string);
                    };
                };
            };
        }
    });
};
//活动详情页面渲染
function renderActive(index,datas) {
    $(".activityDetail_nav_leftPic img").attr("src","https://www.huakewang.com/uploads/"+datas[index].actcover);
    $(".activityDetail_navTop_wrap .title").html(datas[index].acttitle);
    $("#activityDetail_navRight_itemInnerwrap .activity_clock_time").html(datas[index].starttime);
    $("#activityDetail_navRight_itemInnerwrap .activity_location").html(datas[index].actaddress);
    $("#activityDetail_navRight_itemInnerwrap .mainProject").html(datas[index].sponsor);
    $("#activityDetail_navRight_enroll .itemNumber").html(datas[index].joinpeople);
    $("#activityDetail_navRight_enroll .itemNumberLimt").html(datas[index].people);
    $("#activityDetail_nav_money").html((datas[index].type == 0?"免费":"免费"));
    $(".activityDetail-bodyPre-blank").html(datas[index].content);
};
$(function () {
    //搜索页面
    if(window.location.href.indexOf('searchResult.html') != -1){
        getSearchResult(key);
        ajaxWorksList();  //作品列表
        $("#seachResult-nav li:eq(1) a").click(function () {
            designChangeUrl("add_time","all","all",0,0,num,1,true,key);//设计师列表
        });
        $("#seachResult-nav li:eq(2) a").click(function () {
            projectListData(0,'add_time',0,0,9,1,$("#caProWrap"),true,key); //需求列表
        });
    };
    getActiveList(); //活动列表

});

