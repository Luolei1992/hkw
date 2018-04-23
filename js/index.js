var hkglb = {};
// init global parameter
var baseLink = 'https://www.huakewang.com/',
    baseRim = 'hkw_newapi/',
    baseURL = baseLink + baseRim;

!(function () {
    function initWindow() {
        hkglb.win = {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        };
    };
    initWindow();
    $(window).on('resize', function () {
        initWindow();
    });
})();
$(document).on('ready', function () {
    var target = $('.Ojs-work-scroll-wrp');
    var search = $('#Ojs-search-workResult');
    if (target.length && !target.data('scroll')) {
        target.data('scroll', true);
        hkglb.works.init({
            type: 'work',
            Works: {
                load_arr: works_arr,
                url: work_url
            }
        });
    }
    if (search.length && !target.data('search')) {
        target.data('search', true);
        hkglb.works.init({
            type: 'search',
            Obj: {
                ul: $('.css-search-wrp'),
                loadbox: $('.Ojs-loading-box'),
                loading: $('.Ojs-pic-loading')
            },
            Works: {
                load_arr: works,
                url: "https://www.huakewang.com/search/get_works/" + keyword + '/'
            }
        });
    }
});

//搜索
$(document).on('ready', function () {
    var search = $('#Ojs-search-waterfall');
    if (!search.length || search.data('loading')) return;
    search.data('loading', true);
    console.count('search run:');
    if (!works.length) noworks();
    var json = works,
        imgsrcs = getsrc(json, 'path'),
        loadbg = $('#Ojs-pic-loading');
    var p = {
        getdata: false,
        nm: 0,
        waite: 100,
        img_waier: 100,
        imagewkey: "value",
        row: 4,
        getallwidth: false,
        workapdidthnm: 0,
        appendpic: false,
        designer: false
    };
    var wp = {
        minH: 0,
        minI: 0
    };
    var ds = {
        obj: {
            target: $('.searchResult-navtxt')
        },
        show_nm: 9,
        start_nm: 0,
        end_nm: 0,
        all_nm: 0,
        nomore: false,
        isloading: false,
        toload: false
    };
    var designs = users;
    ds.all_nm = designs.length;
    var ip = math();
    var post = [];
    p.nm = imgsrcs.length;
});


var cur_status = "less"; //文本收起展开效果
$.extend({
    show_more_init: function () {
        var anchor = $('.ptext + div'),
            p = anchor.find('p'),
            txt = p.text(),
            div = anchor.find('div'),
            con, c = false;
        if (p.attr('data-write')) return;
        p.attr('data-write', true);

        div.length && divtrim();
        sub();
        more();
        last();

        function sub() {
            txt = txt.length > 230 ? (function () {
                txt = txt.substring(0, 230) + '...';
                return txt
            })() : txt;
            con = txt;
        }

        function more() {
            if (con === 'undefined') return;
            con.length >= 60 ? (function () {
                con = con.substring(0, 60);
                $('span.zhankai').html('...展开');
            })() : $('span.zhankai').html('');
            $('span.zhankai').click(function () {
                if (c = !c) {
                    p.html(txt);
                    $('span.zhankai').html('合起');
                } else {
                    p.html(con)
                    $('span.zhankai').html('...展开');
                }
            });
        }

        function divtrim() {
            var divs = div.find('div');
            txt = divs.map(function (index, el) {
                return $(el).text();
            });
            txt = txt.get().join('<br>');
            div.remove();
        }

        function last() {
            p.html(con);
            anchor.css('display', 'block');
        }

        $('div.p-i>.img_1').mouseenter(function () {
            $('div.intro-details').fadeIn();
        });
        $('div.intro-details').mouseleave(function () {
            $('div.intro-details').fadeOut();
        })

        function movetur() {
            var idx = 0,
                lt = $('.p-arrowleft'),
                rt = $('.p-arrowright'),
                ul = $('.p-c'),
                lis = ul.find('.p-i'),
                blis = $('.p-menu li');
            lis.w = parseFloat(lis.css('width'));
            lis.len = blis.length;
            if (lis.len == 0) return;
            ul.css('left', 0);
            rt.click(function (event) {
                idx++;
                if (idx == lis.len) {
                    idx = 0
                }
                ;
                ul.css('left', -idx * lis.w + 'px');
                blis.removeClass('cur');
                blis.eq(idx).addClass('cur');
            });
            lt.click(function (event) {
                idx--;
                if (idx < 0) {
                    idx = lis.len - 1
                }
                ;
                ul.css('left', -idx * lis.w + 'px');
                blis.removeClass('cur');
                blis.eq(idx).addClass('cur');
            });
        }

        $('.p-menu').length && $('.p-c').length && movetur();
    }
});
//************瀑布流开始************//
function delay() {
    if ($('div.wrap-list').length == 4) {
        if ($('div.wrap-list').eq(1).css('display') == 'block') {
            $('div.wrap-list').eq(1).find('li.ljz').each(function () {
                var LiHeg = parseInt($(this).css('top')) + $(this).parent().offset().top;
                if (LiHeg < $(window).height() + $(window).scrollTop()) {
                    $(this).removeClass('ljz');
                } else {
                    false;
                }
            });
        }
        if ($('div.wrap-list').eq(3).css('display') == 'block') {
            $('div.wrap-list').eq(3).find('li.ljz').each(function () {
                var LiHeg = parseInt($(this).css('top')) + $(this).parent().offset().top;
                if (LiHeg < $(window).height() + $(window).scrollTop()) {
                    $(this).removeClass('ljz');
                } else {
                    false;
                }
            });
        } else {
            false;
        }
    } else {
        $('ul.pblUl>li.ljz').each(function () {
            var LiHeg = parseInt($(this).css('top')) + $('ul.pblUl').offset().top;
            if (LiHeg < $(window).height() + $(window).scrollTop()) {
                $(this).finish().animate({
                    'opacity': '1'
                }, 500);
                $(this).removeClass('ljz');
            } else {
                false;
            }
        });
    }
}

function waterfall(parent, li) {
    var $aLi = $('ul.pblUl>li'); //获取li
    var LiW = $('ul.pblUl>li').eq(0).width() + 27; //获取li的宽度
    // $('ul.pblUl').css({
    // 	'width': LiW * 4
    // });
    var LiHArr = []; //用于存储 没列中所有块相加的高度

    $('ul.pblUl').each(function () {
        $(this).children('li').each(function (index, value) {
            var LiH = $(this).parent().children('li').eq(index).height();
            if (index < 4) {
                LiHArr[index] = LiH;
            } else {
                var minH = Math.min.apply(null, LiHArr);
                var minHIndex = $.inArray(minH, LiHArr);
                $(value).finish().css({
                    'position': 'absolute',
                    'top': minH + 35,
                    'left': $(this).parent().children('li').eq(minHIndex).position().left
                });
                //数组 最小高元素的高 + 添加上的aLi[i]块框高
                LiHArr[minHIndex] += $(this).parent().children('li').eq(index).height() + 35;
                var maxH = Math.max.apply(null, LiHArr);
                var maxHIndex = $.inArray(maxH, LiHArr);
                $(this).parent().finish().css({
                    'height': maxH,
                    'margin-bottom': '80px'
                });
            }
        });
    });
}
//************瀑布流开始************//
$(function () {
    if ($('body').data('run')) return
    $('body').data('run', 1)
    $('.hkw-work-list li').hover(function () { //热爱设计到狂热边框显示
        //	$(this).children('.iInspir-block').finish().fadeIn(100).animate({'opacity':'1'},500);
        $(this).find('div.caption').finish().slideDown(100);
        $(this).children('.iInspir-block').css({
            'border': '1px solid #03a5ee'
        });
    }, function () {
        //	$(this).children('.iInspir-block').finish().fadeOut(100).animate({'opacity':'0'});
        $(this).find('div.caption').finish().slideUp(100);
        $(this).children('.iInspir-block').css({
            'border': '1px solid transparent'
        });
    });
    
    /**轮播开始**/
        var isRun = true;
        var liImgLength = $('#flexslider ul.slides li').length;
        var num = '<ul id="num">';
        for (var i = 1; i <= liImgLength; i++) {
            num += '<li>' + i + '</li>';
        }
        num += '</ul>';
        $('#flexslider ul.slides').after(num);
        showSlide(0);
    
        function showSlide(n) {
            if (n == $('#num li').index($('#num li.current'))) {
                return null;
            }
            $('#flexslider ul.slides li')
                .finish()
                .fadeOut(500)
                .filter(':visible')
                .css({
                    'display': 'none'
                })
                .end()
                .eq(n)
                .fadeIn(500)
                .css({
                    'display': 'block'
                });
            $('#num li')
                .filter('.current')
                .removeClass('current')
                .end()
                .eq(n)
                .addClass('current');
        }
        $('#num li').on('mouseenter.trigger', function () {
            showSlide($('#num li').index(this));
        });
        $('#flexslider span.flexslider-right').on('click', function () {
            if ($('#num li.current').next().length == 0) {
                $('#num li').eq(0).triggerHandler('mouseenter.trigger');
            } else {
                $('#num li.current').next().triggerHandler('mouseenter.trigger');
            }
        });
        $('#flexslider span.flexslider-left').on('click', function () {
            if ($('#num li.current').prev().length == 0) {
                $('#num li').eq($('#num li').index($('#num li').length)).triggerHandler('mouseenter.trigger');
            } else {
                $('#num li.current').prev().triggerHandler('mouseenter.trigger');
            }
        });
        $('span.flexslider-left,span.flexslider-right,#flexslider ul.slides,#num li').hover(function () {
            isRun = false;
        }, function () {
            if($("#flexslider .slides li").length > 1) {
                isRun = true;
            }
        });
        setInterval(function () {
            if (isRun) {
                if ($('#num li.current').next().length == 0) {
                    $('#num li').eq(0).triggerHandler('mouseenter.trigger');
                } else {
                    $('#num li.current').next().triggerHandler('mouseenter.trigger');
                }
            }
        }, 5000);
    
    //banner部份
    if(window.location.href == 'https://www.huakewang.com/' || window.location.href == 'http://www.huakewang.com/'){
        $.ajax({
            url:baseURL+"get_ad/1",
            type:"get",
            dataType:"json",
            success:function (res) {
                if(res.success){
                    if(res.data.length){
                        var strs = '';
                        for(var i = 0;i < res.data.length;i++) {
                            strs += '<li><a href="'+(res.data[i].url?res.data[i].url:"javascript:;")+'"><img src="'+res.data[i].path+'" alt="'+res.data[i].ad_text+'"></a></li>';
                        };
                        $("#flexslider .slides").html(strs);
                        if($("#flexslider .slides li").length < 2) {
                            isRun = false;
                            $(".flexslider-left").css("display","none");
                            $(".flexslider-right").css("display","none");
                        }else{
                            isRun = true;
                        };
                        $(window).resize(function() {
                            var Widthsize = $("#flexslider .slides li").height();
                            $("#flexslider").css("height",Widthsize+'px');
                        });
                    };
                }else{
                    console.log(res.message);
                };
            }
        });
    }
    
    /**轮播结束**/
    /**切换城市**/
    $('.change-city').click(function (e) {
        e.stopPropagation();
        $(this).parent().children('ul.drop-select-options').addClass("cur");
        $(".cityInput .drop-select-options").removeClass("cur");
        $(".zjjl .huoqv").css("display","none")
    });
    $(document).click(function (e) {
        e.stopPropagation();
        $(".huoqv").removeClass("cur");
    })
    /**切换城市结束**/
    /**切换最近距离开始**/
    $('.change-select').click(function (event) {
        event.stopPropagation();
        $('ul.drop-select-options').removeClass('cur');
        $(this).parent().children('ul.drop-select-options').toggle();
    });
    $(document).click(function (e) {
        e.stopPropagation();
        $(".zjjl .huoqv").css("display","none");
    })
    $('.zjjl-select .drop-select-options.huoqv li').click(function () {
        var cityText = $(this).children('a').text();
        $(this).parents('.city-bar').find('.zjjl-show').text(cityText);
        $(this).parents('ul.drop-select-options').toggle();
    });

   /*---------------*/
    $('div.li-Div').click(function (e) {
        e.stopPropagation();
        $(this).siblings('div.divXl').slideToggle(100);
        $('.divXl').find('li').click(function (event) {
            $(this).parents('.divXl').prev().children('.text').text($(this).text())
        });
    });
    $('div.cityWrap ul.cityWrapUl li div.divXl ul.divXlUl li').click(function () {
        $(this).parents('div.divXl').slideToggle(100);
        var thisText = $(this).text()
        $(this).parents('li').children('div.li-Div').children('span.text').text(thisText);
    });


    var caseB = $('ul.drop-select-options.fn-hide.dz.payment');
    var caseIp = $('#sousuo');
    var caseLis = caseB.children('li');
    caseLis.on('click', function () {
        var val1 = $(this).children('p').text();
        caseIp.val(val1);
        caseB.removeClass('cur');
        return false;
    });


    $('div.paymentMainDiv div.sjsxx input.sousuo ').click(function () {
        $(this).parent().children('ul.drop-select-options.fn-hide.dz.payment').addClass('cur');
        return false;
    });
    $('div.paymentMainDiv div.xl ').click(function () {
        $(this).parent().children('ul.drop-select-options.fn-hide.dz.payment').toggleClass('cur');
        return false;
    });
    $('div.paymentMainDiv div.sjsxx input.sousuo ').keyup(function () {
        $(this).parent().children('ul.drop-select-options.fn-hide.dz.payment').removeClass('cur');
    });
    /**切换最近距离结束**/

    $('body .fn-hide div.designer-zx div.designer-zx-left span.zxImg').click(function () { //收藏切换
        $(this).toggleClass('cur');
        $(this).parents('.ca-item-main').find('.shoucang').toggleClass('cur');
    });
    $('.shoucang').click(function () { //收藏切换
        $(this).toggleClass('cur');
    });
    /**弹出评论框开始**/
    $('.Tbodymodules .textWrap .divText .inputWrap .input_2').on('click', function () {
        $(this).parents('.divText').find('div.huifu').css({
            'display': 'block'
        });
    });
    $(' div.div-right img.img2').on('click', function () {
        $(this).parents(' div.right').find('div.huifu').css({
            'display': 'block'
        });
    });
    $('div.huifu div.fabiao').on('click', function () {
        $(this).parents(' div.right').find('div.huifu').css({
            'display': 'none'
        });
    });
    $('div.huifu div.fabiao').on('click', function () {
        $(this).parents('div.huifu ').css({
            'display': 'none'
        });
    });
    $('div.huifu div.fabiao').on('click', function () {
        $(this).parents(' div.wenzhang').find('div.huifu').css({
            'display': 'none'
        });
    });
    /****/
    $('#social-main-body-left div.yh-modules div.right div.div-bottom .div-bottom-right .div-bottom-right-div1 .div-img-a .img2').on('click', function () {
        $(this).parents('.div-bottom-right').find('div.hd').css({
            'display': 'block'
        });
    });
    $('#social-main-body-left div.yh-modules div.right div.div-bottom .div-bottom-right div.hd .tijiao').on('click', function () {
        $(this).parents('.div-bottom-right').find('div.hd').css({
            'display': 'none'
        });
    });
    /****/
    /**弹出评论框结束**/

    /**点赞效果**/
    $('.Tbodymodules .textWrap .divText .inputWrap .input_1').click(function () {
        $(this).toggleClass('cur');
    });
    /**点赞效果**/
    /**点击button触发input.file**/
    $('input.button').click(function () {
        $('input.file').click();
    });
    /**点击button触发input.file**/
    /**hover添加crud图标**/
    $('ul.xhnr.yinying').hover(function () {
        $(this).toggleClass('cur');
        $(this).append('<div class="cruds"><span class="crud c"></span><span class="crud r"></span><span class="crud u"></span><span class="crud d"></span></div>');
    }, function () {
        $(this).toggleClass('cur');
    });
    /**hover添加crud图标**/
    
    /**点击div.sjsinput显示下拉框**/
    $('div.sjsinput').on('click', function () {
        $(this).children('ul.xlUl').toggleClass('cur');
        $('#rzform div.rows div.sjsinput span.spbk .remove').click(function () {
            var spbk = $(this).parent().text();
            $(this).parents('div.sjsinput').children('ul.xlUl').append('<li class="append">' + spbk + '</li>');
            $(this).parent().remove();
        });
    });
    /**点击div.sjsinput显示下拉框**/
    /**点击div.sjsinput 下的li,添加职业**/
    $('#rzform div.rows div.inputWrapper ul.xlUl li').on('click', function () {
        if ($(this).parents('div.sjsinput').find(' div.sjsinput-left span').text() == '请选择') {
            $(this).parents('div.sjsinput').find(' div.sjsinput-left span').remove();
        }
        var thisText = $(this).text();
        $("#rzform div.rows div.sjsinput").children('div.sjsinput-left').append('<span class="spbk">' + thisText + '<i class="remove"></i></span>');
        $(this).remove();
    });
    /**点击div.sjsinput 下的li,添加职业**/

    /**social.html最近、与我有关切换**/
    $('#social-main-body-left div.div-control span.div-control-sp1').on('click', function () {
        $('div.zuijin').css({
            'display': 'block'
        });
        $('div.yuwoxiangguan').css({
            'display': 'none'
        });
        $(this).css({
            'border-bottom': '2px solid #ff9023',
            'height': '41px'
        });
        $('#social-main-body-left div.div-control span.div-control-sp2').css({
            'border-bottom': 'none',
            'height': '42px'
        });
    });
    $('#social-main-body-left div.div-control span.div-control-sp2 ').on('click', function () {
        $('div.yuwoxiangguan').css({
            'display': 'block'
        });
        $('div.zuijin').css({
            'display': 'none'
        });
        $(this).css({
            'border-bottom': '2px solid #ff9023',
            'height': '41px'
        });
        $('#social-main-body-left div.div-control span.div-control-sp1').css({
            'border-bottom': 'none',
            'height': '42px'
        });
    });
    /**social.html最近、与我有关切换**/
    /**social.html点赞切换页面开始**/
    $('#social-main-body-left div.yh-modules div.right div.div_hf div.div-right span.dianzan').click(function () {
        $(this).toggleClass('cur');
    });
    $('#social-main-body-left div.yh-modules div.right div.div-bottom .div-bottom-right .div-bottom-right-div1 .div-img-a span.dianzan').click(function () {
        $(this).toggleClass('cur');
    });
    /**social.html点赞切换页面结束**/
    /**news-more.html点赞切换**/
    $('#main-body div.dianzanImg').on('click', function () {
        $(this).toggleClass('cur');
    });
    /**news-more.html点赞切换**/
    /**弹出更多**/
    $('#towheaderWrap div.divWrap ul li.li_7 ').on('click', function () {
        $('#towheaderWrap ul.gengduode').toggle();
    });
    /**弹出更多**/
    /**ProjectDetails.html图片放大显示**/
    $('#main-body.ProjectDetails div.divImgList ul.ulImgList li').on('click', function () {
        var liSrc = $(this).find('img').attr('src');
        $('#main-body.ProjectDetails div.imgWraptp').css({
            'display': 'block'
        });
        $('#main-body.ProjectDetails div.imgWraptp img').attr('src', liSrc);
    });
    $('#main-body.ProjectDetails div.imgWraptp img').on('click', function () {
        $(this).parent().css({
            'display': 'none'
        });
    });
    /**ProjectDetails.html图片放大显示**/
    /*************瀑布流开始************/

    $('.maxImgWidth').width(260);
    $(window).on('load', function () {
        delay();
        waterfall('pblUl', 'li');
    });
    $(window).on('scroll resize', delay);
    /*************瀑布流截图************/
    /*************projectExtend.html二级页面导航切换************/
    $(document).on("click","div.ExtendNav ul.ExtendNavLeft li",function () {
        $('div.ExtendNav ul.ExtendNavLeft li').removeClass('cur');
        $(this).toggleClass('cur');
        var liIndex = $('div.ExtendNav ul.ExtendNavLeft li').index($(this));
        $('div.ExtendMain').css({
            'display': 'none'
        });
        $('div.ExtendMain:eq(' + liIndex + ')').css({
            'display': 'block'
        });
    });
    /*************projectExtend.html二级页面导航切换************/
    /**projectExtend.html图片放大显示**/
    $(document).on("click","div.imagesWrap img",function (e) {
        e.stopPropagation();
        $(this).parent().css({
            'display': 'none'
        });
    });
    $(document).on("click",'div.textWrapChildernR img',function () {
        var thisSrc = $(this).attr('src');
        $(this).parent().siblings('div.imagesWrap').css({
            'display': 'block'
        });
        $(this).parent().siblings('div.imagesWrap').children('img').attr({
            'src': thisSrc
        });
    });
    /**projectExtend.html图片放大显示**/
    /**ul.切换cur**/
    $('ul.bjfkw li').click(function () {
        $(this).parent().children('ul.bjfkw li').removeClass('cur');
        $(this).addClass('cur');
    });
    /**ul.切换cur**/
    $('span.zhaikaixl').click(function () {
        $(this).parents('div.kfkbMainDiv').children('div.ExtendMainBodyWrap').slideToggle(100);

        if ($(this).children('b').text() == '展开') {
            $(this).children('b').text('收起');
        } else {
            $(this).children('b').text('展开');
        }
    });
    $('ul.syg li').click(function () {
        $('ul.syg li').removeClass('cur');
        $(this).addClass('cur');
        $('div.kfkbMain').css({
            'display': 'none'
        });
        var index = $('ul.syg li').index($(this));
        $('div.kfkbMain').eq(index).css({
            'display': 'block'
        });
    });

    //搜索结果选择
    function searchSelect() {
        var uls = $('#seachResult-nav a');
        var lis = $('.searchResult');
        for (var i = 0; i < uls.length; i++) {
            uls[i].index = i;
            uls[i].onclick = function () {
                for (var i = 0; i < uls.length; i++) {
                    uls[i].style.color = 'black';
                    $(uls[i]).parent().find(".txt").css("color","black");
                }
                this.style.color = 'red';
                $(this).parent().find(".txt").css("color","red");
                for (var j = 0; j < lis.length; j++) {
                    lis[j].style.display = 'none';
                }
                lis[this.index].style.display = 'block';
            }
        };
    }
    window.onload = searchSelect;
});

function srueConfirm() {
    $("body").on("click",".xmDelate",function () {
        $(this).parent().find(".confirms").remove();
        //动态生成确定弹窗
        $(this).parent().append('<div class="BtnCtc" style="display: block;height: 128px;padding-top: 20px;"><p>确认删除该条信息?</p><button class="BtnCtcC">取消</button><button class="BtnCtcS">确认</button> </div>');
        var can = $(this).parent().find(".BtnCtcC");
        var sur = $(this).parent().find(".BtnCtcS");
        can.click(function () {
            can.parent().remove();
        });
        sur.click(function () {
            sur.parent().parent().remove();
        });
    });
}

/*
 parend 父级id
 pin 元素id
 */
function _waterfall(parent, pin) {
    var warpH = $(parent)
    var $aPin = $(pin);
    var iPinW = $aPin.eq(0).width(); // 一个块框pin的宽
    var num = Math.floor($(window).width() / iPinW); //每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    //oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

    var pinHArr = []; //用于存储 每列中的所有块框相加的高度。

    $aPin.each(function (index, value) {
        var pinH = $aPin.eq(index).height();
        if (index < 4) {
            pinHArr[index] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        } else {
            var minH = Math.min.apply(null, pinHArr); //数组pinHArr中的最小值minH
            var minHIndex = $.inArray(minH, pinHArr);
            $(value).css({
                'position': 'absolute',
                'top': minH + 35,
                'left': $aPin.eq(minHIndex).position().left
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex] += $aPin.eq(index).height() + 35; //更新添加了块框后的列高
            var maxH = Math.max.apply(null, pinHArr);
            warpH.css('height', maxH + 50);
        }
    });
}

$(window).on('load', function () {
    new _waterfall('#searchResult-works', "#searchResult-works>li")
    if ($('#js-work-waterfall').length != 0) {
        var cl = $('#js-work-waterfall');
        cl.click(function (event) {
            $('.pblUl img').on('load', function () {
                new _waterfall('.pblUl', '.pblUl>li');
            });
        });
    }
});


//下拉菜单
(function ($, window, undefine) {
    function DropDown(el) {
        this.dd = el;
        this.placeholder = this.dd.children('div').children('span');
        this.placeholder2 = $('#inputP');
        this.opts = this.dd.find('ul.dropdown > li');
        this.opts2 = this.dd.find('#dropdownP>li');
        this.val = '';
        this.index = -1;
        this.initEvents();
    }

    DropDown.prototype = {
        initEvents: function () {
            var obj = this;
            obj.dd.on('click', function (event) {
                $(this).toggleClass('active');
                return false;
            });
            obj.opts.on('click', function () {
                var opt = $(this);
                obj.val = opt.text();
                obj.index = opt.index();
                obj.placeholder.text(obj.val);
                obj.dd.children().addClass('border')
            });
            obj.opts2.on('click', function () {
                var opt = $(this);
                obj.val2 = opt.text();
                obj.index = opt.index();
                obj.placeholder2.val(obj.val2);
                obj.dd.children().addClass('border')
            });
        },
        getValue: function () {
            return this.val;
        },
        getIndex: function () {
            return this.index;
        }
    }

    var dd = new DropDown($('#dd'));
    var dd = new DropDown($('#dd2'));
    var dd = new DropDown($('#dd3'));

    $(document).click(function () {
        // all dropdowns
        $('.wrapper-dropdown-3').removeClass('active');
    });
    $(document).click(function () {
        $('div.li-Div').siblings('div.divXl').slideUp(100);
    });
})(jQuery, window);


// activity
    $(function () {
        if (!$('.js-publish-video').length) return;
        var vidipt = $('.js-ipt-web'),
            allwrp = $('.js-publish-videow');
        $('.js-publish-video').on('click', function(e) {
            if (!vidipt.val()) {
                foo.alert('请输入视频的网址!');
                return;
            } else if (!/https:\/\/v\.youku\.com\/v_show/gi.test(vidipt.val())) {
                foo.alert('请输入正确的优酷网站地址');
                return;
            }
        
            var web = $('.js-vide .web').map(function(idx, el) {
                return ($(el).text() && /https:\/\/v\.youku\.com\/v_show\/id_(.+).html/gi.exec($(el).text())[1] || false);
            });
            if (web.length) {
                for (var i = 0; i < web.length; i++) {
                    var reg = new RegExp(web[i], 'i');
                    if (reg.test(vidipt.val())) {
                        foo.alert('该视频已导入');
                        return;
                    };
                };
            };
            allwrp.append($('<div class="js-vide"><i style="display: inline-block;color: #ff7e02;position:relative;left:-5px;top: -5px;overflow: visible;height:auto;" class="icon-play iconfont11 icon-bofang" title="点击播放"> </i><span class="web" title="'+vidipt.val()+'">' + vidipt.val() + '</span><span class="fl-rt"><span class="info" style="position:relative;top: -4px;">视频已导入！</span><i style="display: inline-block;color: #CCCCCC;position:relative;left:15px;top: -5px;overflow: visible;height:auto;" class="icon-close iconfont11 icon-guanbi1" title="取消"></i></span></div>'));
        
            vmove('.icon-close', '.js-vide');
            $('.icon-play').off().click( function(e) {
                var srcval = $(this).parent().find(".web").html();
                var vid = /https:\/\/v\.youku\.com\/v_show\/id_(.+).html/gi.exec(srcval)[1];
                var apd = $('<div class="js-publish-video-u"><div class="js-mask"></div><div class="js-video"><div class="header"><span>视频预览</span><i class="icon-closeB iconfont11 icon-guanbi"></i></div><div class="js-video-main"><embed src="http://player.youku.com/player.php/sid/' + vid + '/v.swf" allowFullScreen="true" quality="high" width="600" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed></div></div></div>');
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
        });
        vmove('.icon-close', '.js-vide');
        function vmove(cls, par) {
            var cls = $(cls);
            if (!cls.length) return
            cls.on('click', function() {
                $(this).parents(par).remove();
            });
        }
    })
!(function ($) {
    if (!$('body').data('response')) {
        $('body').data('response', true);
        try {
            console.info('如果你对该网站的前端建设有好的建议或反馈，请发送邮件到：2284430641@qq.com');
        } catch (e) {
        }
    }
})(jQuery);

// 页面上拉下拉效果 边框高亮显示
$(function () {
    isHxid();
    $(".hkw-link-pub").mouseenter(function () {
        $(this).find(".hkw-work-select").finish().slideDown(200);
    }).mouseleave(function () {
        $(this).find(".hkw-work-select").finish().slideUp(200);
    });
    //作品边框高亮
    $(document).on("mouseenter",".hkw-work-list li",function () {
        $(this).children('.iInspir-block').css({
            'border': '1px solid #03a5ee'
        });
    }).on("mouseleave",".hkw-work-list li",function () {
        $(this).children('.iInspir-block').css({
            'border': '1px solid transparent'
        });
    });
    $(document).on("mouseenter",'.hkw-work-list li.cur .hkw-view-h3',function () {
        $(this).find('div.hkw-view').stop().slideDown(200);
    }).on("mouseleave",'.hkw-work-list li.cur .hkw-view-h3',function () {
        $(this).find('div.hkw-view').stop().slideUp(200);
    });
    $(document).on("mouseenter",'.hkw-work-list li.cur .hkw-work-bottom',function () {
        $(this).find('div.hkw-person').stop().slideDown(200);
    }).on("mouseleave",'.hkw-work-list li.cur .hkw-work-bottom',function () {
        $(this).find('div.hkw-person').stop().slideUp(200);
    });
    //项目边框高亮
    $(document).on('mouseenter','#caProWrap>div',function () {
        $(this).find(".ca-item-main").css({
            'border': '1px solid #03a5ee'
        }).find(".ca-item-photo img").css({
            'border':'1px solid #03a5ee'
        });
        $(this).find(".ca-mian-detailed").stop().slideDown(200);
    }).on('mouseleave','#caProWrap>div',function () {
        $(this).find(".ca-item-main").css({
            'border': '1px solid #c9c9c9'
        }).find(".ca-item-photo img").css({
            'border':'1px solid #fff'
        });
        $(this).find(".ca-mian-detailed").stop().slideUp(200);
    });
    /*****获取input地址栏显示*****/
    $("#suggestId").keydown(function () {
        $('div.tuoSenWrap').css("display","none");
    });
    //导航鼠标滑动上去，显示二级导航
    $(document).on("mouseenter",".headnav4",function () {
        $(this).find(".headnav4_1").css("display","block");
        $(this).parent().find(".new").css("background","url(images/xltpb1.png)");
    });
    $(document).on("mouseleave",".headnav4",function () {
        $(this).find(".headnav4_1").css("display","none");
        $(this).parent().find(".new").css("background","url(images/xltps1.png)");
    });
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
}
//全局函数，不需要页面加载完成就可以执行
//获取当前页面的URL参数
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
if (typeof Array.prototype.map != "function") {
    Array.prototype.map = function (fn, context) {
        var arr = [];
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                arr.push(fn.call(context, this[k], k, this));
            }
        }
        return arr;
    };
};
//去掉字符串中的特殊字符
function spWord(st) {
    var st1 = st.split(/,|;|。|\.|\*|；|\/|:|：|，|\s/);
    var st2 = [];
    st1.map(function(value,index,elem){
        if(value != ""){
            st2.push(value);
        };
    });
    return st2;
};

$(function () {
    function companyAlert() {
        $(document).on("click",".companyLogo .companyPub",function (e) {
            //阻止冒泡
            e.stopPropagation();
            $(".companyShow").each(function () {
                $(this).css("display","none").removeClass("companyClear companyLast");
            });
            $(this).find(".companyShow").css("display","block").addClass("companyClear companyLast");
        });
        $(document).click(function (e) {
            e.stopPropagation();
            $(".companyShow").css("display","none");
        });
    };
    companyAlert();
});
function baiduShow(ele) {
    if(ele.value == ""){
        $("#searchResultPanel").css("display","none");
        $('div.tuoSenWrap').slideDown();
    }else{
        $("#searchResultPanel").css("display","block");
    };
};
//保存常用地址
function saveuseraddress(str) {
    if(str.length > 0) {
        $.ajax({
            url:baseURL+'change_user_coordinate',
            type:'post',
            data:{
                long_lat_address:str,       //详细地址
                long_lat_address_jd:str,   //没有，为空
                set_cur_city:"",    //当前城市，没有了
                is_default:0,
                user_id:getCookie("user_id")
            },
            dataType:'json',
            success:function (data) {
                console.log(data);
            }
        });
    };
};
//图片懒加载
function picsLazyLoad() {
    var scrollElement = window,
        viewH = document.documentElement.clientHeight;
    function lazyload() {
        var nodes = document.querySelectorAll('img[data-original]');
        $.each(nodes, function (idx, item) {
            var rect;
            rect = item.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top < viewH) {
                var img = new Image();
                img.onload = function () {
                    $(item).addClass("moveToFrom").attr("src", img.src);
                    // $(item).animate({"opacity":1},2000);
                };
                img.src = $(item).attr("data-original");
                $(item).attr("data-original", "");
            }
            ;
        });
    };
    lazyload();
    //滚动事件监听兼容到ie8
    function addEvent(event,ev) {
        var ele = event || window.event;
        if(ele.addEventListener){
            ele.addEventListener(ev,throttle(lazyload,300,800));
        }else if(ele.attachEvent){
            ele.attachEvent("on"+ev,throttle(lazyload,300,800));
        };
    };
    addEvent(scrollElement,'scroll');
    function throttle(fun, delay, time) {
        var timeout,
            startTime = new Date();
        return function () {
            var context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timeout);
            if (curTime - startTime >= time) {
                fun.apply(context, args);
                startTime = curTime;
            } else {
                timeout = setTimeout(fun, delay);
            };
        };
    };
};
//选择常用地址
function getuseraddress() {
    $.ajax({
        url:baseURL + "get_user_history_coordinate",
        type:'post',
        async:false,
        data:{
            user_id:getCookie('user_id')
        },
        dataType:"json",
        success:function (res) {
            var str = '';
            $(res.data).each(function (idx, val) {
                str += '<li class="tuosenUlLis tuosenUlLiDels"><i class="dizhiselec"></i><span class="text texts">'+val.long_lat_address_jd+'</span></li>';
            });
            $('.tuoSenWrap').find('.tuosenUlLiDels').remove();
            $('.tuoSenWrapUl').append(str);
        }
    });
    $("#suggestId").focus(function () {
        var $this = $(this);
        if($this.val().length < 1){
            $('div.tuoSenWrap').slideDown();
            // $("#searchResultPanel").slideUp();
        };
    });
    $(document).on("click",".tuoSenWrapUl .tuosenUlLis",function () {
        $("#suggestId").val($(this).find("span").html());
        $(".tuoSenWrap").css("display","none");
    });
    $(document).click(function (e) {
        e.stopPropagation();
        $(".tuoSenWrap").css("display","none");
    });
}
var designer_tree_design = "";
//设计师分类导航栏请求数据
designerKinds();
function designerKinds() {
    $.ajax({
        url:baseURL+"get_designer_tree",
        type:"get",
        dataType:"json",
        success:function (res) {
            if(res.success){
                designerKindsRender(res.data);
                designer_tree_design = res.data;
                if(window.location.href.indexOf("designer.html") != -1) {
                    designer_menus(res.data);
                    if(getLocationParam("n")){
                        renderDesignerTree(res.data,getLocationParam("n"));
                    }
                }
            }
        }
    })
};
function renderDesignerTree(designer_tree,num) {
    for(var i = 0;i < designer_tree.length;i++) {
        //标题
        $("title").html(designer_tree[num].seo_title || "");
        //关键词
        $("meta[name=keywords]").attr("content",designer_tree[num].keyword || "");
        //页面描述
        if(designer_tree[num].content){
            $("meta[name=description]").attr("content",designer_tree[num].content || "");
        }else{
            $("meta[name=description]").attr("content",designer_tree[num].cover_keyword || "");
        };
        //页面功能
        if(designer_tree[num].abstract) {
            $("meta[name=abstract]").attr("content",designer_tree[num].abstract || "");
        };
    }
};
function designer_menus(data) {
    var designer_tree_lis = "";
    for (var i = 0;i < data.length;i++) {
        designer_tree_lis += '<li data-numid="'+i+'"><span class="text"><a href="javascript:void(0);">'+data[i].category_name+'</a></span></li>'
    };
    $(".designer-select-navUl1").append(designer_tree_lis);
    var srcN = getLocationParam("n");      //一级类别
    if(srcN) {
        $(".designer-select-navUl1 li").find("a").removeClass("designColor");
        $(".designer-select-navUl1 li").eq(srcN-0+2).find("a").addClass("designColor");
    };
}
//设计师分类导航数据渲染
function designerKindsRender(datas) {
    var designerKinds = '';
    for (var i = 0;i<datas.length;i++) {
        designerKinds += '<li class="navLogo-select-lis">'+
            '<a href="https://www.huakewang.com/2017_data/designer.html?t='+datas[i].category_name+'&n='+i+'" style="font-weight: 800;font-size: 12px">'+
            '<i><img width="100%" src="'+datas[i].path+'" data-srcFst="'+datas[i].path+'" date-srcSec="'+datas[i].path1+'" alt="'+datas[i].keyword+'"></i>'+datas[i].category_name+
            '</a>'+
            '<p style="color: red;font-size: 12px">'+datas[i].totals+'</p>'+
            '<span></span>'+
            '<div class="navLogo-select-list navLogo-select1 clearfix">'+
            '<div class="navLogo-list-l">'+
            '<ol>'+designerSecondKinds(datas[i].keyword)+
            '</ol>'+
            '</div>'+
            '</div>'+
            '</li>';
    };
    $(".navLogo-select-ul").html(designerKinds);
    $(".navLogo-select-ul li i img").mouseenter(function () {
        var srcSec = $(this).attr("date-srcSec");
        $(this).attr("src",srcSec);
    });
    $(".navLogo-select-ul li i img").mouseleave(function () {
        var srcFst = $(this).attr("data-srcFst");
        $(this).attr("src",srcFst);
    });
    $(".navLogo-select-list li a").click(function() {
        if (!$(this).hasClass("current-style") && ($(".current-style").length < 5)) {
            $(this).addClass("current-style");
        } else {
            $(this).removeClass("current-style");
        };
        if ($(".navLogo-select-list li a").hasClass("current-style")) {
            $(".makesure").css("background-color", "#03A5EE");
            $(".makesure").click(function() {
                var str = '';
                $(".current-style").each(function(idx) {
                    if (idx < $(".current-style").length - 1) {
                        str += $(this).html() + '、';
                    } else {
                        str += $(this).html();
                    };
                });
                window.location.href = ("https://www.huakewang.com/2017_data/designer.html?p=" + str);
            })
        } else {
            $(".makesure").css("background-color", "#E8E8E8");
        };
    });
    if ($(".navLogo-select .navLogo-select-t ul li.navLogo-select-lis").length > 8) {
        $(".navLogo-select").css({
            "overflow-x": "visible",
            "padding-bottom": "5px"
        });
    };
};
//判断是否有环信id，没有的加灰
function isHxid() {
    $(".ca-mian-detailed-bottom").each(function () {
        if($(this).find("a").eq(0).attr("href") == "javascript:;") {
            $(this).find("a").eq(0).addClass("trueOpacity");
        };
    })
}
//二级菜单
function designerSecondKinds(sec) {
    var strSec = '',
        secArr = sec.split(",");
    for(var i = 0;i < secArr.length;i++) {
        strSec += '<li><a href="javascript:;">'+secArr[i]+'</a></li>';
    };
    return strSec;
};
/*
 * 输入类型的限定
 * */
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    obj.value = obj.value.replace(/^\.*$/, '');//开头不能为"."

    if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
        obj.value = parseFloat(obj.value);
    };
};
function clearNoNumInt(obj) {
    obj.value = obj.value.replace(/[^\d]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^0/g, "");//必须保证第一个为数字而不是0
    if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
        obj.value = parseInt(obj.value);
    };
};
var fileTypeSrc = ['images/adoc.png', 'images/ajpg.png', 'images/amp3.png', 'images/amp4.png', 'images/apdf.png', 'images/appt.png', 'images/atxt.png', 'images/aunknown.png', 'images/axls.png', 'images/azip.png'];