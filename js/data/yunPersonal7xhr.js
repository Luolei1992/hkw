/**
 * Created by gs on 2017/7/3 0003.
 */
//获取数据展示到页面
function myLinkPerson(offset, limit, page){
    var offset = offset || 0;
    var limit = limit || 10;    
    // $.ajax({
    //     url:localUrl+"/kkk",
    //     type:"post",
    //     dataType:"json",
    // }).done(function (data) {
    //     if (data.users.length > 0){
    //         // var valTemp1 = doT.template($("#linkPersonMtmpl").text());
    //         // $("#linkPersonM").append(valTemp1(data));
    //     };
    // });
    $.ajax({
        url:CONFIG.getUrl()+CONFIG.getQuotePath()+"getCustomers",
        type:"post",
        dataType:"json",
        data: {
            user_id: getCookie("user_id"),
            offset: offset,
            limit: limit
        }
    }).done(function (data) {
        if (data.data.item_list.length > 0){
            // var valTemp1 = doT.template($("#linkPersonMtmpl").text());
            // $("#linkPersonM").append(valTemp1(data));
            var template1 = $("#linkPersonMtmpl").html();
            $("#linkPersonM").empty().append(doT.template(template1)(data.data.item_list)); 
            var totalPage = Math.ceil(data.data.total_count/limit);
            proPagePaper7(totalPage, page);
        };
    });
};

function proPagePaper7(totalPage, pageNo) {
    var pageNo = pageNo || 1;
    //生成分页
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
            //手动选中按钮
            this.selectPage(n);
            myLinkPerson((n-1)*10, 10, n);
            return false;
        }
    },true);
}

$(function(){
    myLinkPerson(); 
});
/*
 * 云报价客户信息手动输入联系人信息以json的形式发送到后台保存
 * a={获取的数据}
 * b={发送的数据}
 * */
var usersObj = {};
var lisObj = {};
function newLinkPerson(a,b) {
    b.users = [];
    b.users[0] = {};
    b.users[0].dataObj = {};
    b.users[0].nick_name = 15236969696;//当前登录用户的手机号或者id
    b.users[0].id = a.id;
    b.users[0].type = a.type;
    b.users[0].dataObj = a;
};
// function newAjaxPer(a) {
//     $.ajax({
//         url:localUrl+"/kkk",   //发送到后台的数据地址,数据需要显示在选择联系人上弹窗,个人中心我的联系人页面
//         type:"post",
//         data:a,
//         dataType:"json",
//         // error : function() {
//         //     alert("保存失败")
//         // },
//         success:function (data) {
//             if(a.users[0].type == "new" && data != "") {
//                 var str = '<ul><li><input type="text" name="linkName" value="' + a.users[0].dataObj.linkName + '" disabled="true"></li><li><input type="text" name="linkPhone" value="' + a.users[0].dataObj.linkPhone + '" disabled="true"></li><li><input type="text" name="linkEmail" value="' + a.users[0].dataObj.linkEmail + '" disabled="true"></li><li><input type="text" name="linkCompany" value="' + a.users[0].dataObj.linkCompany + '" disabled="true"></li><li><a href="javascript:void(0);">编辑 / </a><a href="javascript:void(0);">删除</a></li></ul>';
//                 $(".linkPersonM").append(str);
//             }else{
//                 alert("修改成功");
//             }
//         }
//     });
// };

$(function () {
    $(document).on("keyup",'form#signupForm input',function(){
        var $parent = $(this).parent();
        $parent.find(".formtips").remove();
        //验证用户名
        if( $(this).is('#username') ){
            if( this.value=="" || this.value.length < 2 ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
        //验证邮件
        if( $(this).is('#email') ){
            if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
        //验证手机号
        if( $(this).is('#phone') ){
            if( this.value=="" || ( this.value!="" && !/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|16|17|18|19)\d{9}$/.test(this.value) ) ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
    });
    $(document).on("blur",'form#signupForm input',function(){
        var $parent = $(this).parent();
        $parent.find(".formtips").remove();
        //验证用户名
        if( $(this).is('#username') ){
            if( this.value=="" || this.value.length < 2 ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
        //验证邮件
        if( $(this).is('#email') ){
            if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
        //验证手机号
        if( $(this).is('#phone') ){
            if( this.value=="" || ( this.value!="" && !/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|16|17|18|19)\d{9}$/.test(this.value) ) ){
                $(this).addClass("borderRed");
            }else{
                $(this).removeClass("borderRed");
            };
        };
    });
    //点击编辑按钮,联系人信息可编辑
    $("body").on("click", ".linkPerson .linkPersonM>ul li a", function () {
        if ($(this).html() == "删除") {
            var customerId = $(this).attr('data-customerId');
            //删除某个联系人
            ajaxDelCustomer(customerId); 
            $(this).parent().parent().css("display", "none");
        } else if ($(this).html() == "保存") {
            $(this).html("编辑 / ").siblings().css("display", "inline-block");
            $(this).parent().parent().find("input").css("border", "0 none").attr("disabled", "true");
            var lisVal = {
                "linkName":$(this).parent().parent().find("input[name='linkName']").val(),
                "linkEmail":$(this).parent().parent().find("input[name='linkEmail']").val(),
                "linkPhone":$(this).parent().parent().find("input[name='linkPhone']").val(),
                "linkCompany":$(this).parent().parent().find("input[name='linkCompany']").val(),
                "id":$(this).parent().parent().attr("id"),
                "type":""
            };
            newLinkPerson(lisVal,lisObj);
            // newAjaxPer(lisObj);
            // 郑国庆修改
            newAjaxPer(lisVal, "modify");            
        } else {
            $(this).parent().parent().find("input").removeAttr("disabled").css("border", "1px solid #ccc");
            $(this).html("保存").siblings().css("display", "none");
        }
    });
    //新建联系人
    $("body").on("click", ".newlLinkPerson", function () {
        $(this).parent().next().css("display", "block");
        //新建联系人点击取消
        $("body").on("click", ".new_person1", function () {
            $(this).parents(".newPerson").css("display", "none");
            $("body").off("click", ".new_person2");
        });
        //新建联系人点击确定
        $("body").on("click", ".new_person2", function () {
            $("#username,#phone,#email").trigger('keyup');
            var numError = $(this).parents("form").find('.borderRed').length;
            if(numError){
                return false;
            }else {
                $(this).parents(".newPerson").css("display", "none");
                var permsg = {
                    "linkName":$("#username").val(),
                    "linkEmail":$("#email").val(),
                    "linkPhone":$("#phone").val(),
                    "linkCompany":$("#companyName").val(),
                    "id":"",
                    "type":"new"
                };
                newLinkPerson(permsg,usersObj);
                // newAjaxPer(usersObj);
                // 郑国庆添加
                newAjaxPer(permsg, "add");
            };
            $("body").off("click", ".new_person2");
        });
    });
});

/**
 * 新增和修改某个联系人
 * @Author   郑国庆
 * @DateTime 2017-08-31T16:19:35+0800
 * @param    {[object]} a [参数]
 * @param    {[string]} type [判断是新增还是修改联系人]
 */
function newAjaxPer(a, type){
    var newLinkPerson = {
        linkName:a.linkName,
        linkCompany:a.linkCompany,
        linkPhone:a.linkPhone,
        linkEmail:a.linkEmail,
        user_id:getCookie("user_id")
    };
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"addCustomer",
        type: 'POST',
        dataType: 'JSON',
        data: newLinkPerson,
    })
    .done(function(data) {
        // if(a.users[0].type == "new" && data != "") {
        //     var str = '<ul><li><input type="text" name="linkName" value="' + a.users[0].dataObj.linkName + '" disabled="true"></li><li><input type="text" name="linkPhone" value="' + a.users[0].dataObj.linkPhone + '" disabled="true"></li><li><input type="text" name="linkEmail" value="' + a.users[0].dataObj.linkEmail + '" disabled="true"></li><li><input type="text" name="linkCompany" value="' + a.users[0].dataObj.linkCompany + '" disabled="true"></li><li><a href="javascript:void(0);">编辑 / </a><a href="javascript:void(0);">删除</a></li></ul>';
        //     $(".linkPersonM").append(str);
        // }else{
        //     alert("修改成功");
        // }
        if (data.success) {
            if (type == "add") {
                layer.msg("新增成功",{time:1000},function(){
                    myLinkPerson(); //刷新联系人列表
                });
            } else {
                layer.msg("修改成功",{time:1000});
            }
        }
    })
    .fail(function(err) {
        console.log(err);
    });  
} 

/**
 * [删除联系人]
 * @Author   郑国庆
 * @DateTime 2017-08-31T19:01:35+0800
 * @param    {[string]} customerId [联系人ID]
 */
function ajaxDelCustomer(customerId){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+"delCustomer",
        type: 'POST',
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
            customer_id: customerId
        }
    })
    .done(function(res) {
        if (res.success) {
            layer.msg("删除成功",{time:1000});
        }
    })
    .fail(function(err) {
        console.log(err);
    });
}














