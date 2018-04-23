/**
 * Created by admin on 2017/8/28.
 */
var urlLocalhost = "https://www.huakewang.com/";
var newhuakwang = "hkw_newapi/";

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
}
(function() {
    var designer_id = getLocationParam("id");
    var _cookie_id = $.cookie('user_id');
    if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
        _cookie_id = 0;
    } else {}

    $.ajax({
        url: urlLocalhost + newhuakwang + "do_vote",
        type: "post",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            user_id: designer_id,
            id: _cookie_id,
            add: 0
        }
    }).done(function(data) {
        if (data.success) {
            if (data.data.is_voted == 1) {
                $('#voteIcon').css({
                    "cursor": 'initial',
                    "color": '#555',
                    "pointer-events": "none"
                });
                $('#voteIcon').html("已投票");
                //    vote_count
                $('#voteIcon').parent().children('p:eq(0)').html(data.data.vote_count);
            } else {
                $('#voteIcon').parent().find('p:eq(0)').html(data.data.vote_count);
                user_login_do_vote();
            };
        } else {

        }
    });

    $("#followIcon").click(function() {
        if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
            go_login();
        } else {
            $.ajax({
                url: urlLocalhost + newhuakwang + "add_favorite",
                type: "post",
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: { id: designer_id, user_id: _cookie_id, type: "user" }
            }).done(function(data) {
                if (data.success) {
                    if (data.message.type == "add") {
                        // alertUploadMsg('关注成功！再次点击可取消关注');
                        $("#followIcon").attr('value', 1);
                        $("#followIcon").css('color', '#555');
                        $("#followIcon").html('已关注');
                        var d_love_count = parseInt($('.header-container:first .intro-left:first ul li:eq(1) p:eq(0)').html());
                        $('.header-container:first .intro-left:first ul li:eq(1) p:eq(0)').html(d_love_count + 1);
                    } else {
                        $("#followIcon").attr('value', 0);
                        $("#followIcon").css('color', '#fff');
                        $("#followIcon").html('关注');
                        var d_love_count = parseInt($('.header-container:first .intro-left:first ul li:eq(1) p:eq(0)').html());
                        $('.header-container:first .intro-left:first ul li:eq(1) p:eq(0)').html(d_love_count - 1);
                    }
                } else {

                }
            })
        }
    });
    var personUrl = '';
    if(window.location.href.indexOf("MyDetailed.htm") != -1) {
        personUrl = "get_self_info/"
    }else{
        personUrl = "get_user_info/"
    }
    $.ajax({
        url: urlLocalhost + newhuakwang + personUrl + designer_id,
        type: "post",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            user_id: _cookie_id
        }
    }).done(function(data) {
        console.log("个人信息");
        console.log(data);
        if (data.success) {
            $("title").html(data.data.title);
            $("meta[name=keywords]").attr("content", data.data.keywords);
            $("meta[name=description]").attr("content", data.data.content);
            designer_data_show(data.data);
            $(".img_1").attr("data-id", data.data.id);
        };
    });

    function designer_data_show(d) {
        //判断是否拉黑，显示相应的内容
        if (d.is_black_TA) {
            $("#lahei_designer_change").html("取消拉黑");
        }
        d.path ? $('#img-touxiang').attr('src', d.path) : "";
        d.nick_name ? $('#p-img p.name').html(d.nick_name) : "";
        d.signature ? $('#p-img p.text').html(d.signature) : "";

        var _txt_address = d.txt_address ? d.txt_address : "";
        var _experience = parseInt(d.experience);
        var _experience_text = '';
        if (isNaN(_experience)) {
            _experience_text = d.experience ? d.experience : "";
        } else if (_experience < 1) {
            _experience_text = '1年以下'
        } else if (_experience < 3) {
            _experience_text = '1-3年'

        } else if (_experience < 5) {
            _experience_text = '3-5年'

        } else if (_experience < 10) {
            _experience_text = '5-10年'

        } else {
            _experience_text = '10年以上'
        }
        var _min_text = (d.sex == "未知" ? "" : d.sex) + "/" + _experience_text + "/" + _txt_address;
        $('#p-img p.min-text').html(_min_text);
        var _keywors_list = d.keywords;
        var _customLabels = (d.customLabels || "").split(";").filter(function(x) {
            return x != ""
        });
        var _keywors_list_spans = '';
        for (var kl = 0; kl < _keywors_list.length; kl++) {
            _keywors_list_spans += '<span class="sp1-bk">' + _keywors_list[kl] + '</span>'
        };
        for (var cl = 0; cl < _customLabels.length; cl++) {
            _keywors_list_spans += '<span class="sp1-bk">' + _customLabels[cl] + '</span>'
        };
        $('#intro-more p.intro-tag.clearfix:first').html(_keywors_list_spans);

        $('.header-container:first .intro-left:first ul li:eq(0) p:eq(0)').html(d.guestbook_data.guestbook_list.length);

        $('.header-container:first .intro-left:first ul li:eq(1) p:eq(0)').html(d.favorite_count);
        if (d.is_favorite == 1) {
            $("#followIcon").attr('value', 1);
            $("#followIcon").css('color', '#555');
            $("#followIcon").html('已关注');
        };
        //投票数++由另外的函数控制
        $('.header-container:first .intro-left:last ul li:eq(0) p:eq(0)').html(d.works_count);
        //meet_count
        $('.header-container:first .intro-left:last ul li:eq(1) p:eq(0)').html(d.vistor_count);
        $('.header-container:first .intro-left:last ul li:eq(2) p:eq(0)').html(d.credit_val);
        $('#designer_content_fiveBox ul.tab:eq(0) li:eq(1)').html('案例展示(' + d.works_count + ')');
        //有偿服务的接口
        // $('#designer_content_fiveBox ul.tab:eq(0) li:eq(3)').html('我的服务');

        // worksList_show_firstAndsecond(d.works_data.works_list);

        //新增的内容显示
        $(".one-word-introduce").html(d.signature_bbs); //一句话介绍

        //添加认证的标志，有设计师认证，实名认证，手机认证
        d.real_name_status == "2" ? $(".intro-more .real-name-status").addClass("status") : "";
        d.is_auth == "1" ? $(".intro-more .auth-status").addClass("status") : "";
        !isNaN(d.username) ? $(".intro-more .phone-status").addClass("status") : "";

        //背景图片
        d.background_path ? $(".header").css("background-image", "url(" + d.background_path + ")") : $(".header").css("background-image", "url(./images/Personal_homepage_big_background.png)");

        //显示服务下单个人信息
        d.path_thumb ? $(".pay-person .left").attr("src", d.path_thumb) : "";
        d.nick_name ? $(".pay-person-right .name").html(d.nick_name) : "";
        d.sex ? $(".pay-person-right .sex").html(d.sex) : "";
        d.experience ? $(".pay-person-right .experience").html(d.experience + "经验") : "";
        d.works_count ? $(".pay-person-right .works").html(d.works_count + "件作品") : "";
        d.txt_address ? $(".pay-person-right .addr").html(d.txt_address) : "";

        // init_ulwl(d.id);
        // project_user_designXhr(d.id);
        // var _data={comment_list:d.guestbook_data.guestbook_list};
        // pinglunBox("introudoction_pinglunBox",_data,"project");

        // 根据设计师的相关数据影响的各个点击事件
        $('#followIcon').attr('value', d.id);
        $('#voteIcon').attr('value', d.id);
        var _href_designer = [
            (getCookie("user_id") ? '<a id="huanxin_id" data-hxid="' + (d.hxid ? d.hxid : '0')+'" href="' + (d.hxid ? 'Personal-x.html?talk_hxid=' + d.hxid : "javascript:;") + '" target="_blank">对话</a>' : '<a href="javascript:;" onclick="go_login()">对话</a>'),
            (getCookie("user_id") ? '<a href="appointment.html?id=' + d.id + '" target="_blank">约见</a>' : '<a href="javascript:;" onclick="go_login()">约见</a>'),
            (getCookie("user_id") ? '<a href="publish.html?uid=' + d.id + '" target="_blank">发需求</a>' : '<a href="javascript:;" onclick="go_login()">发需求</a>'),
            'tousu.html?id=' + d.id,
            'javascript:;'
        ];
        if (window.location.href.indexOf("MyDetailed.html") != -1) {
            $('.header-container:first .intro-left:last ul li:eq(0) p:eq(2)').html(_href_designer[0]);
            $('.header-container:first .intro-left:last ul li:eq(1) p:eq(2) a').attr("href", _href_designer[4]);
            $('.header-container:first .intro-left:last ul li:eq(2) p:eq(2) a').attr("href", _href_designer[4]);
        } else {
            $('.header-container:first .intro-left:last ul li:eq(0) p:eq(2)').html(_href_designer[0]);
            $('.header-container:first .intro-left:last ul li:eq(1) p:eq(2)').html(_href_designer[1]);
            $('.header-container:first .intro-left:last ul li:eq(2) p:eq(2)').html(_href_designer[2]);
        };
        if($("#huanxin_id").attr("href") == "javascript:;") {
            $("#huanxin_id").css({
                "cursor":"default",
                "background-color":"#767474",
                "color":"#c5c5c5",
                "-webkit-border-radius": "3px",
                "-moz-border-radius": "3px",
                "border-radius": "3px"
            });
        };

        $('#tousu_lahei_img_hover cur').off('click', function() {
            // $('.op-nice').css('display','none');
        });

        //0-9的随机数
        function getRandom() {
            var num = Math.floor(Math.random() * 10);
            return num;
        };
        var _vistor = d.vistor_list;
        var _vistor_li = '';
        for (var v = 0; v < _vistor.length; v++) {
            _vistor_li += '<li><a href="detailed.html?id='+_vistor[v].user_id_from+'"><img class="img-1" src="' + (_vistor[v].path_thumb ? _vistor[v].path_thumb : "images/selec.png") + '" title="' + _vistor[v].nick_name + '" alt="' + _vistor[v].nick_name + '"  /></a></li>'
        }
        $('#vistor_ul_list').html(_vistor_li);
        $('#vistor_ul_list').siblings('div').find('p').html('历史访问: ' + d.vistor_count + '&nbsp;&nbsp;今日: ' + d.today_vistor_count);
    };

    function user_login_do_vote() {
        $("#voteIcon").on('click', function() {
            var _html = $(this).html();
            if (_html != "已投票") {
                $.ajax({
                    url: urlLocalhost + newhuakwang + "do_vote",
                    type: "post",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    data: { user_id: designer_id, id: _cookie_id, add: 1 }
                }).done(function(data) {
                    if (data.success) {
                        if (data.data.is_voted == 1) {
                            $('#voteIcon').css({
                                "cursor": 'initial',
                                "color": '#555',
                                "pointer-events": "none"
                            });
                            $('#voteIcon').html("已投票");
                            //    vote_count
                            $('#voteIcon').parent().find('p:eq(0)').html(data.data.vote_count);
                        } else {
                            alertUploadMsg("网络不稳定请重试！")
                        }
                    }

                });
            } else {
                alertUploadMsg('您已经投过票了！')
            }
        });
    }

    function worksList_show_firstAndsecond(worksData) {
        designer_works_show_second(worksData);
        var firesWorksData = [];
        for (var w = 0; w < worksData.length; w++) {
            if (worksData[w].is_home_page == 1) {
                firesWorksData.push(worksData[w])
            }
        }
        designer_works_show_first(firesWorksData)
    }

    function designer_works_show_first(worksData) {
        if (worksData.length > 0) {
            for (var n = 0; n < worksData.length; n++) {
                var _data = worksData[n];
                var _li = document.createElement('li');
                _li.className = "grid-item";
                _li.style.cssText = "display:inline-block;float:left;background:#fff;background-color: #fff;margin: 2px 11px 10px 1px; padding: 9px 15px 12px 0;position: relative;width: 260px;";
                var _imagepath = _data.path;
                if (_imagepath.indexOf("http") < 0) {
                    _imagepath = "https://www.huakewang.com/" + _imagepath;
                }
                var _user_path = _data.user_path;
                if (_user_path.indexOf("http") < 0) {
                    _user_path = "https://www.huakewang.com/" + _user_path;
                }
                var _path = "introduction.html?" + _data.id;
                _li.innerHTML = '<div class="iInspir-block"></div>' +
                    '<div class="hkw-work-img thumb-a h_a">' +
                    '<a href="' + _path + '" target=_blank><img class="delay maxImgWidth"   src="' + _imagepath + '"  style="" alt="' + _data.keywords + '"  /></a>' +
                    '<div class="caption">' +
                    '<h4 style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' +
                    _data.title +
                    '<a href="#" class="sc">' +
                    '收藏' +
                    '</a>' +
                    '</h4>' +
                    '<p style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="hkw-work-bottom">' +
                    '<a href="detailed.html?id=' + _data.uid + '" target=_blank><img ' +
                    'src="' + _user_path + '" width="16" height="16" />' +
                    _data.nick_name + '</a>' +
                    '<div class="hkw-work-bar fn-right">' +
                    '<div class="hkw-work-bar-item">' +
                    '<span class="hkw-eye-icon">' +
                    '</span>' +
                    _data.hits +
                    '</div>' +
                    '<div class="hkw-work-bar-item">' +
                    '<span class="hkw-comment-icon">' +
                    '</span>' +
                    _data.comment_count +
                    '</div>' +
                    '<div class="hkw-work-bar-item">' +
                    '<span class="hkw-collection-icon">' +
                    '</span>' +
                    _data.love_count +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('#designer_content_fiveBox div.wrap-list:eq(0) ul:first').append($(_li));
            }
        } else {
            $('#error_workslist_showout_designer').css('display', 'block');
            $('#error_workslist_showout_designer').siblings().css('display', 'none');
        }
    }

    function designer_works_show_second(worksData) {
        console.log(1111111111);
        console.log(worksData);
        $('#designer_content_fiveBox ul.tab:eq(0) li:eq(1)').on('click', function() {
            $workListMasonry_designer.masonry({
                itemSelector: '.grid-item',
                columnWidth: 100
            });
        });

        if (worksData.length == 0) {
            $('#error_workslist_designer').siblings().css('display', 'none');
            $('#error_workslist_designer').css('display', 'block');
        } else {
            //将作品loading
            setTimeout(function() {
                $('#work_list_loadingImage_ds').css('display', 'none');
                $('#work_list_content_ds').css('visibility', 'visible');
            }, 3000);
            workListAddMoreContentFunction(worksData);
        };

        function workListAddMoreContentFunction(itemsData) {
            var _items = [
                masornyNewLi(itemsData[0]), masornyNewLi(itemsData[1]),
                masornyNewLi(itemsData[2]), masornyNewLi(itemsData[3]),
                masornyNewLi(itemsData[4]), masornyNewLi(itemsData[5]),
                masornyNewLi(itemsData[6]), masornyNewLi(itemsData[7]),
                masornyNewLi(itemsData[8]), masornyNewLi(itemsData[9]),
                masornyNewLi(itemsData[10]), masornyNewLi(itemsData[11]),
                masornyNewLi(itemsData[12]), masornyNewLi(itemsData[13]),
                masornyNewLi(itemsData[14]), masornyNewLi(itemsData[15]),
                masornyNewLi(itemsData[16]), masornyNewLi(itemsData[17]),
                masornyNewLi(itemsData[18]), masornyNewLi(itemsData[19]),
                masornyNewLi(itemsData[20]), masornyNewLi(itemsData[21]),
                masornyNewLi(itemsData[22]), masornyNewLi(itemsData[23]),
                masornyNewLi(itemsData[24]), masornyNewLi(itemsData[25]),
                masornyNewLi(itemsData[26]), masornyNewLi(itemsData[27]),
                masornyNewLi(itemsData[28]), masornyNewLi(itemsData[29])
            ];
            var $items = $(_items);
            $workListMasonry_designer.append($items).masonry('appended', $items);
            for (var i = 0; i < 10; i++) {
                setTimeout(function() {
                    $workListMasonry_designer.masonry({
                        itemSelector: '.grid-item',
                        columnWidth: 100
                    });
                }, 1000 + i * 1000)
            };
            setTimeout(function() {
                $('.pblUl_works:first li').css('visibility', 'visible')
            }, 2000);
        };

        function masornyNewLi(data) {
            if (data != undefined) {
                var _data = data;
                var _li = document.createElement('li');
                _li.className = "grid-item";
                _li.style.display = _data.display || "block";
                _li.style.visibility = 'hidden';
                var _imagepath = _data.path;
                if (_imagepath.indexOf("http") < 0) {
                    _imagepath = "https://www.huakewang.com/" + _imagepath;
                }
                var _user_path = data.user_path;
                if (_user_path.indexOf("http") < 0) {
                    _user_path = "https://www.huakewang.com/" + _user_path;
                }
                var _path = "introduction.html?" + _data.id;
                _li.innerHTML = '<div class="iInspir-block"></div>' +
                    '<div class="hkw-work-img thumb-a h_a">' +
                    '<a href="' + _path + '" target=_blank><img class="delay maxImgWidth"   src="' + _imagepath + '"  style="" alt="' + _data.keywords + '"  /></a>' +
                    '<div class="caption">' +
                    '<h4 style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' +
                    _data.title +
                    '<a href="#" class="sc">' +
                    '收藏' +
                    '</a>' +
                    '</h4>' +
                    '<p style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="hkw-work-bottom">' +
                    '<a href="detailed.html?id=' + _data.uid + '" target=_blank><img ' +
                    'src="' + _user_path + '" width="16" height="16" />' +
                    _data.nick_name + '</a>' +
                    '<div class="hkw-work-bar fn-right">' +
                    '<div class="hkw-work-bar-item">' +
                    '<span class="hkw-eye-icon">' +
                    '</span>' +
                    _data.hits +
                    '</div>' +
                    '<div class="hkw-work-bar-item">' +
                    '<span class="hkw-comment-icon">' +
                    '</span>' +
                    _data.comment_count +
                    '</div>' +
                    '<div class="hkw-work-bar-item">' +
                    '<span class="hkw-collection-icon">' +
                    '</span>' +
                    _data.love_count +
                    '</div>' +
                    '</div>' +
                    '</div>';
                return _li
            } else {
                //如果没有更多作品了则-隐藏“添加更多”-显示“没有更多”
                $('#workListAddMoreContent_designer').css('display', 'none');
                $('#workListNoMoreContent_designer').css('display', 'block');
            }
        };
    }

    // $('#tousu_html_goto').attr('href','tousu.html?id='+designer_id);
    $('#tousu_html_goto').on('click', function(event) {
        event.stopPropagation();
        if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
            go_login();
            return;
        }
        layerOpenReport();
    });
    $('#lahei_designer_change').on('click', function(event) {
        event.stopPropagation();
        if (_cookie_id == undefined || _cookie_id == "null" || _cookie_id == null || _cookie_id == "undefined" || _cookie_id == "") {
            go_login();
            return;
        }
        var id = $('#img-touxiang').attr('data-id');
        var $dom = $(this);
        if ($dom.html() == "拉黑") {
            layerAlertAddBlack(id, $dom); //弹窗提示是否拉黑
        } else {
            deleteBlack(id, $dom); //取消拉黑
        }
    });
    /**
     * 添加黑名单
     * 
     * @author ZhengGuoQing
     * @param {any} id 
     * @param {any} $dom 
     */
    function addBlack(id, $dom){
        if (window.ajaxAddBlack != null) {
            window.ajaxAddBlack.abort();
        }
        window.ajaxAddBlack = $.ajax({
            url: CONFIG.getUrl() + CONFIG.getPath() + 'add_user_black',
            type: 'POST',
            dataType: 'JSON',
            data: {
                user_id: getCookie("user_id"),
                to_user_id: id
            }
        })
        .done(function (res) {
            if (res.success) {
                $dom.html("取消拉黑");
                var hxid = $("#huanxin_id").attr("data-hxid");
                addToBlackList(hxid); //环信拉黑某用户
            }
            layer.msg(res.message,{time:1000});
        })
        .fail(function (err) {
            console.log(err);
        });
    }

    /**
    * 取消黑名单
    * 
    * @author ZhengGuoQing
    * @param {any} id 
    * @param {any} $dom 
    */
    function deleteBlack(id, $dom) {
        if (window.ajaxDeleteBlack != null) {
            window.ajaxDeleteBlack.abort();
        }
        window.ajaxDeleteBlack = $.ajax({
            url: CONFIG.getUrl() + CONFIG.getPath() + 'delete_user_black',
            type: 'POST',
            dataType: 'JSON',
            data: {
                user_id: getCookie("user_id"),
                to_user_id: id
            }
        })
        .done(function (res) {
            if (res.success) {
                $dom.html("拉黑");
                var hxid = $("#huanxin_id").attr("data-hxid");
                removeFromBlackList(hxid); //将某用户移出环信黑名单
            }
            layer.msg(res.message, { time: 1000 });
        })
        .fail(function (err) {
            console.log(err);
        });
    }

    /**
     * 弹窗提示是否拉黑某个设计师
     * 
     * @author ZhengGuoQing
     */
    function layerAlertAddBlack(id, $dom){
        layer.alert("屏蔽此用户后你将不会收到TA发送给你的私信、留言，TA也无法评论/回复你的创作，TA将从粉丝列表自动移除并且不能再次关注你。", {
            title: "确定拉黑此用户？",
            btn: ['确定', '取消']
        }, function (index, layero) {
            addBlack(id, $dom);//拉黑
            layer.close(index);
        }, function (index, layero) {
            layer.close(index);
        });
    }

    function layerOpenReport(){
        layer.open({
            title: '请输入投诉内容',
            type: 1,
            content: $("#userReportPouup"),
            btn: ["确认投诉", "取消"],
            yes: function (index, layero) {
                var id = $('#img-touxiang').attr('data-id');
                var text = $("#userReportTextarea").val();
                if (text.length > 0) {
                    ajaxReportPouup(id, text);
                    layer.close(index);
                } else {
                    layer.msg("投诉内容不能为空！", { time: 1000 });
                }
            },
            btn2: function (index, layero) {
                layer.close(index);
            }
        });
    }
    function ajaxReportPouup(id, text){
        $.ajax({
            url: CONFIG.getUrl() + CONFIG.getPath() + 'user_report',
            type: 'POST',
            dataType: 'JSON',
            data: {
                user_id: getCookie("user_id"),
                user_id_to:id,
                content: text
            }
        })
        .done(function (res) {
            if (res.success) {
                
            }
            layer.msg(res.message, { time: 1000 });
        })
        .fail(function (err) {
            console.log(err);
        });
    }

    /**
     * 将某个用户拉黑，得先判断是否成功连接环信，之前还得登陆
     * 
     * @author ZhengGuoQing
     * @param {any} hxid  环信id,不需要是好友关系
     */
    function addToBlackList(hxid){
        function HuanXinAddToBlackList (){
            Demo.customBlacklist[hxid] = { jid: "gin86803103#gin_" + hxid + "@easemob.com", name: hxid };
            Demo.conn.addToBlackList({
                list: Demo.customBlacklist,
                type: 'jid',
                success: function () {
                    console.log('Add friend to black list success');
                },
                error: function () {
                    console.log('Add friend to black list error');
                }
            });
        }
        var count = 0;
        var timer = setInterval(function () {
            count++;
            if (window.Demo.ConnectionSuccess) {
                clearInterval(timer);
                HuanXinAddToBlackList();
            } else if (count > 7) {
                clearInterval(timer);
            } else if (count < 2) {
                DEMOinit(); //重新登录环信
            }
        }, 300);
    }

    /**
     * 将某个用户移出黑名单，得先判断是否成功连接环信，之前还得登陆
     * 
     * @author ZhengGuoQing
     * @param {any} hxid  环信id,不需要是好友关系
     */
    function removeFromBlackList(hxid) {
        function HuanXinRemoveFromBlackList () {
            delete Demo.customBlacklist[hxid];
            Demo.conn.removeFromBlackList({
                list: Demo.customBlacklist,
                type: 'jid',
                success: function () {
                    console.log('Remove from black list success.');
                },
                error: function () {
                    console.log('Remove from black list error.');
                }
            });    
        }
        var count = 0;
        var timer = setInterval(function () {
            count++;
            if (window.Demo.ConnectionSuccess) {
                clearInterval(timer);
                HuanXinRemoveFromBlackList();
            } else if (count > 7) {
                clearInterval(timer);
            } else if (count < 2) {
                DEMOinit(); //重新登录环信
            }
        }, 300);
    }
})();
