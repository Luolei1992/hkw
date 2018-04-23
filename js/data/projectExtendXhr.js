$(function () {
    var prosID = getLocationParam("id"),             //订单id
        whos = getLocationParam("tag"),              //服务方1  需求方2
        custom = getLocationParam("custom"),         //客户id
        person = "",
        proImgSrc = "";
    //判断是需求方还是服务方
    if (whos == 1) {
        $(".endPro").parent().remove();
        person = getCookie("user_id");
    } else if (whos == 2) {
        person = custom;
        $(".moreWarringT").parent().remove();
        $(".warringPositionPubSort2").html("1. ");
        $(".warringPositionPubSort3").html("2. ");
    }
    ;
    /*--------------------------------信息展示---------------------------------*/
    //双方信息获取和展示
    pubPersonMsg(baseURL + 'get_user_base_info', getCookie('user_id'), $(".extendNameR"), $(".extendPhoneR"), $(".extendWXR"), $(".extendQQR"), $(".extendEmailR"), $(".extendImgR"));
    pubPersonMsg(baseURL + 'get_user_info/' + custom, getCookie('user_id'), $(".extendNameL"), $(".extendPhoneL"), $(".extendWXL"), $(".extendQQL"), $(".extendEmailL"), $(".extendImgL"));

    function pubPersonMsg(url, perid, ele1, ele2, ele3, ele4, ele5, ele6) {
        $.ajax({
            url: url,
            type: 'post',
            data: {
                user_id: perid
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                ele1.html(res.data.nick_name);
                ele2.html(res.data.mobile);
                ele3.html(res.data.weixin);
                ele4.html(res.data.qq);
                ele5.html(res.data.email);
                ele6.attr("src", res.data.path_thumb ? res.data.path_thumb : './images/selec.jpeg');
                if (whos == 1) {
                    proImgSrc = $(".extendImgR").attr("src");
                    $(".touRightStatic img").attr("src", proImgSrc).attr("data-src", $(".extendImgL").attr("src"));
                }
                ;
                if (whos == 2) {
                    proImgSrc = $(".extendImgR").attr("src");
                    $(".touRightStatic img").attr("src", proImgSrc).attr("data-src", $(".extendImgR").attr("src"));
                }
                ;
            },
            error: function () {
                alertUploadMsg("页面数据获取异常");
            }
        });
    };
    $(".ExtendNavLeft li").eq(1).click(function () {
        if ($(this).attr("data-stats") == "true") {
            getWorkLists(10, 0, true, $(".askHistoryList"));
        }
        ;
        $(this).attr("data-stats", "false");
    });
    $(".ExtendNavLeft li").eq(2).click(function () {
        if ($(this).attr("data-stats") == "true") {
            getWorkLists(5, 0, false, $(".askHistoryList2"));
        }
        ;
        $(this).attr("data-stats", "false");
    });

    /**
     * 获取工作记录展示在页面上
     * @param limit  个数
     * @param num    从第几个开始
     * @param flag   标记
     * @param ele    容器
     */
    function getWorkLists(limit, num, flag, ele) {
        $.ajax({
            url: baseLink + 'quoteApi/get_project_work_list',
            type: "post",
            data: {
                user_id: person,
                project_id: prosID,
                offset: num,
                limit: limit
            },
            dataType: "json",
            success: function (res) {
                console.log("工作记录");
                console.log(res);
                if (res.success) {
                    var data, strs = "";
                    if (flag) {
                        data = res.data.item_list;
                    } else {
                        data = res.data.item_list.reverse();
                        $(".howNum").html(data.length + "条");
                    }
                    ;
                    //和getcookie的值相等的放在右边，不相等的放在左边
                    if (data.length) {
                        proPagePaper(res.data.total_pages, (num / 10 + 1));
                        for (var m = 0; m < data.length; m++) {
                            var fileViews = "", str = "";
                            if (data[m].user_id == getCookie("user_id")) {
                                if (data[m].appendixs.length) {
                                    for (var k = 0; k < data[m].appendixs.length; k++) {
                                        console.log(data[m].appendixs[k].name);
                                        fileViews += '<li><i></i><img data-src="' + data[m].appendixs[k].path + '" class="uploadViewPic" src="' + achieveSrcs(data[m].appendixs[k]) + '" alt="" data-id="' + data[m].appendixs[k].id + '"><br><a href="' + (data[m].appendixs[k].path.indexOf('zip') != -1 ? data[m].appendixs[k].path : "javascript:void(0);") + '" style="color: ' + (data[m].appendixs[k].path.indexOf('zip') != -1 ? "#03A5EE;" : "#000") + '"><span class="uploadViewName" title="' + data[m].appendixs[k].name + '">' + data[m].appendixs[k].name + '</span></a></li>';
                                        if (data[m].appendixs[k].path.indexOf('zip') == -1) {
                                            str += '<img src="' + data[m].appendixs[k].path + '">';
                                        }
                                        ;
                                    }
                                    ;
                                }
                                ;
                                strs += '<div class="textWrapper" style="margin-top:20px;">' +
                                    '<div class="touRight">' +
                                    '<img src="' + $(".extendImgR").attr("src") + '" />' +
                                    '</div>' +
                                    '<div class="text right">' +
                                    '<span class="bagdR"></span>' +
                                    '<p class="text" style="margin-top:10px;">' + data[m].log_time + '</p>' +
                                    '<p class="text">' + data[m].content + '</p>' +
                                    '<div class="needSend">' +
                                    '<ul class="uploadViews" class="clearfix">' +
                                    fileViews +
                                    '</ul>' +
                                    '</div>' +
                                    '<div class="clear"></div>' +
                                    '<div class="imagesWrap" style="">' +
                                    '<img src="">' +
                                    '</div>' +
                                    '<div class="imgWrap textWrapChildernR">' + str +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="clear"></div>' +
                                    '</div>';
                            } else {
                                if (data[m].appendixs.length) {
                                    for (var k = 0; k < data[m].appendixs.length; k++) {
                                        console.log(data[m].appendixs[k].name);
                                        fileViews += '<li><i></i><img data-src="' + data[m].appendixs[k].path + '" class="uploadViewPic" src="' + achieveSrcs(data[m].appendixs[k]) + '" alt="" data-id="' + data[m].appendixs[k].id + '"><br><a href="' + (data[m].appendixs[k].path.indexOf('zip') != -1 ? data[m].appendixs[k].path : "javascript:void(0);") + '" style="color: ' + (data[m].appendixs[k].path.indexOf('zip') != -1 ? "#03A5EE;" : "#000") + '"><span class="uploadViewName" title="' + data[m].appendixs[k].name + '">' + data[m].appendixs[k].name + '</span></a></li>';
                                        if (data[m].appendixs[k].path.indexOf('zip') == -1) {
                                            str += '<img src="' + data[m].appendixs[k].path + '">';
                                        }
                                        ;
                                    }
                                    ;
                                }
                                ;
                                strs += '<div class="textWrapper" style="margin-top:20px;">' +
                                    '<div class="touLeft">' +
                                    '<img src="' + $(".extendImgL").attr("src") + '" />' +
                                    '</div>' +
                                    '<div class="text">' +
                                    '<span class="bagdL"></span>' +
                                    '<p class="text" style="margin-top:10px;">' + data[m].log_time + '</p>' +
                                    '<p class="text">' + data[m].content + '</p>' +
                                    '<div class="needSend fl">' +
                                    '<ul class="uploadViews" class="clearfix">' +
                                    fileViews +
                                    '</ul>' +
                                    '</div>' +
                                    '<div class="clear"></div>' +
                                    '<div class="imagesWrap" style="">' +
                                    '<img src="">' +
                                    '</div>' +
                                    '<div class="imgWrap textWrapChildernR">' + str +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="clear"></div>' +
                                    '</div>';
                            }
                            ;
                        }
                        ;
                        ele.html(strs);
                    } else {
                        ele.html('<p style="color: red;text-align: center">暂无记录</p>');
                    }
                    ;
                } else {
                    alertUploadMsg(res.message);
                }
            }, error: function () {
                alertUploadMsg("数据获取异常！");
            }
        });
    };

    /*
     * 分页插件项目(每次获取数据的总页数改变需要加载一次分页插件)
     * */
    function proPagePaper(totalPage, page) {
        var pageNo = page;
        //生成分页
        // kkpager.init();
        kkpager.generPageHtml({
            pno: pageNo,
            //总页码
            total: totalPage,
            //总数据条数
            mode: 'click', //默认值是link，可选link或者click
            click: function (n) {
                //手动选中按钮
                this.selectPage(n);
                getWorkLists(10, (n - 1) * 10, true, $(".askHistoryList"));
                return false;
            }
        }, true);
    }

    //项目阶段到了哪一步
    $.ajax({
        url: baseLink + 'quoteApi/get_project_history_list',
        type: "post",
        dataType: "json",
        data: {
            user_id: getCookie("user_id"),
            project_id: prosID
        }, success: function (res) {
            console.log('项目阶段');
            console.log(res);
            var arr = [],max = 0;
            if (res.data.length) {
                for (var i = 0; i < res.data.length; i++) {
                    var lists = '';
                    for (var j = 0; j < res.data[i].length; j++) {
                        if (res.data[i].length > 0) {
                            arr.push(res.data[i][j].stage_id);
                        };
                        lists += '<p>' + (res.data[i][j].work_type == 1 ? '<a title="' + res.data[i][j].log_time.split(" ")[0] + ':' + res.data[i][j].details + '" href="Personal-4.html">' + res.data[i][j].log_time.split(" ")[0] + ':' + res.data[i][j].details + '</a>' : res.data[i][j].work_type == 3 ? '<a title="' + res.data[i][j].log_time.split(" ")[0] + res.data[i][j].details + '" href="javascript:void(0);" data-score="' + res.data[i][j].appraise_score + '" data-txt="' + res.data[i][j].appraise_txt + '">' + res.data[i][j].log_time.split(" ")[0] + ':' + res.data[i][j].details + '</a>' : "<p title='" + res.data[i][j].details + "'>" + res.data[i][j].log_time.split(" ")[0] + ':' + res.data[i][j].details + "</p>") + '</p>';
                    };
                    $(".MainTopUl" + (i + 1)).html(lists);
                };
                max = Math.max.apply(null,arr);
                for(var k = 0;k < max;k++){
                    $(".MainTopUlT li").eq(k).addClass("cur");
                };
            }
        }, error: function (res) {
            console.log('错误');
            console.log(res);
        }
    });
    //获取待做工作列表（甲/乙方）
    $.ajax({
        url: baseLink + 'quoteApi/get_project_task_list',
        type: "post",
        dataType: "json",
        data: {
            user_id: person,
            project_id: prosID,
            request: ''
        }, success: function (res) {
            console.log('获取待做工作列表');
            console.log(res);
            var arr = [], sts = '';
            if (res.data.item_list.length) {
                for (var i = 0; i < res.data.item_list.length; i++) {
                    arr.push(res.data.item_list[i].req_type);
                    var tempType = res.data.item_list[i].req_type;
                    if (tempType == 'delay') {
                        $("#oneByOneSec").css("display", "block").find(".oneByOneTL span").html(res.data.item_list[i].time_least);
                    } else if (tempType == 'pay' && whos == 2) {
                        $("#oneByOneFst").css("display", "block").find(".oneByOneTL span").html(res.data.item_list[i].time_least);
                        $("#oneByOneFst .agreeYs").attr("data-detail", res.data.item_list[i].payInfo.detail);
                        $("#oneByOneFst .agreeYs").attr("data-percent", res.data.item_list[i].payInfo.percent);
                        $("#oneByOneFst .agreeYs").attr("data-paymoney", res.data.item_list[i].payInfo.pay_amount);
                    } else if (tempType == 'finish') {
                        $("#oneByOneTrd").css("display", "block").find(".oneByOneTL span").html(res.data.item_list[i].time_least);
                    }
                    ;
                }
                ;
            }
            ;
            console.log(arr);
        }, error: function (res) {
            console.log('错误');
            console.log(res);
        }
    });

    //评价查看
    $(document).on("click", ".MainTopUl4 a", function (e) {
        e.stopPropagation();
        var stars = $(this).attr("data-score"),
            pjTxt = $(this).attr("data-txt");
        $(".startComment").html(getStart(stars));
        $(".moreWarringW2").css("display", "block").find("textarea").html(pjTxt);
    });

    //评价星数
    function getStart(num) {
        var strTotal = '', strSolid = '', strEmpty = '', strHalf = '';
        if (num < 5) {
            // 实心数
            for (var i = 0; i < num; i++) {
                strSolid += '<li class="iconfont11 icon-wujiaoxingman"></li>';
            }
            ;
            // 空心数
            for (var j = 0; j < 5 - num; j++) {
                strEmpty += '<li class="iconfont11 icon-wujiaoxingkong"></li>';
            }
            strTotal = strSolid + strHalf + strEmpty;
            return strTotal;
        } else {
            // 实心数
            for (var k = 0; k < 5; k++) {
                strSolid += '<li class="iconfont11 icon-wujiaoxingman"></li>';
            }
            ;
            strTotal = strSolid;
            return strTotal;
        }
        ;
    };
    $(".icon-tubiao06").click(function () {
        $(this).parent().css("display", "none");
    });
    $(".moreWarringW2").click(function (e) {
        e.stopPropagation();
    });
    $(document).click(function (e) {
        e.stopPropagation();
        $(".moreWarringW2").css("display", "none");
    });

    $(document).on("click", "#delayTime", function () {
        $(".alertWarringYs").css("display", "none");
        $(".delayDataTime").html($(".yun-messageShowDataR").html());
        $(".delayDataTime").html($(".serverDdxq h3").attr("data-tim"));
        $(".endProWrap").css("display", "none");
        $(".delayTime").css("display", "block").find(".btn1").click(function () {
            $(".delayTime").css("display", "none");
        });
        $(".delayTime").find(".btn2").click(function () {
            $(".delayTime").css("display", "none");
        });
        $(".delayTime").find("i").click(function () {
            $(".delayTime").css("display", "none");
        })
    });
    $(".alertWrapClose").click(function () {
        $(this).parent().css("display", "none");
    })
    //申请延长项目时间（甲/乙方）
    $(".btn2").click(function () {
        var delayTime = $("#dateinfo").val(),
            req = $(".delayTime").find("textarea").val();
        console.log(delayTime.replace(/年/, "-").replace(/月/, "-").replace(/日/, ""));
        $.ajax({
            url: baseLink + 'quoteApi/project_delay_ask',
            type: "post",
            data: {
                user_id: getCookie("user_id"),          //甲方、乙方id
                project_id: prosID,       //项目id
                request: req,             //申请原因
                exp_time: delayTime.replace(/年/, "-").replace(/月/, "-").replace(/日/, "") //延期时间
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                console.log("乙方申请延期" + '////' + person);
                if (res.success) {
                    alertUploadMsg("申请延期成功！");
                } else {
                    alertUploadMsg(res.message);
                }
                ;
            },
            error: function () {
                alertUploadMsg("申请延期失败,请重新申请！");
            }
        })
    });
    //拒绝延长项目时间(甲/乙方)
    $("body").on("click", ".oneByOneTR .confuseYc", function () {
        var $this = $(this);
        $(".WrapPub").remove();
        $(this).parent().append('<div class="BtnCtc WrapPub" style="display: block;"><p>您将拒绝对方要求的延长项目时间！</p><p>确认拒绝吗？</p> <button class="BtnCtcS">确认</button> <button class="BtnCtcC">取消</button> </div>');
        $this.parent().find(".BtnCtcS").click(function () {
            $.ajax({
                url: baseLink + 'quoteApi/project_delay_refuse',
                type: 'post',
                data: {
                    user_id: person,        //甲方、乙方id
                    project_id: prosID,     //项目id
                    rsponse: ''
                },
                dataType: 'json',
                success: function (res) {
                    console.log("拒绝延长项目时间");
                    console.log(res);
                    if(res.success){
                        $this.parent().html('<p style="color: red;">已拒绝</p>');
                        $this.parent().remove();
                    }else{
                        alertUploadMsg(res.message);
                    };
                }
            });
        });
        $(".BtnCtcC").click(function () {
            $(this).parent().remove();
        });
    });
    //同意延长项目时间(甲/乙方)
    $("body").on("click", ".oneByOneTR .agreeYc", function () {
        var $this = $(this);
        $(".WrapPub").remove();
        $(this).parent().append('<div class="BtnCtc WrapPub" style="display: block;"><p>您将同意对方要求的延长项目时间！</p><p>确认同意吗？</p> <button class="BtnCtcS">确认</button> <button class="BtnCtcC">取消</button> </div>');
        $this.parent().find(".BtnCtcS").click(function () {
            $.ajax({
                url: baseLink + 'quoteApi/project_delay_confirm',
                type: 'post',
                data: {
                    user_id: person,        //甲方id
                    project_id: prosID,     //项目id
                    rsponse: ''
                },
                dataType: 'json',
                success: function (res) {
                    console.log("同意延长项目时间");
                    console.log(res);
                }
            });
            $(this).parent().parent().html('<p style="color: red;">已同意</p>');
            $(this).parent().remove();
        });
        $(".BtnCtcC").click(function () {
            $(this).parent().remove();
        });
    });
    //提醒验收（乙方）
    $(".warringYs").click(function () {
        $(".alertWarringYs").css("display", "block");
        $(".delayTime").css("display", "none");
        $(".alertWarringYsS").click(function () {
            $(this).parent().css("display", "none");
            $.ajax({
                url: baseLink + 'quoteApi/project_pay_ask',
                type: "post",
                data: {
                    user_id: getCookie("user_id"),
                    project_id: prosID
                },
                dataType: "json",
                success: function (res) {
                    console.log("提醒验收");
                    console.log(res);
                    if (res.success) {
                        alertUploadMsg("您已成功提醒对方验收");
                    } else {
                        alertUploadMsg(res.message);
                    }
                }
            });
            $.ajax({
                url: baseLink + 'quoteApi/project_pay_remind',
                type: "post",
                data: {
                    user_id: getCookie("user_id"),
                    project_id: prosID
                },
                dataType: "json",
                success: function (res) {
                    console.log("提醒验收次数");
                    console.log(res);
                    if (res.success) {
                        // alertUploadMsg("一天最多提醒三次");
                        //调用环信
                    } else {
                        // alertUploadMsg(res.message);

                    }
                }
            });
        });
        $(".alertWarringYsC").click(function () {
            $(this).parent().css("display", "none");
        });
    });
    //同意验收(甲方)
    $("body").on("click", ".oneByOneTR .agreeYs", function () {
        var $this = $(this),
            phone = $(".extendPhoneR").html(),
            data_detail = $this.attr("data-detail"),
            data_percent = $this.attr("data-percent"),
            data_paystate = $this.attr("data-paymoney");
        $(".WrapPub").remove();
        $(this).parent().parent().find(".moreWarring").css("display", "block");
        $(this).parent().parent().append('<div class="clearfix WrapPub moreWarring" id="moreWarringW3" style="display: block;"><p class="pubp">请确认是否收到设计师的提交成果！</p><p class="pubp payWhat">按约定：你将支付<span class="payWhat2">' + data_percent + '</span>%的款项，共<span class="payWhat3">' + data_paystate + '</span>元</p><p class="pubp">付款后，资金将直接从您的账户转到设计师的账户！</p><span class="pubp validate">验证手机号：<i class="YsPhone">'+phone+'</i></span><div><input onkeyup="" type="text" class="ma"><a class="onSMSCode">获取验证码</a></div><button class="BtnCtcS">确定</button><button class="BtnCtcC">取消</button></div>');
        // $(".YsPhone").html($(".extendPhoneL").html());
        //点击获取验证码
        $(this).parent().parent().find(".onSMSCode").click(function () {
            var $ele = $(this).parent().find(".onSMSCode");
            console.log(phone);
            $.ajax({
                url: baseURL + 'get_reg_sms_code',
                type: 'post',
                data: {
                    type: "project_pay_confirm",
                    mobile: phone,
                    tokeen: 1234165
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
        });

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

        //确认验收付款
        $this.parent().parent().find(".BtnCtcS").click(function () {
            var code = $(this).parent().find(".ma").val();
            if (code.length > 0) {
                $.ajax({
                    url: baseLink + 'quoteApi/project_pay_confirm',
                    type: 'post',
                    data: {
                        user_id: person,        //甲方id
                        project_id: prosID,     //项目id
                        rsponse: '',
                        code: code
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res.success) {
                            console.log(res);
                            $("#moreWarringW3").remove();
                            $this.parent().html('<p style="color: red;">验收成功</p>');
                        } else {
                            alertUploadMsg(res.message);
                        };
                    },
                    error: function () {
                        alertUploadMsg("验证码验证失败！请重新验证！");
                    }
                });
            } else {
                alertUploadMsg("请输入正确的验证码！");
            };
        });
        $this.parent().parent().find(".BtnCtcC").click(function () {
            $(this).parent().remove();
        });
    });
    //终止项目(甲方)
    $("body").on("click", ".endPro", function () {
        $(".endProWrap").css("display", "block");
        $(".delayTime").css("display", "none");
        $(".endProWrapCancle").click(function () {
            $(".endProWrap").css("display", "none");
        });
        $(".endProWrapSure").click(function () {
            $(this).parent().css("display", "none");
            var str = $(".endProWrap textarea").val();
            $.ajax({
                url: baseLink + 'quoteApi/project_finish_ask',
                type: "post",
                data: {
                    user_id: person,
                    project_id: prosID,
                    request: str
                },
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    console.log("甲方要求终止项目");
                    if (res.success) {
                        alertUploadMsg("已申请乙方终止项目");
                    } else {
                        console.log("申请终止项目失败");
                        alertUploadMsg(res.message);
                    }
                }, error: function () {
                    alertUploadMsg("申请失败");
                }
            });
        });
    });
    // 同意终止项目（乙方）
    $("body").on("click", ".oneByOneTR .agreeFinish", function () {
        var $this = $(this);
        $(".WrapPub").remove();
        $(this).parent().append('<div class="BtnCtc WrapPub" style="display: block;"><p>您将拒绝对方要求的延长项目时间！</p><p>确认拒绝吗？</p><button class="BtnCtcS">确认</button> <button class="BtnCtcC">取消</button> </div>');
        $(this).parent().find(".BtnCtcS").click(function () {
            $.ajax({
                url: baseLink + 'quoteApi/project_finish_confirm',
                type: "post",
                data: {
                    user_id: getCookie("user_id"),
                    project_id: prosID,
                    response: ""
                },
                dataType: "json",
                success: function (res) {
                    console.log("同意终止项目");
                    if (res.success) {
                        $this.parent().html('<p style="color: red;">已同意</p>');
                    } else {
                        alertUploadMsg(res.message);
                    }
                    ;
                },
                error: function (res) {
                    alertUploadMsg(res.message);
                }
            });
        });
        $(this).parent().find(".BtnCtcC").click(function () {
            $(this).parent().remove();
        });

    });
    // 拒绝终止项目（乙方）
    $("body").on("click", ".confuseFinish", function () {
        var $this = $(this);
        $(".WrapPub").remove();
        $(this).parent().append('<div class="BtnCtc WrapPub" style="display: block;"><p>您将拒绝对方要求的延长项目时间！</p><p>确认拒绝吗？</p> <button class="BtnCtcS">确认</button> <button class="BtnCtcC">取消</button> </div>');
        $(this).parent().find(".BtnCtcS").click(function () {
            $.ajax({
                url: baseLink + 'quoteApi/project_finish_refuse',
                type: "post",
                data: {
                    user_id: getCookie("user_id"),
                    project_id: prosID,
                    response: ""
                },
                dataType: "json",
                success: function (res) {
                    console.log("拒绝终止项目");
                    if (res.success) {
                        $this.parent().html('<p style="color: red;">已拒绝</p>');
                    } else {
                        alertUploadMsg(res.message);
                    }
                    ;
                },
                error: function () {
                    alertUploadMsg(res.message);
                }
            });
        });
        $(this).parent().find(".BtnCtcC").click(function () {
            $(this).parent().remove();
        });
    });


    //工作记录上传保存
    var picReview = [];

    function uploadFile() {
        var choose = document.getElementById('chooseUploadFile');
        FileAPI.event.on(choose, 'change', function (evt) {
            var files = FileAPI.getFiles(evt); // Retrieve file list
            var isImage = true, obj;
            FileAPI.filterFiles(files, function (file, info/**Object*/) {
                obj = file;
                if (!/^image/.test(file.type)) {
                    isImage = false;
                    if (file.size > 10 * FileAPI.MB) {
                        return false;
                    } else {
                        return true;
                    }
                    ;
                } else {
                    if (file.size > 10 * FileAPI.MB) {
                        return false;
                    } else {
                        return true;
                    }
                    ;
                }
                ;
            }, function (files/**Array*/, rejected/**Array*/) {
                console.log(files);
                var uploadFile = files[0];
                console.log(uploadFile);
                if (files.length) {
                    // Uploading Files
                    if (isImage) {
                        FileAPI.upload({
                            url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
                            files: {
                                Filedata: uploadFile
                            },
                            complete: function (err, xhr) {
                                console.log(xhr);
                                var upfileFilePath = (JSON.parse(xhr.responseText));
                                console.log(upfileFilePath);
                                picReview.push(upfileFilePath.data.file_path);
                                getSrc(obj, upfileFilePath, isImage, $("#uploadView"));
                            }
                        });
                    } else {
                        FileAPI.upload({
                            url: 'https://www.huakewang.com/upload/uploadFile',
                            files: {
                                Filedata: uploadFile
                            },
                            complete: function (err, xhr) {
                                var upfileFilePath = (JSON.parse(xhr.responseText));
                                console.log(upfileFilePath);
                                console.log(upfileFilePath.success);
                                getSrc(obj, upfileFilePath, isImage, $("#uploadView"));
                            }
                        });
                    }
                }
            });
        });
    };

    function getSrc(file, json, flag, ele) {
        var src = '';
        achieveSrc(file);
        console.log(src);
        var fileList = '';
        if (json.success && (ele.find("li").length < 5)) {
            fileList = '<li><i></i><img data-src="' + (flag ? json.data.file_path : json.data.abs_file_path) + '" class="uploadViewPic" src="' + achieveSrc(file) + '" alt="" data-id="' + json.data.id + '"><br><span class="uploadViewName" title="' + file.name + '">' + file.name + '</span></li>';
            ele.append(fileList);
        } else {
            if (ele.find("li").length == 5) {
                alertUploadMsg('最多上传5个文件！');
            } else {
                alertUploadMsg(json.message);
            }
            ;
            return false;
        }
        ;
        console.log(fileList);
    };
    uploadFile();

    $(".workListSend").click(function () {
        var dataIds = "",
            strs = "",
            str = '',
            txt = $("#workListSendTxt").val(),
            fileViews = '',
            srcArr = [],
            nameArr = [],
            viewArr = [];
        $("#uploadView li").each(function () {
            dataIds += "_" + $(this).find("img").attr("data-id");
        });

        if (picReview.length) {
            for (var i = 0; i < picReview.length; i++) {
                str += '<img src="' + picReview[i] + '">';
            };
        };
        if ($("#uploadView li").length) {
            for (var k = 0; k < $("#uploadView li").length; k++) {
                srcArr.push($("#uploadView li").eq(k).find("img").attr("data-src"));
                nameArr.push($("#uploadView li").eq(k).find("span").html());
                viewArr.push($("#uploadView li").eq(k).find("img").attr("src"));
                fileViews += '<li><i></i><img data-src="' + srcArr[k] + '" class="uploadViewPic" src="' + viewArr[k] + '" alt=""><br><a href="' + (srcArr[k].indexOf('zip') != -1 ? srcArr[k] : "javascript:void(0);") + '" style="color: ' + (srcArr[k].indexOf('zip') != -1 ? "#03A5EE;" : "#000") + '"><span class="uploadViewName" title="' + nameArr[k] + '">' + nameArr[k] + '</span></a></li>';
            };
        };
        strs = '<div class="textWrapper" style="margin-top:20px;">' +
            '<div class="touRight">' +
            '<img src="' + proImgSrc + '" />' +
            '</div>' +
            '<div class="text right">' +
            '<span class="bagdR"></span>' +
            '<p class="text" style="margin-top:10px;">' + getNowFormatDate() + '</p>' +
            '<p class="text">' + txt + '</p>' +
            '<div class="needSend">' +
            '<ul class="uploadViews" class="clearfix">' +
            fileViews +
            '</ul>' +
            '</div>' +
            '<div class="clear"></div>' +
            '<div class="imagesWrap" style="">' +
            '<img src="">' +
            '</div>' +
            '<div class="imgWrap textWrapChildernR">' + str +
            '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
            '</div>';
        console.log(picReview);
        console.log(txt);
        console.log(dataIds);
        if (txt == "" && $("#uploadView li").length == 0) {
            alertUploadMsg("发送内容不能为空");
            return false;
        }
        ;
        $.ajax({
            url: baseLink + 'quoteApi/save_project_work',
            type: "post",
            data: {
                user_id: getCookie("user_id"),             //需求方或者服务方
                project_id: prosID,          //项目id
                content: txt,                //描述
                appendix: dataIds,           //附件id  （_id_id）
                project_work_id: ""          //工作内容id，可不填，填写表示修改，不填表示增加（这个没什么用）
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    $(strs).insertBefore(".textWrapperLast");
                    $("#uploadView").html("");
                    $("#workListSendTxt").val("");
                } else {
                    alertUploadMsg(res.message);
                }
            }, error: function (res) {
                console.log("发送失败");
                console.log(res);
            }
        });
    });
});

function achieveSrc(file) {
    if ('.jpg.png.gif.bmp.tif'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[1];
    } else if ('.doc.docx'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[0];
    } else if ('.xls.xlsx'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[8];
    } else if ('.ppt.pptx'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[5];
    } else if ('.pdf'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[4];
    } else if ('.txt'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[6];
    } else if ('.mp3'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[2];
    } else if ('.mp4'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[3];
    } else if ('.zip.rar'.indexOf(file.name.split(".")[1]) != -1) {
        src = fileTypeSrc[9];
    } else {
        src = fileTypeSrc[7];
    }
    ;
    return src;
}

function achieveSrcs(file) {
    if ('.jpg.png.gif.bmp.tif'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[1];
    } else if ('.doc.docx'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[0];
    } else if ('.xls.xlsx'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[8];
    } else if ('.ppt.pptx'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[5];
    } else if ('.pdf'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[4];
    } else if ('.txt'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[6];
    } else if ('.mp3'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[2];
    } else if ('.mp4'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[3];
    } else if ('.zip.rar'.indexOf(file.ext) != -1) {
        src = fileTypeSrc[9];
    } else {
        src = fileTypeSrc[7];
    }
    ;
    return src;
}