/**
 * Created by gs on 2017/2/27 0027.
 */
var hkglb = {};
// init global parameter

!(function () {
    function initWindow() {
        hkglb.win = {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        };
        // hkglb.doc = {
        // 	w: $(document).width(),
        // 	h: $(document).height()
        // };
    }

    initWindow();
    $(window).on('resize', function () {
        initWindow();
    });
})();

function work_scroll() {
    var gbl_work;
    // work-scroll

    function init(config) {
        gbl_work = {
            Works: {
                load_arr: '',
                url: ''
            },
            Obj: {
                wrp: $('.Ojs-work-scroll-wrp'),
                ul: $('.Ojs-work-scroll'),
                loadbox: $('.Ojs-loading-box'),
                loading: $('.Ojs-pic-loading')
            },
            P: {
                max_length: 60,
                loadtm: 100,
                ul_h: 0
            },
            Lis: {
                imgw: 260,
                lismr: 8,
                lismb: 10,
                imgp: 10,
                auth: 29,
                ofw: 288,
                ofh: 65
            },
            temp_arr: [],
            glb_position: [],
            glbarr: [],
            isloading: false,
            nomore: false,
            pages: 1
        }
        $.extend(true, gbl_work, config);
        workapd();
        $(window).on('scroll', function () {
            if (gbl_work.isloading || gbl_work.nomore) return;
            var tmpH = getHeight();
            if (tmpH.allH - tmpH.scrollTop - tmpH.clientH <= 1000) {
                ajax();
            }
        });
    }

    function workapd() {
        var picst = setInterval(function () {
            if (allget(gbl_work.Works.load_arr, 'hasw')) {
                success(), apdlis(gbl_work.Works.load_arr);
            }
            if (!--gbl_work.P.loadtm) {
                failed(), apdlis(gbl_work.Works.load_arr);
            }

            //预设置位置
            init_pos(gbl_work.glbarr, gbl_work.Works.load_arr)

            function success() {
                console.log('success');
                clearInterval(picst);
                load();
                gbl_work.Obj.loading.fadeOut();
            }

            function failed() {
                console.log('fail');
                clearInterval(picst);
                load();
                gbl_work.Obj.loading.fadeOut();
                gbl_work.Works.load_arr.forEach(function (el, idx) {
                    if (el.imgw) {
                        el.hasw = true;
                    } else {
                        console.log('obj' + idx + 'is not loaded');
                    }
                });
            };

            function load() {
                var apd = gbl_work.Works.load_arr;
                if (!apd.length || apd.length < 19) {
                    var info;
                    info = !apd.length ? '<p class="work-loading">没有找到相关作品</p>' : '<p class="work-loading">没有更多了</p>';
                    gbl_work.Obj.loadbox.html(info);
                    gbl_work.nomore = true;
                }
            }
        }, 100)
    }

    function apdlis(json) {
        // if (gbl_work.Obj.ul.data('appended')) return;
        // gbl_work.Obj.ul.data('appended', true);
        // init_pos({json:gbl_work.Works.load_arr},gbl_work.glbarr);
        json.forEach(function (el, idx) {
            if (gbl_work.type === 'search') {
                liapd = $('<li class="waterfall-lis" style="left:' + el.positionL + 'px; top:' + el.positionH + 'px"><div class="img-wrp" style="height:' + el.imgOffseth + 'px"><a class="Ojs-img-link" target="_blank" href="https://www.huakewang.com/./works/detail/' + el.id + '.html"><img class="Ojs-img-href" style="background: url(hkwhtml/images/mixed/logo.png) no-repeat 50% 50%/100%" src="' + el.imgsrc + '" alt="作品' + el.id + '"></a><div class="imgwrp-info"><span class="Ojs-title">' + el.title + '</span><a class="collect" id="favorite_works_id_' + el.id + '" href="javascript:changeFavorite(' + el.id + ');">' + (el.is_favorite ? '已收藏' : '收藏') + '</a><p class="img-dec">' + init_txt(el.abstract) + '</p></div></div><div class="author-mess"><a target="_blank"  href="http://www.huakewang.com/user/home/' + el.user_id + '.html"><img src="' + el.upath + '" alt="作者头像"><span class="author-id">' + el.nick_name + '</span></a><div class="item-wrp"><span class="look"><i class="icon-see"></i>' + el.hits + '</span><span class="talk"><i class="icon-talk"></i>' + el.comment_count + '</span><span class="love"><i class="icon-love"></i>' + el.love_count + '</span></div></div></li>');
            } else {
                liapd = $('<li class="waterfall-lis" style="left:' + el.positionL + 'px; top:' + el.positionH + 'px"><div class="img-wrp" style="height:' + el.imgOffseth + 'px"><a class="Ojs-img-link" target="_blank" href="https://www.huakewang.com/./works/detail/' + el.id + '.html"><img class="Ojs-img-href" style="background: url(hkwhtml/images/mixed/logo.png) no-repeat 50% 50%/100%" src="' + el.imgsrc + '" alt="作品' + el.id + '"></a><div class="imgwrp-info"><span class="Ojs-title">' + el.title + '</span><a class="collect" id="favorite_works_id_' + el.id + '" href="javascript:changeFavorite(' + el.id + ');">' + (el.is_favorite ? '已收藏' : '收藏') + '</a><p class="img-dec">' + init_txt(el.abstract) + '</p></div></div><div class="author-mess"><a target="_blank"  href="http://www.huakewang.com/user/home/' + el.user_id + '.html"><img src="' + el.user_path + '" alt="作者头像"><span class="author-id">' + el.nick_name + '</span></a><div class="item-wrp"><span class="look"><i class="icon-see"></i>' + el.hits + '</span><span class="talk"><i class="icon-talk"></i>' + el.comment_count + '</span><span class="love"><i class="icon-love"></i>' + el.love_count + '</span></div></div></li>');
            }
            if (el['hasw']) {
                gbl_work.Obj.ul.append(liapd)
            }
            ;
            gbl_work.Obj.ul.css('height', gbl_work.P.ul_h + 'px');
        });
    }

    function init_src(path, rep) {
        var src;
        if (!path) {
            src = rep;
        } else {
            if (/http:\/\//.test(path)) {
                src = path;
            } else {
                src = 'https://www.huakewang.com/./' + path;
            }
        }
        return src;
    }

    function init_txt(text) {
        var txt;
        if (typeof text === 'string') {
            // txt = text.replace(/&lt;\w+&gt;/gi,'');
            // txt = txt.replace(/&lt;\/\w+&gt;/gi,'');
            var p = $('<p>').html(text)
            txt = p.text();
        }
        return txt;
    }

    //判断是否成功
    function allget(json, ppt) {
        var len = json.length;
        json.forEach(function (el, idx) {
            if (el[ppt]) {
                --len
            }
        })
        if (!len) {
            return true
        }
    }

    function init_width(el, path) {
        if (el['hasw']) return;
        var src = path || 'path';
        var img = new Image();
        el['imgsrc'] = img.src = init_src(el[src]);
        if (img.width) {
            el['hasw'] = true;
            el['imgw'] = img.naturalWidth;
            el['imgh'] = img.naturalHeight;
            el['offsetW'] = gbl_work.Lis.ofw;
            var imgh = parseInt(el['imgh'] / el['imgw'] * gbl_work.Lis.imgw);
            el['imgOffseth'] = imgh > 800 ? 800 : imgh;
            el['offsetH'] = el['imgOffseth'] + gbl_work.Lis.ofh;
        }
    }

    // 预定义位置
    function init_pos(glbarr, json, config) {
        var o = {
            property: 'hasw', //是否添加
            type: 0,
            arr: [],
            tempH: 0,
            tempI: 0,
            row: 4
        }
        $.extend(true, o, config);
        json.forEach(function (el, idx) {
            init_width(el);
            if (!el[o.property]) {
                // console.log(el['hasw'], el);
                return;
            }
            !o.type ? (idx < o.row ? position1() : position2()) : position2();

            function position1() {
                el.positionL = idx * gbl_work.Lis.ofw;
                el.positionH = 0;
                glbarr[idx] = el.offsetH;
                gbl_work.P.ul_h = Math.max.apply(null, glbarr) + 50;
            }

            function position2() {
                o.tempH = Math.min.apply(null, glbarr);
                o.tempI = $.inArray(o.tempH, glbarr);
                el.positionL = o.tempI * gbl_work.Lis.ofw;
                el.positionH = o.tempH;
                glbarr[o.tempI] += el.offsetH || 0;
                gbl_work.P.ul_h = Math.max.apply(null, glbarr) + 50;
            }
        })
    }

    // 暂时废弃
    function re_arr(obj, ppt) {
        var arr = obj.map(function (el, idx) {
            return obj[idx][ppt]
        })
        return arr;
    }

    function getHeight() {
        return {
            allH: document.documentElement.scrollHeight,
            clientH: window.innerHeight,
            scrollTop: $(document).scrollTop()
        }
    }

    function ajax() {
        if (gbl_work.isloading) return;
        gbl_work.isloading = true;
        var ajaxp = {
            tm: 50
        }
        $.get(gbl_work.Works.url + ++gbl_work.pages, function (res) {
            console.log('ajax test');
            if (res.success) {
                ajaxapd(res.data, ajaxp);
            }
        }, 'json');
    }

    function ajaxapd(json, ajaxp) {
        var picst = setInterval(function () {

            //预设置位置
            var tempArr = dupArr(gbl_work.glbarr);
            init_pos(tempArr, json, {
                type: 1
            })
            if (allget(json, 'hasw')) {
                success();
                apdlis(json);
            }
            if (!--ajaxp.tm) {
                failed();
                apdlis(json);
            }

            function success() {
                gbl_work.glbarr = tempArr;
                gbl_work.isloading = false;
                console.log('success');
                clearInterval(picst);
                load();
            }

            function failed() {
                console.log('it"s time out failed');
                gbl_work.glbarr = tempArr;
                gbl_work.isloading = false;
                clearInterval(picst);
                load();
                json.forEach(function (el, idx) {
                    if (el.imgw) {
                        el.hasw = true;
                    } else {
                        console.log('obj' + idx + 'is not loaded');
                    }
                });
            };

            function load() {
                var loadbox = gbl_work.Obj.loadbox;
                if (!json.length) {
                    loadbox.html('<p class="work-loading">没有更多了</p>');
                    gbl_work.nomore = true;
                }
            }
        }, 200)
    }

    // 深拷贝
    function dupArr(arr) {
        var newArr = [];
        for (var i in arr) {
            newArr[i] = arr[i]
        }
        return newArr
    }

    // return {
    //     init,
    //     dupArr,
    //     getHeight,
    //     init_src
    // }
}
hkglb.works = work_scroll();
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
    // getw();

    function getw() {

        var picst = setInterval(function () {
            if (allget()) {
                success(), apdlis();
            }
            if (!--p.img_waier) {
                failed(), apdlis();
            }
            imgsrcs.forEach(function (el, idx) {
                try {
                    json[idx]['hasw'] = false;
                } catch (e) {
                }
                var img = new Image();
                img.src = imgsrcs[idx];
                if (img.width && !json[idx]['hasw']) {
                    try {
                        json[idx]['hasw'] = true;
                        json[idx]['imgw'] = img.naturalWidth;
                        json[idx]['imgh'] = img.naturalHeight;
                        json[idx]['offsetW'] = ip.ofw;
                        json[idx]['offsetH'] = ip.ofh + parseInt(json[idx]['imgh'] / json[idx]['imgw'] * ip.imgw);
                        json[idx]['imgOffsetH'] = parseInt(json[idx]['imgh'] / json[idx]['imgw'] * ip.imgw);
                    } catch (e) {
                        console.log(json.length, idx, json[idx]);
                    }
                }
            });

            function success() {
                clearInterval(picst);
                loadbg.fadeOut();
            }

            function failed() {
                clearInterval(picst);
                loadbg.fadeOut();
                json.forEach(function (el, idx) {
                    if (el.imgw) {
                        el.hasw = true;
                    } else {
                        console.log('obj' + idx + 'is not loaded');
                    }
                });
            };
            //判断是否成功
            function allget() {
                var len = json.length;
                json.forEach(function (el, idx) {
                    if (el['hasw']) {
                        --len
                    }
                })
                if (!len) {
                    return true
                }
            }

            function initpos() {
                var position = [];
                json.forEach(function (el, idx) {
                    if (!el['hasw']) {
                        console.log(el);
                        return;
                    }
                    if (idx < p.row) {
                        el.positionL = idx * ip.ofw;
                        el.positionH = 0;
                        position[idx] = el.offsetH;
                        wp.ulH = Math.max.apply(null, returnNmb(position)) + 50;
                    } else {
                        wp.minH = Math.min.apply(null, position);
                        wp.minI = $.inArray(wp.minH, position);
                        el.positionL = wp.minI * ip.ofw;
                        el.positionH = wp.minH;
                        position[wp.minI] += el.offsetH;
                        wp.ulH = Math.max.apply(null, returnNmb(position)) + 50;
                        // console.log(el.offsetH,position,wp.minH,el.positionH,wp.minH);
                    }
                })
            }

            function apdlis() {
                if (search.data('appended')) return;
                search.data('appended', true)
                initpos();
                var ul = $('#Ojs-search-waterfall');
                json.forEach(function (el, idx) {
                    var li = json[idx],
                        liapd = $('<li class="waterfall-lis" style="left:' + el.positionL + 'px; top:' + el.positionH + 'px"><div class="img-wrp" style ="' + el.imgOffsetH + 'px"><a class="Ojs-img-link" target="_blank" href="https://www.huakewang.com/./works/detail/' + li.id + '".html><img class="Ojs-img-href" src="' + li.imgsrc + '" alt="作品' + li.id + '"></a><div class="imgwrp-info"><span class="Ojs-title">' + li.title + '</span><span class="collect">收藏</span><p class="img-dec">' + li.abstract + '</p></div></div><div class="author-mess"><a target="_blank"  href="http://www.huakewang.com/user/home/' + li.user_id + '.html"><img src="' + li.upath + '" alt="作者头像"><span class="author-id">' + li.nick_name + '</span></a><div class="item-wrp"><span class="look"><i class="icon-see"></i>' + li.hits + '</span><span class="talk"><i class="icon-talk"></i>' + li.comment_count + '</span><span class="love"><i class="icon-love"></i>' + li.love_count + '</span></div></div></li>');
                    if (el['hasw']) {
                        ul.append(liapd)
                    }
                    ;
                    ul.css('height', wp.ulH + 'px');
                });
            }
        }, 100)
    }

    function getsrc(arr, property) {
        var srcs = arr.map(function (el, idx) {
            var src;
            if (el[property]) {
                if (/http:\/\//.test(el[property])) {
                    src = el[property];
                } else {
                    src = 'https://www.huakewang.com/./' + el[property];
                }
            } else {
                src = 'https://www.huakewang.com/hkwhtml/images/mixed/logo2.jpg';
            }
            el.imgsrc = src;
            return src;
        })
        return srcs;
    }

    function loading() {
        loadbg = $('#Ojs-pic-loading');
        if (!p.getdata) {
            loadbg.css('display', 'block');
        } else {
            loadbg.fadeOut()
        }
        var st = setInterval(function () {
            if (!--p.waite) {
                loadbg.fadeOut();
                clearInterval(st);
            }
        }, 100)
    }

    function noworks() {
        $('#Ojs-pic-loading').fadeOut();
        $('.css-search-waterfall').html('<p class="css-nowork">没有相关作品</p>')
    }

    // setTimeout(function() {
    // 	loading();
    // }, 100)

    function math() {
        var par = {
            imgw: 260,
            lismr: 8,
            lismb: 10,
            imgp: 10,
            auth: 29,
            ofw: 288,
            ofh: 59
        }
        return par;
    }

    function returnNmb(arr) {
        var newarr = arr.filter(function (el) {
            return !isNaN(el)
        })
        return newarr;
    };

    function designer() {
        if (p.designer) return;
        p.designer = true;

        apd_lis();
        $(window).on('scroll', function () {
            var tmpH = getHeight();
            toload();
            if (tmpH.allH - tmpH.scrollTop - tmpH.clientH <= 1000 && !ds.nomore && ds.toload) {
                apd_lis();
            }
        });
    }

    function toload() {
        var test = $('.searchDesigners');
        if (test.css('display') === 'block') {
            ds.toload = true;
        } else {
            ds.toload = false;
        }
    }

    function apd_lis() {
        get_shownum(ds.start_nm, ds.all_nm);
        var boxwrp = $('#Ojs-search-designers');
        var lis = creatlis(ds.start_nm, ds.end_nm);
        boxwrp.append(lis);
        ds.start_nm = ds.end_nm
        console.log(ds);
    }

    function pre_path(path, rep) {
        var src;
        if (!path) {
            src = rep;
        } else {
            if (/http:\/\//.test(path)) {
                src = path;
            } else {
                src = 'https://www.huakewang.com/./' + path;
            }
        }
        return src;
    }

    function get_shownum(start, all) {
        if (start >= all) return;
        if (start + 9 >= all) {
            ds.end_nm = all;
            ds.nomore = true;
        } else {
            ds.end_nm = start + 9;
        }
    }

    function getHeight() {
        return {
            allH: document.documentElement.scrollHeight,
            clientH: window.innerHeight,
            scrollTop: $(document).scrollTop()
        }
    }

    function getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length == 2) return parts.pop().split(';').shift();
    }

    function haveid(nm) {
        if (getCookie(nm)) return getCookie(nm);
    }

    function sex(sex) {
        var ss;
        ss = !sex ? '保密' : sex == 1 ? '男' : '女';
        return ss;
    }

    function createworks(designer) {
        var works,
            worklists = designer.works_data,
            len = designer.works_data.length;
        if (!len) {
            works = '<p>该设计师暂时还没有作品</p>';
        } else {
            works = '<ul>';
            for (var i = 0; i < len; i++) {
                var li = '<li class="thumb h150"><a target="_blank" href="https://www.huakewang.com/works/detail/' + worklists[i].id + '.html"><img src="' + pre_path(worklists[i].works_path || worklists[i].path) + '" /></a></li>';
                works += li;
            }
            works += '</ul>'
        }
        return works;
    }

    function readdress(address) {
        if (!address) {
            address = '中国';
        }
        if (address.length >= 10) {
            address = address.trim().split(' ').splice(1).join(' ')
        }
        return address;
    }

    function creatpins(pins) {
        if (!pins) return;
        var arr = pins.trim().split(' '),
            txt = '';
        for (var i = 0; i < arr.length; i++) {
            txt += '<span class="sp1-bk">' + arr[i] + '</span>'
        }
        return txt;
    }

    function creatlis(start, end) {
        var dom = $('<div>').addClass('Ojs-search-designer-list');
        for (var i = start; i < end; i++) {
            var li = $('<div class="ca-item ca-item-select ca-item-1" id="1"><div class="ca-item-main"><div class="ca-item-photo"><a href="./user/home/' + designs[i].id + '.html" target=_blank><img src="' + pre_path(designs[i].path, "https://www.huakewang.com/images/client/bigAvator1.jpg") + '" /></a></div><h3>' + designs[i].nick_name + '</h3><p>设计师<span class="shugang">|</span>' + sex(designs[i].sex) + '<span class="shugang">|</span>' + designs[i].experience + '年经验<span class="shugang">|</span>' + designs[i].works_count + '件作品</p><p><span class="imgGZ1"></span><i class="text">' + designs[i].hits_count + '</i><span class="imgGZ2"></span><i class="text">' + designs[i].followers_count + '</i><span class="imgGZ3"></span><i class="text">' + designs[i].rec_count + '</i></p><div class="ca-info"><div class="ca-star"><span class="ca-star-icon"></span>客户满意率：100%</div><div class="ca-location"><span class="ca-location-icon"></span>' + readdress(designs[i].txt_address) + '</div></div><div class="ca-main"><div class="ca-inntro">' + creatpins(designs[i].jobs) + '</div><div class="ca-list">' + createworks(designs[i]) + '</div></div><div class="ca-mian-detailed fn-hide"><div class="ca-mian-detailed-bottom fn-clear"><a href="http://wpa.qq.com/msgrd?V=3&uin=' + designs[i].qq + '&Site=画客客服&Menu=yes" target=_blank><div class=ca-mian-detailed-bottom-item fn-left"><i class="big-blue"></i>对话</div></a>' + (haveid('user_id') ? '<a href="" target=_blank><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-red"></i>约见</div></a>' : '<a onclick="javascript:go_login();" href="javascript:void(0);"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-red"></i>约见</div></a>') + '<a href="case.html" target="_blank"><div class="ca-mian-detailed-bottom-item fn-left"><i class="big-orange"></i>下单</div></a></div></div></div></div>');
            dom.append(li);
        }
        return dom;
    }

    designer()
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
    var LiHArr = [] //用于存储 没列中所有块相加的高度

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
        isRun = true;
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
    /**轮播结束**/
    /**切换城市**/
    $('.change-city').click(function () {
        $('ul.drop-select-options').removeClass('cur');
        $(this).parent().children('ul.drop-select-options').toggleClass('cur');
    });
    $('.drop-select .drop-select-options.huoqv li').click(function () {
        var cityText = $(this).children('a').text();
        $(this).parents('.city-bar').find('.city-show').text(cityText);
        $(this).parents('ul.drop-select-options').toggleClass('cur');
    });
    $('div.cityInput input').focus(function () {
        $(this).parent().find('ul.drop-select-options').addClass('cur');
        $('ul.drop-select-options:eq(0)').removeClass('cur');
    });
    $('div.cityInput input').blur(function () {
        $(this).parent().find('ul.drop-select-options').removeClass('cur');
    });
    $('div.cityInput input').keyup(function () {
        $(this).parent().find('ul.drop-select-options').removeClass('cur');
    });
    /**切换城市结束**/
    /**切换最近距离开始**/
    $('.change-select').click(function () {
        $('ul.drop-select-options').removeClass('cur');
        $(this).parent().children('ul.drop-select-options').toggleClass('cur');
    });
    $('.zjjl-select .drop-select-options.huoqv li').click(function () {
        // var _this = $(this);
        var cityText = $(this).children('a').text();
        $(this).parents('.city-bar').find('.zjjl-show').text(cityText);
        $(this).parents('ul.drop-select-options').toggleClass('cur');
    });

    /*****获取input地址栏显示*****/
    $('div.cityWrap ul.cityWrapUl li input').focus(function () {
        $(this).parent().siblings('div.tuosen').addClass('cur');
        ;
    });
    /*****失去焦点input地址栏显示*****/
    $('div.cityWrap ul.cityWrapUl li input').blur(function () {
        $(this).parent().siblings('div.tuosen').toggleClass('cur');
        ;
    });
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
    $('div.cityInput input').focus(function () {
        $(this).parent().find('ul.drop-select-options').addClass('cur');
        $('ul.drop-select-options:eq(0)').removeClass('cur');
    });
    $('div.cityInput input').blur(function () {
        $(this).parent().find('ul.drop-select-options').removeClass('cur');
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
    $('div.cityInput input').keyup(function () {
        $(this).parent().find('ul.drop-select-options').removeClass('cur');
    });
    var btnJL = $('.zjjl-select .drop-select-options.huoqv');
    var btnCT = $('.city-barWrap .drop-select-options.huoqv');
    $(document).click(function () {
        caseB.removeClass('cur');
        btnJL.removeClass('cur');
        btnCT.removeClass('cur');
    });

    /**切换最近距离结束**/

    $('.city-barWrap .drop-select .change-city').parent().click(function () {
        $('.city-barWrap .drop-select .change-city').parent().children().eq(1).css("display", "block")
    })
    $('.city-barWrap .drop-select .change-city').parent().parent().siblings().click(function () {
        $('.city-barWrap .drop-select .change-city').parent().children().eq(1).css("display", "none")
    })


    /**设计师轮播开始**/
    $('.ca-item').hover(function () {
        $(this).children('.ca-item-main').css({
            'border': '1px solid #0096ff'
        });
        $(this).children('.ca-item-main').find('.ca-item-photo img').css({
            'border': '1px solid #0096ff'
        });
        $(this).find('.fn-hide').finish().slideDown(200);
    }, function () {
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

    $(".hkw-btn_round .fn-clear li").mouseenter(function () {
        $(this).each(function () {
            $(this).css("border-color", "black").siblings().css("border-color", "#D3D8DC");
            $(this).hover().css("color", "black").siblings().css("color", "#D3D8DC");
        })
    })
    var itemLength = $('.ca-item').css("width");
    var item = parseInt(itemLength);
    var itemLength = $('#ca-container div.ca-item').length;
    $('#ca-item-wrap').css({
        'width': (itemLength * item) + 'px',
        'height': '100%',
        'position': 'relative',
        'left': '0px'
    });
    for (var i = 0; i < itemLength; i++) {
        $('#ca-container div.ca-item:eq(' + i + ')').css({
            'left': (i * item) + 'px'
        });
    }
    $(function () {
        var i = 0;
        var size = $("#ca-item-wrap .ca-item").size() - 2;
//            点击向左轮播
        $(".ca-nav .ca-nav-prev").click(function () {
            i--;
            if (i == -1) {
                $("#ca-item-wrap").stop().animate({left: -(size - 1) * 401});
                i = size - 1;
            }
            $("#ca-item-wrap").stop().animate({left: -i * 401}, 500);
            $("#hkw-btn_round li").eq(i).css({
                "border-color": "#000",
                "color": "#000"
            }).siblings().css({
                "border-color": "#D3D8DC",
                "color": "#D3D8DC"
            });
        });
//            点击向右轮播
        $(".ca-nav .ca-nav-next").click(function () {
            moveR();
        });
//            向右轮播函数
        function moveR() {
            i++;
            if (i == size) {
                $("#ca-item-wrap").stop().animate({left: 0});
                i = 0;
            }
            $("#ca-item-wrap").stop().animate({left: -i * 401}, 401);
            if (i == size) {
                $("#hkw-btn_round li").eq(0).css({
                    "border-color": "#000",
                    "color": "#000"
                }).siblings().css({
                    "border-color": "#D3D8DC",
                    "color": "#D3D8DC"
                });
            } else {
                $("#hkw-btn_round li").eq(i).css({
                    "border-color": "#000",
                    "color": "#000"
                }).siblings().css({
                    "border-color": "#D3D8DC",
                    "color": "#D3D8DC"
                });
            }
        }

//            鼠标滑过圆点
        $("#hkw-btn_round li").hover(function () {
            var index = $(this).index();
            i = index;
            $("#ca-item-wrap").stop().animate({left: -i * 401}, 300);
            $(this).addClass("on").siblings().removeClass("on");
        });
//            定时自动轮播
//         var t = setInterval(function () {
//             moveR();
//         }, 2500);
//            鼠标滑过图片停止自动轮播
//         $("#hkw-ca-wrapper").hover(function () {
//                 clearInterval(t);
//             },
//             function () {
//                 t = setInterval(function () {
//                     moveR();
//                 }, 2500)
//             });
    })
    /**设计师轮播结束**/


    /**全部类别下拉列表**/
    $(".hkw-work-link>div").mouseenter(function () {
        $(".hkw-work-select").stop().slideDown();
    });
    $(".hkw-work-link>div").mouseleave(function () {
        $(".hkw-work-select").stop().slideUp();
    });
    $(".hkw-work-bottom").mouseenter(function () {
        $(this).children().eq(2).stop().slideDown();
    });
    $(".hkw-work-bottom").mouseleave(function () {
        $(this).children().eq(2).stop().slideUp();
    });
    $(".hkw-view-h3").mouseenter(function () {
        $(this).children().eq(1).stop().slideDown();
    })
    $(".hkw-view-h3").mouseleave(function () {
        $(this).children().eq(1).stop().slideUp();
    })
    // console.log($(".hkw-brand-logo div").children().eq(0).html("123"))
    $(".hkw-brand-logo li").each(function () {
        $(this).each(function () {
            $(this).append('<div class="hkw-brand-show" style="display:none;">' +
                '<h3 class="hkw-brand-title">Motorala 杭州</h3>' +
                '<p style="font-size:12px;font-weight:100;padding:5px 28px 18px 28px;">总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一...</p>' +
                '<h3 class="hkw-brand-title">合作规模:20万元</h3>' +
                '<a href="www.motorola.com.cn">www.motorola.com.cn</a>' +
                '</div>')
        })
    });
    $(".hkw-brand-logo li").each(function () {
        $(this).mouseenter(function () {
            $(this).children().eq(1).css("display", "block");
        });
        $(this).mouseleave(function () {
            $(this).children().eq(1).css("display", "none");
        });
    });


    /**项目轮播开始**/
    // var proLength = $('.ca-item').css("width");
    // var item = parseInt(proLength);
    // var proLength = $('#project-ca-wrapper div.ca-item').length;
    // $('#project-ca-wrapper').css({
    //     'width': '100%',
    //     'height': '100%',
    //     'position': 'relative',
    //     'left': '0px'
    // });
    // for (var i = 0; i < proLength; i++) {
    //     $('#ba-container div.ca-item:eq(' + i + ')').css({
    //         'left': (i * item) + 'px'
    //     });
    // }
    // $('#proMaxBox .ca-nav span.ca-nav-next').on('click', function() { //点击next触发	
    //     var leftNuma = $('#project-ca-wrapper').finish().css('left').substring();
    //     var numLefta = parseInt(leftNuma);
    //     if (numLefta > -(proLength - 3) * item) { //判断当前ul.slide ‘margin-left’的宽度是否小于（ul.slide li的个数-4）*250																										
    //         $('#project-ca-wrapper').finish().animate({
    //             'left': (numLefta - item) + 'px'
    //         });
    //     } else {
    //         $('#project-ca-wrapper').finish().animate({
    //             'left': '0px'
    //         });
    //         return false;
    //     }
    // });
    // $('#proMaxBox .ca-nav span.ca-nav-prev').on('click', function() { //点击next触发					
    //     var leftNuma = $('#project-ca-wrapper').finish().css('left').substring();
    //     var numLefta = parseInt(leftNuma);
    //     if (numLefta < 0) { //判断当前ul.slide ‘margin-left’的宽度是否小于（ul.slide li的个数-4）*250																										
    //         $('#project-ca-wrapper').finish().animate({
    //             'left': (numLefta + item) + 'px'
    //         });
    //     } else {
    //         $('#project-ca-wrapper').finish().animate({
    //             'left': -(proLength - 3) * item + 'px'
    //         });
    //         return false;
    //     }
    // });
    /**项目轮播结束**/
    $('#main-body.personal div.right div.neirong div.neirong-top div.wddt span').click(function () {
        $('#main-body.personal div.right div.neirong div.neirong-top div.xttz span').css({
            'border-bottom': 'none'
        });
        $('.Wrap:eq(0)').css({
            'display': 'block'
        });
        $('.Wrap:eq(1)').css({
            'display': 'none'
        });
        $(this).css({
            'border-bottom': '2px solid #0b83d8'
        });
    });
    $('#main-body.personal div.right div.neirong div.neirong-top div.xttz span ').click(function () {
        $('#main-body.personal div.right div.neirong div.neirong-top div.wddt span').css({
            'border-bottom': 'none'
        });
        $('.Wrap:eq(0)').css({
            'display': 'none'
        });
        $('.Wrap:eq(1)').css({
            'display': 'block'
        });
        $(this).css({
            'border-bottom': '2px solid #0b83d8'
        });
    });
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
    /** 点击div.ditu加载map**/
    $('div.ditu').click(function () {
        $('div.superbox').load('map.html');
        $('div.superbox').finish().css({
            'display': 'block'
        });
    });
    /** 点击div.ditu加载map**/
    /**case.html页面切换**/
    $('div.paymentMain div.fsyj ul li').click(function () {
        $('div.paymentMain div.fsyj ul li').removeClass('cur');
        $(this).toggleClass('cur');
        if ($('div.paymentMain div.fsyj ul li').index($(this)) == 0) {
            $('div.hzyx').css({
                'display': 'block'
            });
            $('div.zjxd').css({
                'display': 'none'
            });
        } else {
            $('div.hzyx').css({
                'display': 'none'
            });
            $('div.zjxd').css({
                'display': 'block'
            });
        }
    });
    /**case.html页面切换**/
    /**支付宝，微信，画客网支付方式切换**/
    $('div.paymentMainDiv ul.zfUl li').click(function () {
        $('div.paymentMainDiv ul.zfUl li').removeClass('cur');
        $(this).toggleClass('cur');
        var liIndex = $('div.paymentMainDiv ul.zfUl li').index($(this));
        $('div.ewm').css({
            'display': 'none'
        });
        $('div.ewm:eq(' + liIndex + ')').css({
            'display': 'block'
        });
    });
    /**支付宝，微信，画客网支付方式切换**/
    /**点击账户充值显示div.smrq**/
    $('span.zhcz').click(function () {
        $('div.smrq').addClass('cur');
    });
    /**点击账户充值显示div.smrq**/
    /**充值方式切换**/
    $('div.smrq ul li').click(function () {
        $('div.smrq ul li').removeClass('cur');
        $(this).toggleClass('cur');
        $(this).parents('div.smrq').find('div.sewm').css('display', 'none');
        var liIndex = $('div.smrq ul li').index($(this));
        $('div.sewm:eq(' + liIndex + ')').css({
            'display': 'block'
        });
    });
    /**充值方式切换**/
    /**点击.close关闭div.smrq**/
    $('div.smrq div.smrqTop span.close').click(function () {
        $(this).parents('div.smrq').removeClass('cur');
    });
    /**点击.close关闭div.smrq**/

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
    /**project.html热门城市点击字体变红**/
    $('ul.designer-select-navUl li span.text a').click(function () {
        $(this).parents('ul.designer-select-navUl').find('li span.text a').not('.more').css({
            'color': '#676767'
        });
        $(this).not('.more').css({
            'color': 'red'
        });
    });
    /**project.html热门城市点击字体变红**/
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
    $('div.ExtendNav ul.ExtendNavLeft li').click(function () {
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
    $('div.imagesWrap img ').click(function () {
        $(this).parent().css({
            'display': 'none'
        });
    });
    $('div.textWrapChildernR img ').click(function () {
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

    /*活动详情 头像图片的移动 开始*/
    (function ($) {
        //参数，格式设置
        var picNumbers = $("#activityDetail_nav_springContainer").children().size();
        var picShowNumber = 8; //要显示图片的个数
        var picWrapWidth = $("#activityDetail_nav_springContainer").css('width');
        var picWidth = $(".activityDetail_nav_spring").css("width");
        var picMargin = $('.activityDetail_nav_spring').css('margin-right'); //获取右边距，图片宽
        var $boxs = $(".activityDetail_nav_spring");
        var $picWrap = $("#activityDetail_nav_springContainer");
        var $container = $('#activityDeatil_nav_springWrap');
        var picoffsetWidth = parseFloat(30);
        var picMarginInt = parseFloat(picMargin);
        var picMoveWidth = picoffsetWidth + picMarginInt;
        var picMovedLeft = 0;
        var number = 0;
        $boxs.css({
            float: 'left',
            'position': 'relative'
        });
        $boxs.css({
            'margin-right': picMargin
        });
        $picWrap.css({
            width: picMoveWidth * picNumbers + 100
        })
        $container
            .css('width', picMoveWidth * picShowNumber);
        //动画
        function move(direction) {
            if (picNumbers < picShowNumber) return false;
            number = direction ? number + 1 : number - 1;
            var picShouldLeft = -(picNumbers - picShowNumber);
            $("#activityDetail_nav_springContainer").animate({
                'left': number * picMoveWidth
            }, 0);
            if (number > picShouldLeft && number < 0) {
                $('#activityDetail_navSpring_btn1').css('visibility', 'visible');
                $('#activityDetail_navSpring_btn2').css('visibility', 'visible');
            } else if (number < picShouldLeft + 1) {
                $('#activityDetail_navSpring_btn1').css('visibility', 'hidden');
                $('#activityDetail_navSpring_btn2').css('visibility', 'visible');
                return;
            } else if (number > 0) {
                $('#activityDetail_navSpring_btn1').css('visibility', 'visible');
                $('#activityDetail_navSpring_btn2').css('visibility', 'hidden');
                return;
            } else return;
        };
        //绑定事件
        $("#activityDetail_navSpring_btn1").click(function () {
            move(false)
        });
        $("#activityDetail_navSpring_btn2").click(function () {
            move(true)
        });
    })(jQuery);
    /*活动详情 头像图片的移动 结束*/


    //搜索结果选择
    function searchSelect() {
        var uls = $('#seachResult-nav a');
        var lis = $('.searchResult');
        for (var i = 0; i < uls.length; i++) {
            uls[i].index = i;
            uls[i].onclick = function () {
                for (var i = 0; i < uls.length; i++) {
                    uls[i].style.color = 'black';
                }
                this.style.color = 'red';
                for (var j = 0; j < lis.length; j++) {
                    lis[j].style.display = 'none';
                }
                lis[this.index].style.display = 'block';
            }
        }
        ;
    }

    window.onload = searchSelect();

});


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
var proto = {
    getCookie: function (name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length == 2) return parts.pop().split(';').shift();
    },
    //发送验证码
    ajaxcode: function (config) {
        var o = {
            phnum: '',
            fn1: '',
            fn2: ''
        };
        $.extend(o, config);
        $.post("https://www.huakewang.com/index.php/user/send_verify_code.html", {
                "mobile": o.phnum,
                "type": 'forget',
                "tokeen": 1234165
            },
            function (res) {
                if (res.success) {
                    if (res.message.trim()) foo.alert(res.message);
                    if (o.fn1) {
                        o.fn1()
                    }
                    ;
                    return false;
                } else {
                    if (res.message.trim()) foo.alert(res.message);
                    if (o.fn2) {
                        o.fn2()
                    }
                    ;
                    return false;
                }
            },
            "json"
        );
    },
    //注册并登陆
    ajaxpswd: function (config) {
        var o = {
            phnum: '',
            pswd: '',
            code: '',
            fn1: '',
            fn2: '',
            href: 'https://www.huakewang.com'
        }
        $.extend(o, config);
        $.post("https://www.huakewang.com/index.php/user/forget", {
                "username": o.phnum,
                "passwd": o.pswd,
                "login_type": 0,
                "code": o.code,
                "agreement": true
            },
            function (res) {
                if (res.success) {
                    if (res.message.trim()) foo.alert(res.message);
                    location.href = o.href;
                    return false;
                } else {
                    if (res.message.trim()) foo.alert(res.message);
                    if (fn2) {
                        fn2()
                    }
                    ;
                    return false;
                }
            },
            "json"
        );
    },
    sendcode: function (config) {
        var o = {
            target: '',
            fn: '',
            sending: false,
            par: {}
        }
        $.extend(o, config);
        if (!o.target) return;
        o.target.on('click', function (e) {
            if (typeof o.fn == 'function') {
                o.fn({
                    fn1: dntm,
                    phnum: o.par.phnum.val()
                });
            }
            var _self = $(this);
            if (o.sending) return;
            // dntm();

            function dntm() {
                o.sending = true;
                _self.html('<span class="js-time">60</span>S');
                _self.addClass('sending');
                var tm = $('.js-time'),
                    tmnm = 60
                var sti = setInterval(function () {
                    --tmnm;
                    tmnm > 0 ? tm.text(tmnm) : (function () {
                        clearInterval(sti);
                        o.target.text('发送验证码');
                        _self.removeClass('sending');
                        o.sending = false;
                    })();
                }, 1000)
            }
        });
    },
    checkipt: function (config) {
        var o = {
            target: '',
            reg: '',
            clnm: 'success'
        }
        $.extend(o, config);
        o.target.on('input blur focus', function (e) {
            var vl = this.value;
            if (o.reg.test(vl)) {
                $(this).addClass(o.clnm);
            } else {
                $(this).removeClass(o.clnm);
            }
        });
    },
    upload: function (config) {
        var o = {
            target: '',
            uploadtarget: '',
            src: ''
        };
        $.extend(o, config);
        o.target.change(function (e) {
            var reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function (e) {
                var apd = $('<div class="js-target"></div>'),
                    data = e.target.result,
                    apdpic = $('.js-target');
                if (!apdpic.length) {
                    o.uploadtarget.append(apd);
                    apdpic = $('.js-target');
                }
                apdpic.css('backgroundImage', 'url(' + data + ')');
            };
        });
    },
    prefix: function (style) {
        return (function (div) {
            var prefixes = ['Moz', 'Webkit', 'O', 'ms'],
                capPro = style.charAt(0).toUpperCase() + style.slice(1);
            if (sytle in div.style) {
                return style;
            } else {
                for (var i in prefixes) {
                    var vendor = i + capPro;
                    if (vendor in div.style) {
                        return vendor;
                    }
                }
            }
        })(document.creatElement('div'))
    },
    prefix: function (style) {
        return (function (div) {
            var prefixes = ['Moz', 'Webkit', 'O', 'ms'],
                capPro = style.charAt(0).toUpperCase() + style.slice(1);
            if (sytle in div.style) {
                return style;
            } else {
                for (var i in prefixes) {
                    var vendor = i + capPro;
                    if (vendor in div.style) {
                        return vendor;
                    }
                }
            }
        })(document.creatElement('div'))
    },

};
var foo = {
    parm: {
        tm: true
    },
    chaIner: function () {
        var clNum = 1; //收起
        // var ne = false;
        var addBtn = $('#btn-sjI');
        var tagA = $('#btn-sj2');
        if (tagA.length == 0) return;
        var inputS = tagA.children('input');
        var par;

        addBtn.on('click', function () {
            par = false;
            setTimeout(function () {
                par = true
            }, 500)
            _this = $(this); //按钮
            if (clNum == 1) {
                _this.html("确定");
                inputS.css('display', 'inline-block');
                inputS.animate({
                    width: '270px',
                    height: '26px'
                }, 400, 'linear');
                clNum = 2;
                inputS.focus();
            } else if (clNum == 2) {
                ct();
            }
        });
        inputS[0].onfocus = function () {
            window.onkeyup = function (e) {
                if (e.keyCode == 13) {
                    ct();
                }
            }
        }

        function ct() {
            var inputInner = inputS.val();
            if (!inputInner && clNum == 2) {
                foo.alert('请输入您的擅长及亮点');
            }
            if (inputInner) {
                foo.creatB('#addBox-sj', inputInner, '#btn-sj2', 'name');
                clNum = 1;
                inputS.val(null);
                blur();
                btnCl = $('.icon-close');
                btnCl.click(function () {
                    var $this = $(this);
                    var sp = $this.parent().parent();
                    sp.remove();
                });
            }
            ;
        }

        function blur() {
            inputS.animate({
                width: 0,
                height: 0
            }, 200, 'linear', function () {
                inputS.css('display', 'none');
            });
            setTimeout(function () {
                addBtn.html("添加 <i class=\"icon-add\"></i>")
            }, 100)
            clNum = 1;
        };
        inputS[0].onclick = function (e) {
            e.stopPropagation();
        }
        document.onclick = function () {
            if (clNum == 2 && par) {
                blur()
            }
        }

    },
    alert: function (val) {
        var ly = document.getElementById('login-LY');
        if (ly) return;
        var txt = val;
        dd = document.documentElement
        var sWeidth = dd.clientWidth;
        var sHeight = dd.clientHeight;
        var oLogin = document.createElement('div');
        oLogin.id = 'login-LY';
        dWidth = 420;
        oLogin.style.width = dWidth + 'px';
        dHeight = 60;
        oLogin.style.height = 0;
        oLogin.style.left = parseInt(sWeidth / 2) - parseInt(dWidth / 2) + 'px';
        oLogin.style.top = parseInt(sHeight / 2) - parseInt(dHeight / 2) + 'px';
        oLogin.innerHTML = txt;
        oLogin.style.position = 'fixed';
        document.body.appendChild(oLogin);
        var h = 0;
        i = setInterval(function () {
            if (h < dHeight) {
                h += 10;
                oLogin.style.height = h + 'px';
            }
            ;
        }, 50);

        var h = parseInt(oLogin.style.height) + 1;
        setTimeout(function () {
            clearInterval(i);
            setInterval(function () {
                if (h > 1) {
                    h -= 10;
                    oLogin.style.height = h + 'px';
                }
            }, 50);
        }, 1500);
        setTimeout(function () {
            document.body.removeChild(oLogin);
        }, 1900)
    },
    pinLY: function (pin) {
        var sWidth = document.body.scrollWidth;
        var sHeight = document.body.scrollHeight; //页面高
        var pHeight = window.screen.height; //屏幕高
        var close, nm = 0;
        if (!pin) {
            pin = [
                ['工业设计', 'id'], '环艺设计', '装潢设计', '展示设计', '服饰设计', '平面设计', '网站设计', '设计', '广告设计'
            ]
        }
        var html = "<div class=\"pinBox-nav\">设计领域<i class=\"icon-closeB\"></i></div>";
        html += "<div class=\"pinBox-main\">";
        for (var i = 0; i < pin.length; i++) {
            html += "<span class=\"pin-ly\" id='" + pin[i][1] + "'>" + pin[i][0] + "</span>";
        }
        html += "<div class=\"pinBox-footer\"><span class=\"footer-pin pinL\">取消</span><span class=\"footer-pin pinR\">保存</span></div>";
        var chBox = document.createElement('div');
        chBox.id = "chBox-LY";
        var cWidth = chBox.style.width;
        var cHeight = chBox.style.height;
        chBox.className = "pingBox-ly animate-zoomOut";
        chBox.innerHTML = html;
        chBox.style.left = parseInt(sWidth / 2) - parseInt(cWidth / 2) + 'px';
        var mask = document.createElement('div');
        mask.id = "mask-LY";
        mask.style.height = sHeight + 'px';
        mask.style.width = sWidth + 'px';
        document.body.appendChild(mask);
        document.body.appendChild(chBox);
        var iClose = $('.icon-closeB');
        var cClose = $('.footer-pin.pinL');
        iClose.click(function () {
            removeLY();
        });
        cClose.click(function () {
            removeLY();
        });
        var save = $('.footer-pin.pinR');
        save.click(function () {
            $('.lineBox .tag-added').remove();
            var creatp = $(".pinBox-main").find('.active');
            if (creatp.length == 0) {
                return
            } else {
                for (var l = 0; l < creatp.length; l++) {
                    foo.creatA('#addBox2', creatp[l].innerHTML, '#btn-sj', creatp[l].id);
                }
            }
            removeLY();
            close = $('.tag-added .icon-close');
            cls(close);
        });

        function cls(cls) {
            cls.click(function () {
                $(this).parents('.tag-added').remove();
            });
        }


        function removeLY() {
            document.body.removeChild(chBox);
            document.body.removeChild(mask);
        };
        //choose
        var pinBox = $('.pinBox-main')[0];
        var num = 0;
        var pins = pinBox.getElementsByClassName('pin-ly');
        for (var i = 0; i < pins.length; i++) {
            pins[i].onclick = function () {
                _this = $(this);
                if (_this.hasClass('active')) {
                    _this.removeClass('active');
                    num = foo.findNum('.pinBox-main', '.active');
                } else {
                    if (num < 3) {
                        _this.addClass('active');
                        num = foo.findNum('.pinBox-main', '.active');
                    } else if (document.getElementById('login-LY')) {
                        return false;
                    } else {
                        foo.alert('最多只能选择三个');
                    }
                }
            }
        }
    },
    findNum: function (pt, clName) {
        var pare = $(pt);
        var clNum = $(clName, pt);
        return clNum.length;
    },
    creatA: function (pt, mess, bf, cl) {
        var pB = $(pt);
        var tagA = $(bf);
        if (cl == undefined) {
            cl = ''
        }
        ;
        var _html = '<span class="tag-added"><input name=\'jobs[]\' type=\"hidden\" value=\"' + cl + '\"><span class="addBtn">';
        _html += mess;
        _html += '<i class="icon-close"></i></span></span>';
        $(_html).insertBefore(tagA);
    },
    creatB: function (pt, mess, bf, cl) {
        var pB = $(pt);
        var tagA = $(bf);
        if (cl == undefined) {
            cl = ''
        }
        ;
        var _html = '<span class="tag-added"><input name=\'jobsname[]\' type=\"hidden\" value=\"' + cl + '\"><span class="addBtn">';
        _html += mess;
        _html += '<i class="icon-close"></i></span></span>';
        $(_html).insertBefore(tagA);
    }
};
var bar = {
    pinC: function () {
        var pin = $('.mar-l .pin-g');
        var pinI = $('.mar-l .icon-lighting');
        tool.hovC(pin, pinI);
        // localB
        var inpt = $('#input-TS');
        var localB = $('.icon-localB');
        tool.hovC(inpt, localB);
    },
    //未解决      事件的嵌套
    focC: function () {
        var inpt = $('#input-TS');
        var localB = $('.icon-localB');
        tool.hovC(inpt, localB);
        tool.hovC(inpt, inpt);
        inpt.focus(function () {
            inpt.css('border-color', '#4dc0fa');
            localB.css('color', '#4dc0fa');
        });
        inpt.blur(function () {
            inpt.css('border-color', '#a3a3a3');
            tool.hovC(inpt, inpt);
        });
    },
    /**
     * [chg description]
     * @param  {[id]} aul  [description]
     * @param  {[classname]} alis [description]
     * @param  {[id]} bul  [description]
     * @param  {[classname]} blis [description]
     * @return {[type]}      [description]
     */
    chg: function (aul, alis, bul, blis, clnm) {
        alis = $(aul).find(alis);
        blis = $(bul).find(blis);
        if (alis.length == 0 || blis.length == 0) return;
        for (var i = 0; i < alis.length; i++) {
            alis[i].ide = i;
            alis.click(function (el) {
                if (blis.hasClass(clnm)) {
                    blis.removeClass(clnm)
                }
                ;
                if (alis.hasClass(clnm)) {
                    alis.removeClass(clnm)
                }
                var self = $(this);
                blis.eq(self[0].ide).addClass(clnm);
                self.addClass(clnm);
            });
        }
    },
    logined: function (state) {
        var
            lgdbox = $('.lgd-rowbox.s2'),
            mes = lgdbox.find('.check-mes'),
            pre = lgdbox.find('.checked-pre'),
            info = lgdbox.find('.info');
        aft = lgdbox.find('.checked-aft')
        switch (state) {
            case 0:
                pre.text('认证').addClass('nomove')
                mes.hover(function () {
                    info.text('赶快认证吧');
                }, function () {
                    info.html('设计师入住&nbsp;&nbsp;&nbsp;&rarr;');
                });
                break;
            case 1:
                pre.replaceWith('<div class="checked-pre animate"><p class="wrp">审核中</p></div>').addClass('animate');
                aft.text('审核中');
                info.text('画客网努力审核中');
                break;
            case 2:
                pre.text('未通过');
                aft.text('未通过');
                info.text('继续完善信息');
                mes.addClass('fail')
                break;
            case 3:
                mes.remove();
                break;
        }
    },
    //verify using now
    checkinwarn: function (affirm, num, http, txt1, txt2) {
        var con;
        if (affirm) {
            txt2 = txt1;
            txt1 = http;
            http = num;
            http = http ? String(http) : "https://www.huakewang.com/user/my_user_auth.html";
            txt1 = txt1 ? String(txt1) : "请认证成为画客身份！";
            txt2 = txt2 ? String(txt2) : "请认证成为画客身份！";
            con = $('<div class="checkin-warning animate-zoomOut s2"><div class="warningtp"><i class="close"></i></div><div class="warningbt"><div class="tip"><img src="https://www.huakewang.com/hkwhtml/images/info/logo.png"alt="logo"class="logo"><h3>' + txt1 + '</h3><p class="publish"><a class="sure"href=' + http + '>' + txt2 + '</a></p></div></div></div>')
        } else {
            try {
                if (num == undefined) num = 0
            } catch (e) {
            }
            con = $('<div class="checkin-warning animate-zoomOut"><div class="warningtp"><i class="close"></i></div><div class="warningbt"><div class="tip"><img src="https://www.huakewang.com/hkwhtml/images/info/logo.png"alt="logo"class="logo"><h3>请认证成为画客身份！</h3><p class="txt1">成为画客,您需要满足 <span class="txt-blue">6</span> 个及以上的作品,方可认证!</p><p class="txt2">当前作品数：<span class="work-num txt-red">' + num + '</span></p><p class="publish"><a class="sure"href="http://www.huakewang.com/my_works/PublishedWork.html">发布作品</a></p></div></div></div>')
        }
        $('body').append($('<div class="js-mask-blur">')).append(con);
        blur()
        con.alertposition();
        $('.checkin-warning .close').on('click', function () {
            remove();
        });
        $('.checkin-warning .sure').on('click', function () {
            remove();
        });

        function blur() {
            try {
                $('body > .containers').css({
                    transition: 'filter 1s ease',
                    filter: 'blur(0)'
                }).css('filter', 'blur(10px)');
            } catch (e) {
            }
        }

        function remove() {
            try {
                $('.js-mask-blur').remove();
                $('body > .containers').css('filter', '');
                con.addClass('animate-zoomIn');
                setTimeout(function () {
                    con.removeClass('animate-zoomIn').remove();
                }, 300)
            } catch (e) {
            }
        }
    },
    loading: function () {
        var sh = document.documentElement.clientHeight,
            sw = document.documentElement.clientWidth,
            apd = $('<div class="js-mask"><img src="http://www.huakewang.com/hkwhtml/images/mixed/loding.gif" alt="loading" class="js-loading"></div>');
        $('body').append(apd);
        $('.js-mask').css({
            width: sw,
            height: sh
        });

    },
    init: function () {
    }
};
var tool = {
    hovC: function (par, chid, col1, col2) {
        var col1 = col1 ? col1 : '#4dc0fa';
        var col2 = col2 ? col2 : '#a3a3a3';
        par.hover(function () {
            chid.css('color', col1);
        });
        par.mouseout(function () {
            chid.css('color', col2);
        });
    }
};
var person = {
    enter: function () {
        var nxt = $('.submit .nxt');
        lis = $('.cki-head-bt li');
        section = $('section');
        star = $('.js-star');
        nxt.eq(0).click(function (e) {
            for (var i = 0; i < 3; i++) {
                var c = star.eq(i).find('.successed');
                if (i == 1 && star.eq(i).find('img')) continue;
                if (c.length == 0) {

                    foo.alert("请填写信息完整");
                    return
                }
            }
            lis.eq(0).removeClass('cur').addClass('added');
            lis.eq(1).addClass('cur');
            section.eq(0).css('display', 'none');
            section.eq(1).css('display', 'block');
        });
        nxt.eq(1).click(function (e) {
            for (var i = 5; i < 6; i++) {
                var c = star.eq(i).find('.successed');
                if (c.length == 0) {
                    foo.alert("请填写信息完整");
                    return
                }
            }
            if (star.eq(3).find('.tag-added').length == 0) {
                foo.alert("请填写信息完整");
                return
            }
            $('#form1').submit();
            lis.eq(1).removeClass('cur').addClass('added');
            lis.eq(2).addClass('cur');
            section.eq(1).css('display', 'none');
            section.eq(2).css('display', 'block');
        });
    },
    iptinfo: function () {
        var ipts = $('.js-person-ipt');
        ipts.focus(function () {
            var self = $(this);
            person.verify.cur(self);
        });
        ipts.on("keyup blur paste", function () {
            var self = $(this);
            switch ($(this).attr('data-pattern')) {
                case 'twoword':
                    if (/.{2,}/.test(self.val())) {
                        person.verify.successed(self);
                    } else {
                        person.verify.check(self)
                    }
                    break;
                case 'single':
                case 'wechat':
                    if (/./.test(self.val())) {
                        person.verify.successed(self);
                    } else {
                        person.verify.check(self)
                    }
                    break;
                case 'identity':
                    if (/^\d{15}$|\d{18}/.test(self.val())) {
                        person.verify.successed(self);
                    } else {
                        person.verify.check(self)
                    }
                    break;
                case 'phone':
                    if (/1\d{10,}/.test(self.val())) {
                        person.verify.successed(self)
                    } else {
                        person.verify.check(self)
                    }
                    break;
                case 'qq':
                    if (/[1-9]\d{4,}/.test(self.val())) {
                        person.verify.successed(self)
                    } else {
                        person.verify.check(self)
                    }
                    break;
            }
        });
    },
    verify: {
        cur: function (self) {
            self.parent().removeClass('change').removeClass('successed').addClass('cur');
            if (self.parent().find('.js-person-info')) {
                self.parent().find('.js-person-info').remove()
            }
            ;
            person.creatSigh(self, self.attr('data-tips'));
            self.select();
        },
        check: function (self) {
            self.parent().removeClass('cur').removeClass('successed').addClass('change');
            if (self.parent().find('.js-person-info')) {
                self.parent().find('.js-person-info').remove()
            }
            ;
            person.creatSigh(self, self.attr('data-check'));
        },
        successed: function (self) {
            self.parent().removeClass('cur').removeClass('change').addClass('successed');
            if (self.parent().find('.js-person-info')) {
                self.parent().find('.js-person-info').remove()
            }
            ;
            person.creatSigh(self, '');
        }
    },
    creatSigh: function (ipt, mes) {
        var par = ipt.parent();
        par.append($('<p class="js-person-info"><i class="icon-sigh"></i> <span class="js-info">' + mes + '</span></p>'))
    },
    sex: function (ul, lis, ipt) {
        var lis = $(lis);
        ul = $(ul);
        ipt = $(ipt);
        lis.on('click', function (e) {
            for (var i = 0; i < lis.length; i++) {
                ul.removeClass(function () {
                    return lis.eq(i).attr('data-class');
                })
            }
            ul.addClass($(this).attr('data-class'));
            ipt.val($(this).attr('data-num'));
        })
    },
    local: function (ulipt, ul, lis) {
        var ipt = $(ulipt);
        ul = $(ul)
        lis = $(lis);
        iptp = $('#inputP');
        drop = $('#dropdownP');
        exampu = $('#js-person-exampu');
        exampl = $('#js-person-exampl');
        e1 =
            parm = false;
        ipt.on('focus', function (e) {
            ul.css('display', 'block');
            e.stopPropagation();
        })
        lis.on('click', function () {
            ipt.val($(this).find('p').text())
            ipt.parent().addClass('cur').addClass('successed')
        });
        $(document).on('click', function () {
            ul.css('display', 'none');
        })


        var c = new s(exampu, exampl);
        var b = new s($('#js-person-exu'), $('#js-person-exl'))

        function s(exampu, exampl) {
            exampu.hover(function () {
                exampl.css('display', 'block');
            }, function () {
                setTimeout(function () {
                    if (!parm) {
                        exampl.css('display', 'none')
                    }
                }, 200)
            });
            exampl.hover(function () {
                exampl.css('display', 'block');
                parm = true;
            }, function () {
                exampl.css('display', 'none');
                parm = false;
            });
        }
    },
    upload: function (fil, uppic) {
        var fil = $(fil);
        bg = fil.parent();
        reload = bg.find('.js-person-reload');
        sh = bg.find('.js-person-show');
        picshow = bg.find('.js-person-up');
        var fileval = fil.change(function (event) {
            var self = $(this);
            pic = self.parent().find(uppic);
            $(this).parent().addClass('cur successed');
            $(this).parent().find('.js-person-up').html('');
            if ($(this).val()) {
                var files = $(this)[0].files[0];
                var reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onload = function (e) {
                    var data = e.target.result;
                    pic.css('backgroundImage', 'url(' + data + ')');
                };
            }
            return files;
        });
        reload.on('click', function (event) {
            $(this).parent().find('input').trigger('click');
        });
    },
    upload2: function () {
        var fil = $('.js-person-up-sj');
        bg = fil.parent();
        ul = $('.js-person-upbtn-sj');

        fil.change(function (event) {
            var self = $(this);
            if ($(this).val()) {
                if ($('.js-sj-lis').length > 1) {
                    self.parent().next().find('ul').addClass('successed')
                }
                var files = $(this)[0].files[0];
                var reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onload = function (e) {
                    if ($('.js-sj-lis').length == 9) {
                        foo.alert('最多上传9张');
                        return;
                    }
                    var lis = $('<li class="js-sj-lis"><span class="js-sj-close">取消</span></li>');
                    var data = e.target.result;
                    lis.css('backgroundImage', 'url(' + data + ')');
                    ul.append(lis);
                };
            }
        });
        $('.js-person-upbtn-sj').mousemove(function () {
            $('.js-sj-close').on('click', function (el) {
                var picul = $(this).parent().parent();
                $(this).parent().remove();
                if (picul.find('li').length == 0) {
                    picul.removeClass('successed');
                }
            });
        });
    },
    send: function (mes) {
        if ($('.js-verify1').length != 0) return;
        phonenum = $('#moblie').val();
        mes = mes ? mes : $('<div class="js-verify1 animate-zoomOut"><div ><span class="js-head">验证手机</span><i class="icon-closeB"></i></div><p>已向' + phonenum + '发送验证短信</p><p><span>验证码：</span><input class="js-ipt" type="text" placeholder="请输入验证码"><span class="js-send">重新获取<span class="sec">(<b>60</b>s)<span></span></p><span class="js-sure">确定</span><span class="js-close">取消</span></div>');
        $('body').append(mes);
        var wh = document.documentElement.clientHeight;
        ww = $(document).width();
        min = 59;
        mes.css({
            top: wh / 2 - 100,
            left: ww / 2 - 250
        });
        person.resend1();
    },
    //sendphone verify in personal-11
    sendphone: function (phpar) {
        var
            phonever = $('#js-connect-phone');
        phonesend = $('#js-phone-send');
        if (phpar) {
            phonever.text('已绑定');
            phonesend.text('修改');
        } else {
            phonever.text('未绑定');
            phonesend.text('绑定');
        }
        phonesend.on('click', function () {
            sendmes()
            phoneverify();
        });

        function sendmes() {
            if ($('.js-verify1').length != 0) return;
            var mes = $('<div class="js-verify1 animate-zoomOut"><div ><span class="js-head">验证手机</span><i class="icon-closeB"></i></div><div class="js-ipt-wrp"><input id="moblie" class="js-person-ipt iptcki js-send-ipt" type="text" placeholder="请填写手机号码" data-msg="请输入正确的手机号码，并验证手机" data-tips="请填写手机号码" data-check="请输入正确的手机号" class="iptcki" data-pattern="phone" maxlength="11"></div><p><span>验证码：</span><input class="js-ipt" type="text" placeholder="请输入验证码"><span class="js-send"><span class="js-send-tip">发送短信</span></p><span class="js-sure">确定</span><span class="js-close">取消</span></div>');
            $('body').append(mes);
            var wh = document.documentElement.clientHeight;
            ww = $(document).width();
            min = 59;
            mes.css({
                top: wh / 2 - 100,
                left: ww / 2 - 250
            });
            person.resend();
        }

        function phoneverify() {
            $('.js-person-ipt.js-send-ipt').on('focus', function () {
                person.verify.cur($(this));
            });
            $('.js-person-ipt.js-send-ipt').on('keyup blur paste', function () {
                if (/1[3456789]\d{9,}/.test($(this).val())) {
                    person.verify.successed($(this))
                } else {
                    person.verify.check($(this))
                }
            })
        }
    },
    //send email verify in personal-11
    sendemail: function (mlpar) {
        var
            emailver = $('#js-connect-email');
        emailsend = $('#js-email-send');
        if (mlpar) {
            emailver.text('已绑定');
            emailsend.text('修改');
        } else {
            emailver.text('未绑定');
            emailsend.text('绑定');
        }
        emailsend.on('click', function () {
            sendmes()
            $('.icon-closeB').on('click', function () {
                $('.js-verify1').remove()
            });
            $('.js-sure').on('click', function () {
                $('.js-verify1').remove()
            });
        });

        function sendmes() {
            if ($('.js-verify1').length != 0) return;
            var mes = $('<div class="js-verify1 email animate-zoomOut"><div ><span class="js-head">验证邮箱</span><i class="icon-closeB"></i></div><p><span>邮箱：</span><input class="js-ipt" type="text" placeholder="请输入邮箱"></p><span class="js-sure">发送</span></div>');
            $('body').append(mes);
            var wh = document.documentElement.clientHeight;
            ww = $(document).width();
            min = 59;
            mes.css({
                top: wh / 2 - 100,
                left: ww / 2 - 250
            });
        }
    },
    //personal-11's uploading video
    video: function () {
        var
            upvideo = $('.js-person-video');
        upvideo.on('click', function () {
            sendmes()
            $('.icon-closeB').on('click', function () {
                $('.js-verify1').remove()
            });
            $('.js-sure').on('click', function () {
                $('.js-verify1').remove()
            });
            $('.js-close').on('click', function () {
                $('.js-verify1').remove()
            });
            bar.chg('#js-video-aul', '.js-video-alis', '#js-video-bul', '.js-video-blis', 'cur');
            person.upload2();
            check();
        });

        function sendmes() {
            if ($('#js-verify1').length != 0) return;
            var mes = $('<div class="js-verify1 video animate-zoomOut"id="js-verify1"><div class="js-move-head"><span class="js-head">多媒体介绍</span><i class="icon-closeB"></i></div><div class="headchange clearfix"><ul id="js-video-aul"><li class="item cur js-video-alis">上传图片</li><li class="item js-video-alis">上传视频</li></ul></div><div class="main"><ul id="js-video-bul"><li class="cur js-video-blis"><div class=" cki-rowbox s6 js-star"><p class="des">请上传3个及以上作品，入驻后可在作品管理上传其他作品</p><div class="iptpic-wrp"><i class="icon-add"></i><span class="img"></span><span class="upld">点击上传图片</span><input type="file"class="identity js-person-up-sj"accept="image/*"></div><div class="clear"><ul class="js-person-upbtn-sj clearfix"></ul></div></div></li><li class="video js-video-blis"><div class="websit"><span class="label">视频网址</span><input type="text"class="ipt"placeholder="请输入视频链接" id="js-video-ipt"><p class="tip">上传遇到问题？点击<a href="http://www.huakewang.com/hkwhtml/Personal-11-video.html" target="_blank" class="link"> 这里 </a>或许对你有帮助</p></div><div class="videoshow" id="js-video-show"><span class="preshow"id="js-preview">预览</span></div></li></ul></div><span class="js-sure">发送</span><span class="js-close">取消</span></div>');
            $('#js-person-video').append(mes);
            var wh = document.documentElement.clientHeight;
            ww = $(document).width();
            min = 59;
            mes.css({
                top: -100,
                left: 30,
                position: 'absolute'
            });
            $('.js-verify1').jsmove({
                head: '.js-move-head'
            });
        }

        function check() {
            var
                preview = $('#js-preview'),
                ipt = $('#js-video-ipt'),
                show = $('#js-video-show'),
                len;
            ipt.on('paste', reshow);
            ipt.on('keydown', function () {
                len = ipt.val().length;
            })
            ipt.on('keyup', function () {
                if (ipt.val().length != len) {
                    reshow();
                }
            });
            ipt.focus(function (event) {
                $(this).select();
            });

            function reshow() {
                show.html('<span class="preshow"id="js-preview">预览</span>');
                preview = $('#js-preview');
                preview.on('click', showvideo);
            }

            function showvideo() {
                var web;
                if (!ipt.val()) {
                    foo.alert('请输入视频链接')
                } else {
                    if (/iframe|embed/.test(ipt.val())) {
                        web = ipt.val().replace(/height\s?=\s?[\"\']?\d+[\'\"]?/ig, function () {
                            return 'height=400'
                        })
                        web = web.replace(/width\s?=\s?[\"\']?\d+[\'\"]?/ig, function () {
                            return 'width=685'
                        })
                        web = web.replace(/style\s?=\s?"?'?width\s?:?\d+\s?px;?[\w\s]+:[\d\s]+px;[\"\']/ig, function () {
                            return ' style="width:685px;height:400px;"'
                        });
                        if (!(/style\s?=\s?"?'?width\s?:?\d+\s?px;?[\w\s]+:[\d\s]+px;[\"\']/ig.test(web))) {
                            web.replace(/><\//gi, ' style="width:480px;height:400px;"></')
                        }
                        show.html(web)
                    } else if (/[a-zA-z]+:\/\/[^\s]*/ig.test(ipt.val())) {
                        if (/\.swf/gi.test(ipt.val()) || /http:\/\/www\.miaopai\.com.+\.htm$/gi.test(ipt.val())) {
                            web = ipt.val();
                            if (/http:\/\/www\.miaopai\.com.+\.htm$/gi.test(ipt.val())) {
                                web = /(http:\/\/www\.miaopai\.com.+\.)htm$/gi.exec(web)[1] + 'swf';
                            }
                            web = $('<object id="video"width="500"height="213"classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie"value=""><param name="quality"value="high"><param name="allowScriptAccess"value="never"><param name="allowFullScreen"value="true"><param name="flashvars"value="playMovie=true&auto=1&adss=0"><param name="wmode"value="transparent"><embed id=""width="685"height="400"wmode="transparent"type="application/x-shockwave-flash"src="' + web + '"quality="high"allowfullscreen="true"flashvars="playMovie=true&auto=1&autostart=true"pluginspage="http://get.adobe.com/cn/flashplayer/"allowscriptaccess="never"></object>');
                            show.html(web);
                        } else {
                            web = $('<iframe src="' + ipt.val() + '" frameborder="0" style="width: 685px;height: 400px"></iframe>')
                            show.html(web);
                        }
                    }
                }
            }
        }
    },
    resend: function () {
        var icb, cl, secnum;
        icb = $('.js-verify1 .icon-closeB');
        cl = $('.js-verify1 .js-close');
        par = true;
        icb.on('click', function () {
            rem();
        })
        cl.on('click', function () {
            rem();
        })
        $('.js-send').on('click', function () {
            if ($('.js-verify1 .js-ipt-wrp.successed').length == 0) {
                foo.alert('请输入正确的手机号');
                return
            }
            if ($('.js-send .sec').length == 0) {
                $(this).css('color', '#555');
                min = par ? 59 : 1;
                $('.js-send').append($('<span class="sec">(<b>60</b>s)<span>'));
                $(this).removeClass('cur');
                var dt = setInterval(function () {
                    setint(dt)
                }, 1000);
            }
        });

        function rem() {
            $('.js-verify1').remove();
        }

        function setint(dt) {
            if (min < 0 || min > 60) {
                par = par ? false : true;
                clearInterval(dt);
                $('.js-send .sec').remove();
                $('.js-send').css({
                    color: '#178eee'
                }).addClass('cur');
            }
            $('.js-send-tip').text('重新发送');
            if (par) {
                min--;
                secnum = min
            } else {
                min++;
                secnum = 60 - min
            }
            secnum = secnum <= 0 ? 0 : secnum;
            $('.js-send b').text(secnum);
        }
    },
    resend1: function () {
        var icb, cl, secnum, dt;
        icb = $('.js-verify1 .icon-closeB');
        cl = $('.js-verify1 .js-close');
        par = true;
        icb.on('click', function () {
            rem();
        })
        cl.on('click', function () {
            rem();
        })
        $('.js-sure').on('click', function () {
            $('.js-verify1').remove()
        });
        dt = setInterval(function () {
            setint(dt)
        }, 1000);
        $('.js-send').on('click', function () {
            if ($('.js-send .sec').length == 0) {
                $(this).css('color', '#555');
                min = par ? 59 : 1;
                $('.js-send').append($('<span class="sec">(<b>60</b>s)<span>'));
                $(this).removeClass('cur');
                dt = setInterval(function () {
                    setint(dt)
                }, 1000);
            }
        });

        function rem() {
            $('.js-verify1').remove();
        }

        function setint(dt) {
            if (min < 1 || min > 59) {
                par = par ? false : true;
                clearInterval(dt);
                $('.js-send .sec').remove();
                $('.js-send').css({
                    color: '#178eee'
                }).addClass('cur');
            }
            $('.js-send-tip').text('重新发送');
            if (par) {
                min--;
                secnum = min
            } else {
                min++;
                secnum = 60 - min
            }
            secnum = secnum <= 0 ? 0 : secnum;
            $('.js-send b').text(secnum);
        }
    },
    avatar: function (target, config) {
        if (!this instanceof person.avatar) return new person.avatar(target, config);
        var Target = typeof(target) === 'string' ? $(target) : target;
        Target.data('upload') ? '' : Target.data('upload', new upload(target, config));

        var bd = $('body'),
            apd, o = {},
            obj = {},
            I = {
                start: {
                    left: 0,
                    top: 0,
                    eLeft: 0,
                    eTop: 0
                },
                end: {
                    left: 0,
                    top: 0,
                    left: 0,
                    top: 0
                },
                temp: {
                    mx: 0,
                    my: 0
                },
                ismoving: false
            },
            S = {
                isScroll: false
            },
            P = {
                ratio: 0,
                moveS1: 0,
                moveS2: 0
            }

        function upload(target, config) {
            o = $.extend(true, {
                img: '',
                width: 164,
                height: 164
            }, config);
            Target.img = $(o.img);
            init();
        }

        function init() {
            upFile();
        }

        function upFile() {
            Target.on('change', function (e) {
                var upfile = $(this).parents('.js-publish-pics'),
                    file = this.files[0],
                    reader = new FileReader(),
                    data;
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    data = e.target.result;
                    fileRead(data);
                };
            });
        }

        function fileRead(data) {
            obj.apd = $('.Ojs-upload-avatar');
            // if (!obj.apd.length) {
            // 	obj.apd = $('<div class="Ojs-upload-avatar"><div class="js-mask"></div><div class="Ojs-up-wrp js-avatar-clip animate-fadeIn"><header><span class="tit">选择裁剪区域</span><i class="icon-closeB"></i></header><div class="up-main"><div class="hidbox"><div class="img-contain"><div class="Ojs-img-wrp"><img src="' + data + '" class="clip-img"></div></div><div class="img-mask"></div><div class="mask mask-t"></div><div class="mask mask-r"></div><div class="mask mask-b"></div><div class="mask mask-l"></div></div></div><div class="bottm"><span class="cancle">取消</span><span class="sure">确定</span></div></div></div>');
            // 	bd.append(obj.apd);
            // }
            obj.apd = $('.Ojs-upload-avatar');
            obj.box = $('.Ojs-up-wrp');
            obj.close = $('.icon-closeB');
            obj.cancel = obj.apd.find('.cancle');
            obj.ok = obj.apd.find('.sure');
            obj.mask = $('.js-mask');
            obj.img = $('.clip-img');
            obj.imgContain = $('.img-contain');
            obj.border = obj.apd.find('.img-mask');
            obj.contain = $('#Ojs-clip-contain');
            // obj.imgWrp = $('.Ojs-img-wrp');

            function objInit() {
                obj.box.jsmove({
                    head: 'header'
                });
                cursor(obj);
                // var stI = setInterval(function() {
                // updateImg(obj); //初始化图片参数
                // if (P.ratio) {
                // 	clearInterval(stI);
                // 	obj.apd.css('display', 'block');
                // }
                initPos(obj); //弹框位置初始化
                // initImgPos(obj); //图片位置初始化
                // imgMove(obj); // move
                // imgScale(obj);
                console.count('repeat time:');
                // }, 100);

                obj.ok[0].onclick = obj.close[0].onclick = obj.cancel[0].onclick = function () {
                    close(obj);
                }
            }

            objInit();
        }

        function initPos(obj) {
            obj.box.w = obj.box[0].offsetWidth || 440;
            obj.box.h = obj.box[0].offsetHeight || 540;
            obj.box.css({
                left: (hkglb.win.w - obj.box.w) / 2,
                top: (hkglb.win.h - obj.box.h) / 2
            });
        }

        function initImgPos(obj) {
            if (P.ratio > 1) {
                obj.img.width = 252;
                obj.img.height = 252 * P.ratio;
                obj.img.top = 54 - (obj.img.height - 252) / 2;
                obj.img.left = 54;
            } else {
                obj.img.height = 252;
                obj.img.width = 252 / P.ratio;
                obj.img.left = 54 - (obj.img.width - 252) / 2;
                obj.img.top = 54;
            }
            ;
            obj.img.css({
                top: obj.img.top,
                left: obj.img.left,
                width: obj.img.width,
                height: obj.img.height
            });
        }

        function close(obj) {
            obj.box.removeClass('animate-fadeIn').addClass('animate-fadeOutUp');
            obj.mask.fadeOut();
            setTimeout(function () {
                obj.box.removeClass('animate-fadeOutUp').addClass('animate-fadeIn');
                // obj.apd.remove();
                obj.apd.css('display', 'none');
                obj.mask.fadeIn();
            }, 400);
        }

        function imgMove(obj) {
            obj.border.on('mousedown', function (e) {
                e.preventDefault();
                obj.border.addClass('moving');
                I.ismoving = true;
                I.start = {
                    left: parseFloat(obj.img.css('left')),
                    top: parseFloat(obj.img.css('top')),
                    eLeft: e.clientX,
                    eTop: e.clientY
                }
            });
            $(window).on('mousemove', function (e) {
                if (I.ismoving) {
                    e.preventDefault();
                    I.end.eLeft = e.clientX;
                    I.end.eTop = e.clientY;
                    I.temp.mx = I.end.eLeft - I.start.eLeft;
                    I.temp.my = I.end.eTop - I.start.eTop;
                    obj.img.css({
                        left: I.start.left + I.temp.mx,
                        top: I.start.top + I.temp.my
                    });
                }
            })
            $(window).on('mouseup', function (e) {
                if (I.ismoving) {
                    e.preventDefault();
                    obj.border.removeClass('moving');
                    I.temp = {
                        mx: 0,
                        my: 0
                    };
                    I.end.left = parseFloat(obj.img.css('left'));
                    I.end.top = parseFloat(obj.img.css('top'));
                }
                I.ismoving = false;
                endPosition(obj);
            })

            function endPosition(obj) {
                if (I.end.left > 54) {
                    if (I.end.top > 54) {
                        P.moveS1 = 1; //左 上
                    } else {
                        P.moveS1 = 2; //左
                    }
                } else if (I.end.top > 54) {
                    P.moveS1 = 3; //上
                } else {
                    P.moveS1 = 0;
                }
                if (I.end.left + obj.img.width < 306) {
                    if (I.end.top + obj.img.height < 306) {
                        P.moveS2 = 1;
                    } else {
                        P.moveS2 = 2;
                    }
                } else if (I.end.top + obj.img.height < 306) {
                    P.moveS2 = 3;
                } else {
                    P.moveS2 = 0;
                }
                console.log(P.moveS1, P.moveS2);
                obj.img.animate({
                    top: (function () {
                        if (P.moveS1 == 1 || P.moveS1 == 3) {
                            console.log('test1');
                            return 54
                        } else if (P.moveS2 == 1 || P.moveS2 == 3) {
                            console.log(306 - obj.img.height, 'test2');
                            return (306 - obj.img.height)
                        } else {
                            console.log('test3');
                            return obj.img.top
                        }
                    })(),
                    left: (function () {
                        if (P.moveS1 == 1 || P.moveS1 == 2) {
                            return 54
                        } else if (P.moveS2 == 1 || P.moveS2 == 2) {
                            return (306 - obj.img.width)
                        } else {
                            return obj.img.left
                        }
                    })()
                }, 200, 'backout')
                updateImg(obj);
            }
        }

        function imgScale(obj) {
            var delta, scale;
            obj.border.on('mousewheel DOMMouseScroll', function (e) {
                delta = -e.originalEvent.detail || -e.originalEvent.deltaY || e.wheelDelta;
                scale = /none/.test(obj.img.css('transform')) ? 1 : /matrix\(([\d.]+)/gi.exec(obj.img.css('transform'))[1];
                e.preventDefault();
                delta > 0 ? big() : small();
                updateImg(obj);

                function big() {
                    var imgW = $(obj.img).width(),
                        imgH = $(obj.img).height();
                    obj.img.animate({
                        width: imgW + 50,
                        height: imgH + 50
                    });
                }

                function small() {
                    if (S.isScroll) return;
                    var temp, imgW = $(obj.img).width(),
                        imgH = $(obj.img).height();
                    if (P.ratio > 1) {
                        imgW = imgW - 50 >= 250 ? (function () {
                            imgH -= 50;
                            return (imgW - 50)
                        })() : (function () {
                            temp = imgW - 250;
                            imgH = imgH - temp * P.ratio;
                            return 250;
                        })();
                    } else {
                        imgH = imgH - 50 >= 250 ? (function () {
                            imgW -= 50;
                            return (imgH - 50)
                        })() : (function () {
                            temp = imgH - 250;
                            imgW = imgW - temp / P.ratio;
                            return 250;
                        })
                    }
                    obj.img.animate({
                        width: imgW,
                        height: imgH
                    }, 200);
                    S.isScroll = true;
                    setTimeout(function () {
                        S.isScroll = false;
                    }, 200);
                }
            });
        }

        function cursor(obj) {
            var moving = false;
            obj.contain.on('mousedown', function (e) {
                e.preventDefault();
                $(this).addClass('moving');
                moving = true;
            });
            $(window).on('mouseup', function (e) {
                e.preventDefault();
                if (moving) {
                    obj.contain.removeClass('moving');
                    moving = false;
                }
            });

        }

        function updateImg(obj) {
            obj.img.left = I.end.left;
            obj.img.top = I.end.top;
            obj.img.width = obj.img[0].offsetWidth;
            obj.img.height = obj.img[0].offsetHeight;
            obj.img.Width = obj.img[0].naturalWidth;
            obj.img.Height = obj.img[0].naturalHeight;
            P.ratio = obj.img.Height / obj.img.Width;
        }
    },
    init: function () {
        if ($('.checkin')) {
            person.enter();
            person.iptinfo();
            person.sex('#js-person-sex', '.js-person-sex', '#js-sex');
            person.local('#input-TS', '#js-person-locals', '.js-person-locals');
            person.upload('.js-person-upbtn', '.js-person-up');
            person.upload2();
            person.video();
        }
        ;
        var nm = 10;
        var st = setInterval(function () {
            $('#Ojs-person-avatar').length && person.avatar('#Ojs-upload-avater', {
                img: '.Ojs-person-avatar'
            });
            if (!--nm) clearInterval(st);
        }, 100);
    }
};
var mixed = {
    upload: function () {
        var
            mark = $('.div_2_c.div_2_c_but1');
        if (mark.length == 0 || mark.data('upload')) return;
        mark.data('upload', true)
        var wrp = $('.div_2_c.div_2_c_but1'),
            btn = $('#batch_image_upload'),
            que = $('#batch_upload_file_queue');
        wrp.append($('<div class="js-progress"></div>'));
        var pgs = $('.js-progress'),
            st, st2, par = true,
            temnum, temnum2, par2 = false;
        nm = 0;
        btn.click(function () {
            par2 = true;
            try {
                temnum = $('.previewTemplate').children().length;
                if (temnum == undefined) {
                    temnum = 0
                }
            } catch (e) {
            }
            st = setInterval(function () {
                if (que.children().length != 0 && par && nm == 0) {
                    pgs.css({
                        width: 0,
                        display: 'block'
                    });
                    par = false;
                    s1();
                    nm = 4;
                    var nmst = setInterval(function () {
                        nm--
                        if (nm <= 0) {
                            nm = 0;
                            clearInterval(nmst)
                        }
                    }, 1000)
                    st2 = setInterval(function () {
                        try {
                            temnum2 = $('.previewTemplate').children().length;
                        } catch (e) {
                        }
                        if (temnum2 != temnum) {
                            clearInterval(st2)
                            s2();
                        }
                    }, 200)
                }
            }, 200)
        });

        function s1() {
            if (!par2) return;
            pgs.stop().animate({
                width: '20%'
            }, 300, function () {
                pgs.animate({
                    width: '100%'
                }, 3000)
            })
        }

        function s2() {
            pgs.stop().animate({
                width: '100%'
            }, 300, function () {
                pgs.css({
                    'width': 0,
                    'display': 'none'
                });
                par = true;
                par2 = true;
            })
        }
    },
    login: function () {
        var _regfd = new regfd();
        $('.register.ps').length && (_regfd.init());
        $('.register.find').length && (function () {
            _regfd.init2();
        })()

        function regfd() {
            var stp = $('li.stp'),
                nxt = $('.nextstp p'),
                _lis = $('.js-login-ipt'),
                _inpts = _lis.find('input'),
                tmp = {},
                ofs = {},
                ver = [];
            _change = $('.js-change-icon');
            ofs.mes = {};
            ofs.mes2 = {}, ofs.mes3 = {};
            for (var i = 0; i < _lis.length; i++) {
                ver[i] = 0;
            }

            var init = function () {
                eachlis();
                changeEye();
                nxtStep();
                an();
                sendcode(ajaxph);
                vercode();
                phoneipt(_lis.eq(0).find('input'));
                _nxt();
            };

            var init2 = function () {
                var phipt = $('.js-phone-ipt');
                fpeachlis();
                changeWay();
                phoneipt(phipt);
                vercode();
                _nxt();
                fpnxt();
            }

            function changeWay() {
                var tt = $('.register header dd'),
                    ways = $('.register .js-ftps-stp .item');
                tt.each(function (index, el) {
                    $(el).on('click', function (e) {
                        ofs.way = index;
                        $(el).addClass('cur').siblings().removeClass('cur');
                        ways.removeClass('cur');
                        ways.eq(index).addClass('cur');
                    });
                });
            }

            function fpnxt() {
                var nxtbtn = $('.register .nextstp'),
                    fd = $('.fcontain'),
                    nxttm = 0;
                cont = '<ul><li class="stp stp2 iptbox js-login-ipt cur"><i class="icon-save"></i><input type="text"placeholder="请输入验证码" class="js-get-verify" data-type="code"><div class="code"><svg width="102"height="30"><path stroke-width="2"stroke="#0096ff"d="M13 2L89 2A40 20 0 0 1 89 28L13 28 A40 20 0 0 1 13 2"fill="transparent"/></svg><span class="js-sendcode">获取验证码</span></div></li><li class="stp stp3 iptbox js-login-ipt cur"><i class="icon-lock"></i><input type="text"placeholder="设置密码" class="js-get-password" data-type="password"><i class="icon-show js-change-icon"></i></li></ul>';
                nxtbtn.on('click', function (e) {
                    if (!nxttm) {
                        var mes1 = mess(ofs.mes),
                            mes2 = mess(ofs.mes2);
                        if (!ofs.way) {
                            if (mes1) {
                                foo.alert(mes1);
                                return false;
                            }
                        } else {
                            if (mes2) {
                                foo.alert(mes2);
                                return false;
                            }
                        }
                        ;
                        fd.html(cont);
                        nxttm = 1;
                        $(this).children().text('确认并登陆');
                        changeEye();
                        setTimeout(function () {
                            var lis = $('.js-login-ipt'),
                                ipts = lis.find('input');
                            ipts.on('keypress', function (e) {
                                if (e.keyCode == 13) {
                                    nxtbtn.trigger('click');
                                }
                            });
                            lis.each(function (index, el) {
                                var ipt = el.getElementsByTagName('input');
                                fsnxt2($(ipt));
                                $(el).append($('<span class="js-roll"></span>'));
                            });

                            ipts.on('focus input blur', function (e) {
                                var _self = $(this);
                                fsnxt2(_self);
                                mes3 = mess(ofs.mes3);
                            });
                            sendcode(ajaxpsph)
                        }, 100)
                    } else {
                        var username = $('.js-phone-ipt').val(),
                            getvf = $('.js-get-verify').val(),
                            getpsd = $('.js-get-password').val();
                        mes3 = mess(ofs.mes3);
                        if (mes3) {
                            foo.alert(mes3);
                            return false;
                        }

                        if (!ofs.way) {
                            ajaxvfpsd()
                        } else {
                            ajaxemps()
                        }

                        function ajaxemps() {
                            $.post('https://www.huakewang.com/index.php/user/forget', {
                                username: username,
                                passwd: getpsd,
                                login_type: 1,
                                code: getvf,
                                agreement: true
                            }, function (res) {
                                if (res.success) {
                                    if (res.message.trim()) foo.alert(res.message);
                                    location.href = 'https://www.huakewang.com';
                                } else {
                                    if (res.message.trim()) foo.alert(res.message);
                                }
                            }, "json");
                        }

                        function ajaxvfpsd() {
                            $.post('https://www.huakewang.com/index.php/user/forget', {
                                username: username,
                                passwd: getpsd,
                                login_type: 0,
                                code: getvf,
                                agreement: true
                            }, function (res) {
                                if (res.success) {
                                    if (res.message.trim()) foo.alert(res.message);
                                    location.href = 'https://www.huakewang.com';
                                } else {
                                    if (res.message.trim()) foo.alert(res.message);
                                }
                            }, "json");
                        }
                    }
                });

                function fsnxt2(el) {
                    var type = $(el).attr('data-type');
                    lis = $(el).parents('.js-login-ipt');
                    switch (type) {
                        case 'code':
                            var vl = el.val();
                            if (!vl) {
                                ofs.mes3.code = "请输入验证码";
                                return
                            }
                            ;
                            vl.length >= 4 ? (function () {
                                lis.addClass('success');
                                ofs.mes3.code = null;
                            })() : (function () {
                                lis.removeClass('success');
                                ofs.mes3.code = "请输入正确的验证码";
                            })()
                            break;
                        case 'password':
                            var vl = el.val();
                            if (!vl) {
                                ofs.mes3.password = "请输入密码";
                                return
                            }
                            ;
                            vl.length >= 6 ? (function () {
                                lis.addClass('success');
                                ofs.mes3.password = null;
                            })() : (function () {
                                lis.removeClass('success');
                                ofs.mes3.password = "请输入长度6～16位数字、字母，可以使用特殊符号，字母区分大小写";
                            })();
                            break;
                    }
                }
            }

            function mess(mes) {
                for (var i in mes) {
                    if (mes[i]) {
                        return mes[i];
                    }
                }
            }

            function eachlis() {
                _lis.length && _lis.each(function (index, el) {
                    var ipt = el.getElementsByTagName('input');
                    _veri(index, el, ipt);
                    $(el).append($('<span class="js-roll"></span>'));
                    $(ipt).on('focus input blur', function (e) {
                        var _self = this;
                        _veri(index, el, ipt);
                    });
                });
            }

            function fpeachlis() {
                _lis.length && _lis.each(function (index, el) {
                    var ipt = el.getElementsByTagName('input');
                    fsnxt1($(ipt));
                    $(el).append($('<span class="js-roll"></span>'));
                    $(ipt).on('focus input blur', function (e) {
                        var _self = $(this);
                        fsnxt1(_self);
                    });
                });
            }

            function fsnxt1(el) {
                var type = $(el).attr('data-type'),
                    lis = $(el).parents('.js-login-ipt');
                switch (type) {
                    case "phone":
                        var vl = el.val(),
                            arr = String(vl).split(''),
                            nums = arr.filter(function (elem) {
                                if (!isNaN(elem)) return 1;
                            });
                        if (!vl) {
                            ofs.mes.phone = "请输入手机号";
                            return
                        }
                        ;
                        nums = nums.join('');
                        /1[3456789]\d{9}/gi.test(nums) ? (function () {
                            lis.addClass('success');
                            ofs.mes.phone = null;
                        })() : (function () {
                            lis.removeClass('success');
                            ofs.mes.phone = "请输入正确的手机号";
                        })()
                        break;
                    case "verify":
                        var zz = new RegExp($('.verify').text(), 'i');
                        if (!$('.verify').prev().val()) {
                            ofs.mes.verify = "请输入验证码";
                            return;
                        }
                        zz.test($('.verify').prev().val()) ? (function () {
                            lis.addClass('success');
                            ofs.mes.verify = null;
                        })() : (function () {
                            lis.removeClass('success');
                            ofs.mes.verify = "请输入正确的验证码"
                        })()
                        break;
                    case "email":
                        var vl = el.val();
                        if (!vl) {
                            ofs.mes2.email = "请输入邮箱地址";
                            return;
                        }
                        ;
                        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(vl) ? (function () {
                            lis.addClass('success');
                            ofs.mes2.email = null;
                        })() : (function () {
                            lis.removeClass('success');
                            ofs.mes2.email = "请输入了正确的邮箱地址"
                        })()
                        break;
                }
            }

            function changeEye() {
                var _change = $('.js-change-icon');
                _change.length && _change.on('click', function (e) {
                    $(this).hasClass('icon-hidden') ? $(this).removeClass('icon-hidden').addClass('icon-show').prev().attr('type', 'text') : $(this).removeClass('icon-show').addClass('icon-hidden').prev().attr('type', 'password');
                });
            }

            function nxtStep() {
                nxt.length && nxt.on('click', function (event) {
                    var nm = returnI();
                    switch (nm) {
                        case 0:
                            if (!_lis.eq(0).find('input').val()) {
                                foo.alert('请输入手机号');
                                _lis.eq(0).find('input').focus();
                                return;
                            } else {
                                if (!ver[0]) {
                                    _lis.eq(0).find('input').focus();
                                    if (!ver[1]) {
                                        foo.alert('信息没有填写完整哦！');
                                        return;
                                    }
                                    foo.alert('手机填写不完整！');
                                    return;
                                }
                                ;
                                if (!_lis.eq(1).find('input').val()) {
                                    _lis.eq(1).find('input').focus();
                                    foo.alert('请输入验证码!');
                                    return;

                                } else if (!ver[1]) {
                                    _lis.eq(1).find('input').focus();
                                    var zz = new RegExp($('.verify').text(), 'i');
                                    zz.test($('.verify').prev().val())
                                    foo.alert('验证码不正确!');
                                    return;
                                }
                            }
                            stp.eq(nm).removeClass('cur').next().addClass('cur');
                            _inpts.eq(2).focus();
                            break;
                        case 1:
                            _lis.eq(2).find('input').focus();
                            if (!tmp.a) {
                                foo.alert('请先获取验证码');
                                return;
                            }
                            if (!_lis.eq(2).find('input').val()) {
                                foo.alert('请输入验证码!');
                                return;
                            } else if (!ver[2]) {
                                foo.alert('验证码不正确!');
                                return;
                            }
                            ;
                            ajaxcode(fns2);

                        function fns2() {
                            stp.eq(nm).removeClass('cur').next().addClass('cur');
                            $(this).text('注册并登陆');
                            $('.js-hdtxt').css('display', 'block');
                            _inpts.eq(3).focus();
                        }

                            break;
                        case 2:
                            var pswdipt = _lis.eq(3).find('input'),
                                pswdvl = pswdipt.val();
                            pswdipt.focus();
                            if (!pswdvl) {
                                foo.alert('请输入长度6～16位数字、字母，可以使用特殊符号，字母区分大小写');
                                return;
                            }
                            if (pswdvl.length < 6) {
                                foo.alert('请输入长度6～16位数字、字母，可以使用特殊符号，字母区分大小写');
                                return;
                            }
                            ajaxpswd();
                            break;
                    }
                });
            }

            function an() {
                var friendlk = $('.js-link');
                for (var i = 0; i < friendlk.length; i++) {
                    friendlk.eq(i).delay(400 + 300 * i);
                }
                friendlk.animate({
                    top: 0,
                    opacity: 1
                }, 500, 'backout');
            }

            var returnI = function () {
                var idx;
                stp.each(function (index, el) {
                    $(el).hasClass('cur') && (idx = index);
                });
                return idx
            }

            function sendcode(fn) {
                var sending = false,
                    sdcd = $('.js-sendcode'),
                    pa = sdcd.parent(),
                    svg = pa.find('svg');
                sdcd.on('click', function (e) {
                    var _self = $(this);
                    if (sending) return;
                    fn(dntm);

                    function dntm() {
                        sending = true;
                        tmp.a = true;
                        _self.html('<span class="js-time">60</span>S');
                        svg.css('z-index', '2');
                        pa.addClass('sending');
                        var tm = $('.js-time'),
                            tmnm = 60
                        var sti = setInterval(function () {
                            --tmnm;
                            tmnm > 0 ? tm.text(tmnm) : (function () {
                                clearInterval(sti);
                                sdcd.text('获取验证码');
                                pa.removeClass('sending');
                                svg.css('z-index', '0');
                                sending = false;
                            })();
                        }, 1000)
                    }
                });
            }

            function _veri(index, el, ipt) {
                switch (index) {
                    case 0:
                        var vl = $(ipt).val(),
                            arr = String(vl).split(''),
                            nums = arr.filter(function (el) {
                                if (!isNaN(el)) return 1;
                            });
                        nums = nums.join('');
                        /1[3456789]\d{9}/gi.test(nums) ? (function () {
                            $.post('https://www.huakewang.com/index.php/user/account_verification.html', {
                                'username': nums
                            }, function (data, textStatus, xhr) {
                                if (!data.success) {
                                    if ($(ipt).data('alerted')) return false;
                                    $(ipt).data('alerted', true);
                                    $(el).addClass('fail').append($('<small class="alert"><i class="icon-sigh"></i>该号码已经注册</small>'))
                                } else {
                                    $(el).addClass('success').removeClass('fail');
                                    localStorage.setItem('user-phone', nums)
                                    $('small.alert').remove();
                                    ver[index] = !0;
                                }
                            }, 'json');
                        })() : (function () {
                            $(el).removeClass('success');
                            $(ipt).data('alerted', false);
                            ver[index] = 0;
                        })()
                        break;
                    case 1:
                        var zz = new RegExp($('.verify').text(), 'i');
                        zz.test($('.verify').prev().val()) ? (function () {
                            $(el).addClass('success');
                            ver[index] = !0;
                        })() : (function () {
                            $(el).removeClass('success');
                            ver[index] = 0;
                        })()
                        break;
                    case 2:
                        $(ipt).val().length >= 4 ? (function () {
                            $(el).addClass('success');
                            ver[index] = !0;
                        })() : (function () {
                            $(el).removeClass('success');
                            ver[index] = 0;
                        })()
                        break;
                    case 3:
                        $(ipt).val().length >= 6 ? (function () {
                            $(el).addClass('success');
                            ver[index] = !0;
                        })() : (function () {
                            $(el).removeClass('success');
                            ver[index] = 0;
                        })()
                        break;
                }
            };

            function vercode() {
                var vf = $('.js-verify');
                arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                vf.on('click', function (event) {
                    ver();
                });
                ver();

                function rand() {
                    var len = arr.length;
                    return Math.floor(Math.random() * len)
                }

                function ver() {
                    var spar = [];
                    spar[0] = arr[rand()];
                    spar.push.call(spar, arr[rand()], arr[rand()], arr[rand()]);
                    spar = spar.join('');
                    vf.text(spar);
                }
            };

            var ajaxph = function (fn1, fn2) {
                var phnum = rtnm(_inpts.eq(0).val());
                $.post("https://www.huakewang.com/index.php/user/send_verify_code.html", {
                        "mobile": phnum,
                        "type": 'reg',
                        "tokeen": 1234165
                    },
                    function (res) {
                        if (res.success) {
                            if (res.message.trim()) foo.alert(res.message);
                            if (fn1) {
                                fn1()
                            }
                            ;
                            return false;
                        } else {
                            if (res.message.trim()) foo.alert(res.message);
                            if (fn2) {
                                fn2()
                            }
                            ;
                            return false;
                        }
                    },
                    "json"
                );
            };

            var ajaxpsph = function (fn1, fn2) {
                var phnum = rtnm(_inpts.eq(0).val());
                $.post("https://www.huakewang.com/index.php/user/send_verify_code.html", {
                        "mobile": phnum,
                        "type": 'forget',
                        "tokeen": 1234165
                    },
                    function (res) {
                        if (res.success) {
                            if (res.message.trim()) foo.alert(res.message);
                            if (fn1) {
                                fn1()
                            }
                            ;
                            return false;
                        } else {
                            if (res.message.trim()) foo.alert(res.message);
                            if (fn2) {
                                fn2()
                            }
                            ;
                            return false;
                        }
                    },
                    "json"
                );
            };

            var ajaxcode = function (fn1, fn2) {
                var phnum = rtnm(_inpts.eq(0).val()),
                    code = _inpts.eq(2).val();
                $.post("https://www.huakewang.com/index.php/user/verif_code", {
                        "username": phnum,
                        "code": code
                    },
                    function (res) {
                        if (res.success) {
                            if (res.message.trim()) foo.alert(res.message);
                            if (fn1) {
                                fn1()
                            }
                            ;
                            return false;
                        } else {
                            if (res.message.trim()) foo.alert(res.message);
                            if (fn2) {
                                fn2()
                            }
                            ;
                            return false;
                        }
                    },
                    "json"
                );
            }
            //注册并登陆
            var ajaxpswd = function (fn1, fn2) {
                var phnum = rtnm(_inpts.eq(0).val()),
                    pswd = _inpts.eq(3).val(),
                    code = _inpts.eq(2).val();
                $.post("https://www.huakewang.com/index.php/user/reg", {
                        "username": phnum,
                        "passwd": pswd,
                        "login_type": 0,
                        "code": code,
                        "agreement": true
                    },
                    function (res) {
                        if (res.success) {
                            if (res.message.trim()) foo.alert(res.message);
                            location.href = 'https://www.huakewang.com/user/card';
                            return false;
                        } else {
                            if (res.message.trim()) foo.alert(res.message);
                            if (fn2) {
                                fn2()
                            }
                            ;
                            return false;
                        }
                    },
                    "json"
                );
            }

            function _nxt() {
                var _phipt = _lis.eq(0).find('input');
                _phipt.on('focus input blur', function (event) {
                    phoneipt(this);
                });
                _inpts.on('keypress', function (e) {
                    if (e.keyCode == 13) {
                        nxt.trigger('click');
                    }
                });
            }

            function phoneipt(el) {
                var vl = $(el).val(),
                    arr = String(vl).split(''),
                    nums = arr.filter(function (el) {
                        if (!isNaN(el)) return 1;
                    });
                nums = nums.join('');
                var len = nums.length;
                if (len > 3) {
                    nums = nums.slice(0, 3) + '-' + nums.slice(3);
                    if (len >= 8) {
                        nums = nums.slice(0, 8) + '-' + nums.slice(8);
                    }
                }
                $(el).val(nums);
            };

            function rtnm(nm) {
                nm = String(nm).split('').filter(function (el) {
                    if (!isNaN(el)) return 1;
                });
                nm = nm.join('');
                return nm;
            }

            this.init2 = init2;
            this._nxt = _nxt;
            this.init = init;
            this.vercode = vercode;
            this.phoneipt = phoneipt;
            this._nxt = _nxt;
            return this;
        };
    },
    card: function () {
        var txt1 = $('.js-txt');
        this.init = function () {
            reted();
        }

        function reted() {
            var hv = !1,
                fc = !1,
                showi = 0,
                alul = $('.ul'),
                ali = $('.js-icon');
            txt1.each(function (index, el) {
                var ul = $(el).parents('.ul'),
                    li = ul.parents('.card-box'),
                    i = li.find('.js-icon'),
                    _self = $(this),
                    ipt = ul.find('input'),
                    _sure = ul.find('.js-sure'),
                    ipts = ul.find('.js-ipt-val'),
                    sli = ul.find('li');

                $(el).mouseenter(function (e) {
                    hv = !0;
                    if (fc) return;
                    show();
                });
                ul.mouseleave(function (e) {
                    hv = !1;
                    fc || hid();
                });

                $(el).on('click', function (e) {
                    alul.css('transform', 'translate(-50%)');
                    ali.css('color', '#555');
                    show()
                });

                try {
                    ipt.on('focus', function (e) {
                        fc = !0;
                        return false;
                    });
                } catch (e) {
                }

                index == 0 && (function () {
                    var slt = li.find('select'),
                        ops = slt.find('option');
                    slt.on('click', function (e) {
                        fc = !0;
                        return false;
                    });
                })();

                $(document).on('click', function (e) {
                    $(e.target).find('.fixed-wid').length && (function () {
                        fc = !1;
                        hid();
                    })();
                });

                _sure.on('click', function (e) {
                    afs();
                    var edt = ul.find('.js-modify');
                    if (edt.length) {
                        edt.on('click', function (e) {
                            alul.css('transform', 'translate(-50%)');
                            ali.css('color', '#555');
                            show();
                            fc = !0;
                        });
                    }
                });

                function afs() {
                    switch (index) {
                        case 0:
                            var vl1 = ipts.val(),
                                vl2 = ul.find('select option:selected').text();

                            if (!vl1.length) {
                                foo.alert('请输入昵称');
                                return
                            }
                            if (!vl2.length) {
                                foo.alert('请输入工作年限');
                                return
                            }
                            var sp = $('<span class="pin pin1">' + vl1 + '</span><span class="pin pin2">' + vl2 + '</span><span class="js-modify"><i class="icon-modify"></i>修改</span>');
                            sli.eq(1).html(sp);
                            hid();
                            fc = !1;
                            break;
                        case 1:
                            var vl = ipts.map(function (index, el) {
                                return $(el).val();
                            });
                            if (!vl[0] && !vl[1]) {
                                foo.alert('请输入内容');
                                return
                            }
                            var sp = $('<span class="pin pin1">' + vl[0] + '</span><span class="pin pin2">' + vl[1] + '</span><span class="js-modify"><i class="icon-modify"></i>修改</span>');
                            sli.eq(1).html(sp);
                            hid();
                            fc = !1;
                            break;
                        case 2:
                            var vl = ul.find('select option:selected').text();
                            vl = vl + ul.find('.js-ipt-val').eq(2).val();
                            if (!vl) {
                                foo.alert('请输入内容');
                                return
                            }
                            var sp = $('<span class="pin3">' + vl + '</span><span class="js-modify"><i class="icon-modify"></i>修改</span>');
                            sli.eq(1).html(sp);
                            hid();
                            fc = !1;
                            break;
                        case 3:
                            var vl = ul.find('.js-ipt-val').val();
                            if (!vl) {
                                foo.alert('请输入内容');
                                return
                            }
                            if (/[^\d]/.test(vl)) {
                                foo.alert('请输入正确的QQ号');
                                return
                            }
                            var sp = $('<span class="pin3">' + vl + '</span><span class="js-modify"><i class="icon-modify"></i>修改</span>');
                            sli.eq(1).html(sp);
                            hid();
                            fc = !1;
                            break;
                    }
                }

                function show() {
                    ul.css('transform', 'translate(0)');
                    i.css('color', '#0096ff');
                    showi = index;
                }

                function hid() {
                    ul.css('transform', 'translate(-50%)');
                    i.css('color', '#555');
                }

            });
        }

        var _fn = new reted;
        return _fn;
    },
    bindphone: function () {
        var _self = this,
            code = $('.js-bindphone-code'),
            bindipt = $('.js-bind-ipt'),
            codeipt = $('.bindcode'),
            pswd = $('.js-bindphone-password'),
            step = $('.js-bindphone-send'),
            phitp = $('.js-bindphone-phone');
        $(window).on('load', function (e) {
            // var username = localStorage['user-phone'] || _self.getCookie('user_username');
            var username = localStorage['user-phone'];
            if (username.length) {
                phitp.val(username)
            }
            ;
            phoneinput(phitp);
            codeinput(codeipt);
            passwordinput(pswd);
        });

        step.on('click', function (e) {
            var info = alertinfo();
            if (info) {
                foo.alert(info);
                return
            }
            var phnum = phitp.val(),
                password = pswd.val(),
                code = codeipt.val();
            _self.ajaxpswd({
                phnum: phnum,
                pswd: password,
                code: code
            })
        });

        phitp.on('input focus blur', function () {
            phoneinput($(this));
        });
        codeipt.on('input focus blur', function () {
            codeinput($(this));
        });
        pswd.on('input focus blur', function () {
            passwordinput($(this));
        });

        function phoneinput(target) {
            if (/1[3456789]\d{9}/i.test(target.val())) {
                target.addClass('success');
                target.data('alert', '');
                localStorage.setItem('user-phone', target.val());
            } else if (!target.val()) {
                target.data('alert', '请输入手机号码')
            } else {
                target.removeClass('success');
                target.data('alert', '请输入正确的手机号码')
            }
        }

        function codeinput(target) {
            if (target.val().length == 4) {
                target.addClass('success');
                target.data('alert', '')
            } else if (!target.val()) {
                target.data('alert', '请输入验证')
            } else {
                target.removeClass('success');
                target.data('alert', '请输入正确的验证')
            }
        }

        function passwordinput(target) {
            var psd = target.val().length;
            if (psd >= 6 && psd <= 16) {
                target.addClass('success');
                target.data('alert', '')
            } else if (!psd) {
                target.data('alert', '请输入密码')
            } else {
                target.removeClass('success');
                target.data('alert', '请输入长度6～16位数字、字母，可以使用特殊符号，字母区分大小写')
            }
        }

        function alertinfo() {
            var a = $.map(bindipt, function (item, index) {
                return $(item).data('alert');
            });
            var alert = a[0] || a[1] || a[2]
            return alert;
        }

        _self.sendcode({
            target: code,
            fn: _self.ajaxcode,
            par: {
                phnum: phitp
            }
        })

        function setphone(vl) {
            localStorage.setItem('user-phone', vl);
        }
    },
    video: function () {
        if (!$('.js-publish-video').length) return;

        var vidipt = $('.js-ipt-web'),
            allwrp = $('.js-publish-videow');
        $('.js-publish-video').on('click', function (e) {
            if (!vidipt.val()) {
                foo.alert('请输入视频的网址!');
                return;
            } else if (!/http:\/\/v\.youku\.com\/v_show/gi.test(vidipt.val())) {
                foo.alert('请输入正确的优酷网站地址');
                return;
            }

            var web = $('.js-vide .web').map(function (idx, el) {
                return ($(el).text() && /http:\/\/v\.youku\.com\/v_show\/id_(.+).html/gi.exec($(el).text())[1] || false);
            });
            if (web.length) {
                for (var i = 0; i < web.length; i++) {
                    var reg = new RegExp(web[i], 'i');
                    if (reg.test(vidipt.val())) {
                        foo.alert('该视频已导入');
                        return;
                    }
                }
            }

            allwrp.append($('<div class="js-vide"><i class="icon-play" title="点击播放"> </i><span class="web">' + vidipt.val() + '</span><span class="fl-rt"><span class="info">视频已导入！</span><i class="icon-close" title="取消"></i></span></div>'));

            vmove('.icon-close', '.js-vide');
            var py = $('.icon-play');
            py.on('click', function (e) {
                var vid = /http:\/\/v\.youku\.com\/v_show\/id_(.+).html/gi.exec(vidipt.val())[1];
                var apd = $('<div class="js-publish-video-u"><div class="js-mask"></div><div class="js-video"><div class="header"><span>视频预览</span><i class="icon-closeB"></i></div><div class="js-video-main"><embed src="http://player.youku.com/player.php/sid/' + vid + '/v.swf" allowFullScreen="true" quality="high" width="600" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed></div></div></div>');
                $('body').append(apd);
                $('.js-video').jsmove({
                    head: '.header'
                })

                close();

                function close() {
                    $('.js-publish-video-u .icon-closeB').on('click', function () {
                        $('.js-video').addClass('animate-fadeUp');
                        $('.js-mask').animate({
                            opacity: 0
                        }, 400);
                        setTimeout(function () {
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
            cls.on('click', function () {
                $(this).parents(par).remove();
            });
        }
    },
    uploadpic: function (config) {
        var o = {
            apd: ''
        }
        $.extend(o, config);
        if (!$('.js-upload-pic').length) return;
        var _self = this,
            coverbtn = $('.js-upload-pic2'),
            covertarget = $('.js-publish-cover');

        coverbtn.change(function (e) {
            covertarget.addClass('cur')
            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result,
                    img = covertarget.find('img');
                if (img.length) {
                    img[0].src = dataURL
                } else {
                    img = new images();
                    img.src = dataURL;
                    covertarget.append(img)
                }
            };
            reader.readAsDataURL(coverbtn[0].files[0]);
        });

        var picbtn = $('.js-upload-pic'),
            picshow = $('.pics-show'),
            coveript = $('#hid-cover'),
            setcover = $('.js-publis-iconA');
        //
        picbtn.change(function (e) {
            var apd = o.apd || $('<li class="div_2_c_2 js-upload-lis"><div class="picwrp div_2_c_1_1"><img src="" alt=""><div class="hover"><span class="pic-txt animate-slideLeft js-publis-iconA" title="点击设为封面"><i class="icon-cover" >&#xe652;</i><span class="txt-cover txt">封面</span></span><span class="pic-txt animate-moveUp js-publis-iconB" title="点击向上移动"><i class="icon-move-top">&#xe64c;</i><span class="txt-down txt">下移</span></span><span class="pic-txt animate-moveDown js-publis-iconC" title="点击向下移动"><i class="icon-move-down">&#xe64d;</i><span class="txt-up txt">上移</span></span><span class="pic-txt animate-slideRight js-publis-iconD" title="点击取消"><i class="icon-closeBb">&#xe600;</i><span class="txt-close txt">取消</span></span></div></div><div class="div_2_c_1_2 textarea"><textarea name="" id="" cols="30" rows="10" placeholder="请输入对该作品的描述"></textarea></div></li>')
            picshow.append(apd);
            setcover = $('.js-publis-iconA');
            var reader = new FileReader(),
                apdlis = $('.js-upload-lis');
            reader.onload = function () {
                var dataURL = reader.result,
                    img = apdlis.find('img');
            }
            hidipt();

            function hidipt() {
                initdata($('.js-upload-lis'))
                setcover.on('click', function (event) {
                    var idx = $(this).parents('.js-upload-lis').data('idx');
                    coveript.val(idx)
                });
            }
        });

        function initdata(lis) {
            lis.each(function (index, el) {
                $(el).data('idx', index)
            });
        }
    },
    picloading: function () {
        var apd = $('<div id="Ojs-pic-loading" class="Ojs-pic-loading"><div id="loading-center"><div id="loading-center-absolute"><div class="object" id="object_one"></div><div class="object" id="object_two"></div><div class="object" id="object_three"></div><div class="object" id="object_four"></div><div class="object" id="object_five"></div><div class="object" id="object_six"></div><div class="object" id="object_seven"></div><div class="object" id="object_eight"></div></div></div></div>');
        !$('#Ojs-pic-loading').length && !$('.Ojs-no-loading').length && (function () {
            $('body').append(apd);
        })()
    },
    init: function () {
        var card;
        // setTimeout(function() {
        // 	mixed.upload();
        // }, 4000);
        $('.register').length && mixed.login();
        $('.container.card').length && (card = mixed.card());
        $('.bindphone').length && (function () {
            mixed.bindphone.prototype = proto;
            var bindphone = new mixed.bindphone();
        })()
        mixed.uploadpic.prototype = proto;
        $(document).on('ready', function () {
            mixed.picloading();
        });
        setTimeout(function () {
            new mixed.video();
        }, 1000)
    }
};

!(function ($, window) {
    $.fn.navshow1 = function (config) {
        var o = {
            fx: 'backout',
            speed: 500,
            click: function () {
            }
        }
        o = $.extend(o, config);

        return $(this).each(function (index, el) {
            var self = this,
                $this = $(this),
                noop = function () {
                },
                back = $('<li class="back"><div class="append"></div></li>').appendTo($this),
                lis = $('li', this),
                cur = $('li.cur', this)[0] || lis.eq(0).addClass('cur');
            lis.not('.back').hover(function () {
                move(this);
            }, noop);
            $this.hover(noop, function () {
                move(cur)
            })
            lis.click(function (e) {
                thisl = $(this);
                set(this);
                return o.click.apply(this, [e, this])
            });

            function move(a) {
                back.each(function () {
                    $(this).dequeue()
                }).animate({
                    left: a.offsetLeft,
                    width: a.offsetWidth
                }, o.speed, o.fx)
            }

            function set(a) {
                thisl.addClass('cur').siblings().removeClass('cur');
                cur = a;
            }
        });
    }
    $.fn.navshow2 = function (config) {

        var o = $.extend({
            speed: 500,
            module: 'easing',
            width: '60%'
        }, config)
        pluginName = 'navshow2';
        if ($(this).data(pluginName)) return;
        $(this).data(pluginName, true);
        return $(this).each(function () {
            var
                self = this,
                $this = $(this),
                lis = $('li', this);
            lis.each(function (index, el) {
                var back = $('<div class="nav-back"></div>').appendTo($(this));
                $(this).css('position', 'relative');
            });
            $('.nav-back').css({
                bottom: 0,
                height: '3px',
                margin: '0 auto',
                background: '#0096ff',
                opacity: 0,
                width: 0
            });

            lis.hover(function () {
                $('div', this).dequeue().animate({
                    width: o.width,
                    opacity: 1
                }, o.speed)
            }, function () {
                $('div', this).dequeue().animate({
                    width: 0,
                    opacity: 0
                }, o.speed)
            });
        })
    }
    $.fn.alertposition = function () {
        var
            sh = document.documentElement.clientHeight,
            sw = document.documentElement.clientWidth,
            ow = $(this).width(),
            oh = $(this).height();
        $(this).css({
            top: (sh - oh) / 2,
            left: (sw - ow) / 2,
            position: 'fixed'
        });
        return this;
    }
    $.fn.jsmove = function (config) {
        var
            p = {
                head: ''
            };
        $.extend(true, p, config);
        self = this;
        obj = $(this);
        head = $(p.head);
        if (head.length == 0 || obj.length == 0) return;
        this.move = false
        var o = {
            w: 0,
            h: 0,
            lt: 0,
            tp: 0,
            ow: 0,
            oh: 0
        }
        m = {
            sx: 0,
            sy: 0,
            ex: 0,
            ey: 0,
            mx: 0,
            my: 0,
            x: 0,
            y: 0,
            minx: 0,
            miny: 0,
            maxx: 0,
            maxy: 0
        };
        o.ow = obj[0].offsetWidth;
        o.oh = obj[0].offsetHeight;
        m.x = obj.css('left');
        m.y = obj.css('top');
        head.mousedown(function (e) {
            self.move = true;
            o.lt = $(this).offset().left;
            o.tp = $(this).offset().top;
            o.w = document.documentElement.clientWidth;
            o.h = document.documentElement.clientHeight;
            m.sx = e.clientX;
            m.sy = e.clientY;
            m.x = obj.css('left');
            m.y = obj.css('top');
        });
        $(document).mousemove(function (e) {
            if (self.move) {
                m.mx = e.clientX - m.sx;
                m.my = e.clientY - m.sy;
                m.minx = -o.lt;
                m.miny = -o.tp;
                m.maxx = o.w - o.ow - o.lt;
                m.maxy = o.h - o.oh - o.tp;
                m.mx = m.mx < m.minx ? m.minx : m.mx;
                m.mx = m.mx > m.maxx ? m.maxx : m.mx;
                obj.css({
                    left: parseInt(m.x) + m.mx,
                    top: parseInt(m.y) + m.my
                });
            }
        });
        $(document).mouseup(function (e) {
            if (self.move) {
                obj.css({
                    left: parseInt(m.x) + m.mx,
                    top: parseInt(m.y) + m.my
                });
                m = {
                    mx: 0,
                    my: 0
                };
            }
            self.move = false;
        });
    }
    // $.fn.iptchange = function(callback){
    // 	console.log(1);
    // 	return this.each(function(callback) {
    // 		$this = $(this);
    // 		var len;
    // 		$(this).keydown(function(event) {
    // 			len = $this.val().length;
    // 			console.log(4);
    // 		});
    // 		if($(this).keyup(function(event) {
    // 			return $this.val().length;
    // 		}) != len){
    // 			console.log(3);
    // 			callback;
    // 		}
    // 	});
    // }
})(jQuery, window);
!(function ($) {
    Number.prototype.toPercent = function (n) {
        return (Math.round(this * 10000) / 100).toFixed(2) + '%';
    }
    $.extend($.easing, {
        backout: function (x, t, b, c, d) {
            var s = 2.0158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
        }
    });
})(jQuery)


function init() {
    bar.chg('#js-bc-aul', '.js-bc-alis', '#js-bc-bul', '.js-bc-blis', 'cur');
    bar.chg('#js-personbase-aul', '.js-personbase-alis', '#js-personbase-bul', '.js-personbase-blis', 'cur');
    bar.chg('#js-public-aul', '.js-publis-alis', '#js-publish-bul', '.js-publish-blis', 'cur');
    person.init();
    bar.init();
    mixed.init();
    $('#js-personbase-aul').navshow1({
        speed: 500
    });
    setTimeout(function () {
        $('.hkw-header-nav-ul').navshow2({
            width: '100%',
            speed: 300
        });
    }, 1000)
}
init();

!(function ($) {
    if (!$('body').data('response')) {
        $('body').data('response', true);
        try {
            console.info('如果你对该网站的前端建设有好的建议或反馈，请发送邮件到：2284430641@qq.com');
        } catch (e) {
        }
    }
})(jQuery);
!(function () {
    var post = [],
        _st = [],
        wd = 270,
        cl = 4,
        mg = 18,
        wdb = wd + mg,
        minH, minI;
    if ($('body').data('water')) return;
    $('body').data('water', true)
    setTimeout(function () {
        var lis = $('#searchResult-works li'),
            imgs = lis.find('.hkw-work-img img'),
            ul = $('#searchResult-works');
        imgs.map(function (index, el) {
            // console.log(this.naturalHeight, this);
            var _self = this;
            var finalhg = this.naturalHeight / this.naturalWidth * wd + 30;
            _st[index] = setInterval(function () {
                if (finalhg) {
                    clearInterval(_st[index]);
                    pos();
                }
            }, 200);

            function pos() {
                $(lis[index]).height(finalhg);

                // !el.complete ? loading():{};
                // if(el.complete){
                // }else{
                // }

                if (index < 4) {
                    post[index] = finalhg;
                } else {
                    minH = Math.min.apply(null, post);
                    minI = $.inArray(minH, post);
                    lis.eq(index).css({
                        left: minI * wdb,
                        top: minH + mg * 2,
                        position: 'absolute'
                    });
                    post[minI] += finalhg + mg * 2;
                    ul.css('height', function () {
                        var h = Math.max.apply(null, post);
                        return (h + 50)
                    });
                }
            }

            function loading() {
                var lod = $('<img class="js-load" src="https://www.huakewang.com/hkwhtml/images/mixed/loding.gif">').insertBefore($(el).parent());
                $(el).css('display', 'none');
                $(el).on('load', function (event) {
                    lod.css('display', 'none');
                    $(this).css('display', 'block');
                });
            }
        })
    }, 200)
})();
!(function () {
    if ($('body').data('lis')) return;
    $('body').data('lis', true)
    setTimeout(function () {
        var lis = $('#searchResult-works li');
        lis.each(function (index, el) {
            var self = $(this);
            var img = $(this).find('.hkw-work-img img');
            if (img.complete) return;
            $(this).css('display', 'none');
            img.ready(function () {
                self.css('display', 'block');
            })
        });
    }, 100)
    //杂七杂八的修补
    try {
        var tm = 15;
        var fst = setInterval(function () {
            var img = $('#thumbnail_path_src');
            if (!--tm || img.length) {
                clearInterval(fst)
            }
            img.length && (function () {
                var st = setInterval(function () {
                    if (img.attr('src')) {
                        clearInterval(st);
                        img.css('display', 'inline');
                    }
                }, 100)
            })()
        }, 1000)
    } catch (e) {
    }
    ;
    try {
        var num = 15;
        var st = setInterval(function () {
            if (!--num) clearInterval(st);
            var c = $('.yh-modules');
            c.each(function (idx, el) {
                var slider = $(el).find('.bot_slide');
                !slider.children().length && (function () {
                    $(el).find('.wrap').css('display', 'none');
                    $(el).find('.div_hf').css('display', 'none');
                })()
            });
        }, 100)
    } catch (e) {
    }
})();
function more() {

}
