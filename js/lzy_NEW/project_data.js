/**
 * Created by admin on 2017/8/27.
 */
var urlLocalhost = "https://www.huakewang.com/";
var newhuakwang="hkw_newapi/";
var _kind  = "";
var fileTypeSrc = ['images/adoc.png', 'images/ajpg.png', 'images/amp3.png', 'images/amp4.png', 'images/apdf.png', 'images/appt.png', 'images/atxt.png', 'images/aunknown.png', 'images/axls.png', 'images/azip.png'];
if(window.location.href.indexOf("detailed") != -1){
    _kind = "user";
}else if(window.location.href.indexOf("ProjectDetails") != -1){
    _kind = "project";
};
function getLocationParam(name){
    var url = window.location.search;
    if ( ~url.indexOf("?") ) {
        var search = {};
        var arrayParam = url.split("?")[1].split("&");
        arrayParam.map(function(value,index, elem) {
            var key = value.split("=")[0];
            var val = value.split("=")[1];
            search[key] = val;
        });
        if (name in search){
            return search[name];
        }else{
            return "";
        }
    }
    return "";
};
(function () {
    var _cookie_id= $.cookie('user_id');
    //hkapi/get_project_info/$id/$longitude/$latitude
    if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id==""||_cookie_id==0){
        _cookie_id=0;
    }
    var _location_href=getLocationParam("id");

    var init= function (val) {
        $.ajax({
            url:urlLocalhost+newhuakwang+"/get_project_info/"+_location_href+"/0/0",
            type:"post",
            dataType:"json",
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            data:{
                id:_location_href,
                user_id:_cookie_id
            }
        }).done(function (data) {
            if(data.success){
                $("title").html(data.data.title);
                $("meta[name=keywords]").attr("content",data.data.keyword);
                $("meta[name=description]").attr("content",data.data.content);
                $("meta[name=abstract]").attr("content",data.data.abstract);
                $('#main-body').attr('name',data.data.id);
                getDesigner_data(data.data,data.data.long_lat_address);
                if(val == 0) {
                    projectContent(data.data);
                }else{

                };
            }else{

            };
        });
    };
    init(0);
    window.init_project=init;

    function getDesigner_data(Designer_data,_txt_address0){
        var Designerdata = Designer_data.user_info;
        var  _Designer_data_path=Designerdata.path;
        if(_Designer_data_path==""){
            _Designer_data_path='image/bigAvator1.png'
        };
        $('#project_designer_touxiang').attr({
            "src":_Designer_data_path,
            "data-id":Designer_data.user_id
        });
        $('#project_designer_data1 p:eq(0)').html(Designerdata.nick_name);
        var _ccompany=Designerdata.company;
        _ccompany=_ccompany=="保密"?"":_ccompany+'&nbsp;';
        $('#project_designer_data1 p:eq(1)').html('单位信息：'+_ccompany+Designerdata.job_name);

        $('#project_designer_data1 p:eq(2)').html('&nbsp;&nbsp;信用评分：'+Designerdata.credit_val);


        $('#project_designer_data2 li:eq(0) p:eq(0)').html(Designerdata.order_count);
        $('#project_designer_data2 li:eq(1) p:eq(0)').html(Designerdata.meet_count);
        $('#project_designer_data2 li:eq(2) p:eq(0)').html(Designerdata.vistor_count);


        var _hrefArr=[
            (Designerdata.hxid?'Personal-x.html?talk_hxid='+Designerdata.hxid:"javascript:;"),
            'yuejian.html?id='+Designerdata.id,
            'yunStep.html?uid='+Designerdata.id
        ];

        $('#project_designer_data3 a:eq(0)').attr('href',_hrefArr[0]);
        $('#project_designer_data3 a:eq(1)').attr('href',_hrefArr[1]);
        $('#project_designer_data3 a:eq(2)').attr('href',_hrefArr[2]);

        $('#project_designer_data3 a').on('click', function (e) {
            if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id=="") {
                e.preventDefault();
                alertNoLoginMessageChange();
            }else if(_cookie_id==Designerdata.id){
                e.preventDefault();
                console.log("自点击取消；");
            }else{

            };
        });
    }
    function projectContent(_contetnData){
        //long_lat_address
        $('#project_designer_data1 p:eq(3)').html('项目位置：'+_contetnData.long_lat_address);
        $('#project_designer_data1 p:eq(4)').html('发布时间:'+_contetnData.add_time_format);

        $('#project_content_data_show p.content-big-title:eq(0)').html(_contetnData.direction);
        $('#project_content_data_show div.banner-p:eq(0) p.right').html(_contetnData.add_time_format);
        $('#project_content_data_show div.banner-p:eq(1) p.right').html('<span style="font-weight:bold;font-size: 16px;">预算：</span><span style="color: red;font-weight:bold;font-size: 16px;">'+_contetnData.budget_price+'</span>');
        if(_contetnData.is_appraised==0){
            $('#biaotai_error').css('display','inline-block');
        }else{
            $('#biaotai_error').css('display','none');
        }

        $('#project_content_data_show div.banner-p:eq(2) p.right').html('<span>需求概述：</span>'+_contetnData.content);
        var _attachment_list=_contetnData.attachment_list;
        var _attachment_list_html='',strs='';
        console.log(_attachment_list);
        if(_attachment_list.length==0){
            $('#project_content_data_show .filelist:eq(0) ul').html('暂无附件')
        }else{
            for (var i = 0;i < _attachment_list.length;i++) {
                var fileSrc = _attachment_list[i].ext,src;
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
                _attachment_list_html += '<div class="yunFujianWrap clearfix"><img class="fl" src="'+src+'" alt=""><p title="'+_attachment_list[i].name+'">'+_attachment_list[i].name+'</p><span>'+((_attachment_list[i].size)/1024/1024 > 1?((_attachment_list[i].size)/1024/1024).toFixed(2)+'MB':(_attachment_list[i].size/1024).toFixed(2)+'KB')+'</span>'+(_attachment_list[i].path.indexOf("zip") != -1?'<a href="'+_attachment_list[i].path+'">下载</a>':'')+'</div>';
                if(_attachment_list[i].path.indexOf("zip") == -1){
                    strs += '<li><img src="'+_attachment_list[i].path_thumb+'" data-src="'+_attachment_list[i].path+'" alt="'+_attachment_list[i].alt+'"></li>'
                };
            };
            if(_attachment_list_html==""){
                $('#project_content_data_show .filelist:eq(0) ul').html('暂无附件');
            }else{
                $('#project_content_data_show .filelist:eq(0) ul').html(_attachment_list_html);
                $('#project_content_data_show .filelistImg:eq(0) ul').html(strs);
            };
        };
        $('#click_zan_love_count').html('('+_contetnData.love_count+')');
        if(_contetnData.islove==1){
            $(".zan-icon").addClass("position");
            $(".click-dianzan").attr('islove',1);
        }else{
            $(".zan-icon").removeClass("position");
            $(".click-dianzan").attr('islove',0);
        };
        $('#project_send_people_number').html(_contetnData.quote_count);
        $('#project_send_people_number').attr('value',_contetnData.quote_count);
        $('#project_content_data_show').attr('data-projece-id',_contetnData.id);
    //    请求是否有发送过报价？
        if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id==""||_cookie_id==0){

        }else{
            $.ajax({
                url:urlLocalhost+"quoteApi/project_quote",
                type:"post",
                dataType:"json",
                data:{
                    user_id:_cookie_id,
                    project_id:_contetnData.id,
                    price:-1,
                }
            }).done(function (data) {
                console.log("预发报价");
                console.log(data);
                if(data.success){
                    if(data.data.price==-1){
                        $('.baoming_box_send:eq(0)').css('display','block');
                        $('.baoming_box_send:eq(1)').css('display','none');
                    }else{
                        $('.baoming_box_send:eq(1)').css('display','block');
                        $('.baoming_box_send:eq(0)').css('display','none');
                        $('.baoming_box_send:eq(1) .baoming_box_success_show:first').css('display','block');
                        $('.baoming_price_send_check1:first p:eq(0)').html('已有'+_contetnData.quote_count+'人参与');
                        $('.baoming_box_success_show_money').html(data.data.price);
                    };
                }
            });
        };
    };
    function getcores() {
        $.ajax({
            url:urlLocalhost+newhuakwang+"/get_common_appraise_list",
            type:"post",
            dataType:"json",
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            data:{
                model:_kind,
                model_id:getLocationParam("id")
            }
        }).done(function (data) {
            console.log("评分");
            console.log(data);
            if(data.success){
                if(data.data.item_list.length > 0) {
                    var _l=data.data.item_list.filter(function (x) {
                        return x.user_id==_cookie_id
                    });
                    if(_l[0] && _l[0].appraise_txt != null && _l[0].appraise_txt != 'undefined') {
                        $('#biaotai_had').html('已评分：'+_l[0].appraise_txt+'&nbsp;('+_l[0].appraise_score+'分)').prev("#biaotai_error").remove();
                    };
                };
            }
        });
    };getcores();
    $(document).on('click','#biaotai_send_login', function () {
        if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id==""||_cookie_id==0){
            go_login();
        }else {
            var valueArr = $('#biaotai_send_login').attr('value');
            var _txt=$('#biaotai_had').html();
            $.ajax({
                url:urlLocalhost+newhuakwang+"/do_common_appraise",
                type:"post",
                dataType:"json",
                xhrFields:{
                    withCredentials:true
                },
                crossDomain: true,
                data:{
                    user_id:_cookie_id,
                    appraise_score:valueArr,
                    appraise_txt:_txt,
                    model:_kind,
                    model_id:getLocationParam("id")
                }
            }).done(function (data) {
                console.log("获取评分");
                console.log(data);
                if(data.success){
                    $('#biaotai_error').css('display','none');
                    $('#biaotai_had').html('您的评价为：'+_txt);
                }
            });
        }
    });
    $(document).on("click",".filelistImg li img",function () {
        var src = $(this).attr("data-src"),alt = $(this).attr("alt");
        $(".filelistImgShowWrap").css("display","block");
        $(".filelistImgShow").css("display","block").find("img").attr("src",src).attr("alt",alt);
    });
    $(".filelistImgShow").click(function () {
        $(this).css("display","none");
        $(this).prev().css("display","none");
    });
    $(".filelistImgShowWrap").click(function () {
        $(this).css("display","none");
        $(this).next().css("display","none");
    });
    $('#project_sendaprice').on('click', function () {
        if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id==""||_cookie_id==0){
            go_login();
        }else{
            var _visibility=$('.baoming_box_send').css('visibility');
            if(_visibility=="visible"){
                $('.baoming_box_send').css('visibility','hidden');
            }else{
                $('.baoming_box_send').css('visibility','visible');
            };
        };
    });
    $('.baoming_box_send:eq(0) a:eq(0)').on('click', function () {
        $('.baoming_box_send').css('visibility','hidden');
    });
    $('.baoming_box_send:eq(1) a:eq(0)').on('click', function () {
        $('.baoming_box_send').css('visibility','hidden');
    });
    $('.project_sendaprice:first').siblings().on('click', function (event) {
        event.stopPropagation();
    });
    $('.baoming_box_send:eq(0) a.project_sendaprice_btn:first').on('click',function () {
        var _price=$('#baoming_input_price').val();
        if(_price>0){
            $('#baoming_input_price').attr('disabled',"disabled");
            $('.project_sendaprice_btn:first').parent().css('display','none');
            $('.baoming_price_send_check:first').css('display','block');
        }else{
            alertUploadMsg("请输入预报价金额！");
        }
    });
    $('.baoming_price_send_check:first a:eq(0)').on('click', function () {
        $('#baoming_input_price').removeAttr('disabled');
        $('.project_sendaprice_btn:first').parent().css('display','block');
        $('.baoming_price_send_check:first').css('display','none');
    });
    $('.baoming_price_send_check:first a:eq(1)').on('click', function () {
        $('.baoming_box_send:eq(0)').css('display','none');
        $('.baoming_box_send:eq(1)').css('display','block');
        $('.baoming_box_send:eq(1) .ajax_wait_text:first').css('display','block');
        var _price_checked=$('#baoming_input_price').val();
        var _project_id=$('#project_content_data_show').attr('data-projece-id');
        $.ajax({
            url:urlLocalhost+"quoteApi/project_quote",
            type:"post",
            dataType:"json",
            data:{
                user_id:$.cookie('user_id'),
                project_id:_project_id,
                price:_price_checked
            }
        }).done(function (data) {
            if(data.success){
                alertUploadMsg("发送成功！");
                $('.baoming_box_send:eq(1) .ajax_wait_text:first').css('display','none');
                $('.baoming_box_send:eq(1) .baoming_box_success_show:first').css('display','block');
                var _number=$('#project_send_people_number').attr('value');
                _number++;
                $('.baoming_price_send_check1:first p:eq(0)').html('已有'+_number+'人参与');
                $('#project_send_people_number').attr('value',_number);
                $('#project_send_people_number').html(_number);
                $('.baoming_box_success_show_money').html(_price_checked);
            }else{
                alertUploadMsg(data.message);
                $('.baoming_box_send:eq(1)').css('display','none');
                $('.baoming_box_send:eq(0)').css('display','block');
            }
        })
    });
    $(".click-dianzan").click(function () {
        if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id==""||_cookie_id==0){
            alertNoLoginMessageChange();
        }else{
            var _islove=$(this).attr('islove');
            var val = $('#click_zan_love_count').html();
            val=val.split('(')[1].split(')')[0];
            if (_islove==0){
                ++ val;
                $(this).attr('islove',1);
                $(this).find(".zan-icon").addClass("position");
                $('#click_zan_love_count').html('('+val+')');
                add_love_function();
            }else {
                val --;
                $(this).attr('islove',0);
                $(this).find(".zan-icon").removeClass("position");
                $('#click_zan_love_count').html('('+val+')');
                add_love_function();
            };
        }
    });
    var add_love_function=function(){
        $.ajax({
            url:urlLocalhost+newhuakwang+"/add_love",
            type:"post",
            dataType:"json",
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            data:{
                id:$('#main-body').attr('name'),
                user_id:getCookie("user_id"),
                model:"project"
            }
        }).done(function (data) {
            console.log("喜欢");
            console.log(data);
            if(data.success){
                if(data.message.type=="add"){

                }else{

                }
            }else{
                if(data.field=="login"&&data.message=="会话已失效，请重新登录"){
                    $.cookie('user_id',"",{path:'/',expires:-1});
                    $.cookie("hxid","",{path:'/',expires:-1});
                    alert('登录失效');
                };
            }
        })
    };
    $('.biaotai_send_login_a:eq(0)').on('click', function () {
        $('#biaotai_send_login').attr('value',1);
    });
    $('.biaotai_send_login_a:eq(1)').on('click', function () {
        $('#biaotai_send_login').attr('value',2);
    });
    $('.biaotai_send_login_a:eq(2)').on('click', function () {
        $('#biaotai_send_login').attr('value',3);
    });
    $('.biaotai_send_login_a:eq(3)').on('click', function () {
        $('#biaotai_send_login').attr('value',4);
    });
    $('.biaotai_send_login_a:eq(4)').on('click', function () {
        $('#biaotai_send_login').attr('value',5);
    });
    $('.biaotai_send_login_a').on('click', function () {
        var _val=parseInt($(this).attr('value'));
        switch (_val){
            case 1:{
                $('#biaotai_had').html('差评');
                $('.biaotai_send_login_a:eq(0)').html('<img src="images/dj_y.png"/>');
                $('.biaotai_send_login_a:eq(0)').siblings('.biaotai_send_login_a').html('<img src="images/dj_n.png"/>');
            }break;
            case 2:{
                $('#biaotai_had').html('一般');

                $('.biaotai_send_login_a:eq(0)').html('<img src="images/dj_y.png"/>');
                $('.biaotai_send_login_a:eq(1)').html('<img src="images/dj_y.png"/>');
                $('.biaotai_send_login_a:eq(2)').html('<img src="images/dj_n.png"/>');
                $('.biaotai_send_login_a:eq(3)').html('<img src="images/dj_n.png"/>');
                $('.biaotai_send_login_a:eq(4)').html('<img src="images/dj_n.png"/>');
            }break;
            case 3:{
                $('#biaotai_had').html('普通');

                $('.biaotai_send_login_a:eq(0)').html('<img src="images/dj_y.png"/>');
                $('.biaotai_send_login_a:eq(1)').html('<img src="images/dj_y.png"/>');
                $('.biaotai_send_login_a:eq(2)').html('<img src="images/dj_y.png"/>');
                $('.biaotai_send_login_a:eq(3)').html('<img src="images/dj_n.png"/>');
                $('.biaotai_send_login_a:eq(4)').html('<img src="images/dj_n.png"/>');
            }break;
            case 4:{
                $('#biaotai_had').html('良好');

                $('.biaotai_send_login_a:eq(4)').html('<img src="images/dj_n.png"/>');
                $('.biaotai_send_login_a:eq(4)').siblings('.biaotai_send_login_a').html('<img src="images/dj_y.png"/>');
            }break;
            case 5:{
                $('#biaotai_had').html('优秀');
                $('.biaotai_send_login_a').html('<img src="images/dj_y.png"/>');
            }break;
        }
    });
})();