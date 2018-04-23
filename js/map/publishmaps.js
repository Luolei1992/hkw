function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.map.baidu.com/api?v=2.0&ak=0iyUd9ezptw5gEO9T39ixYyHKShcgrGu&callback=init";
    document.body.appendChild(script);
};
// 百度地图API功能
var lng = '',lat = '';
function init() {
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom("杭州", 15); // 初始化地图,设置中心点坐标和地图级别
    //map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放
    map.enableInertialDragging();
    map.enableContinuousZoom();
    //添加城市列表
    var size = new BMap.Size(11, -26);
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之间事件
        // onChangeBefore: function(){
        //    alert('before');
        // },
        // 切换城市之后事件
        // onChangeAfter:function(){
        //   alert('after');
        // }
    }));
    //本地检索,城市列表
    $(".changeCurrentCity").click(function () {
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
        }
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
    var geoc = new BMap.Geocoder();
    map.addEventListener("click", function(e){
        var pt = e.point;
        $('.alertDom:first').attr('data-select-lng',pt.lng);
        $('.alertDom:first').attr('data-select-lat',pt.lat);
        geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents,
                str1 = addComp.province + " ",
                str2 = addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
            var str = str1+str2;
            $(".baiduFindCity").val(str1+str2);
            $(".city-show").html(str1);
            $(".cityInput input").val(str2);

            $(".alertDom").removeClass("alertDom_lg");
            $(".alertDom p").html(str);
            $('.alertDom').addClass("alertDom_lg");

            setTimeout(function () {
                $('.alertDom').removeClass("alertDom_lg");
            },3000);
        });
    });
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "suggestId",
            "onSearchComplete": function (data) {
                console.log(data);
                var str = "";
                if(data.yr.length > 0){
                    for(var i = 0;i < data.yr.length;i++) {
                        str += '<li class="baiduSearch"><img src="images/local_search.png" alt=""><i>'+data.yr[i].business+'</i><span style="color: #CCCCCC;">'+data.yr[i].city+data.yr[i].district+'</span></li>';
                    };
                    $("#searchResultPanel ul").html(str);
                    $(".baiduSearch").on("click",function () {
                        $("#suggestId").val($(this).find("span").html()+$(this).find("i").html());
                        $(this).parent().parent().css("display","none");
                    });
                }
            }
        }
    );
        //所有城市点击后显示在最后面
    $(document).on("click",".designer-select-navUl2 .popup-city a",function () {
        $("#activeCity").html($(this).html()).addClass("designColor");
        $(".popup-city").css("display","none");
    });
};

//异步加载地图
// window.onload = loadJScript();  //异步加载地图
$(function () {
    loadJScript();
    $(document).on("click",".alertDomSure",function () {
        var temp = $(this).parents(".mapWrap").attr("data-specialid");
        $('#'+temp).val($(this).parent().find("p").html());
        $(".mapWrap").removeClass("mapWrapBig");
    });
});

function alertMapShow($this) {
    var className = $($this).parent().find(".li-Div input");
    $('.mapWrap').addClass("mapWrapBig").attr("data-specialId",className.attr("id"));
};
$(function () {
    $(".alertDom i").click(function () {
        $(this).parent().removeClass("alertDom_lg");
    });
    $(".alertMapClose").click(function () {
        $(this).parents(".mapWrap").removeClass("mapWrapBig");
    });
});