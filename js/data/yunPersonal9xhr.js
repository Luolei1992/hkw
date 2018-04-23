/**
 * 进入网页就需要请求两个数据（登录人的报价历史/别人给发的报价）
 */
$(function () {
    $("body").on("click",".btnWrapTwo .BtnC",function () {
        var $parent = $(this).parent();
        var $parentN = $(this).parent().next();
        var $parentP = $(this).parent().prev();
        $parentN.css("display","block").find(".BtnCtcC").click(function () {
            $parentN.css("display","none");
        });
        $parentN.find(".BtnCtcS").click(function () {
            $parentN.css("display","none");
            //判断是手动取消还是时间到了系统自动取消的,需要后台传值
            $parentP.html("您已取消报价！/ 对方超时未处理，已取消报价！");
            $parent.find("button").css("display","none");
            $(this).parent().parent().find(".xmDelate").css("display","block");
        });

        $parentN.find(".BtnCtcSD").click(function () {
            $parentN.css("display","none");
            //判断是手动取消还是时间到了系统自动取消的,需要后台传值
            $parentP.html("您已拒绝该报价！");
            $parent.find("button").css("display","none");
        });
    });
    $("body").on("click",".seeBj",function () {
        $(this).parent().parent().css("display","none");
    });
    $('#main-body.personal div.right div.neirong div.neirong-top div.wddt span').click(function () {
        $(this).parent().parent().next().find(".sele2 span").html("发送时间：");
    });
    $('#main-body.personal div.right div.neirong div.neirong-top div.xttz span ').click(function () {
        $(this).parent().parent().next().find(".sele2 span").html("接收时间：");
    });

    srueConfirm();
    $("body").on("click",".BtnS",function () {
        $(this).parent().next().next().css("display","block");
    });
});