/**
 * Created by admin on 2017/8/28.
 */
var urlLocalhost = "https://www.huakewang.com/";
var newhuakwang = "hkw_newapi/";
(function() {
    var _cookie_id = $.cookie('user_id');

    var designer_id = _cookie_id;
    $.ajax({
        url: urlLocalhost + newhuakwang + "do_vote",
        type: "post",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: { user_id: designer_id, id: 0, add: 0 }
    }).done(function(data) {
        if (data.success) {
            if (data.data.is_voted == 1) {
                //    vote_count
                $('.header .header-container .intro-left:first ul:first li:eq(2) p:first').html(data.data.vote_count);
            } else {
                $('.header .header-container .intro-left:first ul:first li:eq(2) p:first').html(data.data.vote_count);
            }
        } else {}
    });
    $.ajax({
        url: urlLocalhost + newhuakwang + "get_user_info/" + designer_id,
        type: "post",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: { user_id: _cookie_id }
    }).done(function(data) {
        if (data.success) {
            $("title").html(data.data.title);
            $("meta[name=keywords]").attr("content", data.data.keyword);
            $("meta[name=description]").attr("content", data.data.content);
            designer_data_show(data.data);
        }
    });

    function designer_data_show(d) {
        $('#img-touxiang').attr('src', d.path);
        $('#p-img p.name').html(d.nick_name);
        $('#p-img p.text').html(d.signature);

        var _txt_address = d.txt_address;
        var _experience = parseInt(d.experience);
        var _experience_text = '';
        if (_experience < 1) {
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
        }
        for (var cl = 0; cl < _customLabels.length; cl++) {
            _keywors_list_spans += '<span class="sp1-bk">' + _customLabels[cl] + '</span>'
        }
        $('#intro-more p.intro-tag.clearfix:first').html(_keywors_list_spans);

        $('.header-container:first .intro-left:first ul li:eq(0) p:eq(0)').html(d.guestbook_data.guestbook_list.length);

        $('.header-container:first .intro-left:first ul li:eq(1) p:eq(0)').html(d.love_count);

        //投票数++由另外的函数控制

        $('.header-container:first .intro-left:last ul li:eq(0) p:eq(0)').html(d.works_count);
        //meet_count
        $('.header-container:first .intro-left:last ul li:eq(1) p:eq(0)').html(d.vistor_count);
        $('.header-container:first .intro-left:last ul li:eq(2) p:eq(0)').html(d.credit_val);

        $('#designer_content_fiveBox ul.tab:eq(0) li:eq(1)').html('案例展示(' + d.works_count + ')');
        //有偿服务的接口
        // $('#designer_content_fiveBox ul.tab:eq(0) li:eq(2)').html('有偿服务(' + 1111 + ')');

        worksList_show_firstAndsecond(d.works_data.works_list);
        init_ulwl(d.id);
        project_user_designXhr(d.id);
        var _data = { comment_list: d.guestbook_data.guestbook_list };
        //    根据设计师的相关数据影响的各个点击事件
        $('#designer_content_fiveBox ul.tab:eq(0) li:eq(0)').on('click', function() {
            $('.op-nice').css('display', 'none');
        });
        //0-9的随机数
        function getRandom() {
            var num = Math.floor(Math.random() * 10);
            return num;
        };
        var _vistor = d.vistor_list;
        var _vistor_li = '';
        for (var v = 0; v < _vistor.length; v++) {
            _vistor_li += '<li><img class="img-1" src="' + (_vistor[v].path_thumb ? _vistor[v].path_thumb : "images/headImg" + getRandom() + ".png") + '" title="' + _vistor[v].nick_name + '" alt="' + _vistor[v].nick_name + '"  /></li>'
        }
        $('#vistor_ul_list').html(_vistor_li);
        $('#vistor_ul_list').siblings('div').find('p').html('历史访问：' + d.vistor_count + '&nbsp;&nbsp;今日：' + d.today_vistor_count);

        if (d.is_auth == 1) {} else {
            //$('#error_auth_designer_buy_sever').css('display','block');
            //$('#error_auth_designer_buy_sever').siblings().css('display','none');
        }

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
                    '<div class="caption" style="bottom:0px">' +
                    '<h4 style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' +
                    _data.title +
                    '<a href="#" class="sc">' +
                    '收藏' +
                    '</a>' +
                    '</h4>' +
                    '<p style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' + _data.content + '</p>' +
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
        }

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
            }
            setTimeout(function() {
                $('.pblUl_works:first li').css('visibility', 'visible')
            }, 4000)
        }

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
                    '<p style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">' + _data.content + '</p>' +
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

    $('#tousu_html_goto').attr('href', 'tousu.html?id=' + designer_id);
    $('#tousu_html_goto').on('click', function(event) {
        event.stopPropagation();
    });
    $('#lahei_designer_change').on('click', function(event) {
        event.stopPropagation();
        alert("是否要拉黑该设计师");
    });
})();