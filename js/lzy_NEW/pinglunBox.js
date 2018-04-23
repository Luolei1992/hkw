/**
 * Created by admin on 2017/7/31.
 */
var _LZY_real_Url='https://www.huakewang.com/',
    newhuakwang="hkw_newapi/",
    _cookie_value=$(".person-wrp a h3").html(),
    _cookie_id=getCookie('user_id'),
    _kind='',discussLists,_srcListSmail = ["024confused","014yum","017cold_sweat","049stuck_out_tongue","069smile_cat","035persevere","045sleeping","056weary","009kissing_smiling_eyes","008laughing","037sweat_smile","042relaxed","022dizzy_face","010kissing_closed_eyes","059innocent","036sweat","033rage","066heart_eyes_cat","046sleepy","051stuck_out_tongue_winking_eye","004bowtie","052sunglasses","065joy_cat","028heart_eyes","031smiling_imp","030imp","011kissing","072man","025flushed","079information_desk_person","007confounded","000smile","067smirk_cat","075person_frowning","076no_good","012kissing_heart","006blush","003grimacing","071pouting_cat","063kissing_cat","032mask","073ok_woman","021disappointed","029hushed","023scream","057worried","040neutral_face","019cry","038expressionless","016astonished","055unamused","058alien","018anguished","002grin","026frowning","001satisfied","044smiley","060angel","077raising_hand","078haircut","013wink","074person_with_pouting_face","047smirk","027grinning","054triumph","068smiley_cat","039no_mouth","061baby","050stuck_out_tongue_closed_eyes","015joy","064crying_cat_face","034pensive","070scream_cat","048sob","053tired_face","005angry","043relieved"];
if(window.location.href.indexOf("introduction") != -1){
    _kind="works";
}else if(window.location.href.indexOf("ProjectDetails") != -1){
    _kind = "project";
}else if(window.location.href.indexOf("detailed") != -1){
    _kind = "user";
} else if (window.location.href.indexOf("newsDetails") != -1) {
    _kind = "news";
};
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
};
/**
 *
 * @DateTime 2017-09-15T12:16:02+0800
 * @param keyId   [列表展示的盒子]
 * @param paramValue  [评论的一级列表数据]
 * @param thekind
 */
function pinglunBox(keyId,paramValue,thekind,n) {
    var _box=$('#'+keyId);
    var index1Content='',commonList = paramValue.item_list;
    $('#introduction_comment_count').html(paramValue.comment_total_count);
    for(var p = 0; p < commonList.length; p++){
        var commentEveList=commonList[p],
            touxiangPath=commentEveList.path_thumb;
        if(touxiangPath.indexOf("http") < 0 && touxiangPath != ""){
            touxiangPath="https://www.huakewang.com/"+touxiangPath;
        };
        if(touxiangPath.length==0){
            touxiangPath='image/bigAvator1.jpg';
        };
        index1Content+='<div class="card" data-discuss="'+commentEveList.id+'">' +
            '<div class="card-body">'+
            '<img src="'+touxiangPath+'" alt="头像" class="img-left">'+
            (commentEveList.is_auth ==1?'<img src="images/isRZ.png" class="isRZ">':"")+
            '<div class="right-body">'+
            '<p class="name">'+commentEveList.nick_name+'<i class="time">'+commentEveList.add_time_format+'</i></p>'+
            '<p class="card-body-text clearfix">'+getSmailSrc(commentEveList.content)+'</p>'+
            '</div>' +
            '<div class="hudong">'+
            '<span>'+commentEveList.commentrep_data.commentrep_list.length+'</span>'+
            '</div>'+
            '<div class="hudong_txt">'+
            '<textarea class="hudong_txtContent" data-willsendto-name="'+commentEveList.nick_name+'" data-willsendto-id="'+commentEveList.user_id_from+'" ' +
            'data-comment-id="'+commentEveList.id+'"></textarea>'+
            '<img src="images/smileBlue.png" style="width: 30px;height: 30px;margin-top: 2px;float: none;" class="smileBlue"><input type="button" value="发表">'+
            '</div><div class="replyList" data-n="'+n+'">' +(commentEveList.commentrep_data.commentrep_list.length > 0?secDiscus(commentEveList.commentrep_data.commentrep_list,false):"")+
            '</div></div>' +
            (commentEveList.commentrep_data.commentrep_list.length > 3?'<a class="seeAllDiscuss" style="cursor: pointer;color: #2FA4FF;position:relative;left: 1015px;">查看全部</a>':"")+
            '</div>';
    }
    _box.html(index1Content);
};

$(document).on("click",".smileBlue",function () {
    var $this = $(this);
    if(!$this.parent().find(".smileAllList").html()) {
        var clone = $(".smileAllList").eq(0).clone().addClass("normalStyle");
        $(clone).insertBefore($this);
    }else{
        $this.parent().find(".smileAllList").remove();
    };
})
function getSmailSrc(txt) {
    var splitPlus = txt;
    for(var i = 0;i < _srcListSmail.length;i++) {
        var s = ":"+_srcListSmail[i]+":",t = _srcListSmail[i];
        if(splitPlus.indexOf(s) != -1) {
            splitPlus = splitPlus.split(s)[0]+'<img src="images/smiles/'+t+'.png" style="width: 20px;height: 20px;">'+splitPlus.split(s)[1];
        }
    }
    return splitPlus;
}
/**
 * 二级评论
 * @param commentEveList
 */
function secDiscus(commentEveList,flag,ele) {
    var index2Content = "";
    for(var b=0;b < commentEveList.length;b++){
        var commentEveList2=commentEveList[b];
        var touxiangPath2=commentEveList2.path;

        if(touxiangPath2.indexOf("http") < 0 && touxiangPath2 != ""){
            touxiangPath2="https://www.huakewang.com/"+touxiangPath2;
        }
        if(touxiangPath2.length==0){
            touxiangPath2='image/bigAvator1.jpg';
        }
        var _display2=commentEveList2.display == 1?"block":"none";
        index2Content += '<div style="display:'+_display2+';margin-left:70px;margin-right: 20px;" class="card-body">'+
            '<img src="'+touxiangPath2+'" alt="头像" class="img-left">'+
            (commentEveList2.is_auth ==1?'<img src="images/isRZ.png" class="isRZ">':"")+
            '<div class="right-body">'+
            '<p class="name">'+commentEveList2.nick_name+'&nbsp;回复&nbsp;'+commentEveList2.nick_name_to+'<i class="time">'+commentEveList2.add_time_format+'</i></p>'+
            '<p class="card-body-text clearfix">'+getSmailSrc(commentEveList2.content)+'</p>'+
            '<div class="hudong" style="margin-right: -10px;">'+
            '</div>'+
            '<div class="hudong_txt" style="padding-left: 0;position: relative;left: -74px;width: 1002px;top:10px">'+
            '<textarea class="hudong_txtContent" data-willsendto-name="'+commentEveList2.nick_name+'" data-willsendto-id="'+commentEveList2.user_id+'" ' +
            'data-comment-id="'+commentEveList2.id+'" ></textarea>'+
            '<img src="images/smileBlue.png" style="width: 30px;height: 30px;margin-top: 2px;float: none;" class="smileBlue"><input type="button" value="发表">'+
            '</div>' +
            '</div>'+
            '</div>';
    };
    if (flag){
        ele.html(index2Content);
    };
    return index2Content;
};
$(function () {
    /**
     * 获取评论列表
     * $type	string	类型：works=作品；project=需求；news=文章；circle=帖子；
     * $article_id	int	对应类型信息的ID
     * $max_id	int	返回ID小于或等于max_id的设计师
     * $since_id	int	获取ID大于since_id最新设计师
     * $per_page	int	每页多少条数据
     * $page	int	第几页，从1开始
     */
    getSayList(1);
    function getSayList(n) {
        $.ajax({
            url:_LZY_real_Url+newhuakwang+'get_comment_list/'+_kind+'/'+getLocationParam("id")+'/0/0/10/'+n,
            type:"get",
            dataType:"json",
            success:function (res) {
                discussLists = res.data;
                if((discussLists.comment_total_count/10) > 1){
                    proPagePaper(Math.ceil(discussLists.comment_total_count/10),n);
                };
                pinglunBox("introudoction_pinglunBox",discussLists,_kind,n);
            }
        });
    };
    function getReplyList(id,ele) {
        $.ajax({
            url:_LZY_real_Url+newhuakwang+"/get_rep_comment_list/"+id+"/0/0/200/1",
            type:"get",
            dataType:"json",
            success:function (res) {
                console.log(res);
                $(this).css("display","none");
                secDiscus(res.data.item_list,true,ele);
            },error:function (res) {
                console.log(res);
            }
        })
    }
    /**
     * 获取评论回复列表
     * $comment_id	int	评论信息ID
     * $max_id	    int	返回ID小于或等于max_id的设计师
     * $since_id	int	获取ID大于since_id最新设计师
     * $per_page	int	每页多少条数据
     * $page	    int	第几页，从1开始
     */
    $(document).on("click",".seeAllDiscuss",function () {
        var id = $(this).parent().attr("data-discuss");
        getReplyList(id,$(this).parent().find(".replyList"));
        $(this).css("display","none");
    });

    $(document).on('click',".hudong", function () {
        if(getCookie('user_id')){
            $(this).next().toggleClass("curShow");
        }else{
            go_login();
        }
    });

    var pinglunBoxSubmitInputreader= function () {
        $(document).on('click', '#main-body .hudong_txt input[type=button]',function () {
            if(getCookie("user_id")){
                var _textareaInput=$(this).parent().find('textarea');
                var senddata={
                    work_id:$('#main-body').attr('name'),
                    user_id:_cookie_id,
                    nick_name_to:$(_textareaInput).attr('data-willsendto-name'),
                    user_id_to:$(_textareaInput).attr('data-willsendto-id'),
                    comment_id:$(_textareaInput).parents(".card").attr('data-discuss'),
                    content:$(_textareaInput).val()
                };
                console.log("9+++++++++++++++++++++");
                console.log(senddata);
                pinglunBoxSubmitInputSend(senddata,$(_textareaInput));
            }else{
                alertNoLoginMessageChange();
            }
        });
    };
    pinglunBoxSubmitInputreader();
    /**
     * 添加评论和回复
     * @param ajaxData
     * @param obj
     */
    var pinglunBoxSubmitInputSend= function (ajaxData,obj) {
        if(ajaxData.comment_id==0){
            console.log(ajaxData);
            $.ajax({
                url:_LZY_real_Url+newhuakwang+"/add_comment",
                type:"post",
                dataType:"json",
                data:{
                    type:ajaxData.type,               //works=作品；project=需求;news=文章;circle=帖子;
                    user_id_to:ajaxData.user_id_to,     //发布文章人的id
                    user_id:_cookie_id,                         //评论人的id
                    article_id:ajaxData.article_id,          //文章id
                    content:ajaxData.content    //评论内容
                }
            }).done(function (data) {
                console.log("评论公用接口");
                console.log(data);
                if(data.success){
                    var dddpath=data.data.path;
                    dddpath=dddpath.indexOf('http')>-1?dddpath:_LZY_real_Url+dddpath;
                    var ddd='<li>'+
                        '<img class="img-1" src="'+dddpath+'" alt=""/>'+
                        '</li>';
                    $('#ulslidetb').append(ddd);
                    obj.val("");
                    obj.blur();
                    // init_project(1);       //评分
                    //评论成功显示评论(如果是第一次，n为1)
                    getSayList($(".replyList").attr("data-n")?$(".replyList").attr("data-n"):"1");
                }else{
                    alertUploadMsg(data.message);
                }
            })
        }else{
            console.log(ajaxData);
            $.ajax({
                url:_LZY_real_Url+newhuakwang+"/rep_comment",
                type:"post",
                dataType:"json",
                xhrFields:{
                    withCredentials:true
                },
                crossDomain: true,
                data:{
                    user_id:_cookie_id,
                    comment_id:ajaxData.comment_id,
                    rep_user_id:ajaxData.user_id_to,
                    content:ajaxData.content,
                    rep_user_nick_name:ajaxData.nick_name_to
                }
            }).done(function (data) {
                console.log("评论回复公用接口");
                console.log(data);
                if(data.success){
                    obj.val("");
                    getSayList($(".replyList").attr("data-n"));
                }else{
                    alertUploadMsg(data.message);
                }
            })
        }
    };
    window.pinglunBoxSubmitInputSend=pinglunBoxSubmitInputSend;
    /*
     * 分页插件项目(每次获取数据的总页数改变需要加载一次分页插件)
     * */
    function proPagePaper(totalPage,page) {
        var pageNo = page;
        console.log(page);
        //生成分页
        // kkpager.init();
        kkpager.generPageHtml({
            pno: pageNo,
            //总页码
            total: totalPage,
            //总数据条数
            mode: 'click', //默认值是link，可选link或者click
            click: function(n) {
                //手动选中按钮
                this.selectPage(n);
                getSayList(n);
                return false;
            }
        },true);
    }

    //判断是否登陆
    var alertNoLoginMessageChange= function () {
        go_login();
    };
    window.alertNoLoginMessageChange=alertNoLoginMessageChange;

    $('#introductionTextArea').on('focus', function () {
        if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id=="") {
            $(this).siblings('sublime').css({background:'#3388ff',color:'#fff'});
            alertNoLoginMessageChange();
        }else{
            $(this).siblings('sublime').css({background:'#3388ff',color:'#fff'});
        };
    });

    $('.sublime:first').on('click',function(){
        if(_cookie_id==undefined||_cookie_id=="null"||_cookie_id==null||_cookie_id=="undefined"||_cookie_id=="") {
            alertNoLoginMessageChange();
        }else{
            var senddata={
                type:_kind,
                work_id:$('#project_content_data_show').attr('data-projece-id'),
                user_id:_cookie_id,
                nick_name_to:"",
                user_id_to:$(".img_1").attr("data-id") || getCookie("user_id"),
                comment_id:0,
                article_id:getLocationParam("id"),
                content:$("#introductionTextArea").val()
            };
            // senddata.nick_name_to=_contetnData.user_info.nick_name;
            // senddata.user_id_to=_contetnData.user_id;
            if(senddata.content.length>0){
                pinglunBoxSubmitInputSend(senddata,$('#introductionTextArea'));
            }else{
                $('#introductionTextArea').parent().append('<p style="color: red;text-align:center;transition: all 0.5s;">内容不可以为空！</p>');
                setTimeout(function () {
                    $('#introductionTextArea').parent().find('p').remove();
                },1800);
            };
        };
    });
});
