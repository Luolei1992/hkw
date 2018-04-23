/**
 * Created by admin on 2017/7/31.
 */
//获取当前页面的URL参数
function getLocationParam(name) {
    var url = window.location.search;
    if (~url.indexOf("?")) {
        var search = {};
        var arrayParam = url.split("?")[1].split("&");
        arrayParam.map(function(value, index, elem) {
            var key = value.split("=")[0];
            var val = value.split("=")[1];
            search[key] = val;
        });
        if (name in search) {
            return search[name];
        } else {
            return "";
        }
    }
    return "";
};

function alertUploadMsg(msg) {
    var d = dialog({
        fixed: true,
        title: '提示',
        content: msg
    });
    d.show();
    setTimeout(function() {
        d.close().remove();
    }, 2000);
};
$(function() {
    var urlLocalhost = 'https://www.huakewang.com/',
        newhuakwang = "hkw_newapi/";
    var industrySelectPlug = undefined,
        tag = getLocationParam("id"),
        _cookie_id = $.cookie('user_id') || "";
    var init = function() {
        console.log(tag);
        $.ajax({
            url: urlLocalhost + newhuakwang + "get_news_info/" + tag + '/' + _cookie_id,
            type: "get",
            dataType: "json"
        }).done(function(data) {
            console.log("新闻");
            console.log(data);
            if (data.success) {
                $('#main-body').attr('name', data.data.id);
                $("title").html(data.data.title);
                // $("meta[name=keywords]").attr("content", data.data.keyword);
                // $("meta[name=description]").attr("content", data.data.content);
                // var _category_ids = data.data.category_ids.split(",");
                // var _s_category_ids = _category_ids.filter(function (_category_id) {
                //     return _category_id != "";
                // });
                // if (_s_category_ids.length == 2) {
                //     var ajaxMockData1 = {
                //         firstid: _s_category_ids[0],
                //         secondid: _s_category_ids[1],
                //         sort: "add_time",
                //         keyword: data.data.keyword,
                //         offset: 0,
                //         limit: 8
                //     };
                //     aboutWorksFunction(ajaxMockData1);
                // } else if (_s_category_ids.length > 2) {
                //     var ajaxMockData2 = {
                //         firstid: _s_category_ids[1],
                //         secondid: _s_category_ids[2],
                //         sort: "add_time",
                //         keyword: data.data.keyword,
                //         offset: 0,
                //         limit: 8
                //     };
                //     aboutWorksFunction(ajaxMockData2);
                // }
                introductionFunction(data.data);
                // userInfoChange(data.data);
                // userSelf_works_other_show(data.data.user_id, data.data.id);
            } else {
                if (data.field == "login" && data.message == "会话已失效，请重新登录") {
                    // $.cookie('id', null, { path: '/', expires: -1 });
                    $.cookie("lng", null, { path: '/', expires: -1 });
                    $.cookie("lat", null, { path: '/', expires: -1 });
                    //设置头像，昵称和手机号
                    // setCookie("avatar",data.data.path_thumb);
                    $.cookie("nick_name", null, { path: '/', expires: -1 });
                    // setCookie("mobile",data.data.mobile);
                    // 设置环信id到cookie里
                    $.cookie("hxid", null, { path: '/', expires: -1 });
                    alert('登录失效');
                }
            }
            return data;
        });
    };
    init();
    window.init = init;

    // var userInfoChange = function (_data) {
    //     var _userdata = _data.user_info;
    //     $('.userSelf_otherWorks:first p:eq(0)').html(_userdata.nick_name + '的其他作品');
    //     var localtion = '<img style="margin-right: 10px;vertical-align: middle;" src="images/dwtb.jpg" />' + _userdata.txt_address;
    //     var _experience = parseInt(_userdata.experience);
    //     if (isNaN(_experience) || _experience <= 1) {
    //         _experience = "1年经验"
    //     } else {
    //         _experience = _experience + "年经验";
    //     }
    //     $('#work_designerData p:eq(0)').html(_userdata.nick_name + '<img style="display: inline;margin-left: 5px"/>');
    //     var _j = _userdata.jobs[0] || _userdata.job_name || _userdata.company;
    //     $('#work_designerData p:eq(1)').html(_j + " | " + _experience + " | " + _userdata.works_count + "作品");
    //     if (_userdata.txt_address == "未知") {
    //         localtion = '<img style="margin-right: 10px;vertical-align: middle;" src="images/dwtb.jpg" />' + "[未知]";
    //         $('#work_designerData p:eq(2)').html(localtion);
    //     } else {
    //         $('#work_designerData p:eq(2)').html(localtion);
    //     }
    //     var userTouxiang = _userdata.path_thumb;
    //     if (userTouxiang.indexOf("http") > -1) {
    //         $('#work_designerPath a img:first').attr({
    //             "src": userTouxiang,
    //             "data-workid": _data.id,
    //             "data-id": _data.user_id,
    //         });
    //     } else {
    //         userTouxiang = "https://www.huakewang.com/" + userTouxiang;
    //         $('#work_designerPath a img:first').attr('src', userTouxiang);
    //     };
    //     var _sex = _userdata.sex;
    //     if (_sex == "保密") {
    //         $('#work_designerData p:eq(0) img').css('display', "none");
    //     } else {
    //         if (_sex == "女") {
    //             $('#work_designerData p:eq(0) img').attr('src', "images/sex2.png");
    //         } else {
    //             $('#work_designerData p:eq(0) img').attr('src', "images/sex1.png");
    //         }
    //     }
    // };
    var introductionFunction = function(_data) {
        $('#aboutWork_title_kind_time  p:eq(0)').html(_data.title);
        $("#crumbs-newTitle").html(_data.title);
        $('#aboutWork_title_kind_time  p:eq(1)').html(renderSource(_data.source, _data.add_time_format));
        var _height = $('#aboutWork_title_kind_time  p:eq(0)').css('height');
        if (_height == "70px") {
            $('#aboutWork_title_kind_time p:eq(1)').css('display', 'inline-block');
            $('#aboutWork_title_kind_time ul:eq(0)').css('display', 'inline-block');
            $('#aboutWork_title_kind_time ul:eq(0)').css('margin-left', '30px');
        } else {
            $('#aboutWork_title_kind_time p:eq(1)').css('display', 'block');
            $('#aboutWork_title_kind_time ul:eq(0)').css('display', 'block');
            $('#aboutWork_title_kind_time ul:eq(0)').css('margin-left', '0px');
        }
        //显示来源和时间的函数,返回HTML字符串
        function renderSource(source, add_time_format) {
            var htmlStr = "";
            if (source) {
                htmlStr += '<img class="icon-source" src="images/tian.png"> 来自： ' + source;
            }
            if (add_time_format) {
                htmlStr += '<img class="icon-time" src="images/tm.png"> 时间： ' + add_time_format;
            }
            return htmlStr
        }

        // $.ajax({
        //     url: urlLocalhost + newhuakwang + "get_menu_list/148",
        //     type: "post",
        //     dataType: "json",
        //     data: ""
        // }).done(function (data) {
        //     console.log("获取栏目分类列表");
        //     console.log(data);
        //     if (data.success) {
        //         industrySelectPlug = data.data;
        //         var _category_ids = _data.category_ids.split(",").filter(function (x) {
        //             return x != ""
        //         });
        //         var _c_text = '', _c_html = '';
        //         if (_category_ids[0] == 148) {
        //             if (_category_ids[1] != undefined) {
        //                 for (var c = 0; c < industrySelectPlug.length; c++) {
        //                     if (industrySelectPlug[c].id == _category_ids[1]) {
        //                         _c_text += '<a style="color: #aaa" href="searchResult.html?keyword=' + industrySelectPlug[c].menu_name + '" target="_blank">' + industrySelectPlug[c].menu_name + '</a>';
        //                         _c_html = '<img src="images/tian.png"> 作品分类 ：';
        //                         var _industrySelectPlug = industrySelectPlug[c].subMenuList;
        //                         if (_category_ids[2] != undefined) {
        //                             for (var cc = 0; cc < _industrySelectPlug.length; cc++) {
        //                                 if (_industrySelectPlug[cc].id == _category_ids[2]) {
        //                                     _c_text += '&nbsp;&nbsp;<a style="color: #aaa" href="searchResult.html?keyword=' + _industrySelectPlug[cc].menu_name + '">' + _industrySelectPlug[cc].menu_name + '</a>';
        //                                     var __industrySelectPlug = _industrySelectPlug[cc].subMenuList;

        //                                     if (_category_ids[3] != undefined) {
        //                                         for (var ccc = 0; ccc < __industrySelectPlug.length; ccc++) {
        //                                             if (_category_ids[3] == __industrySelectPlug[ccc].id) {
        //                                                 _c_text += '&nbsp;&nbsp;<a style="color: #aaa" href="searchResult.html?keyword=' + __industrySelectPlug[ccc].menu_name + '">' + __industrySelectPlug[ccc].menu_name + '</a>';
        //                                                 _c_html = _c_html + _c_text + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<img src="images/tm.png" style="width: 14px;position: relative;top:1px;margin-right: 3px;"/>' + _data.add_time_format + '';
        //                                                 $('#aboutWork_title_kind_time  p:eq(1)').html(_c_html);
        //                                             }
        //                                         }
        //                                     } else {
        //                                         _c_html = _c_html + _c_text + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<img src="images/tm.png" style="width: 14px;position: relative;top:1px;margin-right: 3px;"/>' + _data.add_time_format + '';

        //                                         $('#aboutWork_title_kind_time  p:eq(1)').html(_c_html);
        //                                     }
        //                                 }
        //                             }
        //                         } else {
        //                             _c_html = _c_html + _c_text + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<img src="images/tm.png" style="width: 14px;position: relative;top:1px;margin-right: 3px;"/>' + _data.add_time_format + '';
        //                             $('#aboutWork_title_kind_time  p:eq(1)').html(_c_html);
        //                         }
        //                     }
        //                 }
        //             } else {
        //                 _c_html = _c_html + _c_text + '<img src="images/tm.png" style="width: 14px;position: relative;top:1px;margin-right: 3px;"/>' + _data.add_time_format + '';
        //                 $('#aboutWork_title_kind_time  p:eq(1)').html(_c_html);
        //             }
        //         }
        //     }
        // });

        $('#aboutWork_title_kind_time  .div_b_ul li:eq(0)').html('<img src="images/zpxx_1.jpg"/>' + _data.hits);
        $('#aboutWork_title_kind_time  .div_b_ul li:eq(1)').html('<img src="images/zpxx_2.jpg"/>' + _data.love_count);
        $('#aboutWork_title_kind_time  .div_b_ul li:eq(2)').html('<img src="images/zanr.jpg"/>' + _data.comment_count);
        $('#main-body .mainBodyIntroductionContent:first').html('<pre style="white-space: pre-wrap;padding: 0 110px;font-size: 13px;color: #2a2828;text-align: center;font-family: Microsoft YaHei,Verdana, Arial, Helvetica, sans-serif;">' + _data.content + '</pre>');
        $("#click-dianzan").html(_data.love_count);
        // $('#todayFindPeopleNum').html(_data.today_vistor_count);
        if (_data.islove == 1) {
            $(".click-dianzan").children(".zan-icon").addClass("position");
        }
        $(".click-dianzan").children("span").children("i").html(_data.love_count);
        if (_data.islove == 1) {
            $(this).children(".zan-icon").toggleClass("position");
        }
        $(".click-dianzan").click(function() {
            // if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
            // alertNoLoginMessageChange();
            // } else {
            $(this).children(".zan-icon").toggleClass("position");
            var val = $(this).children("span").children("i").html();
            if ($(this).children(".zan-icon").hasClass("position")) {
                ++val;
                add_love_function();
                $(this).children("span").children("i").html(val);
            } else {
                val--;
                add_love_function();
                $(this).children("span").children("i").html(val);
            };
            // }
        });
        //更新，添加了收藏按钮 start 
        //更新，新闻暂时没有收藏 end
        // if (_data.is_favorite == 1) {
        //     $(".click-collect").children(".collect-icon").addClass("position");
        // }
        // $(".click-collect").children("span").children("i").html(_data.favorite_count);
        // if(_data.is_favorite==1){
        //     $(this).children(".collect-icon").toggleClass("position");
        // }
        // $(".click-collect").click(function () {
        //     if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
        //         alertNoLoginMessageChange();
        //     } else {
        //         $(this).children(".collect-icon").toggleClass("position");
        //         var val = $(this).children("span").children("i").html();
        //         if ($(this).children(".collect-icon").hasClass("position")) {
        //             ++val;
        //             add_favorite_function();
        //             $(this).children("span").children("i").html(val);
        //         } else {
        //             val--;
        //             add_favorite_function();
        //             $(this).children("span").children("i").html(val);
        //         }
        //     }
        // });
        //更新，添加了收藏按钮 end

        // var imageBoxList = _data.attachment_list;
        // var imageBoxListContent = '';
        // for (var ibl = 0; ibl < imageBoxList.length; ibl++) {

        //     imageBoxListContent += '<img alt="' + _data.title + " " + _data.keyword + '" class="div_b_img2" style="height:auto;width: 100%" src="' + imageBoxList[ibl].path + '" /><p></p>'
        // }
        // var _data_keyword = _data.keyword.split(",").filter(function (x) {
        //     return x != ""
        // });
        // var _work_keyword_list_show = '';
        // for (var _dk = 0; _dk < _data_keyword.length; _dk++) {
        //     _work_keyword_list_show += '<a href="searchResult.html?search=' + _data_keyword[_dk] + '">' + _data_keyword[_dk] + '</a>';
        // }
        // $('.work_keyword_list_show:first').html(_work_keyword_list_show);

        // $('#mainBodyIntroductionImageBox').html(imageBoxListContent);
        $('#introductionTextArea').on('focus', function() {
            if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
                $(this).siblings('sublime').css({ background: '#eee', color: '#111' });
                alertNoLoginMessageChange();
            } else {
                $(this).siblings('sublime').css({ background: '#3388ff', color: '#fff' });
            }
        });

        // $('.sublime:first').on('click',function(){
        //     if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id=="") {
        //         alertNoLoginMessageChange();
        //     }else{
        //         var senddata={
        //             work_id:$('#main-body').attr('name'),
        //             user_id:_cookie_id,
        //             nick_name_to:"",
        //             user_id_to:"",
        //             comment_id:0,
        //             content:''
        //         };
        //         senddata.nick_name_to=_data.nick_name;
        //         senddata.user_id_to=_data.user_id;
        //         senddata.content=$('#introductionTextArea').val();
        //         if(senddata.content.length>0){
        //             pinglunBoxSubmitInputSend(senddata,$('#introductionTextArea'));
        //         }else{
        //             $('#introductionTextArea').parent().append('<p style="color: red;text-align:center;transition: all 0.5s;">内容不可以为空！</p>');
        //             setTimeout(function () {
        //                 $('#introductionTextArea').parent().find('p').remove();
        //             },1800)
        //         }
        //     }
        // });
        // 鼠标滑动到设计师头像上的出现四个点击列表
        // var url_designer_other = [
        //     'Personal-x.html?id=' + _data.user_info.id,
        //     'appointment.html?id=' + _data.user_info.id,
        //     'detailed.html?id=' + _data.user_info.id + '&tag=3',
        //     'tousu.html?id=' + _data.user_info.id + '&work_id=' + _data.id,
        //     'detailed.html?id=' + _data.user_info.id
        // ];
        // $('.click_designer_box_div2 div').on('click', function (event) {
        //     event.stopPropagation();
        // });

        // $('.click_designer_box_div2 div:eq(0)').on('click', function (e) {
        //     if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
        //         e.preventDefault();
        //         alertNoLoginMessageChange();
        //     } else if (_cookie_id == _data.user_id) {
        //         e.preventDefault();
        //         console.log("自点击取消；")
        //     } else {
        //         window.open(url_designer_other[0], '_blank');
        //     }
        // });
        // $('.click_designer_box_div2 div:eq(1)').on('click', function (e) {
        //     if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
        //         e.preventDefault();
        //         alertNoLoginMessageChange();
        //     } else if (_cookie_id == _data.user_id) {
        //         e.preventDefault();
        //         console.log("自点击取消；")
        //     } else {
        //         window.open(url_designer_other[1], '_blank');
        //     }
        // });
        // $('.click_designer_box_div2 div:eq(2)').on('click', function (e) {
        //     if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
        //         e.preventDefault();
        //         alertNoLoginMessageChange();
        //     } else if (_cookie_id == _data.user_id) {
        //         e.preventDefault();
        //         console.log("自点击取消；")
        //     } else {
        //         window.open(url_designer_other[2], '_blank');
        //     }
        // });
        // $('.click_designer_box_div2 div:eq(3)').on('click', function (e) {
        //     if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
        //         e.preventDefault();
        //         alertNoLoginMessageChange();
        //     } else if (_cookie_id == _data.user_id) {
        //         e.preventDefault();
        //         console.log("自点击取消；")
        //     } else {
        //         window.open(url_designer_other[3], '_blank');
        //     }
        // });
        //点击头像
        // $('#work_designerPath .img_1:first').on('click', function () {
        //     window.open(url_designer_other[4], '_blank');
        // });
    };

    // var aboutWorksFunction = function (_workValue) {
    //     $.ajax({
    //         url: urlLocalhost + newhuakwang + "get_works_list_ex",
    //         type: "post",
    //         dataType: "json",
    //         data: _workValue
    //     }).done(function (data) {
    //         console.log("作品瀑布流使用");
    //         console.log(data);
    //         if (data.success) {
    //             for (var a = 0; a < data.data.item_list.length; a++) {
    //                 var _data = data.data.item_list[a];
    //                 var _li = document.createElement('li');
    //                 _li.style.display = _data.display || "block";
    //                 var _imagepath = _data.path;
    //                 var _path = "introduction.html?id=" + _data.id;
    //                 _li.innerHTML = '<div class="iInspir-block"></div>' +
    //                     '<div class="hkw-work-img thumb-a h_a">' +
    //                     '<a href="' + _path + '" target=_blank><img class="delay maxImgWidth"   src="' + _imagepath + '"  style=""  /></a>' +
    //                     '<div class="caption">' +
    //                     '<h4 style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' +
    //                     _data.title +
    //                     '<a href="#" class="sc">' +
    //                     '收藏' +
    //                     '</a>' +
    //                     '</h4>' +
    //                     '<p style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' + _data.content + '</p>' +
    //                     '</div>' +
    //                     '</div>' +
    //                     '<div class="hkw-work-bottom">' +
    //                     '<a href="detailed.html?id=' + _data.user_id + '" target=_blank><img ' +
    //                     'src="' + _data.user_path + '" width="16" height="16" />' +
    //                     _data.nick_name + '</a>' +
    //                     '<div class="hkw-work-bar fn-right">' +
    //                     '<div class="hkw-work-bar-item">' +
    //                     '<span class="hkw-eye-icon">' +
    //                     '</span>' +
    //                     _data.hits +
    //                     '</div>' +
    //                     '<div class="hkw-work-bar-item">' +
    //                     '<span class="hkw-comment-icon">' +
    //                     '</span>' +
    //                     _data.comment_count +
    //                     '</div>' +
    //                     '<div class="hkw-work-bar-item">' +
    //                     '<span class="hkw-collection-icon">' +
    //                     '</span>' +
    //                     _data.love_count +
    //                     '</div>' +
    //                     '</div>' +
    //                     '</div>';
    //                 $('#work_list_near_content').append($(_li));
    //             }
    //         }
    //     });
    // };
    var add_love_function = function() {
        $.ajax({
            url: urlLocalhost + newhuakwang + "add_love",
            type: "post",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                id: $('#main-body').attr('name'),
                user_id: _cookie_id,
                model: "news"
            }
        }).done(function(data) {
            console.log("点赞公用接口");
            console.log(data);
            if (data.success) {
                if (data.message.type == "add") {
                    addLook_List(data.message);
                }
            } else {
                if (data.field == "login" && data.message == "会话已失效，请重新登录") {
                    // $.cookie('id', null, { path: '/', expires: -1 });
                    $.cookie("lng", null, { path: '/', expires: -1 });
                    $.cookie("lat", null, { path: '/', expires: -1 });
                    //设置头像，昵称和手机号
                    // setCookie("avatar",data.data.path_thumb);
                    $.cookie("nick_name", null, { path: '/', expires: -1 });
                    // setCookie("mobile",data.data.mobile);
                    // 设置环信id到cookie里
                    $.cookie("hxid", null, { path: '/', expires: -1 });
                    alert('登录失效');
                }
            }
        })
    };
    // var add_favorite_function = function () {
    //     $.ajax({
    //         url: urlLocalhost + newhuakwang + "add_favorite",
    //         type: "post",
    //         dataType: "json",
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         crossDomain: true,
    //         data: {
    //             id: $('#main-body').attr('name'),
    //             user_id: _cookie_id,
    //             type: "works"
    //         }
    //     }).done(function (data) {
    //         // console.log("点赞公用接口");
    //         // console.log(data);
    //         if (data.success) {
    //             if (data.message.type == "add") {
    //                 // addLook_List(data.message);
    //             }
    //         } else {
    //             if (data.field == "login" && data.message == "会话已失效，请重新登录") {
    //                 $.cookie('id', null, { path: '/', expires: -1 });
    //                 $.cookie("lng", null, { path: '/', expires: -1 });
    //                 $.cookie("lat", null, { path: '/', expires: -1 });
    //                 //设置头像，昵称和手机号
    //                 // setCookie("avatar",data.data.path_thumb);
    //                 $.cookie("nick_name", null, { path: '/', expires: -1 });
    //                 // setCookie("mobile",data.data.mobile);
    //                 // 设置环信id到cookie里
    //                 $.cookie("hxid", null, { path: '/', expires: -1 });
    //                 alert('登录失效');
    //             }
    //         }
    //     })
    // };

    var addLook_List = function(data) {
        var _kindTimes = $('.ulslidetb:first').attr('name');
        if (_kindTimes != "one") {
            $('.ulslidetb:first').attr('name', "one");
            $('.ulslidetb:first').append(' <li>' +
                '<img class="img-1" src="' + data.path + '" alt="' + data.nick_name + '"/>' +
                '</li>');
        };
    };

    // var userSelf_works_other_show = function (_uid, _wid) {
    //     //hkapi/get_works_list_by_user_id/$user_id/$max_id/$since_id/$per_page/$page
    //     $.ajax({
    //         url: urlLocalhost + newhuakwang + "get_works_list_by_user_id/" + _uid + "/10/1/10/1",
    //         type: "post",
    //         dataType: "json",
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         crossDomain: true,
    //         data: ""
    //     }).done(function (data) {
    //         console.log("获取某用户空间更多作品列表");
    //         console.log(data);
    //         if (data.success) {
    //             var _w_l_l = data.data.item_list;
    //             if (_w_l_l.length == 1 && _w_l_l[0].id == _wid) {
    //                 $('.userSelf_otherWorks:first').css('display', 'none');
    //             } else {
    //                 if (_w_l_l.length < 5) {
    //                     var _user_other_work_listLf_html1 = '';
    //                     for (var _wll1 = 0; _wll1 < _w_l_l.length; _wll1++) {
    //                         var _otherwork1 = _w_l_l[_wll1];
    //                         if (_otherwork1.id == _wid) {

    //                         } else {
    //                             _user_other_work_listLf_html1 += '<div value="' + _otherwork1.id + '" class="works_expamle">' +
    //                                 '<div class="we_contern">' +
    //                                 '<a href="introduction.html?id=' + _otherwork1.id + '" class="we_contern">' +
    //                                 '<img src="' + _otherwork1.path + '"/>' +
    //                                 '</a>' +
    //                                 '</div>' +
    //                                 '<p>' + _otherwork1.title + '</p>' +
    //                                 '</div>';
    //                         }
    //                     }
    //                     $('.user_other_work_list:first').html(_user_other_work_listLf_html1);
    //                 } else {
    //                     var _user_other_work_listLf_html0 = '';
    //                     for (var _wll0 = 0; _wll0 < 4; _wll0++) {
    //                         var _otherwork0 = _w_l_l[_wll0];
    //                         if (_otherwork0.id == _wid) {
    //                             _otherwork0 = _w_l_l[4];
    //                             _user_other_work_listLf_html0 += '<div value="' + _otherwork0.id + '" class="works_expamle">' +
    //                                 '<div class="we_contern">' +
    //                                 '<a href="introduction.html?id=' + _otherwork0.id + '" class="we_contern">' +
    //                                 '<img src="' + _otherwork0.path + '"/>' +
    //                                 '</a>' +
    //                                 '</div>' +
    //                                 '<p>' + _otherwork0.title + '</p>' +
    //                                 '</div>';
    //                         } else {
    //                             _user_other_work_listLf_html0 += '<div value="' + _otherwork0.id + '" class="works_expamle">' +
    //                                 '<div class="we_contern">' +
    //                                 '<a href="introduction.html?id=' + _otherwork0.id + '" class="we_contern">' +
    //                                 '<img src="' + _otherwork0.path + '"/>' +
    //                                 '</a>' +
    //                                 '</div>' +
    //                                 '<p>' + _otherwork0.title + '</p>' +
    //                                 '</div>';
    //                         }
    //                     }
    //                     $('.user_other_work_list:first').html(_user_other_work_listLf_html0);
    //                 }
    //             }

    //         }
    //     })
    // }
});