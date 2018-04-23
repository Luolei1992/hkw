/**
 * Created by gs on 2017/8/1 0001.
 */
$(function () {
    //banner部份
    $.ajax({
        url:baseURL+"get_ad/8",
        type:"get",
        dataType:"json",
        success:function (res) {
            if(res.success){
                if(res.data.length) {
                    var strs = '';
                    for(var i = 0;i < res.data.length;i++) {
                        strs += '<li><a href="'+(res.data[i].url?res.data[i].url:"javascript:;")+'"><img src="'+res.data[i].path+'" alt="'+res.data[i].ad_text+'"></a></li>'
                    };
                    $("#flexslider .slides").html(strs);
                };
            }else{
                console.log(res.message);
            };
        }
    });
    //默认首页推荐为最多浏览
    var sort = "add_time",customs_type = 'f';
    worksList("NULL",sort,16,1,$('#indexWorkLis'),true,'f');
    //点击最新发布推荐作品
    $(".hkw_link_pub").click(function () {
        //分页初始化
        kkpager.selectPage(1);
        $(this).addClass("hkw_link_pubColor").siblings('a').removeClass("hkw_link_pubColor");
        if($(this).attr("data_custom") == customs_type){
            return false;
        }else{
            customs_type = $(this).attr("data_custom");
            worksList("NULL",sort,16,1,$('#indexWorkLis'),true,customs_type);
        };
    });
    //作品页
    function worksList(kind,sort,num,n,ele,flag,customs_type) {
        $.ajax({
            url:baseURL+'get_works_list/'+kind+'/'+sort+'/'+num+'/'+n+'/'+customs_type,
            type:"post",
            dataType:"json",
            success:function (datas) {
                var maindata = datas.data;
                var totalPage = maindata.total_pages;
                workXhrList(maindata.item_list,ele);
                if(flag) {
                    pagePage(totalPage);  
                };
                $(".newWorkNumber span").html(maindata.today_adds);
                $(".totalWorkNumber span").html(maindata.total_works);
            }
        });
    };
    /*
     * 分页插件(每次获取数据的总页数改变需要加载一次分页插件)
     * */
    function pagePage(totalPage) {
        var pageNo = 1;
        //生成分页
        kkpager.generPageHtml({
            pno: pageNo,
            //总页码
            total: totalPage,
            //总数据条数
            mode: 'click', //默认值是link，可选link或者click
            click: function(n) {
                //手动选中按钮
                this.selectPage(n);
                worksList("NULL",sort,16,n,$('#indexWorkLis'),true,customs_type);
                $("body,html").animate({scrollTop:480},200); //使整个页面回到顶部
                return false;
            }
        });
    }

});