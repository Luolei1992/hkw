/*
 * 设计师页面数据加载
 * sort=排序，n=当前页码，kind=设计师类别，lng=经度，lat=纬度，num=每页的数量,flag=是否需要分页
 * */
//进入设计师页面首先判断地址中有哪些参数[p=设计师类别=kind]
$(function () {
    /*
     * kind=分类id（默认NULL）,keywords=关键词，sort=排序，limit=每次请求的数量，n=当前页码
     * */
    function worksList(firstid,sort,keywords,n,num,ele) {
        $.ajax({
            url:baseURL+'get_works_list_ex',
            type:"post",
            dataType:"json",
            data:{
                firstid:firstid,
                sort:sort,
                keyword:keywords,
                offset:n,            //从第几个开始
                limit:num            //每次请求数量
            },
            success:function (datas) {
                var maindata = datas.data;
                workXhrList(maindata.item_list,ele);
            }
        });
    };
    worksList(148,"add_time","",0,8,$('#designWorkList'));

    /*
    * 局部刷新作品推荐
    * */
    aboutLei('user',"全部");
    $(document).on("click",".designer-select-navUl1 li a",function () {
        var keys = $(this).html();
        aboutLei('user',keys);   //类别相关的关键词
        worksList(148,"add_time",keys,0,8,$('#designWorkList'));
    });
    
    var srcP = getLocationParam("p"),      //关键字
        srcT = getLocationParam("t"),      //一级类别
        srcN = getLocationParam("n"),      //一级类别
    // sortLis = getLocationParam("sort"),   //类别
        srclng = getLocationParam("lng"),
        srclat = getLocationParam("lat");
    if( srcP ){
        //按类别查询设计师
        var arrayParam = srcP.split("%E3%80%81");
        keywords = srcP;
        var selects = "";
        for(var i = 0;i < arrayParam.length;i++){
            arrayParam[i]=decodeURI(arrayParam[i]);
            selects += '<li class="dataFlag"><span class="text"><a href="javascript:void(0);"><b>'+arrayParam[i]+'</b><i>X</i></a></span></li>';
        };
        $(".designer-select-navUl4").css("display","block");
        $(selects).insertAfter(".designSX");
        designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
    }else if(srclng && srclat){
        lng = srclng;
        lat = srclat;
        sort="distance";
        designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
    }else if(srcT && srcN){
        designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
    } else {
        // 页面传过来的值为空或者没有传值
        // designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
    };
    $(document).on("click",".designer-select-navUl1 li",function () {
        var num = $(this).attr("data-numid");
        if(num)
            renderDesignerTree(designer_tree_design,num);
    });
});
