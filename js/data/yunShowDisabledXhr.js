var parm = getLocationParam('id');
$(function () {
    //分别请求四部分的数据，渲染到页面
    $.ajax({
        //第一部分
        url:baseLink+'quoteApi/get_customer_info',
        type:"post",
        data:{
            user_id:getCookie("user_id"),
            project_id:parm
        },
        dataType:"json",
        success:function (res) {
            console.log('第一部分');
            console.log(res);
            //成功返回数据
            if(res.success){
                //渲染为保存后的状态
                $(".yun-kehuMessageUl li").eq(0).find(".numShow").html(res.data.yunLinkName);
                $(".yun-kehuMessageUl li").eq(1).find(".numShow").html(res.data.yunLinkCompany);
                $(".yun-kehuMessageUl li").eq(3).find(".numShow").html(res.data.yunLinkEmail);
                $(".yun-kehuMessageUl li").eq(2).find(".numShow").html(res.data.yunLinkPhone);
            };
        }
    });
    $.ajax({
        //第二部分
        url:baseLink+'quoteApi/get_main_project_info',
        type:"post",
        data:{
            user_id:getCookie("user_id"),
            project_id:parm
        },
        dataType:"json",
        success:function (res) {
            console.log("第二部分");
            console.log(res);
            if(res.success){
                var fileList = '',fileLists = '',src='',
                    dataArr = res.data.projectDealine.split(" ")[0].split("-");
                $(".yun-messageShowNameR").html(res.data.projectName);
                $(".yun-messageShowSummaryR").html(res.data.projectDescription);
                $(".yun-messageShowDataR").html(dataArr[0]+'年'+dataArr[1]+'月'+dataArr[2]+'日');
                for (var i = 0;i < res.data.appendixs.length;i++) {
                    var fileSrc=res.data.appendixs[i].ext;
                    if ('.jpg.png.gif.bmp.tif'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[1];
                    } else if ('.doc.docx'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[0];
                    } else if ('.xls.xlsx'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[8];
                    } else if ('.ppt.pptx'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[5];
                    } else if ('.pdf'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[4];
                    } else if ('.txt'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[6];
                    } else if ('.mp3'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[2];
                    } else if ('.mp4'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[3];
                    } else if ('.zip.rar'.indexOf(fileSrc) != -1) {
                        src = fileTypeSrc[9];
                    } else {
                        src = fileTypeSrc[7];
                    };
                    fileList += '<div class="yunFujianWrap clearfix"><img class="fl" src="'+src+'" alt=""><p title="'+res.data.appendixs[i].name+'">'+res.data.appendixs[i].name+'</p><span>'+((res.data.appendixs[i].size)/1024/1024 > 1?((res.data.appendixs[i].size)/1024/1024).toFixed(2)+'MB':(res.data.appendixs[i].size/1024).toFixed(2)+'KB')+'</span></div>';
                };
                $(".yun-messageShowAddR").append(fileList);
            };
        }
    });
    $.ajax({
        //第三部分
        url:baseLink+'quoteApi/get_sub_project_list',
        type:"post",
        data:{
            user_id:getCookie("user_id"),
            project_id:parm
        },
        dataType:"json",
        success:function (res) {
            console.log("第三部分");
            console.log(res);
            var totleMon = 0;
            if(res.success){
                gloab = res.data;
                quotationRender(res.data);
                $(".yun-price .yunSubmitWrap").css("display","block");
                for(var l = 0;l < res.data.length;l++){
                    totleMon += (res.data[l].totalAll-0)
                };
            };
        }
    });
    $.ajax({
        //第四部分
        url:baseLink+'quoteApi/get_pay_stage_list',
        type:"post",
        data:{
            user_id:getCookie("user_id"),
            project_id:parm
        },
        dataType:"json",
        success:function (res) {
            console.log("第四部分");
            console.log(res);
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
                $(".yunProgressMain ul li").eq(3).children("span").addClass("yunOpacity");
                final();
            }else{
                $("#payMsgEdit").removeClass("yunPubHide");
                $("#payMsgEditRe").addClass("yunPubHide");
            };
        }
    });    
})