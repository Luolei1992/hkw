/**
 * Created by admin on 2017/8/28.
 */
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
var parmId = getLocationParam("id"),
    uid;
(function() {
    var sort = "add_time",
        kind = "all",
        keywords = "all",
        lng = 0,
        lat = 0,
        num = 9,
        n = 1,
        totalPage, flag = true;

    function designXhr(designer) {
        // 遍历设计师
        var totalDesigner = '';
        var itemWrap = $(".ca-item-wrap");
        for (var k = 0; k < designer.length; k++) {
            if (designer[k].user_info.length == 0) {
                $("#error_Designerlist_user_like").css("display", "block");
                return false;
            } else {
                var _experience = parseInt(designer[k].user_info.experience);
                if (isNaN(_experience)) {
                    _experience = 0;
                }
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
                };
                var _path_thumb = designer[k].user_info.path_thumb;
                totalDesigner += '<div class="ca-item ca-item-select ca-item-' + k + '" id="' + k + '" style=""><div class="ca-item-main"><div class="ca-item-photo"><a href="detailed.html?id=' + designer[k].user_info.id + '" target=_blank><img alt="' + (designer[k].user_info.alt ? designer[k].user_info.alt : "") + '" src="' + _path_thumb + '"/></a></div><h3 class="niCheng">' + designer[k].user_info.nick_name + (designer[k].user_info.sex == '男' ? '<img class="sex_img_s" src="images/sex1.png">' : (designer[k].user_info.sex == '女') ? '<img class="sex_img_s" src="images/sex2.png">' : "") + '</h3><p>' + (designer[k].user_info.jobs[0] ? designer[k].user_info.jobs[0] : "设计师") + '<span class="shugang">|</span>' + _experience_text + '<span class="shugang">|</span>' + designer[k].user_info.works_count + '件作品 <br><span class="imgGZ1"></span><i class="text">' + designer[k].user_info.hits_count + '</i><span class="imgGZ2"></span><i class="text">' + designer[k].user_info.love_count + '</i><span class="imgGZ3"></span><i class="text">' + designer[k].user_info.guestbook_count + '</i></p><div class="ca-info"><div class="ca-star">' + getStart(designer[k].user_info.credit_val) + '</div><div class="ca-location"><span class="ca-location-icon"></span> ' + get_adress(designer[k].user_info) + '</div></div><div class="ca-main"><div class="ca-inntro">' + goodSkills(designer[k].user_info.keywords) + '</div><div class="ca-list ca-list--thumb"><ul class="clearfix" style="height:352px;overflow: hidden;">' + proPics(designer[k].user_info.userPageItemList) + '</ul></div></div><div class="ca-mian-detailed fn-hide"><div class="ca-mian-detailed-bottom fn-clear"><a href="Personal-x.html?talk_hxid=' + designer[k].user_info.hxid + '" target="_blank"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-blue"></i>对话</div></a>' + (getCookie("user_id") ? '<a href="appointment.html?id=' + designer[k].user_info.id + '" target=_blank><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-red"></i>约见</div></a>' : '<a href="javascript:;" onclick="javascript:go_login();"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-red"></i>约见</div></a>') + (getCookie("user_id") ? '<a href="detailed.html?id=' + designer[k].user_info.id + '&tag=3" target=_blank><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-orange"></i>下单</div></a>' : '<a href="javascript:;" onclick="javascript:go_login();"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-orange"></i>下单</div></a>') + '</div></div></div></div>';
            }
            if (totalDesigner == "") {
                itemWrap.html('<p style="text-align: center;font-size:14px;color:red;">未找到相关设计师！</p>');
            } else {
                itemWrap.html(totalDesigner);
            };
            desigerLB();
        }
    };

    function pagePapers(totalPage, page) {
        var pageNo = page;
        //生成分页
        kkpager.generPageHtml({
            pno: pageNo,
            pagerid: "kkpagers",
            //总页码
            total: totalPage,
            //总数据条数
            mode: 'click', //默认值是link，可选link或者click
            click: function(n) {
                //手动选中按钮
                this.selectPage(n);
                project_user_designXhr(uid, n);
                return false;
            }
        }, true);
    }

    function project_user_designXhr(uid, n) {
        // hkapi/get_my_love_list/$type/$max_id/$since_id/$per_page/$page+data:{user_id:user_id}
        $.ajax({
            url: urlLocalhost + newhuakwang + "/get_user_love_list/user/0/0/9/" + n + "/" + uid,
            type: "post",
            dataType: "json",
            data: {
                user_id: getCookie('user_id')
            }
        }).done(function(data) {
            console.log("获取我喜欢的设计师");
            console.log(data);
            var _item_list = data.data.item_list,
                _length = _item_list.length,
                totalPage = data.data.total_pages;
            if (_length == 0) {
                $('#error_Designerlist_user_like').siblings().css('display', 'none');
                $('#error_Designerlist_user_like').css('display', 'block');
            } else {
                designXhr(_item_list);
                if (totalPage > 1) {
                    pagePapers(totalPage, n);
                };
            }
        });
    };
    $('#loveDesignerList').on('click', function() {
        uid = $(".img_1").attr("data-id");
        project_user_designXhr(uid, 1);
    });

    function desigerLB() {
        $('.ca-item').hover(function() {
            $(this).children('.ca-item-main').css({
                'border': '1px solid #0096ff'
            });
            $(this).children('.ca-item-main').find('.ca-item-photo img').css({
                'border': '1px solid #0096ff'
            });
            $(this).find('.fn-hide').finish().slideDown(200);
        }, function() {
            $(this).children('.ca-item-main').css({
                'border': '1px solid #c9c9c9'
            });
            $(this).children('.ca-item-main').find('.ca-item-photo img').css({
                'border': '1px solid #fff'
            });
            $(this).find('.fn-hide').finish().slideUp(200);
        });
        $(".hkw-btn_round .fn-clear").children().eq(0).css("border-color", "black");
        $(".hkw-btn_round .fn-clear").children().eq(0).css("color", "black");

        $(".hkw-btn_round .fn-clear li").mouseenter(function() {
            $(this).each(function() {
                $(this).css("border-color", "black").siblings().css("border-color", "#D3D8DC");
                $(this).hover().css("color", "black").siblings().css("color", "#D3D8DC");
            })
        });
    }
    //五角星评分展示   [num = designer[k].credit_val]
    function getStart(num) {
        var strTotal = '',
            strSolid = '',
            strEmpty = '',
            strHalf = '',
            arr = [];
        if (num < 5) {
            arr = num.split(".");
            // 实心数
            for (var i = 0; i < arr[0]; i++) {
                strSolid += '<span class="ca-heart-icon"></span>';
            };
            // 空心数
            if (arr[1] == 0) { //小数点后面为0，没有半颗星
                for (var j = 0; j < 5 - arr[0]; j++) {
                    strEmpty += '<span class="ca-heart-icon emptyStart"></span>';
                }
            } else { //小数点后面部位0，有半颗星
                strHalf = '<span class="ca-heart-icon halfStart"></span>';
                for (var j = 0; j < 4 - arr[0]; j++) {
                    strEmpty += '<span class="ca-heart-icon emptyStart"></span>';
                }
            };
            strTotal = '信誉度:&nbsp;&nbsp;' + strSolid + strHalf + strEmpty + '&nbsp;' + num;
            return strTotal;
        } else {
            // 实心数
            for (var i = 0; i < 5; i++) {
                strSolid += '<span class="ca-heart-icon"></span>';
            };
            strTotal = '信誉度:&nbsp;&nbsp;' + strSolid + '&nbsp;&nbsp;' + num;
            return strTotal;
        };
    };
    //擅长技能[numSkill = designer[k].keywords]
    function goodSkills(numSkill) {
        var str = '';
        for (var i = 0; i < numSkill.length; i++) {
            if (numSkill[i] == "") {

            } else {
                str += '<a href="designer.html?p=' + numSkill[i] + '"><span class="sp1-bk ">' + numSkill[i] + '</span></a>';
            }
        }
        return str;
    };
    //图片展示[pics = designer[k]]
    function proPics(pics) {
        var pic = '';
        if (!pics) {
            return false;
        } else {
            for (var i = 0; i < 6; i++) {
                if (pics[i] != undefined) {
                    pic += '<li class="thumb h150"><a href="introduction.html?id=' + pics[i].id + '" target="_blank"><img title="' + (pics[i].title ? pics[i].title : "") + '" alt="' + (pics[i].alt ? pics[i].alt : "") + '" src="' + (pics[i].path.indexOf("upaiyun") != -1 ? pics[i].path + '!160x115' : pics[i].path) + '"/></a></li>';
                };
            };
            return pic;
        };
    };
    //获取地址[address = designer[k]]
    function get_adress(address) {
        var long = (address.distance - 0) / 1000;
        if (!address.distance || long > 20 || long == 0) {
            if (!address.txt_address || address.txt_address == 0 || address.txt_address == null || address.txt_address == "" || address.txt_address == "未知") {
                return "地址：[未知]";
            } else {
                return '地址：' + address.txt_address;
            }
        } else {
            return '距离：' + long.toFixed(2) + 'km';
        }

    }
    //设计师页

})();