var fileId = getLocationParam("id");
$(function () {
    var lists = '',nuTemp = 0;
    $.ajax({
        url:baseLink + 'resourceApi/get_detail/'+fileId,
        type:"get",
        dataType:"json",
        success:function (res) {
            if(res.success) {
                var lis = '',ls="",lts="",arr = res.data.itemInfo.category_ids.split(","),newArr = [],
                    arrs = res.data.itemInfo.keyword.split(","),newArrs = [],
                    array = res.data.itemInfo.attachment_list,
                    arrays = res.data.itemInfo.batch_video_urls;
                for (var o = 0;o < arr.length;o++){
                    if(arr[o] != 148 && arr[o] != "") {
                        newArr.push(arr[o]);
                    }
                }
                for (var p = 0;p < arrs.length;p++){
                    if(arrs[p] != "") {
                        newArrs.push(arrs[p]);
                    }
                }
                for(var q = 0;q < newArrs.length;q++) {
                    lis += '<a href="searchResult.html?keyword=' + newArrs[q] + '">' + newArrs[q] + '</a>';
                }
                for(var r = 0;r < array.length;r++) {
                    ls+='<img alt="' + array[r].alt + '" class="div_b_img2" style="height:auto;" src="' + array[r].path + '!1280" ><p></p>'
                };
                for(var s = 0;s < arrays.length;s++) {
                    lts+='<embed src="https:'+arrays[s].split(":")[1]+'" quality="high" style="margin-bottom: -40px;height: 520px;width: 900px;" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed><p></p>'
                }
                if(res.data.itemInfo.doc_pages > 0) {
                    $("#pop").css("display","block");
                    var srcs = res.data.itemInfo.file_path.indexOf('.pdf') != -1?res.data.itemInfo.file_path.replace(/.swf/,""):res.data.itemInfo.file_path.replace(/swf/,"pdf");
                        $("#mainBodyIntroductionDocBoxs iframe").attr({
                        "src":"https://www.huakewang.com/2017_data/build/generic/web/viewer.html?url="+srcs
                    });
                }
                $("title").html(res.data.itemInfo.title);
                $("meta[name=description]").attr("content",res.data.itemInfo.content);
                $("meta[name=keywords]").attr("content",res.data.itemInfo.keyword);
                $("meta[name=abstract]").attr("content",res.data.itemInfo.abstract);
                $("#aboutWork_title_kind_time_p1").html(res.data.itemInfo.title);
                $(".fileDownXzLink").click(function () {
                    if(getCookie("user_id") && $(".phonenum").hasClass("idAuth")) {
                        $(this).attr("href",baseLink+'resourceApi/downloadFile/'+fileId);
                    }else{
                        go_login();
                    }
                });
                getSubList(newArr,res);
                $("#aboutWork_title_kind_time .div_b_li_1").html('<img src="images/zpxx_1.jpg" />'+res.data.itemInfo.hits);
                $("#aboutWork_title_kind_time .div_b_li_2").html('<img src="images/zpxx_2.jpg" />'+res.data.itemInfo.comment_count);
                $("#aboutWork_title_kind_time .div_b_li_3").html('<img src="images/zanr.jpg" />'+res.data.itemInfo.love_count);
                $('#main-body .mainBodyIntroductionContent:first').html('<pre style="white-space: pre-wrap;padding: 0 110px;font-size: 22px;color: #2a2828;text-align: center;font-family: Microsoft YaHei,Verdana, Arial, Helvetica, sans-serif;">' + res.data.itemInfo
                    .content + '</pre>');
                $('#main-body .mainBodyIntroductionContent:first pre img').css({width:"100%",height:"auto"});
                $('.work_keyword_list_show:first').html(lis);
                $("#mainBodyIntroductionImageBox").html(ls);
                $("#mainBodyIntroductionVideoBox").html(lts);
                $(".fileZan .fileAction").html(res.data.itemInfo.is_favorite?"已收藏":"收藏");
            }
        },error:function (res) {
            console.log(res);
        }
    })
    function date(date) {
        return new Date(parseInt(date)*1000).toLocaleString().replace(/:\d{1,2}$/,' ')
    }
    function getDetailsMsg(res) {
        $("#aboutWork_title_kind_time_p2").html('<img src="images/tian.png"> 资源分类 : '+lists+'<img src="images/tm.png" style="position: relative;top:2px;margin-left: 16px;" alt=""> '+date(res.data.itemInfo.add_time).split(" ")[0]+'&nbsp;&nbsp;&nbsp;文件大小 : '+(res.data.itemInfo.file_size)+'&nbsp;&nbsp;&nbsp;源文件格式 : '+(res.data.itemInfo.source_ext?res.data.itemInfo.source_ext:"[未知]"));
    }
    function getSubList(newArr,data) {
        var li = '',lis = '',list = '';
        $.ajax({
            url: baseURL + "get_menu_list/148",
            type: "post",
            dataType: "json",
            data: "",
            success:function (res) {
                if(res.success){
                    nuTemp++;
                    if(newArr.length == 1) {
                        for(var k = 0;k < res.data.length;k++) {
                            if(res.data[k].id == newArr[0]){
                                lists = '<a style="color: #aaa" href="searchResult.html?keyword='+res.data[k].menu_name+'">'+res.data[k].menu_name+'</a>';
                            }
                        };
                    }else if(newArr.length == 2){
                        for(var k = 0;k < res.data.length;k++) {
                            if(res.data[k].id == newArr[0]){
                                li = '<a style="color: #aaa" href="searchResult.html?keyword='+res.data[k].menu_name+'">'+res.data[k].menu_name+'</a>';
                            };
                            for (var j = 0;j < res.data[k].subMenuList.length;j++) {
                                if(res.data[k].subMenuList[j].id == newArr[1]){
                                    lis = '<a style="color: #aaa" href="searchResult.html?keyword='+res.data[k].subMenuList[j].menu_name+'">'+res.data[k].subMenuList[j].menu_name+'</a>';
                                }
                            }
                        };
                        lists = li +" "+ lis + " ";
                    }else if(newArr.length == 3){
                        for(var k = 0;k < res.data.length;k++) {
                            if(res.data[k].id == newArr[0]){
                                li = '<a style="color: #aaa" href="searchResult.html?keyword='+res.data[k].menu_name+'">'+res.data[k].menu_name+'</a>';
                            };
                            for (var j = 0;j < res.data[k].subMenuList.length;j++) {
                                if(res.data[k].subMenuList[j].id == newArr[1]){
                                    lis = '<a style="color: #aaa" href="searchResult.html?keyword='+res.data[k].subMenuList[j].menu_name+'">'+res.data[k].subMenuList[j].menu_name+'</a>';
                                };
                                for (var m = 0;m < res.data[k].subMenuList[j].subMenuList.length;m++) {
                                    if(res.data[k].subMenuList[j].subMenuList[m].id == newArr[2]){
                                        list = '<a style="color: #aaa" href="searchResult.html?keyword='+res.data[k].subMenuList[j].subMenuList[m].menu_name+'">'+res.data[k].subMenuList[j].subMenuList[m].menu_name+'</a>';
                                    }
                                }
                            };
                        };
                        lists = li +" "+ lis +" "+ list + " ";
                    };
                    getDetailsMsg(data);
                }
            }
        })
    }
    $(".fileZanScLink").click(function () {
        var filesid = fileId,
            url = 'hkw_newapi/add_favorite',
            htm = $(this).find(".fileAction").html();
        if(getCookie("user_id")){
            if( htm== "收藏") {
                keepFile(filesid,$(this).find(".fileAction"),url,"已收藏");
            }else{
                keepFile(filesid,$(this).find(".fileAction"),url,"收藏");
            }
        }else{
            go_login();
        }
    });
    function keepFile(fileId,ele,url,htm) {
        $.ajax({
            url:baseLink + url,
            type:"post",
            data: {
                id: fileId,
                type: "works"
            },
            dataType:"json",
            success:function (res) {
                if(res.success) {
                    ele.html(htm);
                }else{
                    alertUploadMsg(res.message);
                }
            },error:function (res) {
                console.log(res);
            }
        })
    }

})