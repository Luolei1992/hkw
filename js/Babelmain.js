/**
 * Created by admin on 2017/2/22.
 */
//window.ucai = window.ucai || {};
"use strict";

var HKWselfpage_HTML = {
    skillData: ["吉祥物", "墙绘", "插画", "人设", "漫画", "表情", "品牌整案", "名片/卡片", "包装设计", "易拉宝", "封面/画册", "导视", "logo", "交互原型", "界面设计", "网页设计", "专题/活动", "banner", "外观设计", "结构设计", "珠宝设计", "工具设计", "软装设计", "工装设计", "家装设计", "美陈设计", "专卖店设计", "建模、渲染", "虚拟现实", "三维特效", "园林景观", "雕塑设计", "360/720全景", "影视后期", "宣传片", "微电影", "摄影师", "flash", "配音", "GIF", "Android", "IOS", "SEO", "HTML5", "微信", "企业建站", "前端开发", "后端开发"],
    worksImageList: [],
    worksImageList_name: [],
    worksNewTopShow: "",
    worksVideoList: [],
    dataWorksfFromdata: {},
    imgclickFunction_value: 0,
    worksHomePage: 8,
    videoclickFunction_value: 0,
    data: function data() {
        this.cookie = $.cookie("user_id"), this.user, //用户标识
            this.dataCheck, //数据检测
            this.dataFinshLine, //顶部完成度标识
            this.selfImageChange, //图片修改：头像+logoBackground
            this.dataZDYBQ, //自定义标签数据
            this.dataBaseInForm, //基础数据
            this.dataAboutSelfForm, //关于我数据
            this.bianjitinajia, //编辑添加按钮
            this.dataSkillfFrom, //数据提交
            this.skillchange_delete, //
            this.touxiangsend, //
            this.dataWorksfFrom, //数据提交
            this.workshowArray, //特征函数
            this.dataWorksfFromALL, this.dataWorksfFromReady, this.worksList, this.imgclickFunction,
            this.dataWorksChangeFrom
    },


    //封面上传提示效果&&头像上传配置&&封面上传配置
    sendbutton_alert: function sendbutton_alert() {
        var sendbuttontip = document.getElementById("cfoalter");
        var cfosendimagebutton = document.getElementById("cfosendimagebutton");
        sendbuttontip.style.cssText = "transition:opacity 1s";
        cfosendimagebutton.addEventListener("mousemove", function() {
            sendbuttontip.style.opacity = 1;
        });
        cfosendimagebutton.addEventListener("mouseout", function() {
            sendbuttontip.style.opacity = 0;
        });
        $('#touxiang').on('click', function() {
            $('#touxiangInput').click();
        });
    },


    //个人或者机构单选框
    cfbf_intocheck: function cfbf_intocheck() {
        var cfbf_intocheck = document.getElementsByClassName("cfbf_intocheck");
        var dpi_intokind = document.getElementsByClassName("dpi_intokind")[0];
        var dpi_kind = [1, 2];
        for (var i = 0; i < cfbf_intocheck.length; i++) {
            cfbf_intocheck[i].value = i;
            cfbf_intocheck[i].onclick = function() {
                var incheckradio = cfbf_intocheck[this.value].getElementsByTagName("i")[0];
                incheckradio.className = "incheckradio";
                var outcheckradio = cfbf_intocheck[(this.value + 1) % 2].getElementsByTagName("i")[0];
                outcheckradio.className = "outcheckradio";
                dpi_intokind.value = dpi_kind[this.value];
            };
        }
    },

    //性别下拉框
    sexselect: function sexselect() {
        //下拉框的效果实现
        selectPlug.selectCreate("sex");
    },


    //工作经验下拉框
    experiencselect: function experiencselect() {
        //下拉框的效果实现
        selectPlug.selectCreate("experience");
    },


    //学历下拉框
    schoolselect: function schoolselect() {
        //下拉框的效果实现
        selectPlug.selectCreate("school");
    },


    //下拉框的滚动阻止事件
    selectmouseWheel: function selectmouseWheel() {
        selectPlug.preventScroll("textselectul2");
        selectPlug.preventScroll("skillalert");
    },


    //详细地址选择效果
    inlocaladdress: function inlocaladdress() {
        var inlocaladdress = document.getElementById("inlocaladdress");
        var inputvalue = inlocaladdress.getElementsByClassName("inlocalMap")[0];
        var inlocalIcon = inlocaladdress.getElementsByTagName("img")[0];
        inputvalue.addEventListener("keyup", function(event) {
            if (inputvalue.value.length > 0) {
                inlocalIcon.style.backgroundColor = "#0bacf5";
            } else {
                inlocalIcon.style.backgroundColor = "#fff";
            }
        });

        //var _cookie=$.cookie('user_id');
        //inlocalIcon.addEventListener('click', function () {
        //    (_cookie==undefined||_cookie=="null"||_cookie==null||_cookie=="undefined"||_cookie=="")?go_login():mapchange()
        //
        //});
        function mapchange() {
            $('.baiduFindCity:first').val($('.inlocalMap.address').val());
            alertMapShow();
        }
        $('.alertDomSure:first').on('click', function() {
            var _location = $('.alertDom:first p:first').html().split(' ');
            $('.baiduFindCity:first').val('');
            $('.alertMapClose:first').click();

        });
    },


    //基本信息保存提交
    baseInfSaveCheck: function baseInfSaveCheck() {
        theFormCheck.formcheckChange("bbs_baseInfForm", 0);
    },


    //About信息介绍范例查看
    aboutselfShowCheck: function aboutselfShowCheck() {
        var chakanfanli = document.getElementById("chakanfanli");
        var aboutself_fanli = document.getElementById("aboutself_fanli");
        var aboutmyself_textarea = document.getElementById("aboutmyself_textarea");
        var aboutselftextlength = document.getElementById("aboutselftextlength");
        var textlength = aboutselftextlength.getElementsByClassName("textlength")[0];
        var textlengthshow = aboutselftextlength.getElementsByClassName("textlengthshow")[0];
        var textlengt_setInterval = void 0;
        chakanfanli.onclick = function() {
            aboutself_fanli.style.display = "block";
            setTimeout(function() {
                aboutself_fanli.style.opacity = "1";
            }, 10);
        };
        aboutmyself_textarea.addEventListener("focus", function() {
            aboutselftextlength.style.display = 'block';
            textlengt_setInterval = setInterval(function() {
                textlength.innerHTML = aboutmyself_textarea.value.length;
                if (aboutmyself_textarea.value.length != "") {
                    aboutself_fanli.style.opacity = "0";
                    setTimeout(function() {
                        aboutself_fanli.style.display = "none";
                    }, 1000);
                }
                if (aboutmyself_textarea.value.length < 30) {
                    textlengthshow.innerHTML = "<30";
                    textlengthshow.style.color = "#0bacf5";
                    textlength.style.color = "#7c7c7c";
                    aboutmyself_textarea.style.border = "1px solid #dce0e0";
                } else if (aboutmyself_textarea.value.length > 500) {
                    textlengthshow.innerHTML = ">500";
                    textlengthshow.style.color = "#0bacf5";
                    textlength.style.color = "#f33919";
                    aboutmyself_textarea.style.border = "1px solid #f33919";
                } else {
                    textlengthshow.innerHTML = "/500";
                    textlengthshow.style.color = "#f33919";
                    textlength.style.color = "#7c7c7c";
                    aboutmyself_textarea.style.border = "1px solid #dce0e0";
                }
            }, 10);
            aboutmyself_textarea.addEventListener("focusout", function() {
                clearInterval(textlengt_setInterval);
            });
        });
    },


    //About信息提交
    aboutselfSaveCheck: function aboutselfSaveCheck() {
        theFormCheck.formcheckChange("bbs_aboutselfFrom", 1);
    },

    //擅长技能查询&点击&技能修改事件
    theskillClickAdd: function theskillClickAdd() {
        var spans = $('.chooseskill:first span');
        var heightadd = void 0;
        var heightaddP = parseInt($('#bbs_skillfFrom').parent('div.heightchangediv').css('height'));
        var heightaddPP = parseInt($('#bbs_skillfFrom').parent('div.heightchangediv').parent('div.heightchangediv').css('height'));
        $(spans).each(function() {
            $(this).on('click', function() {
                var _this = $(this);
                if (_this.hasClass("inchoose")) {
                    var valueArray = $('#bbs_skillfFrom .addskill:first').attr('value');
                    valueArray = valueArray.split(",").filter(function(x) {
                        return x != String(_this.html());
                    }).filter(function(x) {
                        return x != "";
                    }).filter(function(x) {
                        return true;
                    });
                    $('#bbs_skillfFrom .addskill:first').attr('value', valueArray);
                    _this.removeClass("inchoose");
                    skillchange(valueArray);
                } else {
                    var _valueArray = $('#bbs_skillfFrom .addskill:first').attr('value');
                    _valueArray = _valueArray.split(",").filter(function(x) {
                        return x != "";
                    }).filter(function(x) {
                        return true;
                    });
                    _valueArray.push(_this.html());
                    _this.addClass("inchoose");
                    $('#bbs_skillfFrom .addskill:first').attr('value', _valueArray);
                    skillchange(_valueArray);
                }
            });
        });

        function skillchange(vArray) {
            var text_vArray = '';
            for (var i = 0; i < vArray.length; i++) {
                text_vArray += '<div class="inskill">' + vArray[i] + '&nbsp;<i>×</i></div>';
            }
            $('#bbs_skillfFrom .addskill:first').html(text_vArray);
            $('.chooseskill:first span.inchoose').each(function() {
                $(this).parent('a').siblings('.ck_logo').addClass("inchoose");
            });
            $('.chooseskill:first a.ck_skillchoose').each(function() {
                if ($(this).find('span.inchoose').length == 0) {
                    $(this).siblings(".ck_logo:first").attr('class', 'ck_logo');
                }
            });
            HKWselfpage_HTML.data.skillchange_delete();
            heightadd = parseInt($('#bbs_skillfFrom .addskill:first').css('height')) - 30;
            $('#bbs_skillfFrom').parent('div.heightchangediv').css('height', heightaddP + heightadd + "px");
            $('#bbs_skillfFrom').parent('div.heightchangediv').parent('div.heightchangediv').css('height', heightaddPP + heightadd + "px");
        }
        this.data.skillchange_delete = function() {
            $('#bbs_skillfFrom .addskill:first div i').on('click', function() {
                var _this = $(this);
                var valueArray = $('#bbs_skillfFrom .addskill:first').attr('value');
                var iii = String(_this.parent('div').html()).replace(/&nbsp;<i>×<\/i>/, "");
                valueArray = valueArray.split(",").filter(function(x) {
                    return x != iii;
                }).filter(function(x) {
                    return x != "";
                }).filter(function(x) {
                    return true;
                });
                $('#bbs_skillfFrom .addskill:first').attr('value', valueArray);
                $(spans[HKWselfpage_HTML.skillData.indexOf(iii)]).removeClass("inchoose");
                skillchange(valueArray);
            });
        };
        var timeSet = void 0;
        var selectText = "";
        var keytext = "";

        function skillindexOf() {
            $('.addskillselect input.selectaddskill:first').on('keydown', function(event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                };
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == 38) {
                    //上
                    event.preventDefault();
                    topbuttonChoose(-1);
                };
                if (e && e.keyCode == 40) {
                    //下
                    event.preventDefault();
                    topbuttonChoose(1);
                };
            });
            $('.addskillselect input.selectaddskill:first').on('focus', function() {
                focusKeychange($(this));
            });
            $('.addskillselect input.selectaddskill:first').on('keyup', function(event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    enterKeycode();
                    focusKeychange($(this));
                } else {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    if (e.keyCode == 38 || e.keyCode == 40) {
                        //上
                        event.preventDefault();
                    } else {
                        focusKeychange($(this));
                    };
                };
            });
            $('.addskillselect input.selectaddskill:first').blur(function() {
                clearInterval(timeSet);
                $('.addskillselect .skillalert:first').css({ 'zIndex': -1, 'opacity': '0' });
            });
            $('.addskillselect .addskillbutton:first').on('click', function(event) {
                event.preventDefault();
                var valueArray = $('#bbs_skillfFrom .addskill:first').attr('value');
                valueArray = valueArray.split(",").filter(function(x) {
                    return x != "";
                });
                var inputArray = $('.addskillselect input.selectaddskill:first').val();
                inputArray = inputArray.split(";").filter(function(x) {
                    return x != "";
                });
                for (var i = 0; i < inputArray.length; i++) {
                    var vvv = valueArray.indexOf(inputArray[i]);
                    if (vvv == -1) {
                        valueArray.push(inputArray[i]);
                    } else {
                        var iii = HKWselfpage_HTML.skillData.indexOf(inputArray[i]);
                        if (iii == -1) {
                            valueArray.push(inputArray[i]);
                            $(spans[iii]).addClass('inchoose');
                        }
                    }
                }
                $('#bbs_skillfFrom .addskill:first').attr('value', valueArray);
                skillchange(valueArray);
                $('.addskillselect input.selectaddskill:first').val("");
            });

            function focusKeychange(Obj) {
                var keyArray = [];
                var _this = $(Obj);
                selectText = _this.val();
                selectText = selectText.split("").filter(function(x) {
                    return x != "";
                });
                for (var index = 0; index < selectText.length; index++) {
                    if (selectText[index] == ';') {
                        keyArray.push(keytext);
                        keytext = "";
                    } else if (selectText[index] == '；') {
                        keyArray.push(keytext);
                        keytext = "";
                    } else {
                        keytext += selectText[index];
                    }
                }
                if (selectText.length > 0) {
                    $(".addskillselect:first").attr('value', keyArray);
                    $('.addskillselect .skillalert:first').css({ 'zIndex': 500, 'opacity': 1 });
                    $('.addskillselect .skillalert:first').html(skillindexofShow(keytext) || '<dd class="textp">数据库检索不到的职业技能可以也可以直接添加</dd>');
                    keytext = "";
                } else {
                    $('.addskillselect .skillalert:first').html('<dd class="textp">数据库检索不到的职业技能可以也可以直接添加</dd>');
                }
                skillalertDDclick();
            }

            function enterKeycode() {
                var ddfirst = $('.addskillselect .skillalert:first').children('dd:first') || undefined;
                if (ddfirst != null) {
                    if ($(ddfirst).attr('class') !== 'textp') {
                        var dds = $('.addskillselect .skillalert:first dd');
                        for (var index = 0; index < dds.length; index++) {
                            if ($(dds[index]).css('backgroundColor') == "rgb(238, 238, 238)") {
                                $('.addskillselect .skillalert:first').attr('value', "eee");
                                inputValueChange($(dds[index]).attr('value'));
                            };
                        };
                    };
                };
            };

            function skillindexofShow(intext) {
                var aaa = '';
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = HKWselfpage_HTML.skillData.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var index = _step.value;

                        if (HKWselfpage_HTML.skillData[index].indexOf(intext) > -1) {
                            aaa += '<dd value=' + index + '>' + HKWselfpage_HTML.skillData[index] + '</dd>';
                        };
                    };
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        };
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        };
                    };
                };
                return aaa;
            };

            function skillalertDDclick() {
                var ddfirst = $('.addskillselect .skillalert:first').children('dd:first') || undefined;
                if (ddfirst != null) {
                    if ($(ddfirst).attr('class') !== 'textp') {
                        $('.addskillselect .skillalert:first').children('dd').on('click', function(e) {
                            e.preventDefault();
                            var _this = $(this);
                            inputValueChange(_this.attr('value'));
                        });
                    };
                };
            };

            function inputValueChange(txt) {
                var keyArray = [];
                for (var index = 0; index < selectText.length; index++) {
                    if (selectText[index] == ';') {
                        keyArray.push(keytext);
                        keytext = "";
                    } else if (selectText[index] == '；') {
                        keyArray.push(keytext);
                        keytext = "";
                    } else {
                        keytext += selectText[index];
                    };
                };
                keyArray.push(HKWselfpage_HTML.skillData[txt]);
                $('.addskillselect input.selectaddskill:first').val(keyArray.join(";") + ";");
                keytext = "";
            };

            function topbuttonChoose(keycodeV) {
                var ddfirst = $('.addskillselect .skillalert:first').children('dd:first') || undefined;
                if (ddfirst != null) {
                    if ($(ddfirst).attr('class') !== 'textp') {
                        var dds = $('.addskillselect .skillalert:first dd');
                        var valueOff = $('.addskillselect .skillalert:first').attr('value');
                        if (valueOff == "eee") {
                            $('.addskillselect .skillalert:first').attr('value', 0);
                            $(dds[0]).css('background', "#eee");
                        } else {
                            if (dds.length < 2) {
                                $(dds[0]).css('background', "#eee");
                            } else {
                                valueOff = parseInt(valueOff) + parseInt(keycodeV) > 0 ? parseInt(valueOff) + parseInt(keycodeV) : 0;
                                valueOff = valueOff < dds.length ? valueOff : dds.length - 1;
                                $('.addskillselect .skillalert:first').attr('value', valueOff);
                                $(dds[valueOff]).css('background', "#eee").siblings("dd").css('background', "#fff");
                            };
                        };
                    };
                };
            };
        };
        skillindexOf();
    },

    //擅长技能提交
    theskillAdd: function theskillAdd() {
        theFormCheck.formcheckChange("bbs_skillfFrom", 2);
    },


    //作品案例提交
    worksshow: function worksshow() {
        HKWselfpage_HTML.data.workshowArray = { imgclick_List: null, videoclick_List: null };
        theFormCheck.formcheckChange("bbs_worksFrom", 3);
        //关键词
        function workshow_keyworkd() {
            $('input[name="worksname"]').blur(function() {
                var title = $(this).val();

                if (title.length > 0) {
                    $.ajax({
                        url: urlLocalhost + newhuakwang + '/getKeycode',
                        type: 'post',
                        data: {
                            "title": title
                        },
                        dataType: 'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                    }).done(function(data) {
                        if (data.success) {
                            $(".work_keyword:first").val(data.data.keycode);
                            return false;
                        } else {
                            return false;
                        };
                    })
                };

            });
        }
        workshow_keyworkd();

        //作品案例描述提示
        function workshow_alert() {
            var workshow_fanli = document.getElementById("workshow_fanli");
            var worksshow_textarea = document.getElementById("worksshow_textarea");
            var workshowlength = document.getElementById("workshowlength");
            var textlength = workshowlength.getElementsByClassName("textlength")[0];
            var textlengthshow = workshowlength.getElementsByClassName("textlengthshow")[0];
            var textlengt_setInterval = void 0;
            var workstext = document.getElementById("workstext");
            worksshow_textarea.addEventListener("focus", function() {
                textlengt_setInterval = setInterval(function() {
                    workstext.value = worksshow_textarea.value;
                    if (worksshow_textarea.value.length != "") {
                        workshow_fanli.style.opacity = "0";
                        setTimeout(function() {
                            workshow_fanli.style.display = "none";
                        }, 1000);
                    }
                    textlength.innerHTML = worksshow_textarea.value.length;
                    if (worksshow_textarea.value.length > 500) {
                        textlengthshow.innerHTML = ">500";
                        textlengthshow.style.color = "#0bacf5";
                        textlength.style.color = "#f33919";
                        worksshow_textarea.style.border = "1px solid #f33919";
                    } else {
                        textlengthshow.innerHTML = "/500";
                        textlengthshow.style.color = "#0bacf5";
                        textlength.style.color = "#7c7c7c";
                        worksshow_textarea.style.border = "1px solid #dce0e0";
                    }
                }, 10);
                worksshow_textarea.addEventListener("focusout", function() {
                    clearInterval(textlengt_setInterval);
                    if (worksshow_textarea.value.length == "") {
                        workshow_fanli.style.display = "block";
                        setTimeout(function() {
                            workshow_fanli.style.opacity = "1";
                        }, 10);
                    }
                });
            });
        }
        workshow_alert();

        //详细图动态效果
        function workshow_detialsshow() {
            var workshow_detials_dl = document.getElementById("workshow_detials_dl");
            var workshow_detials_dd = workshow_detials_dl.getElementsByTagName("dd");
            var workshow_sendlocalhost = workshow_detials_dl.getElementsByClassName("workshow_sendlocalhost");
            for (var i = 0; i < workshow_detials_dd.length; i++) {
                workshow_detials_dd[i].value = i;
                workshow_detials_dd[i].addEventListener("mouseover", function() {
                    for (var j = 0; j < workshow_detials_dd.length; j++) {
                        if (j == this.value) {
                            workshow_sendlocalhost[j].style.display = "block";
                            workshow_detials_dd[j].style.background = "url('./image/backgroundline.png') no-repeat 0 0 #fff";
                        } else {
                            workshow_detials_dd[j].style.background = "rgba(0,0,0,0)";
                            workshow_sendlocalhost[j].style.display = "none";
                        }
                    }
                });
            }
        }
        workshow_detialsshow();

        //图片上传详细
        function works_imageInput_show() {
            $('.imgtopshow:first').click(function() {
                $('#imgtopshow_input').click();
            });
            var chooses = document.getElementById('batch_image_upload');
            FileAPI.event.on(chooses, 'change', function(evt) {
                var files = FileAPI.getFiles(evt); // Retrieve file list
                FileAPI.filterFiles(files, function(file, info /**Object*/ ) {
                    HKWselfpage_HTML.worksImageList_name.push(file.name);
                    if (/^image/.test(file.type)) {
                        if (file.size > 10 * FileAPI.MB) {
                            alertUploadMsg("文件大小限制在10M以内！");
                            return false;
                        };
                        return true;
                    } else {
                        return false;
                    };
                }, function(files /**Array*/ , rejected /**Array*/ ) {
                    console.log(files);
                    var uploadFile = files[0];
                    console.log(uploadFile);
                    if (files.length) {
                        // Uploading Files
                        FileAPI.upload({
                            url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
                            files: {
                                Filedata: uploadFile
                            },
                            complete: function(err, xhr) {
                                console.log(xhr);
                                console.log(xhr.responseText);
                                var json = (JSON.parse(xhr.responseText));
                                console.log(json);
                                if (json.success) {
                                    var images = document.getElementById("imgshow");
                                    var _lll = HKWselfpage_HTML.worksImageList.length;
                                    HKWselfpage_HTML.worksImageList.push(json.data);
                                    HKWselfpage_HTML.worksImageList[_lll].name = uploadFile.name;
                                    HKWselfpage_HTML.worksImageList[_lll].alt = "";
                                    imgclick_List();
                                    imgclickFunction(images);
                                    if (HKWselfpage_HTML.imgclickFunction_value == 0) {
                                        HKWselfpage_HTML.imgclickFunction_value++;
                                    } else {
                                        $('.imgclick:first .imgclick_a:eq(0)').click();
                                    }
                                } else {
                                    alertUploadMsg(json.message);
                                    return false;
                                };
                            }
                        });
                    }
                });
            });
            var chooses = document.getElementById('imgtopshow_input');
            FileAPI.event.on(chooses, 'change', function(evt) {
                var files = FileAPI.getFiles(evt); // Retrieve file list
                FileAPI.filterFiles(files, function(file, info /**Object*/ ) {
                    HKWselfpage_HTML.worksImageList_name.push(file.name);
                    if (/^image/.test(file.type)) {
                        if (file.size > 10 * FileAPI.MB) {
                            alertUploadMsg("文件大小限制在10M以内！");
                            return false;
                        };
                        return true;
                    } else {
                        return false;
                    };
                }, function(files /**Array*/ , rejected /**Array*/ ) {
                    console.log(files);
                    var uploadFile = files[0];
                    console.log(uploadFile);
                    if (files.length) {
                        // Uploading Files
                        FileAPI.upload({
                            url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
                            files: {
                                Filedata: uploadFile
                            },
                            complete: function(err, xhr) {
                                console.log(xhr);
                                console.log(xhr.responseText);
                                var json = (JSON.parse(xhr.responseText));
                                console.log(json);
                                if (json.success) {
                                    $('#imgtopshow').attr('src', json.data.file_path);
                                    HKWselfpage_HTML.worksNewTopShow = json.data.file_path;
                                } else {
                                    alertUploadMsg(json.message);
                                    return false;
                                };
                            }
                        });
                    }
                });
            });

            function imgclickFunction(images) {
                HKWselfpage_HTML.data.imgclickFunction.kind++;
                $('.imgclick:first .imgclick_a:eq(0)').off("click").click(function() {
                    if (HKWselfpage_HTML.worksImageList.length > 0) {
                        var _val2 = parseInt($(images).attr('value'));
                        HKWselfpage_HTML.worksImageList[_val2].alt = $('#imgtext').val();
                        _val2 = _val2 > 0 ? _val2 - 1 : 0;
                        var _path_pp = HKWselfpage_HTML.worksImageList[_val2].file_path.length > 0 ? HKWselfpage_HTML.worksImageList[_val2].file_path : HKWselfpage_HTML.worksImageList[_val2].path;
                        $(images).attr({
                            "src": _path_pp,
                            "value": _val2,
                            "data-id": HKWselfpage_HTML.worksImageList[_val2].id
                        });
                        $('#imgtext').val(HKWselfpage_HTML.worksImageList[_val2].alt.length < 1 ? "" : HKWselfpage_HTML.worksImageList[_val2].alt);
                        $('.imgclick:first p:eq(0)').html(HKWselfpage_HTML.worksImageList[_val2].name);
                        imgclick_List();
                    }
                });
                $('.imgclick:first .imgclick_a:eq(0)').click();

                $('.imgclick:first .imgclick_a:eq(1)').off("click").click(function() {
                    if (HKWselfpage_HTML.worksImageList.length > 0) {
                        var _val3 = parseInt($(images).attr('value'));
                        HKWselfpage_HTML.worksImageList[_val3].alt = $('#imgtext').val();
                        _val3 = _val3 < HKWselfpage_HTML.worksImageList.length - 1 ? _val3 + 1 : HKWselfpage_HTML.worksImageList.length - 1;
                        var _path_pp = HKWselfpage_HTML.worksImageList[_val3].file_path.length > 0 ? HKWselfpage_HTML.worksImageList[_val3].file_path : HKWselfpage_HTML.worksImageList[_val3].path;
                        images.setAttribute("src", _path_pp);
                        $(images).attr('value', _val3);
                        $('#imgtext').val(HKWselfpage_HTML.worksImageList[_val3].alt == undefined ? "" : HKWselfpage_HTML.worksImageList[_val3].alt);
                        $('.imgclick:first p:eq(0)').html(HKWselfpage_HTML.worksImageList[_val3].name);
                        imgclick_List();
                    }
                });

                $('.imgclick:first .imgclick_a:eq(2)').off("click").click(function() {
                    var _val = parseInt($(images).attr('value'));
                    // HKWselfpage_HTML.worksImageList = HKWselfpage_HTML.worksImageList.filter(function (value, index) {
                    //     return index != _val;
                    // });
                    console.log(HKWselfpage_HTML.worksImageList);
                    HKWselfpage_HTML.worksImageList.splice(_val, 1);
                    console.log(HKWselfpage_HTML.worksImageList);
                    if (HKWselfpage_HTML.worksImageList.length > 0) {
                        if (_val > HKWselfpage_HTML.worksImageList.length - 1) {
                            _val = HKWselfpage_HTML.worksImageList.length - 1;
                            var _path_pp1 = HKWselfpage_HTML.worksImageList[_val].file_path.length > 0 ? HKWselfpage_HTML.worksImageList[_val].file_path : HKWselfpage_HTML.worksImageList[_val].path;
                            images.setAttribute("src", _path_pp1);
                            $(images).attr('value', _val);
                            $('#imgtext').val(HKWselfpage_HTML.worksImageList[_val].alt == undefined ? "" : HKWselfpage_HTML.worksImageList[_val].alt);
                            $('.imgclick:first p:eq(0)').html(HKWselfpage_HTML.worksImageList[_val].name);
                            imgclick_List();
                        } else {
                            var _path_pp2 = HKWselfpage_HTML.worksImageList[_val].file_path.length > 0 ? HKWselfpage_HTML.worksImageList[_val].file_path : HKWselfpage_HTML.worksImageList[_val].path;
                            images.setAttribute("src", _path_pp2);
                            $(images).attr('value', _val);
                            $('#imgtext').val(HKWselfpage_HTML.worksImageList[_val].alt == undefined ? "" : HKWselfpage_HTML.worksImageList[_val].alt);
                            $('.imgclick:first p:eq(0)').html(HKWselfpage_HTML.worksImageList[_val].name);
                            imgclick_List();
                        }
                    } else {
                        $(images).attr('value', 0);
                        $(images).attr('src', "./image/noimage.png");
                        $('.imgclick:first p:eq(0)').html("请上传图片");
                        $('#work_images').html("单张图片100M以内，RGB模式，支持jpg/png格式，最多上传10张图片，支持批量上传");
                        $('#workshow_img').val("");
                        HKWselfpage_HTML.worksImageList = [];
                        imgclick_List();
                    }
                });

                $('.imgclick:first .imgclick_a:eq(3)').on('click', function() {
                    if (HKWselfpage_HTML.worksImageList.length > 0) {
                        var _topshow = document.getElementById("imgtopshow");
                        var _val4 = parseInt($(images).attr('value'));
                        $(_topshow).attr('name', HKWselfpage_HTML.worksImageList[_val4].name);
                        var _path = HKWselfpage_HTML.worksImageList[_val4].file_path.length > 0 ? HKWselfpage_HTML.worksImageList[_val4].file_path : HKWselfpage_HTML.worksImageList[_val4].path;
                        _topshow.setAttribute("src", _path);
                        HKWselfpage_HTML.worksNewTopShow = _path;
                    }
                });
            }
            HKWselfpage_HTML.data.imgclickFunction = imgclickFunction;

            function imgclick_List() {
                var innH = '';
                for (var i = 0; i < HKWselfpage_HTML.worksImageList.length; i++) {
                    innH += '<li value="' + i + '"><img src="' + HKWselfpage_HTML.worksImageList[i].file_path + '" alt="' + HKWselfpage_HTML.worksImageList[i].alt + '" class="overbig" data-id="' + HKWselfpage_HTML.worksImageList[i].id + '">' + '<a title="' + HKWselfpage_HTML.worksImageList[i].name + '">' + HKWselfpage_HTML.worksImageList[i].name + '</a>' + '<a title="' + HKWselfpage_HTML.worksImageList[i].alt + '">' + HKWselfpage_HTML.worksImageList[i].alt + '</a>' + '<a><i></i>上移</a>' + '<a><i></i>下移</a>' + '</li>';
                };
                setTimeout(function() {
                    if (HKWselfpage_HTML.worksImageList.length > 0) {
                        $('#imgshow_list').html(innH);
                    } else {
                        $('#imgshow_list').html("图片数量为0");
                    }
                    if (HKWselfpage_HTML.imgclickFunction_value == 1) {
                        imagelistDisplay();
                        HKWselfpage_HTML.imgclickFunction_value++;
                    }
                    iiimove();
                }, 500);
            }
            HKWselfpage_HTML.data.workshowArray.imgclick_List = imgclick_List;
        }
        works_imageInput_show();

        //图片上传列表的展示隐藏
        function imagelistDisplay() {
            var outclickVal = "",
                Pclick = "";
            $('.imglist:first').on('mouseover', function() {
                var _this = $(this);
                _this.attr('value', "inbox");
            });
            $('.imglist:first').on('mouseout', function() {
                var _this = $(this);
                _this.attr('value', "outbox");
            });
            //列表框显示消失
            $('.imgclick:first p:eq(1)').click(function() {
                Pclick = "2222";
                var showValue = $('.imglist:first').attr('name');
                if (showValue != undefined) {
                    if (showValue == "noshow") {
                        $('.imglist:first').css('display', 'block');
                        $('.imglist:first').attr('name', "inshow");
                        $('.imgclick:first p:eq(1)').css('color', '#0bacf5');
                    } else {
                        $('.imglist:first').css('display', 'none');
                        $('.imglist:first').attr('name', "noshow");
                        $('.imgclick:first p:eq(1)').css('color', '');
                    }
                } else {
                    $('.imglist:first').css('display', 'block');
                    $('.imglist:first').attr('name', "inshow");
                }
            });

            function outclick() {
                $(document).on('click', function() {
                    if (Pclick == "2222") {
                        Pclick = "";
                    } else {
                        outclickVal = $('.imglist:first').attr('value');
                        outclickshow(outclickVal);
                    }
                });
            }
            outclick();

            function outclickshow(data) {
                var aaa = $('.imglist:first').attr('name');
                if (data == "outbox") {
                    if (aaa == "inshow") {
                        $('.imglist:first').css('display', 'none');
                        $('.imglist:first').attr('name', "noshow");
                        $('.imgclick:first p:eq(1)').css('color', '');
                    }
                }
            }
        }
        //上下移动实现&&点击图片名称显示
        function iiimove() {
            var overbig = document.getElementsByClassName("overbig");
            for (var o = 0; o < overbig.length; o++) {
                var ddd_path = HKWselfpage_HTML.worksImageList[o].file_path.length > 0 ? HKWselfpage_HTML.worksImageList[o].file_path : HKWselfpage_HTML.worksImageList[o].path;
                overbig[o].setAttribute("src", ddd_path);
                $(overbig[o]).click(function() {
                    $('.imgshow_real:first').css({ 'display': "block" });
                    var _src = $(this).attr('src');
                    $('#showreal_img').attr('src', _src);
                    var _this = document.getElementById("showreal_img");
                    var _width = parseInt(_this.naturalWidth);
                    var _height = parseInt(_this.naturalHeight);
                    var w_width = parseInt(window.innerWidth);
                    var w_height = parseInt(window.innerHeight);
                    if (_width > _height) {
                        if (_width > w_width) {
                            $('#showreal_img').css('width', w_width - 60);
                            $('#showreal_img').css('height', parseInt((w_width - 60 / _width) * _height));
                        } else {
                            $('#showreal_img').css('width', _width);
                            $('#showreal_img').css('height', _height);
                        }
                    } else {
                        if (_height > w_height) {
                            $('#showreal_img').css('height', w_height - 60);
                            $('#showreal_img').css('width', parseInt((w_height - 60 / _height) * _width));
                        } else {
                            $('#showreal_img').css('width', _width);
                            $('#showreal_img').css('height', _height);
                        }
                    }
                });
                $(overbig[o]).on('mouseenter', function() {
                    var _src = $(this).attr('src');
                    $('#hoverimg').attr('src', _src);
                    $('#imghover').css('display', "block");
                    var _this = document.getElementById("hoverimg");
                    var _width = parseInt(_this.naturalWidth);
                    var _height = parseInt(_this.naturalHeight);
                    var w_width = 400;
                    var w_height = 400;
                    if (_width > _height) {
                        if (_width > w_width) {
                            $('#hoverimg').css('width', w_width);
                            $('#hoverimg').css('height', parseInt(w_width / _width * _height));
                        } else {
                            $('#hoverimg').css('width', _width);
                            $('#hoverimg').css('height', _height);
                        }
                    } else {
                        if (_height > w_height) {
                            $('#hoverimg').css('height', w_height);
                            $('#hoverimg').css('width', parseInt(w_height / _height * _width));
                        } else {
                            $('#hoverimg').css('width', _width);
                            $('#hoverimg').css('height', _height);
                        }
                    }
                });
                $(overbig[o]).on('mouseleave', function() {
                    $('#imghover').css('display', "none");
                });
            }
            $('#imgshow_list li').each(function() {
                var _this = $(this);
                _this.find('a:eq(2)').on('click', function() {
                    var keyword = parseInt(_this.attr('value')),
                        altW = $(this).parent().find("img").attr("alt");
                    if (keyword > 0) {
                        var change = HKWselfpage_HTML.worksImageList[keyword - 1];
                        HKWselfpage_HTML.worksImageList[keyword - 1] = HKWselfpage_HTML.worksImageList[keyword];
                        HKWselfpage_HTML.worksImageList[keyword] = change;
                        HKWselfpage_HTML.data.workshowArray.imgclick_List();
                    }
                });
                _this.find('a:eq(3)').on('click', function() {
                    var keyword = parseInt(_this.attr('value')),
                        altW = $(this).parent().find("img").attr("alt");
                    if (keyword < HKWselfpage_HTML.worksImageList.length - 1) {
                        var change = HKWselfpage_HTML.worksImageList[keyword + 1];
                        HKWselfpage_HTML.worksImageList[keyword + 1] = HKWselfpage_HTML.worksImageList[keyword];
                        HKWselfpage_HTML.worksImageList[keyword] = change;
                        HKWselfpage_HTML.data.workshowArray.imgclick_List();
                    }
                });
                _this.find('a:eq(0)').on('click', function() {
                    var _this_value = _this.attr('value');
                    $('.imglist:first').css('display', 'none');
                    $('.imglist:first').attr('name', "noshow");
                    var images = document.getElementById("imgshow");
                    console.log(HKWselfpage_HTML.worksImageList[_this_value]);

                    if (HKWselfpage_HTML.worksImageList[_this_value].file_path == "") {
                        imagesend.worksimage(images, HKWselfpage_HTML.worksImageList[_this_value].file);
                    } else {
                        if (HKWselfpage_HTML.worksImageList[_this_value].file_path.indexOf("http://") > -1 || HKWselfpage_HTML.worksImageList[_this_value].file_path.indexOf("https://") > -1) {
                            // images.setAttribute("src", HKWselfpage_HTML.worksImageList[_this_value].file_path);
                            $(images).attr({
                                "src": HKWselfpage_HTML.worksImageList[_this_value].file_path,
                                "data-id": HKWselfpage_HTML.worksImageList[_this_value].id
                            })
                        } else if (HKWselfpage_HTML.worksImageList[_this_value].file_path.indexOf("works/images/") > -1) {
                            // images.setAttribute("src", urlLocalhost + '/' + HKWselfpage_HTML.worksImageList[_this_value].file_path);
                            $(images).attr({
                                "src": urlLocalhost + '/' + HKWselfpage_HTML.worksImageList[_this_value].file_path,
                                "data-id": HKWselfpage_HTML.worksImageList[_this_value].id
                            })
                        }
                    }
                    $(images).attr('value', _this_value);
                    $('#imgtext').val(HKWselfpage_HTML.worksImageList[_this_value].alt == undefined ? "" : HKWselfpage_HTML.worksImageList[_this_value].alt);
                    $('.imgclick:first p:eq(0)').html(HKWselfpage_HTML.worksImageList[_this_value].name);
                });
            });
        }

        //点击查看原图片尺寸
        function realshow() {
            $('#imgshow').on('click', function() {
                $('.imgshow_real:first').css('display', "block");
                $('.imgshow_real:first').attr('value', "show");
                var _src = $(this).attr('src');
                $('#showreal_img').attr('src', _src);
                var _this = document.getElementById("showreal_img");
                var _width = parseInt(_this.naturalWidth);
                var _height = parseInt(_this.naturalHeight);
                var w_width = parseInt(window.innerWidth);
                var w_height = parseInt(window.innerHeight);
                if (_width > _height) {
                    if (_width > w_width) {
                        $('#showreal_img').css('width', w_width - 60);
                        $('#showreal_img').css('height', parseInt((w_width - 60 / _width) * _height));
                    } else {
                        $('#showreal_img').css({ 'width': _width, 'height': _height });
                    }
                } else {
                    if (_height > w_height) {
                        $('#showreal_img').css('height', w_height - 60);
                        $('#showreal_img').css('width', parseInt((w_height - 60 / _height) * _width));
                    } else {
                        $('#showreal_img').css({ 'width': _width, 'height': _height });
                    }
                }
            });

            $('.imgshow_real:first').on('click', function() {
                $(this).css('display', "none");
            });
        }
        realshow();
        $('.imgclick:first .imgclick_a:eq(0)').on('mouseenter', function() {
            $('.imgclick:first .imgclick_a:eq(3)').html("上一张");
            $('.imgclick:first .imgclick_a:eq(3)').css('color', "#999");
        });
        $('.imgclick:first .imgclick_a:eq(0)').on('mouseleave', function() {
            $('.imgclick:first .imgclick_a:eq(3)').html("设为封面");
            $('.imgclick:first .imgclick_a:eq(3)').css('color', "");
        });
        $('.imgclick:first .imgclick_a:eq(1)').on('mouseenter', function() {
            $('.imgclick:first .imgclick_a:eq(3)').html("下一张");
            $('.imgclick:first .imgclick_a:eq(3)').css('color', "#999");
        });
        $('.imgclick:first .imgclick_a:eq(1)').on('mouseleave', function() {
            $('.imgclick:first .imgclick_a:eq(3)').html("设为封面");
            $('.imgclick:first .imgclick_a:eq(3)').css('color', "");
        });
        $('.imgclick:first .imgclick_a:eq(2)').on('mouseenter', function() {
            $('.imgclick:first .imgclick_a:eq(3)').html("删除");
            $('.imgclick:first .imgclick_a:eq(3)').css('color', "#999");
        });
        $('.imgclick:first .imgclick_a:eq(2)').on('mouseleave', function() {
            $('.imgclick:first .imgclick_a:eq(3)').html("设为封面");
            $('.imgclick:first .imgclick_a:eq(3)').css('color', "");
        });

        //
        var objs = document.getElementsByClassName("show_real");
        for (var i = 0; i < objs.length; i++) {
            var _this = objs[i];
            if (navigator.userAgent.indexOf("Firefox") > 0) {
                _this.addEventListener('DOMMouseScroll', function(e) {
                    e.preventDefault();
                }, false);
            } else {
                _this.onmousewheel = function(e) {
                    e = e || window.event;
                    return false;
                };
            }
        };

        //取消
        $('.clearbuttonchoose:eq(3)').click(function() {
            setTimeout(function() {
                $('#imgtopshow').attr('src', './image/fengmian.png');
                $('#theWork_id').attr('value', "0");
                $('input[name=worksname]').attr('value', "");
                $('input[name=work_keyword]').attr('value', "");

                $('#worksshow_textarea').val("");
                $('#workstext').val("");
                $('.alterbeforesave:last').html('<span id="workshowlength" style="float: left;" >' + '当前： <i class="textlength" style="font-style: normal;">0</i>' + '<i class="textlengthshow" style="font-style: normal;color:#0bacf5;">/500</i>' + '</span>' + '<span style="float: right;margin-right: 60px;">字数范围:<i  style="color:#f33919;font-style: normal;">0-500</i></span>');
                HKWselfpage_HTML.worksImageList = [];
                HKWselfpage_HTML.worksNewTopShow = "";
                HKWselfpage_HTML.worksVideoList = [];
                HKWselfpage_HTML.dataWorksfFromdata = {};
                $('#work_images').html('单张图片10M以内，RGB模式，支持jpg/png/jpeg/gif格式，最多上传10张图片，支持批量上传');
                $('#work_images').css('color', "#aaa");
                $('.imgclick:first .imgclick_a:eq(0)').html("请上传图片");
                $('#imgshow').attr('src', './image/noimage.png');
                $('#imgtext').val("");
                $('#imgshow_list').html("图片数量为0");
                $('#videoalter_change').html("大小300M以内，本地视频仅支持MP4等格式");
                $('#videoalter_change').css('color', "#aaa");
                $('.imgclick:last .imgclick_a:eq(0)').html("请上传视频");
                $('#work_video').html('<source src="" type="video/mp4" />');
                $('#videotext').val("");
                $('#videoshow_list').html("视频数量为0");
                $('.workshow_industry.workindustry ul:eq(0) li').attr("class", "");
                $('.workshow_industry.workindustry ul:eq(1)').attr('value', "");
                $('.workshow_industry.workindustry ul:eq(2)').attr('value', "");
                $('.workshow_industry.workindustry ul:eq(1)').html("");
                $('.workshow_industry.workindustry ul:eq(2)').html("");
                $('input[name="workindustry"]').val("");
            }, 1000);
        });
    },


    //delete_alert
    delete_alert: function delete_alert() {
        $('#alterbox .deletecheck').click(function() {
            var delete_reason = $('#alterbox input[name="delete"]').val();
            var alter_value = $('#alterbox').attr('value').split('_');
            var result = void 0;
            if (delete_reason != "" && delete_reason.length > 0) {
                $.ajax({
                    url: urlLocalhost + newhuakwang + "/change_work_info/" + alter_value[0] + "/" + alter_value[1],
                    type: "post",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    data: { display: "4", delete_reason: delete_reason }
                }).done(function(data) {
                    if (data.success) {
                        //HKWselfpage_HTML.data.worksList();
                    }

                });
            } else {
                alert("请输入原因！");
            }
        });
        $('#alterbox .deletemiss').click(function() {
            $('#alterbox').css('display', "none");
        });
    }
};
(function() {
    HKWselfpage_HTML.sendbutton_alert();
    HKWselfpage_HTML.cfbf_intocheck();
    HKWselfpage_HTML.sexselect();
    HKWselfpage_HTML.experiencselect();
    HKWselfpage_HTML.schoolselect();
    HKWselfpage_HTML.selectmouseWheel();
    HKWselfpage_HTML.inlocaladdress();
    HKWselfpage_HTML.baseInfSaveCheck();
    HKWselfpage_HTML.aboutselfShowCheck();
    HKWselfpage_HTML.aboutselfSaveCheck();
    HKWselfpage_HTML.theskillClickAdd();
    HKWselfpage_HTML.theskillAdd();
    HKWselfpage_HTML.worksshow();
    HKWselfpage_HTML.delete_alert();
    altSave();
})();
//HKWselfpage_HTML.baseInfSaveCheck();
function altSave() {
    $("#imgtext").keyup(function() {
        var idx = $(this).parent().prev().find("img").attr("value"),
            val = $(this).val();
        $("#imgshow_list li:eq(" + idx + ")").find("img").attr("alt", val);
        $("#imgshow_list li:eq(" + idx + ")").find("a").eq(1).html(val).attr("title", val);
        HKWselfpage_HTML.worksImageList[idx].alt = $(this).val();
    })
};