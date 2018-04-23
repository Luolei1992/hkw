/**
 * Created by admin on 2017/2/27.
 */
"use strict";
let theFormCheck={
    //数据检查返回 测试！！！！！
    data:{fromcheckresult:undefined,id:getCookie("user_id")},
    formCheck(from) {
        let checkreturn=undefined;
        dataCheck(from);
        let success;
        let worry;
        let timeSI=setInterval(function () {
            if(checkreturn!=undefined){
                if(checkreturn){
                    datasendAjax(from);
                    clearInterval(timeSI);
                }else{
                    worry={result:checkreturn,message:"-----------------------------保存失败-----------------------------"};
                    theFormCheck.data.fromcheckresult=worry;
                    clearInterval(timeSI);
                }
            }
        },100);
        function datasendAjax(from){
            let aaa;
            switch (from.id){
                case "bbs_baseInfForm":{
                    let dataBaseInf_test={id:theFormCheck.data.id,type:null,nick_name:null,sex:null,experience:null,education:null,school:null,c_country:0,p_province:0,c_city:0,a_area:0,txt_address:null,address:null};
                    dataBaseInf_test.type=$(from).find('input[name="cfbf_intocheck"]').val();
                    dataBaseInf_test.nick_name=$(from).find('input[name="showname"]').val();
                    dataBaseInf_test.sex=parseInt($(from).find('input[name="sex"]').val());
                    dataBaseInf_test.experience=$(from).find('input[name="experience"]').val();
                    dataBaseInf_test.education=$(from).find('input[name="education"]').val();
                    dataBaseInf_test.school=$(from).find('input[name="universities"]').val();
                    dataBaseInf_test.p_province=parseInt($(from).find('.location .wait span:eq(0)').attr('value'));
                    dataBaseInf_test.c_city=parseInt($(from).find('.location .wait span:eq(1)').attr('value'));
                    dataBaseInf_test.a_area=parseInt($(from).find('.location .wait span:eq(2)').attr('value'));
                    dataBaseInf_test.txt_address=[$(from).find('.location .wait span:eq(0)').html(),
                    $(from).find('.location .wait span:eq(1)').html(),
                        $(from).find('.location .wait span:eq(2)').html()].join(" ");
                    dataBaseInf_test.address=$(from).find('input[name="address"]').val();
                    aaa=HKWselfpage_HTML.data.dataBaseInForm(dataBaseInf_test);
                } break;
                case "bbs_aboutselfFrom":{
                    let dataAboutSelf_test={id:theFormCheck.data.id,signature:"",signature_bbs:""};
                    dataAboutSelf_test.signature=$(from).find('input[name="onekindword"]').val();
                    dataAboutSelf_test.signature_bbs=$(from).find('textarea[name="aboutmyself"]').val();
                    aaa=HKWselfpage_HTML.data.dataAboutSelfForm(dataAboutSelf_test);
                } break;
                case "bbs_skillfFrom":{
                    let dataSkill_test={id:theFormCheck.data.id,skill:""};
                    let skill=$(from).find('.addskill:first').attr('value');
                    console.log($(from).find('.addskill:first').attr('value'));
                    skill=skill.split(",").filter(x=>x!="").join(";");
                    dataSkill_test.skill=skill;
                    aaa=HKWselfpage_HTML.data.dataSkillfFrom(dataSkill_test);
                } break;
                case "bbs_worksFrom":{
                    let dataWorks_test={id:0, user_id:theFormCheck.data.id,title:"",category_ids:"0",content:"",add_time:"",path:"",is_home_page:0,batch_path_ids:"",video_path_ids:""};
                    let category_ids=["",148,"","",""];
                    category_ids[2]=$(from).find('.workshow_industry.workindustry ul:eq(1)').attr('value');
                    category_ids[3]=$(from).find('.workshow_industry.workindustry ul:eq(2)').attr('value');
                    category_ids[4]=$(from).find('input[name="workindustry"]').val();
                    category_ids[4]=category_ids[4]==category_ids[3]?"":category_ids[4];
                    dataWorks_test.category_ids=category_ids.join(",");
                    dataWorks_test.title=$(from).find('input[name="worksname"]').val();
                    dataWorks_test.content=$(from).find('input[name="workstext"]').val();
                    let _data=new Date().toDateString();
                    dataWorks_test.id=$("#theWork_id").val();
                    dataWorks_test.add_time=_data;
                    HKWselfpage_HTML.data.dataWorksfFromReady(dataWorks_test);
                    let sI=setInterval(function () {
                        if(HKWselfpage_HTML.dataWorksfFromdata.user_id!=undefined){
                            aaa=HKWselfpage_HTML.data.dataWorksfFrom(HKWselfpage_HTML.dataWorksfFromdata);
                            worksClear(aaa);
                            clearInterval(sI);
                        }
                    },1000);
                } break;
                default:{

                }
            }
            let kindtime=setInterval(function () {
                if(aaa!=undefined){
                    if(aaa.readyState==4){
                        resultchange(aaa);
                        clearInterval(kindtime);
                    }
                }
            },500);
            function resultchange(kindresult){
                if(kindresult.responseText.indexOf("111")>-1){
                    success={result:true,message:"-----------------------------保存成功-----------------------------"};
                    theFormCheck.data.fromcheckresult=success;
                }else{
                    worry={result:false,message:"-------网络不稳定，请重试！---------"};
                    theFormCheck.data.fromcheckresult=success;
                }
            }
            function worksClear(key) {
                let worksClear=setInterval(function () {
                    if(key!=undefined){
                        if(key.readyState==4){
                            if(key.responseText.indexOf("111")>-1){
                                clearInterval(worksClear);
                                setTimeout(function () {
                                    $('#imgtopshow').attr('src','./image/fengmian.png');
                                    $('#theWork_id').attr('value',"0");
                                    $('input[name=worksname]').attr('value',"");
                                    $('#worksshow_textarea').val("");
                                    $('#workstext').val("");
                                    $('.alterbeforesave:last').html('<span id="workshowlength" style="float: left;" >'+
     '当前： <i class="textlength" style="font-style: normal;">0</i>'+ '<i class="textlengthshow" style="font-style: normal;color:#0bacf5;">/500</i>'+'</span>'+'<span style="float: right;margin-right: 60px;">字数范围:<i  style="color:#f33919;font-style: normal;">0-500</i></span>');
                                    HKWselfpage_HTML.worksImageList=[];HKWselfpage_HTML.worksNewTopShow="";
                                    HKWselfpage_HTML.worksVideoList=[];HKWselfpage_HTML.dataWorksfFromdata={};
                                    $('#work_images').html('单张图片100M以内，RGB模式，支持jpg/png/jpeg/gif格式，最多上传10张图片，支持批量上传');
                                    $('#work_images').css('color',"#aaa");
                                    $('.imgclick:first .imgclick_a:eq(0)').html("请上传图片");
                                    $('#imgshow').attr('src','./image/noimage.png');
                                    $('#imgtext').val("");
                                    $('#imgshow_list').html("图片数量为0");
                                    $('#videoalter_change').html("大小300M以内，本地视频仅支持MP4等格式");
                                    $('#videoalter_change').css('color',"#aaa");
                                    $('.imgclick:last .imgclick_a:eq(0)').html("请上传视频");
                                    $('#work_video').html('<source src="" type="video/mp4" />');
                                    $('#videotext').val("");
                                    $('#videoshow_list').html("视频数量为0");
                                    $('.workshow_industry.workindustry ul:eq(0) li').attr("class","");
                                    $('.workshow_industry.workindustry ul:eq(1)').attr('value',"");
                                    $('.workshow_industry.workindustry ul:eq(2)').attr('value',"");
                                    $('.workshow_industry.workindustry ul:eq(1)').html("");
                                    $('.workshow_industry.workindustry ul:eq(2)').html("");
                                    $('input[name="workindustry"]').val("");
                                },5000);
                            }
                        }
                    }

                },300)
                
            }
        }
        //检验是否为空
        function dataCheck(from){
            let keyword=[0,0,undefined];
            let forminput=from.getElementsByTagName("input");
            for(let i=0;i<forminput.length;i++) {
                if (forminput[i].required) {
                    let changedddd = from.getElementsByClassName(forminput[i].name)[0];
                    if (forminput[i].value.length==0) {
                        changedddd.style.borderColor = "red";
                        keyword[0]++;
                    }else{
                        keyword[0]++;keyword[1]++;
                    }
                }else{
                    keyword[0]++;keyword[1]++;
                }
            }
            let timeSI2=setInterval(function () {
                if(keyword[0]==forminput.length){
                    if(keyword[1]==keyword[0]) {
                        keyword[2]=true;
                    }else{
                        keyword[2]=false;
                    }
                    if(keyword[2]!=undefined){
                        checkreturn=keyword[2];
                        clearInterval(timeSI2);
                    }
                }
            },100);

        }

    },

    formcheckChange(formid,formnum) {
        let bbc_InfFrom=document.getElementById(formid);
        let cfbfbb_write=document.getElementsByClassName("cfbfbb_write")[formnum];
        let cfbfbb_show=document.getElementsByClassName("cfbfbb_show")[formnum];
        let save=cfbfbb_write.getElementsByClassName("savebuttonchoose")[0];
        let clear=cfbfbb_write.getElementsByClassName("clearbuttonchoose")[0];
        let bothRuturnForm=cfbfbb_write.getElementsByClassName("bothRuturnForm")[0];
        let bbc_Infreturn=bothRuturnForm.getElementsByClassName("Infreturn")[0];
        let heightchangediv=cfbfbb_write.getElementsByClassName("heightchangediv")[0];
        let closebianjitianjia=cfbfbb_write.getElementsByClassName("closebianjitianjia")[0];
        let forminput=cfbfbb_write.getElementsByTagName("input");
        for(let i=0;i<forminput.length;i++) {
            if (forminput[i].required) {
                let changedddd = cfbfbb_write.getElementsByClassName(forminput[i].name)[0];
                changedddd.addEventListener("click", function () {
                    let changedddtime = setInterval(function () {
                        if (forminput[i].value.length > 0) {
                            changedddd.style.borderColor = "";
                            clearInterval(changedddtime);
                        }
                    }, 100)
                });
                changedddd.addEventListener("focus", function () {
                    changedddd.style.color="#333";
                });
                changedddd.addEventListener("focusout", function () {
                    changedddd.style.color="#777";
                });
            }
        }

        save.onclick=(event)=>{

            event.preventDefault();
            if(save.name!="nodouble"){
                save.name="nodouble";
                theFormCheck.formCheck(bbc_InfFrom);
                let other;
                bothRuturnForm.style.cssText="display:block;";
                bbc_Infreturn.style.opacity="1";
                let timeSI=setInterval(function () {
                    if(theFormCheck.data.fromcheckresult!=undefined){
                        setTimeout(function () {
                            clearInterval(timeSI);
                            show(theFormCheck.data.fromcheckresult);
                        },1000);
                    }
                },100);
                setTimeout(function () {
                    save.name="okclick";
                },5000);
            }
        };
        function show(checkend) {
            if(checkend.result){
                bothRuturnForm.style.background="rgba(0,0,0,0.5)";
                bbc_Infreturn.style.color="#04AE15";
                bbc_Infreturn.style.borderColor="#04AE15";
                bothRuturnForm.style.border="1px solid rgba(0,0,0,0)";
                bbc_Infreturn.innerHTML=checkend.message;
                setTimeout(function () {
                    bbc_Infreturn.style.opacity=0;
                },2000);
                setTimeout(function () {
                    closebianjitianjia.style.transform="rotate(45deg)";
                    heightchangediv.style.height="0";
                    heightchangediv.style.opacity=0;
                },2500);
                setTimeout(function () {
                    bothRuturnForm.style.borderColor="rgba(0,0,0,0)";
                    bothRuturnForm.style.display="none";
                    cfbfbb_write.style.display="none";
                    cfbfbb_write.style.position="absolute";
                    cfbfbb_write.style.minHeight="0";
                    cfbfbb_show.style.display="block";
                    cfbfbb_show.style.opacity="1";
                    setTimeout(function () {
                        cfbfbb_write.style.opacity=0;
                        closebianjitianjia.style.display="none";
                        cfbfbb_show.style.opacity="1";
                        cfbfbb_write.style.position="";
                        bothRuturnForm.style.display="none";
                        bbc_Infreturn.innerHTML='<img src="./image/loading.gif" style="text-align: center;width: 20px;height: 20px;"/>';
                        bbc_Infreturn.style.color="#04AE15";
                        bbc_Infreturn.style.borderColor="";
                    },100);
                },3500);
            }else{
                bothRuturnForm.style.background='rgba(0,0,0,0)';
                bbc_Infreturn.style.color="red";
                bbc_Infreturn.style.borderColor="red";
                bbc_Infreturn.innerHTML=checkend.message;
                setTimeout(function () {
                    bothRuturnForm.style.display="none";
                    bbc_Infreturn.innerHTML='<img src="./image/loading.gif" style="text-align: center;width: 20px;height: 20px;"/>';
                    bbc_Infreturn.style.color="#04AE15";
                    bbc_Infreturn.style.borderColor="";
                },2000);
            }
        }
        closebianjitianjia.onclick= function () {
            closebianjitianjia.style.transform="rotate(45deg)";
            heightchangediv.style.height="0";
            heightchangediv.style.opacity=0;
            setTimeout(function () {
                cfbfbb_show.style.opacity="1";
                cfbfbb_show.style.display="block";
                cfbfbb_write.style.display="none";
                cfbfbb_write.style.position="absolute";
                cfbfbb_write.style.minHeight="0";
                bothRuturnForm.style.display="none";
                setTimeout(function () {
                    cfbfbb_write.style.display="block";
                    cfbfbb_write.style.opacity=0;
                    closebianjitianjia.style.display="none";
                    for(let i=0;i<forminput.length-1;i++) {
                        let changedddd = cfbfbb_write.getElementsByClassName(forminput[i].name)[0];
                            changedddd.style.borderColor = "";
                    }
                },10);
            },1000);
        };

        clear.onclick=()=>{
            closebianjitianjia.click();
        };

    }



};
