var urlLocalhost = "https://www.huakewang.com/";
var newhuakwang = "hkw_newapi/";
var numRegister = 10;
(function() {
    //弹窗提示
    function alertUploadMsg(msg) {
        var d = dialog({
            fixed: true,
            title: '提示',
            content: msg
        });
        d.show();
        setTimeout(function() {
            d.close().remove();
        }, 2000);
    };
    setTimeout(function() {
        $('#wrapYZM').attr('src', urlLocalhost + 'index.php/verifycode/index/2');
    }, 100);
    $('#wrapYZM').on('click', function() {
        numRegister++;
        $(this).attr('src', 'images/loading.gif');
        setTimeout(function() {
            $('#wrapYZM').attr('src', urlLocalhost + 'index.php/verifycode/index/' + numRegister);
        }, 500);
    });
    $('#formzc input').keyup(function() {
        //验证码
        if ($(this).parent().is('.yxyz')) {
            if (this.value == "" || (this.value != "" && !/^[a-zA-Z0-9]{4}$/.test(this.value))) {
                $(this).addClass("borderRed");
            } else {
                $(this).removeClass("borderRed");
            }
        };
        if ($(this).parent().is('.sjmm')) {
            if (this.value == "" || (this.value != "" && !/^[a-zA-Z0-9]{4}$/.test(this.value))) {
                $(this).addClass("borderRed");
            } else {
                $(this).removeClass("borderRed");
            }
        };
        //密码
        if ($(this).parent().is('.password_real')) {
            if (this.value == "" || (this.value != "" && !/^[a-zA-Z0-9]{6,16}$/.test(this.value))) {
                $(this).addClass("borderRed");
            } else {
                $(this).removeClass("borderRed");
            };
        };
        //验证手机号
        if ($(this).parent().is('.shouji')) {
            if (this.value == "" || (this.value != "" && !/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|16|17|18|19)\d{9}$/.test(this.value))) {
                $(this).addClass("borderRed");
                $(".shouji label").html("请输入正确的手机号！");
            } else {
                $(this).removeClass("borderRed");
                $(".shouji label").html("");
            }
        };
        
    }).blur(function() {
        $(this).triggerHandler("keyup");
    });
    // var tongyiTrueFalse = true;
    var waitTime = 60;
    // $(document).on("click",".tongyi",function () {
    //     tongyiTrueFalse = !tongyiTrueFalse;
    //     $(this).attr("value",tongyiTrueFalse);
    // })
    function picCheckIs(val) {
        console.log(val);
        if ($('#formzc input[name="pohone"]').hasClass("borderRed") || $(".yxyzInput").hasClass("borderRed")) {
            // alertUploadMsg('请填写正确的手机号');
            return false;
        } else if($(".yxyzInput").val() == ""){
            return false;
        }else  {
            $.ajax({
                url: "https://www.huakewang.com/verifycode/check",
                type: "POST",
                dataType: "JSON",
                data: {
                    secode: $('#formzc input[name="yanzhengma"]').val().toUpperCase()
                },
                success: function(res) {
                    console.log(res);
                    if (res.success) {
                        $(".sjmm input,.password_real input").removeClass("borderRed");
                        getCodeMsgReject(val);
                    } else {
                        alertUploadMsg("图形验证码错误");
                        $('#formzc input[name="yanzhengma"]').val('').addClass("borderRed");
                        $('#wrapYZM').click();
                    }
                }
            });
        };
    };
    function getCodeMsgReject(_mobile_val) {
        console.log(_mobile_val);
        if ($('#formzc input[name="pohone"]').hasClass("borderRed")) {
            alertUploadMsg('请填写正确的手机号');
        } else {
            //hkapi/get_reg_sms_code type:"reg"注册
            $.ajax({
                url: urlLocalhost + newhuakwang + "/get_reg_sms_code",
                type: "post",
                dataType: "json",
                data: {
                    "type": 'reg',
                    "mobile": _mobile_val,
                    "tokeen": $(".yxyzInput").val().toUpperCase()
                }
            }).done(function(data) {
                if (data.success) {
                    $('#verifiction').css('display', 'none');
                    $('#verifiction_timewait').css('display', 'block');
                    var ddd = setInterval(function() {
                        if (waitTime == 0) {
                            $('#verifiction').css('display', 'block');
                            $(".sjmm input").val("").removeClass("borderRed");
                            $(".password_real input").val("").removeClass("borderRed");
                            $('#verifiction_timewait').css('display', 'none');
                            clearInterval(ddd);
                        } else {
                            $('#verifiction_timewait').html(waitTime + "s");
                            waitTime--;
                        }
                    }, 1000);

                } else {
                    alertUploadMsg('注册失败，请重新注册！');
                }
            })
        }
    }

    $("#verifiction").on("click", function() {
        var _mobile_val = $("#formzc .shouji input[name=pohone]").val();
        $('#formzc input[name="pohone"]').keyup();
        $('#formzc .yxyzInput').keyup();
        picCheckIs(_mobile_val);
    });

    $(".tongyi").on("click", function() {
        var _this_val = parseInt($(this).val());
        _this_val = (_this_val + 1) % 2;
        $(this).val(_this_val);
    });
    $("#user_register_send").on("click", function() {
        // var _s_k=$('#user_register_send').attr("submite-kind");
        $("#formzc input").keyup();
        // if(_s_k==1){
        //
        // }else{
        // $('#user_register_send').attr("submite-kind","1");
        submit_reg_check();
        // }
    });

    $("#formzc input[name=pohone]").on("blur", function() {
        var _input_val = $(this).val();
        $.ajax({
            url: urlLocalhost + newhuakwang + "get_reg_status",
            type: "post",
            dataType: "json",
            data: {
                username: _input_val
            },
            success: function(data) {
                if (data.success) {
                    if (data.data.reg_status == 1) {
                        $('.sp2_alert:first').css('visibility', 'visible');
                        $('#formzc input[name="pohone"]').addClass("borderRed");
                        $('.sp2_alert:first a').attr('href', 'forget-pass.html?phone=' + _input_val);
                    } else {

                    }
                }
            }
        })
    });
    $('#formzc input[name="pohone"]').on('keyup', function() {
        $('.sp2_alert:first').css('visibility', 'hidden');
        $('.sp2_alert:first a').attr('href', 'forget-pass.html');
    });

    function submit_reg_check() {
        // var input_v=0;var d_d=0;
        // if($('#formzc input[name="pohone"]').hasClass('borderRed')||$('#formzc input[name="pohone"]').val().length==0){
        //     return false;
        // };
        if ($('#dxyzma').hasClass('borderRed') || $('#dxyzma').val().length == 0) {
            // alertUploadMsg("请输入验证码！");
            return false;
        };
        if ($('.password_real input').hasClass('borderRed') || $('.password_real input').val().length == 0) {
            // alertUploadMsg("请输入密码！");
            return false;
        };
        if ($('.tongyi').val() == 0) {
            alertUploadMsg('请选择接受画客网使用协议！');
            return false;
        } else {
            submit_reg_send();
        };
    }
    /**
     * 注册发送
     */
    function submit_reg_send() {
        var _data = [$('#formzc input[name="pohone"]').val(),
            $('#dxyzma').val(),
            $('#formzc input[name="password_real"]').val()
        ];
        console.log(_data);
        $.ajax({
            url: urlLocalhost + newhuakwang + "/reg",
            type: "post",
            dataType: "json",
            data: {
                "username": _data[0],
                "passwd": _data[2],
                "code": _data[1],
                "secode":""
            }
        }).done(function(data) {
            console.log("注册");
            console.log(data);
            if (data.success) {
                alertUploadMsg("注册成功！");
                // setCookie("hxid", data.data.hxid);
                setTimeout(function() {
                    window.location.href = 'https://www.huakewang.com';
                }, 700);
                //初始化环信,代码在head.html页
            } else {
                $('#dxyzma').val("");
                alertUploadMsg(data.message);
            }
        })
    }
})();