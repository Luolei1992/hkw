// var baseURL = 'http://www.huakewang.com/hkw_newapi//';

//设计师列表[designer = maindata.item_list]
function designXhr(designer) {
    // 遍历设计师
    var totalDesigner = '';
    var itemWrap = $(".ca-item-wrap");

    for(var k = 0;k < designer.length;k++){
        var _experience=parseInt(designer[k].experience);
        if(isNaN(_experience)){
            _experience=0;
        }
        var _experience_text='';
        if(_experience<1){
            _experience_text='1年以下'
        }else if(_experience<3){
            _experience_text='1-3年'

        }else if(_experience<5){
            _experience_text='3-5年'

        }else if(_experience<10){
            _experience_text='5-10年'

        }else{
            _experience_text='10年以上'
        }
        totalDesigner += '<div class="ca-item ca-item-select ca-item-'+k+'" id="'+k+'" style=""><div class="ca-item-main"><div class="ca-item-photo"><a href="detailed.html?id='+designer[k].id+'" target=_blank><img alt="'+(designer[k].alt?designer[k].alt:"")+'" src="'+designer[k].path_thumb+'"/></a></div><h3 class="niCheng">'+designer[k].nick_name+(designer[k].sex == '男'?'<img class="sex_img_s" src="images/sex1.png">':(designer[k].sex=='女')?'<img class="sex_img_s" src="images/sex2.png">':"")+'</h3><p>'+(designer[k].jobs[0]?designer[k].jobs[0]:"设计师")+'<span class="shugang">|</span>'+_experience_text+'<span class="shugang">|</span>'+designer[k].works_count+'件作品 <br><span class="imgGZ1"></span><i class="text">'+designer[k].hits_count+'</i><span class="imgGZ2"></span><i class="text">'+designer[k].love_count+'</i><span class="imgGZ3"></span><i class="text">'+designer[k].comment_count+'</i></p><div class="ca-info"><div class="ca-star">'+getStart(designer[k].credit_val)+'</div><div class="ca-location"><span class="ca-location-icon"></span> '+get_adress(designer[k])+'</div></div><div class="ca-main"><div class="ca-inntro">'+goodSkills(designer[k].keywords)+'</div><div class="ca-list ca-list--thumb"><ul class="clearfix" style="height:352px;overflow: hidden;">'+proPics(designer[k])+'</ul></div></div><div class="ca-mian-detailed fn-hide"><div class="ca-mian-detailed-bottom fn-clear">'+(getCookie("user_id")?'<a class="talkOpacity" href="'+(designer[k].hxid?"Personal-x.html?talk_hxid="+designer[k].hxid:"javascript:;")+'" target="_blank"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-blue"></i>对话</div></a>':'<a  class="talkOpacity" href="javascript:;" onclick="javascript:go_login();" target="_blank"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-blue"></i>对话</div></a>')+(getCookie("user_id")?'<a href="appointment.html?id='+designer[k].id+'" target=_blank><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-red"></i>约见</div></a>':'<a href="javascript:;" onclick="javascript:go_login();"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-red"></i>约见</div></a>')+(getCookie("user_id")?'<a href="javascript:;" data-uid="'+designer[k].id+'" data-exprience="'+_experience_text+'" data-nickname="'+designer[k].nick_name+'" data-head="'+designer[k].path_thumb+'" data-works="'+designer[k].works_count+'" data-sex="'+designer[k].sex+'" data-address="'+designer[k].txt_address+'" class="big-orange-link"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-orange"></i>下单</div></a>':'<a href="javascript:;" onclick="javascript:go_login();"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-orange"></i>下单</div></a>')+'</div></div></div></div>';
    };
    if(totalDesigner == ""){
        itemWrap.html('<p style="text-align: center;font-size:14px;color:red;">未找到相关设计师！</p>');
    }else{
        itemWrap.html(totalDesigner);
        picsLazyLoad();
    };
    desigerLB();
    if(getCookie('user_id')){
        $(".talkOpacity").each(function () {
            if($(this).attr("href") == "javascript:;"){
                $(this).css("opacity","0.4").find(".ca-mian-detailed-bottom-item").css("opacity","0.4");
            };
        });
    }
};
//设计师轮播
function desigerLB() {
    $('.ca-item').hover(function () {
        $(this).children('.ca-item-main').css({
            'border': '1px solid #0096ff'
        });
        $(this).children('.ca-item-main').find('.ca-item-photo img').css({
            'border': '1px solid #0096ff'
        });
        $(this).find('.fn-hide').finish().slideDown(200);
    }, function () {
        $(this).children('.ca-item-main').css({
            'border': '1px solid #c9c9c9'
        });
        $(this).children('.ca-item-main').find('.ca-item-photo img').css({
            'border': '1px solid #fff'
        });
        $(this).find('.fn-hide').finish().slideUp(200);
    });
    $(".hkw-btn_round .fn-clear").children().eq(0).css("border-color", "black");
    $(".hkw-btn_round .fn-clear").children().eq(0).css("color", "black");

    $(".hkw-btn_round .fn-clear li").mouseenter(function () {
        $(this).each(function () {
            $(this).css("border-color", "black").siblings().css("border-color", "#D3D8DC");
            $(this).hover().css("color", "black").siblings().css("color", "#D3D8DC");
        })
    })
    var itemLength = $('.ca-item').css("width");
    var item = parseInt(itemLength);
    var itemLength = $('#ca-container div.ca-item').length;
    $('#ca-item-wrap').css({
        'width': (itemLength * item) + 'px',
        'height': '100%',
        'position': 'relative',
        'left': '0px'
    });
    for (var i = 0; i < itemLength; i++) {
        $('#ca-container div.ca-item:eq(' + i + ')').css({
            'left': (i * item) + 'px'
        });
    };
    $(function () {
        var i = 0;
        var size = $("#ca-item-wrap .ca-item").size() - 2;
//            点击向左轮播
        $(".ca-nav .ca-nav-prev").click(function () {
            i--;
            if (i == -1) {
                $("#ca-item-wrap").stop().animate({left: -(size - 1) * 401});
                i = size - 1;
            }
            $("#ca-item-wrap").stop().animate({left: -i * 401}, 500);
            $("#hkw-btn_round li").eq(i).css({
                "border-color": "#000",
                "color": "#000"
            }).siblings().css({
                "border-color": "#D3D8DC",
                "color": "#D3D8DC"
            });
        });
//            点击向右轮播
        $(".ca-nav .ca-nav-next").click(function () {
            moveR();
        });
//            向右轮播函数
        function moveR() {
            i++;
            if (i == size) {
                $("#ca-item-wrap").stop().animate({left: 0});
                i = 0;
            }
            $("#ca-item-wrap").stop().animate({left: -i * 401}, 401);
            if (i == size) {
                $("#hkw-btn_round li").eq(0).css({
                    "border-color": "#000",
                    "color": "#000"
                }).siblings().css({
                    "border-color": "#D3D8DC",
                    "color": "#D3D8DC"
                });
            } else {
                $("#hkw-btn_round li").eq(i).css({
                    "border-color": "#000",
                    "color": "#000"
                }).siblings().css({
                    "border-color": "#D3D8DC",
                    "color": "#D3D8DC"
                });
            }
        }
//            鼠标滑过圆点
        $("#hkw-btn_round li").hover(function () {
            var index = $(this).index();
            i = index;
            $("#ca-item-wrap").stop().animate({left: -i * 401}, 300);
            $(this).addClass("on").siblings().removeClass("on");
        });
        //    // 定时自动轮播
        // var t = setInterval(function () {
        //     moveR();
        // }, 2500);
        //    // 鼠标滑过图片停止自动轮播
        // $("#hkw-ca-wrapper").hover(function () {
        //         clearInterval(t);
        //     },
        //     function () {
        //         t = setInterval(function () {
        //             moveR();
        //         }, 2500)
        //     });
    })
    /**设计师轮播结束**/

}
//五角星评分展示   [num = designer[k].credit_val]
function getStart(num) {
    var strTotal = '', strSolid = '',strEmpty = '',strHalf = '',arr=[];
    if(num < 5) {
        arr = num.split(".");
        // 实心数
        for(var i = 0;i < arr[0];i++){
            strSolid += '<span class="ca-heart-icon"></span>';
        };
        // 空心数
        if(arr[1] == 0){    //小数点后面为0，没有半颗星
            for(var j = 0;j < 5-arr[0];j++) {
                strEmpty += '<span class="ca-heart-icon emptyStart"></span>';
            }
        }else{  //小数点后面部位0，有半颗星
            strHalf = '<span class="ca-heart-icon halfStart"></span>';
            for(var j = 0;j < 4-arr[0];j++) {
                strEmpty += '<span class="ca-heart-icon emptyStart"></span>';
            }
        };
        strTotal = '信誉度:&nbsp;&nbsp;'+strSolid+strHalf+strEmpty+'&nbsp;'+num;
        return strTotal;
    }else{
        // 实心数
        for(var i = 0;i < 5;i++){
            strSolid += '<span class="ca-heart-icon"></span>';
        };
        strTotal = '信誉度:&nbsp;&nbsp;'+strSolid+'&nbsp;&nbsp;'+num;
        return strTotal;
    };
};
//擅长技能[numSkill = designer[k].keywords]
function goodSkills(numSkill) {
    var str = '';
    for(var i = 0;i < numSkill.length;i++){
        if(numSkill[i] == "") {

        }else{
            str += '<a href="designer.html?p='+numSkill[i]+'"><span class="sp1-bk ">'+numSkill[i]+'</span></a>';
        }
    }
    return str;
};
//图片展示[pics = designer[k]]
function proPics(pics) {
    var pic = '';
    if(!pics){
        return false;
    }else{
        for(var i = 0;i < 6;i++) {
            pic += '<li class="thumb h150"><a href="introduction.html?id='+pics.works_list[i].id+'" target="_blank"><img alt="'+(pics.works_list[i].alt?pics.works_list[i].alt:"")+'" src="images/1px.png" data-original="'+(pics.works_list[i].path.indexOf("upaiyun") != -1?pics.works_list[i].path+'!160x115':pics.works_list[i].path_thumb)+'"/></a></li>';
        }
        return pic;
    };
};
//获取地址[address = designer[k]]
function get_adress(address) {
    var long = (address.distance-0)/1000;
    if(!address.distance || long > 20 || long == 0){
        if(!address.txt_address || address.txt_address == 0 || address.txt_address == null || address.txt_address == "" || address.txt_address == "未知"){
            return "地址：[未知]";
        }else{
            return '地址：'+address.txt_address;
        }
    }else{
        return '距离：'+long.toFixed(2)+'km';
    }

}
//设计师页
var sort = "add_time",kind = "all",keywords="all",lng = 0,lat = 0,num = 9,n=1,totalPage,flag=true;
/*
 * 设计师页面数据加载
 * sort=排序，n=当前页码，kind=设计师职业，keywords=关键字，lng=经度，lat=纬度，num=每页的数量,flag=是否需要分页
 * */
function designChangeUrl2(sort,kind,keywords,lng,lat,num,n,flag,keyword) {
    $.ajax({
        url:baseURL+'get_user_list_ex2/',
        type:"post",
        dataType:"json",
        data:{
            sort :sort,
            offices:kind,
            keywords:keywords,
            longitude:lng,
            latitude:lat,
            per_page:num,
            page:n,
            keycode:keyword
        },
        success:function (datas) {
            var maindata = datas.data,
                totalPage = Math.floor(maindata.total_pages);
            if(maindata.item_list == null || maindata.item_list == []) {
                $('.ca-item-wrap').html('<p style="text-align: center;font-size:14px;color:red;">未找到相关设计师！</p>');
                $("#kkpager").empty();
            }else{
                designXhr(maindata.item_list);
            };
            if(flag){
                if(totalPage > 1) {
                    pagePaper(totalPage,n,keyword);
                };
            };
            $(".topHeader-design span").html(maindata.total_designers);
            $(".topHeader-company i").html(maindata.total_groups);
            //分类查询数量
            $(".designResultTotal").html(totalPage*num);
        },
        error:function (eqq) {

        }
    });
}
function designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag,keyword) {
    $.ajax({
        url:baseURL+'get_user_list_ex/',
        type:"post",
        dataType:"json",
        data:{
            sort :sort,
            offices:kind,
            keywords:keywords,
            longitude:lng,
            latitude:lat,
            per_page:num,
            page:n,
            keycode:keyword
        },
        success:function (datas) {
            var maindata = datas.data,
            totalPage = Math.floor(maindata.total_pages);
            if(maindata.item_list == null || maindata.item_list == []) {
                $('.ca-item-wrap').html('<p style="text-align: center;font-size:14px;color:red;">未找到相关设计师！</p>');
                $("#kkpager").empty();
            }else{
                designXhr(maindata.item_list);
            };
            if(flag){
                if(totalPage > 1) {
                    pagePaper(totalPage,n,keyword);
                };
            };
            $(".topHeader-design span").html(maindata.total_designers);
            $(".topHeader-company i").html(maindata.total_groups);
            //分类查询数量
            $(".designResultTotal").html(totalPage*num);
        },
        error:function (eqq) {

        }
    });
}

//其他页面作品推荐列表
//<a href="'+(works[k].user_info.hxid == null?"javascript:;":"Personal-x.html?talk_hxid="+works[k].user_info.hxid)+'" target="_blank"><i class="tell"><img src="./images/tell.png" alt=""></i><span>对话</span></a>
function workXhrList(works,ele) {
    var totalWorkList = '';
    var designWorkList = ele;
    for(var k = 0;k < works.length;k++) {
        totalWorkList += '<li class="cur"><div class="iInspir-block"></div><div class="hkw-work-img thumb-a h_a"><a href="introduction.html?id='+works[k].id+'" target=_blank><img class="scale" src="images/1px.png" alt="'+(works[k].alt?works[k].alt:"")+'" data-original="'+(works[k].path_thumb.indexOf("upaiyun") != -1?works[k].path+'!540x390':works[k].path_thumb)+'" width="266"/></a></div><div class="hkw-work-h3 hkw-view-h3"><h3 class="ellipsis">'+works[k].title+'</h3><div class="hkw-view"><h4>'+works[k].title+'</h4><div class="hkw-view-slide" style="overflow: hidden;"><div class="hkw-view-item"><span class="hkw-eye-icon"></span>'+works[k].hits+'</div> <div class="hkw-view-item"><span class="hkw-comment-icon"></span>'+works[k].comment_count+'</div><div class="hkw-view-item"><span class="hkw-collection-icon"></span>'+works[k].love_count+'</div></div><p title="'+works[k].abstract+'">'+works[k].abstract+'</p></div></div><div class="hkw-work-bottom"><a href="javscript:void(0);" target=_blank><img class="hkw-bottom-per" alt="'+(works[k].alt?works[k].alt:"")+'" src="'+(works[k].user_path?(works[k].user_path.indexOf("upaiyun")!=-1?works[k].user_path+'!67x67':works[k].user_path_thumb):"./images/selec.jpeg")+'" width="18" height="18" /><span class="hkw-join-name ellipsis">'+works[k].nick_name+'</span></a><div class="hkw-work-bar fn-right"><div class="hkw-work-bar-item"><span class="hkw-join-icon"></span><span class="hkw-join-text ellipsis">'+get_adress(works[k].user_info)+'</span><span class="hkw-join-text ellipsis"> <span style="color: #e6e6e6;">|</span> '+works[k].user_info.experience+'</span></div></div><div class="hkw-person"><div class="hkw-person-t"><a href="detailed.html?id='+works[k].user_id+'"><img src="'+(works[k].user_path?(works[k].user_path.indexOf("upaiyun")!=-1?works[k].user_path+'!67x67':works[k].user_path_thumb):"./images/selec.jpeg")+'" alt="'+(works[k].alt?works[k].alt:"")+'"><p class="ellipsis">'+works[k].nick_name+'</p></a><p class="ellipsis">'+workSkills(works[k].keyword)+'</p></div><div class="hkw-person-m">'+worksPics(works[k].user_info.userPageItemList)+'</div><div class="hkw-person-b"><div class="hkw-tell">'+(getCookie("user_id")?'<a class="talkOpacity" href="'+(works[k].user_info.hxid?"Personal-x.html?talk_hxid="+works[k].user_info.hxid:"javascript:;")+'" target="_blank"><i class="tell"><img src="./images/tell.png" alt=""></i><span>对话</span></a>':'<a class="talkOpacity" href="javascript:;" onclick="javascript:go_login();" target="_blank"><i class="tell"><img src="./images/tell.png" alt=""></i><span>对话</span></a>')+'</div><div class="hkw-jian">'+(getCookie("user_id")?'<a href="appointment.html?id='+works[k].user_id+'"><i class="jian"> <img src="images/jian.png" alt=""></i><span>约见</span></a>':'<a href="javascript:;" onclick="javascript:go_login();"><i class="jian"><img src="images/jian.png" alt=""></i><span>约见</span></a>')+'</div><div class="hkw-xia">'+(getCookie("user_id")?'<a href="publish.html?uid='+works[k].user_id+'" target="_blank"><i class="xia"><img src="images/xia.png" alt=""></i><span>下单</span></a>':'<a href="javascript:;" onclick="javascript:go_login()"><i class="xia"><img src="images/xia.png" alt=""></i><span>下单</span></a>')+'</div></div></div></div></li>';
    }
    designWorkList.html(totalWorkList);
    picsLazyLoad();
    if(getCookie('user_id')){
        $(".talkOpacity").each(function () {
            if($(this).attr("href") == "javascript:;"){
                $(this).css({"opacity":"0.4","cursor":"default"}).find(".ca-mian-detailed-bottom-item").css("opacity","0.4");
                $(this).parent().css("border","0 none");
            };
        });
    }
};

//图片作品推荐获取[pics = works[k].user_info.userPageItemList]
function worksPics(pics) {
    var pic = '';
    if(!pics){
        return false;
    }else{
        for(var i = 0;i < pics.length;i++) {
            pic += '<div><a href="introduction.html?id='+pics[i].id+'"><img style="width:118px;" src="images/1px.png" data-original="'+(pics[i].path.indexOf("upaiyun") != -1?pics[i].path+'!160x115':pics[i].path_thumb)+'" alt="'+(pics[i].alt?pics[i].alt:"")+'"></a></div>';
        };
        return pic;
    };
};

//获取擅长技能
function workSkills(numSkill) {
    var str = '';
    var arr = spWord(numSkill);
    for(var i = 0;i < arr.length;i++){
        str += '<a href="designer.html?p='+arr[i]+'">'+arr[i]+'</a>'
    };
    return str;
};

// //判断cookie中有没有服务器返回的值login_id，来判断是否登录
// function getcookie(name) {
//     //cookie值
//     var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
//     if (arr != null) return unescape(arr[2]); return null;
// };

/*
* 项目需求
* */

function projectListData(user_id,sort,longitude,latitude,per_page,page,ele,flag,keyword) {
    $.ajax({
        url:baseURL+"get_project_list/"+user_id+"/"+sort+"/"+longitude+"/"+latitude+"/"+per_page+"/"+page,
        type:"post",
        data:{
            keycode:keyword
        },
        dataType:"json",
        success:function (datas) {
            var prodata = datas.data;
            var totalPage =prodata.total_pages;
            indexProXhr(prodata.item_list,ele);
            if(flag) {
                if(window.location.href.indexOf("searchResult") != -1){
                    proPagePapers(totalPage,page,keyword);
                }else{
                    proPagePaper(totalPage,page,keyword);
                }
            }
        }
    });
};
//<a href="'+(projects[k].hxid == null?"javascript:;":"Personal-x.html?talk_hxid="+projects[k].hxid)+'" target="_blank"><i class="big-blue"></i>对话</a>
function indexProXhr(projects,ele) {
    var totalPro = '';
    var caProWrap = ele;
    for(var k = 0;k < projects.length;k++){
        totalPro += '<div class="ca-item ca-item-select"><div class="ca-item-main"><div class="ca-item-photo"><a href="ProjectDetails.html?id='+projects[k].id+'" target=_blank><img alt="'+(projects[k].alt?projects[k].alt:"")+'" src="'+(projects[k].path?(projects[k].path.indexOf("upaiyun")!=-1?projects[k].path+'!138x138':projects[k].path_thumb):'./images/selec.jpeg')+'"/></a></div><h3>找:'+getTitle(projects[k].title)+'</h3><p>'+projects[k].nick_name+'<span class="shugang">|</span>'+(projects[k].company?projects[k].company:"")+'<span class="shugang">|</span>'+(projects[k].job_name?projects[k].job_name:"")+'</p><p><em class="c-1">'+projects[k].budget_price+'</em></p><div class="ca-info"><div class="ca-18" style="font-size: 12px">'+getStart("5.0")+'</div><div class="ca-location"><span class="ca-location-icon"></span> '+get_adress(projects[k])+'</div></div><div class="ca-main"><div class="ca-inntro">'+getkeys(projects[k].keyword)+'</div><div class="ca-inntro c-6">'+projects[k].content+'</div></div><div class="ca-mian-detailed fn-hide"><div class="ca-mian-detailed-bottom fn-clear"><div class="ca-mian-detailed-bottom-item fl">'+(getCookie("user_id")?'<a class="talkOpacity" href="'+(projects[k].hxid?"Personal-x.html?talk_hxid="+projects[k].hxid:"javascript:;")+'" target="_blank"><i class="big-blue"></i>对话</a>':'<a class="talkOpacity" href="javascript:;" onclick="javascript:go_login();" target="_blank"><i class="big-blue"></i>对话</a>')+'</div>'+(getCookie("user_id")?'<a href="appointment.html?id='+projects[k].user_id+'&meet=0" target=_blank><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-red"></i>约见</div></a>':'<a href="javascript:void(0);" onclick="javascript:go_login();" target=_blank><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-red"></i>约见</div></a>')+(getCookie("user_id")?'<a href="javascript:;" target="_blank"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-orange" id="big-orange"></i>报价</div></a>':'<a href="javascript:void(0);" onclick="javascript:go_login();"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-orange" id="big-orange"></i>报价</div></a>')+'</div></div></div></div>';
    };
    caProWrap.html(totalPro);
    if(getCookie('user_id')){
        $(".talkOpacity").each(function () {
            if($(this).attr("href") == "javascript:;"){
                $(this).css({"opacity":"0.4","cursor":"default"}).find(".ca-mian-detailed-bottom-item").css("opacity","0.4");
                $(this).parent().css("border","0 none");
            };
        });
    }
};
//获取标题[title = projects[k].title]
function getTitle(title) {
    var arr = spWord(title);
    return arr[0];
};
//获取关键字[keywords = projects[k].keywords]
function getkeys(keywords) {
    var arr = spWord(keywords);
    var str = '';
    for(var i = 0;i < arr.length;i++) {
        str += '<a href="javascript:void(0);"><span class="sp1-bk ">'+arr[i]+'</span></a>';
    };
    return str;
};

/*
 * 获取历史搜索地址
 * */
$(function () {
    if (getCookie("user_id")) {
        $.ajax({
            url:baseURL+'get_history_coordinate',
            type:"post",
            data:{
                user_id:getCookie("user_id")
            },
            dataType:'json',
            success:function (datas) {
                var arr = [],array = [];
                for(var i = 0;i < datas.data.length;i++){
                    arr.push(datas.data[i].set_cur_city);
                    array.push(datas.data[i].long_lat_address_jd);
                };
                $(".cityInput input").click(function (e) {
                    e.stopPropagation();
                    var $this = $(this);
                    if($(this).val() == ''){
                        $this.parent().find(".drop-select-options").addClass("cur");
                        $("#designWay").css("display","none");
                        $(".huoqv").removeClass("cur");
                        domApp(datas.data);
                    }else{
                        $this.parent().find(".drop-select-options").removeClass("cur");
                    };
                });
                $(document).click(function (e) {
                    e.stopPropagation();
                    $(".cityInput").find(".drop-select-options").removeClass("cur");
                })
                function domApp(dt) {
                    $(".cityInput ul.drop-select-options").find(".hislis").remove();
                    var str = '';
                    for(var i = 0;i < dt.length;i++){
                        str += '<li class="hislis"><i class="wzbj"></i><p class="text2" data-cur="'+dt[i].set_cur_city+'" data-sh="'+dt[i].long_lat_address_jd+'" title="'+dt[i].set_cur_city+dt[i].long_lat_address_jd+'">'+dt[i].long_lat_address_jd+'</p></li>';
                    };
                    $(".cityInput ul.drop-select-options").append(str);
                };
                $(".cityInput input").keyup(function () {
                    var temparr1 = [],temparr2 = [];//空数组，用于存储需要显示的内容
                    for(var i = 0; i < arr.length; i++) {
                        var temp = arr[i];
                        if(temp.indexOf($(this).val()) != -1) {
                            temparr1.push(temp);
                            temparr2.push(array[i]);
                        };
                    };
                    if(temparr1.length == 0) {
                        domApp(datas.data);
                    };
                    if($(this).val().length == 0) {
                        domApp(datas.data);
                    };
                    function domApp() {
                        $(".cityInput ul.drop-select-options").find(".hislis").remove();
                        var str = '';
                        for(var i = 0;i < temparr1.length;i++){
                            str += '<li class="hislis"><i class="wzbj"></i><p data-cur="'+temparr1[i]+'" data-sh="'+temparr2[i]+'" class="text2" title="'+temparr1[i]+temparr2[i]+'">'+temparr2[i]+'</p></li>';
                        };
                        $(".cityInput ul.drop-select-options").append(str);
                    };
                    $(this).parent().find(".drop-select-options").addClass("cur");
                    domApp();
                });
            }
        });
        $(document).on("click",".hislis",function () {
            $(".city-show").html($(this).find(".text2").attr("data-cur"))
            $(".cityInput input").val($(this).find(".text2").html());
            $(this).parent().removeClass("cur");
        });
    }

});

/**
 * 分页插件<设计师>(每次获取数据的总页数改变需要加载一次分页插件)
 * @param totalPage[总页数]
 * @param page[当前页数]
 */
function pagePaper(totalPage,page,keyword) {
    var pageNo = page;
    //生成分页
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        pagerid:"kkpager",
        //总数据条数
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
            //手动选中按钮
            this.selectPage(n);
            designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag,keyword);
            $("body,html").animate({scrollTop:0},200); //使整个页面回到顶部
            return false;
        }
    },true);
}
/**
 * 分页插件<项目>(每次获取数据的总页数改变需要加载一次分页插件)
 * @param totalPage[总页数]
 * @param page[当前页数]
 */
function proPagePaper(totalPage,page,keyword) {
    var pageNo = page;
    //生成分页
    // kkpager.init();
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        pagerid:"kkpager",
        //总数据条数
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
            //手动选中按钮
            this.selectPage(n);
            projectListData(0,sort,lng,lat,9,n,$("#caProWrap"),true,keyword);
            $("body,html").animate({scrollTop:0},200); //使整个页面回到顶部
            return false;
        }
    },true);
}
function proPagePapers(totalPage,page,keyword) {
    var pageNo = page;
    //生成分页
    // kkpager.init();
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        pagerid:"kkpagers",
        //总数据条数
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
            //手动选中按钮
            this.selectPage(n);
            projectListData(0,sort,lng,lat,9,n,$("#caProWrap"),true,keyword);
            $("body,html").animate({scrollTop:0},200); //使整个页面回到顶部
            return false;
        }
    },true);
}
/*
* 分类和相关的数据联动
* */
function aboutLei(sort,leibie) {
    $.ajax({
        url:baseURL+'get_keyword_list/'+sort+'/'+leibie+'/10/1',
        type:'get',
        dataType:'json',
        success:function (datas) {
            var main = datas.data,
                str = '',
                deselenav = $(".designer-select-navUl3"),
                st = '<li><span class="text text1">相关：</span></li>';
            if(main == '') {
                str = '<li><span class="text"><a style="color:red;" href="javascript:void(0);">暂无</a></span></li>';
            }else{
                for (var i = 0;i < main.length;i++) {
                    str += '<li><span class="text"><a href="javascript:void(0);">'+main[i].name+'</a></span></li>';
                };
            };
            deselenav.html(st+str);
        }
    });
}
