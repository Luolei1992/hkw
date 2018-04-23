/**
 * Created by admin on 2017/2/27.
 */
// "use strict";
var dataBaseInf_test = {
    type: null, real_name: null, sex: null, experience: null, education: null, school: null, country: 0, province: 0, city: 0, area: 0, txt_address: null, address: null,lng:0,lat:0,jobs:''
};
var aaa = void 0;
var theFormCheck = {
    //数据检查返回 测试！！！！！
    data: { fromcheckresult: undefined, id: getCookie("user_id")},
    formCheck: function formCheck(from) {
        var checkreturn = undefined;
        dataCheck(from);
        var success = void 0;
        var worry = void 0;
        var timeSI = setInterval(function () {
            if (checkreturn != undefined) {
                if (checkreturn) {
                    datasendAjax(from);
                    clearInterval(timeSI);
                } else {
                    worry = { result: checkreturn, message: "-----------------------------保存失败-----------------------------" };
                    theFormCheck.data.fromcheckresult = worry;
                    clearInterval(timeSI);
                }
            }
        }, 100);
        function datasendAjax(from) {
            switch (from.id) {
                case "bbs_baseInfForm":
                    {
                        dataBaseInf_test.type = $(from).find('input[name="cfbf_intocheck"]').val();
                        dataBaseInf_test.real_name = $(from).find('input[name="showname"]').val();
                        dataBaseInf_test.sex = ($(from).find('.textselectul .wait').html() == "男")?1:2;
                        dataBaseInf_test.experience = $(from).find('input[name="experience"]').val();
                        dataBaseInf_test.education = $(from).find('input[name="education"]').val();
                        dataBaseInf_test.school = $(from).find('input[name="universities"]').val();
                        dataBaseInf_test.province = parseInt($(from).find('.location .wait span:eq(0)').attr('value'));
                        dataBaseInf_test.city = parseInt($(from).find('.location .wait span:eq(1)').attr('value'));
                        dataBaseInf_test.area = parseInt($(from).find('.location .wait span:eq(2)').attr('value'));
                        dataBaseInf_test.txt_address = [$(from).find('.location .wait span:eq(0)').html(), $(from).find('.location .wait span:eq(1)').html(), $(from).find('.location .wait span:eq(2)').html()].join(" ");
                        dataBaseInf_test.jobs= $(from).find('input[name="job_work"]').val();
                        dataBaseInf_test.address = $(from).find('input[name="address"]').val();

                        if(dataBaseInf_test.province>10&&dataBaseInf_test.city>1000&&dataBaseInf_test.area>10000){
                            var _txt_address=dataBaseInf_test.txt_address+dataBaseInf_test.address;
                            geocodeSearch(_txt_address);
                        }else{
                            worry = { result: false, message: "-----------------------------保存失败-----------------------------" };
                            theFormCheck.data.fromcheckresult = worry;
                            $('.textselectul1.location:first').css('borderColor','red');
                        }
                    }break;
                case "bbs_aboutselfFrom":
                    {
                        var dataAboutSelf_test = {signature: "", signature_bbs: "" };
                        dataAboutSelf_test.signature = $(from).find('input[name="onekindword"]').val();
                        dataAboutSelf_test.signature_bbs = $(from).find('textarea[name="aboutmyself"]').val();
                        aaa = HKWselfpage_HTML.data.dataAboutSelfForm(dataAboutSelf_test);
                    }break;
                case "bbs_skillfFrom":
                    {
                        var dataSkill_test = {keywords: ""};
                        var skill = $(from).find('.addskill:first').attr('value');
                        skill = skill.split(",").filter(function (x) {
                            return x != "";
                        });
                        dataSkill_test.keywords = skill.join(",");
                        aaa = HKWselfpage_HTML.data.dataSkillfFrom(dataSkill_test);
                    }break;
                case "bbs_worksFrom":
                    {
                        var ids = [],srcs = '',kindOf = [],imageArr=[];
                        $("#imgshow_list li").each(function () {
                            ids.push($(this).find("img").attr("data-id"));
                            imageArr.push($(this).find("img").attr("alt"));
                        });
                        if(!$(".js-vide").length){
                            srcs = '';
                        }else{
                            $(".js-vide").each(function () {
                                srcs += $(this).find(".web").html() + ',';
                            });
                            if(srcs.length > 0) {
                                srcs = srcs.substring(",",srcs.length-1);
                            };
                        };
                        $(".workshow_industry li.bluebg").each(function () {
                            kindOf.push($(this).attr("value"));
                        });
                        var workCover = $("#imgtopshow").attr("src");
                        var dataWorks_test = {
                            title : $(".worksname").val(),
                            content : $("#worksshow_textarea").val(),
                            batch_path_ids : ids,
                            batch_video_urls : srcs,
                            keyword : $(".work_keyword").val(),
                            category_ids_1:148,  //类别
                            category_ids_2:kindOf[0],
                            category_ids_3:kindOf[1],
                            category_ids_4:kindOf[2],
                            path:workCover,
                            image_alt:imageArr,
                            image_upload_way:2,
                            user_id:getCookie('user_id')
                        };
                        console.log(dataWorks_test);
                        var _dataWorks_test_id = $("#theWork_id").val();
                        if((workCover.indexOf("fengmian") != -1) || (HKWselfpage_HTML.worksImageList.length==0 && HKWselfpage_HTML.worksVideoList.length==0)){
                            worry = { result: false, message: "-----------------------------保存失败-----------------------------" };
                            theFormCheck.data.fromcheckresult = worry;
                            return false;
                        }else{
                            theFormCheck.data.fromcheckresult = "111";
                            aaa = HKWselfpage_HTML.data.dataWorksfFrom(dataWorks_test);
                            worksClear(aaa);
                            // HKWselfpage_HTML.data.dataWorksfFromReady(dataWorks_test);
                            // if(_dataWorks_test_id==0){
                            //     var sI1 = setInterval(function () {
                            //
                            //         worksClear(aaa);
                            //         clearInterval(sI1);
                            //     }, 1000);
                            // }
                            // else{
                            //     var sI2 = setInterval(function () {
                            //         if (HKWselfpage_HTML.dataWorksfFromdata.user_id!= undefined) {
                            //             HKWselfpage_HTML.data.dataWorksChangeFrom(HKWselfpage_HTML.dataWorksfFromdata,_dataWorks_test_id);
                            //
                            //             worksClear(aaa);
                            //             clearInterval(sI2);
                            //         }
                            //     }, 1000);
                            // }
                        }
                    }break;
                default:{}
            }
            var kindtime = setInterval(function () {
                console.log(aaa);
                console.log(aaa.responseJSON);
                if (aaa != undefined) {
                    if (aaa.readyState == 4) {
                        resultchange(aaa.responseJSON);
                        clearInterval(kindtime);
                    }
                }
            }, 500);
            setTimeout(function () {
                if(kindtime<10000){

                }else{
                    checkreturn=false;
                    worry='';
                    clearInterval(kindtime);
                }
            },10000);



            function resultchange(kindresult) {
                if(kindresult){
                    if (kindresult.success!=undefined&&kindresult.success) {
                        success = { result: true, message: "-----------------------------保存成功-----------------------------" };
                        theFormCheck.data.fromcheckresult = success;
                    } else {
                        worry = { result: false, message: "-------网络不稳定，请重试！---------" };
                        theFormCheck.data.fromcheckresult = success;
                    }
                }
            }
            function worksClear(key) {
                var worksClear = setInterval(function () {
                    if (key != undefined) {
                        if (key.readyState == 4) {
                            worry = { result: false, message: "-----------------------------保存成功-----------------------------" };
                            if (key.responseJSON.success) {
                                clearInterval(worksClear);
                                setTimeout(function () {
                                    // window.location.reload();
                                    $('#imgtopshow').attr('src', './image/fengmian.png');
                                    $('#theWork_id').attr('value', "0");
                                    $('input.worksname').attr('value', "").val('');
                                    $('.work_keyword').attr('value', "").val("");
                                    $('#worksshow_textarea').val("");
                                    $('#workstext').val("");
                                    $('.alterbeforesave:last').html('<span id="workshowlength" style="float: left;" >' + '当前： <i class="textlength" style="font-style: normal;">0</i>' + '<i class="textlengthshow" style="font-style: normal;color:#0bacf5;">/500</i>' + '</span>' + '<span style="float: right;margin-right: 60px;">字数范围:<i  style="color:#f33919;font-style: normal;">0-500</i></span>');
                                    HKWselfpage_HTML.worksImageList = [];
                                    HKWselfpage_HTML.worksNewTopShow = "";
                                    HKWselfpage_HTML.worksVideoList = [];
                                    HKWselfpage_HTML.dataWorksfFromdata = {};

                                    $('#work_images').css('color', "#aaa");
                                    $('.workshow_imgshow .imgclick p:eq(0)').html("请上传图片");
                                    $('#imgshow').attr('src', './image/noimage.png');
                                    $('#imgtext').val("");
                                    $('#imgshow_list').html("图片数量为0");

                                    $(".js-ipt-web").val("");
                                    $(".js-publish-videow .js-vide").remove();

                                    $('.workshow_industry.workindustry ul:eq(0) li').attr("class", "");
                                    $('.workshow_industry.workindustry ul:eq(1)').attr('value', "");
                                    $('.workshow_industry.workindustry ul:eq(2)').attr('value', "");
                                    $('.workshow_industry.workindustry ul:eq(1)').html("");
                                    $('.workshow_industry.workindustry ul:eq(2)').html("");
                                    $('input[name="workindustry"]').val("");
                                }, 5000);
                            }
                        }
                    }
                }, 0);
            }
        }
        //检验是否为空
        function dataCheck(from) {
            var keyword = [0, 0, undefined];
            var forminput = from.getElementsByTagName("input");
            for (var i = 0; i < forminput.length; i++) {
                if (forminput[i].required) {
                    var changedddd = from.getElementsByClassName(forminput[i].name)[0];
                    if (forminput[i].value.length == 0) {
                        changedddd.style.borderColor = "red";
                        keyword[0]++;
                    } else {
                        keyword[0]++;keyword[1]++;
                    }
                } else {
                    keyword[0]++;keyword[1]++;
                }
            }
            var timeSI2 = setInterval(function () {
                if (keyword[0] == forminput.length) {
                    if (keyword[1] == keyword[0]) {
                        keyword[2] = true;
                    } else {
                        keyword[2] = false;
                    }
                    if (keyword[2] != undefined) {
                        checkreturn = keyword[2];
                        clearInterval(timeSI2);
                    }
                }
            }, 100);
        }
    },
    formcheckChange: function formcheckChange(formid, formnum) {
        var bbc_InfFrom = document.getElementById(formid);
        var cfbfbb_write = document.getElementsByClassName("cfbfbb_write")[formnum];
        var cfbfbb_show = document.getElementsByClassName("cfbfbb_show")[formnum];
        var save = cfbfbb_write.getElementsByClassName("saveWorkSubmit")[0];
        var clear = cfbfbb_write.getElementsByClassName("clearbuttonchoose")[0];
        var bothRuturnForm = cfbfbb_write.getElementsByClassName("bothRuturnForm")[0];
        var bbc_Infreturn = bothRuturnForm.getElementsByClassName("Infreturn")[0];
        var heightchangediv = cfbfbb_write.getElementsByClassName("heightchangediv")[0];
        var closebianjitianjia = cfbfbb_write.getElementsByClassName("closebianjitianjia")[0];
        var forminput = cfbfbb_write.getElementsByTagName("input");

        var _loop = function _loop(i) {
            if (forminput[i].required) {
                var changedddd = cfbfbb_write.getElementsByClassName(forminput[i].name)[0];
                changedddd.addEventListener("click", function () {
                    var changedddtime = setInterval(function () {
                        if (forminput[i].value.length > 0) {
                            changedddd.style.borderColor = "";
                            clearInterval(changedddtime);
                        }
                    }, 100);
                });
                changedddd.addEventListener("focus", function () {
                    changedddd.style.color = "#333";
                });
                changedddd.addEventListener("focusout", function () {
                    changedddd.style.color = "#777";
                });
            }
        };

        for (var i = 0; i < forminput.length; i++) {
            _loop(i);
        }

        save.onclick = function (event) {
            event.preventDefault();
            if (save.name != "nodouble") {
                save.name = "nodouble";
                theFormCheck.formCheck(bbc_InfFrom);
                var other = void 0;
                bothRuturnForm.style.cssText = "display:block;";
                bbc_Infreturn.style.opacity = "1";
                var timeSI = setInterval(function () {
                    if (theFormCheck.data.fromcheckresult != undefined) {
                        setTimeout(function () {
                            clearInterval(timeSI);
                            show(theFormCheck.data.fromcheckresult);
                        }, 1000);
                    }
                }, 100);
                setTimeout(function () {
                    save.name = "okclick";
                }, 5000);
            }
        };
        function show(checkend) {
            console.log(checkend);
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
        closebianjitianjia.onclick = function () {
            closebianjitianjia.style.transform = "rotate(45deg)";
            heightchangediv.style.height = "0";
            heightchangediv.style.opacity = 0;
            setTimeout(function () {
                cfbfbb_show.style.opacity = "1";
                cfbfbb_show.style.display = "block";
                cfbfbb_write.style.display = "none";
                cfbfbb_write.style.position = "absolute";
                cfbfbb_write.style.minHeight = "0";
                bothRuturnForm.style.display = "none";
                setTimeout(function () {
                    cfbfbb_write.style.display = "block";
                    cfbfbb_write.style.opacity = 0;
                    closebianjitianjia.style.display = "none";
                    // for (var i = 0; i < forminput.length - 1; i++) {
                    //     var changedddd = cfbfbb_write.getElementsByClassName(forminput[i].name)[0];
                    //     console.log(changedddd);
                    //     changedddd.style.borderColor = "";
                    // }
                }, 10);
            }, 1000);
        };
        clear.onclick = function () {
            closebianjitianjia.click();
        };
    }
};
