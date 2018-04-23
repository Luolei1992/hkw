/**
 * Created by admin on 2017/3/7.
 */
"use strict";

(function () {
    let user_test={id:69123,username:13261469964};
    let user;let timedata;

    HKWselfpage_HTML.data.user=function () {
        $.post(urlLocalhost+"/users/selfpage", {data:user_test.id},function (data) {
            if(!data.err){
//*********888888888888888888888888888888888888888888***********
                console.log(data.result[0]);
                user=data.result[0];
            }else{
                console.log(err);
                //window.location.href="";//404网络不稳定失败跳转
            }
        }).then(function () {
            $('.nicheng:first').html(user.nick_name.length==0?"Designer"+user_test.username:user.nick_name);
            if(user.path!=null&&user.path.length>0){
                $('#touxiangImage').attr('src',urlLocalhost+"/"+user.path);
                $('#touxiang').attr('class',"cfbheadimagehad");
            }

            if(user.selfpageBGP!=null && user.selfpageBGP.length>0){
                $('#cfosendimageP').attr('src',urlLocalhost+"/"+user.selfpageBGP);
            }
            HKWselfpage_HTML.data.dataCheck();
            HKWselfpage_HTML.data.dataZDYBQ();
            HKWselfpage_HTML.data.dataFinshLine();
            HKWselfpage_HTML.data.selfImageChange();
            HKWselfpage_HTML.data.worksList();
        });

    };HKWselfpage_HTML.data.user();

    HKWselfpage_HTML.data.dataCheck=function () {
        if(user.is_auth!==0){
            $('div.sendckeckbutton:first').html("已认证").removeClass("notcheck").addClass("incheck");

        }else{
            $('div.sendckeckbutton:first').html("未认证").removeClass("incheck").addClass("notcheck");
        }
        if(user.submitCheck!==null){
            if(user.submitCheck<6){
                $('div.sendckeckbutton:last').html("审核状态("+user.submitCheck+"/6)").removeClass("incheck").addClass("notcheck");
            }else{
                $('div.sendckeckbutton:last').html("已审核(6/6)").removeClass("notcheck").addClass("incheck");
            }
        }else{
            $('div.sendckeckbutton:last').html("未通过审核(0/6)").removeClass("incheck").addClass("notcheck");
        }
        $('a.addsendbutton:first').on('mouseover', function () {
            $('a.addsendalert:first').stop(true);
            if(user.is_auth!==0){
                $('a.addsendalert:first').animate({opacity:0},300, function() {
                    $(this).html('丰富您的作品案例，展现您的专业水平')
                }).animate({opacity:1},300);
            }else if(user.works_count==0){
                $('a.addsendalert:first').animate({opacity:0},300, function() {
                    $(this).html('通过审核的作品不少于6个才能通过设计师认证')
                }).animate({opacity:1},300);
            }else if(user.work_list.split(";").filter(x=>x!="").length<6) {
                if(user.works_count==user.work_list.split(";").filter(x=>x!="").length){
                    $('a.addsendalert:first').animate({opacity:0},300, function() {
                        $(this).html('通过审核的作品不可修改删除，但可选择隐藏或展示')
                    }).animate({opacity:1},300);
                }else{
                    $('a.addsendalert:first').animate({opacity:0},300, function() {
                        $(this).html('新保存的作品提交审核后，我们将会在1-3个工作日内反馈审核结果')
                    }).animate({opacity:1},300);
                }
            }else{
                $('a.addsendalert:first').animate({opacity:0},300, function() {
                    $(this).html('通过设计师认证后即可承接项目')
                }).animate({opacity:1},300);
            }
        });
        $('a.addsendbutton:first').on('mouseout', function () {
            $('a.addsendalert:first').stop(true).animate({opacity:0},300, function() {
                $(this).html("已完成:"+user.percentage+"%");
            }).animate({opacity:1},300);
        });
        let pcValue=0;
        let percentageChange=setInterval(function () {
            $('a.addsendalert:first').html("已完成:"+pcValue+"%");
            if(pcValue<user.percentage){
                pcValue++;
            }else{
                clearInterval(percentageChange);
            }
        },50);

        //    bbs_baseInfForm表单数据
        if(user.type!==0){
            if(user.type==1){
                $('#bbs_baseInfForm .checkradio i:eq(0)').attr('class','incheckradio');
                $('input[name="cfbf_intocheck"]').val(1)
            }else{
                $('#bbs_baseInfForm .checkradio i:eq(1)').attr('class','incheckradio');
                $('input[name="cfbf_intocheck"]').val(2)
            }
        }
        $('input[name="showname"]').attr('value',user.nick_name!=null?user.nick_name:"");
        if(user.sex!=0){
            if(user.sex==1){
                $('dl.sex dd.wait').html("男");
            }else{
                $('dl.sex dd.wait').html("女");
            }
            $('input[name="sex"]').val(user.sex);
        }
        if(user.experience!=null){
            if(user.experience<=1||user.experience==99){
                $('dl.experience dd.wait').html("1年以下");
            }else if(user.experience<=3){
                $('dl.experience dd.wait').html("1-3年");
            }else if(user.experience<=5){
                $('dl.experience dd.wait').html("3-5年");
            }else if(user.experience<10){
                $('dl.experience dd.wait').html("5-10年");
            }else{
                $('dl.experience dd.wait').html("10年以上");
            }
            $('input[name="experience"]').val(user.experience);
        }
        if(user.education!=null){
            $('dl.education dd.wait').html(user.education);
            $('input[name="education"]').val(user.education);
        }
        $('input[name="universities"]').val(user.school!=null?user.school:"");
        if(user.txt_address!=null){
            $('input[name="location"]').val(user.txt_address!=null?user.txt_address:"");
            let txt_address=user.txt_address.split(" ").filter(x=>x!="");
            let intxt_address=["中国","","",""];
            intxt_address[1]=(txt_address[0]==0?"省":txt_address[0]);
            intxt_address[2]=txt_address[1]||"市";
            intxt_address[3]=txt_address[2]||"县/区/市";
            let inspan='';
            user.a_area=user.a_area==null?0:user.a_area;
            let area=[user.c_country==null?user.a_area:user.c_country,
                user.p_province==null?user.a_area:user.p_province,
                user.c_city==null?user.a_area:user.c_city,
                user.a_area];
            for(let key=1;key<intxt_address.length;key++){
                if(key==intxt_address.length-1){
                    inspan=inspan+'<span value="'+area[key]+'">'+intxt_address[key]+'</span>'
                }else{
                    inspan=inspan+'<span value="'+area[key]+'">'+intxt_address[key]+'</span>-'
                }
            }
            $('dl.location dd.wait').html(inspan);
        }
        areaSelectPlug.selectCreate("location");
        $('input[name="address"]').val(user.address!=null?user.address:"");
        //    bbs_aboutselfFrom
        if(user.signature!=null){
            if(user.signature!=0){
                $('#signature').html(user.signature);
                $('input[name="onekindword"]').val(user.signature);
            }
        }
        if(user.signature_bbs!=null){
            if(user.signature_bbs!=0){
                $('#aboutmyself_textarea').val(user.signature_bbs);
            }
        }
        //    bbs_skillfFrom
        let bbs_skillfFrom=['',user.skill.split(";").filter(x=>x!="").filter(x=>true),''];
        let spans=$('.chooseskill span');
        for(let s=0;s<bbs_skillfFrom[1].length;s++){
            let key=HKWselfpage_HTML.skillData.indexOf(bbs_skillfFrom[1][s]);
            if(key!=-1){
                $(spans[key]).addClass("inchoose");
                $(spans[key]).parent('a').siblings(".ck_logo:first").addClass("inchoose");
            }
            bbs_skillfFrom[0]+='<div class="inskill">'+bbs_skillfFrom[1][s]+'&nbsp;<i>×</i></div>';
            bbs_skillfFrom[2]+='<a class="showskill">'+bbs_skillfFrom[1][s]+'</a>'
        }
        $('#bbs_skillfFrom .addskill:first').html(bbs_skillfFrom[0]);
        $('#shanchangjineng_show').html(bbs_skillfFrom[2]);
        $('#bbs_skillfFrom .addskill:first').attr('value',bbs_skillfFrom[1]);

        HKWselfpage_HTML.data.skillchange_delete();
        industrySelectPlug.selectCreate();
    };

    HKWselfpage_HTML.data.bianjitinajia= function(){
        //编辑添加按钮初始化
        let editor=$('.editor');
        let addeditor=$('.addeditor');
        let cfbfbb_show=$('.cfbfbb_show');
        let cfbfbb_write=$('.cfbfbb_write');
        for(let i=0;i<editor.length;i++){
            editor[i].value=i;
              let heightchangediv=$(cfbfbb_write[i]).children(".heightchangediv")[0];
              let closebianjitianjia=$(cfbfbb_write[i]).children(".closebianjitianjia")[0];
            heightchangediv.value=heightchangediv.style.height;
            editor[i].onclick= function () {
                if($(editor[i]).attr('name')=="ready"){
                    cfbfbb_show[i].style.opacity=0;
                    setTimeout(function () {
                        cfbfbb_show[i].style.display="none";
                        cfbfbb_write[i].style.position="relative";
                        cfbfbb_write[i].style.minHeight="120px";
                        cfbfbb_write[i].style.display="block";
                        heightchangediv.style.height="0px";
                        heightchangediv.style.display="block";
                        closebianjitianjia.style.display="inline-block";
                        setTimeout(function () {
                            heightchangediv.style.opacity=1;
                            cfbfbb_write[i].style.opacity="1";
                            closebianjitianjia.style.transform="rotate(225deg)";
                            heightchangediv.style.height=heightchangediv.value;
                        },10);
                    },1000);
                }else{
                    $(editor[i]).children('a')[0].style.cursor="wait";
                    setTimeout(function () {
                        $(editor).each(function () {
                            $(this).attr('name',"ready");
                        });
                        $(addeditor).each(function () {
                            $(this).attr('name',"ready");
                        });
                        $(editor[i]).children('a')[0].style.cursor="pointer";
                        editor[i].click();
                    },1000);
                }
            }
        }
        for(let j=0;j<addeditor.length;j++){
            addeditor[j].value=j;
            let heightchangediv=$(cfbfbb_write[j+editor.length]).children(".heightchangediv")[0];
            let closebianjitianjia_other=$(cfbfbb_write[j+editor.length]).children(".closebianjitianjia_other")[0];
            heightchangediv.value=heightchangediv.style.height;
            addeditor[j].onclick= function () {
                if($(addeditor[j]).attr('name')=="ready"){
                    cfbfbb_show[j+editor.length].style.opacity=0;
                    setTimeout(function () {
                        cfbfbb_show[j+editor.length].style.display="none";
                        cfbfbb_write[j+editor.length].style.position="relative";
                        cfbfbb_write[j+editor.length].style.minHeight="120px";
                        cfbfbb_write[j+editor.length].style.display="block";
                        heightchangediv.style.height="0px";
                        heightchangediv.style.display="block";
                        closebianjitianjia_other.style.display="inline-block";
                        setTimeout(function () {
                            heightchangediv.style.opacity=1;
                            cfbfbb_write[j+editor.length].style.opacity="1";
                            closebianjitianjia_other.style.transform="rotate(225deg)";
                            heightchangediv.style.height=heightchangediv.value;
                        },100);
                    },1000)
                }else{
                    $(addeditor[j]).children('a')[0].style.cursor="wait";
                    setTimeout(function () {
                        $(editor).each(function () {
                            $(this).attr('name',"ready");
                        });
                        $(addeditor).each(function () {
                            $(this).attr('name',"ready");
                        });
                        $(addeditor[j]).children('a')[0].style.cursor="pointer";
                        addeditor[j].click();
                    },1000);
                }
            }
        }
    };HKWselfpage_HTML.data.bianjitinajia();

    //头像上传
    HKWselfpage_HTML.data.touxiangsend= function(){
        $('#touxiangInput').on('change', function () {
            let _this=document.getElementById("touxiangInput");
            let touxiangImage=document.getElementById("touxiangImage");
            imagesend.getPath(touxiangImage,_this,touxiangImage,0);
            let data={id:user_test.id,user:user.username,kind:"",data:""};
            let iii=setInterval(function () {
                data.data=imagesend.data;
                if(data.data.length>0){
                    $('#touxiang').attr('class','cfbheadimagehad');
                    let name=$('#touxiangInput').val();
                    name=name.split("\\");
                    name=name[name.length-1];
                    name=name.split(".");
                    name=name[name.length-1];
                    data.kind=name;
                    clearInterval(iii);
                    touxiangpost(data);
                }
            },500);
        });
        function touxiangpost(dataTouxiang){
            let result;
            $.post(urlLocalhost+"/users/change/change_path",dataTouxiang, function (data) {
                if(!data.err){
                    result="111"
                }else{
                    result="eee"
                }
                return result
            });
        }
    };HKWselfpage_HTML.data.touxiangsend();
    //背景图片上传
    HKWselfpage_HTML.data.BGPsend= function(){

        $('#cfosendimageinput').on('change', function () {
            let _this=document.getElementById("cfosendimageinput");
            let touxiangImage=document.getElementById("cfosendimageP");
            imagesend.getPath(touxiangImage,_this,touxiangImage,0);
            let data={id:user.id,user:user.username,kind:"",data:""};
            let iii=setInterval(function () {
                data.data=imagesend.data;
                if(data.data.length>0){
                    let name=$('#cfosendimageinput').val();
                    name=name.split("\\");
                    name=name[name.length-1];
                    name=name.split(".");
                    name=name[name.length-1];
                    data.kind=name;
                    clearInterval(iii);
                    BGPpost(data);
                }
            },500);
        });
        function BGPpost(dataBGP){
            let result;
            $.post(urlLocalhost+"/users/change/change_BGP",dataBGP, function (data) {
                if(!data.err){
                    result="111"
                }else{
                    result="eee"
                }
                return result
            });
        }
    };HKWselfpage_HTML.data.BGPsend();

    HKWselfpage_HTML.data.dataFinshLine=function () {
        $('.addfinshed .controlwidth').css({"width":user.changeValue});
        if(parseInt(user.changeValue)!=0){
            setTimeout(function () {
                if(user.path!=null&&String(user.path).length>0!=0){
                    $('.addfinshedcontrol a:eq(0)').css('opacity',1);
                }
                if(user.uBaseInfValue==1){
                    $('.addfinshedcontrol a:eq(2)').css('opacity',1);
                }
                if(user.uAboutselfValue==1){
                    $('.addfinshedcontrol a:eq(4)').css('opacity',1);
                }
                if(user.uSkillValue==1){
                    $('.addfinshedcontrol a:eq(6)').css('opacity',1);
                }
                if(user.uWorksValue==1){
                    $('.addfinshedcontrol a:eq(8)').css('opacity',1);
                }
            },1500);
        }else{
            setTimeout(function () {
                if(user.path!=null&&String(user.path).length>0){
                    $('.addfinshedcontrol a:eq(0)').css('opacity',1);
                }
                if(user.uBaseInfValue==1){
                    $('.addfinshedcontrol a:eq(2)').css('opacity',1);
                }
                if(user.uAboutselfValue==1){
                    $('.addfinshedcontrol a:eq(4)').css('opacity',1);
                }
                if(user.uSkillValue==1){
                    $('.addfinshedcontrol a:eq(6)').css('opacity',1);
                }
                if(user.uWorksValue==1){
                    $('.addfinshedcontrol a:eq(8)').css('opacity',1);
                }
            },200);
        }

    };

    HKWselfpage_HTML.data.selfImageChange=function () {


        $('#touxiang').css('background','url('+(user.path!=true && String(user.path).length>0)==true?"../"+user.path:"../image/self.png"+')');
    };

    HKWselfpage_HTML.data.dataBaseInForm=function (dataBaseInf) {
        let result;
        return $.post(urlLocalhost+"/users/change/change_BaseInf",dataBaseInf, function (data) {
            if(!data.err){
                result="111"
            }else{
                result="eee"
            }
            return result
        });
    };

    HKWselfpage_HTML.data.dataZDYBQ=function ()  {
        let  zdybqarrery;
        //自定义标签添加+初始化自动添加标签
        zdybqarrery=user.customLabels==undefined?[]:user.customLabels.split(";").filter(x=>x!="");


       let zdybq=document.getElementById("zdybq");
       function zdybqaddclickchange(){
           let zdybqaddclick=zdybq.getElementsByClassName("zdybqaddclick")[0];
           zdybqaddclick.value=true;
           zdybqaddclick.onclick= function () {
               zdybqadd(zdybqaddclick.value);
               setTimeout(function () {
                   zdybqaddfinish();
               },10)
           };
           function zdybqadd(key){
               if(key){
                   zdybqaddclick.innerHTML='<input style="height: 12px;width: 80px;'+
                       'background:rgba(0,0,0,0);color:#fff;border: none;outline:none;'+
                       'border-bottom: 1px solid #fff;font-size: 12px;margin-top: 5px;" type="text" placeholder="标签不可重复">';
               }
           }
           function zdybqaddfinish(){
               let inputzdybq=zdybqaddclick.getElementsByTagName("input")[0]||undefined;
               if(inputzdybq!=undefined){
                   zdybqaddclick.value=false;

                   inputzdybq.addEventListener("focus",function(){
                       zdybqaddclick.style.background="#555";
                       zdybqaddclick.style.color="#111";
                   });
                   inputzdybq.addEventListener("blur",function(){
                       zdybqaddclick.style.background="#eef3f6";
                       zdybqaddclick.style.color="#656668";
                       zdybqbianli();
                   });
                   inputzdybq.focus();
                   inputzdybq.addEventListener("keyup", function (event) {
                       if(inputzdybq.value.length<1){
                           zdybqaddclick.innerHTML='<input style="height: 12px;width: 80px;'+
                               'background:rgba(0,0,0,0);color:#fff;border: none;outline:none;'+
                               'border-bottom: 1px solid #fff;font-size: 12px;margin-top: 5px;" type="text" placeholder="内容不可为空">';
                       }else{
                           if(event.keyCode==13){
                               let zdybqtextvalue=inputzdybq.value;
                               trueaddone(zdybqtextvalue);
                           }
                       }

                   });
               }
           }
           function trueaddone(value){
               if(!zdybqarrery.includes(value)){
                   zdybqarrery.push(value);
                   zdybqbianli();
                   ajaxzdybq(zdybqarrery);
               }else{
                   zdybqaddclick.innerHTML='<input style="height: 12px;width: 80px;'+
                       'background:rgba(0,0,0,0);color:#fff;border: none;outline:none;'+
                       'border-bottom: 1px solid #fff;font-size: 12px;margin-top: 5px;" type="text" placeholder="标签不可重复">';
               }
           }
       }

       function zdybqbianli() {
           zdybq.innerHTML="";
           for(let i=0;i<zdybqarrery.length;i++){
               if(zdybqarrery[i].length>0){
                   let zdybqever=document.createElement("div");
                   zdybqever.className="zidingyibiaoqian";
                   zdybqever.innerHTML='<a>'+zdybqarrery[i]+
                       '<i style="" value='+i+'>X</i></a>';
                   zdybq.appendChild(zdybqever);
               }
           }
           let zdybqtext=document.createElement("div");
           zdybqtext.className="zidingyibiaoqian zdybqaddclick";
           zdybqtext.innerHTML='<a>+</a>';
           zdybq.appendChild(zdybqtext);
           zdybqaddclickchange();
           zdybqdelete();
       }

       function zdybqdelete(){
           let arraryready=[];
           let deletebuttonX=zdybq.getElementsByTagName("i");
           for(let i=0;i<deletebuttonX.length;i++){
               deletebuttonX[i].onclick= function () {
                   for(let j=0;j<zdybqarrery.length-1;j++){
                       if(j!=deletebuttonX[i].value){
                           arraryready.push(zdybqarrery[j]);
                       }
                   }
                   zdybqarrery=arraryready;
                   zdybqbianli();
                   ajaxzdybq(zdybqarrery)
               }
           }
       }

       function ajaxzdybq(arrery){
           let data=arrery.filter(x=>x!="").join(";");
           $.post(urlLocalhost+"/users/change/change_customLabels", {id:user.id,datakind:"customLabels",data:data},        function (data) {
                if(data.state=="eee"){
                    console.log("eee"+data.err);
                }else{
                    zdybqbianli();
                }
            });
        }
        zdybqbianli();
    };

    HKWselfpage_HTML.data.dataAboutSelfForm=function (dataAboutSelf) {
        let result;
        return $.post(urlLocalhost+"/users/change/change_AboutSelf",dataAboutSelf, function (data) {
            if(!data.err){
                result="111"
            }else{
                result="eee"
            }
            return result
        });
    };

    HKWselfpage_HTML.data.dataSkillfFrom=function (dataSkill) {
        let result;
        return $.post(urlLocalhost+"/users/change/change_Skill",dataSkill, function (data) {
            if(!data.err){
                result="111"
            }else{
                result="eee"
            }
            return result
        });
    };
    HKWselfpage_HTML.data.dataWorksfFromALL={topimgsend:null,imgsend:null,videosend:null,imgSelect:null,videoSelect:null};
    let keywordCount=0;
    let keyword_img=[],keyword_video=[],topshowPath="";
    HKWselfpage_HTML.data.dataWorksfFromReady=function (datatheWork){
        HKWselfpage_HTML.data.dataWorksfFromALL.topimgsend();
        if(HKWselfpage_HTML.worksImageList.length>0){
            for(let i=0;i<HKWselfpage_HTML.worksImageList.length;i++){
                HKWselfpage_HTML.data.dataWorksfFromALL.imgsend(i);
            }
        }
        if(HKWselfpage_HTML.worksVideoList.length>0){
            for(let i=0;i<HKWselfpage_HTML.worksVideoList.length;i++){
                HKWselfpage_HTML.data.dataWorksfFromALL.videosend(i);
            }
        }
        let workstime=setInterval(function () {
            if(keywordCount==(HKWselfpage_HTML.worksImageList.length+HKWselfpage_HTML.worksVideoList.length+1)){
                let workData=datatheWork;
                workData.batch_path_ids=keyword_img.join("_");
                workData.video_path_ids=keyword_video.join("_");
                workData.path=topshowPath;
                console.log(topshowPath,workData);
                HKWselfpage_HTML.dataWorksfFromdata=workData;
                clearInterval(workstime);
            }
        },400);
    };
    HKWselfpage_HTML.data.dataWorksfFrom=function (datatheWork){
        let result;
        keyword_img=[];keyword_video=[];topshowPath="";
        return $.post(urlLocalhost+"/works/work_change/data",datatheWork,function (data) {
                    if(!data.err){
                        result="111";
                    }else{
                        result="eee";
                    }
                    return result;
                });
    };
    HKWselfpage_HTML.data.dataWorksfFromALL.topimgsend=function () {
        // console.log("topimgsend");
        let result;
        timedata=new Date().toLocaleString();
        if(HKWselfpage_HTML.worksNewTopShow.length>0){
            if(HKWselfpage_HTML.worksNewTopShow.indexOf(";base64,")>-1){
                let data={id:user.id,user:user.username,kind:"",name:$(imgtopshow).attr('name'),data:HKWselfpage_HTML.worksNewTopShow,timedata:timedata};
                data.kind=$(imgtopshow).attr('name');
                data.kind=data.kind.split(".");
                data.kind=data.kind[data.kind.length-1];
                return $.post(urlLocalhost+"/works/works/image_add",data, function (data) {
                    if(!data.err){
                        result="111"
                    }else{
                        result="eee";
                    }
                    return data
                }).then(function (data) {
                    if(result!="eee"){
                        let idValue=HKWselfpage_HTML.data.dataWorksfFromALL.imgSelect(data.result);
                        let timeseteee=setInterval(function () {
                            if(idValue.readyState==4){
                                keywordCount++;
                                topshowPath=(idValue.responseJSON.result[0].path);
                                clearInterval(timeseteee);
                            }
                        },1000);
                    }
                });
            }else{
                topshowPath=HKWselfpage_HTML.worksNewTopShow;
                keywordCount++;
            }
        }else{
            if(HKWselfpage_HTML.worksImageList[0]!=undefined){
                let _this=HKWselfpage_HTML.worksImageList[0];
                if(HKWselfpage_HTML.worksImageList[0].src==""){
                    let sendnoimgshow=document.getElementById("sendnoimgshow");
                    let _data=imagesend.worksimage(sendnoimgshow,_this.file,sendnoimgshow);
                    let send_data="";
                    _data.onload=function () {
                        send_data=_data.result
                    };
                    timedata=new Date().toLocaleString();
                    let result;
                    let timeset=setInterval(function () {
                        if(send_data!=""){
                            let data={id:user.id,user:user.username,kind:"",data:send_data,alt_text:HKWselfpage_HTML.worksImageList[0].alt,timedata:timedata,name:HKWselfpage_HTML.worksImageList[0].name};
                            data.kind=HKWselfpage_HTML.worksImageList[0].name;
                            data.kind=data.kind.split(".");
                            data.kind=data.kind[data.kind.length-1];
                            $.post(urlLocalhost+"/works/works/image_add",data, function (data) {
                                if(!data.err){
                                    result="111";
                                }else{
                                    result="eee";
                                }
                                return data
                            }).then(function (data) {
                                if(result!="eee"){
                                    let idValue=HKWselfpage_HTML.data.dataWorksfFromALL.imgSelect(data.result);
                                    let timeseteee=setInterval(function () {
                                        if(idValue.readyState==4){
                                            clearInterval(timeseteee);
                                            topshowPath=idValue.responseJSON.result[0].path;
                                        }
                                    },1000);
                                }
                            }).then(function () {
                                setTimeout(function () {
                                    keywordCount++;
                                },1000)
                            });
                            clearInterval(timeset);
                        }
                    },100);
                }else{
                    topshowPath=HKWselfpage_HTML.worksImageList[0].src;
                    keywordCount++;
                }
            }else{
                keywordCount++;
            }
        }
    };
    HKWselfpage_HTML.data.dataWorksfFromALL.imgsend=function (index) {
        // console.log("imgsend");
        let _this=HKWselfpage_HTML.worksImageList[index];
        if(HKWselfpage_HTML.worksImageList[index].src==""){
            let sendnoimgshow=document.getElementById("sendnoimgshow");
            let _data=imagesend.worksimage(sendnoimgshow,_this.file,sendnoimgshow);
            let send_data="";
            _data.onload=function () {
                send_data=_data.result
            };
            timedata=new Date().toLocaleString();
            let result;
            let timeset=setInterval(function () {
                if(send_data!=""){
                    let data={id:user.id,user:user.username,kind:"",data:send_data,alt_text:HKWselfpage_HTML.worksImageList[index].alt,timedata:timedata,name:HKWselfpage_HTML.worksImageList[index].name};
                    data.kind=HKWselfpage_HTML.worksImageList[index].name;
                    data.kind=data.kind.split(".");
                    data.kind=data.kind[data.kind.length-1];
                    $.post(urlLocalhost+"/works/works/image_add",data, function (data) {
                        if(!data.err){
                            result="111";
                        }else{
                            result="eee";
                        }
                        return data
                    }).then(function (data) {
                        if(result!="eee"){
                            let idValue=HKWselfpage_HTML.data.dataWorksfFromALL.imgSelect(data.result);
                            let timeseteee=setInterval(function () {
                                if(idValue.readyState==4){
                                   clearInterval(timeseteee);
                                    keyword_img.push(idValue.responseJSON.result[0].id);
                                }
                            },1000);
                        }
                        keywordCount++;
                    });
                    clearInterval(timeset);
                }
            },100);
        }else{
            let data={srcdata:HKWselfpage_HTML.worksImageList[index].src,name:HKWselfpage_HTML.worksImageList[index].name,alt_text:HKWselfpage_HTML.worksImageList[index].alt};
            data.srcdata=data.srcdata.split(urlLocalhost);
            data.srcdata=data.srcdata[data.srcdata.length-1];
            $.post(urlLocalhost+"/works/works/image_src",data, function (data) {
                if(!data.err){
                    keyword_img.push(data.keyword_id);
                }
            }).then(function () {
                keywordCount++;
            });
        }
    };
    HKWselfpage_HTML.data.dataWorksfFromALL.videosend=function (index) {
        // console.log("videosend");
        let _this=HKWselfpage_HTML.worksVideoList[index];
        if(_this.src==""){
                let sendnovideoshow=document.getElementById("sendnovideoshow");
                let _data=videosend.worksvideo(sendnovideoshow,_this.file,sendnovideoshow);
                let send_data="";
                _data.onload=function () {
                    send_data=_data.result
                };
                timedata=new Date().toLocaleString();
                let result;
                let timeset=setInterval(function () {
                    if(send_data!=""){
                        let data={id:user.id,user:user.username,name:HKWselfpage_HTML.worksVideoList[index].name,kind:"",data:send_data,alt_text:_this.alt,timedata:timedata};
                        data.kind=HKWselfpage_HTML.worksVideoList[index].name;
                        data.kind=data.kind.split(".");
                        data.kind=data.kind[data.kind.length-1];
                        $.post(urlLocalhost+"/works/works/video_add",data, function (data) {
                            if(!data.err){
                                result="111"
                            }else{
                                result="eee";
                            }
                            return data;
                        }).then(function (data) {
                            if(result!="eee"){
                                let idValue=HKWselfpage_HTML.data.dataWorksfFromALL.videoSelect(data.result,"path");
                                let timeseteee=setInterval(function () {
                                    if(idValue.readyState==4){
                                        keyword_video.push(idValue.responseJSON.result[0].id);
                                        clearInterval(timeseteee);
                                    }
                                },1000);
                            }
                            keywordCount++;
                        });
                        clearInterval(timeset);
                    }
                },1000);
        }else{
            let result;
            timedata=new Date().toDateString();
            $.post(urlLocalhost+"/works/works/video_src",{srcdata:_this.src,name:HKWselfpage_HTML.worksVideoList[index].name,alt_text:_this.alt,timedata:timedata}, function (data) {
                if(!data.err){
                    result="111"
                }else{
                    result="eee";
                }
                return data;
            }).then(function (data) {
                if(result!="eee"){
                    if(data.keyword=="html"){
                        let idValue=HKWselfpage_HTML.data.dataWorksfFromALL.videoSelect(_this.src,"html");
                        let timeseteee=setInterval(function () {
                            if(idValue.readyState==4){
                                clearInterval(timeseteee);
                                keyword_video.push(idValue.responseJSON.result[0].id);
                            }
                        },1000);
                    }else if(data.keyword=="path"){
                        let idValue=HKWselfpage_HTML.data.dataWorksfFromALL.videoSelect(_this.src,"path");
                        let timeseteee=setInterval(function () {
                            if(idValue.readyState==4){
                                clearInterval(timeseteee);
                                keyword_video.push(idValue.responseJSON.result[0].id);
                            }
                        },1000);
                    }else{
                        keyword_video.push(data.keyword);
                    }
                }
                keywordCount++;
            });
        }
    };
    HKWselfpage_HTML.data.dataWorksfFromALL.imgSelect=function (pathValue) {
        let aaa= $.post(urlLocalhost+"/works/works/imageSelect_path",{pathValue:pathValue}, function (data) {
            // console.log(data);
        });
        return aaa
    };
    HKWselfpage_HTML.data.dataWorksfFromALL.videoSelect=function (pathValue,kind) {
        let aaa= $.post(urlLocalhost+"/works/works/videoSelect",{pathValue:pathValue,selectKind:kind}, function (data) {
            // console.log(data);
        });
        return aaa
    };
    HKWselfpage_HTML.data.worksList=function () {
        let worksListArray=[];
        let result;
        $.post(urlLocalhost+'/works/work_user',{user_id:user.id},function (data) {
            if(!data.err){
                result="111";
            }else{
                result="eee";
            }
            return data.result

        }).then(function (works) {
            let worksdata=works.result;
            if(result!="eee"){
                let inn='';
                for(let w=0;w<worksdata.length;w++){
                    if(worksdata[w].show_work==1){
                        let divtip='';let ulli='';
                        switch (worksdata[w].display){
                            case 0:{
                                divtip='<div class="dis_0"><a>未审核</a></div>';
                                ulli='<li><i style="background: url(\'./image/workshow_delete.png\') no-repeat 0 1px"></i>删除</li>'+
                                    '<li><i style="background: url(\'./image/workshow_change.png\') no-repeat 0 1px"></i>修改</li>'+
                                    '<li><i style="background: url(\'./image/workshow_show1.png\') no-repeat 0 1px"></i>预览</li>'+
                                    '<li><i style="background: url(\'./image/workshow_show2.png\') no-repeat 0 1px"></i>无法展示</li>';
                            }break;
                            case 1:{
                                divtip='<div class="dis_1"><a>通过审核</a></div>';
                                if(worksdata[w].is_home_page==1){
                                    ulli='<li><i style="background: url(\'./image/workshow_delete.png\') no-repeat 0 1px"></i>删除</li>'+
                                        '<li><i style="background: url(\'./image/workshow_change.png\') no-repeat 0 1px"></i>修改</li>'+
                                        '<li><i style="background: url(\'./image/workshow_show1.png\') no-repeat 0 1px"></i>详情</li>'+
                                        '<li><i style="background: url(\'./image/workshow_show2.png\') no-repeat 0 1px"></i>正在展示</li>';
                                }else{
                                    ulli='<li><i style="background: url(\'./image/workshow_delete.png\') no-repeat 0 1px"></i>删除</li>'+
                                        '<li><i style="background: url(\'./image/workshow_change.png\') no-repeat 0 1px"></i>修改</li>'+
                                        '<li><i style="background: url(\'./image/workshow_show1.png\') no-repeat 0 1px"></i>详情</li>'+
                                        '<li><i style="background: url(\'./image/workshow_show2.png\') no-repeat 0 1px"></i>已被隐藏</li>';
                                }
                            }break;
                            case 2:{
                                divtip='<div class="dis_2"><a>未通过</a></div>';
                                ulli='<li><i style="background: url(\'./image/workshow_delete.png\') no-repeat 0 1px"></i>删除</li>'+
                                    '<li><i style="background: url(\'./image/workshow_change.png\') no-repeat 0 1px"></i>修改</li>'+
                                    '<li><i style="background: url(\'./image/workshow_show1.png\') no-repeat 0 1px"></i>预览</li>'+
                                    '<li><i style="background: url(\'./image/workshow_show2.png\') no-repeat 0 1px"></i>无法展示</li>';
                            }break;
                            case 3:{
                                divtip='<div class="dis_3"><a>处罚</a></div>';
                                ulli='<li><i style="background: url(\'./image/workshow_delete.png\') no-repeat 0 1px"></i>删除</li>'+
                                    '<li><i style="background: url(\'./image/workshow_show1.png\') no-repeat 0 1px"></i>详情</li>'+
                                    '<li><i style="background: url(\'./image/workshow_show2.png\') no-repeat 0 1px"></i>无法展示</li>';
                            }break;
                        }
                        worksListArray.push([worksListArray.length,worksdata[w].id,worksdata[w].display,worksdata[w]]);
                        inn+='<div class="workshow_inlist" value='+(worksListArray.length-1)+'>'+
                            '<div style="position: relative;overflow: hidden;">'+divtip+
                            '<img src="'+(worksdata[w].path==""?'':(urlLocalhost+'/'+worksdata[w].path))+'">'+
                            '<ul class="workshow_contron">'+ulli+
                            '</ul>'+
                            '</div>'+
                            '<p>'+worksdata[w].title+'</p>'+
                            '</div>'
                    }
                }
                inn+=' <div class="workshow_inlistadd" value="0">'+
                    '<div style="position: relative;overflow: hidden;border: 1px dashed #e1e1e1;">'+
                    '<img src="./image/fengmian.png" style="cursor: pointer;">'+
                    '</div>'+
                    '<p>添加新作品</p>'+
                    '</div>';
                $('.workshow_list').html(inn);
            }
        }).then(function () {
            $('.workshow_inlist').each(function () {
               let _this=$(this);let keyindex=_this.attr('value');
               $(_this).find('li:eq(0)').click(function () {
                   if(keyindex!=worksListArray[keyindex][0]){
                       alert("服务器禁止了误操作！");
                   }else{
                       $('#alterbox').css('display',"block");
                       $('#alterbox').attr('value',worksListArray[keyindex][1]);
                   }
               });
                $(_this).find('li:eq(1)').click(function () {
                    if(keyindex!=worksListArray[keyindex][0]){
                        alert("服务器禁止了非法操作！");
                    }else{
                        switch (worksListArray[keyindex][2]){
                            case 0:{
                                if(0!=$('#theWork_id').val()){
                                    $('.clearbuttonchoose:eq(3)').click();
                                    setTimeout(function () {
                                        workchange(worksListArray[keyindex][3]);
                                    },1200);
                                }else{
                                    workchange(worksListArray[keyindex][3]);
                                }
                            }break;
                            case 1:{
                                alert("已通过审核的作品修改后会被重新审核！");
                                if(0!=$('#theWork_id').val()){
                                    $('.clearbuttonchoose:eq(3)').click();
                                    setTimeout(function () {
                                        workchange(worksListArray[keyindex][3]);
                                    },1200);
                                }else{
                                    workchange(worksListArray[keyindex][3]);
                                }
                            }break;
                            case 2:{
                                if(0!=$('#theWork_id').val()){
                                    $('.clearbuttonchoose:eq(3)').click();
                                    setTimeout(function () {
                                        workchange(worksListArray[keyindex][3]);
                                    },1200);
                                }else{
                                    workchange(worksListArray[keyindex][3]);
                                }
                            }break;
                            case 3:{
                                window.open("www.baidu.com","_blank");
                            }break;
                        }
                    }
                });
                $(_this).find('li:eq(2)').click(function () {
                    window.open("www.baidu.com","_blank");
                });
                console.log(worksListArray);
                if(worksListArray[keyindex][2]==1){
                    $(_this).find('li:eq(3)').click(function () {
                        let clickthis=$(this);
                        let text=$(clickthis).html();
                        if(text.indexOf("展示")>-1){
                            $.post(urlLocalhost+'/works/works/updata_ishomepage',{id:keyindex,is_home_page:0},function (data) {
                                if(data.err){
                                    alert("网络不稳定请重试");
                                }else{
                                    $(clickthis).html('<i style="background: url(\'./image/workshow_show2.png\') no-repeat 0 1px"></i>已被隐藏');
                                    worksdata[keyindex].is_home_page=0;
                                }
                            });
                        }else{
                            $.post(urlLocalhost+'/works/updata_ishomepage',{id:keyindex,is_home_page:1},function (data) {
                                if(data.err){
                                    alert("网络不稳定请重试");
                                }else{
                                    $(clickthis).html('<i style="background: url(\'./image/workshow_show2.png\') no-repeat 0 1px"></i>已被隐藏');
                                    worksdata[keyindex].is_home_page=0;
                                }
                            });
                        }
                    });
                }
            });
        });
    };

    function workchange(keydata) {
        $('#imgtopshow').attr('src',''+urlLocalhost+keydata.path);
        $('#theWork_id').attr('value',keydata.id);
        $('input[name=worksname]').attr('value',keydata.title);
        $('#worksshow_textarea').val(keydata.content);
        $('#workstext').val(keydata.content);
        $('.alterbeforesave:last').html('<span id="workshowlength" style="float: left;" >'+
            '当前： <i class="textlength" style="font-style: normal;">'+keydata.content.length+'</i>'+ '<i class="textlengthshow" style="font-style: normal;color:#0bacf5;">/500</i>'+'</span>'+'<span style="float: right;margin-right: 60px;">字数范围:<i  style="color:#f33919;font-style: normal;">0-500</i></span>');
        HKWselfpage_HTML.worksNewTopShow=keydata.path;
        let _worksImageList=keydata.batch_path_ids.split("_").filter(x=>x!="");
        console.log(_worksImageList);
        for (let elem=0;elem<_worksImageList.length;elem++) {
            $.post(urlLocalhost+'/works/works/imageSelect_id',{id:_worksImageList[elem]},function (data) {
                if(!data.err){
                    let _result=data.result[0];
                    HKWselfpage_HTML.worksImageList.push({kind:"img",name:_result.name,alt:_result.alt,file:undefined,src:urlLocalhost+'/'+_result.path})
                }
            })
        }
        let _worksVideoList=keydata.video_path_ids.split("_").filter(x=>x!="");
        for (let elem =0;elem<_worksVideoList.length;elem++) {
            $.post(urlLocalhost+'/works/works/videoSelect',{id:_worksVideoList[elem],selectKind:"id"},function (data) {
                if(!data.err){
                    let _result=data.result[0];
                    HKWselfpage_HTML.worksImageList.push({kind:"video",name:_result.name,alt:_result.alt,file:undefined,src:urlLocalhost+'/'+_result.path})
                }
            })
        }
        HKWselfpage_HTML.dataWorksfFromdata={};
        $('#work_images').html('本作品有'+_worksImageList.length+'张图片');
        $('#work_images').css('color',"#0bacf5");
        $('.imgclick:first .p:eq(0)').html("请上传图片");
        $('#imgshow').attr('src','./image/noimage.png');
        $('#imgtext').val("");
        $('#imgshow_list').html("图片数量为0");
        $('#videoalter_change').html('本作品有'+_worksVideoList.length+'项视频文件');
        $('#videoalter_change').css('color',"#0bacf5");
        $('.imgclick:last .p:eq(0)').html("请上传视频");
        $('#work_video').html('<source src="" type="video/mp4" />');
        $('#videotext').val("");
        $('#videoshow_list').html("视频数量为0");
        let key_category_ids=keydata.category_ids.split(",").filter(x=>x!="");
        function workshow_industry1(){
            $('.workshow_industry.workindustry ul:eq(0)').each(function () {
                $(this).children('li').each(function () {
                    let li_value=$(this).attr("value");
                    if(key_category_ids[1]!=undefined){
                        if(key_category_ids[1]=li_value){
                            $(this).click();
                            setTimeout(function(){
                                workshow_industry2();
                            },500)
                        }
                    }
                });
            });
        }workshow_industry1();
        function workshow_industry2(){
            $('.workshow_industry.workindustry ul:eq(1)').each(function () {
                $(this).children('li').each(function () {
                    let li_value=$(this).attr("value");
                    if(key_category_ids[2]!=undefined){
                        if(key_category_ids[2]=li_value){
                            $(this).click();
                            setTimeout(function(){
                                workshow_industry3();
                            },500)
                        }
                    }
                });
            });
        }
        function workshow_industry3(){
            $('.workshow_industry.workindustry ul:eq(2)').each(function () {
                $(this).children('li').each(function () {
                    let li_value=$(this).attr("value");
                    if(key_category_ids[3]!=undefined){
                        if(key_category_ids[3]=li_value){
                            $(this).click();
                        }
                    }
                });
            });
        }
        setTimeout(function () {
            $('#worksshow_textarea').click();
            $('#worksshow_textarea').fadeOut();
            HKWselfpage_HTML.data.workshowArray.imgclick_List();
            $('.addeditor:eq(1)').click();
            setTimeout(function () {
                let images = document.getElementById("imgshow");
                if(HKWselfpage_HTML.imgclickFunction_value==0){
                    HKWselfpage_HTML.data.imgclickFunction(images);
                    HKWselfpage_HTML.imgclickFunction_value++;
                }
            },100);
        },1000);
    }
















})();
