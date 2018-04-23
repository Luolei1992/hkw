"use strict";
var data_area_tb_province=[];
var data_area_tb_city=[];
var data_area_tb_area=[];
var data_area_tb=[];
//解决filter在ie8不能实现的的方法
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisArg */) {
        "use strict";
        if (this === void 0 || this === null) throw new TypeError();
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") throw new TypeError();
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisArg, val, i, t)) res.push(val);
            };
        };
        return res;
    };
};
$.getJSON('./js/lzy_NEW/area_tb_da.json', function (data) {
    data_area_tb=data;

    data_area_tb_province=data_area_tb.filter(function (elem) {

        return elem.codeid.length==2
    });
    data_area_tb_city=data_area_tb.filter(function (elem) {

        return elem.codeid.length==4
    });
    data_area_tb_area=data_area_tb.filter(function (elem) {

        return elem.codeid.length==6
    });
});
var selectPlug = {
    //对象捕捉
    selectCreate: function selectCreate(keyword) {
        var idkeyword = "form_" + keyword + "select";
        var classkeyword = "dpi_" + keyword;
        var form_select = document.getElementById(idkeyword);
        var dpiObj = document.getElementsByClassName(classkeyword)[0];
        var selectdl = form_select.getElementsByTagName("dl")[0];
        selectdl.value = false;
        var selectdds = selectdl.getElementsByTagName("dd");
        this.selectObject(dpiObj, selectdl, selectdds);
    },
    //添加点击事件
    selectObject: function selectObject(dpi, selectdl, selecctdds) {
        var dlheight = void 0;
        if (selecctdds.length == 3) {
            dlheight = "138px";
        } else {
            dlheight = "184px";
        }

        var _loop = function _loop(i) {
            selecctdds[i].onclick = function () {
                if (i == 0) {
                    selectPlug.ddchange("", selecctdds[0], dpi, selectdl, dlheight);
                } else {
                    selectPlug.ddchange(selecctdds[i], selecctdds[0], dpi, selectdl, dlheight);
                }
            };
        };

        for (var i = 0; i < selecctdds.length; i++) {
            _loop(i);
        }
    },

    //下拉选项点击事件
    ddchange: function ddchange(innH, ddfirst, dpi, dlObj, dlheight) {
        if (innH != "") {
            ddfirst.style.color = "#777";
            ddfirst.innerHTML = innH.innerHTML;
            dpi.value = $(innH).attr('value');
        } else {
            ddfirst.innerHTML = "请选择";
            dpi.value = "";
        }
        if (!dlObj.value) {
            dlObj.style.height = dlheight;
            dlObj.value = !dlObj.value;
        } else {
            dlObj.style.height = "46px";
            dlObj.value = !dlObj.value;
        }
    },

    //下拉框的滚动阻止事件
    preventScroll: function preventScroll(keyword) {
        var objs = document.getElementsByClassName(keyword);

        var _loop2 = function _loop2(i) {
            var _this = objs[i];
            if (navigator.userAgent.indexOf("Firefox") > 0) {
                _this.addEventListener('DOMMouseScroll', function (e) {
                    _this.scrollTop += e.detail > 0 ? 46 : -46;
                    e.preventDefault();
                }, false);
            } else {
                _this.onmousewheel = function (e) {
                    e = e || window.event;
                    _this.scrollTop += e.wheelDelta > 0 ? -46 : 46;
                    return false;
                };
            }
        };
        for (var i = 0; i < objs.length; i++) {
            _loop2(i);
        }
    }
};

var areaSelectPlug = {
    //对象捕捉
    selectCreate: function selectCreate(keyword) {
        var idkeyword = "form_" + keyword + "select";
        var classkeyword = "dpi_" + keyword;
        var form_select = document.getElementById(idkeyword);
        var dpiObj = document.getElementsByClassName(classkeyword)[0];
        var selectdl = form_select.getElementsByTagName("dl")[0];
        var selectdldl = form_select.getElementsByTagName("dl")[1];
        selectdl.value = false;
        var selectddFirst = selectdl.getElementsByTagName("dd")[0];
        areaSelectPlug.areaselectObject(dpiObj, selectdl, selectdldl, selectddFirst);
    },

    //添加点击事件
    areaselectObject: function areaselectObject(dpi, selectdl, selectdldl, selectddFirst) {
        var selectdds = void 0;
        var dlheight = "230px";
        var spans = selectddFirst.getElementsByTagName("span");
        var _loop3 = function _loop3(i) {
            var dataFrom=[];
            $(spans[i]).on('click', function () {
                var _spanName=$(this).html();
                if(i==0){
                        dataFrom=data_area_tb_province;
                }
                if(i==1){
                    if(_spanName=="市"){
                        if($(spans[0]).attr('value')=="0"){
                            dataFrom=data_area_tb_province;
                        }else{
                            dataFrom=data_area_tb_city.filter(function (elem) {
                                return elem.parentid==$(spans[0]).attr('value')
                            });
                        }
                    }else{
                        dataFrom=data_area_tb_city.filter(function (elem) {
                            return elem.parentid==$(spans[0]).attr('value')
                        });
                    }
                }
                if(i==2){
                    if(_spanName=="县/区/市"){
                        if($(spans[0]).attr('value')=="0"){
                            dataFrom=data_area_tb_province;
                        }else if($(spans[1]).attr('value')=="0"){
                            dataFrom=data_area_tb_city.filter(function (elem) {
                                return elem.parentid==$(spans[0]).attr('value')
                            });
                        }else{
                            dataFrom=data_area_tb_area.filter(function (elem) {
                                return elem.parentid==$(spans[1]).attr('value')
                            });
                        }
                    }else{
                        dataFrom=data_area_tb_area.filter(function (elem) {
                            return elem.parentid==$(spans[1]).attr('value')
                        });
                    }
                }
                openWait(dataFrom);
            });
        };

        for (var i = 0; i < spans.length; i++) {
            _loop3(i);
        }
        function openWait(dataFrom){
            var content_dd='';
                for (var o = 0; o < dataFrom.length; o++) {
                    content_dd += '<dd value=' + dataFrom[o].codeid + '>' + dataFrom[o].cityName + '</dd>';
                }
                $(selectdldl).html(content_dd);
                areaSelectPlug.ddchange("", spans, null, dpi, selectdl, dlheight);
                dldlddclick($(selectdldl), spans, i);
        };
        function dldlddclick(selectdldl, spansObj, i) {
            selectdds = $(selectdldl).children("dd");
            $(selectdds).each(function () {
                var _this = $(this);
                _this.on('click', function () {
                    areaSelectPlug.ddchange(_this, spansObj, i, dpi, selectdl, dlheight);
                    if (i == 0) {
                        $(spansObj[1]).click();
                        $('input[name="address"]').val("");
                    } else if (i == 1) {
                        $(spansObj[2]).click();
                        $('input[name="address"]').val("");
                    }
                });
            });
        };
    },

    //下拉选项点击事件
    ddchange: function ddchange(innH, ddfirst, iii, dpi, dlObj, dlheight) {
        if (innH != "") {
            if ($(innH).attr('value').split("").length == 2) {
                $(ddfirst[0]).attr('value', $(innH).attr('value'));
                $(ddfirst[1]).html("市");
                $(ddfirst[2]).html("县/区/市");
                $(ddfirst[0]).html($(innH).html());
                if($(innH).html().length>5){
                    if(!$(ddfirst[0]).parent().parent().hasClass('textMoreWordLocation')){
                        $(ddfirst[0]).parent().parent().addClass('textMoreWordLocation');
                    }
                }else{
                    if($(ddfirst[0]).parent().parent().hasClass('textMoreWordLocation')){
                        $(ddfirst[0]).parent().parent().removeClass('textMoreWordLocation');
                    }
                }
            } else if ($(innH).attr('value').split("").length == 4) {
                $(ddfirst[1]).attr('value', $(innH).attr('value'));
                $(ddfirst[2]).attr('value', $(innH).attr('value'));
                $(ddfirst[2]).html("县/区/市");
                $(ddfirst[1]).html($(innH).html());
                if(($(ddfirst[0]).html().length+1+$(innH).html().length)>8){
                    if(!$(ddfirst[0]).parent().parent().hasClass('textMoreWordLocation')){
                        $(ddfirst[0]).parent().parent().addClass('textMoreWordLocation');
                    }
                }else{
                    if($(ddfirst[0]).parent().parent().hasClass('textMoreWordLocation')){
                        $(ddfirst[0]).parent().parent().removeClass('textMoreWordLocation');
                    }
                }
            } else if ($(innH).attr('value').split("").length == 6) {
                $(ddfirst[2]).attr('value', $(innH).attr('value'));
                $(ddfirst[2]).html($(innH).html());
                if(($(ddfirst[0]).html().length+$(ddfirst[1]).html().length+$(innH).html().length)>11){
                    if(!$(ddfirst[0]).parent().parent().hasClass('textMoreWordLocation')){
                        $(ddfirst[0]).parent().parent().addClass('textMoreWordLocation');
                    }
                }else{
                    if($(ddfirst[0]).parent().parent().hasClass('textMoreWordLocation')){
                        $(ddfirst[0]).parent().parent().removeClass('textMoreWordLocation');
                    }
                }
            }
            dpi.value = $(innH).attr('value');
        }
        if (!dlObj.value) {
            dlObj.style.height = dlheight;
            dlObj.value = !dlObj.value;
        } else {
            dlObj.style.height = "46px";
            dlObj.value = !dlObj.value;
        }
        //overflow-y: hidden;
        //overflow-x: scroll;
    }
};

var industrySelectPlug = {
    selectCreate: function selectCreate() {
        var parentdiv = $('.workshow_industry.workindustry:first');
        var uls = $(parentdiv).children('ul');
        $.ajax({
            url:urlLocalhost+newhuakwang+"/get_menu_list/148",
            type:"post",
            dataType:"json",
            data:""
        }).done(function (data) {
            if(data.success){
                industrySelectPlug.ajaxData = data.data;
                for (var i = 0; i < uls.length; i++) {
                    industrySelectPlug.industryselectObject(uls, i);
                }
            }
        });
    },
    industryselectObject: function industryselectObject(ulsObj, i) {
        var keyindustry = $(ulsObj[i]).attr('value');
        var _indata=[];
        if (keyindustry != undefined && keyindustry != null) {
            switch (i){
                case 0:{
                    _indata=industrySelectPlug.ajaxData;
                    industrySelectPlug.waitDataChange (ulsObj,i,_indata)
                }break;
                case 1:{
                    for(var k0=0;k0<industrySelectPlug.ajaxData.length;k0++){
                        if(keyindustry==industrySelectPlug.ajaxData[k0].id){
                            _indata=industrySelectPlug.ajaxData[k0].subMenuList;
                        }
                    }
                    industrySelectPlug.waitDataChange (ulsObj,i,_indata);

                }break;
                case 2:{
                    var keyindustry11 = $(ulsObj[1]).attr('value');
                    for(var k00=0;k00<industrySelectPlug.ajaxData.length;k00++){
                        if(keyindustry11==industrySelectPlug.ajaxData[k00].id){
                            _indata=industrySelectPlug.ajaxData[k00].subMenuList;
                            for(var k11=0;k11<_indata.length;k11++){
                                if(keyindustry==_indata[k11].id){
                                    _indata=_indata[k11].subMenuList||[];
                                    industrySelectPlug.waitDataChange (ulsObj,i,_indata);
                                }
                            }

                        }
                    }
                }break;
            }
        }
    },
    waitDataChange: function waitDataChange (ulsObj,i,_indata) {
        var innH = '';
        for (var o = 0; o < _indata.length; o++) {
            var _data=_indata[o];
            innH += '<li value="' + _data.id + '" > ' + _data.menu_name + '</li>';
        }
        $(ulsObj[i]).html(innH);
        industrySelectPlug.ulliselect(ulsObj, i);
    },
    ulliselect: function ulliselect(ulObj, i) {
        var lis = $(ulObj[i]).children("li");
        $(lis).each(function () {
            var _this = $(this);
            _this.on('click', function () {
                _this.addClass('bluebg').siblings('li').attr('class', "");
                $('.workshow_industry.workindustry:first').find('input[name="workindustry"]').val(_this.attr('value'));
                if (i == 0) {
                    $(ulObj[i + 1]).attr('value', _this.attr('value'));
                    $(ulObj[1]).html('');
                    $(ulObj[2]).html('');
                    industrySelectPlug.industryselectObject(ulObj, i + 1);
                } else if (i == 1) {
                    $(ulObj[i + 1]).attr('value', _this.attr('value'));
                    $(ulObj[2]).html('');
                    industrySelectPlug.industryselectObject(ulObj, i + 1);
                }
            });
        });
    }
};
