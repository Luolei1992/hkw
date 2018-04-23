var fileTypeSrc = ['images/adoc.png', 'images/ajpg.png', 'images/amp3.png', 'images/amp4.png', 'images/apdf.png', 'images/appt.png', 'images/atxt.png', 'images/aunknown.png', 'images/axls.png', 'images/azip.png'];
$(function () {
    (function () {
        // 云报价注册页面js
        $(".yun-message1").addClass("yun-phone-bg1");
        $(".yun-message1 .yun-ms1").addClass("yun-ms2-color");
        $(".yun-message2").addClass("yun-phone-bg2");
        $(".yun-message2 .yun-ms2").addClass("yun-ms1-color");
        $(".yun-message1").mouseenter(function(){
            $(".yunGetMsgPhone").removeClass("hide");
            $(".yunGetMsgEmail").addClass("hide");
            $(this).addClass("yun-phone-bg1");
            $(".yun-message1 .yun-ms1").addClass("yun-ms2-color");
            $(".yun-message2").addClass("yun-phone-bg2");
            $(".yun-message2 .yun-ms2").addClass("yun-ms1-color");
            $(".yun-message2").removeClass("yun-phone-bg1");
            $(".yun-message2 .yun-ms2").removeClass("yun-ms2-color");
            $(this).removeClass("yun-phone-bg2");
            $(".yun-message1 .yun-ms1").removeClass("yun-ms1-color");
            $(".yun-phone img").attr("src","yunimg/yunphone.png");
        });
        $(".yun-message2").mouseenter(function(){
            $(".yunGetMsgEmail").removeClass("hide");
            $(".yunGetMsgPhone").addClass("hide");
            $(".yun-message1").removeClass("yun-phone-bg1");
            $(".yun-message1 .yun-ms1").removeClass("yun-ms2-color");
            $(this).removeClass("yun-phone-bg2");
            $(".yun-message2 .yun-ms2").removeClass("yun-ms1-color");
            $(this).addClass("yun-phone-bg1");
            $(".yun-message2 .yun-ms2").addClass("yun-ms2-color");
            $(".yun-message1").addClass("yun-phone-bg2");
            $(".yun-message1 .yun-ms1").addClass("yun-ms1-color");
            $(".yun-phone img").attr("src","yunimg/yunemail.png");
        });
        $("#yun-industry .yun-industry ul li").click(function () {
            var txt = $(this).text();
            $("#yun-industry label input").val(txt);
            $("#yun-industry .yun-industry").css("display","none");
        });
        $("#yun-industry input").click(function (e) {
            e.stopPropagation();
            $("#yun-industry .yun-industry").css("display","block");
        });
        // $("#yun-industry input").blur(function () {
        //     // $("#yun-industry .yun-industry").slideUp()
        //     $("#yun-industry .yun-industry").css("display","none")
        // });
        $(document).click(function (e) {
            e.stopPropagation();
            $("#yun-industry .yun-industry").css("display","none");
        });
        $("#yun-industry .yun-industry").click(function (e) {
            e.stopPropagation();
        });
        $("#yun-industry input").keyup(function () {
            $("#yun-industry .yun-industry").css("display","none");
        });
        //左侧短信和邮箱提醒内容联动
        $("#signupForm #username").keyup(function () {
            var name = $("#username").val();
            $(".yunGetMsgPub p").children(".yunname").html(name);
        });
        $("#signupForm #email").keyup(function () {
            var email = $("#email").val();
            $(".yunGetMsgPhone p").children(".yunemail").html(email);
        });
        $("#signupForm .call").find("label").click(function () {
            var $idx = $(this).index();
            var temp;
            if($idx == 1){
                temp = "先生";
            }else if($idx == 2){
                temp = "女士";
            };
            $(".yunGetMsgPub p").children(".yunGender").html(temp);
        });
        (function () {
            // 选择联系人,根据联系人前面的单选是否被选中,把数据添加到页面上
            var arr,arrIpt;
            $(document).on("click",".yun-person input",function () {
                arr = [];
                arrIpt = [];
                var num = $(this).parent().index();
                $(".yun-kehu dl").each(function () {
                    arr.push($(this).children().eq(num).children("span"));
                    return arr;
                });
                $(".yun-step1-form p.alive").each(function () {
                    arrIpt.push($(this).children("input"));
                    return arrIpt;
                });
            });
            $(document).on ("click","#yun-kehu-btn input",function () {
                if(arr == undefined || arr == "") {
                    $(".yun-wrapper").css("display","none").next().css("display","none");
                }else{
                    $(".yun-wrapper").css("display","none").next().css("display","none");
                    $(arrIpt[0]).val(arr[0].html());
                    $(arrIpt[1]).val(arr[3].html());
                    $(arrIpt[2]).val(arr[1].html());
                    $(arrIpt[3]).val(arr[2].html());
                    $("#signupForm").find(".onError").remove();
                };
                $("#signupForm #username").trigger('keyup');
                $("#signupForm #email").trigger('keyup');
            });
        }());
        $(".yun-selectPerson").click(function () {
            linkPerson();
            $(".yun-wrapper").css("display","block");
            $(".yun-kehu").css("display","block");
        });
        $(".yun-wrapper").click(function () {
            $(this).css("display","none").next().css("display","none");
        });
    }());
    (function () {
        /*-----------------------------------项目报价单--------------------------------------------*/

     /*--------------------------点击添加模板和更改模板---------------------------*/
        $("body").on("click",".yun-addPrice",function () {
            $(".yun-tempPriceWrap").css("display","block");
            /*
            * data-core:是给元素yun_tempPrice添加的属性
            * delete:点击(网站建设 / 更改模板)给form表单添加的class名,选择了其他模板就删除当前模板添加新的模板
            * */
            $(".yun_tempPrice").css("display","block").removeAttr("data-core");
            //给#formMsg3添加一个自定义属性data-sign="1";
            $("#formMsg3").attr("data-sign","1");

            var h = $(".historyTempWrap ul").height();
            if(h > 32) {
                $(".historyAllList").css("display","inline-block").click(function () {
                    $(".historyTempWrap").animate({height:h},300);
                    $(this).css("display","none");
                });
            }

        });
        //点击删除报价单
        $(document).on("click",".yun-template",function () {
            var domPub = $('<div class="deleteSure"><p>确定要删除吗?</p><input type="button" class="deleteBtnS" value="确定"><input type="button" class="deleteBtnC" value="取消"></div>'),
                grand = $(this).parent().parent().parent();
            function deleteP() {
                grand.css("position","relative").append(domPub);
                $(document).on("click",".deleteSure .deleteBtnC",function () {
                    $(".deleteSure").remove();
                });
                $(document).on("click",".deleteSure .deleteBtnS",function () {
                    var $thisParent = $(this).parent().parent();
                    $thisParent.remove();
                    linkData();
                    if($("#yunPriceForm").find("form").length == 0){
                        $(".yun-price .yunSubmitWrap").css("display","none");
                    };
                });
            };
            if(!grand.parent().find(".deleteSure").length){
                deleteP();
            }else{
                $(".deleteSure").remove();
                deleteP();
            }
        });
        $(document).on("click",".yun-tempPriceWrap",function () {
            
            $(this).css("display","none");
            $(".yun_tempPrice").css("display","none");
        });
        /*点击取消隐藏报价模板*/
        $("body").on("click",".yun_tempPrice .btn_2",function () {
            
            $(".yun-tempPriceWrap").css("display","none");
            $(".yun_tempPrice").css("display","none");
        });
        /*点击每部分后面的添加按钮增加一部分*/
        $(document).on("click",".yunPlusPart",function () {
            var str = '<div class="yun-part clearfix  yun_partLis"><div class="yun-firstPart-T"><span class="yun-partOrder">第<span class="yun-partOrderLis"></span>部分</span> <input class="yun-details" type="text" placeholder="请尽可能写清楚内容，文件格式，数量等，以免造成不必要的麻烦！"> <input class="yun-submitResult" type="text" placeholder="提交产物"> <i class="yunPubPart yunPlusPart">添加</i><i class="yunPubPart yunReducePart">删除</i> </div><ul class="yunFirstUl clearfix"><li><input class="yun-order" value="1" disabled></li><li><input class="yun-inputContent" type="text"></li><li><input class="yun-inputDetails" type="text"></li><li><input class="yun-inputUnit" type="text"></li><li><input class="yun-inputPrice" onkeyup="clearNoNum(this);" type="text"></li><li class="yunPlusNumberWrap"><input class="yun-inputNum" onkeyup="clearNoNumInt(this);" type="text" value="1"><i class="yunChangeNumber yunReduceNumber">-</i><i class="yunChangeNumber yunPlusNumber">+</i></li><li><input class="yun-rate" value="0.00" disabled></li><li><input class="yun-total" value="0.00" disabled></li><li class="yunIconRight"><i class="yunD" title="下移"></i><i class="yunU" title="上移"></i><i class="yunC" title="删除"></i><i class="yunP" title="添加"></i></li></ul></div>';
            $(str).insertAfter($(this).parent().parent());
            //重新排序
            $(this).parents(".yun_templateFst").find(".yun-partOrderLis").each(function (idx) {
                var num = idx+1;
                $(this).html(num);
            });
        });

        /*点击每部分后面的删除按钮删除一部分*/
        $(document).on("click",".yunReducePart",function () {
            var domPub = $('<div class="deleteSure"><p>确定要删除吗?</p><input type="button" class="deleteBtnS" value="确定"><input type="button" class="deleteBtnC" value="取消"></div>'),
                $_this = $(this).parents(".yun_templateFst"),
                grand = $(this).parents(".yun_partLis");
            function confirmDelete() {
                grand.css("position","relative").append(domPub);
                $(document).on("click",".deleteSure input[type=button]",function () {
                    var $this = $(this);
                    if ($this.val() == "确定"){
                        //判断当前有几个部分
                        if($this.parents(".yun_templateFst").children(".yun_partLis").length == 1){
                            $this.parents("form").parent().remove();
                            if($("#yunPriceForm").find("form").length == 0) {
                                $(".yun-price .yunSubmitWrap").css("display","none");
                            };
                        }else{
                            if ($this.parent().parent().find(".yun-partOrderLis").html() == "1"){
                                var str = '<ol class="yunFirstOl clearfix"><li class="yunFirstOl1">序号</li><li class="yunFirstOl2">内容</li><li class="yunFirstOl3">内容和成果描述</li><li class="yunFirstOl4">单位</li><li class="yunFirstOl5">单价</li> <li class="yunFirstOl6">数量</li><li class="yunFirstOl7"><select name=""><option data-staus="y">要发票(税6%)</option><option  data-staus="n">不要发票</option></select></li><li class="yunFirstOl8">合计</li></ol>';
                                $(str).insertBefore($(this).parents(".yun_templateFst").children().eq(1).children().eq(1));
                            };
                        };
                        $this.parent().parent().remove();
                        //重新排序
                        $_this.find(".yun-partOrderLis").each(function (idx) {
                            var num = idx+1;
                            $(this).html(num);
                        });
                        linkData();

                    }else{
                        $(this).parent().remove();
                        linkData();
                    };
                });
            };
            if(!grand.parents("form").find(".deleteSure").length){
                confirmDelete();
            }else{
                $(".deleteSure").remove();
                confirmDelete();
            };
        });
       
/*--------------------------------------历史报价和官方报价模板---------------------------*/
        $("body").on("click",".yun_tempHistory li",function () {
            
            if($(".yun_tempPubStyle li").hasClass("yun_tempClickDif")){
                $(".yun_tempPubStyle li").removeClass("yun_tempClickDif");
            }
            $(this).addClass("yun_tempClick").siblings().removeClass();
        });
        $(document).on("click",".yun_tempPubStyle li",function () {
            
            if($(".yun_tempHistory li").hasClass("yun_tempClick")){
                $(".yun_tempHistory li").removeClass("yun_tempClick");
            };
            $(".yun_tempPubStyle li").each(function () {
                $(this).removeClass("yun_tempClickDif");
            });
            $(this).toggleClass("yun_tempClickDif");
        });
        

        // 上\下\添加\删除图标显示与隐藏
        $(document).on("mouseenter",".yun_templateFst .yunFirstUl",function () {
            
            $(this).children(".yunIconRight").css("display","block");
        });
        $(document).on("mouseleave",".yun_templateFst .yunFirstUl",function () {
            
            $(this).children(".yunIconRight").css("display","none");
        });
        // 单价提示信息的显示与隐藏
        $(document).on("mouseenter",".yunMsg",function () {
            
            $(this).parents("li").children(".yunMsgDetail").css("display","block");
        });
        $(document).on("mouseleave",".yunMsg",function () {
            
            $(this).parent("li").children(".yunMsgDetail").css("display","none");
        });

/*----------------------------------项目报价详单开始-------------------------------------*/

        /*~~~~~~~~~~~~~~~~~~~~~~四个图标对应的功能~~~~~~~~~~~~~~~~~~~*/
        // 项目报价单下移
        $(document).on("click",".yun_partLis ul .yunIconRight .yunD",function () {
            var $_this = $(this).parent().parent(),
            $_orderT = $_this.find(".yun-order").val(),
            $_orderD = $_this.next().find(".yun-order").val(),
            howLong = $_this.parent().children("ul").length;
            //解决bug最后一条点击后图标不显示的问题
            if($_this.find(".yun-order").val()==howLong){
                $_this.find(".yun-order").val(howLong);
                $_this.children(".yunIconRight").css("display","block");
            }else{
                $_this.find(".yun-order").val($_orderD);
                $_this.children(".yunIconRight").css("display","none");
                $_this.prev().children(".yunIconRight").css("display","block");
            }
            //交换位置同时改变序号
            $_this.next().find(".yun-order").val($_orderT);
            $_this.insertAfter($_this.next(".yunFirstUl"));

            for (var i = 1;i < $(".yun-part").length;i++){
                $("#yun-part_"+i+" .yun-order").each(function (idx) {
                    $(this).val(idx+1);
                });
            };
        });
        // 项目报价单上移
        $(document).on("click",".yun_partLis ul .yunIconRight .yunU",function () {
            var $_this = $(this).parent().parent(),
            $_orderT = $_this.find(".yun-order").val(),
            $_orderD = $_this.prev().find(".yun-order").val();
            //解决bug第一条点击后图标不显示的问题
            if($_this.find(".yun-order").val()==1){
                $_this.find(".yun-order").val(1);
                $_this.children(".yunIconRight").css("display","block");
            }else{
                $_this.find(".yun-order").val($_orderD);
                $_this.children(".yunIconRight").css("display","none");
                $_this.next().children(".yunIconRight").css("display","block");
            }
            //交换位置同时改变序号
            $_this.prev().find(".yun-order").val($_orderT);
            $_this.insertBefore($_this.prev(".yunFirstUl"));

            for (var i = 1;i < $(".yun-part").length;i++){
                $("#yun-part_"+i+" .yun-order").each(function (idx) {
                    $(this).val(idx+1);
                });
            };
        });
        // 点击删除一条
        $(document).on("click",".yun_partLis ul .yunIconRight .yunC",function () {
            
            var $_this = $(this).parent().parent(), //一条ul数据列表
                $_fa = $(this).parent().parent().parent(),  //部分
                $_parent = $(this).parent().parent().parent().parent(),
                num = 0;
            $_this.remove();
            // 重新排序
            $_fa.find(".yunFirstUl .yun-order").each(function (idx) {
                $(this).val(idx+1);
            });
            linkData();
            //根据每部分下面的ul个数判断当前部分是否删除
            if($_fa.find(".yunFirstUl").length == 0){
                //判断当前有几个部分
                if($_fa.parent().find(".yun_partLis").length == 1){
                    $_fa.parent().parent().parent().parent().remove();
                }else{
                    num = $_fa.find(".yun-partOrderLis").html();
                    $_fa.remove();
                    //重新排序
                    $_parent.find(".yun-partOrderLis").each(function (idx) {
                        var num = idx+1;
                        $(this).html(num);
                    });
                };
            };
            if (num == "1"){
                var str = '<ol class="yunFirstOl clearfix"><li class="yunFirstOl1">序号</li><li class="yunFirstOl2">内容</li><li class="yunFirstOl3">内容和成果描述</li><li class="yunFirstOl4">单位</li><li class="yunFirstOl5">单价</li> <li class="yunFirstOl6">数量</li><li class="yunFirstOl7"><select name=""><option  data-staus="y">要发票(税6%)</option><option  data-staus="n">不要发票</option></select></li><li class="yunFirstOl8">合计</li></ol>';
                $(str).insertBefore($_parent.children().eq(0).children().eq(1));
            };

            if($("#yunPriceForm").find("form").length == 0) {
                $(".yun-price .yunSubmitWrap").css("display","none");
            };

        });
        // 点击添加一条
        $(document).on("click",".yun_partLis ul .yunIconRight .yunP",function () {
            var $_this = $(this).parent().parent();
            var pic = '<ul class="yunFirstUl clearfix"><li><input class="yun-order" value="1" disabled></li> <li><input class="yun-inputContent" type="text"> </li>  <li>  <input class="yun-inputDetails" type="text"> </li> <li> <input class="yun-inputUnit" type="text"> </li>   <li> <input class="yun-inputPrice" onkeyup="clearNoNum(this);" type="text"> <div class="yunMsgDetail"> </div> </li> <li class="yunPlusNumberWrap"> <input class="yun-inputNum" onkeyup="clearNoNumInt(this);" type="text" value="1"><i class="yunChangeNumber yunReduceNumber">-</i><i class="yunChangeNumber yunPlusNumber">+</i></li><li><input class="yun-rate" value="0.00" disabled></li>    <li><input class="yun-total" value="0.00" disabled></li>  <li class="yunIconRight">  <i class="yunD" title="下移"></i><i class="yunU" title="上移"></i><i class="yunC" title="删除"></i><i class="yunP" title="添加"></i></li></ul>';
            $(pic).insertAfter($_this);
            // 重新排序
            $_this.parent().find("ul .yun-order").each(function (idx) {
                $(this).val(idx+1);
            });
        });

/*----------------------------------项目报价详单结束------------------------------------*/




/*-----------------------------------付款方式开始--------------------------------------*/

        /*~~~~~~~~~~~~~~~~~~~四个图标对应的功能~~~~~~~~~~~~~~~~*/
        // 项目报价单下移
        $(document).on("click","#yun-tepWay ul .yunIconRight .yunD",function () {
            
            var $_this = $(this).parent().parent(),
            $_orderT = $_this.find(".yun-order").val(),
            $_orderD = $_this.next().find(".yun-order").val(),
            howLong = $_this.parent().children("ul").length;
            //解决bug第一条点击后图标不显示的问题
            if($_this.find(".yun-order").val() == howLong){
                $_this.find(".yun-order").val(howLong);
                $_this.children(".yunIconRight").css("display","block");
            }else{
                $_this.find(".yun-order").val($_orderD);
                $_this.children(".yunIconRight").css("display","none");
                $_this.prev().children(".yunIconRight").css("display","block");
            }
            $_this.next().find(".yun-order").val($_orderT);
            $_this.insertAfter($_this.next(".yunFirstUl"));


        });
        // 项目报价单上移
        $(document).on("click","#yun-tepWay ul .yunIconRight .yunU",function () {
            
            var $_this = $(this).parent().parent(),
            $_orderT = $_this.find(".yun-order").val(),
            $_orderD = $_this.prev().find(".yun-order").val();
            //解决bug第一条点击后图标不显示的问题
            if($_this.find(".yun-order").val()==1){
                $_this.find(".yun-order").val("1");
                $_this.children(".yunIconRight").css("display","block");
            }else{
                $_this.find(".yun-order").val($_orderD);
                $_this.children(".yunIconRight").css("display","none");
                $_this.next().children(".yunIconRight").css("display","block");
            };

            $_this.prev().find(".yun-order").val($_orderT);
            $_this.insertBefore($_this.prev(".yunFirstUl"));
        });
        // 点击删除一条
        $(document).on("click","#yun-tepWay ul .yunIconRight .yunC",function () {
            
            var $_this = $(this).parent().parent();
            //如果只有一种付款方式,不能删除
            if($_this.parent().find("ul").length == 1) {

            }else{
                $_this.remove();
            }
            // 重新排序
            $("#yun-tepWay .yun-order").each(function (idx) {
                $(this).val(idx+1);
            });
        });
        // 点击添加一条
        $(document).on("click","#yun-tepWay ul .yunIconRight .yunP",function () {
            var $_this = $(this).parent().parent();
            var pic = '<ul class="yunFirstUl yun-fuM clearfix"><li><input class="yun-order" value="" disabled></li><li class="yunPlusNumberWrap"><input class="yun-payPercent" type="text" onkeyup="clearNoNumInt(this);" readonly><i class="yunPayNumber yunPayReduceNumber">-</i><i class="yunPayNumber yunPayPlusNumber">+</i></li> <li><input class="yun-payNode" type="text" placeholder="如:确认接受订单" readonly></li><li><input class="yun-payDes" type="text" placeholder="如:预付款" readonly></li><li><input class="yun-payTotal" value="" disabled><i><input type="text" disabled class="yun-payDiscountPic"></i></li> <li class="yunIconRight"><i class="yunD" title="下移"></i><i class="yunU" title="上移"></i><i class="yunC" title="删除"></i><i class="yunP" title="添加"></i></li></ul>';
            if($(".payWayWarring").css("display") == "none" || (window.location.href.indexOf('yunShow.html') != -1 && $("#tipMsgEdit").hasClass("yunPubHide"))){
                pic = pic.split(" readonly").join("");
            };

            $(pic).insertAfter($_this);
            // 重新排序
            $("#yun-tepWay .yun-order").each(function (idx) {
                $(this).val(idx+1);
            });
        });
        /*---------------------------------付款方式结束--------------------------------------*/

    }());
    
    (function () {
        //云报价的报单编辑顶部固定不动
        $(document).scroll(function () {
            if($(document).scrollTop() >= 70){
                $(".yunProgressTop").css({
                    'position':"fixed",
                    'top':'0',
                    'left':'0',
                    'z-index':'1000',
                    'width':'100%'
                })
            }else if($(document).scrollTop() < 70){
                $(".yunProgressTop").css({
                    'position':"relative",
                    'z-index':'1'
                });
            }
        })
    }());
    (function () {
        $("body").on("click",".yunBtnWrapOne .BtnC",function () {
            
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
            });
            $parentN.find(".BtnCtcSD").click(function () {
                $parentN.css("display","none");
                //判断是手动取消还是时间到了系统自动取消的,需要后台传值
                $parentP.html("您已拒绝该报价！");
                $parent.find("button").css("display","none");
            });
        });
    }());

    $(document).on('click','#uploadView i',function () {
        $(this).parent().remove();
    });
    $(".yunDraft a").click(function (e) {
        e.stopPropagation();
        $(this).parent().next().stop().slideToggle();
    });
    $(".caoGaoList").click(function (e) {
        e.stopPropagation();
    });
    $(document).click(function (e) {
        e.stopPropagation();
        $(".caoGaoList").slideUp();
    });
});
function breakWord() {
    var wid = $("pre").width();
    if(wid > 1022){
        $("pre").css("margin-left","68px");
    };
};


function yunDataSuggest() {
    var yun_suggest = {
        username:$("#user_name").val(),
        companyName:$("#company_name").val(),
        email:$("#your_email").val(),
        linkPhone:$("#link_phone").val(),
        companyNet:$("#company_net").val(),
        currentCity:$("#current_city").val(),
        jobs:$("#jobsName").val(),
        data:$("#dateinfo").val(),
        textarea:$("#text_area").val()
    };
    $.ajax({
        url:baseURL+'add_suggest',
        type:'post',
        dataType:'json',
        data:{
            name:yun_suggest.username,
            company_name:yun_suggest.companyName,
            email:yun_suggest.email,
            phone:yun_suggest.linkPhone,
            company_site:yun_suggest.companyNet,
            city:yun_suggest.currentCity,
            menu_name:yun_suggest.jobs,
            exp_start_time:yun_suggest.data,
            suggest:yun_suggest.textarea
        },
        success:function (data) {
            if(data.success){
                $("#user_name").val("");
                $("#company_name").val("");
                $("#your_email").val("");
                $("#link_phone").val("");
                $("#company_net").val("");
                $("#current_city").val("");
                $("#jobsName").val("");
                // $("#dateinfo").val();
                $("#text_area").val("");
                alertUploadMsg("发送成功！");
            }
        }
    })
}
/*
 * 云报价客户信息数据处理
 * */
function linkPerson() {
    /*
     * 云报价客户信息选择已有联系人数据处理
     * */
    if($(".yun-kehu").find("dd").length == 0){
        $.ajax({
            url:baseLink+"quoteApi/getCustomers",
            type:"post",
            dataType:"json",
            data:{
                user_id:getCookie("user_id")
            }
        }).done(function (res) {
            /* 模板 */
            if (res.data.length > 0){
                var valTemp1 = doT.template($("#yunLinkNametmpl").text());
                var valTemp2 = doT.template($("#yunLinkPhonetmpl").text());
                var valTemp3 = doT.template($("#yunLinkEmailtmpl").text());
                var valTemp4 = doT.template($("#yunLinkCompanytmpl").text());
                $("#yunLinkName").append(valTemp1(res.data));
                $("#yunLinkPhone").append(valTemp2(res.data));
                $("#yunLinkEmail").append(valTemp3(res.data));
                $("#yunLinkCompany").append(valTemp4(res.data));
            };
        });
    }
};
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
 * 云报价报价单弹窗数据模拟
 * */
function yunAlertP1() {
    $.ajax({
        url:baseLink+"quoteApi/get_main_project_list",  //请求后台数据地址
        type:"post",
        dataType:"json",
        data:{
            user_id:getCookie("user_id"),
            is_qoute_history:1,           //报价历史
            is_quoter:1,                  //表示报价方
            project_name:"",              //这个也不需要
            quote_status:"1",             //1报价
            send_time:"",                 //这个不需要
            per_page:20,                  //每页
            page:1                        //报价方(服务方)
        },
    }).done(function (data) {
        /*历史报价列表*/
        var valtemp1 = doT.template($("#historyTemptmpl").text());
        $("#historyTemp").html(valtemp1(data.data));
    });
};
// function yunAlertP2() {
//     $.ajax({
//         url:localUrl+"/fff",  //请求后台数据地址
//         type:"get",
//         dataType:"json",
//     }).done(function (data) {
//         // /*官方模板八大块*//*官方模板详细列表*/
//         var valtemp2 = doT.template($("#officialTemptmpl").text());
//         $("#officialTemp").html(valtemp2(data.officialTemp));
//     });
// };
// yunAlertP2();
function caoGao() {
    $.ajax({
        url:baseLink+"quoteApi/get_main_project_list",
        type:"post",
        data:{
            user_id:getCookie("user_id"),
            is_quoter:1,                  //表示报价方
            project_name:"",              //这个也不需要
            quote_status:"0",             //0草稿
            send_time:"",                 //这个不需要
            type:1,
            per_page:12,
            page:1
        },
        dataType:"json",
        success:function (res) {
            var caoGao = '';
            if(res.data.item_list.length > 0){
                $(".warringNum").css("display","inline").html('('+res.data.item_list.length+')<i class="warringDian"></i>');
                for(var i = 0;i < res.data.item_list.length;i++){
                    caoGao += '<ul class="yunDraftUl clearfix"><li class="yunDraftUl1" title="'+get_project_name(res.data.item_list[i].project_name)+'">'+get_project_name(res.data.item_list[i].project_name)+'</li><li class="yunDraftUl2">'+res.data.item_list[i].create_time+'</li><li class="yunDraftUl3"><a href="yunShow.html?id='+res.data.item_list[i].project_id+'" class="caoGaoEdit">编辑</a>　<a href="javascript:void(0);" class="caoGaoDel" data-proid="'+res.data.item_list[i].project_id+'" onclick="caoGaoDel(this)">删除</a></li></ul>';
                };
                $("#caoGaoWrap").html(caoGao);
            }else{

            };
            function get_project_name(name) {
                // name == ""?"未填写":name;
                if(name == "" || name == null){
                    return "未填写";
                }else{
                    return name;
                };
            };
        }
    });
}
function final() {
    if($(".yunProgressMain ul li .yunOpacity").length == 4) {
        $(".yunProgressEnd").addClass("yunOpacity");
    }else{
        $(".yunProgressEnd").removeClass("yunOpacity");
    }
};
function caoGaoDel($this) {
    var proid = $($this).attr('data-proid');
    $.ajax({
        url:baseLink+"quoteApi/delete_main_project",
        type:"post",
        data:{
            project_id:proid,
            user_id:getCookie("user_id")
        },
        dataType:"json",
        success:function (res) {
            if(res.success){
                $($this).parent().parent().remove();
                caoGao();
            }else{
                alertUploadMsg(res.message);
            }
        }
    })
}

function payWayShowDataDetails(arrTotal,arrDiscount,arr,discountTotal,discountYh) {
    var str = '',
        st = '<tr class="yun-tablePayFst"><th>序号</th><th>百分比</th><th>付款节点</th><th>描述</th><th class="yun-tablePayTotal">合计</th></tr><tr><td colspan="4">项目总计</td><td>'+arrTotal+'(含税:'+discountTotal+')</td></tr><tr><td colspan="4">优惠价格'+arrDiscount+'(原价:'+arrTotal+')</td><td>'+arrDiscount+'(含税:'+discountYh+')</td></tr>';
    if(window.location.href.indexOf("yunStep.html") != -1){
        if($(".payCouponTotal").css("display") == "none") {
            st = st.split('<tr><td colspan="4">优惠价格'+arrDiscount+'(原价:'+arrTotal+')</td><td>'+arrDiscount+'(含税:'+discountYh+')</td></tr>').join('');
        }else{
            st = st.split('<tr><td colspan="4">项目总计</td><td>'+arrTotal+'(含税:'+discountTotal+')</td></tr>').join('');
        }
    }else {
        if(arrDiscount == '') {
            st = st.split('<tr><td colspan="4">优惠价格'+arrDiscount+'(原价:'+arrTotal+')</td><td>'+arrDiscount+'(含税:'+discountYh+')</td></tr>').join('');
        }else{
            st = st.split('<tr><td colspan="4">项目总计</td><td>'+arrTotal+'(含税:'+discountTotal+')</td></tr>').join('');
        }
    };
    $(".yun-tablePay").html(st);
    for(var i = 0;i < arr.length;i++) {
        str += '<tr class="pubTrDelete"><td>'+arr[i][0]+'</td><td>'+arr[i][1]+'</td><td>'+arr[i][2]+'</td><td>'+arr[i][3]+'</td><td>'+arr[i][4]+'</td></tr>';
    };
    $(str).insertAfter($(".yun-tablePay .yun-tablePayFst"));
};
/*
 * 保存后的状态渲染
 * */
function quotationRender(pricePic) {
    function partFst(pricePic) {
        var cashTotal,arrCash = [];
        //报价单数
        $("#yunPriceForm").find("form").each(function (idx) {
            cashTotal = 0;
            //税金合计计算
            $("#yunPriceForm").find("form").eq(idx).find(".yun-rate").each(function () {
                var $cash = $(this).val();
                cashTotal += ($cash-0);
            });
            arrCash.push(cashTotal.toFixed(2));
        });
        var strTotal = "",shu3 = 0;
        // 报价单概略信息
        if(window.location.href.indexOf("yunStep.html") != -1){
            for(var f = 0;f < pricePic.length;f++) {
                var shu1 = (pricePic[f].totalAll - arrCash[f]).toFixed(2),shu2 = f+1;
                var strtab = '<tr><td>'+shu2+'</td><td>'+pricePic[f].priceName+'</td><td>'+shu1+'</td><td>'+arrCash[f]+'</td><td>'+pricePic[f].totalAll+'</td></tr>';
                strTotal += strtab;
                shu3 += pricePic[f].totalAll-0;
            };
        }else{
            for(var f = 0;f < pricePic.length;f++) {
                var shu1 = (pricePic[f].totalAll/1.06*0.06).toFixed(2),shu2 = f+1,
                    shu4 = pricePic[f].totalAll-shu1;
                var strtab = '<tr><td>'+shu2+'</td><td>'+pricePic[f].priceName+'</td><td>'+shu4+'</td><td>'+shu1+'</td><td>'+pricePic[f].totalAll+'</td></tr>';
                strTotal += strtab;
                shu3 += pricePic[f].totalAll-0;
            };
        }
        shu3 = shu3.toFixed(2);
        var priceStrs = '<tr><th>序号</th><th>报价单</th><th>报价</th><th>税金(总计)</th><th>总计</th></tr>'+strTotal+'<tr class="beforeInsert"><td colspan="4">项目总计</td><td>'+shu3+'</td></tr>';
        
        if(pricePic.length != 1) {
            $(".yun-tableObj").html(priceStrs);
        };
    };
    partFst(pricePic);
    function partSec(pricePice) {
        //报价单数
        for (var a = 0;a < pricePice.length;a++) {
            var sjstrTotal;
            var bjdstr = '<h4>' + pricePice[a].priceName + '：</h4><table class="yun-tableObjPic bjdstr' + a + '" border="2"><tr><th>序号</th><th>内容</th><th>内容及成果描述</th><th>单位</th><th>单价</th><th>数量</th><th>税金</th><th>合计</th></tr></table>';
            $(".priceTableWrap").append(bjdstr);
            //部分数
            for (var b = 0; b < pricePice[a].parts.length; b++) {
                var numb = b + 1;
                var bfstr = '<tr class="bfstr' + b + '"><td colspan="8"><b>第' + numb + '部分:</b>' + pricePice[a].parts[b].description + '<span class="yun-fruit"> 提交产物:' + pricePice[a].parts[b].achievement + '</span></td></tr>';
                $(".bjdstr" + a).append(bfstr);
                sjstrTotal = "";
                for (var c = 0; c < pricePice[a].parts[b].part.length; c++) {
                    var x = c + 1;
                    var sjstr = '<tr><td>' + x + '</td><td>' + pricePice[a].parts[b].part[c].content + '</td><td>' + pricePice[a].parts[b].part[c].desResult + '</td><td>' + pricePice[a].parts[b].part[c].unit + '</td><td>' + pricePice[a].parts[b].part[c].price + '</td><td>' + pricePice[a].parts[b].part[c].number + '</td><td>' + pricePice[a].parts[b].part[c].rate + '</td><td>' + pricePice[a].parts[b].part[c].total + '</td></tr>';
                    sjstrTotal += sjstr;
                };
                $(sjstrTotal).insertAfter($(".bjdstr" + a + " .bfstr" + b));
            };
            var totalRemark = '<tr><td colspan="7">总计</td><td>' + pricePice[a].totalAll + '</td></tr><tr><td>备注</td><td colspan="7">' + pricePice[a].remarks + '</td></tr>';
            $(".bjdstr" + a).append(totalRemark);
        }
    };
    partSec(pricePic);
}

//计算天数差的函数，通用
function todayData() {
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "-";
    str += (mydate.getMonth()+1) + "-";
    str += mydate.getDate();
    return str;
};

function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    // oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    oDate2  =  new  Date(aDate[0]  +  '-'  +  aDate[1]  +  '-'  +  aDate[2])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}













 