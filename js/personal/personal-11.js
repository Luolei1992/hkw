$(function(){
    // bindCertificateUpload(); //绑定上传证书收费事件
    ajaxGetCertificate(); //获取实名认证的数据
});

/**
 * 给每个上传证件照的input绑定FileAPI事件。
 * 
 * @author ZhengGuoQing
 */
function bindCertificateUpload(){
    var $input = $(".js-person-upbtn");
    for (var i = 0; i < $input.length; i++) {
        var element = $input[i];
        certificateUpload(element, i);
    }
}

/**
 * 证件照片上传
 * 
 * @author ZhengGuoQing
 * @param {any} element 上传input的DOM对象
 * @param {any} eq 上传input的DOM的序号
 */
function certificateUpload(element, eq) {
    FileAPI.event.on(element, 'change', function(evt) {
        var files = FileAPI.getFiles(evt); // Retrieve file list
        FileAPI.filterFiles(files, function(file, info) {
            if (!/^image/.test(file.type)) {
                layer.alert('请选择正确格式的图片！');
                return false;
            } else if (file.size > 2 * FileAPI.MB) {
                layer.alert('图片必须小于2M！');
                return false;
            } else if (info.width < 500 || info.height < 500) {
                layer.alert('图片宽度要大于500像素，高度要大于500像素！');
                return false;
            } else {
                return true;
            };
        }, function(files, rejected) {
            if (files.length) {
                var file = files[0];
                FileAPI.upload({
                    url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
                    files: { Filedata: file },
                    progress: function(evt) { /* ... */ },
                    complete: function(err, xhr) { /* ... */
                        //保存图片地址
                        var res = JSON.parse(xhr.responseText);
                        // var res = JSON.parse(resTxt);
                        // console.log(res.data.file_path);
                        if (res.success) {
                            var file_path = res.data.file_path;
                            if (file_path) {
                                $(".js-person-up").eq(eq).attr("data-src",file_path);
                                $(".js-person-up").eq(eq).find("img").attr("src",file_path);
                            }
                        }
                    }
                });
            }
        });
        FileAPI.reset(evt.currentTarget);
    });
}

/**
 * 获取实名认证的数据
 * 
 * @author ZhengGuoQing
 */
function ajaxGetCertificate(){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_real_name_auth',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id")
        },
        success: function (res) {
            if (res.success) {
                renderStatus(res.data.real_name_status);
                renderCertificate(res.data);
            }
        }
    });
}

/**
 * 第一次进来时加载页面，显示之前输入的值
 * 
 * @author ZhengGuoQing
 * @param {any} data 
 */
function renderCertificate(data){
    if (data.real_name) {
        $("#real-name").val(data.real_name);
        // $("#real-name").atr("readOnly",true);
    }
    if (data.id_card_number) {
        $("#id-card-number").val(data.id_card_number);
    }
    if (data.id_card_pic_f) {
        $("#id_card_pic_f").css("background-image",  "url("+data.id_card_pic_f+")");
        $("#id_card_pic_f").attr("data-src", data.id_card_pic_f);
        $("#id_card_pic_f").parent().find(".icon-add").css("display","none");
        $("#id_card_pic_f").parent().find(".upld").css("display","none");
        $("#id_card_pic_f").parent().find(".js-person-reload").css({
            "display": "inline",
            "color": "#555",
            "top": "0px",
            "position": "absolute",
            "font-size": "14px"
        });
    }
    if (data.id_card_pic_b) {
        $("#id_card_pic_b").css("background-image",  "url("+data.id_card_pic_b+")");
        $("#id_card_pic_b").attr("data-src", data.id_card_pic_b);
        $("#id_card_pic_b").parent().find(".icon-add").css("display","none");
        $("#id_card_pic_b").parent().find(".upld").css("display","none");
        $("#id_card_pic_b").parent().find(".js-person-reload").css({
            "display": "inline",
            "color": "#555",
            "top": "0px",
            "position": "absolute",
            "font-size": "14px"
        });
    }
    if (data.id_card_pic_h) {
        $("#id_card_pic_h").css("background-image",  "url("+data.id_card_pic_h+")");
        $("#id_card_pic_h").attr("data-src", data.id_card_pic_h);
        $("#id_card_pic_h").parent().find(".icon-add").css("display","none");
        $("#id_card_pic_h").parent().find(".upld").css("display","none");
        $("#id_card_pic_h").parent().find(".js-person-reload").css({
            "display": "inline",
            "color": "#555",
            "top": "0px",
            "position": "absolute",
            "font-size": "14px"
        });
    }
}

/**
 * 发送实名认证请求
 * 
 * @author ZhengGuoQing
 */
function ajaxSendCertificate(){
    var param = paramAjaxGetCertificate();
    if (!param) {
        return false;
    }
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'send_real_name_auth',
        type: "POST",
        dataType: "JSON",
        data: param,
        success: function (res) {
            if (res.success) {
                console.log(res);
            }
            layer.msg(res.message,{time:1000});
        }
    });
}

/**
 * 发送实名认证请求时获取参数
 * 
 * @author ZhengGuoQing
 */
function paramAjaxGetCertificate(){
    var real_name = $("#real-name").val();
    if (!testRealName(real_name)) {
        return false;
    }
    var id_card = $("#id-card-number").val();
    if (!testIDCard(id_card)) {
        return false;
    }
    var id_card_pic_f = $("#id_card_pic_f").attr("data-src");
    if (!id_card_pic_f) {
        layer.tips("请上传身份证正面照片！", "#id_card_pic_f", {time:1500});
        return false;
    }
    var id_card_pic_b = $("#id_card_pic_b").attr("data-src");
    if (!id_card_pic_b) {
        layer.tips("请上传身份证背面照片！", "#id_card_pic_b", {time:1500});
        return false;
    }
    var id_card_pic_h = $("#id_card_pic_h").attr("data-src");
    if (!id_card_pic_h) {
        layer.tips("请上传手持身份证照片！", "#id_card_pic_h", {time:1500});
        return false;
    }
    return {
        user_id: getCookie("user_id"),
        real_name: real_name,
        id_card_number: id_card,
        id_card_pic_f: id_card_pic_f,
        id_card_pic_b: id_card_pic_b,
        id_card_pic_h: id_card_pic_h
    }
}

//测试姓名是否正确
function testRealName(val){
    if (!(/^[\u4E00-\u9FA5]{2,5}$/.test(val))) {
        layer.tips("请输入真实姓名！", "#real-name", {time:1500});
        $("#real-name").css("border","1px solid red");
    	return false;        
    } else {
        $("#real-name").css("border","1px solid #e5e5e5");
    	return true; 
    }
}
//测试身份证是否正确
function testIDCard(val){
    if (!(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(val))) {
        layer.tips("请输入正确的身份证号！", "#id-card-number", {time:1500});
        $("#id-card-number").css("border","1px solid red");
    	return false;        
    } else {
        $("#id-card-number").css("border","1px solid #e5e5e5");
    	return true; 
    }
}

/**
 * 点击保存按钮事件
 */
$("#ajaxSave").click(function (e) { 
    e.preventDefault();
    ajaxSendCertificate(); //提交审核
});

$(".boxGroup #real-name").blur(function (e) { 
    e.preventDefault();
    testRealName($(this).val());
});
$(".boxGroup #id-card-number").blur(function (e) { 
    e.preventDefault();
    testIDCard($(this).val());
});
$("#js-person-exu").click(function () {
    $(".cki-rowbox .example").toggle();
});
/**
 * 根据实名认证状态，渲染提示语，按钮
 * 
 * @author ZhengGuoQing
 * @param {any} status 
 */
function renderStatus(status){
    var $txt = $("#saveTxt");
    if (status == "1" || status == "2") {
        //正在认证中或已经认证成功，去掉图片上的重新上传字样，不绑定上传图片的事件
        $(".js-person-reload").remove();
        $(".js-person-upbtn").attr("disabled",true);
    } else {
        //未成功认证，加载上传图片的事件
        bindCertificateUpload(); //绑定上传证书收费事件
    }
    switch (status) {
        case "1":
            $txt.html("审核认证中！");
            Clickable(true);
            return ;
        case "2":
            $txt.html("您已实名认证！");
            Clickable(true);
            return ;
        case "3":
            $txt.html("认证失败！");
            Clickable(false, "重新认证");
            return ;
        case "4":
            $txt.html("认证超时！");
            return ;
        default: 
            $txt.css("display","none");
    }
}

/**
 * 是否禁止点击保存按钮的点击事件，不让点击
 * 
 * @author ZhengGuoQing
 * @param {any} html 显示的html
 */
function Clickable(type, html){
    var html = html || "提交";
    $("#ajaxSave").html(html);
    if (type) {
        $("#ajaxSave").css({
            "background-color": "#ccc",
            "cursor":"default"
        });
        $("#ajaxSave").off();
    } else {

    }
}