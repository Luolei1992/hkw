/**
 * Created by gs on 2017/6/5 0005.
 */
var proId = getLocationParam("id"),cusId = '',fatherTemp = '',
    uid = getLocationParam("uid");

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
                user_id:getCookie("user_id"),
                offset:0,
                limit:14
            },
        }).done(function (res) {
            /*模板*/
            if (res.data.item_list.length > 0){
                var valTemp1 = doT.template($("#yunLinkNametmpl").text());
                var valTemp2 = doT.template($("#yunLinkPhonetmpl").text());
                var valTemp3 = doT.template($("#yunLinkEmailtmpl").text());
                var valTemp4 = doT.template($("#yunLinkCompanytmpl").text());
                $("#yunLinkName").append(valTemp1(res.data.item_list));
                $("#yunLinkPhone").append(valTemp2(res.data.item_list));
                $("#yunLinkEmail").append(valTemp3(res.data.item_list));
                $("#yunLinkCompany").append(valTemp4(res.data.item_list));
            };
        });
    }
};

/*
 * 云报价客户信息手动输入联系人信息以json的形式发送到后台保存
 * */
function newLinkPerson(a) {
    var newLinkPerson = {
        linkName:a.linkName,
        linkCompany:a.linkCompany,
        linkPhone:a.linkPhone,
        linkEmail:a.linkEmail,
        project_id:proId,
        user_id:getCookie("user_id")
    };
    $.ajax({
        url:baseLink+'quoteApi/add_customer_for_project',   //发送到后台的数据地址,数据需要显示在选择联系人上弹窗,个人中心我的联系人页面
        type:"post",
        data:newLinkPerson,
        dataType:"json",
        error : function() {
        // 发送失败记录下来，给当前点击的按钮加上class为xhrError
            $("#formMsg1").attr("data-error","formMsg1");
            $("#formMsg1").removeClass("xhrSuccess");
            alertUploadMsg('保存失败！请重新保存！');
        },
        success:function (data) {
            if(data.success){
                proId = data.data.project_id;
                cusId = data.data.customer_id;
                $("#formMsg1").removeAttr("data-error","formMsg1");
                $("#formMsg1").addClass("xhrSuccess");
                $("#proMsgListEdit").addClass("yunPubHide");

                $("#proMsgListRe").removeClass("yunPubHide");
                $(".yunProgressMain ul li").eq(0).children("span").addClass("yunOpacity");
                final();
            }else{
                $("#formMsg1").attr("data-error","formMsg1");
                $("#formMsg1").removeClass("xhrSuccess");
                alertUploadMsg(res.message);
            }

            // var arr = [];
            // $(".yunShowMessage").find(".numShow").each(function (idx) {
            //     for(var i in newLinkPerson) {
            //         arr.push(newLinkPerson[i])
            //     }
            //     $(this).html(arr[idx]);
            // });
        }
    });
};

/*
 * 项目信息文件上传
 * */
function uploadFile() {
    var choose = document.getElementById('yun_allFile_upload');
    FileAPI.event.on(choose, 'change', function (evt){
        var files = FileAPI.getFiles(evt),
            isImage = true,
            isFile = true; // Retrieve file list
        FileAPI.filterFiles(files, function (file, info/**Object*/){
            if( /^image/.test(file.type) ){
                isFile = false;
                if(file.size > 10 * FileAPI.MB) {
                    alertUploadMsg("文件大小不能超过10M");
                    return false;
                }else{
                    return true;
                };
            }else if(/msword$|pdf$|vnd.ms-powerpoint$|vnd.ms-excel$|vnd.openxmlformats-officedocument.spreadsheetml.sheet$/.test(file.type)){
                isImage = false;
                if(file.size > 10 * FileAPI.MB) {
                    alertUploadMsg("文件大小不能超过10M");
                    return false;
                }else{
                    return true;
                };
            }else{
                isImage = false;
                isFile = false;
                if(file.size > 10 * FileAPI.MB) {
                    alertUploadMsg("文件大小不能超过10M");
                    return false;
                }else{
                    return true;
                };
            };
        }, function (files/**Array*/, rejected/**Array*/){
            var json = files[0];
            if( files.length ){
                if(isImage){
                    FileAPI.upload({
                        url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
                        files: {
                            Filedata: json
                        },
                        complete: function (err, xhr){
                            var upfileFilePath = (JSON.parse(xhr.responseText));
                            reviewPic(json,upfileFilePath);
                        }
                    });
                }else if(isFile){
                    FileAPI.upload({
                        url: 'https://www.huakewang.com/upload/upload_doc',
                        files: {
                            Filedata: json
                        },
                        complete: function (err, xhr){
                            var upfileFilePath = (JSON.parse(xhr.responseText));
                            uploadReview(json,upfileFilePath);
                        }
                    });
                }else{
                    FileAPI.upload({
                        url: 'https://www.huakewang.com/upload/uploadFile',
                        files: {
                            Filedata: json
                        },
                        complete: function (err, xhr){
                            var upfileFilePath = (JSON.parse(xhr.responseText));
                            uploadReview(json,upfileFilePath);
                        }
                    });
                }
            }
        });
    });
}
function reviewPic(json,upfileFilePath) {
    var fileList = '';
    if (upfileFilePath.success && ($("#uploadView li").length < 5)) {
        fileList = '<li><i></i><img title="预览" style="width: 48px;height: 48px;" class="uploadViewPic pubView" src="' + upfileFilePath.data.file_path + '" alt="" data-id="' + upfileFilePath.data.id + '" data-size="'+(json.size/1024/1024 > 1?(json.size/1024/1024).toFixed(2)+'MB':(json.size/1024).toFixed(2)+'KB')+'" data-file-path="'+upfileFilePath.data.file_path+'"><br><span class="uploadViewName" title="'+json.name+'">' + json.name + '</span></li>';
        $("#uploadView").append(fileList);
    } else {
        if ($("#uploadView li").length == 5) {
            alertUploadMsg('最多上传5个文件！');
        };
        return false;
    };
}
function uploadReview(json,upfileFilePath) {
    var src = '';
    if ('.jpg.png.gif.bmp.tif'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[1];
    } else if ('.doc.docx'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[0];
    } else if ('.xls.xlsx'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[8];
    } else if ('.ppt.pptx'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[5];
    } else if ('.pdf'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[4];
    } else if ('.txt'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[6];
    } else if ('.mp3'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[2];
    } else if ('.mp4'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[3];
    } else if ('.zip.rar'.indexOf(json.name.split(".")[1]) != -1) {
        src = fileTypeSrc[9];
    } else {
        src = fileTypeSrc[7];
    };
    var fileList = '';
    if (upfileFilePath.success && ($("#uploadView li").length < 5)) {
        fileList = '<li><i></i><img class="uploadViewPic pubView" src="' + src + '" alt="" data-id="' + upfileFilePath.data.id + '" data-size="'+(json.size/1024/1024 > 1?(json.size/1024/1024).toFixed(2)+'MB':(json.size/1024).toFixed(2)+'KB')+'" data-file-path="'+upfileFilePath.data.abs_file_path+'"><br><span class="uploadViewName" title="'+json.name+'">' + json.name + '</span></li>';
        $("#uploadView").append(fileList);
    } else {
        if ($("#uploadView li").length == 5) {
            alertUploadMsg('最多上传5个文件！');
        };
        return false;
    };
}
/*
 * 云报价项目信息数据上传
 * */
function newProjectMsg(msg1,msg2,msg3) {
    var ids = '';
    $("#uploadView li").each(function () {
        ids += '_'+$(this).find("img").attr('data-id');
        return ids;
    });
    var newProjectMsg = {
        projectName:msg1,                     //项目信息标题  （字符串）
        appendixs:ids,	                      //项目信息的附件   （格式_id_id_id对吗？？）
        projectDealine:msg3.replace(/年/,"-").replace(/月/,"-").replace(/日/,""),
        projectDescription:msg2,              //项目信息描述   （字符串）
        project_id:proId,                      //项目id    （首次保存没有项目的id）
        user_id:getCookie('user_id')
    };
    $.ajax({
        type:"post",
        data:newProjectMsg,
        url:baseLink+"quoteApi/SaveMainProject",
        dataType:"json",
        error : function(res) {
            $("#formMsg2").attr("data-error","formMsg2");
            $("#formMsg2").removeClass("xhrSuccess");
            alertUploadMsg('保存失败，请重新保存！');
        },
        success:function (data) {
            if(data.success) {
                proId = data.data;
                $("#formMsg2").removeAttr("data-error","formMsg2");
                $("#formMsg2").addClass("xhrSuccess");
                $(".yun-payPercent,.yun-payNode,.yun-payDes,.yunSzyh").removeProp("readonly");
                $("#proMsgEdit").addClass("yunPubHide");
                $("#proMsgEditRe").removeClass("yunPubHide");
                $(".yunProgressMain ul li").eq(1).children("span").addClass("yunOpacity");
                final();
            }else{
                $("#formMsg2").attr("data-error","formMsg2");
                $("#formMsg2").removeClass("xhrSuccess");
                alertUploadMsg(data.message);
            };

        }
    });
};
/*
* 点击确定把选择的模板(数据)加到报价单上
* 点击新建模板添加个新的报价单
* */
var sign = 0;
function newTemp() {
    $("body").on("click",".yun_tempPrice .btn_1",function () {
        if($(".yun_tempPubStyle li").hasClass("yun_tempClickDif") || $(".yun_tempHistory li").hasClass("yun_tempClick")){
            $(".yun-tempPriceWrap").css("display","none");
            $(".yun_tempPrice").css("display","none");
            /*ajax请求模板内容*/
            $.ajax({
                url: "temp.html", //项目报价单页面地址
                type:"get",
                success: function (html) {
                    var leiXing='',hist='',xhrData={},xhrUrl={};
                    if ($(".yun_tempPubStyle li").hasClass("yun_tempClickDif")) {
                        //官方模板
                        leiXing = $(".yun_tempClickDif").html();
                        xhrData={menu_name:leiXing};
                        xhrUrl = baseLink+"quoteApi/get_public_quote_template";
                        dataTempXhrRender(xhrUrl,xhrData,html);
                    }else if ($(".yun_tempHistory li").hasClass("yun_tempClick")) {
                        //历史报价
                        hist = $(".yun_tempClick").attr("data-hs");
                        xhrUrl = baseLink+'quoteApi/get_sub_project_list';
                        xhrData = {project_id:hist,user_id:getCookie("user_id")};
                        dataTempXhrRender(xhrUrl,xhrData,html);
                    };
                }
            });
            $(".yun-price .yunSubmitWrap").css("display","block");
        }else{
            $(".alertMessage").addClass("alertMessage_lg");
            setTimeout(function () {
                $(".alertMessage").removeClass("alertMessage_lg");
            },2000);
            $(".alertMessage").on("click",".alertClose",function () {
                $(this).parent().removeClass("alertMessage_lg");
            });
        };

    });
    /*点击创建新模板*/
    $("body").on("click",".yun_tempNew",function () {
        $(".yun-tempPriceWrap").css("display","none");
        $(".yun_tempPrice").css("display","none");
        $.ajax({
            url: "temp1.html", //模板地址
            async: false,
            success: function (html) {
                //html即是html里的内容
                //$("#yunPriceForm")获取div对象
                //报价是应该覆盖原来的还是新增加一个
                // if($core){
                //     sign ++;
                //     $("#yunPriceForm").append('<div id='+sign+'>'+html+'</div>');
                //     $(".delete").parent().remove();
                // }else{
                    sign ++;
                    $("#yunPriceForm").append('<div id='+sign+'>'+html+'</div>');
                // };
            }
        });
        $(".yun-price .yunSubmitWrap").css("display","block");
    });
};
//把报价单历史报价和官方报价的模板渲染到页面
function dataTempXhrRender(url,datas,html) {
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        data:datas,
        success:function (data) {
            if(data.success) {
                //遍历历史报价有几个报价单data[val]["parts"]
                pricePicShow(data,html);
                linkData();
            }else{
                alertUploadMsg(data.message);
            }
        },error:function (res) {
            alertUploadMsg(res.message);
        }
    })
};
function pricePicShow(data,html) {
    for(var i = 0;i < data.data.length;i++) {
        sign++;
        var temp = data.data[i];
        $("#yunPriceForm").append('<div id='+sign+'>'+html+'</div>');
        //对应id的报价单名称
        $("#"+sign+" .yun-mainPrice-t input").val(temp["priceName"]);
        //对应id的报价单备注
        $("#"+sign+" .yun-remark textarea").val(temp["remarks"]);
        //对应id的报价单所有条目总计
        $("#"+sign+" .yun-totalColor").html('￥<i>'+temp["totalAll"]+'</i>元');
        //报价单有几部分
        for(var k = 0;k <temp["parts"].length;k++){
            var trim = temp["parts"][k],
                num = k+1,
                idOrder = "0"+k;
            var strl = '<div class="yun-part clearfix  yun_partLis" id='+idOrder+'><div class="yun-firstPart-T"><span class="yun-partOrder">第<span class="yun-partOrderLis">'+num+'</span>部分</span> <input class="yun-details" type="text" placeholder="请尽可能写清楚内容，文件格式，数量等，以免造成不必要的麻烦！" value='+trim["description"]+'> <input class="yun-submitResult" type="text" placeholder="提交产物" value='+trim["achievement"]+'> <i class="yunPubPart yunPlusPart">添加</i><i class="yunPubPart yunReducePart">删除</i></div><ol class="yunFirstOl clearfix"><li class="yunFirstOl1">序号</li><li class="yunFirstOl2">内容</li><li class="yunFirstOl3">内容和成果描述</li><li class="yunFirstOl4">单位</li><li class="yunFirstOl5">单价</li><li class="yunFirstOl6">数量</li><li class="yunFirstOl7"><select name=""><option data-staus="y">要发票(税6%)</option><option data-staus="n">不要发票</option></select></li> <li class="yunFirstOl8">合计</li></ol></div>';
            /*只有第一部分才有ol列表*/
            if(k>0) {
                strl = strl.replace('<ol class="yunFirstOl clearfix"><li class="yunFirstOl1">序号</li><li class="yunFirstOl2">内容</li><li class="yunFirstOl3">内容和成果描述</li><li class="yunFirstOl4">单位</li><li class="yunFirstOl5">单价</li><li class="yunFirstOl6">数量</li><li class="yunFirstOl7"><select name=""><option data-staus="y">要发票(税6%)</option><option data-staus="n">不要发票</option></select></li> <li class="yunFirstOl8">合计</li></ol>','');
            };
            $(strl).insertBefore($("#"+sign+" .yun-moneyTotal"));
            //每部分有几条信息
            for (var j = 0;j<temp["parts"][k]["part"].length;j++) {
                var tim = temp["parts"][k]["part"][j];
                var str = '<ul class="yunFirstUl clearfix"><li><input class="yun-order" value='+tim["order_index"]+' disabled></li><li><input class="yun-inputContent" type="text" value='+tim["content"]+'></li><li><input class="yun-inputDetails" type="text" value='+tim["desResult"]+'></li><li><input class="yun-inputUnit" type="text" value='+tim["unit"]+'></li><li><input class="yun-inputPrice" onkeyup="clearNoNum(this)" type="text" value='+tim["price"]+'></li><li class="yunPlusNumberWrap"><input class="yun-inputNum" type="text" onkeyup="clearNoNumInt(this)" value='+tim["number"]+'><i class="yunChangeNumber yunReduceNumber">-</i><i class="yunChangeNumber yunPlusNumber">+</i></li><li><input disabled class="yun-rate" value='+tim["rate"]+'></li><li><input disabled class="yun-total" value='+tim["total"]+'></li><li class="yunIconRight"><i class="yunD" title="下移"></i><i class="yunU" title="上移"></i><i class="yunC" title="删除"></i><i class="yunP" title="添加"></i></li></ul>';
                $("#"+sign+' #'+idOrder+".yun_partLis").append(str);
            }
        };
        var $options = $("#"+sign+" .yunFirstOl7 option");
        for(var n = 0;n<$options.length;n++){
            if($options.eq(n).html() == temp["cash"]){
                $options.eq(n).attr("selected","true");
            };
        };
    };
}
/*
* 获取项目报价单的数据发送到后台
* 点击保存时发送数据
* */

var yunGlobal = {},flag = true;
function dataConversion() {
    yunGlobal.history = [];
    yunGlobal.history[0] = {};
    yunGlobal.history[0].section = {};
    yunGlobal.history[0].section.main = [];
    var len = $("#yunPriceForm>div").find("form").length;
    /*报价单数量获取*/
    for(var r = 0;r < len; r++){
        yunGlobal.history[0].section.main[r] = {};
        yunGlobal.history[0].section.main[r].parts = [];
        yunGlobal.history[0].section.main[r].priceName = $("#yunPriceForm>div").eq(r).find("form").find(".yun-mainPrice-t input").val();
        yunGlobal.history[0].section.main[r].cash = $("#yunPriceForm>div").eq(r).find("form").find("select").val();
        yunGlobal.history[0].section.main[r].remarks = $("#yunPriceForm>div").eq(r).find("form").find(".yun-remark textarea").val();
        yunGlobal.history[0].section.main[r].totalAll = $("#yunPriceForm>div").eq(r).find("form").find(".yun-moneyTotal i").html();

		// yunGlobal.history[0].section.main[r].project_id = window.project_id;

        var long = $("#yunPriceForm>div").eq(r).find(".yun-part").length;
        /*每个报价单部分的数量*/
        for (var s = 0; s < long; s++){
            yunGlobal.history[0].section.main[r].parts[s] = {};
            yunGlobal.history[0].section.main[r].parts[s].part = [];
            yunGlobal.history[0].section.main[r].parts[s].description = $("#yunPriceForm>div").eq(r).find(".yun-part").eq(s).find(".yun-details").val();
            yunGlobal.history[0].section.main[r].parts[s].achievement = $("#yunPriceForm>div").eq(r).find(".yun-part").eq(s).find(".yun-submitResult").val();
            yunGlobal.history[0].section.main[r].parts[s] = yunGlobal.history[0].section.main[r].parts[s];
            //每部分有几条数据
            var picL = $("#yunPriceForm>div").eq(r).find(".yun-part").eq(s).find("ul").length;
            for(var t = 0;t < picL; t++){
                //每条数据的input值
                yunGlobal.history[0].section.main[r].parts[s].part[t] = {};
                function get(num) {
                    return  $("#yunPriceForm>div").eq(r).find(".yun-part").eq(s).find(".yunFirstUl").eq(t).find("input").eq(num).val();
                };
                yunGlobal.history[0].section.main[r].parts[s].part[t].order = get(0);
                yunGlobal.history[0].section.main[r].parts[s].part[t].content = get(1);
                yunGlobal.history[0].section.main[r].parts[s].part[t].desResult = get(2);
                yunGlobal.history[0].section.main[r].parts[s].part[t].unit = get(3);
                yunGlobal.history[0].section.main[r].parts[s].part[t].price = get(4);
                yunGlobal.history[0].section.main[r].parts[s].part[t].number = get(5);
                yunGlobal.history[0].section.main[r].parts[s].part[t].rate = get(6);
                yunGlobal.history[0].section.main[r].parts[s].part[t].total = get(7);
                yunGlobal.history[0].section.main[r].parts[s].part[t] = yunGlobal.history[0].section.main[r].parts[s].part[t];
            };
        };
    };
};
function proSaveShow(flag) {
    /*报价单数据获取*/
    dataConversion();
    /*数据渲染到保存状态*/
    if(flag) {
        quotationRender(yunGlobal.history[0].section.main);
    };
    var dataLis = {
        data : yunGlobal,
        user_id : getCookie('user_id'),
        project_id:proId
    };

    $.ajax({
        url:baseLink+"quoteApi/saveProjects",
        type:"post",
        data:dataLis,
        dataType:"json",
        success:function (data) {
            if(data.success) {
                proId = data.data.project_id;
                $(".yun-payPercent,.yun-payNode,.yun-payDes,.yunSzyh").removeProp("readonly");
                $("#canMsg4").addClass("canMsg").removeProp("disabled");
                $("#formMsg3").attr("data-error","formMsg3");
                $("#formMsg3").addClass("xhrSuccess");

                $(".payTotal i.payTotalNum").html(globalVariable.toFixed(2));
                $(".payTotal i.payTotalStr").html(totalTem.toFixed(2));

                $("#tipMsgEdit").addClass("yunPubHide");
                $("#tipMsgEditRe").removeClass("yunPubHide");
                $(".yun-payWay .yun-payFor .payTotal").css("display","block");
                $(".yunProgressMain ul li").eq(2).children("span").addClass("yunOpacity");
                payCoupon();
                final();
            }else {
                alertUploadMsg(data.message);
                $("#formMsg3").removeAttr("data-error","formMsg3");  //保存失败
                $("#formMsg3").removeClass("xhrSuccess");
            };
        },
        error : function (data) {
            $("#formMsg3").removeAttr("data-error","formMsg3");
            $("#formMsg3").removeClass("xhrSuccess");
            alertUploadMsg(data.message);
        }
    });
};
/*
 * 项目报价单的数据联动
 * */
var globalVariable,totalTem;
var linkData = function () {
    globalVariable=0,totalTem = 0;
    $("#yunPriceForm").find(".yunFirstUl").each(function () {
        var cash = $(this).parents("form").find("select").val();
        var price = $(this).find(".yun-inputPrice").val();
        var num = $(this).find(".yun-inputNum").val();
        var product = price*num;
        if(cash == "要发票(税6%)"){
            $(this).find(".yun-rate").val((product*0.06).toFixed(2));
            $(this).find(".yun-total").val((product*1.06).toFixed(2));
        }else{
            $(this).find(".yun-rate").val("0.00");
            $(this).find(".yun-total").val(product.toFixed(2));
        };
    });
    //计算每个报价单的总价
    var temp,tem;
    $("#yunPriceForm").find("form").each(function () {
        temp = 0,tem=0;
        $(this).find(".yunFirstUl").each(function () {
            tem += ($(this).find(".yun-rate").val()-0);
            temp += ($(this).find(".yun-total").val()-0);
        });
        globalVariable += temp;
        totalTem += tem;
        $(this).find(".yun-totalColor i").html(temp.toFixed(2));

    });
};
$(document).on("keyup",".yun-inputPrice,.yun-inputNum",function () {
    linkData();
});
$(document).on("change","#yunPriceForm select",function () {
    var staus = $(this).find("option:selected").attr("data-staus");
    linkData();
    isCash(staus);
});
function isCash(stats) {
    if(stats == "y"){
        $("#yunPriceForm select").each(function () {
            $(this).find("option[data-staus=y]").removeProp("selected").prop("selected","selected");
            linkData();
        });
    }else if(stats == "n"){
        $("#yunPriceForm select").each(function () {
            $(this).find("option[data-staus=n]").removeProp("selected").prop("selected","selected");
            linkData();
        });
    };
}
/*
* 付款方式数据联动
* */

/*
* 付款方式点击保存后展示数据(项目总计,优惠价,百分比的整条数据)
* */
var arr = [],
    arrTotal = '',
    discountTotal = '',
    discountYh = '',
    arrDiscount = '',
    gloab,paygloab;
function payWayShowData() {
    arrTotal = $("#yunPayForm .payTotal i").html();
    discountTotal = $(".payTotalStr").html();
    discountYh = $(".yunYHZKstr").html();
    arrDiscount = $("#yunPayForm .yunSzyh").val();
    $("#yunPayForm .yunFirstUl").each(function (idx) {
        arr[idx] = new Array();
        $(this).find("input").each(function () {
            arr[idx].push($(this).val());
        });
        arr[idx][arr[idx].length-1] = arr[idx][arr[idx].length-1].replace(/\(含税:/,"").replace(/元\)/,"");
    });
    //云报价付款方式保存数据渲染
    payWayShowDataDetails(arrTotal,arrDiscount,arr,discountTotal,discountYh);

    var payWayObj = {
        arrTotal:arrTotal,                             //打折前的总价
        arrDiscount:arrDiscount,                       //打折后的总价
        arr:arr,                                       //每条数据
        discountCashMoney:discountYh,                  //打折后的税金
        totalCashMoney:$(".payTotalStr").html(),       //打折前的税金
		project_id:proId,
        user_id:getCookie("user_id")
    };
    $.ajax({
        url:baseLink + "quoteApi/savePayStages",
        type:"post",
        data:payWayObj,
        dataType:"json",
        error:function (res) {
            $("#formMsg4").attr("data-error","formMsg4");
            $("#formMsg4").removeClass("xhrSuccess");
            alertUploadMsg("保存失败，请重新保存！");
        },
        success:function (res) {
            if(res.success) {
                $("#formMsg4").addClass("xhrSuccess");
                $("#payMsgEdit").addClass("yunPubHide");
                $("#payMsgEditRe").removeClass("yunPubHide");
                $("#formMsg4").removeAttr("data-error","formMsg4");
                $(".yunProgressMain ul li").eq(3).children("span").addClass("yunOpacity");
                final();
            }else{
                $("#formMsg4").attr("data-error","formMsg4");
                $("#formMsg4").removeClass("xhrSuccess");
                alertUploadMsg(res.message);
            };
        },error:function (res) {
            $("#formMsg4").attr("data-error","formMsg4");
            $("#formMsg4").removeClass("xhrSuccess");
            alertUploadMsg("保存失败，请重新保存！");
        }
    });
};
/*
* 报价单数量加减数据联动
* */
var data1 = {
    el1:".yunChangeNumber",
    el2:"yunReduceNumber",
    el3:"yunPlusNumber",
    el4:".yun-inputNum",
    func:function () {
        linkData();
    }
};
var data2 = {
    el1:".yunPayNumber",
    el2:"yunPayReduceNumber",
    el3:"yunPayPlusNumber",
    el4:".yun-payPercent",
    func:function () {
        yunPayTotalPersent();
    }
};
function yunChangeNumber(data) {
    $(document).on("click",data.el1,function () {
        var yunChange = $(this).parent().find(data.el4);
        var num = yunChange.val();
        // 如果输入框内的值为空或者0，点击减号就不做处理
        if($(this).hasClass(data.el2)){
            if(num == "" || num == 1){
                return false;
            };
            num = --num;
            yunChange.val(num);
        }else if($(this).hasClass(data.el3)){
            num = ++num;
            yunChange.val(num);
        };
        if(num != "") {
            yunChange.removeClass("borderRed");
        }
        data.func();
        event.preventDefault();
    });
};
yunChangeNumber(data1);
yunChangeNumber(data2);
/*
* 付款方式数据联动
* */
var yunPayTotalPersent = function () {};
/*
* 输入框百分比改变数据联动
* */
function percentLink() {
    $(document).on("keyup",".yun-payPercent",function () {
        yunPayTotalPersent();
    });
}
function payCoupon() {
    var payTotal = $(".payTotal i").html();
    //自定义的输入框
    $(".yunSzyh").keyup(function () {
        var yunSzyh = $(".yunSzyh").val(),
        num = Math.floor(yunSzyh/payTotal*1000)/100;
        if(num > 6 && num < 10){
            $('.yunSzyh').removeClass('borderRed');
            $('#payWarring').css("display","none");
        }else{
            $('.yunSzyh').addClass('borderRed');
            $('#payWarring').css("display","block");
        };
        if($(this).val() == "") {
            $('.yunSzyh').removeClass('borderRed');
            $('#payWarring').css("display","none");
            $(".yunYHZK,.payCouponTotal,.payCouponTotalP").css("display","none");
        }else{
            $(".yunYHZK,.payCouponTotal,.payCouponTotalP").css("display","inline-block");
            $(".payCouponTotal i").html((yunSzyh-0).toFixed(2));
            $(".yunYHZK i.yunYHZKnum").html((num.toFixed(2)));
            if($(".payTotalStr").html() != "0.00"){
                $(".yunYHZK i.yunYHZKstr").html((Math.floor(yunSzyh/1.06*0.06)).toFixed(2));
            }else{
                $(".yunYHZK i.yunYHZKstr").html('0.00');
            };
        };
        yunPayTotalPersent();
    });
    $(".payCouponTotal i").html(payTotal);
    // 折扣计算
    yunPayTotalPersent = function () {
        $(".yun-fuM").each(function () {
            //判断优惠价是不是显示出来
            var per = $(this).find(".yun-payPercent").val(),
                yh = $(".yunSzyh").val();
            if($(".payCouponTotal").css("display") == "none"){
                $(this).find(".yun-payTotal").val((payTotal*per/100).toFixed(2));
                $(this).find(".yun-payDiscountPic").val('(含税:'+($(".payTotalStr").html()*per/100).toFixed(2)+'元)')
            }else{
                $(this).find(".yun-payTotal").val((per*yh/100).toFixed(2));
                $(this).find(".yun-payDiscountPic").val('(含税:'+($(".yunYHZKstr").html()*per/100).toFixed(2)+'元)');
            };
        });
    };
    yunPayTotalPersent();
};
//预览
function viewPic(type,src) {
    if('.jpg.png.gif.bmp.tif'.indexOf(type) != -1) {
        $(".viewFilePicWrap").css("display","block");
        $(".viewFilePic").html('<img src="'+src+'" width="100%">').css("display","block");
    }else if('.pdf.doc.xls.xlsx'.indexOf(type) != -1){
        $(".viewFilePicWrap").css("display","block");
        $(".viewFilePic").html('<embed src="'+src+'.swf" quality="high" style="margin-bottom: -40px;position:relative;left: 50%;margin-left: -600px;width: 1200px;height: 860px;" align="middle" allowscriptaccess="always" allowfullscreen="true" mode="transparent" type="application/x-shockwave-flash">').css("display","block");
    }else {
        return;
    };
};
$(function () {
    yunAlertP1();
    caoGao();
    uploadFile();
    newTemp();
    percentLink();
    //修改报价
    if(proId){
        //分别请求四部分的数据，渲染到页面
        $.ajax({
            //第一部分
            url:baseLink+'quoteApi/get_customer_info',
            type:"post",
            data:{
                user_id:getCookie("user_id"),
                project_id:proId
            },
            dataType:"json",
            success:function (res) {
                //成功返回数据
                if(res.success){
                    //渲染为保存后的状态
                    $(".yun-kehuMessageUl li").eq(0).find(".numShow").html(res.data.yunLinkName);
                    $(".yun-kehuMessageUl li").eq(1).find(".numShow").html(res.data.yunLinkCompany);
                    $(".yun-kehuMessageUl li").eq(3).find(".numShow").html(res.data.yunLinkEmail);
                    $(".yun-kehuMessageUl li").eq(2).find(".numShow").html(res.data.yunLinkPhone);
                    $("#username").val(res.data.yunLinkName);
                    $("#companyName").val(res.data.yunLinkCompany);
                    $("#email").val(res.data.yunLinkEmail);
                    $("#phone").val(res.data.yunLinkPhone);
                    $("#formMsg1").addClass("xhrSuccess");
                    $(".yunProgressMain ul li").eq(0).children("span").addClass("yunOpacity");
                    final();
                }else{
                    $("#proMsgListEdit").removeClass("yunPubHide");
                    $("#proMsgListRe").addClass("yunPubHide");
                };
            },error:function (res) {
                $("#proMsgListEdit").removeClass("yunPubHide");
                $("#proMsgListRe").addClass("yunPubHide");
            }
        });
        $.ajax({
            //第二部分
            url:baseLink+'quoteApi/get_main_project_info',
            type:"post",
            data:{
                user_id:getCookie("user_id"),
                project_id:proId
            },
            dataType:"json",
            success:function (res) {
                if(res.success){
                    var fileList = '',fileLists = '',fileSrc='',src='',dataFilePath='',
                        dataArr = res.data.projectDealine.split(" ")[0].split("-");
                    $(".yun-messageShowNameR").html(res.data.projectName);
                    $("#companyCall").val(res.data.projectName);
                    $(".yun-messageShowSummaryR").html(res.data.projectDescription);
                    $("#need").val(res.data.projectDescription);

                    $(".yun-messageShowDataR").html(dataArr[0]+'年'+dataArr[1]+'月'+dataArr[2]+'日');
                    $("#dateinfo").val(dataArr[0]+'年'+dataArr[1]+'月'+dataArr[2]+'日');

                    for (var i = 0;i < res.data.appendixs.length;i++) {
                        fileSrc = res.data.appendixs[i].ext;
                        if('.jpg.png.gif.bmp.tif'.indexOf(fileSrc) != -1) {
                            src = res.data.appendixs[i].path;
                            dataFilePath = res.data.appendixs[i].path;
                        }else if('.pdf.doc.xls.xlsx'.indexOf(fileSrc) != -1){
                            src = getSrcDetail(fileSrc);
                            dataFilePath = res.data.appendixs[i].path;
                        }else {
                            src = getSrcDetail(fileSrc);
                            dataFilePath = res.data.appendixs[i].path;
                        };
                        fileList += '<div class="yunFujianWrap clearfix"><img width="48" height="48" class="fl pubView" src="'+src+'" alt="" data-file-path="'+dataFilePath+'"><p title="'+res.data.appendixs[i].name+'">'+res.data.appendixs[i].name+'</p><span>'+((res.data.appendixs[i].size)/1024/1024 > 1?((res.data.appendixs[i].size)/1024/1024).toFixed(2)+'MB':(res.data.appendixs[i].size/1024).toFixed(2)+'KB')+'</span><a href="'+res.data.appendixs[i].path+'">下载</a></div>';
                    };
                    for (var j = 0;j < res.data.appendixs.length;j++) {
                        fileSrc = res.data.appendixs[j].ext;
                        src = getSrcDetail(fileSrc);
                        if('.jpg.png.gif.bmp.tif'.indexOf(fileSrc) != -1) {
                            src = res.data.appendixs[j].path;
                            dataFilePath = res.data.appendixs[j].path;
                        }else if('.pdf.doc.xls.xlsx'.indexOf(fileSrc) != -1){
                            src = getSrcDetail(fileSrc);
                            dataFilePath = res.data.appendixs[j].path+'.swf';
                        }else {
                            src = getSrcDetail(fileSrc);
                            dataFilePath = res.data.appendixs[j].path;
                        };
                        fileLists += '<li><i></i><img width="48" height="48" class="uploadViewPic pubView" src="' + src + '" alt="" data-id="' + res.data.appendixs[j].id + '" data-size="'+((res.data.appendixs[j].size)/1024/1024 > 1?((res.data.appendixs[j].size)/1024/1024).toFixed(2)+'MB':(res.data.appendixs[j].size/1024).toFixed(2)+'KB')+'" data-file-path="'+dataFilePath+'"><br><span class="uploadViewName" title="'+res.data.appendixs[j].name+'">' + res.data.appendixs[j].name + '</span></li>';
                    };
                    $(".yun-messageShowAddR").append(fileList);  //保存后的
                    $("#uploadView").append(fileLists);         //保存钱的
                    $("#formMsg2").addClass("xhrSuccess");
                    $(".yunProgressMain ul li").eq(1).children("span").addClass("yunOpacity");
                    final();
                }else{
                    $("#proMsgEdit").removeClass("yunPubHide");
                    $("#proMsgEditRe").addClass("yunPubHide");
                    $("#dateinfo").val(b());
                };
            },error:function (res) {
                $("#proMsgEdit").removeClass("yunPubHide");
                $("#proMsgEditRe").addClass("yunPubHide");
            }
        });
        function getSrcDetail(fileSrc){
            if ('.jpg.png.gif.bmp.tif'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[1];
            } else if ('.doc.docx'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[0];
            } else if ('.xls.xlsx'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[8];
            } else if ('.ppt.pptx'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[5];
            } else if ('.pdf'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[4];
            } else if ('.txt'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[6];
            } else if ('.mp3'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[2];
            } else if ('.mp4'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[3];
            } else if ('.zip.rar'.indexOf(fileSrc) != -1) {
                return fileTypeSrc[9];
            } else {
                return fileTypeSrc[7];
            };
        }
        $.ajax({
            //第三部分
            url:baseLink+'quoteApi/get_sub_project_list',
            type:"post",
            data:{
                user_id:getCookie("user_id"),
                project_id:proId
            },
            dataType:"json",
            success:function (res) {
                var totleMon = 0;
                if(res.success){
                    gloab = res.data;
                    quotationRender(res.data);
                    $(".yun-price .yunSubmitWrap").css("display","block");
                    for(var l = 0;l < res.data.length;l++){
                        totleMon += (res.data[l].totalAll-0)
                    };
                    $.ajax({
                        url: "temp.html", //项目报价单页面地址
                        type:"get",
                        async:false,
                        success: function (html) {
                            pricePicShow(res,html);
                            $(".yun-payWay .yun-payFor .payTotal").css("display","block").find(".payTotalNum").html(totleMon.toFixed(2)).next().find(".payTotalStr").html((totleMon*0.06).toFixed(2));
                            payCoupon();
                            $(".yun-payPercent,.yun-payNode,.yun-payDes,.yunSzyh").removeProp("readonly");
                        }
                    });
                    $("#formMsg3").addClass("xhrSuccess");
                    $(".yunProgressMain ul li").eq(2).children("span").addClass("yunOpacity");
                    final();
                }else{
                    $("#tipMsgEdit").removeClass("yunPubHide");
                    $("#tipMsgEditRe").addClass("yunPubHide");
                };
            },error:function () {
                $("#tipMsgEdit").removeClass("yunPubHide");
                $("#tipMsgEditRe").addClass("yunPubHide");
            }
        });
        $.ajax({
            //第四部分
            url:baseLink+'quoteApi/get_pay_stage_list',
            type:"post",
            data:{
                user_id:getCookie("user_id"),
                project_id:proId
            },
            dataType:"json",
            success:function (res) {
                if(res.success){
                    paygloab = res;
                    payWayShowDataDetails(res.data.arrTotal,res.data.arrDiscount,res.data.arr,res.data.totalCashMoney,res.data.discountCashMoney);
                    $(".yun-payWay .yun-payFor .payTotal").css("display","block").find(".payTotalNum").html(res.data.arrTotal).next().find(".payTotalStr").html(res.data.totalCashMoney);
                    if(window.location.href.indexOf('yunShow.html') != -1){
                        if(res.data.arrDiscount != ''){
                            $(".yunSzyh").val(res.data.arrDiscount);
                            $(".yunYHZK").css("display","inline-block").find(".yunYHZKnum").html((res.data.arrDiscount/res.data.arrTotal*10).toFixed(2)).next().find(".yunYHZKstr").html((res.data.arrDiscount/1.06*0.06).toFixed(2));
                            $(".payCouponTotalP,.payCouponTotal").css("display","block");
                            $(".payCouponTotal i").html(res.data.arrDiscount);
                        };
                        var sts = '',
                            st = '<ol class="yunFirstOl yun-fuT clearfix"> <li class="yun-payWay1">序号</li> <li class="yun-payWay2">百分比(%)</li> <li class="yun-payWay3">付款节点</li> <li class="yun-payWay4">描述</li> <li class="yun-payWay5">合计</li></ol>';
                        for(var i = 0;i < res.data.arr.length;i++){
                            sts += '<ul class="yunFirstUl yun-fuM clearfix"><li><input class="yun-order" value="'+res.data.arr[i][0]+'" disabled></li><li class="yunPlusNumberWrap"><input class="yun-payPercent" type="text" onkeyup="clearNoNumInt(this);" value="'+res.data.arr[i][1]+'"><i class="yunPayNumber yunPayReduceNumber">-</i><i class="yunPayNumber yunPayPlusNumber">+</i></li> <li><input class="yun-payNode" type="text" placeholder="如:确认接受订单" value="'+res.data.arr[i][2]+'"></li><li><input class="yun-payDes" type="text" placeholder="如:预付款" value="'+res.data.arr[i][3]+'"></li><li><input class="yun-payTotal" value="'+res.data.arr[i][4]+'" disabled><i><input type="text" class="yun-payDiscountPic" value="(含税:'+res.data.arr[i][5]+'元)" disabled></i></li> <li class="yunIconRight"><i class="yunD" title="下移"></i><i class="yunU" title="上移"></i><i class="yunC" title="删除"></i><i class="yunP" title="添加"></i></li></ul>';
                        };
                        $("#yun-tepWay").html(st+sts);
                    };
                    $("#formMsg4").addClass("xhrSuccess");
                    $(".yunProgressMain ul li").eq(3).children("span").addClass("yunOpacity");
                    final();
                }else{
                    $("#payMsgEdit").removeClass("yunPubHide");
                    $("#payMsgEditRe").addClass("yunPubHide");
                };
            },error:function () {
                $("#payMsgEdit").removeClass("yunPubHide");
                $("#payMsgEditRe").addClass("yunPubHide");
            }
        });
    }
    //发送全部报价
    var jsonPart = ["客户信息","项目信息","项目报价单","付款方式"];
    $(".yunProgressEnd").click(function () {
        //判断保存了几项
        if($(".yunProgressMain ul li .yunOpacity").length == 4) {
            $(".endAllSendBg").css("display","block");
            $(".endAllSendGif").css("display","block");
            $.ajax({
                url:baseLink+'quoteApi/send_quote',
                type:'post',
                data:{
                    user_id:getCookie("user_id"),
                    project_id:proId
                },
                cache:false,
                dataType:"json",
                success:function (res) {
                    if(res.success){
                        $(".endAllSendLeft").html('<img src="'+res.message+'?'+Math.random()+'" width="160" height="160"><i class="ewmrefalsh">点击刷新二维码</i>');
                        $(".endAllSendSee a").attr("href","yunShowDisabled.html?id="+proId);
                        $(".endAllSendEmail span").html($("#username").val());
                        $(".endAllSendEmail i").html($("#email").val());
                        $(".endAllSendPhone span").html($("#phone").val());
                        $(".endAllSendGif").css("display","none");
                        $(".endAllSendBg").css("display","block");
                        $(".endAllSend").css("display","block");
                    }else{
                        alertUploadMsg(res.message);
                    };
                },
                error:function (res) {
                    console.log(res);
                    // alertUploadMsg('请不要连续点击！');
                }
            });
        }else{
            $(".yunProgressMain ul li").each(function (idx) {
                var idn = idx-0+1;
                if($(this).find("span").hasClass("yunOpacity")) {
                    console.log($(this).hasClass("yunOpacity"))
                }else{
                    $("#formMsg"+idn).click();
                    $(".yunProgressMain ul li").eq(idx).click();
                    alertUploadMsg("请先保存"+jsonPart[idx]);
                    return false;
                }
            })
        };
    });
    //刷新页面二维码
    $(document).on("click",".ewmrefalsh",function () {
        $.ajax({
            url:baseLink+'quoteApi/get_quote_qrcode',
            type:'post',
            data:{
                user_id:getCookie("user_id"),
                project_id:proId
            },
            cache:false,
            dataType:"json",
            success:function (res) {
                if(res.success){
                    $(".endAllSendLeft img").attr("src",res.message+'?'+Math.random());

                }else{
                    alertUploadMsg(res.message);
                };
            },
            error:function (res) {
                alertUploadMsg('发送失败！请重新发送');
            }
        });
    });
    //重新编辑取消按钮
    $("#canMsg1").click(function () {
        if($("#formMsg1").hasClass("xhrSuccess")){
            $("#proMsgListEdit").addClass("yunPubHide");
            $("#proMsgListRe").removeClass("yunPubHide");
            $(".yunProgressMain ul li").eq(0).children("span").addClass("yunOpacity");
            final();
        };
    });
    $("#canMsg2").click(function () {
        if($("#formMsg2").hasClass("xhrSuccess")){
            $("#proMsgEdit").addClass("yunPubHide");
            $("#proMsgEditRe").removeClass("yunPubHide");
            $(".yunProgressMain ul li").eq(1).children("span").addClass("yunOpacity");
            final();
        };
    });
    $("#canMsg3").click(function () {
        if($("#formMsg3").hasClass("xhrSuccess")) {
            //点击编辑需要清空表单，这里再次渲染
            if(window.location.href.indexOf("yunStep.html") != -1){
                quotationRender(yunGlobal.history[0].section.main);
            }else{
                quotationRender(gloab);
            };
            payCoupon();
            $("#canMsg4").addClass("canMsg").removeProp("disabled");
            $("#tipMsgEdit").addClass("yunPubHide");
            $("#tipMsgEditRe").removeClass("yunPubHide");
            $(".payWayWarring").css("display","none");
            $(".yunProgressMain ul li").eq(2).children("span").addClass("yunOpacity");
            $(".yun-payPercent,.yun-payNode,.yun-payDes,.yunSzyh").removeProp("readonly");
            final();
        };
    });
    $("#canMsg4").click(function () {
        if($("#formMsg4").hasClass("xhrSuccess")) {
            if(window.location.href.indexOf("yunStep.html") != -1){
                payWayShowDataDetails(arrTotal,arrDiscount,arr,discountTotal,discountYh);
            }else{
                payWayShowDataDetails(paygloab.arrTotal,paygloab.arrDiscount,paygloab.arr,paygloab.totalCashMoney,paygloab.discountCashMoney);
            };
            payCoupon();
            $("#payMsgEdit").addClass("yunPubHide");
            $("#payMsgEditRe").removeClass("yunPubHide");
            $(".yunProgressMain ul li").eq(3).children("span").addClass("yunOpacity");
            final();
        };
    });
    //给指定的人发送报价
    if(uid) {
        $.ajax({
            url:baseURL+'get_user_info/'+uid,
            type:"post",
            data:{
                user_id:getCookie("user_id")
            },
            dataType:"json",
            success:function (res) {
                if(res.success) {
                    $("#username").val(res.data.nick_name);
                    $("#companyName").val(res.data.company);
                    $("#phone").val(res.data.mobile);
                    $("#email").val(res.data.email);
                    $("#formMsg1").click();
                }else{
                    alertUploadMsg(res.message);
                }
            }
        })
    }
    //点击预览
    $(document).on("click",".pubView",function () {
        var src = $(this).attr("data-file-path"),
            type = src.substr(src.length-4,4);
        viewPic(type,src);
    });
    $(document).on("click",".viewFilePicWrap",function () {
        $(this).css("display","none");
        $(".viewFilePic").css("display","none");
    })
});





 







