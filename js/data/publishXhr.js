function uploadFile() {
    var choose = document.getElementById('chooseUploadFile');
    FileAPI.event.on(choose, 'change', function (evt){
        var files = FileAPI.getFiles(evt); // Retrieve file list
        var isImage = true,obj,idZipArr=[],inImgArr=[];
        FileAPI.filterFiles(files, function (file, info/**Object*/){
            obj = file;
            if( !/^image/.test(file.type) ){
                isImage = false;
                if(file.size > 10 * FileAPI.MB) {
                    alertUploadMsg("文件大小不能超过10M");
                    return false;
                }else{
                    return true;
                };
            }else{
                if(file.size > 10 * FileAPI.MB) {
                    alertUploadMsg("文件大小不能超过10M");
                    return false;
                }else{
                    return true;
                };
            };
        }, function (files/**Array*/, rejected/**Array*/){
            var json = files[0];
            console.log("*****++++");
            console.log(json);
            if( files.length ){
                if(isImage){
                    FileAPI.upload({
                        url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
                        files: {
                            Filedata: json
                        },
                        complete: function (err, xhr) {
                            var upfileFilePath = eval('(' + xhr.responseText + ')');
                            showZipImg(upfileFilePath,json);
                        }
                    });
                }else{
                    FileAPI.upload({
                        url: 'https://www.huakewang.com/upload/uploadFile',
                        files: {
                            Filedata: json
                        },
                        complete: function (err, xhr){
                            var upfileFilePath = eval('(' + xhr.responseText + ')');
                            showZipImg(upfileFilePath,json);
                            return false;
                        }
                    });
                };
            }
        });
    });
}
function showZipImg(upfileFilePath,json) {
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
        fileList = '<li><i></i><img class="uploadViewPic" src="' + src + '" alt="" data-id="' + upfileFilePath.data.id + '"><br><span class="uploadViewName" title="'+json.name+'">' + json.name + '</span></li>';
        $("#uploadView").append(fileList);
    } else {
        if ($("#uploadView li").length == 5) {
            alertUploadMsg('最多上传5个文件！');
        };
        return false;
    };
}
uploadFile();
$(function () {
    $(".texal").click(function () {
        var str = $("#areaTemp").val();
        $(this).parent().find("textarea").val(str);
        $(this).css("display", "none");
    });
    $(".texa").keyup(function () {
        if ($(this).val() == "") {
            $(".texal").css("display", "block");
        } else {
            $(".texal").css("display", "none");
        };
    });



    $(document).on("click", "ul#uploadView li i", function () {
        $(this).parent().remove();
    });

    // var id1 = -1, id2 = -1;
    // ssxLd(id1, id2, $(".divXlUl1"));   //默认的省份显示
    // $(document).on('change', ".divXlUl1", function () {
    //     $('.divXlUl2').find("option.ls").remove();
    //     $('.divXlUl2').find("option").first().attr("selected","selected");
    //     $('.divXlUl3').find("option.ls").remove();
    //     $('.divXlUl3').find("option").first().attr("selected","selected");
    //     $("#suggestId").val("");
    //     var citiId = $(this).find("option:selected").attr('data-value');
    //     ssxLd(citiId, id2, $('.divXlUl2'));
    // });
    // $(document).on('change', ".divXlUl2", function () {
    //     $('.divXlUl3').find("option.ls").remove();
    //     $("#suggestId").val("");
    //     var citiId = $(this).find("option:selected").attr('data-value');
    //     ssxLd(citiId, id2, $('.divXlUl3'));
    // });
    
    //需求预算部分
    var flag = true;
    function preXhr(sort, numEle, idx,numExp) {
        var budgetStr = '', budgetStr2 = '', budgetArr1 = [], budgetArr2 = [];
        $.ajax({
            url: baseLink + 'quoteApi/get_quote_reference/',
            type: 'post',
            dataType: 'json',
            data:{
                main_menu:sort,
                user_id:getCookie("user_id")
            },
            success: function (res) {
                console.log("萨达萨达撒");
                console.log(res);
                switch (numEle) {
                    case 1:      //设计类别改变
                        $(res.data).each(function (idx,val) {
                            budgetStr += '<li data-sort="' + idx + '">' + val.name + '</li>';
                        });
                        $(".budgetCategoryList2").html(budgetStr).children().first().addClass("budgetCategoryColor");
                        break;
                    default:
                        break;
                };
                //获得两个变化的数组，用于echart
                for(var i = 0;i < res.data[idx].experience.length;i++) {
                    budgetArr1.unshift(res.data[idx].experience[i].percent);
                    budgetArr2.push(res.data[idx].experience[i].priceRange);
                };
                $(budgetArr2).each(function (idx,val) {
                    budgetStr2 += '<li><span class="budgetArrSpan">'+val+'</span><a href="javascript:void(0);" class="budgetArrA">选择</a></li>';
                });
                $(".priceRange").html(budgetStr2);
                //默认第一个为选中状态
                if(flag){
                    $(".budgetCategoryList").each(function () {
                        $(this).children().first().addClass("budgetCategoryColor");
                    });
                };
                flag = false;
                
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('budgetCategoryEchart'));
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {    // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'    // 默认为直线'line'
                        },
                        formatter:'{b}'     //显示数据
//                triggerOn:'click'  //显示数据事件
                    },
                    color:['#3299FF'],
                    grid: {
                        left:'15%'
                    },
                    xAxis: {
                        show:false
                    },
                    yAxis: [{
                        axisLine:{
                            lineStyle:{
                                color:'#999999',
                                width:1//这里是为了突出显示加上的
                            }
                        },
                        type: 'category',
                        data: budgetArr1

                    }],
                    series: [{
                        type: 'bar',
                        data: budgetArr1.join("").split('%'),
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //注册点击事件
                $(".budgetCategoryList1 li").off('click').click(function () {
                    $(".budgetCategoryList3 li").removeClass("budgetCategoryColor").first().addClass("budgetCategoryColor");
                    $(this).addClass("budgetCategoryColor").siblings().removeClass("budgetCategoryColor");
                    var temp = $(this).html();
                    preXhr(temp,1,0,0);
                });
                $(".budgetCategoryList2 li").off('click').click(function () {
                    $(".budgetCategoryList3 li").removeClass("budgetCategoryColor").first().addClass("budgetCategoryColor");
                    $(this).addClass("budgetCategoryColor").siblings().removeClass("budgetCategoryColor");
                    var temp = $(".budgetCategoryList1 li.budgetCategoryColor").html();
                    //得到点击的是第几个
                    var num = $(this).attr("data-sort");
                    preXhr(temp,2,num,0);
                });
                $(".budgetCategoryList3 li").off('click').click(function () {
                    $(this).addClass("budgetCategoryColor").siblings().removeClass("budgetCategoryColor");
                    var temp = $(".budgetCategoryList1 li.budgetCategoryColor").html();
                    //得到点击的是第几个
                    var num = $(".budgetCategoryList2 li.budgetCategoryColor").attr("data-sort");
                    var idx = $(this).attr("data-ix");
                    preXhr(temp,2,num,idx);
                });
            }
        });
    };
    $(document).on('click','.budgetArrA',function () {
        $(".budgetIpt").val($(this).parent().find(".budgetArrSpan").html());
        $("#budgetDetail").slideUp();
    });
    $(".budgetBtn").click(function () {
        preXhr('艺术绘画', 1, 0,0);
        $("#budgetDetail").slideToggle();
    });
    //选择常用地址
    getuseraddress();
});
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
};
// function ssxLd(id1, id2, dom) {
//     $.ajax({
//         url: baseURL + 'get_area_list/' + id1 + '/' + id2,
//         type: 'get',
//         dataType: 'json',
//         async:false,
//         success: function (res) {
//             var str = '';
//             for (var i = 0; i < res.data.length; i++) {
//                 str += '<option class="ls" value="'+res.data[i].name+'" data-value="' + res.data[i].id + '">' + res.data[i].name + '</option>';
//             };
//             dom.append(str);
//         }
//     });
// };
