/**
 * Created by admin on 2017/3/7.
 */
"use strict";
//139.224.68.145:8080
//7214684
(function () {
    var user_test_id= getCookie('user_id');
    var user_test = { id: user_test_id, username: getCookie("user_name") };
    var user = void 0;var timedata = void 0;var flag = false;

    $('.alertDomSure:first').on('click', function () {
        var _html=$('.alertDom:first p:eq(0)').html().split(" ");
        var sun_html = _html.slice(3);
        $('#inlocaladdress input').val(sun_html.join(" "));
        $("#selfpageCity p span").eq(0).html(_html[0]);
        $("#selfpageCity p span").eq(1).html(_html[1]);
        $("#selfpageCity p span").eq(2).html(_html[2]);
        $('#inlocaladdress').attr('data-select-lng',$('.alertDom:first').attr('data-select-lng'));
        $('#inlocaladdress').attr('data-select-lat',$('.alertDom:first').attr('data-select-lat'));
        $('#inlocaladdress span:eq(0) img:first').css("backgroundColor" ,"#0bacf5");
    });

    HKWselfpage_HTML.data.user = function () {
        $.ajax({
            url: urlLocalhost + newhuakwang+"get_self_info/"+user_test.id,
            type: "post",
            dataType: "json",
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            data: ""
        }).done(function (data) {
            user=data.data;
            $(".cfolookaround").attr("href","MyDetailed.html?id="+getCookie("user_id"));
            $('.nicheng:first').html(user.nick_name ?user.nick_name :"");
            user.percentage=0;

            if (user.path != null && user.path.length > 0) {
                if(user.path.indexOf('http')>-1){
                    $('#touxiangImage').attr('src', user.path);
                }else{
                    $('#touxiangImage').attr('src', urlLocalhost + "/" + user.path);
                };
                $('#touxiang').attr('class', "cfbheadimagehad");
            };
            if (user.background_path != null && user.background_path.length > 0) {
                if(user.background_path.indexOf('http')>-1){
                    $('#cfosendimageP').attr('src',user.background_path);
                }else{
                    $('#cfosendimageP').attr('src', urlLocalhost + "/" + user.background_path);
                };
            };
            if(user.is_auth == 1) {
                $(".addsending").css({
                    "opacity":"0.3",
                    "cursor":"default"
                })
            };
            HKWselfpage_HTML.data.dataCheck();
            HKWselfpage_HTML.data.dataZDYBQ();
            HKWselfpage_HTML.data.selfImageChange();
        });
    };
    HKWselfpage_HTML.data.user();
    $(".addsendbutton").click(function () {
        if(user.is_auth == 0 && user.percentage) {
            $.ajax({
                url:urlLocalhost + newhuakwang+"/submit_user_auth",
                type:"post",
                data:{
                    experience:user.experience,
                    jobs:user.jobs[0] || "",
                    keywords:user.keywords.join(","),
                    signature:user.signature_bbs || "",
                    nick_name:user.nick_name,
                    sex:user.sex,
                    user_id:getCookie("user_id")
                },
                dataType:"json",
                success:function (res) {
                    if(res.success){
                        alertUploadMsg(res.message);
                    }else{
                        alertUploadMsg(res.message);
                    };
                }
            });
        }
    });



    HKWselfpage_HTML.data.dataCheck = function () {
        user.uBaseInfValue=[];
        if (user.is_auth!=0) {
            $('div.sendckeckbutton:first').html("已认证").removeClass("notcheck").addClass("incheck");
        } else {
            $('div.sendckeckbutton:first').html("未认证").removeClass("incheck").addClass("notcheck");
        };
        if (user.auth_works_count != 0) {
            if (user.auth_works_count < 6) {
                $('div.sendckeckbutton:last').html("审核状态(" + user.auth_works_count + "/6)").removeClass("incheck").addClass("notcheck");
            } else {
                $('div.sendckeckbutton:last').html("已审核(6/6)").removeClass("notcheck").addClass("incheck");
            };
        } else {
            $('div.sendckeckbutton:last').html("未通过审核(0/6)").removeClass("incheck").addClass("notcheck");
        };
        // $('a.addsendbutton:first').on('mouseover', function () {
        //     $('a.addsendalert:first').stop(true);
        //     if (user.is_auth != 0) {
        //         $('a.addsendalert:first').animate({ opacity: 0 }, 300, function () {
        //             $(this).html('丰富您的作品案例，展现您的专业水平');
        //         }).animate({ opacity: 1 }, 300);
        //     } else if (user.works_count == 0) {
        //         $('a.addsendalert:first').animate({ opacity: 0 }, 300, function () {
        //             $(this).html('通过审核的作品不少于6个才能通过设计师认证');
        //         }).animate({ opacity: 1 }, 300);
        //     } else if ((user.work_list||[]).length < 6) {
        //         if (user.works_count == (user.works_list||[]).length) {
        //             $('a.addsendalert:first').animate({ opacity: 0 }, 300, function () {
        //                 $(this).html('通过审核的作品不可修改删除，但可选择隐藏或展示');
        //             }).animate({ opacity: 1 }, 300);
        //         } else {
        //             $('a.addsendalert:first').animate({ opacity: 0 }, 300, function () {
        //                 $(this).html('新保存的作品提交审核后，我们将会在1-3个工作日内反馈审核结果');
        //             }).animate({ opacity: 1 }, 300);
        //         };
        //     } else {
        //         $('a.addsendalert:first').animate({ opacity: 0 }, 300, function () {
        //             $(this).html('通过设计师认证后即可承接项目');
        //         }).animate({ opacity: 1 }, 300);
        //     };
        // });


        // 1   bbs_baseInfForm表单数据
        if (user.type !=0&&user.type != null&&user.type != undefined) {
            user.uBaseInfValue.push("1");
            if (user.type == 1) {
                $('#bbs_baseInfForm .checkradio i:eq(0)').attr('class', 'incheckradio');
                $('input[name="cfbf_intocheck"]').val(1);
            } else {
                $('#bbs_baseInfForm .checkradio i:eq(1)').attr('class', 'incheckradio');
                $('input[name="cfbf_intocheck"]').val(2);
            };
        };
        //2
        if(user.nick_name != null ){
            $('input[name="showname"]').attr('value',user.real_name);
            user.uBaseInfValue.push("1");
        };

        //3
        if (user.sex != 0&&user.sex!="保密") {
            user.uBaseInfValue.push("1");
            if (user.sex == "男") {
                $('dl.sex dd.wait').html("男");
                $('input[name="sex"]').val(1);

            } else {
                $('dl.sex dd.wait').html("女");
                $('input[name="sex"]').val(2);
            }
        };
        //4
        user.experience=parseInt(user.experience)||0;
        if (user.experience != null&&user.experience!=0) {
            user.uBaseInfValue.push("1");
            if (user.experience <= 1 || user.experience == 99) {
                $('dl.experience dd.wait').html("1年以下");
            } else if (user.experience <= 3) {
                $('dl.experience dd.wait').html("1-3年");
            } else if (user.experience <= 5) {
                $('dl.experience dd.wait').html("3-5年");
            } else if (user.experience < 10) {
                $('dl.experience dd.wait').html("5-10年");
            } else {
                $('dl.experience dd.wait').html("10年以上");
            }
            $('input[name="experience"]').val(user.experience);
        };
        //5
        if (user.education != null) {
            user.uBaseInfValue.push("1");
            $('dl.education dd.wait').html(user.education);
            $('input[name="education"]').val(user.education);
        };
        //6
        if(user.school != null ){
            $('input[name="universities"]').val(user.school);
            user.uBaseInfValue.push("1");
        };
        //7
        if (user.txt_address_full != null) {
            user.uBaseInfValue.push("1");
            $('input[name="location"]').val(user.txt_address_full);
            var txt_address = user.txt_address_full.split(" ").filter(function (x) {
                return x != "";
            });
            var intxt_address = ["中国", "", "", ""];
            intxt_address[1] = txt_address[0] == 0 ? "省" : txt_address[0]=="未知"? "省":txt_address[0];
            intxt_address[2] = txt_address[1] || "市";
            intxt_address[3] = txt_address[2] || "县/区/市";
            var inspan = '';
            user.area = user.area == null ? 0 : user.area;
            var area = [user.country == null ? user.area : user.country,
                user.province == null ? user.area : user.province,
                user.city == null ? user.area : user.city,
                user.area];
            for (var key = 1; key < intxt_address.length; key++) {
                if (key == intxt_address.length - 1) {
                    inspan = inspan + '<span value="' + area[key] + '">' + intxt_address[key] + '</span>';
                } else {
                    inspan = inspan + '<span value="' + area[key] + '">' + intxt_address[key] + '</span>-';
                }
            }
            $('dl.location dd.wait').html('<p style="width: auto;white-space:nowrap;padding-right: 16px;text-align: start">'+inspan+'</p>');
        };
        var locationWait=setInterval(function () {
           if(data_area_tb.length>0&&data_area_tb.length==(data_area_tb_province.length+data_area_tb_city.length+data_area_tb_area.length+1)){
               areaSelectPlug.selectCreate("location");
               clearInterval(locationWait);
           }
        },100);
        $('input[name="address"]').val(user.address != null ? user.address : "");

        user.uAboutselfValue=[];
        //    bbs_aboutselfFrom
        if (user.signature != null) {
            if (user.signature != 0&&user.signature != "") {
                user.uAboutselfValue.push("1");
                $('#signature').html(user.signature);
                $('input[name="onekindword"]').val(user.signature);
            }
        }
        if (user.signature_bbs != null) {
            if (user.signature_bbs != 0&&user.signature_bbs != "") {
                user.uAboutselfValue.push("1");
                $('#aboutmyself_textarea').val(user.signature_bbs);
            }
        }
        if(user.jobs.length>0){
            $('input[name="job_work"]').val(user.jobs.join(","));
        }
        user.uSkillValue=(user.keywords||[]).length;
        user.uWorksValue=parseInt(user.works_count);
        //    bbs_skillfFrom
        var bbs_skillfFrom =['',user.keywords,''];
        var spans = $('.chooseskill span');
        for (var s = 0; s < bbs_skillfFrom[1].length; s++) {
            var _key = HKWselfpage_HTML.skillData.indexOf(bbs_skillfFrom[1][s]);
            if (_key != -1) {
                $(spans[_key]).addClass("inchoose");
                $(spans[_key]).parent('a').siblings(".ck_logo:first").addClass("inchoose");
            }
            bbs_skillfFrom[0] += '<div class="inskill">' + bbs_skillfFrom[1][s] + '&nbsp;<i>×</i></div>';
            bbs_skillfFrom[2] += '<a class="showskill">' + bbs_skillfFrom[1][s] + '</a>';
        }
        $('#bbs_skillfFrom .addskill:first').html(bbs_skillfFrom[0]);
        $('#shanchangjineng_show').html(bbs_skillfFrom[2]);
        $('#bbs_skillfFrom .addskill:first').attr('value', bbs_skillfFrom[1]);

        user.changeValue=0;
        if(user.path!=null && user.path.length>0){
            user.changeValue=50;
            if(user.uBaseInfValue.length==7){
                user.changeValue=200;
                if (user.uAboutselfValue.length ==2) {
                    user.changeValue=320;
                    if (user.uSkillValue>0) {
                        user.changeValue=460;
                        if (user.auth_works_count>5) {
                            user.changeValue=600;
                        }
                    }
                }
            }
        }

        user.changeValue=user.changeValue+"px";
        user.percentage=parseFloat( ( ((user.path!=null && user.path.length>0)==true?1:0)+parseFloat(user.uBaseInfValue.length/7)+parseFloat(user.uAboutselfValue.length/2)+(user.uSkillValue>0?1:0)+parseFloat(user.auth_works_count>6?1:(user.auth_works_count/6)))/5);
        user.percentage=parseInt(user.percentage*100);
        HKWselfpage_HTML.data.skillchange_delete();
        industrySelectPlug.selectCreate();
        HKWselfpage_HTML.data.dataFinshLine();
    };

    HKWselfpage_HTML.data.bianjitinajia = function () {
        //编辑添加按钮初始化
        var editor = $('.editor');
        var addeditor = $('.addeditor');
        var cfbfbb_show = $('.cfbfbb_show');
        var cfbfbb_write = $('.cfbfbb_write');

        var _loop = function _loop(i) {
            editor[i].value = i;
            var heightchangediv = $(cfbfbb_write[i]).children(".heightchangediv")[0];
            var closebianjitianjia = $(cfbfbb_write[i]).children(".closebianjitianjia")[0];
            heightchangediv.value = heightchangediv.style.height;
            editor[i].onclick = function () {
                if ($(editor[i]).attr('name') == "ready") {
                    cfbfbb_show[i].style.opacity = 0;
                    setTimeout(function () {
                        cfbfbb_show[i].style.display = "none";
                        cfbfbb_write[i].style.position = "relative";
                        cfbfbb_write[i].style.minHeight = "120px";
                        cfbfbb_write[i].style.display = "block";
                        heightchangediv.style.height = "0px";
                        heightchangediv.style.display = "block";
                        closebianjitianjia.style.display = "inline-block";
                        setTimeout(function () {
                            heightchangediv.style.opacity = 1;
                            cfbfbb_write[i].style.opacity = "1";
                            closebianjitianjia.style.transform = "rotate(225deg)";
                            heightchangediv.style.height = heightchangediv.value;
                        }, 10);
                    }, 10);
                } else {
                    $(editor[i]).children('a')[0].style.cursor = "wait";
                    setTimeout(function () {
                        $(editor).each(function () {
                            $(this).attr('name', "ready");
                        });
                        $(addeditor).each(function () {
                            $(this).attr('name', "ready");
                        });
                        $(editor[i]).children('a')[0].style.cursor = "pointer";
                        editor[i].click();
                    }, 10);
                }
            };
        };

        for (var i = 0; i < editor.length; i++) {
            _loop(i);
        }

        var _loop2 = function _loop2(j) {
            addeditor[j].value = j;
            var heightchangediv = $(cfbfbb_write[j + editor.length]).children(".heightchangediv")[0];
            var closebianjitianjia_other = $(cfbfbb_write[j + editor.length]).children(".closebianjitianjia_other")[0];
            heightchangediv.value = heightchangediv.style.height;
            addeditor[j].onclick = function () {
                if ($(addeditor[j]).attr('name') == "ready") {
                    cfbfbb_show[j + editor.length].style.opacity = 0;
                    setTimeout(function () {
                        cfbfbb_show[j + editor.length].style.display = "none";
                        cfbfbb_write[j + editor.length].style.position = "relative";
                        cfbfbb_write[j + editor.length].style.minHeight = "120px";
                        cfbfbb_write[j + editor.length].style.display = "block";
                        heightchangediv.style.height = "0px";
                        heightchangediv.style.display = "block";
                        closebianjitianjia_other.style.display = "inline-block";
                        setTimeout(function () {
                            heightchangediv.style.opacity = 1;
                            cfbfbb_write[j + editor.length].style.opacity = "1";
                            closebianjitianjia_other.style.transform = "rotate(225deg)";
                            heightchangediv.style.height = heightchangediv.value;
                        }, 100);
                    }, 100);
                } else {
                    $(addeditor[j]).children('a')[0].style.cursor = "wait";
                    setTimeout(function () {
                        $(editor).each(function () {
                            $(this).attr('name', "ready");
                        });
                        $(addeditor).each(function () {
                            $(this).attr('name', "ready");
                        });
                        $(addeditor[j]).children('a')[0].style.cursor = "pointer";
                        addeditor[j].click();
                    }, 100);
                }
            };
        };

        for (var j = 0; j < addeditor.length; j++) {
            _loop2(j);
        }
    };HKWselfpage_HTML.data.bianjitinajia();

    //头像上传
    HKWselfpage_HTML.data.touxiangsend = function () {
        //个人头像上传
        var chooses = document.getElementById('touxiangInput');
        FileAPI.event.on(chooses, 'change', function (evt){
            var files = FileAPI.getFiles(evt); // Retrieve file list
            FileAPI.filterFiles(files, function (file, info/**Object*/){
                HKWselfpage_HTML.worksImageList_name.push(file.name);
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
                                $("#touxiangImage").attr("src",json.data.file_path);
                                $.ajax({
                                    url: urlLocalhost + newhuakwang+"change_user_info",
                                    type: "post",
                                    dataType: "json",
                                    xhrFields:{
                                        withCredentials:true
                                    },
                                    crossDomain: true,
                                    data: {
                                        user_id:getCookie("user_id"),
                                        path:json.data.file_path
                                    }
                                }).done(function (data1) {
                                    if(data1.success){
                                        // alert("修改成功！");
                                    }else{
                                        alertUploadMsg(data1.message);
                                    };
                                });
                            } else {
                                alertUploadMsg(json.message);
                                return false;
                            };
                        }
                    });
                }
            });
        });

    };
    // HKWselfpage_HTML.data.touxiangsend();
    //背景图片上传
    HKWselfpage_HTML.data.BGPsend = function () {

        var chooses = document.getElementById('cfosendimageinput');
        FileAPI.event.on(chooses, 'change', function (evt){
            var files = FileAPI.getFiles(evt); // Retrieve file list
            FileAPI.filterFiles(files, function (file, info/**Object*/){
                HKWselfpage_HTML.worksImageList_name.push(file.name);
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
                                $("#cfosendimageP").attr("src",json.data.file_path);
                                $.ajax({
                                    url: urlLocalhost + newhuakwang+"change_user_info",
                                    type: "post",
                                    dataType: "json",
                                    xhrFields:{
                                        withCredentials:true
                                    },
                                    crossDomain: true,
                                    data: {
                                        user_id:getCookie("user_id"),
                                        background_path:json.data.file_path
                                    }
                                }).done(function (data1) {
                                    if(data1.success){
                                        // alertUploadMsg("修改成功！");
                                    }else{
                                        alertUploadMsg(data1.message);
                                    }
                                });
                            } else {
                                alertUploadMsg(json.message);
                                return false;
                            };
                        }
                    });
                }
            });
        });
    };
    // HKWselfpage_HTML.data.BGPsend();

    HKWselfpage_HTML.data.dataFinshLine = function () {

        $('a.addsendbutton:first').on('mouseout', function () {
            $('a.addsendalert:first').stop(true).animate({ opacity: 1 }, 300, function () {
                $(this).html("已完成:" + user.percentage + "%");
            });
        });
        var pcValue = 0;
        var percentageChange = setInterval(function () {
            $('a.addsendalert:first').html("已完成:" + pcValue + "%");
            if (pcValue < user.percentage) {
                pcValue++;
            } else {
                clearInterval(percentageChange);
            }
        }, 50);

        $('.addfinshed .controlwidth').css({ "width": user.changeValue });
        lineLightLong(user);
    };

    HKWselfpage_HTML.data.selfImageChange = function () {
        $('#touxiang').css('background', 'url(' + (user.path != true && String(user.path).length > 0) == true ? "../" + user.path : "../image/self.png" + ')');
    };

    HKWselfpage_HTML.data.dataBaseInForm = function (dataBaseInf) {
        var result = void 0;
        dataBaseInf.user_id=user_test.id;
        return $.ajax({
            url: urlLocalhost + newhuakwang+"change_user_info",
            type: "post",
            dataType: "json",
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            data: dataBaseInf
        }).done(function (data) {
            if(data.success){
                result="111";
                HKWselfpage_HTML.data.dataCheck();
            }else{
                result="eee";
            }
            return result
        });
    };

    HKWselfpage_HTML.data.dataZDYBQ = function () {
        var zdybqarrery = void 0;
        //自定义标签添加+初始化自动添加标签
        zdybqarrery = user.customLabels == undefined ? [] : user.customLabels.split(";").filter(function (x) {
            return x != "";
        });

        var zdybq = document.getElementById("zdybq");
        function zdybqaddclickchange() {
            var zdybqaddclick = zdybq.getElementsByClassName("zdybqaddclick")[0];
            zdybqaddclick.value = true;
            zdybqaddclick.onclick = function () {
                zdybqadd(zdybqaddclick.value);
                setTimeout(function () {
                    zdybqaddfinish();
                }, 10);
            };
            function zdybqadd(key) {
                if (key) {
                    zdybqaddclick.innerHTML = '<input style="height: 12px;width: 80px;' + 'background:rgba(0,0,0,0);color:#fff;border: none;outline:none;' + 'border-bottom: 1px solid #fff;font-size: 12px;margin-top: 5px;" type="text" placeholder="标签不可重复">';
                }
            };
            function zdybqaddfinish() {
                var inputzdybq = zdybqaddclick.getElementsByTagName("input")[0] || undefined;
                if (inputzdybq != undefined) {
                    zdybqaddclick.value = false;

                    inputzdybq.addEventListener("focus", function () {
                        zdybqaddclick.style.background = "#bbb";
                        zdybqaddclick.style.color = "#111";
                    });
                    inputzdybq.addEventListener("blur", function () {
                        zdybqaddclick.style.background = "#eef3f6";
                        zdybqaddclick.style.color = "#656668";
                        zdybqbianli();
                    });
                    inputzdybq.focus();
                    inputzdybq.addEventListener("keyup", function (event) {
                        if (event.keyCode == 13) {
                            if (inputzdybq.value.length < 1) {
                                zdybqaddclick.innerHTML = '<input style="height: 12px;width: 80px;' + 'background:rgba(0,0,0,0);color:#fff;border: none;outline:none;' + 'border-bottom: 1px solid #fff;font-size: 12px;margin-top: 5px;" type="text" placeholder="内容不可为空">';
                            }else{
                                var zdybqtextvalue = inputzdybq.value;
                                trueaddone(zdybqtextvalue);
                            };
                        };
                    });
                    inputzdybq.addEventListener("blur", function () {
                        if (inputzdybq.value.length > 1) {
                            var zdybqtextvalue = inputzdybq.value;
                            trueaddone(zdybqtextvalue);
                        };
                    });
                }
            };
            function trueaddone(value) {
                if (!zdybqarrery.includes(value)) {
                    zdybqarrery.push(value);
                    zdybqbianli();
                    ajaxzdybq(zdybqarrery);
                } else {
                    zdybqaddclick.innerHTML = '<input style="height: 12px;width: 80px;' + 'background:rgba(0,0,0,0);color:#fff;border: none;outline:none;' + 'border-bottom: 1px solid #fff;font-size: 12px;margin-top: 5px;" type="text" placeholder="标签不可重复">';
                }
            }
        }

        function zdybqbianli() {
            zdybq.innerHTML = "";
            for (var i = 0; i < zdybqarrery.length; i++) {
                if (zdybqarrery[i].length > 0) {
                    var zdybqever = document.createElement("div");
                    zdybqever.className = "zidingyibiaoqian";
                    zdybqever.innerHTML = '<a>' + zdybqarrery[i] + '<i style="" value=' + i + '>X</i></a>';
                    zdybq.appendChild(zdybqever);
                }
            }
            var zdybqtext1 = document.createElement("div");
            var zdybqtext2 = document.createElement("div");

            zdybqtext1.className = "zidingyibiaoqian zdybqaddclick";
            zdybqtext2.className = "zidingyibiaoqian zdybqaddclick";

            if(zdybqarrery.length==0){
                zdybqtext1.innerHTML = '<input style="height: 12px;width: 90px;' + 'background:rgba(0,0,0,0);color:#fff;border: none;outline:none;' + 'border-bottom: 1px solid #fff;font-size: 12px;margin-top: 5px;" type="text" placeholder="添加自定义标签">';
                zdybq.appendChild(zdybqtext1);
            }
            zdybqtext2.innerHTML ='<a>+</a>';
            zdybq.appendChild(zdybqtext2);
            zdybqaddclickchange();
            zdybqdelete();
        };

        function zdybqdelete() {
            var arraryready = [];
            var deletebuttonX = zdybq.getElementsByTagName("i");

            var _loop3 = function _loop3(i) {
                deletebuttonX[i].onclick = function () {
                    for (var j = 0; j < zdybqarrery.length - 1; j++) {
                        if (j != deletebuttonX[i].value) {
                            arraryready.push(zdybqarrery[j]);
                        }
                    }
                    zdybqarrery = arraryready;
                    zdybqbianli();
                    ajaxzdybq(zdybqarrery);
                };
            };

            for (var i = 0; i < deletebuttonX.length; i++) {
                _loop3(i);
            }
        }

        function ajaxzdybq(arrery) {
            var _data = arrery.filter(function (x) {
                return x != "";
            }).join(";")+"";

            //customLabels
            $.ajax({
                url: urlLocalhost + newhuakwang+"change_user_info",
                type: "post",
                dataType: "json",
                xhrFields:{
                    withCredentials:true
                },
                crossDomain: true,
                data: {user_id:user_test.id,customLabels:_data}
            }).done(function (data) {
                if(data.success){
                    zdybqbianli();
                    HKWselfpage_HTML.data.dataCheck();
                }else{
                    alertUploadMsg(data.message)
                }
            });
        }
        zdybqbianli();
    };

    HKWselfpage_HTML.data.dataAboutSelfForm = function (dataAboutSelf) {
        var result = void 0;
        dataAboutSelf.user_id=user_test.id;
        return $.ajax({
            url: urlLocalhost + newhuakwang+"change_user_info",
            type: "post",
            dataType: "json",
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            data: dataAboutSelf
        }).done(function (data) {
            if(data.success){
                $("#signature").html(dataAboutSelf.signature);
                HKWselfpage_HTML.data.dataCheck();
                result="111";
            }else{
                result="eee";
            }
            return result
        });
    };

    HKWselfpage_HTML.data.dataSkillfFrom = function (dataSkill) {
        var result = void 0;
        dataSkill.user_id=user_test.id;
        return $.ajax({
            url: urlLocalhost + newhuakwang+"change_user_info",
            type: "post",
            dataType: "json",
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            data: dataSkill
        }).done(function (data) {
            if(data.success){
                HKWselfpage_HTML.data.user();
                show(true,"bbs_skillfFrom",2);
                HKWselfpage_HTML.data.dataCheck();
                result="111";
            }else{
                result="eee";
                show(false,"bbs_skillfFrom",2);
                alertUploadMsg(data.message);
            };
            return result;
        }).error(function (res) {
            alertUploadMsg(res.message);
        });
    };


    HKWselfpage_HTML.data.dataWorksfFromALL = {
        topimgsend: null,
        imgsend: null, videosend: null, imgSelect: null, videoSelect: null };
    var keywordCount = 0;
    var keyword_img = [],
        keyword_img_alt=[],
        keyword_video = [],
        keyword_video_alt=[],
        topshowPath = "";

    HKWselfpage_HTML.data.dataWorksfFromReady = function (datatheWork) {
        HKWselfpage_HTML.data.dataWorksfFromALL.topimgsend();
        for (var i = 0; i < HKWselfpage_HTML.worksImageList.length; i++) {
            HKWselfpage_HTML.data.dataWorksfFromALL.imgsend(i);
        }
        if (HKWselfpage_HTML.worksVideoList.length > 0) {
            for (var _i = 0; _i < HKWselfpage_HTML.worksVideoList.length; _i++) {
                HKWselfpage_HTML.data.dataWorksfFromALL.videosend(_i);
            }
        }
        var workstime = setInterval(function () {
            if (keywordCount == HKWselfpage_HTML.worksImageList.length + HKWselfpage_HTML.worksVideoList.length + 1) {
                var workData = datatheWork;
                workData.batch_path_ids = keyword_img;
                workData.batch_video_urls = keyword_video.join(",");
                workData.path = topshowPath;
                workData.image_alt=keyword_img_alt;
                workData.user_id=user_test.id;
                HKWselfpage_HTML.dataWorksfFromdata = workData;
                clearInterval(workstime);
            }
        }, 400);
    };
    HKWselfpage_HTML.data.dataWorksfFrom = function (datatheWork) {
        var result = void 0;
        keyword_img = [];keyword_video = [];topshowPath = "";
        return $.ajax({
            url: urlLocalhost + newhuakwang+"/add_works_ex",
            type: "post",
            dataType: "json",
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            data: datatheWork
        }).done(function (data) {
            if (data.success) {
                result = "111";
                ajaxAllWorksList("all");
            } else {
                result = "eee";
                alertUploadMsg(data.message);
            };
            return result;
        });
    };

    HKWselfpage_HTML.data.dataWorksfFromALL.topimgsend = function () {
        if(HKWselfpage_HTML.worksNewTopShow.length>0){
            topshowPath=HKWselfpage_HTML.worksNewTopShow;
        }else{
            topshowPath=HKWselfpage_HTML.worksImageList[0].file_path.length>0?HKWselfpage_HTML.worksImageList[0].file_path:HKWselfpage_HTML.worksImageList[0].path;
        }
        keywordCount++;
    };
    HKWselfpage_HTML.data.dataWorksfFromALL.imgsend = function (index) {
        var _this = HKWselfpage_HTML.worksImageList[index];
        keyword_img.push(_this.id);
        keyword_img_alt.push(_this.alt);
        keywordCount++;
    };
    HKWselfpage_HTML.data.dataWorksfFromALL.videosend = function (index) {
        var _this = HKWselfpage_HTML.worksVideoList[index];
        keyword_video.push(_this.src);
        keyword_video_alt.push(_this.alt);
        keywordCount++;

    };
})();
function show(checkend,formid,formnum) {
    var bbc_InfFrom = document.getElementById(formid);
    var cfbfbb_write = document.getElementsByClassName("cfbfbb_write")[formnum];
    var cfbfbb_show = document.getElementsByClassName("cfbfbb_show")[formnum];
    var clear = cfbfbb_write.getElementsByClassName("clearbuttonchoose")[0];
    var bothRuturnForm = cfbfbb_write.getElementsByClassName("bothRuturnForm")[0];
    var bbc_Infreturn = bothRuturnForm.getElementsByClassName("Infreturn")[0];
    var heightchangediv = cfbfbb_write.getElementsByClassName("heightchangediv")[0];
    var closebianjitianjia = cfbfbb_write.getElementsByClassName("closebianjitianjia")[0];
    var forminput = cfbfbb_write.getElementsByTagName("input");
    if(checkend == undefined || checkend == false){
        bothRuturnForm.style.background = 'rgba(0,0,0,0)';
        bbc_Infreturn.style.color = "red";
        bbc_Infreturn.style.borderColor = "red";
        bbc_Infreturn.innerHTML = '-----------------------------保存失败-----------------------------';
        setTimeout(function () {
            bothRuturnForm.style.display = "none";
            bbc_Infreturn.innerHTML = '-----------------------------保存失败-----------------------------';
            bbc_Infreturn.style.borderColor = "";
        }, 2000);
        return false;
    }else if(checkend.result == undefined){
        return false;
    };
    if (checkend.result || checkend == true) {
        bothRuturnForm.style.background = "rgba(0,0,0,0.5)";
        bbc_Infreturn.style.color = "#04AE15";
        bbc_Infreturn.style.borderColor = "#04AE15";
        bothRuturnForm.style.border = "1px solid rgba(0,0,0,0)";
        bbc_Infreturn.innerHTML = checkend.message;
        setTimeout(function () {
            bbc_Infreturn.style.opacity = 0;
        }, 2000);
        setTimeout(function () {
            closebianjitianjia.style.transform = "rotate(45deg)";
            heightchangediv.style.height = "0";
            heightchangediv.style.opacity = 0;
        }, 2500);
        setTimeout(function () {
            bothRuturnForm.style.borderColor = "rgba(0,0,0,0)";
            bothRuturnForm.style.display = "none";
            cfbfbb_write.style.display = "none";
            cfbfbb_write.style.position = "absolute";
            cfbfbb_write.style.minHeight = "0";
            cfbfbb_show.style.display = "block";
            cfbfbb_show.style.opacity = "1";
            setTimeout(function () {
                cfbfbb_write.style.opacity = 0;
                closebianjitianjia.style.display = "none";
                cfbfbb_show.style.opacity = "1";
                cfbfbb_write.style.position = "";
                bothRuturnForm.style.display = "none";
                bbc_Infreturn.innerHTML = '<img src="./image/loading.gif" style="text-align: center;width: 20px;height: 20px;"/>';
                bbc_Infreturn.style.color = "#04AE15";
                bbc_Infreturn.style.borderColor = "";
            }, 100);
        }, 3500);
    } else {
        bothRuturnForm.style.background = 'rgba(0,0,0,0)';
        bbc_Infreturn.style.color = "red";
        bbc_Infreturn.style.borderColor = "red";
        bbc_Infreturn.innerHTML = checkend.message;
        setTimeout(function () {
            bothRuturnForm.style.display = "none";
            bbc_Infreturn.innerHTML = '<img src="./image/loading.gif" style="text-align: center;width: 20px;height: 20px;"/>';
            bbc_Infreturn.style.color = "#04AE15";
            bbc_Infreturn.style.borderColor = "";
        }, 2000);
    }
};
function lineLightLong(user) {
    if (parseInt(user.changeValue) != 0) {
        setTimeout(function () {
            if (user.path != null && String(user.path).length > 0 != 0) {
                $('.addfinshedcontrol a:eq(0)').css('opacity', 1);
            }
            if (user.uBaseInfValue.length==7) {
                $('.addfinshedcontrol a:eq(2)').css('opacity', 1);
            }
            if (user.uAboutselfValue.length ==2) {
                $('.addfinshedcontrol a:eq(4)').css('opacity', 1);
            }
            if (user.uSkillValue.length>0) {
                $('.addfinshedcontrol a:eq(6)').css('opacity', 1);
            }
            if (user.uWorksValue.length>5) {
                $('.addfinshedcontrol a:eq(8)').css('opacity', 1);
            }
        }, 1500);
    } else {
        setTimeout(function () {
            if (user.path != null && String(user.path).length > 0) {
                $('.addfinshedcontrol a:eq(0)').css('opacity', 1);
            }
            if (user.uBaseInfValue.length==7) {
                $('.addfinshedcontrol a:eq(2)').css('opacity', 1);
            }
            if (user.uAboutselfValue.length ==2) {
                $('.addfinshedcontrol a:eq(4)').css('opacity', 1);
            }
            if (user.uSkillValue.length > 0) {
                $('.addfinshedcontrol a:eq(6)').css('opacity', 1);
            }
            if (user.uWorksValue.length>5) {
                $('.addfinshedcontrol a:eq(8)').css('opacity', 1);
            }
        }, 200);
    }
}
