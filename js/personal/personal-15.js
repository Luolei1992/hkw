$(function(){
    ajaxGetHistoryCoordinate(); //获取常用地址列表
});

/**
 * 获取常用地址列表
 * 
 */
function ajaxGetHistoryCoordinate(){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_user_history_coordinate',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id")
        },
        success: function (res) {
            if (res.success) {
                if (res.data.length > 0) {
                    var template1 = $("#templateCityList").html();
                    for(var i = 0;i < res.data.length;i++) {
                        if(res.data[i].address_type == "home") {
                            $("#suggestIdh").val(res.data[i].long_lat_address);
                        }else if(res.data[i].address_type == "company"){
                            $("#suggestIds").val(res.data[i].long_lat_address);
                        };
                    };
                    $("#viewCityList").empty().append(doT.template(template1)(res.data));
                } else {
                    $("#viewCityList").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
                }
            }
        }
    });
}

/**
 * 新增用户地理位置,这个借口参数比较多，用一个函数获取参数
 * 
 */
function ajaxChangeCoordinate(val,type){
    var param = paramChangeCoordinate(val,type);
    console.log(param);
    if (!param) {
        return 0;
    }
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'change_user_coordinate',
        type: "POST",
        dataType: "JSON",
        data: param,
        success: function (res) {
            if (res.success) {
                layer.msg("新增地址成功",{time:1000},function(){
                    if(param.address_type != "home" && param.address_type != "company") {
                        $("#suggestId").val("");
                    };
                    ajaxGetHistoryCoordinate(); //刷新，获取常用地址列表
                });
            } else {
                layer.msg(res.message,{time:1000});
            }
        }
    });
}

//获取新增用户地理位置接口的参数
function paramChangeCoordinate(val,type){
    var long_lat_address = val;
    if (!long_lat_address) {
        layer.msg("请输入地址！",{time:1000});
        return 0;
    };
    //其他参数都没写
    return {
        user_id: getCookie("user_id"),
        long_lat_address: long_lat_address,
        long_lat_address_jd: long_lat_address,
        set_cur_city: "",
        address_type:type,
        is_default: 0
    }
}
/**
 * 点击新增常用位置
 */
$("body").on("click", ".cityLocal .hkw-btn_11", function (e) {
    e.preventDefault();
    var $this = $(this).parent().find(".cityWrapUlLi .li-Div input").val(),type = "";
    if($(this).attr("data-type") == "home") {
        type = "home";
    }else if($(this).attr("data-type") == "company") {
        type = "company";
    }else{
        type = "common";
    }
    ajaxChangeCoordinate($this,type); //新增用户地理位置
});

/**
 * 点击删除某个常用位置
 */
$("body").on("click", "#viewCityList .delete", function (e) {
    e.preventDefault();
    var coordinate_id = $(this).attr("data-coordinateId"),$this = $(this),type="";
    layer.alert('确认删除？', function(index){
        if($this.parent().attr("data-pertype") == "home") {
            type = "#suggestIdh";
        }else if($this.parent().attr("data-pertype") == "company") {
            type = "#suggestIds"
        };
        ajaxDeleteCoordinate(coordinate_id,type); //ajax删除某个常用位置
        layer.close(index);
    }); 
});

/**
 * ajax删除某个常用位置
 * 
 * @param {any} coordinate_id 
 */
function ajaxDeleteCoordinate(coordinate_id,type){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'delete_user_coordinate',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id"),
            coordinate_id: coordinate_id
        },
        success: function (res) {
            if (res.success) {
                layer.msg("删除地址成功",{time:1000},function(){
                    ajaxGetHistoryCoordinate(); //刷新，获取常用地址列表
                    console.log(type);
                    $(type).val("");
                });
            } else {
                layer.msg(res.message,{time:1000});
            }
        }
    });
}

/**
 * 点击清空按钮
 */
$("body").on("click", ".cityLocal .clearLocal", function (e) {
    e.preventDefault();
    $(this).parent().find(".li-Div input").val("");
});

