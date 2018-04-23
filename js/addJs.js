/**
 * Created by gs on 2017/4/12 0012.
 */
var meetFlag = getLocationParam("meet");
//五角星评分展示
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
//获取地址
function get_adress(address) {
    if(!address.txt_address || address.txt_address == 0 || address.txt_address == null || address.txt_address == ""){
        return "[未知]";
    }else{
        return address.txt_address;
    }
}
//弹窗提示
function alertUploadMsg(msg) {
    var d = dialog({
        fixed:true,
        title: '提示',
        content: msg
    });
    d.show();
    setTimeout(function () {
        d.close().remove();
    },2000);
}
/*
 * 约见页面获取数据获取和展示
 * */
var yuePerMsg = {};
$(function () {
    if(meetFlag === "0") {
        $(".meetTip").css("display","none");
    };
    if(window.location.href.indexOf("appointment.html") != -1){
        $.ajax({
            url:baseURL+'get_user_info/'+getLocationParam("id"),
            type:'post',
            data:{
                user_id:getCookie("user_id")
            },
            dataType:"json",
            success:function (res) {
                $(".sjsxxLeft img").attr('src',res.data.path?res.data.path:'./images/selec.jpeg');
                $(".sjsxxRight .personMsg").html(res.data.nick_name+'　|　'+res.data.sex+'　|　'+res.data.experience+'　|　'+res.data.works_count+'件作品');
                $(".stars").prepend(getStart(res.data.credit_val));
                $(".personMsgAddress span").html(get_adress(res.data));
            },
            error:function () {
                alertUploadMsg("页面数据获取异常");
            }
        });
    };
});

$(function() {
    /*index.js分离的*/
    /**case.html页面切换**/
    var timer,timers,num = 0,arrTimer=[],countNum = 10;
    $('div.paymentMain div.fsyj ul li').click(function() {
        $('div.paymentMain div.fsyj ul li').removeClass('cur');
        $(this).toggleClass('cur');
        if ($('div.paymentMain div.fsyj ul li').index($(this)) == 0) {
            $('div.hzyx').css({
                'display': 'block'
            });
            $('div.zjxd').css({
                'display': 'none'
            });
        } else {
            $('div.hzyx').css({
                'display': 'none'
            });
            $('div.zjxd').css({
                'display': 'block'
            });
        }
    });
    /**case.html页面切换**/
    /**支付宝，微信，画客网支付方式切换**/
    $('div.paymentMainDiv ul.zfUl li').click(function() {
        $('div.paymentMainDiv ul.zfUl li').removeClass('cur');
        $(this).toggleClass('cur');
        var yjId = $(".linkYue").attr("data-id");
        if($(this).hasClass("wxli")) {
            for(var i = 0;i < arrTimer.length;i++){
                clearInterval(arrTimer[i]);
            };
            getErweima(yjId,$(".seeYou").val(),'meet','WxPay');
        }else if($(this).hasClass("zfbli")){
            for(var i = 0;i < arrTimer.length;i++){
                clearInterval(arrTimer[i]);
            };
            getErweima(yjId,$(".seeYou").val(),'meet','AliPay');
        };
        var liIndex = $('div.paymentMainDiv ul.zfUl li').index($(this));
        $('div.ewm').css({
            'display': 'none'
        });
        $('div.ewm:eq(' + liIndex + ')').css({
            'display': 'block'
        });
    });
    /**支付宝，微信，画客网支付方式切换**/
    /**点击账户充值显示div.smrq**/
    $('span.zhcz').click(function() {
        $('div.smrq').css("display", "block");
        $(".qrzfYm").css("display", "none");
    });
    /**点击账户充值显示div.smrq**/
    /**充值方式切换**/
    $('div.smrq ul li').click(function() {
        $('div.smrq ul li').removeClass('cur');
        $(this).toggleClass('cur');
        $(this).parents('div.smrq').find('div.sewm').css('display', 'none');
        var liIndex = $('div.smrq ul li').index($(this));
        $('div.sewm:eq(' + liIndex + ')').css({
            'display': 'block'
        });
    });
    /**充值方式切换**/
    /**点击.close关闭div.smrq**/
    $('div.smrq div.smrqTop span.close').click(function() {
        $(this).parents('div.smrq').removeClass('cur');
    });
    /**点击.close关闭div.smrq**/
    /*END*/

    /*点击输入框显示可选金额*/
    $(".meetTip .seeYou").click(function(e) {
        e.stopPropagation();
        $(".meetTip ul").css("display", "block");
        $(".meetTip ul li").click(function() {
            $(".meetTip .seeYou").val("");
            if ($(this).html() == "输入金额") {
                $(".meetTip .seeYou").removeAttr("readonly").focus().attr("placeholder", "输入范围1~200");
            } else {
                $(".meetTip .seeYou").val($(this).html());
            }
            $(".meetTip ul").css("display", "none");

            if ($(".meetTip .seeYou").val() !== "") {
                $(".meetTip .yjxfInp").prop('checked', true);
                // $(".fkfs").css("display","block");
                $(".yueDing").css("display", "block");
            }
            $(".yueDing").css("display", "block");
        });
        $(document).click(function() {
            $(".meetTip ul").css("display", "none");
        });
    });
    /*点击箭头显示可选金额*/
    $(".meetTip .seeAfter").click(function(e) {
        e.stopPropagation();
        $(".meetTip ul").css("display", "block");
        $(".meetTip ul li").click(function() {
            $(".meetTip ul").css("display", "none");
        });
        $(document).click(function() {
            $(".meetTip ul").css("display", "none");
        });
    });

    /*点击复选框显示提示信息*/
    $(".meetTip .yjxfInp").click(function() {
        if ($(this).prop('checked')) {
            $(".yueDing").css("display", "block");
            $(".meetTip .seeYou").removeAttr("readonly").focus().val("28.8");
        } else {
            $(".yueDing").css("display", "none");
        };
    });
    /**
     * 点击发送约见按钮出现付款方式
     */
    $(".meetSend input").click(function() {
        getYeNum();
        var str4 = $('.addressIpt').val(),
            str5 = $(".appointDetail").val(),
            pre = "",yjId = '';
        var meetTime = $("#dateinfo").val();
        var str8 = meetTime.split(" ")[0].replace(/年/,"-").replace(/月/,"-").replace(/日/,"")+" "+meetTime.split(" ")[1];
        if ($(".meetTip .yjxfInp").prop('checked')){
            pre = $(".seeYou").val();
        };
        yuePerMsg.long_lat_address = str4;
        yuePerMsg.address = str4;
        yuePerMsg.meet_time = str8;
        yuePerMsg.remark = $("textarea.lybz").val();
        yuePerMsg.price = pre;
        yuePerMsg.invite_name = str5;
        yuePerMsg.user_id = getCookie('user_id');
        yuePerMsg.user_id_to = getLocationParam('id');
        if(str5.length > 20 || str5.length < 1){
            alertUploadMsg('请填写1~20个文字');
            return false;
        }else if(str4.length < 1){
            alertUploadMsg('请填写详细地址！');
            return false;
        }else if(!$("#dateinfo").val().length){
            alertUploadMsg('请选择约见日期！');
            return false;
        }else if ($(".meetTip .yjxfInp").prop('checked')) {
            //有约见费
            $(".fkfsWrap").css("display", "block");
            $(".paymentMainDiv.fkfs").css("display","block");
            /*支付生成二维码*/
            AJAX(false);
            return false;
        } else {
            AJAX(true);
        };
        function AJAX(flag) {
            console.log(yuePerMsg);
            $.ajax({
                url:baseLink+'quoteApi/add_meet_info',
                type:'post',
                data:yuePerMsg,
                dataType:'json',
                success:function (res) {
                    console.log(res);
                    if(res.success){
                        if(flag){
                            //没有约见费用
                            $(".success_send_wrap").addClass("success_send_show");
                            $(".success_send").addClass("success_send_show");
                            return false;
                        }else{
                            // 有约见费用
                            yjId = res.message;
                            $(".linkYue").attr("data-id",yjId);
                            $(".ewmLeft1 .colortex a").html(pre);
                            $(".ewmLeft2 .colortex a").html(pre);
                            $(".meetDetails .jyje a").html(pre);
                            $(".meetDetails .yjsj a").html(meetTime);
                            $(".meetDetails .yjdd a").html(str4);
                            getErweima(yjId,$(".seeYou").val(),'meet','AliPay');
                        };
                    }else{
                        alertUploadMsg(res.message);
                    };
                },
                error:function () {
                    alertUploadMsg('数据上传失败！');
                }
            });
        };
        //向后台发送数据保存为常用地址
        $.ajax({
            url:baseURL+'change_user_coordinate',
            type:'post',
            data:{
                long_lat_address:str4,
                long_lat_address_jd:str4,
                set_cur_city:"",
                is_default:0,
                user_id:getCookie("user_id")
            },
            dataType:'json',
            success:function (data) {
                console.log(data);
            }
        });
    });
    //刷新二维码
    // $(".ewm .ewmLeft").mouseenter(function () {
    //     $(this).find(".reflashewm").show();
    //     $(this).find(".reflashewm").click(function () {
    //         var type = $(this).attr("data-modeltype");
    //         var meetId = $(".linkYue").attr("data-id");
    //         console.log(type + "---" + meetId);
    //         getErweima(meetId,$(".seeYou").val(),'meet',type);
    //     });
    // }).mouseleave(function () {
    //     $(this).find(".reflashewm").hide();
    // });
    /*点击其他地方qrzfYm消失*/
    // $(".qrzfYm").click(function (e) {
    //     e.stopPropagation();
    // });
    // $(document).click(function (e) {
    //     e.stopPropagation();
    //     $(".qrzfYm").css("display","none");
    // });
    /**
     * 约见二维码生成
     * @param id[约见id]
     * @param paymoney
     * @param mod [支付模块meet]
     */
    function getErweima(id,paymoney,mod,paymodel) {
        $.ajax({
            url:baseLink+'payapi/get_pay_qrcode',
            type:"post",
            data:{
                user_id:getCookie("user_id"),     //支付用户的id
                totalAmount:paymoney,             //费用总数
                pay_type:paymodel,                //AliPay：支付宝支付，WeiXinPay：微信支付
                pay_model:mod,                    //支付模块
                model_id:id                       //约见id
            },
            dataType:"json",
            success:function (res) {
                console.log(res);
                if(res.success){
                    if(paymodel == "AliPay") {
                        $(".ewmLeft1 img.zwwem").attr("src",res.data.qr_path);
                    }else{
                        $(".ewmLeft2 img.zwwem").attr("src",res.data.qr_path);
                    };
                    changeWeb(res.data.out_trade_no);
                    //定时查询支付状态
                    arrTimer.push(timer = setInterval(function () {
                        console.log(res.data.out_trade_no);
                        console.log(res);
                        getPayStaus(res.data.out_trade_no,timer);
                    },3000));
                }else{
                    alertUploadMsg(res.message);
                };
            },error:function () {
                alertUploadMsg("数据获取异常！");
            }
        });
    };
    /**
     * 充值二维码生成
     * @param id[空]
     * @param paymoney
     * @param mod [支付模块other]
     */
    function getPostErweima(id,paymoney,mod,ele,paymodel) {
        console.log(mod);
        console.log(id);
        num++;
        var stopAjax = $.ajax({
            url:baseLink+'payapi/get_pay_qrcode',
            type:"post",
            data:{
                user_id:getCookie("user_id"),       //支付用户的id
                totalAmount:paymoney,               //费用总数
                pay_type:paymodel,                  //AliPay：支付宝支付，WeiXinPay：微信支付
                pay_model:mod,                      //支付模块
                model_id:id                         //约见id
            },
            dataType:"json",
            success:function (res) {
                console.log(res);
                if(res.success){
                    ele.parent().find("img").attr("src",res.data.qr_path);
                    //定时查询充值支付状态
                    arrTimer.push(timers = setInterval(function () {
                        console.log(res.data.out_trade_no);
                        getPostStaus(res.data.out_trade_no,timers);
                    },3000));
                }else{
                    alertUploadMsg(res.message);
                    for(var i = 0;i<arrTimer.length;i++){
                        clearInterval(arrTimer[i]);
                    };
                };
            }
        });
        window.stopAjax = stopAjax;
    };

    //点击跳转到网页版支付
    function changeWeb(key) {
        $(document).on("click",".TzLink",function () {
            console.log(key);
            $.ajax({
                url:baseLink+'payapi/turn_to_pay_page/'+key,
                type:"get",
                dataType:"html",
                success:function (res) {
                    console.log(res);
                    $(".webHtml").html(res);
                },error:function () {
                    alertUploadMsg("数据获取异常！");
                }
            });
        });
    };
    //获取约见的支付状态
    function getPayStaus(key,timer) {
        $.ajax({
            url:baseLink+'payapi/get_pay_status',
            type:"post",
            data:{
                user_id:getCookie('user_id'),
                out_trade_no:key
            },
            dataType:"json",
            success:function (res) {
                if(res.success) {
                    console.log(res);
                    if(res.data.trade_status == "TRADE_SUCCESS") {
                        // 约见费用付款成功
                        $(".fkfsWrap").css("display", "none");
                        $(".paymentMainDiv.fkfs").css("display","none");
                        $(".success_send_wrap").addClass("success_send_show");
                        $(".success_send").addClass("success_send_show");
                        for (var i = 0;i < arrTimer.length;i++) {
                            clearInterval(arrTimer[i]);
                        };
                    };
                    console.log(arrTimer);
                }else{
                    for (var i = 0;i < arrTimer.length;i++) {
                        clearInterval(arrTimer[i]);
                    };
                    alertUploadMsg("支付失败！");
                };
            }
        });
    };
    //获取充值的支付状态
    function getPostStaus(key,timer) {
        $.ajax({
            url:baseLink+'payapi/get_pay_status',
            type:"post",
            data:{
                user_id:getCookie('user_id'),
                out_trade_no:key
            },
            dataType:"json",
            success:function (res) {
                if(res.success) {
                    console.log(res);
                    if(res.data.trade_status == "TRADE_SUCCESS") {
                        // 约见费用付款成功
                        $(".smrq").css("display", "none");
                        getYeNum();
                        for (var i = 0;i < arrTimer.length;i++) {
                            clearInterval(arrTimer[i]);
                        };
                    };
                }else{
                    for (var i = 0;i < arrTimer.length;i++) {
                        clearInterval(arrTimer[i]);
                    };
                    alertUploadMsg("支付失败！");
                };
            }
        });
    }

    //获取余额
    function getYeNum() {
        $.ajax({
            url:baseLink+'payapi/get_blance',
            type:"post",
            dataType:"json",
            data:{
                user_id:getCookie("user_id")
            },
            success:function (res) {
                console.log(res);
                if(res.success){
                    $(".ewm .dqye i").html((res.message-0).toFixed(2));
                    if(res.message < $(".jyje a").html()){
                        $(".dqye p").css("display","block");
                    };
                }else{
                    alertUploadMsg(res.message);
                };
            },error:function () {
                alertUploadMsg("余额获取失败！");
            }
        });
    };
    //短信验证码获取
    $(".fkfsYzmHq").click(function () {
        var $val = $(".fkfsPub").val();
        if(phoneValid($val)){
            picCheck($(this),$val);
        }else{
            $(".fkfsPub").addClass("borderRed");
        };
    });
    $(".fkfsPub").keyup(function () {
        var $val = $(this).val();
        if(phoneValid($val)){
            $(this).removeClass("borderRed");
        }else{
            $(this).addClass("borderRed");
        };
    });
    $(document).on("click","#appointPicCode",function () {
        countNum++;
        $(this).attr('src', 'images/loading.gif');
        setTimeout(function () {
            $("#appointPicCode").attr('src', baseLink + 'index.php/verifycode/index/' + countNum);
        },300);
    });
    //余额支付输入键盘弹起金额数据联动
    $(".wantPay").keyup(function () {
        //终止之前的请求
        if(num != 0){
            stopAjax.abort();
        };
        $(this).parent().find(".willPay span").html(($(this).val()-0).toFixed(2));
        $(this).parent().find("img").attr("src","images/zwwem.png");

        var num1 = $(this).val(),
            num2 = "",
            num3 = $(this).parent().find(".willPay span").html(),
            $this = $(this),
            modeltype = $(this).attr("data-modeltype");
        //键盘弹起生成二维码
        if(num1 > 0) {
            if(num1.indexOf(".") != -1 && num1.split(".")[1].length > 0){
                getPostErweima(num2,num3,'other',$this,modeltype);
            }else if(num1.indexOf(".") == -1){
                getPostErweima(num2,num3,'other',$this,modeltype);
            };
        }else if(num1 == ""){
            $this.parent().find(".willPay span").html("0.00");
            $this.parent().find("img").attr("src","images/zwwem.png");
        };
    });

    //余额支付确定
    $(".fkfsForm .fkfsSure").click(function () {
        var $val = $(".fkfsPub").val();
        if(phoneValid($val)){
            $.ajax({
                url:baseLink+"payapi/pay_by_blance",
                type:"post",
                data:{
                    user_id:getCookie("user_id"),
                    pay_model:"meet",
                    model_id:$(".linkYue").attr("data-id"),
                    code:$(".fkfsYzm").val()
                },
                dataType:"json",
                success:function (res) {
                    console.log(res);
                    if(res.success){
                        console.log("清除定时器");
                        $(".qrzfYm").css("display","none");
                        // 约见费用付款成功
                        $(".fkfsWrap").css("display", "none");
                        $(".paymentMainDiv.fkfs").css("display","none");
                        $(".success_send_wrap").addClass("success_send_show");
                        $(".success_send").addClass("success_send_show");
                        for (var i = 0;i < arrTimer.length;i++) {
                            clearInterval(arrTimer[i]);
                        };
                    }else{
                        for (var i = 0;i < arrTimer.length;i++) {
                            clearInterval(arrTimer[i]);
                        };
                    };
                },error:function (res) {
                    for (var i = 0;i < arrTimer.length;i++) {
                        clearInterval(arrTimer[i]);
                    };
                    alertUploadMsg(res.message);
                }
            });
        }else{
            alertUploadMsg("请输入正确的手机号！")
        }

    });

    /**
     * 余额支付
     * @param $ele
     * @param phone
     */
    function hqdxyzm($ele,phone) {
        $.ajax({
            url: baseURL + 'get_reg_sms_code',
            type: 'post',
            data: {
                type: "pay",
                mobile: phone,
                tokeen: $(".appointPicVal").val().toUpperCase()
            },
            dataType: 'json',
            success: function (res) {
                console.log("同意验收");
                console.log(res);
                if (res.success) {
                    SMSCountdown($ele);
                } else {
                    alertUploadMsg(res.message);
                };
            },
            error: function () {
                alertUploadMsg("验证码获取失败！");
            }
        });
    };

    function SMSCountdown($dom) {
        var second = 60;
        function render() {
            var value = second + "秒后重试";
            $dom.html(value);
            second--;
            if (second == 0) {
                window.clearInterval(token);
                $dom.html("获取验证码");
            }
        };
        var token = window.setInterval(render, 1000);
    };
    //验证图形验证码
    function picCheck(ele,$val) {
        $.ajax({
            url: "https://www.huakewang.com/verifycode/check",
            type: "POST",
            dataType: "JSON",
            data: {
                secode: $(".appointPicVal").val().toUpperCase()
            },
            success: function(res) {
                console.log(res);
                if (res.success) {
                    hqdxyzm(ele,$val);
                } else {
                    alertUploadMsg("请输入正确的图形验证码！");
                    $('#appointPicCode').click();
                };
            }
        });
    };

    /*使用余额支付*/
    $(".fkfsForm .fkfsRequire").click(function () {
        $(this).parent().parent().css("display","none");
    });
    /*点击关闭支付宝*/
    $(".closeFkfs").click(function() {
        $(".fkfsWrap").css("display", "none");
        $(this).parents('.paymentMainDiv.fkfs').css("display","none");
    });
    /*点击遮罩层关闭支付方式*/
    $(".fkfsWrap").click(function () {
        $(this).css("display", "none");
        $(this).next('.fkfs').css("display","none");
    });
    /*点击充值方式关闭*/
    $(".closeSmrq").click(function() {
        $(".smrq").css("display", "none");
    });
    //验证手机号
    function phoneValid($val) {
        if($val != "" && /^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|16|17|18|19)\d{9}$/.test($val)){
            return true;
        }else{
            return false;
        };
    };
    /*点击确认支付充值*/
    $(".qrzf").click(function(e) {
        e.stopPropagation();
        $(".qrzfYm").css("display", "block");
        $(".smrq").css("display", "none");
        $(".closeQrzfYm").click(function() {
            $(".qrzfYm").css("display", "none");
        });
    });


      /*-------------------------------------------------*/

    // var id1 = -1, id2 = -1;
    // ssxLd(id1, id2, $(".divXlUl1"));
    // $(document).on('change', ".divXlUl1", function () {
    //     $('.divXlUl2').find("option.ls").remove();
    //     $('.divXlUl2').find("option").first().html("--城市--");
    //     $('.divXlUl3').find("option.ls").remove();
    //     $('.divXlUl3').find("option").first().html("--区域--");
    //     var citiId = $(this).find("option:selected").attr('data-value');
    //     ssxLd(citiId, id2, $('.divXlUl2'));
    // });
    // $(document).on('change', ".divXlUl2", function () {
    //     $('.divXlUl3').find("option.ls").remove();
    //     var citiId = $(this).find("option:selected").attr('data-value');
    //     ssxLd(citiId, id2, $('.divXlUl3'));
    // });
    //选择常用地址
    getuseraddress();
});
