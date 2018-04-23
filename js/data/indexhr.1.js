// var baseURL = 'http://www.huakewang.com/hkw_newapi//';
/*
 * 首页设计师数据加载
 * */
var custom_attribute = 'all';
$(function () {
   
    //新闻列表
    $.ajax({
        url: baseURL+"get_news_list/445/id/0/0/3/1",
        type: "GET",
        dataType: "JSON",
        success: function (res) {
            if (res.success) {
                var htmlStr = "";
                for (var i = 0; i < res.data.item_list.length; i++) {
                    if (i >=3) {
                        return ;
                    }
                    var element = res.data.item_list[i];
                    if (element.title) {
                        htmlStr += '<li><a target="_blank" href="https://www.huakewang.com/2017_data/newsDetails.html?id='+ element.id+'">▪ '+ element.title+'</a></li>';
                    }
                }
                $("#huakewangNewsItemList").html(htmlStr);
            }
        }
    });

    flag =false;
    var sort = "add_time";
    //默认首页推荐为最多浏览
    worksList("NULL",sort,6,1,$('#indexWorkLis'),'f');
    // designChangeUrl(sort,"all","all",lng,lat,5,1,false);
    //点击最新发布推荐作品
    $(".hkw_link_pub").click(function () {
        $(this).addClass("hkw_link_pubColor").siblings('a').removeClass("hkw_link_pubColor");
        custom_attribute = $(this).attr('data-custom');
        if(custom_attribute == 'f'){
            worksList("NULL",sort,6,1,$('#indexWorkLis'),'f');
        }else{
            worksList("NULL",sort,6,1,$('#indexWorkLis'),'all');
        }
    })
});

/*
 * 首页作品推荐数据加载
 * kind=分类id（默认NULL），sort=排序，num=每页的数量，n=当前页码
 * */
function worksList(kind,sort,num,n,ele,custom_attribute) {
    $.ajax({
        url:baseURL+'get_works_list/'+kind+'/'+sort+'/'+num+'/'+n+'/'+custom_attribute,
        type:"get",
        dataType:"json",
        success:function (datas) {
            var maindata = datas.data;
            indexWorkXhr(maindata.item_list,ele);
        }
    });
};
// 首页作品推荐列表[]
//<a href="'+(works[k].hxid == null?"javascript:;":"Personal-x.html?talk_hxid="+works[k].hxid)+'" target="_blank"><i class="tell"><img src="./images/tell.png" alt=""></i><span>对话</span></a>
function indexWorkXhr(works,ele) {
    var totalWorks = '';
    var indexWorkLis = ele;
    for(var k = 0;k < works.length;k++) {
        totalWorks += '<li class="cur"><div class="iInspir-block"></div><div class="hkw-work-img thumb-a h_a"><a href="https://www.huakewang.com/2017_data/introduction.html?id='+works[k].id+'" target=_blank><img class="scale" alt="'+(works[k].alt?works[k].alt:"")+'" src="https://www.huakewang.com/2017_data/images/1px.png" data-original="'+(works[k].path_thumb.indexOf("upaiyun") != -1?works[k].path+'!366x258':works[k].path_thumb)+'" width="366"/></a></div><div class="hkw-work-h3 hkw-view-h3"><h3>'+works[k].title+'</h3><div class="hkw-view"><h4>'+works[k].title+'</h4><div class="hkw-view-slide" style="overflow: hidden;"><div class="hkw-view-item"><span class="hkw-eye-icon"></span>'+works[k].hits+'</div> <div class="hkw-view-item"><span class="hkw-comment-icon"></span>'+works[k].comment_count+'</div><div class="hkw-view-item"><span class="hkw-collection-icon"></span>'+works[k].love_count+'</div></div><p title="'+works[k].abstract+'">'+works[k].abstract+'</p></div></div><div class="hkw-work-bottom"><a href="javscript:void(0);" target=_blank><img class="hkw-bottom-per" alt="'+(works[k].alt?works[k].alt:"")+'" src="'+(works[k].user_path?((works[k].user_path).indexOf("upaiyun") != -1?works[k].user_path+'!67x67':works[k].user_path_thumb):"https://www.huakewang.com/2017_data/images/selec.jpeg")+'" width="18" height="18"/><span class="hkw-join-name">'+works[k].nick_name+'</span></a><div class="hkw-work-bar fn-right"><div class="hkw-work-bar-item"><span class="hkw-join-icon"></span><span class="hkw-join-text">'+get_adress(works[k].user_info)+'</span><span class="hkw-join-text"> <span style="color: #e6e6e6;">|</span> '+works[k].user_info.experience+'</span></div></div><div class="hkw-person"><div class="hkw-person-t"><a href="https://www.huakewang.com/2017_data/detailed.html?id='+works[k].user_id+'"><img src="'+(works[k].user_path?(works[k].user_path.indexOf("upaiyun") != -1?works[k].user_path+'!67x67':works[k].user_path_thumb):"https://www.huakewang.com/2017_data/images/selec.jpeg")+'" alt=""><span>'+works[k].nick_name+'</span></a><p class="clearfix">'+workSkills(works[k].keyword)+'</p></div><div class="hkw-person-m">'+worksPics(works[k].user_info.userPageItemList)+'</div><div class="hkw-person-b"><div class="hkw-tell">'+(getCookie("user_id")?'<a class="talkOpacity" href="'+(works[k].user_info.hxid?"https://www.huakewang.com/2017_data/Personal-x.html?talk_hxid="+works[k].user_info.hxid:"javascript:;")+'" target="_blank"><i class="tell"><img src="https://www.huakewang.com/2017_data/images/tell.png" alt=""></i><span>对话</span></a>':'<a class="talkOpacity" href="javascript:;" onclick="javascript:go_login()" target="_blank"><i class="tell"><img src="https://www.huakewang.com/2017_data/images/tell.png" alt=""></i><span>对话</span></a>')+'</div><div class="hkw-jian">'+(getCookie("user_id")?'<a href="https://www.huakewang.com/2017_data/appointment.html?id='+works[k].user_id+'"><i class="jian"><img src="https://www.huakewang.com/2017_data/images/jian.png" alt=""></i><span>约见</span></a>':'<a href="javascript:;" onclick="javascript:go_login();"><i class="jian"><img src="https://www.huakewang.com/2017_data/images/jian.png" alt=""></i><span>约见</span></a>')+'</div><div class="hkw-xia">'+(getCookie("user_id")?'<a href="https://www.huakewang.com/2017_data/publish.html?uid='+works[k].user_id+'" target="_blank"><i class="xia"><img src="https://www.huakewang.com/2017_data/images/xia.png" alt=""></i><span>下单</span></a>':'<a href="javascript:;" onclick="javascript:go_login()"><i class="xia"><img src="https://www.huakewang.com/2017_data/images/xia.png" alt=""></i><span>下单</span></a>')+'</div></div></div></div></li>';
    };
    indexWorkLis.html(totalWorks);
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
/*
* 首页最新项目(需求方)
* */
$(function () {
    projectListData(0,'add_time',0,0,6,1,$("#caProWrap"),false);
});
/*
* 合作伙伴（首页进来默认调用一次）
* */
var dataListVal = {
    "per_page":"200",         //轮播的一页放21个
    "page": "1"             //从第一页开始
};
$(function () {
    $.ajax({
        url:baseURL+'get_menu_list/461',
        type:'get',
        dataType:'json',
        success:function (res) {
            var str = '';
            $(res.data).each(function (idx,val) {
                str += '<li class="tempLi" id="'+val.id+'">'+val.menu_name+'</li>';
            });
            $("#companyLis").remove('.tempLi').append(str);
        }
    });
    companyLis(dataListVal);
    $(document).on('click',".companyLis li",function () {
        $(this).addClass("companyLisBg").siblings().removeClass("companyLisBg");
    });
    $(document).on('click','#companyLis li',function () {
        var category = $(this).attr('id');
        var companyListTime = $('#companyLisTime li.companyLisBg').html();
        paramChange(category,companyListTime);
    });
    $(document).on('click','#companyLisTime li',function () {
        var category = $('#companyLis li.companyLisBg').attr('id');
        var companyListTime = $(this).html();
        paramChange(category,companyListTime);
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
//判断选择的是哪个（是否包含全部...）
function paramChange(el1,el2) {
    $(".companyLisWrap").css("left","0");
    if(el1 == "" && el2 == "全部") {
        var dataListVal = {
            "per_page":"200",
            "page": "1"
        };
        companyLis(dataListVal);
    }else if(el1 == "" && el2 != "全部"){
        var dataListVal = {
            "cooperate_time":el2,
            "per_page":"200",
            "page": "1"
        };
        companyLis(dataListVal);
    }else if(el1 != "" && el2 == "全部"){
        var dataListVal = {
            "category_id":el1,
            "per_page":"200",
            "page": "1"
        };
        companyLis(dataListVal);
    }else{
        var dataListVal = {
            "category_id":el1,
            "cooperate_time":el2,
            "per_page":"200",
            "page": "1"
        };
        companyLis(dataListVal);
    };
}
function companyLis(dataListVal) {
    //地址不固定的，后面的参数在点击分类时改变
    $.ajax({
        url:baseURL + "get_coopertaion_list",
        type:"post",
        dataType:"json",
        data:dataListVal,
        success:function (datas) {
            var ulNum = datas.data,
                ulLis = '',
                arrTemp = [],
                companyLisWrap = $(".companyLisWrap");
            var shu = Math.ceil(ulNum.total_count / 21);
            //得到有几个ul
            //判断是否需要显示箭头
            if(shu > 1) {
                $(".companyArr").css("display","block");
            }else{
                $(".companyArr").css("display","none");
            };
            for(var i = 0;i < shu;i++){
                arrTemp[i] = new Array();
                //轮播的元素分隔开
                for(var m = 0;m < ulNum.item_list.length;m++) {
                    if(m < 21*(i+1) && m >= 21*i) {
                        arrTemp[i].push(ulNum.item_list[m]);
                    };
                };
                //这里传的参数要手动分页
                ulLis += '<ul>'+getCompanyLis(arrTemp[i])+'</ul>';
            };
            if(!ulNum.item_list.length) {
                companyLisWrap.html('<li><span style="color: red;">暂无数据</span></li>');
            }else{
                companyLisWrap.html(ulLis);
                picsLazyLoad();
            };
            indexLunbo();
        }
    });
};
//得到ul里的li列表 [a = ulNum[i]]（根据传的参数）
function getCompanyLis(a) {
    var li = '';
    //得到不同的ul的li
    for(var m = 0;m < a.length;m++){
        li += '<li class="companyPub"><a href="javascript:;" class="companyBrand companyBrand2"><img src="https://www.huakewang.com/2017_data/images/1px.png" data-original="'+a[m].path_thumb+'" alt="'+(a[m].alt?a[m].alt:"")+'" width="143" height="112"></a><div class="companyShow"><h3 class="companyTitle">'+a[m].title+'</h3><p>'+a[m].description+'</p><h3 class="companyTitle">'+a[m].company_des+'</h3><p><a href="'+a[m].html_path+'">'+a[m].html_path+'</a></div></li>';
    };
    return li;
};

// 品牌企业轮播
function indexLunbo() {
    function animate(obj, target) {
        if (obj.timer) {
            clearInterval(obj.timer);
        };
        obj.timer = setInterval(function () {
            var leader = obj.offsetLeft;
            var step = 30;
            if (leader > target) {
                step = -step;
            };
            var distance = Math.abs(leader - target);
            if (distance > Math.abs(step)) {
                leader = leader + step;
                obj.style.left = leader + "px";
            } else {
                clearInterval(obj.timer);
                obj.style.left = target + "px";
            };
        }, 10);
    }
    // :找对象
    var box = document.querySelector(".companyLogo");   //companyLogo
    var screen = box.children[0];  //screen
    var ul = screen.children[0];   //companyLisWrap
    var ulList = ul.children;      //ul
    var leftArr = document.querySelector(".companyArrL");
    var rightArr = document.querySelector(".companyArrR");
    var imgWidth = screen.offsetWidth;

    //1. 动态生成页面,生成假ul
    if(ulList.length > 1) {
        var clonePic = ulList[0].cloneNode(true);
        ul.appendChild(clonePic);
    }
    //2 点击右箭头
    var pic = 0;
    rightArr.onclick = function () {
        //如果是最后一张的话，要立即跳到第一张
        if (pic == ulList.length-1) {
            pic = 0;
            ul.style.left = "0px";
        }
        pic++;
        var target = -pic * imgWidth;
        animate(ul, target);

    };
    //3 点击左箭头
    leftArr.onclick = function () {
        //如果是第一张的时候，让真图片变成假图片
        if (pic == 0) {
            pic = ulList.length - 1;
            ul.style.left = -pic * imgWidth + "px";
        }
        pic--;
        var target = -pic * imgWidth;
        animate(ul, target);
    };
}




















