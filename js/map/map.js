function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.map.baidu.com/api?v=2.0&ak=0iyUd9ezptw5gEO9T39ixYyHKShcgrGu&callback=init";
    document.body.appendChild(script);
};
//异步加载地图
$(function () {
    loadJScript();   //异步加载地图
});
// 百度地图API功能
function init() {
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom("杭州", 15);  // 初始化地图,设置中心点坐标和地图级别
//        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    //添加城市列表
    var size = new BMap.Size(11, -26);
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之间事件
        // onChangeBefore: function(){
        //    alert('before');
        // },
        // onChangeAfter:function(){
        // 切换城市之后事件
        //   alert('after');
        // }
    }));
//      本地检索
    $(document).on("click",".changeCurrentCity",function () {
        $(".citylist_popup_main").slideToggle();
        $("#r-result").css("display","none");
    });
    function citySearch() {
        $("#r-result").css("display","block");
        $(".citylist_popup_main").css("display","none");
        var search = $(".baiduFindCity").val();
        var local = new BMap.LocalSearch(map, {
            renderOptions: {map: map, panel: "r-result"}
        });
        if(search == ""){
            search = "杭州";
            local.search(search);
        }else{
            local.search(search);
        };
    }
    $(".citySearch").click(function () {
        citySearch();
    });
    $(".baiduFindCity").keydown(function(event) {//给输入框绑定按键事件
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            citySearch();//弹出提示信息
        }
    });
    //地图点击时经纬度变成地址
    var addressStr = '';
    var geoc = new BMap.Geocoder();
    var timer ;
    map.addEventListener("click", function(e){
        clearInterval(timer);
        var pt = e.point;
        $('.alertDom:first').attr('data-select-lng',pt.lng);
        $('.alertDom:first').attr('data-select-lat',pt.lat);
        geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents,
            str1 = addComp.province + " ",
            str2 = addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
            var str = str1+str2;
            var _html=str.split(" ");
            var sun_html = _html.slice(3);
            $(".baiduFindCity").val(str1+str2);
            $(".city-show").html(str1);
            $(".cityInput input").val(str2);

            $(".alertDom").removeClass("alertDom_lg");
            $(".alertDom p").html(str);
            $('.alertDom').addClass("alertDom_lg");
            //判断当前页为？
            if(window.location.href.indexOf('index.html') != -1){
                $('.alertDom a').attr("href","designer.html?lng="+pt.lng+'&lat='+pt.lat);
            }else if(window.location.href.indexOf('designer.html') != -1){
                $('.alertDom a').attr("href","designer.html?lng="+pt.lng+'&lat='+pt.lat);
            }else if(window.location.href.indexOf('project.html') != -1){
                $('.alertDom a').attr("href","project.html?lng="+pt.lng+'&lat='+pt.lat);
            }else if(window.location.href.indexOf('selfpage.html') != -1){
                $('#inlocaladdress input').val(sun_html.join(" "));
                $("#selfpageCity p span").eq(0).html(_html[0]);
                $("#selfpageCity p span").eq(1).html(_html[1]);
                $("#selfpageCity p span").eq(2).html(_html[2]);
            };

            timer = setTimeout(function () {
                $('.alertDom').removeClass("alertDom_lg");
            },3000);
        });
    })

    //把地址栏的经纬度转换成城市放到对应位置
    function istg(flag) {
        var srclng = getLocationParam("lng"),
            srclat = getLocationParam("lat");
        if((srclng && srclat) && (srclng !=0 && srclat != 0)) {
            if(flag){
                lng = srclng;lat = srclat;
            };
            var pt = new BMap.Point(srclng,srclat);
            geoc.getLocation(pt, function(rs){
                if(rs){
                    var addComp = rs.addressComponents,
                        str = addComp.city;
                    $(".change-city .city-show").html(str.split("市").join(""));
                };
            });
        };
    };
    istg(false);

//根据ip定位
    function myFun(result){
        var cityName = result.name == "全国"?"杭州":result.name;
        myGeo.getPoint(cityName, function(point){
            if(point) {
                var address = new BMap.Point(point.lng, point.lat);
                addMarker(address,new BMap.Label(cityName,{offset:new BMap.Size(20,-10)}));
                lng = point.lng;
                lat = point.lat;
                sort = "distance";
                $('.city-show').html(cityName.split("市").join(""));
                if(window.location.href.indexOf('index.html') != -1){
                    window.location.href="designer.html?lng="+point.lng+"&lat="+point.lat;
                }else if(window.location.href.indexOf('designer.html') != -1){
                    designChangeUrl(sort,kind,keywords,point.lng,point.lat,num,n,flag);
                }else if(window.location.href.indexOf('project.html') != -1){
                    projectListData(0,sort,point.lng,point.lat,9,1,$("#caProWrap"),true);
                };
            };
        });
    };

    function myFuns(result){
        var cityName = result.name;
        $('.city-show').html(cityName.split("市").join(""));
    };
    function myFunH(result){
        var cityName = result.name == "全国"?"杭州":result.name;
        myGeo.getPoint(cityName, function(point){
            if(point) {
                var address = new BMap.Point(point.lng, point.lat);
                addMarker(address,new BMap.Label(cityName,{offset:new BMap.Size(20,-10)}));
                // lng = point.lng;
                // lat = point.lat;
                sort = "distance";
                designChangeUrl2(sort,"all","all",point.lng,point.lat,5,1,false);
            };
        });
    };
    var myCity = new BMap.LocalCity();
    if(window.location.href.indexOf("index.html") != -1) {
        myCity.get(myFunH);
    };
    //地址转换成经纬度
    $(".view-recently").click(function () {
        var currentCity = $(".city-show").html();
        var adds =$(".cityInput input").val()+'市';
        var allStr = currentCity+adds;
        $(".zjjl-show").html("最近距离");
        geocodeSearch(allStr,currentCity,adds);
    });

    $(".cityInput input").keydown(function (event) {
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            var currentCity = $(".city-show").html();
            var adds =$(".cityInput input").val()+'市';
            var allStr = currentCity+adds;
            geocodeSearch(allStr,currentCity,adds);
        };
    });
    var myGeo = new BMap.Geocoder();

    function geocodeSearch(add,currentCity,adds){
        //add有值
        if(add){
            myGeo.getPoint(add,function(point){
                if (point) {
                    //且为合法地址能够转换成经纬度
                    var address = new BMap.Point(point.lng, point.lat);
                    lng = point.lng;lat = point.lat;
                    if(window.location.href.indexOf('selfpage.html') > -1){
                        $('.alertDom:first').attr('data-select-lng',lng);
                        $('.alertDom:first').attr('data-select-lat',lat);
                    }
                    addMarker(address,new BMap.Label(add,{offset:new BMap.Size(20,-10)}));
                    //向后台发送数据保存为搜索历史地址
                    if(adds && adds.length > 1){
                        $.ajax({
                            url:baseURL+'change_coordinate',
                            type:'post',
                            data:{
                                user_id:getCookie("user_id"),
                                long_lat_address:currentCity,
                                long_lat_address_jd:adds,
                                set_cur_city:currentCity
                            },
                            dataType:'json',
                            success:function (data) {
                                console.log(data);
                            }
                        });
                    };
                    //得到对应的设计师或者项目
                    if(window.location.href.indexOf('index.html') != -1){
                        window.location.href = 'designer.html?lng='+lng+'&lat='+lat;
                    }else if(window.location.href.indexOf('designer.html') != -1){
                        designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
                    }else if(window.location.href.indexOf('project.html') != -1){
                        projectListData(0,"distance",lng,lat,9,1,$("#caProWrap"),true);
                    }else if(window.location.href.indexOf('selfpage.html') != -1){
                            dataBaseInf_test.lng=$('.alertDom:first').attr('data-select-lng');
                            dataBaseInf_test.lat=$('.alertDom:first').attr('data-select-lat');
                            aaa = HKWselfpage_HTML.data.dataBaseInForm(dataBaseInf_test);
                    };
                }else{
                    //不能转换成经纬度
                    myCity.get(myFun);
                };
            });
        }else{
            //add没有值
            myCity.get(myFun);
        }
    }
    window.geocodeSearch=geocodeSearch;
    // 设计师页面(职业/地址/相关/类别查询)
    function getLine(place,keys) {
        myGeo.getPoint(place, function(point){
            if (point) {
                //且为合法地址能够转换成经纬度
                var address = new BMap.Point(point.lng, point.lat);
                addMarker(address,new BMap.Label(place,{offset:new BMap.Size(20,-10)}));
                lng = point.lng;
                lat = point.lat;
                if(window.location.href.indexOf('designer.html') != -1){
                    designChangeUrl('distance',kind,keys,lng,lat,num,n,flag);
                }else{
                    projectListData(0,'distance',lng,lat,9,1,$("#caProWrap"),true);
                }
            };
        });
    };

    if((window.location.href.indexOf('index.html') == -1)&&(window.location.href.indexOf('?') == -1)){
        //首次进来
        myCity.get(myFun);
    };
    var initDesigner1,initDesigner2,initDesigner3;
    //点击类别刷新页面设计师部分
    $(document).on("click",".designer-select-navUl1 li a",function () {
        $(".roadsPub").remove();
        //分页初始化
        kkpager.selectPage(1);
        var keys = $(this).html() == "全部"?"all":$(this).html(),
            ele = $(".designer-select-navUl2 a.designColor"),
            eleVal = "",roads = "";
        initDesigner1 = $(this).html();initDesigner3 = "";
        if(initDesigner2) {
            roads = '<li class="roadsPub"><span class="text"><a href="javascript:void(0);">'+initDesigner1+'</a></span></li><li class="roadsPub">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner2+'</a></span></li>';
        }else if(!initDesigner2){
            roads = '<li class="roadsPub"><span class="text"><a href="javascript:void(0);">'+initDesigner1+'</a></span></li>';
        };
        keywords = keys;
        $(".designer-select-navUl4").css("display","none");
        $(".designer-select-navUl5").css("display","block");
        $(roads).insertAfter(".designer-select-navUl5 .designSX");
        $(this).parents('ul.designer-select-navUl1').find('li span.text a').removeClass("designColor");
        $('ul.designer-select-navUl3 li span.text a').removeClass("designColor");
        $(this).addClass("designColor");
        //调用ajax函数获取设计师数据

        //判断城市是否选择了
        if(ele.html() != "全部"){
            sort = 'distance';
            var city = $(".designer-select-navUl2 a.designColor").html();
            getLine(city,keywords);
        }else{
            sort = 'add_time';
            lng=0;lat=0;
            designChangeUrl(sort,kind,keywords,0,0,num,n,flag);
        };
        // ajaxSeoMsg(keys,eleVal);
    });
    //获取不同栏目分类下的seo信息
    function ajaxSeoMsg(key,key2) {
        $.ajax({
            url:baseURL+'get_menu_class_by_name/'+key,
            type:"get",
            dataType:"json",
            success:function (res) {
                if(res.success){
                    if(!key2) {
                        //标题
                        $("title").html(res.data.seo_title || "");
                        //关键词
                        $("meta[name=keywords]").attr("content",res.data.keyword || "");
                        //页面描述
                        if(res.data.content){
                            $("meta[name=description]").attr("content",res.data.content || "");
                        }else{
                            $("meta[name=description]").attr("content",res.data.cover_keyword || "");
                        };
                        //页面功能
                        if(res.data.abstract) {
                            $("meta[name=abstract]").attr("content",res.data.abstract || "");
                        };
                    } else {
                        if(res.data.seo_title && res.data.keyword){
                            //标题
                            $("title").html(res.data.seo_title);
                            //关键词
                            $("meta[name=keywords]").attr("content",res.data.keyword);
                            //页面描述
                            if(res.data.content){
                                $("meta[name=description]").attr("content",res.data.content || "");
                            }else{
                                $("meta[name=description]").attr("content",res.data.cover_keyword || "");
                            };
                            //页面功能
                            if(res.data.abstract) {
                                $("meta[name=abstract]").attr("content",res.data.abstract || "");
                            };
                        }else{
                            $.ajax({
                                url:baseURL+'get_menu_class_by_name/'+key2,
                                type:"get",
                                dataType:"json",
                                success:function (res) {
                                    if(res.success){
                                        //标题
                                        $("title").html(res.data.seo_title || "");
                                        //关键词
                                        $("meta[name=keywords]").attr("content",res.data.keyword || "");
                                        //页面描述
                                        if(res.data.content){
                                            $("meta[name=description]").attr("content",res.data.content || "");
                                        }else{
                                            $("meta[name=description]").attr("content",res.data.cover_keyword || "");
                                        };
                                        //页面功能
                                        if(res.data.abstract) {
                                            $("meta[name=abstract]").attr("content",res.data.abstract || "");
                                        };
                                    }else{
                                        console.log(res.message);
                                    };
                                }, error:function (res) {
                                    console.log(res.message);
                                }
                            });
                        };
                    }
                }else{
                    console.log(res.message);
                };
            }, error:function (res) {
                console.log(res);
            }
        })
    };

    //点击更多城市
    $(document).on("click",'.js-city-more',function () {
        $(".popup-city").css("display","block");
    });
    $(document).on("click",".city-close",function () {
        $(".popup-city").css("display","none");
    });

    $(document).on("click",".designer-select-navUl2 a",function () {
        $(".roadsPub").remove();
        //分页初始化
        kkpager.selectPage(1);
        var city = $(this).html(),ele,roads,tempEle = $(".designer-select-navUl3 a.designColor").html();  //城市
        initDesigner2 = $(this).html();
        if($(".designer-select-navUl3 a").hasClass("designColor")) {
            ele = tempEle == "全部"?"all" : tempEle; //类别
        }else{
            ele = $(".designer-select-navUl1 a.designColor").html(); //类别
        };
        keywords = ele;
        if(initDesigner1 && initDesigner3) {
            roads = '<li class="roadsPub"><span class="text"><a href="javascript:void(0);">'+initDesigner1+'</a></span></li><li class="roadsPub">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner2+'</a></span></li><li class="roadsPub dataFlag">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner3+' <i>X</i></a></span></li>';
        }else if(initDesigner1 && !initDesigner3){
            roads = '<li class="roadsPub"><span class="text"><a href="javascript:void(0);">'+initDesigner1+'</a></span></li><li class="roadsPub">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner2+'</a></span></li>';
        }else if(!initDesigner1 && initDesigner3){
            roads = '<li class="roadsPub"><span class="text"><a href="javascript:void(0);">全部</a></span></li><li class="roadsPub">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner2+'</a></span></li><li class="roadsPub dataFlag">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner3+' <i>X</i></a></span></li>';
        }else{
            roads = '<li class="roadsPub"><span class="text"><a href="javascript:void(0);">全部</a></span></li><li class="roadsPub">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner2+'</a></span></li>';
        };
        $(roads).insertAfter(".designer-select-navUl5 .designSX");
        $(".change-city .city-show").html(city);
        $(".designer-select-navUl5").css("display","block");
        $(".designer-select-navUl4").css("display","none");
        $(this).parents('ul.designer-select-navUl2').find('a').removeClass("designColor");
        // $('ul.designer-select-navUl3 li span.text a').removeClass("designColor");
        $(this).addClass("designColor");
        //调用ajax函数获取设计师数据(转换经纬度)
        //判断类别选的是哪个
        if(city != "全部"){
            sort = 'distance';
            if(city == "西安"){
                getLine("西安市",keywords);
            }else{
                getLine(city,keywords);
            };
        }else{
            sort ='add_time';
            lng=0;lat=0;
            if(window.location.href.indexOf('designer.html') != -1){
                designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
            }else{
                projectListData(0,sort,lng,lat,9,1,$("#caProWrap"),true);
            };
        };
    });

    //所有城市点击后显示在最后面
    $(document).on("click",".designer-select-navUl2 .popup-city a",function () {
        $("#activeCity").html($(this).html()).addClass("designColor");
        $(".popup-city").css("display","none");
    });

    //相关数据
    $(document).on("click",".designer-select-navUl3 li a",function () {
        $(".roadsPub").remove();
        var dataXG = $(this).html(),roads;
        keywords = dataXG;
        initDesigner3 = $(this).html();
        // $('ul.designer-select-navUl2 a').removeClass("designColor");
        $(this).parents('ul.designer-select-navUl3').find('li span.text a').removeClass("designColor");
        //调用ajax函数获取设计师数据
        if(dataXG != '暂无'){
            $(this).addClass("designColor");
            sort = "add_time";
            designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
            if(initDesigner1 && initDesigner2){
                roads = '<li class="roadsPub"><span class="text"><a href="javascript:void(0);">'+initDesigner1+'</a></span></li><li class="roadsPub">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner2+'</a></span></li><li class="roadsPub dataFlag">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner3+' <i>X</i></a></span></li>';
            }else if(initDesigner1 && !initDesigner2){
                roads = '<li class="roadsPub"><span class="text"><a href="javascript:void(0);">'+initDesigner1+'</a></span></li><li class="roadsPub">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">全部</a></span></li><li class="roadsPub dataFlag">&nbsp;&nbsp;>&nbsp;<span class="text"><a href="javascript:void(0);">'+initDesigner3+' <i>X</i></a></span></li>';
            };
            $(roads).insertAfter(".designer-select-navUl5 .designSX");
        };
    });

    //分类查询标签点击关闭后
    $(document).on("click",".designer-select-navUl4 li i",function () {
        //分页初始化
        kkpager.selectPage(1);
        var dataP = '';
        $(this).parents("li").remove();
        if($(".designer-select-navUl4").find("li.dataFlag").length == 0){
            $(".designer-select-navUl4").css("display","none");
        };
        if($(".dataFlag b").length > 0){
            $(".dataFlag b").each(function (idx) {
                if(idx < $(".dataFlag").length - 1){
                    dataP += $(this).html() + "、";
                }else{
                    dataP += $(this).html();
                }
            });
        };
        keywords = dataP;
        //调用ajax函数获取设计师数据
        designChangeUrl(sort,kind,keywords,0,0,num,n,flag);
    });
    $(document).on("click",".designer-select-navUl5 li i",function () {
        //分页初始化
        kkpager.selectPage(1);
        $(".designer-select-navUl3 li a").removeClass("designColor");
        keywords = $(this).parents("li").prev().prev().find("a").html();
        initDesigner3 = "";
        $(this).parents("li").remove();
        //调用ajax函数获取设计师数据
        designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
    });
    //搜索前面的列表点击后需要刷新数据
    $("#designWay li").click(function () {
        //分页初始化
        kkpager.selectPage(1);
        var dataSearch = $(this).children("a").attr("data-search");
        sort = dataSearch;
        $(".cityInput input").val("");
        if(sort == "add_time"){
            //判断当前页是那个页面
            if(window.location.href.indexOf('designer.html') != -1){
                //最新数据
                // myCity.get(myFuns);
                lng = 0;lat = 0;
                istg(true);
                designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
            }else if(window.location.href.indexOf('project.html') != -1){
                // lng = 0;lat = 0;
                istg(true);
                // myCity.get(myFuns);
                projectListData(0,sort,lng,lat,9,1,$("#caProWrap"),true);
            };
        }else if(sort == "distance"){
            //距离最近
            if(window.location.href.indexOf('designer.html') != -1){
                myCity.get(myFun);
            }else if(window.location.href.indexOf('project.html') != -1){
                myCity.get(myFun);
            };
        }else{
            //最多喜欢
            if(window.location.href.indexOf('designer.html') != -1){
                // myCity.get(myFuns);
                lng = 0;lat = 0;
                istg(true);
                designChangeUrl(sort,kind,keywords,lng,lat,num,n,flag);
            }else if(window.location.href.indexOf('project.html') != -1){
                // myCity.get(myFuns);
                // lng = 0;lat = 0;
                sort = 'love_count';
                istg(true);
                projectListData(0,sort,lng,lat,9,1,$("#caProWrap"),true);
            };
        };
    });
    // 编写自定义函数,创建标注
    function addMarker(point,label){
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        marker.setLabel(label);
    }
}

$(function () {
    $(".alertDom i").click(function () {
        $(this).parent().removeClass("alertDom_lg");
    });
    $(".alertMapClose").click(function () {
        $(this).parents(".mapWrap").removeClass("mapWrapBig");
    });
});
function alertMapShow() {
    $('.mapWrap').addClass("mapWrapBig");
};
//全局函数，不需要页面加载完成就可以执行
//获取当前页面的URL参数
function getLocationParam(name){
    var url = window.location.search;
    if ( ~url.indexOf("?") ) {
        var search = {};
        var arrayParam = url.split("?")[1].split("&");
        arrayParam.map(function(value,index, elem) {
            var key = value.split("=")[0];
            var val = value.split("=")[1];
            search[key] = val;
        });
        if (name in search){
            return search[name];
        }else{
            return "";
        }
    }
    return "";
}
