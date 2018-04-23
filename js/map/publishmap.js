var proEdit = getLocationParam('proId');
var userTo = getLocationParam('uid');
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
    map.centerAndZoom("杭州", 15);  // 初始化地图,设置中心点坐标和地图级别
//        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
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
    // 百度地图API功能
    function G(id) {
        return document.getElementById(id);
    };
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "suggestId"}
    );
    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        $("#suggestId").blur();
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
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
    //所有城市点击后显示在最后面
    $(document).on("click",".designer-select-navUl2 .popup-city a",function () {
        $("#activeCity").html($(this).html()).addClass("designColor");
        $(".popup-city").css("display","none");
    });
    //地址转成经纬度
    var myGeo = new BMap.Geocoder();
    /**
     * 项目需求上传
     */
    $("#needCommit").click(function () {
        var str1 = '',
            str3 = $("#suggestId").val(),
            lng = '',lat = '';
        $("#uploadView li").each(function () {
            var id = $(this).find(".uploadViewPic").attr("data-id");
            str1 += '_'+id;
        });
        geocodeSearch(str3);
        function geocodeSearch(add){
            //add有值
            if(add){
                myGeo.getPoint(add,function(point){
                    if(point){
                        //且为合法地址能够转换成经纬度
                        // var address = new BMap.Point(point.lng, point.lat);
                        lng = point.lng;lat = point.lat;
                        console.log(lng + '***' + lat);
                    };
                    var needPush = {
                        user_id:getCookie('user_id'),            //用户id
                        direction:$(".publish-inp").val(),       //标题(字符串)
                        batch_path_ids:str1,                     //附件id（_id_id_id）
                        content:$(".texa").val(),                //需求描述（字符串）
                        budget_price_str:$(".budgetIpt").val(),  //预算（限制只能输入数字）
                        longitude:lng,
                        latitude:lat,
                        long_lat_address:str3,               //地址（字符串）
                        auth_user_id:userTo,
                        project_id:proEdit
                    };
                    // var needPushEdit = {
                    //     user_id:getCookie('user_id'),            //用户id
                    //     direction:$(".publish-inp").val(),       //标题(字符串)
                    //     batch_path_ids:str1,                     //附件id（_id_id_id）
                    //     content:$(".texa").val(),                //需求描述（字符串）
                    //     budget_price_str:$(".budgetIpt").val(),  //预算（限制只能输入数字）
                    //     longitude:lng,
                    //     latitude:lat,
                    //     long_lat_address:str3, //地址（字符串）
                    //     project_id:proEdit
                    // };
                    if(needPush.direction.length > 22 || needPush.direction.length < 2){
                        alertUploadMsg('需求标题:字数限制为2-30个字！');
                        return false;
                    }else if(needPush.content.length < 2 || needPush.content.length > 300){
                        alertUploadMsg('需求描述:字数限制为2-300个字！');
                        return false;
                    }else if(str3.length < 1){
                        alertUploadMsg('请填写约见地址！');
                        return false;
                    }else if(!needPush.budget_price_str){
                        alertUploadMsg('需求预算不能为空！');
                        return false;
                    }else{
                        var url1 = baseURL+"add_project",
                            url2 = baseURL+"change_project_info";
                        if(!proEdit){
                            pro_edit(url1,needPush);
                        }else{
                            pro_edit(url2,needPush);
                        };
                    };
                    function pro_edit(url,data) {
                        $.ajax({
                            url:url,
                            type:"post",
                            data:data,
                            dataType:"json",
                            success:function (res) {
                                console.log(needPush);
                                console.log(res);
                                if(res.success){
                                    window.location.href = 'Personal-12.html';
                                }else{
                                    alertUploadMsg(res.message);
                                }
                            },
                            error:function (res) {
                                alertUploadMsg(res.data.message);
                            }
                        });
                    };
                })
            }else{
                alertUploadMsg("详细地址不能为空！");
            };
            //向后台发送数据保存为常用地址
            saveuseraddress(str3);
        };
    });

    //项目需求修改
    if(proEdit){
        $.ajax({
            url:baseURL+'get_project_info/'+proEdit,
            type:"get",
            dataType:"json",
            success:function (res) {
                console.log(res.data);
                var sts = '',adArr = [],fstId,secId,src;
                $(".publish-inp").val(res.data.direction);
                $(".paymentMainDiv .texa").val(res.data.content).parent().find(".texal").css("display","none");
                //附件展示
                function get_src(file_type) {
                    if ('.jpg.png.gif.bmp.tif'.indexOf(file_type) != -1) {
                        return fileTypeSrc[1];
                    } else if ('.doc.docx'.indexOf(file_type) != -1) {
                        return fileTypeSrc[0];
                    } else if ('.xls.xlsx'.indexOf(file_type) != -1) {
                        return fileTypeSrc[8];
                    } else if ('.ppt.pptx'.indexOf(file_type) != -1) {
                        return fileTypeSrc[5];
                    } else if ('.pdf'.indexOf(file_type) != -1) {
                        return fileTypeSrc[4];
                    } else if ('.txt'.indexOf(file_type) != -1) {
                        return fileTypeSrc[6];
                    } else if ('.mp3'.indexOf(file_type) != -1) {
                        return fileTypeSrc[2];
                    } else if ('.mp4'.indexOf(file_type) != -1) {
                        return fileTypeSrc[3];
                    } else if ('.zip.rar'.indexOf(file_type) != -1) {
                        return fileTypeSrc[9];
                    } else {
                        return fileTypeSrc[7];
                    };
                };

                for(var i = 0;i < res.data.attachment_list.length;i++) {
                    src = get_src(res.data.attachment_list[i].ext);
                    sts += '<li><i></i><img class="uploadViewPic" src="' + src + '" alt="" data-id="' + res.data.attachment_list[i].id + '"><br><span class="uploadViewName" title="'+res.data.attachment_list[i].name+'">' + res.data.attachment_list[i].name + '</span></li>';
                };
                $("#uploadView").html(sts);

                //地址展示
                // adArr = res.data.long_lat_address.split(" ");
                // fstId = $(".divXlUl1 option[value="+adArr[0]+"]").attr("data-value");
                // $(".divXlUl1 option[value="+adArr[0]+"]").attr("selected","selected");
                // ssxLd(fstId,-1,$('.divXlUl2'));
                // $(".divXlUl2 option[value="+adArr[1]+"]").attr("selected","selected");
                // secId = $(".divXlUl2 option[value="+adArr[1]+"]").attr("data-value");
                // ssxLd(secId,-1,$('.divXlUl3'));
                // $(".divXlUl3 option[value="+adArr[2]+"]").attr("selected","selected");
                $("#suggestId").val(res.data.long_lat_address);
                $(".budgetIpt").val(res.data.budget_price_str);
            }
        });
    };
    $(document).on('click','.tuosen .tuosenUlLiDel' ,function () {

        // $("#suggestId").val($(this).find('.texts').html());
        // $("option.ls").remove();
        // ssxLd(-1, -1, $(".divXlUl1"));   //默认的省份显示
        // var address = $(this).find('.texts').html(),
        //     fstId,secId;
        // //地址展示
        // fstId = $(".divXlUl1 option[value="+address[0]+"]").attr("data-value");
        // $(".divXlUl1 option[value="+address[0]+"]").attr("selected","selected");
        // ssxLd(fstId,-1,$('.divXlUl2'));
        // console.log($(".divXlUl1 option[value=四川]")[0]);
        // $(".divXlUl2 option[value="+address[1]+"]").attr("selected","selected");
        // secId = $(".divXlUl2 option[value="+address[1]+"]").attr("data-value");
        // ssxLd(secId,-1,$('.divXlUl3'));
        // $(".divXlUl3 option[value="+address[2]+"]").attr("selected","selected");
    });
};

//异步加载地图
// window.onload = loadJScript();  //异步加载地图
$(function () {
    loadJScript()
});
function alertMapShow() {
    $('.mapWrap').addClass("mapWrapBig");
};
$(function () {
    $(".alertDom i").click(function () {
        $(this).parent().removeClass("alertDom_lg");
    });
    $(".alertMapClose").click(function () {
        $(this).parents(".mapWrap").removeClass("mapWrapBig");
    });
});