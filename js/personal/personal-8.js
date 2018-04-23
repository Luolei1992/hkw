$(function(){
	ajaxInviteList();
});

function ajaxInviteList(per_page, page){

	var per_page = per_page || 10;
	var page = page || 1;

	var personal8Param = getPersonal8Param();	
    $.ajax({
            // url: CONFIG.getMockUrl()+CONFIG.getPath()+'personal_8',
            // type: 'POST',
            // dataType: 'JSON',
        	// data: {
        	// 	user_id: getCookie("user_id"),
        	// 	per_page: per_page,
        	// 	page: page,
			// 	progress: personal8Param.progress || "0",
			// 	meetType: personal8Param.meetType || "0",
			// 	publishTime: personal8Param.publishTime || "0",
			// 	keyword: personal8Param.keyword || ""        		
			// }
			url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_meet_list',
            type: 'POST',
            dataType: 'JSON',
            data: {
            	user_id: getCookie("id"),
            	per_page: per_page,
            	page: page,
            	is_meet_from: personal8Param.meetType || "",
            	meet_status: personal8Param.progress || "",
				meet_name: personal8Param.keyword || "",
				meet_time: personal8Param.publishTime || ""  
            }
        })
        .done(function(res) {
            if (res.success) {
				if (res.data.invite.length > 0) {
					var template1 = $("#templatePersonal8").html();
					$("#viewPersonal8").empty().append(doT.template(template1)(dataTransform(res.data.invite)));
				} else {
					$("#viewPersonal8").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
            	proPagePaper8(res.data.total_pages, page);
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}

function dataTransform(data){
	for (var i = 0; i < data.length; i++) {
		// var type_state = data[i].type_state;
		var type_state = data[i].user_id_from == getCookie("user_id") ? 1 : 2;
		var answer_state = data[i].answer_state;
		if(!type_state) type_state = "0";
		if(!answer_state) answer_state = "0";
		var sumState = answer_state + "" + type_state;
		data[i].sumState = sumState;
		data[i].Format_send_time = (new Date(data[i].send_time)).Format("yyyy年M月d日 hh:mm");
		data[i].Format_invite_time = (new Date(data[i].invite_time)).Format("yyyy年M月d日 hh:mm");
		switch (sumState) {
			case '11':
				data[i].surplusTimeTxt = countDown(data[i].send_time);
				break;
			case '12':
				data[i].surplusTimeTxt = countDown(data[i].send_time);
				break;
			case '41':
				data[i].sumStateTxt = "对方已拒绝";
				break;
			case '42':
				data[i].sumStateTxt = "您已拒绝";
				break;
			case '21':
				data[i].sumStateTxt = "对方已同意";
				break;
			case '22':
				data[i].sumStateTxt = "您已同意";
				break;
			case '51':
				data[i].sumStateTxt = "超时未处理，约见已取消";
				break;
			case '52':
				data[i].sumStateTxt = "超时未处理，约见已取消";
				break;
			case '31':
				data[i].sumStateTxt = "已完成";
				break;
			case '32':
				data[i].sumStateTxt = "已完成";
				break;
		}
		
	}
	function countDown(send_time){
		var duration = 1000*60*60*24; //时长24小时
		var startTime = (new Date(send_time)).getTime(); //开始的时间戳
		var endTime = startTime + duration; //结束的时间戳
		var nowTime = (new Date()).getTime(); //当前的时间戳
		var surplusTime = endTime - nowTime //剩余的毫秒数
		var surplusTimeTxt = ""; //页面显示的剩余时间字符串
		if (surplusTime > 0) {
			var hour = parseInt(surplusTime/1000/60/60);
			var minute = parseInt((surplusTime - hour*60*60*1000)/1000/60);
			surplusTimeTxt = hour + "时" + minute + "分";
		}
		return surplusTimeTxt;
	}
	return data;
}

function ajax_change_meet_status(invite_id,type){
	$.ajax({
        // url: CONFIG.getMockUrl()+CONFIG.getPath()+'change_meet_status',
        // type: 'GET',
        // dataType: 'JSON',
        // data: {
        // 	user_id: getCookie("user_id"),       		
        // 	invite_id: invite_id,
        // 	type: type     		
		// }
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'change_meet_status',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			meet_id: invite_id,
			answer_state: type 
		}
	})
	.done(function(req) {
		layer.msg(req.message,{time:1000});
	})
	.fail(function(err) {
		console.log(err);
	});
}

$("body").on('click', '.btnWrapTwo .feedback', function(event) {
	event.preventDefault();
	var data_feedback = $(this).attr("data-feedback");
	var invite_id = $(this).attr('data-inviteId');
	is_feedback_meet(data_feedback, invite_id);
});

function ajax_feedback_meet(invite_id,value){
	$.ajax({
        // url: CONFIG.getMockUrl()+CONFIG.getPath()+'feedback_meet',
        // type: 'POST',
        // dataType: 'JSON',
        // data: {
        // 	user_id: getCookie("user_id"),       		
        // 	invite_id: invite_id,
        // 	txt: value || ""		
		// }
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'feedback_meet',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			meet_id: invite_id,
			feedback: value 
		}
	})
	.done(function(req) {
		layer.msg(req.message,{time:1000});
	})
	.fail(function(err) {
		console.log(err);
	});	
}

/**
 * 根据DOM元素的data-feedback属性，判断这个约见，我是否有反馈，如果有显示反馈，如果没有，显示输入框
 * 
 * @author ZhengGuoQing
 * @param {String} feedback 之前反馈的信息
 * @param {id} meet_id 约见的di
 */
function is_feedback_meet (feedback, meet_id){
	var isFeedback = !!feedback;
	var yesBtn = "提交";
	isFeedback ? $("#feedback-content").val(feedback) : $("#feedback-content").val("");
	isFeedback ? yesBtn = "已提交" : "";
	$('#feedback-content').attr("disabled",isFeedback);
	layer.open({
		type: 1,
		title: '反馈内容:',
		content: $("#feedback-content"),
		btn: [yesBtn,'取消'],
		yes: function(index, layero){
			if (!isFeedback) {
				var txt = $("#feedback-content").val();
				if (txt) {
					ajax_feedback_meet(meet_id,txt);
					layer.close(index);
				} else {
					layer.alert("输入不能为空");
				}
			}
		}
	});

}

function ajax_is_feedback_meet(invite_id,value){
	$.ajax({
        url: CONFIG.getMockUrl()+CONFIG.getPath()+'is_feedback_meet',
        type: 'GET',
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id"),       		
        	invite_id: invite_id,
        	txt: value || ""		
        }
	})
	.done(function(req) {
		var isFeedback = false; //是否已反馈过。
		var yesBtn = '提交';
		if (req.data.is_feedback_meet) {
			isFeedback = true;
			yesBtn = '已提交';
			$("#feedback-content").val(req.data.value);
			$('#feedback-content').attr("disabled",true);
		} else {
			isFeedback = false;
			yesBtn = '提交';
			$("#feedback-content").val("");
			$('#feedback-content').attr("disabled",false);			
		}
		layer.open({
    	    type: 1,
    	    title: '反馈内容:',
    	    content: $("#feedback-content"),
    	    btn: [yesBtn,'取消'],
    	    yes: function(index, layero){
    	    	if (!isFeedback) {
    	    		var txt = $("#feedback-content").val();
    	    		if (txt) {
    	    			ajax_feedback_meet(invite_id,txt);
    	    			layer.close(index);
    	    		} else {
    	    			layer.alert("输入不能为空");
    	    		}
    	    	}
    	    }
    	});
	})
	.fail(function(err) {
		console.log(err);
	});	
}

function getPersonal8Param(){
	var progressValue = $('#progress option:selected').val();
	var meetTypeValue = $('#meetType option:selected').val();
	var publishTimeValue = $('#publishTime option:selected').val();
	var keyword = $(".neirong-b input").val();
	return {
		progress: progressValue,
		meetType: meetTypeValue,
		publishTime: publishTimeValue,
		keyword: keyword
	}
}

function proPagePaper8(totalPage, pageNo) {
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
            ajaxInviteList(10, n);
            return false;
        }
    },true);
}

$("#progress").change(function(event) {
	kkpager.selectPage(1); 
	ajaxInviteList();
});

$("#meetType").change(function(event) {
	kkpager.selectPage(1); 
	ajaxInviteList();
});

$("#publishTime").change(function(event) {
	kkpager.selectPage(1); 
	ajaxInviteList();
});

$(".neirong-b i").click(function(event) {
	kkpager.selectPage(1); 
	ajaxInviteList();
});

$("body").on('click', '.divWrap .xmDelate_meet', function(event) {
	event.preventDefault();
	var invite_id = $(this).attr('data-inviteid');
	var then = this;
	layer.alert("是否删除该约见？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		
		ajaxDeleteMeet(invite_id, then);
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
	
});

function ajaxDeleteMeet(invite_id, then){
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+'delete_meet',
        type: 'POST',
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id"),       		
        	meet_id: invite_id,    		
        }
	})
	.done(function(req) {
		layer.msg(req.message,{time:1000});
		if (req.success) {
			$(then).parent().remove();
		}
	})
	.fail(function(err) {
		console.log(err);
	});
	
}
