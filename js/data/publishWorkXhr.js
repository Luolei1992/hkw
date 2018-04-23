var workEdit = getLocationParam('work_id');
//批量采集图片(tab切换部分)
function batch_download_image() {
    // 根据网址采集作品
    var batch_download_image_url = $("#batch_download_image_url").val();
    if (!batch_download_image_url) {
        var d = dialog({
            fixed:true,
            title: '提示',
            content: '采集地址不能为空'
        });
        d.show();
        setTimeout(function () {
            d.close().remove();
            $("#batch_download_image_url").focus();
        }, 2000);
        return false;
    }
    var patrn =/^http[s]?:\/\/[A-Za-z0-9]?\.?[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (!patrn.exec(batch_download_image_url)) {
        var d = dialog({
            width:300,
            fixed:true,
            title: '提示',
            content: '采集地址格式不正确，如格式“http://www.huakewang.com/test.html”'
        });
        d.show();
        setTimeout(function () {
            d.close().remove();
            $("#batch_download_image_url").focus();
        }, 2000);
        return false;
    }
    var d = dialog({
        fixed:true,
        title: '提示',
        content: '采集任务进行中，请稍候...'
    });
    d.show();
    setTimeout(function () {
        d.close().remove();
    }, 2000);

    $.ajax({
        url:baseLink+"index.php/upload/batch_download_image_upy",
        type:"post",
        dataType:'json',
        data: {
            "batch_download_image_url": batch_download_image_url,
            "model": 'works_image'
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(res){
            if (res.success) {
                var html = '';
                for (var i = 0, data = res.data, len = data.length; i < len; i++) {
                    html += '<tr class="previewTemplate">' +
                        '<td>' +
                        '<div class="div_2_c_2">' +
                        '	<img onclick="$(this).parents(\'tr\').insertBefore($(this).parents(\'tr\').prev(\'.previewTemplate\'))" class="img_1" style="cursor:pointer;" src="images/sc_t.jpg" />' +
                        '	<img onclick="$(this).parents(\'tr\').insertAfter($(this).parents(\'tr\').next())" class="img_2" style="cursor:pointer;" src="images/sc_b.jpg" />' +
                        '	<img onclick="$(this).parents(\'tr\').remove()" class="img_3" style="cursor:pointer;" src="images/sc_d.jpg" />' +
                        '	<input onclick="javascript:set_cover_image(this);" class="input_6" type="radio" name="fengmian" value="' + data[i]['filePath'] + '" />' +
                        '	<span class="sp_fb">封面</span>' +
                        '	<div class="div_2_c_1_1">' +
                        '	<input type="hidden" name="batch_path_ids[]" value="' + data[i]['id'] + '">' +
                        '	<img width="95" height="95" src="' + data[i]['filePath'] + '!540x720" >' +
                        '	</div>' +
                        '	<div class="div_2_c_1_2">' +
                        '	<textarea style="width:495px;height:95px;border:1px solid #ccc;" maxlength="400" name="image_alt[]" cols=""></textarea>' +
                        '	</div>' +
                        '</div>' +
                        '</td>' +
                        '</tr>';
                }
                $("#preview tr:last").after(html);

                var hint = '';
                if (res.data.length < 1) {
                    hint = ',你采集的网址可能加入了防盗链功能';
                }
                var d = dialog({
                    width: 300,
                    fixed: true,
                    title: '提示',
                    content: '采集完成' + hint
                });
                d.show();
                setTimeout(function () {
                    d.close().remove();
                    $("#batch_download_image_url").val("");
                }, 2000);
                return false;
            } else {
                var d = dialog({
                    width: 300,
                    fixed: true,
                    title: '提示',
                    content: res.message
                });
                d.show();
                setTimeout(function () {
                    d.close().remove();
                    $("#" + res.field).focus();
                }, 2000);
                return false;
            }
        },
    });
}
//设置封面
function set_cover_image(obj) {
    if ($(obj).prop("checked")) {
        var path = $(obj).val(),tempid = $(obj).parent().find(".div_2_c_1_1 input").attr("value");
        // if(path.indexOf("upaiyun")>=0) {
            $("#thumbnail_path_src").attr("src", path);
            $("#thumbnail_path").val(path).attr("value",tempid);
        // } else {
        //     $("#thumbnail_path_src").attr("src", path.replace('.', '_thumb.'));
        //     $("#thumbnail_path").val(path).attr("value",tempid);
        // }
    };
    return false;
};
$(function() {
    //封面部分
    var choose = document.getElementById('chooseUploadFile');
    FileAPI.event.on(choose, 'change', function (evt){
        var files = FileAPI.getFiles(evt); // Retrieve file list
        FileAPI.filterFiles(files, function (file, info/**Object*/){
            if( /^image/.test(file.type) ){
                if(file.size > 10 * FileAPI.MB) {
                    alertUploadMsg("文件大小限制在10M以内！");
                    return false;
                };
                return true;
            }else{
                return false;
            };
        }, function (files/**Array*/, rejected/**Array*/){
            var uploadFile = files[0];
            if( files.length ){
                // Uploading Files
                FileAPI.upload({
                    url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
                    files: {
                        Filedata: uploadFile
                    },
                    prepare: function (file/**Object*/, options/**Object*/){
                        $("#thumbnail_path_src").attr("src", "./images/lodingBig.gif");
                    },
                    fileprogress: function (evt/**Object*/, file/**Object*/, xhr/**Object*/, options/**Object*/){
                        // $("#main-body.publishedWork .div_1").css("background","url('./images/lodingBig.gif') no-repeat");
                    },
                    complete: function (err, xhr){
                        var upfileFilePath = (JSON.parse(xhr.responseText));
                        if(upfileFilePath.success){
                            $("#thumbnail_path_src").attr("src", upfileFilePath.data.file_path + "!540x390").css("width","100%");
                            $("#thumbnail_path").val(upfileFilePath.data.file_path).attr("value",upfileFilePath.data.id);
                        }else{
                            alertUploadMsg(upfileFilePath.message);
                        };
                    }
                });    
            }
        });
    });
    //tab部分
    var chooses = document.getElementById('batch_image_upload');
    FileAPI.event.on(chooses, 'change', function (evt){
        var files = FileAPI.getFiles(evt); // Retrieve file list
        FileAPI.filterFiles(files, function (file, info/**Object*/){
            if( /^image/.test(file.type) ){
                if(file.size > 10 * FileAPI.MB) {
                    alertUploadMsg("文件大小限制在10M以内！");
                    return false;
                };
                return true;
            }else{
                return false;
            };
        }, function (files/**Array*/, rejected/**Array*/){
            var uploadFile = files[0];
            if( files.length ){
                // Uploading Files
                FileAPI.upload({
                    url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
                    files: {
                        Filedata: uploadFile
                    },
                    complete: function (err, xhr){
                        var json = (JSON.parse(xhr.responseText));
                        if (json.success) {
                            var html = '<tr class="previewTemplate">'+
                                '<td>'+
                                '<div class="div_2_c_2">'+
                                '	<img onclick="$(this).parents(\'tr\').insertBefore($(this).parents(\'tr\').prev(\'.previewTemplate\'))" class="img_1" style="cursor:pointer;" src="images/sc_t.jpg" />'+
                                '	<img onclick="$(this).parents(\'tr\').insertAfter($(this).parents(\'tr\').next())" class="img_2" style="cursor:pointer;" src="images/sc_b.jpg" />'+
                                '	<img onclick="$(this).parents(\'tr\').remove()" class="img_3" style="cursor:pointer;" src="images/sc_d.jpg" />'+
                                // '	<input onclick="javascript:set_cover_image(this);" class="input_6" type="radio" name="fengmian" value="'+json.data.file_path+'" />'+
                                // '	<span class="sp_fb">封面</span>'+
                                '	<div class="div_2_c_1_1">'+
                                '	<input type="hidden" name="batch_path_ids[]" value="'+json.data.id+'">'+
                                '	<img width="100%" src="'+json.data.file_path+'!160x115" >'+
                                '	</div>'+
                                '	<div class="div_2_c_1_2">'+
                                '	<textarea style="width:495px;height:95px;border:1px solid #ccc;" maxlength="400" name="image_alt[]" cols=""></textarea>'+
                                '	</div>'+
                                '</div>'+
                                '</td>'+
                                '</tr>';
                            $("#preview tr:last").after(html);
                        } else {
                            alertUploadMsg(json.message);
                            return false;
                        };
                    }
                });
            }
        });
    });
    //作品分类
    var leis = {};
    $.ajax({
        url: baseURL +'get_menu_list/148',
        type:'get',
        dataType:'json',
        async:false,
        success:function (res) {
            // 默认一级分类展示
            var mainData = res.data;
            leis = mainData;
            var strs1 = '';
            for(var i = 0;i < mainData.length;i++) {
                strs1 += '<option data_num="'+i+'" value="'+mainData[i].id+'">'+mainData[i].menu_name+'</option>';
            };
            $("#category_ids_2").html(strs1);
            $(document).on('click',"#category_ids_2 option",function () {
                $("#category_ids_4").empty().css("display","none");
                //(点击一级分类后，出现二级分类)
                var idx = $(this).attr("value"),strs2 = '';
                $.ajax({
                    url: baseURL +'get_menu_list/'+idx,
                    type:'get',
                    dataType:'json',
                    async:false,
                    success:function (res) {
                        var secData = res.data;
                        if(secData.length > 0) {
                            for(var j = 0;j < secData.length;j++){
                                strs2 += '<option data_num="'+j+'" value="'+secData[j].id+'">'+secData[j].menu_name+'</option>';
                            };
                            $("#category_ids_3").html(strs2).css("display","block");
                        };
                    }
                })
            });
            //点击二级分类，出现三级分类
            $(document).on('click',"#category_ids_3 option",function () {
                var num = $(this).attr("value"),strs3='';
                $.ajax({
                    url: baseURL +'get_menu_list/'+num,
                    type:'get',
                    dataType:'json',
                    async:false,
                    success:function (res) {
                        var thrData = res.data;
                        if( thrData.length > 0){
                            for(var k = 0;k < thrData.length;k++){
                                strs3 += '<option data_num="'+k+'" value="'+thrData[k].id+'">'+thrData[k].menu_name+'</option>';
                            };
                            $("#category_ids_4").html(strs3).css("display","block");
                        }else{
                            $("#category_ids_4").css("display","none");
                        }
                    }
                })
            });
        }
    });

    //上传作品
    $(".input_9").click(function () {
        var ids = [],srcs = '',kindOf = [],imageArr=[];
        $(".previewTemplate").each(function () {
            ids.push($(this).find(".div_2_c_1_1 input").attr("value"));
            imageArr.push($(this).find('textarea').val());
        });
        if(!$(".js-vide").length){
            srcs = '';
        }else{
            $(".js-vide").each(function () {
                srcs += $(this).find(".web").html() + ',';
            });
            if(srcs.length > 0) {
                srcs = srcs.substring(",",srcs.length-1);
            }
        };
        $(".div_3_a select option:selected").each(function () {
            kindOf.push($(this).attr("value"));
        });
        var uploadfile = {
            title : $("#title").val(),
            content : $(".div_2 textarea").val(),
            batch_path_ids : ids,
            batch_video_urls : srcs,
            keyword : $("#keyword").val(),
            category_ids_1:148,  //类别
            category_ids_2:kindOf[0],
            category_ids_3:kindOf[1],
            category_ids_4:kindOf[2],
            path :$("#thumbnail_path_src").attr('src'),
            image_alt:imageArr,
            image_upload_way:2,
            user_id:getCookie('user_id')
        };
        var uploadfileEdit = {
            title : $("#title").val(),              //标题   字符串
            content : $(".div_2 textarea").val(),   //作品描述  字符串
            batch_path_ids : ids,                   //上传的图片文件id  数组
            batch_video_urls : srcs,                //视频  字符串用逗号隔开
            keyword : $("#keyword").val(),          //关键字  字符串
            category_ids_1:148,                     //类别
            category_ids_2:kindOf[0],
            category_ids_3:kindOf[1],
            category_ids_4:kindOf[2],
            path :$("#thumbnail_path_src").attr('src'),   //封面地址  字符串
            image_alt:imageArr,   //每张图片的描述  数组
            image_upload_way:2,
            work_id:workEdit,      //作品id
            user_id:getCookie('user_id')   //作品所属人id
        };
        if($("#title").val() == "" || $("#title").val().length < 2) {
            alertUploadMsg('标题不能为空！');
            return false;
        }else if(!$("#thumbnail_path_src").attr('src')){
            alertUploadMsg('请设置封面！');
            return false;
        }else if(!$(".previewTemplate").length && !$(".js-vide").length){
            alertUploadMsg('请上传文件！');
            return false;
        }else if(!kindOf.length){
            alertUploadMsg('请选择分类！');
            return false;
        }else if($("#keyword").val() == ""){
            alertUploadMsg('请选填写关键词！');
            return false;
        }else{
            var url1 = baseURL + '/add_works_ex',
                url2 = baseURL + '/change_work_info';
            if(!workEdit.length){
                publishXhr(uploadfile,url1);
            }else{
                publishXhr(uploadfileEdit,url2);
            }
        }
    });
    function publishXhr(uploadfile,url) {
        $.ajax({
            url: url,
            type:"post",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data:uploadfile,
            dataType:'json',
            success:function (res) {
                if(res.success) {
                    window.location.href = 'MyDetailed.html?id='+getCookie("user_id");
                }else{
                    alertUploadMsg(res.message);
                };
            }
        });
    };
    $(".uploadMsg i").click(function () {
        $(this).parents(".uploadMsg").css("display","none");
    });
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

    //作品修改
    //判断是否有work_id传过来
    if(workEdit){
        //获取作品的信息
        $.ajax({
            url:baseURL+'get_works_info_by_self/'+getCookie('user_id')+'/'+workEdit,
            type:'post',
            data:'',
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success:function (res) {
                var main = res.data,
                    workPicIds = main.category_ids.substring(1,main.category_ids.length-1).split(",");
                var htm = '',video_show='';
                //把得到的数据展示在页面上
                $("#title.input_1").val(main.title);    //title
                $("#work_des").val(main.content);         //作品描述
                $("#thumbnail_path_src").attr("src",main.path+"!286x410");    //封面地址
                $("#keyword").val(main.keyword);      //关键字
                //得到上传的文件图片多个，需要遍历
                for(var m = 0;m < main.attachment_list.length;m++){
                    htm += '<tr class="previewTemplate">'+
                        '<td>'+
                        '<div class="div_2_c_2">'+
                        '	<img onclick="$(this).parents(\'tr\').insertBefore($(this).parents(\'tr\').prev(\'.previewTemplate\'))" class="img_1" style="cursor:pointer;" src="images/sc_t.jpg" />'+
                        '	<img onclick="$(this).parents(\'tr\').insertAfter($(this).parents(\'tr\').next())" class="img_2" style="cursor:pointer;" src="images/sc_b.jpg" />'+
                        '	<img onclick="$(this).parents(\'tr\').remove()" class="img_3" style="cursor:pointer;" src="images/sc_d.jpg" />'+
                        '	<input onclick="javascript:set_cover_image(this);" class="input_6" type="radio" name="fengmian" value="'+main.attachment_list[m].path_thumb+'" />'+
                        '	<span class="sp_fb">封面</span>'+
                        '	<div class="div_2_c_1_1">'+
                        '	<input type="hidden" name="batch_path_ids[]" value="'+main.attachment_list[m].id+'">'+
                        '	<img width="95" height="95" src="'+main.attachment_list[m].path_thumb+'" >'+
                        '	</div>'+
                        '	<div class="div_2_c_1_2">'+
                        '	<textarea style="width:495px;height:95px;border:1px solid #ccc;" maxlength="400" name="image_alt[]" cols="">'+main.attachment_list[m].alt+'</textarea>'+
                        '	</div>'+
                        '</div>'+
                        '</td>'+
                        '</tr>';
                };
                //类别选定
                var num1,num2;
                for(var k = 0;k < workPicIds.length;k++){
                    num1 = $("#category_ids_2 option[value="+workPicIds[1]+"]").attr("data_num");
                    $("#category_ids_2 option[value="+workPicIds[1]+"]").attr('selected','selected');
                    var strs2 = '';
                    if(leis[num1].subMenuList.length > 0) {
                        for(var j = 0;j < leis[num1].subMenuList.length;j++){
                            strs2 += '<option data_num="'+j+'" value="'+leis[num1].subMenuList[j].id+'">'+leis[num1].subMenuList[j].menu_name+'</option>';
                        };
                        $("#category_ids_3").html(strs2).css("display","block");
                        $("#category_ids_3 option[value="+workPicIds[2]+"]").attr('selected','selected');
                    };
                    num2 = $("#category_ids_3 option[value="+workPicIds[2]+"]").attr("data_num");
                    var strs3 = '';
                    if(('subMenuList' in leis[num1].subMenuList[num2]) && leis[num1].subMenuList[num2].subMenuList.length > 0) {
                        for(var t = 0;t < leis[num1].subMenuList[num2].subMenuList.length;t++){
                            strs3 += '<option data_num="'+t+'" value="'+leis[num1].subMenuList[num2].subMenuList[t].id+'">'+leis[num1].subMenuList[num2].subMenuList[t].menu_name+'</option>';
                        };
                        $("#category_ids_4").html(strs3).css("display","block");
                    }else{
                        $("#category_ids_4").css("display","none");
                    };
                    $("#category_ids_4 option[value="+workPicIds[3]+"]").attr('selected','selected');
                }
                $("#preview tr:last").after(htm);
                if(main.batch_video_urls == null || main.batch_video_urls==''){
                    //得到上传的视频地址多个，需要遍历
                    return false;
                }else{
                    for(var n = 0;n < main.batch_video_urls.length;n++){
                        video_show += '<div class="js-vide"><i style="display: inline-block;color: #ff7e02;position:relative;left:-5px;top: -5px;overflow: visible;height:auto;" class="icon-play iconfont11 icon-bofang" title="点击播放"> </i><span class="web">' + main.batch_video_urls[n] + '</span><span class="fl-rt"><span class="info" style="position:relative;top: -4px;">视频已导入！</span><i style="display: inline-block;color: #CCCCCC;position:relative;left:15px;top: -5px;overflow: visible;height:auto;" class="icon-close iconfont11 icon-guanbi1" title="取消"></i></span></div>'
                    };
                }
                $('.js-publish-videow').append(video_show);

                $(document).on('click','.icon-play', function() {
                    var vid = /https:\/\/v\.youku\.com\/v_show\/id_(.+).html/gi.exec($(this).parent().find(".web").html())[1];
                    var apd = $('<div class="js-publish-video-u"><div class="js-mask"></div><div class="js-video"><div class="header"><span>视频预览</span><i class="icon-closeB iconfont11 icon-guanbi"></i></div><div class="js-video-main"><embed src="https://player.youku.com/player.php/sid/' + vid + '/v.swf" allowFullScreen="true" quality="high" width="600" height="400" align="middle"  autostart=true  allowScriptAccess="always" type="application/x-shockwave-flash"></embed></div></div></div>');
                    $('body').append(apd);
                    $('.js-video').jsmove({
                        head: '.header'
                    });
                    close();
                    function close() {
                        $('.js-publish-video-u .icon-closeB').on('click', function() {
                            $('.js-video').addClass('animate-fadeUp');
                            $('.js-mask').animate({
                                opacity: 0
                            }, 400);
                            setTimeout(function() {
                                $('.js-video').removeClass('animate-fadeUp')
                                apd.remove();
                            }, 400)
                        });
                    }
                });
            }
        })
    }else{
        // alert(4)
    }
})
