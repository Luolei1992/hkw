"use strict";
let selectPlug={
    //对象捕捉
     selectCreate(keyword) {
        const idkeyword="form_"+keyword+"select";
        const classkeyword="dpi_"+keyword;
        let form_select=document.getElementById(idkeyword);
        let dpiObj=document.getElementsByClassName(classkeyword)[0];
        let selectdl=form_select.getElementsByTagName("dl")[0];
        selectdl.value=false;
        let selectdds=selectdl.getElementsByTagName("dd");
        this.selectObject(dpiObj,selectdl,selectdds);
    },
     //添加点击事件
     selectObject(dpi,selectdl,selecctdds) {
         let dlheight;
         if(selecctdds.length==3){
             dlheight="138px";
         }else{
             dlheight="184px";
         }
        for(let i=0;i<selecctdds.length;i++){
            selecctdds[i].onclick=()=>{
                if(i==0){
                    selectPlug.ddchange("",selecctdds[0],dpi,selectdl,dlheight);
                }else{
                    selectPlug.ddchange(selecctdds[i],selecctdds[0],dpi,selectdl,dlheight);
                }
            }
        }
    },
     //下拉选项点击事件
     ddchange(innH,ddfirst,dpi,dlObj,dlheight) {
        if(innH!=""){
            ddfirst.style.color="#777";
            ddfirst.innerHTML=innH.innerHTML;
            dpi.value=$(innH).attr('value');
        }else{
            ddfirst.innerHTML="请选择";
            dpi.value="";
        }
        if(!dlObj.value){
            dlObj.style.height=dlheight;
            dlObj.value=!dlObj.value;
        }else{
            dlObj.style.height="46px";
            dlObj.value=!dlObj.value;
        }
    },
    //下拉框的滚动阻止事件
    preventScroll(keyword) {
        let objs = document.getElementsByClassName(keyword);
        for(let i=0;i<objs.length;i++){
            let _this=objs[i];
            if(navigator.userAgent.indexOf("Firefox")>0){
                _this.addEventListener('DOMMouseScroll',function(e){
                    _this.scrollTop += e.detail > 0 ? 46 : -46;
                    e.preventDefault();
                },false);
            }else{
                _this.onmousewheel = function(e){
                    e = e || window.event;
                    _this.scrollTop += e.wheelDelta > 0 ? -46 : 46;
                    return false;
                };
            }
        }
    }
};

let areaSelectPlug={
    //对象捕捉
    selectCreate(keyword) {
        const idkeyword="form_"+keyword+"select";
        const classkeyword="dpi_"+keyword;
        let form_select=document.getElementById(idkeyword);
        let dpiObj=document.getElementsByClassName(classkeyword)[0];
        let selectdl=form_select.getElementsByTagName("dl")[0];
        let selectdldl=form_select.getElementsByTagName("dl")[1];
        selectdl.value=false;
        let selectddFirst=selectdl.getElementsByTagName("dd")[0];
        areaSelectPlug.areaselectObject(dpiObj,selectdl,selectdldl,selectddFirst);
    },
    //添加点击事件
    areaselectObject(dpi,selectdl,selectdldl,selectddFirst) {
        let kkk=222;
        let selectdds;
        let dlheight="230px";
        let spans=selectddFirst.getElementsByTagName("span");
        for(let i=0;i<spans.length;i++){
            $(spans[i]).on('click',function () {
                let keyarea=$(spans[i]).attr('value');
                let content_dd='';
                if(keyarea==0){
                    kkk=222;
                }else{
                    if(i==0){
                        kkk=111;
                    }else if(i==1){
                        if($(spans[i]).attr('value').split("").length==2){
                            kkk=222;
                        }else{
                            kkk=111;
                        }
                    }else{
                        if($(spans[i]).attr('value').split("").length==2){
                            kkk=222;
                        }else if($(spans[i]).attr('value').split("").length==4){
                            kkk=222;
                        }else{
                            kkk=111;
                        }

                    }
                }
                $.post(urlLocalhost+"/information/areaSelect", {id:keyarea,keyword:kkk}, function (data) {
                    if(data.err){
                       console.log("网络不稳定请重试")
                    }else{
                        for(let o=0;o<data.result.length;o++){
                            content_dd+='<dd value='+data.result[o].codeid+'>'+data.result[o].cityName+'</dd>'
                        }
                    }
                }).then(function () {
                    $(selectdldl).html(content_dd);
                }).then(function () {
                    areaSelectPlug.ddchange("",spans,null,dpi,selectdl,dlheight);
                    dldlddclick($(selectdldl),spans,i);
                });
            })
        }
        function dldlddclick(selectdldl,spansObj,i){
            selectdds=$(selectdldl).children("dd");
            $(selectdds).each(function () {
                let _this=$(this);
                _this.on('click',function () {
                    areaSelectPlug.ddchange(_this,spansObj,i,dpi,selectdl,dlheight);
                    if(i==0){
                        $(spansObj[1]).click();
                        $('input[name="address"]').val("");
                    }else if(i==1){
                        $(spansObj[2]).click();
                        $('input[name="address"]').val("");
                    }
                });
            })
        }

    },
    //下拉选项点击事件
    ddchange(innH,ddfirst,iii,dpi,dlObj,dlheight) {
        if(innH!=""){
            if($(innH).attr('value').split("").length==2){
                $(ddfirst).attr('value',$(innH).attr('value'));
                $(ddfirst[1]).html("市");
                $(ddfirst[2]).html("县/区/市");
                $(ddfirst[0]).html($(innH).html());
            }else if ($(innH).attr('value').split("").length==4){
                $(ddfirst[1]).attr('value',$(innH).attr('value'));
                $(ddfirst[2]).attr('value',$(innH).attr('value'));
                $(ddfirst[2]).html("县/区/市");
                $(ddfirst[1]).html($(innH).html());
            }else if ($(innH).attr('value').split("").length==6){
                $(ddfirst[2]).attr('value',$(innH).attr('value'));
                $(ddfirst[2]).html($(innH).html());
            }
            dpi.value=$(innH).attr('value');
        }
        if(!dlObj.value){
            dlObj.style.height=dlheight;
            dlObj.value=!dlObj.value;
        }else{
            dlObj.style.height="46px";
            dlObj.value=!dlObj.value;
        }
    }
};

let industrySelectPlug={
    selectCreate() {
        const parentdiv=$('.workshow_industry.workindustry:first');
        const uls=$(parentdiv).children('ul');
        for(let i=0;i<uls.length;i++){
            industrySelectPlug.industryselectObject(uls,i);
        }
    },
    industryselectObject(ulsObj,i){
        let keyindustry=$(ulsObj[i]).attr('value');
        let innH='';
        if(keyindustry!=undefined && keyindustry!=null){
            $.post(urlLocalhost+"/information/industrySelect", {id:keyindustry}, function (data) {
                if(!data.err){
                    for(let o=0;o<data.result.length;o++){
                        innH+='<li value="'+data.result[o].id+'" > '+data.result[o].menu_name+'</li>';
                    }
                }
            }).then(function () {
                $(ulsObj[i]).html(innH);
                industrySelectPlug.ulliselect(ulsObj,i);
            });
        }
    },
    ulliselect(ulObj,i){
        let lis=$(ulObj[i]).children("li");
        $(lis).each(function () {
            let _this=$(this);
            _this.on('click', function () {
                _this.addClass('bluebg').siblings('li').attr('class',"");
                $('.workshow_industry.workindustry:first').find('input[name="workindustry"]').val(_this.attr('value'));
                if(i==0){
                    $(ulObj[i+1]).attr('value',_this.attr('value'));
                    $(ulObj[1]).html('');
                    $(ulObj[2]).html('');
                    industrySelectPlug.industryselectObject(ulObj,i+1);
                }else if(i==1){
                    $(ulObj[i+1]).attr('value',_this.attr('value'));
                    $(ulObj[2]).html('');
                    industrySelectPlug.industryselectObject(ulObj,i+1);
                }
            });
        });
    }
};