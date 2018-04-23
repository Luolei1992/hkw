$(function(){
	getSelfInfo();
});


function getSelfInfo(){
    $.ajax({
            url: CONFIG.getUrl()+CONFIG.getPath()+'get_self_info/'+getCookie("user_id"),
            type: 'POST',
            dataType: 'JSON',
			xhrFields: {
            	withCredentials: true
        	},
        	crossDomain: true
        })
        .done(function(res) {
        	var data = res.data;
			if (res.success) {
				// console.log();
				$(".sjsrz a i").empty();
				$(".sjsrz a .isDesignerAuth").empty();
				$(".sjsrz.a a").append(data.real_name_status == "2" ? '<span class="isTrueNameAuth"></span>' : "<i>(未认证)</i>"); //判断是否认证
                $(".sjsrz.b a").append(data.is_auth == "1" ? '<span class="isDesignerAuth"></span>' : "<i>(未认证)</i>"); //判断是否认证
                $(".qian .zuo .p2").html("￥"+Number(data.total_financial).toFixed(2));
				$(".qian .li2 .p2").html(data.working_order_count+"/"+data.order_count);
				$(".qian .li3 .p2").html(data.working_quote_count+"/"+data.quote_count);
				$(".qian .li4 .p2").html(data.working_meet_count+"/"+data.meet_count );
				$(".yidenglu-box .li3 i").html(data.working_order_count > 0 ? "("+data.working_order_count+")" : "");
				$(".yidenglu-box .li4 i").html(data.working_quote_count > 0 ? "("+data.working_quote_count+")" : "");
				$(".yidenglu-box .li5 i").html(data.working_meet_count > 0 ? "("+data.working_meet_count+")" : "");
				$(".yidenglu-box .li9 i").html(data.customer_count > 0 ? "("+data.customer_count+")" : "");
            	$(".zjfk .p3 .number").html(data.love_count);
            	$(".zjfk .p4 .number").html(data.black_count);
				$(".zjfk .p1 span").html(data.today_vistor_count);
            	$(".zjfk .p2 span").html(data.vistor_count );
            	var template1 = $("#templatePersonalNav").html();
            	$("#viewPersonalNav").empty().append(doT.template(template1)(data.vistor_list));
            }            
        })
        .fail(function(err) {
            console.log(err);
        });	
}

function renderSelfInfo(data){

}