$(function () {
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
    };
    function testPhone(val){
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
            layer.msg("请输入正确手机号！",{time:1000});
            return false;
        } else {
            return true;
        }
    }
    function testSMSCode(val){
        if (!(/^\d{4}$/.test(val))) {
            layer.msg("请输入4位数字短信验证码！",{time:1000});
            return false;
        } else {
            return true;
        }
    }
    function testPicVal(val) {
        if(!val){
            layer.msg("请输入图形验证码！",{time:1000});
            return false;
        }else{
            return true;
        }
    }
    function testPassword(val) {
        if(!val){
            layer.msg("请输入密码！",{time:1000});
            return false;
        }else{
            return true;
        }
    }
    // //获取注册状态
    // $('.shoujiInput').on('blur', function() {
    //     var _this_val = $(this).val();
    //     $.ajax({
    //         url: urlLocalhost + newhuakwang + "get_reg_status",
    //         type: "post",
    //         dataType: "json",
    //         data: {
    //             username: _this_val
    //         },
    //         success: function(data) {
    //             if (data.success) {
    //                 if (data.data.reg_status == 0) {
    //                     $('.sp2yz.sp2yz_message:first').html("该用户未被注册！请注册后再进行登录！");
    //                 };
    //             };
    //         }
    //     });
    // });
    function dlLast(username,password) {
        $.ajax({
            url: baseURL + "login",
            type: "post",
            dataType: "json",
            data: {
                username: username,
                password: password
            },
            success: function(data) {
                //登录成功[返回头像地址，用户姓名，手机号码，qq..]
                if (data.success) {
                    // 设置环信id到cookie里
                    // setCookie("hxid", data.data.hxid);
                    alertUploadMsg('登录成功！');
                    setTimeout(function() {
                        window.location.href = 'https://www.huakewang.com';
                    }, 700);
                } else {
                    alertUploadMsg(data.message);
                }
            },
            error: function(data) {
                alertUploadMsg('登录失败！');
            }
        })
    };
    /**
     * 注册发送
     */
    function submit_reg_send(username,passwd,code) {
        $.ajax({
            url: baseURL + "/reg",
            type: "post",
            dataType: "json",
            data: {
                "username": username,
                "passwd": passwd,
                "code": code
            }
        }).done(function(data) {
            if (data.success) {
                alertUploadMsg("注册成功！");
                // setCookie("hxid", data.data.hxid);
                dlLast(username,password);
                //初始化环信,代码在head.html页
            } else {
                alertUploadMsg(data.message);
            }
        })
    }
    function ajaxGetSMSCode(phone, $dom,$type) {
        $.ajax({
            url: baseURL+'get_reg_sms_code', //真实接口
            type: 'POST',
            dataType: 'JSON',
            data: {
                user_id: getCookie("user_id"),
                type: $type,
                mobile: phone,
                tokeen: $dom.parents(".js-send-blis").find(".bindIptVal").val().toUpperCase()
            }
        })
            .done(function(req) {
                if (req.success) {
                    SMSCountdown($dom);
                }
                layer.msg(req.message,{time:1500});
            })
            .fail(function(err) {
                console.log(err);
            });
    }
    function SMSCountdown($dom){
        var second = 60;
        function render(){
            var value = second + "秒后重试";
            $dom.html(value);
            second --;
            if (second == 0) {
                window.clearInterval(token);
                $dom.html("获取验证码");
            }
        }
        var token = window.setInterval(render, 1000);
    }
    //验证图形验证码
    function picCheck(phone,ele,$type) {
        $.ajax({
            url: "https://www.huakewang.com/verifycode/check",
            type: "POST",
            dataType: "JSON",
            data: {
                secode: ele.parents(".js-send-blis").find(".bindIptVal").val().toUpperCase()
            },
            success: function(res) {
                if (res.success) {
                    ajaxGetSMSCode(phone, ele,$type);
                } else {
                    layer.msg("请输入正确的图形验证码！",{time:1000});
                    $('.bindPicVal').click();
                };
            }
        });
    };
    //切换
    $(document).on("click","#js-send-aul dd",function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        if($(this).html() == "未注册手机号") {
            $(".bindFst").addClass("cur");
            $(".bindSec").removeClass("cur");
        }else if($(this).html() == "已注册手机号"){
            $(".bindSec").addClass("cur");
            $(".bindFst").removeClass("cur");
            $(".bindSec .bindPicVal").attr("src","https://www.huakewang.com/index.php/verifycode/index/1");
        }
    })
    /*图片验证码*/
    var bindCodePlus = 10;
    $(document).on("click",".bindPicVal",function () {
        bindCodePlus++;
        var $th = $(this);
        $th.attr('src', 'images/loading.gif');
        setTimeout(function () {
            $th.attr('src', baseLink + 'index.php/verifycode/index/' + bindCodePlus);
        },300);
    });
    //获取短信验证码
    $(document).on("click",".js-bindphone-code1",function () {
        var $dom = $(this);
        var phone = $(".js-bindphone-phone1").val();
        if (testPhone(phone) && $dom.html() == "发送验证码" ) {
            picCheck(phone, $dom,"change");
        }
    });
    $(document).on("click",".js-bindphone-code2",function () {
        var $dom = $(this);
        // var phone = $(this).parents(".js-send-blis").find(".js-bindphone-phone2").val();
        var phone = $(".js-bindphone-phone2").val();
        if (testPhone(phone) && $dom.html() == "发送验证码" ) {
            picCheck(phone, $dom,"login");
        }
    });
    //确认绑定
    $(document).on("click",".bindSure",function () {
        var $phone = $(this).parents(".js-send-blis").find(".phonenum input").val(),
            $code = $(this).parents(".js-send-blis").find(".codeipt").val(),
            $pic = $(this).parents(".js-send-blis").find(".bindIptVal").val(),
            $pass = $(this).parents(".js-send-blis").find(".js-bindphone-password").val(),
            prm = getLocationParam("type"),val = $(this).attr("data-val");
        if(testPhone($phone) && testPicVal($pic) && testSMSCode($code) && testPassword($pass)){
            $.ajax({
                url:baseURL+'bind_third_login',
                type:"post",
                data:{
                    username : $phone,
                    password : $pass,
                    code : $code,
                    platform : prm
                },
                dataType:"json",
                success:function (res) {
                    if(res.success) {
                        // dlLast($phone,$pass);
                        window.location.reload();
                    }else{
                        layer.msg(res.message,{time:1000});
                    };
                }
            })
        }
    });
})