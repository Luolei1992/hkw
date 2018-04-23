/**
 * Created by gs on 2017/6/5 0005.
 */
/*
 * 云报价客户信息数据处理
 * */
function linkPerson() {
    /*
     * 云报价客户信息选择已有联系人数据处理
     * */
    if($(".yun-kehu").find("dd").length == 0){
        $.ajax({
            url:localUrl+"/kkk",  //请求后台数据地址
            type:"get",
            dataType:"json",
        }).done(function (data) {
            /*模板*/
            if (data.linkName.length > 0){
                var valTemp1 = doT.template($("#yunLinkNametmpl").text());
                var valTemp2 = doT.template($("#yunLinkPhonetmpl").text());
                var valTemp3 = doT.template($("#yunLinkEmailtmpl").text());
                var valTemp4 = doT.template($("#yunLinkCompanytmpl").text());
                $("#yunLinkName").append(valTemp1(data));
                $("#yunLinkPhone").append(valTemp2(data));
                $("#yunLinkEmail").append(valTemp3(data));
                $("#yunLinkCompany").append(valTemp4(data));
            }
        });
    }
};
linkPerson();
/*
 * 云报价客户信息手动输入联系人信息以json的形式发送到后台保存
 * */
function newLinkPerson(ms1,ms2,ms3,ms4) {
    var newLinkPerson = {
        "linkName":ms1,
        "linkEmail":ms2,
        "linkPhone":ms3,
        "linkCompany":ms4
    };
    $.ajax({
        url:'js/data/data1.json',   //发送到后台的数据地址,数据需要显示在选择联系人上弹窗,个人中心我的联系人页面
        type:"post",
        data:newLinkPerson,
        dataType:"json",
        error : function() {
            alert('传送失败 ');
        },
        success:function () {
            console.log('发送成功');
        }
    });
};
/*
 * 云报价项目信息数据上传
 * */
function newProjectMsg(msg1,msg2,msg3) {
    var newProjectMsg = {
        "projectName":msg1,
        "projectDes":msg2,
        "projectTime":msg3
    };
    
    $.ajax({
        type:"post",
        data:newProjectMsg,
        url:'js/data/data1.json',
        dataType:"json",
        error : function() {
            alert('传送失败 ');
        },
        success:function () {
            console.log('发送成功');
        }
    })
};
/*
 * 项目信息文件上传
 * fileNames:把上传的文件名称放到一个数组里面，下次上传判断名称一样就无法重复上传
 * */
function uploadWP() {
    var choose = $('#chooseFile')[0];
    var fileList = $("#uploadImg");
    var fileExt = '';
    var fileNames = [];
    FileAPI.event.on(choose, 'change', function (file){   //evt 为点击的当前input
        var files = FileAPI.getFiles(file); //获取文件列表
        FileAPI.filterFiles(files, function (file, info/**Object*/){
            //从字符串中抽出最后一次出现.之后的字符（文件格式），并且转换成小写
            fileExt = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
            var fileType = ['pdf','doc'];
            if($.inArray(file.name,fileNames) != -1){
                alert('文件名已存在');
                return false;
            }else{
                if(file.type.indexOf("doc") != -1 || file.type.indexOf("pdf") != -1){
                    if((file.size < 2*FileAPI.MB)) {
                        fileNames.push(file.name);
                        return true;
                    }else{
                        alert("文件要小于2M");
                        return false;
                    }
                }else{
                    alert('抱歉，文件上传目前只支持pdf和doc格式，如果格式正确，请使用更高版本的浏览器或者改用其他主流浏览器');
                    return false;
                };
            };
        }, function (files, rejected){
            var file = files[0];
            if( file ){
                //上传文件
                FileAPI.upload({
                    url: 'http://www.huakewang.com/......',    //上传地址
                    files: { files: files[0]},
                    complete: function (err, xhr){
                        var result = xhr.url;   //返回的文件地址（下载时要用到）
                        fileExt = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
                        if(fileExt==".doc") {
                            fileList.append('<div class="uploadImgWrap"><img src="yunimg/uploadDoc.png"  data-src='+result+' data-size='+(file.size/1024).toFixed(0)+'><i title="'+file.name+'" class="uploadImgExp">'+file.name+'</i><i class="uploadImgClose"></i></div>');
                        }else if(fileExt==".pdf"){
                            fileList.append('<div class="uploadImgWrap"><img src="yunimg/uploadPdf.png"  data-src='+result+' data-size='+(file.size/1024).toFixed(0)+'><i title="'+file.name+'" class="uploadImgExp">'+file.name+'</i><i class="uploadImgClose"></i></div>');
                        };
                    }
                });
            }
        }) ,FileAPI.reset(file.currentTarget);
    });
    $(document).on("click",".uploadImgClose",function () {
        var $_this = $(this);
        var ht = $_this.parent().find('.uploadImgExp').html();
        $.ajax({
            url:'',
            type:'post',
            data:$_this.parent().find('img').attr("data-src"),
            success:function (data) {
//                    返回值确定数据已经删除
                if(!data.del){
                    $_this.parent().remove();
                    fileNames.splice($.inArray(ht,fileNames),1);
                };
            }
        });
    });
};
uploadWP();
/*
* 云报价报价单弹窗数据模拟
* */
function yunAlertP1() {
    $.ajax({
        url:localUrl+"/www",  //请求后台数据地址
        type:"get",
        dataType:"json",
    }).done(function (data) {
        /*历史报价列表*/
        var valtemp1 = doT.template($("#historyTemptmpl").text());
        $("#historyTemp").html(valtemp1(data));
    });
};
function yunAlertP2() {
    $.ajax({
        url:localUrl+"/fff",  //请求后台数据地址
        type:"get",
        dataType:"json",
    }).done(function (data) {
        // /*官方模板八大块*//*官方模板详细列表*/
        var valtemp2 = doT.template($("#officialTemptmpl").text());
        $("#officialTemp").html(valtemp2(data.officialTemp));
    });
};
yunAlertP1();
yunAlertP2();
/*
* 点击确定把选择的模板(数据)加到报价单上
* 点击新建模板添加个新的报价单
* */
function newTemp() {
    var sign = 0;
    $("body").on("click",".yun_tempPrice .btn_1",function () {
        var $core = $(this).parent().attr("data-core");
        if($(".yun_tempPubStyle li").hasClass("yun_tempClickDif") || $(".yun_tempHistory li").hasClass("yun_tempClick")){
            $(".yun-tempPriceWrap").css("display","none");
            $(".yun_tempPrice").css("display","none");
            /*ajax请求模板内容*/
            $.ajax({
                url: "temp.html", //项目报价单页面地址
                type:"get",
                success: function (html) {
                    var msgUrl = "",val1 = "",val2 = "",val3 = "",idx;
                    if ($(".yun_tempPubStyle li").hasClass("yun_tempClickDif")) {
                        msgUrl = localUrl+"/fff";
                        val1 = $(".yun_tempClickDif").parents("li").find("h4").attr('data-le');
                        val2 = $(".yun_tempClickDif").attr('data-ls');
                    }else if ($(".yun_tempHistory li").hasClass("yun_tempClick")) {
                        msgUrl = localUrl+"/www";
                        val3 = $(".yun_tempClick").attr("data-hs");
                        idx = $(".yun_tempClick").index();
                    };
                    $.ajax({
                        url:msgUrl,
                        type:"get",
                        dataType:"json",
                    }).done(function (data) {
                        if(msgUrl == localUrl+"/fff"){
                            sign++;
                            $("#yunPriceForm").append('<div id='+sign+'>'+html+'</div>');
                            var data = data.officialTemp[val1].detail;
                            for(var k = 0;k <data[val2]["parts"].length;k++){
                                var trim = data[val2]["parts"][k],
                                    num = k+1,
                                    idOrder = k+"0";
                                var strl = '<div class="yun-part clearfix  yun_partLis" id='+idOrder+'><div class="yun-firstPart-T"><span class="yun-partOrder">第<span class="yun-partOrderLis">'+num+'</span>部分</span> <input class="yun-details" type="text" placeholder="请尽可能写清楚内容，文件格式，数量等，以免造成不必要的麻烦！" value='+trim["description"]+'> <input class="yun-submitResult" type="text" placeholder="提交产物" value='+trim["achievement"]+'> <i class="yunPubPart yunPlusPart">添加</i><i class="yunPubPart yunReducePart">删除</i></div><ol class="yunFirstOl clearfix"><li class="yunFirstOl1">序号</li><li class="yunFirstOl2">内容</li><li class="yunFirstOl3">内容和成果描述</li><li class="yunFirstOl4">单位</li><li class="yunFirstOl5">单价<i class="yunMsg"></i><div class="yunMsgDetail"><p>由画客网大数据计算，</p><p>推荐给您符合市场行情的报价</p></div></li><li class="yunFirstOl6">数量</li><li class="yunFirstOl7"><select name=""><option>要发票(税6%)</option><option>不要发票</option></select></li> <li class="yunFirstOl8">合计</li></ol></div>';
                                /*只有第一部分才有ol列表*/
                                if(k>0) {
                                    strl = strl.replace('<ol class="yunFirstOl clearfix"><li class="yunFirstOl1">序号</li><li class="yunFirstOl2">内容</li><li class="yunFirstOl3">内容和成果描述</li><li class="yunFirstOl4">单位</li><li class="yunFirstOl5">单价<i class="yunMsg"></i><div class="yunMsgDetail"><p>由画客网大数据计算，</p><p>推荐给您符合市场行情的报价</p></div></li><li class="yunFirstOl6">数量</li><li class="yunFirstOl7"><select name=""><option>要发票(税6%)</option><option>不要发票</option></select></li> <li class="yunFirstOl8">合计</li></ol>','');
                                };
                                $(strl).insertBefore($("#"+sign+" .yun-moneyTotal"));
                                // 每部分有几条信息
                                for (var j = 0;j<trim["part"].length;j++) {
                                    var tim = trim["part"][j];
                                    var str = '<ul class="yunFirstUl clearfix"><li><input class="yun-order" value='+tim["order"]+'></li><li><input class="yun-inputContent" type="text" value='+tim["content"]+'></li><li><input class="yun-inputDetails" type="text" value='+tim["desResult"]+'></li><li><input class="yun-inputUnit" type="text" value='+tim["unit"]+'></li><li><input class="yun-inputPrice" onkeyup="clearNoNum(this)" type="text" value='+tim["price"]+'></li><li><input class="yun-inputNum" onkeyup="clearNoNumInt(this)" type="text" value='+tim["number"]+'></li><li><input disabled class="yun-rate" value='+tim["rate"]+'></li><li><input disabled class="yun-total" value='+tim["total"]+'></li><li class="yunIconRight"><i class="yunD"></i><i class="yunU"></i><i class="yunC"></i><i class="yunP"></i></li></ul>';
                                    $("#"+sign+' #'+idOrder+".yun_partLis").append(str);
                                };
                            };
                            $("#"+sign+" .yun-mainPrice-t input").val(data[val2].priceName);
                            $("#"+sign+" .yun-totalColor").html('￥<i>'+data[val2].totalAll+'</i>元');
                            var $options = $("#"+sign+" .yunFirstOl7 option");
                            //税率更改
                            for(var m = 0;m<$options.length;m++){
                                if($options.eq(m).html() == data[val2].cash){
                                    $options.eq(m).attr("selected","true");
                                };
                            };
                            linkData();
                        }else if(msgUrl == localUrl+"/www"){
                            //遍历历史报价有几个报价单data[val]["parts"]
                            for(var i = 0;i < data.history[idx][val3].main.length;i++) {
                                sign++;
                                var temp = data.history[idx][val3].main[i];
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
                                    var strl = '<div class="yun-part clearfix  yun_partLis" id='+idOrder+'><div class="yun-firstPart-T"><span class="yun-partOrder">第<span class="yun-partOrderLis">'+num+'</span>部分</span> <input class="yun-details" type="text" placeholder="请尽可能写清楚内容，文件格式，数量等，以免造成不必要的麻烦！" value='+trim["description"]+'> <input class="yun-submitResult" type="text" placeholder="提交产物" value='+trim["achievement"]+'> <i class="yunPubPart yunPlusPart">添加</i><i class="yunPubPart yunReducePart">删除</i></div><ol class="yunFirstOl clearfix"><li class="yunFirstOl1">序号</li><li class="yunFirstOl2">内容</li><li class="yunFirstOl3">内容和成果描述</li><li class="yunFirstOl4">单位</li><li class="yunFirstOl5">单价</li><li class="yunFirstOl6">数量</li><li class="yunFirstOl7"><select name=""><option>要发票(税6%)</option><option>不要发票</option></select></li> <li class="yunFirstOl8">合计</li></ol></div>';
                                    /*只有第一部分才有ol列表*/
                                    if(k>0) {
                                        strl = strl.replace('<ol class="yunFirstOl clearfix"><li class="yunFirstOl1">序号</li><li class="yunFirstOl2">内容</li><li class="yunFirstOl3">内容和成果描述</li><li class="yunFirstOl4">单位</li><li class="yunFirstOl5">单价</li><li class="yunFirstOl6">数量</li><li class="yunFirstOl7"><select name=""><option>要发票(税6%)</option><option>不要发票</option></select></li> <li class="yunFirstOl8">合计</li></ol>','');
                                    };
                                    $(strl).insertBefore($("#"+sign+" .yun-moneyTotal"));
                                    //每部分有几条信息
                                    for (var j = 0;j<temp["parts"][k]["part"].length;j++) {
                                        var tim = temp["parts"][k]["part"][j];
                                        var str = '<ul class="yunFirstUl clearfix"><li><input class="yun-order" value='+tim["order"]+' disabled></li><li><input class="yun-inputContent" type="text" value='+tim["content"]+'></li><li><input class="yun-inputDetails" type="text" value='+tim["desResult"]+'></li><li><input class="yun-inputUnit" type="text" value='+tim["unit"]+'></li><li><input class="yun-inputPrice" onkeyup="clearNoNum(this)" type="text" value='+tim["price"]+'></li><li><input class="yun-inputNum" type="text" onkeyup="clearNoNumInt(this)" value='+tim["number"]+'></li><li><input disabled class="yun-rate" value='+tim["rate"]+'></li><li><input disabled class="yun-total" value='+tim["total"]+'></li><li class="yunIconRight"><i class="yunD"></i><i class="yunU"></i><i class="yunC"></i><i class="yunP"></i></li></ul>';
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
                            linkData();
                        };
                    });
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
        var $core = $(".yun_tempPrice").attr("data-core");
        $.ajax({
            url: "temp1.html", //模板地址
            async: false,
            success: function (html) {
                //html即是html里的内容
                //$("#yunPriceForm")获取div对象
                //报价是应该覆盖原来的还是新增加一个
                if($core){
                    sign ++;
                    $("#yunPriceForm").append('<div id='+sign+'>'+html+'</div>');
                    $(".delete").parent().remove();
                }else{
                    sign ++;
                    $("#yunPriceForm").append('<div id='+sign+'>'+html+'</div>');
                };
            }
        });
        $(".yun-price .yunSubmitWrap").css("display","block");
    });
    
};
newTemp();
/*
* 获取项目报价单的数据发送到后台
* 点击保存时发送数据objData
* */
var yunGlobal = {};
function proSaveShow() {
    /*
    * pricename用来放报价单名称,报价单总计,备注,税率
    * details来放报价单每部分的描述
    * result来放报价单每部分的成果
    * pices来放报价单每部分的多条数据 1,"交互策略（微型BS）","交互原则互动演绎","套","1000.00",30,200.00,1800.00
    * */
    var pricename = [],details=[],result = [],pices = [];
    var len = $("#yunPriceForm>div").find("form").length;
    /*获取到页面数据*/
    function getAllData() {
        //遍历有几个报价单
        for(var i = 0;i < len; i++){
            pricename[i] = new Array();
            details[i] = new Array();
            result[i] = new Array();
            pices[i] = new Array();
            pricename[i].push($("#yunPriceForm>div").eq(i).find("form").find(".yun-mainPrice-t input").val());
            pricename[i].push($("#yunPriceForm>div").eq(i).find("form").find(".yun-moneyTotal i").html());
            pricename[i].push($("#yunPriceForm>div").eq(i).find("form").find(".yun-remark textarea").val());
            pricename[i].push($("#yunPriceForm>div").eq(i).find("form").find("select").val());
            var long = $("#yunPriceForm>div").eq(i).find(".yun-part").length;
            for (var j = 0; j < long;j++){
                //每个报价单有几个部分
                details[i][j]=$("#yunPriceForm>div").eq(i).find(".yun-part").eq(j).find(".yun-details").val();
                result[i][j]=$("#yunPriceForm>div").eq(i).find(".yun-part").eq(j).find(".yun-submitResult").val();
                pices[i][j] = new Array();
                //每部分有几条数据
                var picL = $("#yunPriceForm>div").eq(i).find(".yun-part").eq(j).find("ul").length;
                for(var k = 0;k < picL;k++){
                    var picsL = $("#yunPriceForm>div").eq(i).find(".yun-part").eq(j).find(".yunFirstUl").eq(k).find("input").length;
                    pices[i][j][k] = new Array();
                    //每条数据的input值
                    for(var m = 0;m < picsL; m++){
                        pices[i][j][k].push($("#yunPriceForm>div").eq(i).find(".yun-part").eq(j).find(".yunFirstUl").eq(k).find("input").eq(m).val());
                    };
                };
            };
        };
    };
    /*
    * 把数据保存后直接展示给用户partFst();partSec();
    * */
    function partFst() {
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
        for(var f = 0;f < pricename.length;f++) {
            var shu1 = (pricename[f][1] - arrCash[f]).toFixed(2),shu2 = f+1;
            var strtab = '<tr><td>'+shu2+'</td><td>'+pricename[f][0]+'</td><td>'+shu1+'</td><td>'+arrCash[f]+'</td><td>'+pricename[f][1]+'</td></tr>';
            strTotal += strtab;
            shu3 += pricename[f][1]-0;
        };
        shu3 = shu3.toFixed(2);
        var priceStrs = '<tr><th>序号</th><th>报价单</th><th>报价</th><th>税金(总计)</th><th>总计</th></tr>'+strTotal+'<tr class="beforeInsert"><td colspan="4">项目总计</td><td>'+shu3+'</td></tr>';
        $(".yun-tableObj").html(priceStrs);
    };
    function partSec() {
        //报价单数
        for (var a = 0;a < pices.length;a++) {
            var sjstrTotal;
            var bjdstr = '<h4>'+pricename[a][0]+'：</h4><table class="yun-tableObjPic bjdstr'+a+'" border="2"><tr><th>序号</th><th>内容</th><th>内容及成果描述</th><th>单位</th><th>单价</th><th>数量</th><th>税金</th><th>合计</th></tr></table>';
            $(".priceTableWrap").append(bjdstr);
            //部分数
            for(var b = 0;b < details[a].length;b++) {
                var numb = b+1;
                var bfstr = '<tr class="bfstr'+b+'"><td colspan="8"><b>第'+numb+'部分：</b>'+details[a][b]+'<span class="yun-fruit"> 提交产物：'+result[a][b]+'</span></td></tr>';
                $(".bjdstr"+a).append(bfstr);
                sjstrTotal = "";
                for(var c = 0;c < pices[a][b].length;c++){
                    var x = c+1;
                    var sjstr = '<tr><td>'+x+'</td><td>'+pices[a][b][c][1]+'</td><td>'+pices[a][b][c][2]+'</td><td>'+pices[a][b][c][3]+'</td><td>'+pices[a][b][c][4]+'</td><td>'+pices[a][b][c][5]+'</td><td>'+pices[a][b][c][6]+'</td><td>'+pices[a][b][c][7]+'</td></tr>';
                    sjstrTotal += sjstr;
                };
                $(sjstrTotal).insertAfter($(".bjdstr"+a+" .bfstr"+b));
            };
            var totalRemark = '<tr><td colspan="7">总计</td><td>'+pricename[a][1]+'</td></tr><tr><td>备注</td><td colspan="7">'+pricename[a][2]+'</td></tr>';
            $(".bjdstr"+a).append(totalRemark);
        };
    };
    getAllData();
    partFst();
    partSec();
    /*
    * 通过ajax把数据发到后台
    * */
    var objData = {
        "pricename":pricename,
        // "a":[
        //         [
        //             [
        //                 [1,2,3],[],[]
        //             ],
        //             [
        //                 [],[],[]
        //             ],
        //             [
        //                 [],[]
        //             ]
        //         ],
        //         [
        //             [
        //                 [],[],[]
        //             ],
        //             [
        //                 []
        //             ]
        //         ]
        //     ],
        "details":details,
        "result":result,
        "pices":pices
    };
    function dataConversion() {
        
        yunGlobal.history = [];
        // yunGlobal.history[i] = {};
        // yunGlobal.history[i].hs1 = {};
        // yunGlobal.history[i].hs1.proname = {};
        // yunGlobal.history[i].hs1.main = [];
        // yunGlobal.history[i].hs1.main[i] = {};
        // 最里面的数组，由多条数据对象组成（需要遍历pices）
        for(var r = 0;r < len; r++){
            yunGlobal.history[r] = {};
            yunGlobal.history[r].section = {};
            yunGlobal.history[r].section.main = [];
            var long = $("#yunPriceForm>div").eq(i).find(".yun-part").length;
            for (var s = 0; s < long;s++){
                yunGlobal.history[r].section.main[s] = {};
                yunGlobal.history[r].section.main[s].priceName = pricename[r][0];
                yunGlobal.history[r].section.main[s].cash = pricename[r][1];
                yunGlobal.history[r].section.main[s].remarks = pricename[r][0];
                yunGlobal.history[r].section.main[s].totalAll = pricename[r][0];
            }
        }
    }
    dataConversion();
    $.ajax({
        url:"",
        type:"post",
        data:objData,
        success:function (data) {

        }
    });

};

/*
 * 项目报价单的数据联动
 * */
var globalVariable;
var linkData = function () {
    globalVariable=0;
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
    var temp;
    $("#yunPriceForm").find("form").each(function () {
        temp = 0;
        $(this).find(".yunFirstUl").each(function () {
            temp += ($(this).find(".yun-total").val()-0);
        });
        globalVariable += temp;
        $(this).find(".yun-totalColor i").html(temp.toFixed(2));
    });
    $(".payTotal i").html(globalVariable.toFixed(2));
    if(globalVariable > 0){
        $(".yunCoupon").css("display","block");
    }else{
        $(".yunCoupon").css("display","none");
    };
};
$(document).on("keyup",".yun-inputPrice,.yun-inputNum",function () {
    linkData();
});
$(document).on("change","#yunPriceForm select",function () {
    linkData();
});
/*
* 付款方式数据联动
* */
function payWayLinkage() {
    /*
    * 选择优惠的数据联动
    * */
    $(".yunCoupon .allCheck").each(function () {
        $(this).click(function () {
            var $th = $(this);
            var $grandpa = $th.parent().parent();
            var $pay = $(".payTotal i").html();
            var $select = parseFloat($th.parent().next().val());

            if($th.hasClass("selectedColor")){
                $th.removeClass("selectedColor");
                $(".payCouponTotal i").html("0.00");
                $(".yunCoupon .yunCustom").prop("readonly",true);
                $(".yunCoupon select").prop("disabled",true);
            }else{
                $(".yunCoupon label i").removeClass("selectedColor");
                $th.addClass("selectedColor");
                //判断如果点击的是自定义金额,默认0.00
                if($th.hasClass("discountSec")){
                    $(".yunCoupon select").prop("disabled",true);
                    $(".yunCoupon .yunCustom").prop("readonly",false);
                    $(".yunCoupon .yunCustom").keyup(function () {
                        //选择折扣后,下拉列表数值变化了
                        $select = parseFloat($th.parent().next().val());
                        if(isNaN($select)){
                            $(".payCouponTotal i").html("0.00");
                        }else{
                            $(".payCouponTotal i").html($select.toFixed(2));
                        };
                        percentTimes();
                    });
                    if(isNaN($select)){
                        $(".payCouponTotal i").html("0.00");
                    }else{
                        $(".payCouponTotal i").html($select.toFixed(2));
                    }
                }else {
                    $(".yunCoupon select").prop("disabled",false);
                    $(".yunCoupon .yunCustom").prop("readonly",true);
                    $(".yunCoupon select").change(function () {
                        //选择折扣后,下拉列表数值变化了
                        $select = parseFloat($th.parent().next().val());
                        $(".payCouponTotal i").html(($pay*$select*0.1).toFixed(2));
                        percentTimes();
                    });
                    $(".payCouponTotal i").html(($pay*$select*0.1).toFixed(2));
                };
            };
            percentTimes();
        });
    });
};
payWayLinkage();
/*
 * 付款次数百分比来算出合计数目
 * 两种情况:没有优惠的算法,有优惠的算法
 * */
function percentTimes() {
    if($(".payCouponTotal i").html() > 0){
        $("#yunPayForm .yun-payPercent").each(function () {
            var percentRate = $(this).val() * 0.01 * $(".payCouponTotal i").html();
            $(this).parent().parent().find(".yun-payTotal").val(percentRate.toFixed(2));
        });
    }else{
        $("#yunPayForm .yun-payPercent").each(function () {
            var percentRate = $(this).val() * 0.01 * $(".payTotal i").html();
            $(this).parent().parent().find(".yun-payTotal").val(percentRate.toFixed(2));
        });
    };
};
$("#yunPayForm").on("keyup",".yun-payPercent",function () {
    percentTimes();
});
/*
* 付款方式点击保存后展示数据(项目总计,优惠价,百分比的整条数据)
* */
function payWayShowData() {
    var arr = [],
        arrTotal = $("#yunPayForm .payTotal i").html(),
        arrDiscount = $("#yunPayForm .payCouponTotal i").html();
    $("#yunPayForm .yunFirstUl").each(function (idx) {
        arr[idx] = new Array();
        $(this).find("input").each(function () {
            arr[idx].push($(this).val());
        });
    });
    function payWayShowDataDetails() {
        var str = '',st = '';
        if(arrDiscount > 0) {
            st = '<tr class="yun-tablePayFst"><th>序号</th><th>百分比</th><th>付款节点</th><th>描述</th><th>合计</th></tr><tr><td colspan="4">项目总计</td><td>'+arrTotal+'</td></tr><tr><td colspan="4">优惠价</td><td>'+arrDiscount+'</td></tr>';
            $(".yun-tablePay").html(st);
        }else{
            st = '<tr class="yun-tablePayFst"><th>序号</th><th>百分比</th><th>付款节点</th><th>描述</th><th>合计</th></tr><tr><td colspan="4">项目总计</td><td>'+arrTotal+'</td></tr>';
            $(".yun-tablePay").html(st);
        };
        $("#yunPayForm .yunFirstUl").each(function (idx) {
            str += '<tr class="pubTrDelete"><td>'+arr[idx][0]+'</td><td>'+arr[idx][1]+'</td><td>'+arr[idx][2]+'</td><td>'+arr[idx][3]+'</td><td>'+arr[idx][4]+'</td></tr>';
        });
        $(str).insertAfter($(".yun-tablePay .yun-tablePayFst"));
    };
    payWayShowDataDetails();
    var payWayObj = {
        "arrTotal":arrTotal,
        "arrDiscount":arrDiscount,
        "arr":arr
    };
    $.ajax({
        url:"",
        type:"post",
        data:payWayObj,
        success:function () {

        }
    });
};
/*
* 输入类型的限定
* */
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    obj.value = obj.value.replace(/^\.$/, '');//开头不能为"."
    if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
        obj.value = parseFloat(obj.value);
    };
};
function clearNoNumInt(obj) {
    obj.value = obj.value.replace(/[^\d]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.*$/, '$1$2');//只能输入两个小数
    if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
        obj.value = parseInt(obj.value);
    };
};







 







