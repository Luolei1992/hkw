/**
 * Created by gs on 2017/5/8 0008.
 */
$(function(){
    /*
     *思路大概是先为每一个required添加必填的标记，用each()方法来实现。
     *在each()方法中先是创建一个元素。然后通过append()方法将创建的元素加入到父元素后面。
     *这里面的this用的很精髓，每一次的this都对应着相应的input元素，然后获取相应的父元素。
     *然后为input元素添加失去焦点事件。然后进行用户名、邮件的验证。
     *这里用了一个判断is()，如果是用户名，做相应的处理，如果是邮件做相应的验证。
     *在jQuery框架中，也可以适当的穿插一写原汁原味的javascript代码。比如验证用户名中就有this.value，和this.value.length。对内容进行判断。
     *然后进行的是邮件的验证，貌似用到了正则表达式。
     *然后为input元素添加keyup事件与focus事件。就是在keyup时也要做一下验证，调用blur事件就行了。用triggerHandler()触发器，触发相应的事件。
     *最后提交表单时做统一验证
     */

    /*------------------------客户信息的验证--------------------*/
    //文本框失去焦点后
    $('form#signupForm input').keyup(function(){
        var $parent = $(this).parent();
        $parent.find(".formtips").remove();
        //验证用户名
        if( $(this).is('#username') ){
            if( this.value=="" || this.value.length < 2 ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            }
        };
        //验证邮件
        if( $(this).is('#email') ){
            if( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value)  ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
        //验证手机号
        if( $(this).is('#phone') ){
            if(this.value=="" || (this.value!="" && !/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|16|17|18|19)\d{9}$/.test(this.value))){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
    }).blur(function(){
        $(this).triggerHandler("keyup");
    });//end blur

    var permsg = {};
    //提交，最终验证。
    $('#formMsg1').click(function(){
        var $this = $(this);
        $("form#signupForm input[required]").trigger('keyup');
        var numError = $(this).parents("form").find('.borderRed').length;
        if(numError){
            // alertUploadMsg("请在完成客户信息必填项后再点击保存！");
            return false;
        }else {
            function switchShowTopTwo() {
                //点击保存切换为保存的状态
                var array1 = [];
                //把当前数据转换到保存状态
                $this.parent().parent().find(".numSave").each(function () {
                    array1.push($(this));
                });
                $this.parent().parent().parent().next().find(".numShow").each(function (idx) {
                    $(this).html(array1[idx].val())
                });
            };
            permsg = {
                "linkName":$(".yun-step-lab0 input").val(),
                "linkCompany":$(".yun-step-lab1 input").val(),
                "linkPhone":$(".yun-step-lab2 input").val(),
                "linkEmail":$(".yun-step-lab3 input").val()
            };
            newLinkPerson(permsg);
            switchShowTopTwo();
        };
    });
    
/*-------------------------------------项目信息验证------------------------*/
    $('form#yunProForm input').keyup(function() {
        //验证用户名
        if ($(this).is('#companyCall') ) {
            if (this.value == "" || this.value.length == 0) {
                $(this).addClass("borderRed");
            } else {
                $(this).removeClass("borderRed");
            };
        };
    }).blur(function(){
        $(this).triggerHandler("keyup");
    });
    //提交，最终验证。
    $('#formMsg2').click(function(){
        var $this = $(this);
        var flag = $("#dateinfo").val() == "";
        $("form#yunProForm input[required]").trigger('keyup');
        if(flag) {
            $("#dateinfo").addClass("borderRed");
        }else{
            $("#dateinfo").removeClass("borderRed");
        };
        var numError = $(this).parents("form").find('.borderRed').length;
        if(numError){
            // alertUploadMsg("请在完成项目信息必填项后再点击保存！");
            return false;
        }else {
            function switchShowTopTwo() {
                //点击保存切换为保存的状态
                var array1 = [],array2=[],array3 = [],str = '';
                //把当前数据转换到保存状态
                $this.parent().parent().find(".numSave").each(function () {
                    array1.push($(this));
                });
                $this.parent().parent().find("#uploadView li").each(function () {
                    array2.push($(this).find("img").attr("data-src"));
                    array3.push($(this).find("img").attr("data-size"));
                    str += '<div class="yunFujianWrap clearfix"><img title="预览" class="fl pubView" src="'+$(this).find("img").attr("src")+'" alt="" style="height: 48px;width: 48px;"><p title="'+$(this).find(".uploadViewName").html()+'">'+$(this).find(".uploadViewName").html()+'</p><span>'+$(this).find("img").attr("data-size")+'</span><a target="_blank" href="'+$(this).find("img").attr("data-file-path")+'">下载</a></div>';
                });
                $(".yun-messageShowAddR").html(str);

                $this.parent().parent().parent().next().find(".numShow").each(function (idx) {
                    $(this).html(array1[idx].val());
                });
                $this.parent().parent().parent().next().find(".yunFujianWrap").append();
            };
            switchShowTopTwo();
            newProjectMsg($("#companyCall").val(),$("#need").val(),$("#dateinfo").val());
        };
        breakWord();
    });
    /*------------------------------项目报价单-----------------------------*/
    $('div#yunPriceForm').on("keyup",'input:not(".yun-inputUnit,.yun-inputDetails,.yun-submitResult")',function() {
        //验证必填输入框
        if( $(this).is('input:not(".yun-inputUnit,.yun-inputDetails,yun-submitResult")') ){
            if( this.value==""){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            }
        }
    }).blur(function(){
        $(this).triggerHandler("keyup");
    });

    $(document).on("click",'#formMsg3',function(){
        var $this = $(this);
        $('form.yunMainPriceForm input:not(".yun-inputUnit,.yun-inputDetails,yun-submitResult")').trigger('keyup');
        var numError = $("#yunPriceForm").find('.borderRed').length;
        if(numError) {
            // alertUploadMsg("请在完成报价单必填项后再点击保存！");
            return false;
        }else {
            //显示付款方式
            $(".payWayWarring").css("display","none");
            proSaveShow(true);
        };
    });
    /*----------------------------------付款方式------------------------------------*/
    $('form#yunPayForm').on("keyup",' #yun-tepWay input:not(".yun-payNode")',function() {
        //验证必填输入框
        if($(this).is('#yun-tepWay input.yun-payPercent')){
            if(this.value == "" || this.value > 100){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
        if($(this).is('#yun-tepWay input.yun-payDes')){
            if(this.value == ""){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        }
    }).blur(function(){
        $(this).triggerHandler("keyup");
    });
    $(document).on("click",'#formMsg4',function(){
        var temp = 0;
        var $this = $(this);
        $('form#yunPayForm input:not(".yun-payNode")').trigger('keyup');
        var numError = $("#yunPayForm").find('.borderRed').length;
        if(numError){
            // alertUploadMsg("请在完成付款方式必填项后再点击保存！");
            return false;
        }else {
            $this.parents("#yunPayForm").find(".yun-payPercent").each(function () {
                temp += $(this).val()-0;
            });
            if(temp != 100){
                $this.parents("#yunPayForm").find(".yun-payPercent").addClass("borderRed");
            }else{
                if(!$("#tipMsgEditRe").hasClass("yunPubHide")){
                    $this.parents("#yunPayForm").find(".yun-payPercent").removeClass("borderRed");
                    payWayShowData();
                }else{
                    $('html').animate({
                        scrollTop: 963
                    }, 300);
                    alertUploadMsg("请先填写并保存项目报价单！");
                };
            };
        };
    });/*---------------------------------全部保存成功可点击提交报价---------------------------------*/

    $(document).on("click",".yun-reEdit",function () {
        var $grandpa = $(this).parent().parent().parent().prev();
        var temp = $(this).attr("data-num");
        $grandpa.find("input[type=submit]").removeClass("flag");
        $('#formMsg'+$(this).attr("data-num")).removeClass('flag'+$(this).attr("data-num"));
        if($(this).attr("data-num") == 2){
            //避免重复添加表单
            $(".priceTableWrap").html("");
            //付款方式展开为编辑状态
            $(".yunShowPayWay").addClass("yunPubHide");
            $(".yunEditPayWay").removeClass("yunPubHide");

            $(".yunYHZK,.payCouponTotal,.payCouponTotalP").css("display","none");
            $(".yunSzyh").val("");
            $(".yun-payTotal").val("0.00");
            $(".yun-payDiscountPic").val("(含税:0.00元)");

            $("#canMsg4").removeClass("canMsg").prop("disabled","disabled");

            $(".yun-payPercent,.yun-payNode,.yun-payDes,.yunSzyh").prop("readonly","readonly");
            $(".payWayWarring").css("display","block");

            $(".yunProgressMain ul li").eq(2).children("span").removeClass("yunOpacity");
            $(".yunProgressMain ul li").eq(3).children("span").removeClass("yunOpacity");
        }else if($(this).attr("data-num") == 3){
            if(window.location.href.indexOf("yunShow.html") != -1){
                $(".yun-payPercent,.yun-payNode,.yun-payDes,.yunSzyh").removeProp("readonly","readonly");
            };
        }else if($(this).attr("data-num") == 4){
            //避免重复添加表单
            $(".pubTrDelete").remove();
        };
        $(this).parent().parent().parent().addClass("yunPubHide");
        $(this).parent().parent().parent().prev().removeClass("yunPubHide");
        $(".yunProgressMain ul li").eq(temp).children("span").removeClass("yunOpacity");
        final();
    });
    //感谢您的建议
    $(".yun-excel form input:required").keyup(function () {
        var $parent = $(this).parent();
        $parent.find(".formtips").remove();
        //验证用户名
        if( $(this).is('#user_name') ){
            if( this.value=="" || this.value.length < 2 ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
        //验证邮件
        if( $(this).is('#your_email') ){
            if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            }
        }
        //验证手机号
        if( $(this).is('#link_phone') ){
            if( this.value=="" || ( this.value!="" && !/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|16|17|18|19)\d{9}$/.test(this.value) ) ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            }
        };
        //公司名称
        if( $(this).is('#company_name') ){
            if( this.value=="" || this.value.length < 2 ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            }
        };
    }).blur(function(){
        $(this).triggerHandler("keyup");
    });//end blur
    $(document).on("click",'#yun_end_and_send',function() {
        $('.yun-excel form input:required').trigger('keyup');
        var numError = $(".yun-excel form").find('.borderRed').length;
        if (numError) {
            return false;
        } else {
            yunDataSuggest();
        }
    })
});

