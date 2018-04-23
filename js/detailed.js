/**
 * tab切换页
 * @param 
 * @return {[type]}     [description]
 */
$('.context .tab li').click(function(){
    $('.context .tab li').removeClass('cur');
    $(this).toggleClass('cur');
    $('.context .wrap-list').css({'display':'none'});
    var indexNum = $('.context .tab li').index(this);
	$('.context .wrap-list:eq('+indexNum+')').css({'display':'block'});
	$("#recentVisitors,#main-body").css("display","none");
	if (indexNum == 3) {
		ajaxUserList();
	};
	if (indexNum == 1) {
		ajaxAllWorksList("all");
	};
	if (indexNum == 0) {
		ajaxAllWorksList("important");
		$("#recentVisitors,#main-body").css("display", "block");
	};
});

$("body").on("click", ".wrap-list .serve-card", function () {
	$(this).toggleClass('cur');
	var leng = 0;
	leng = $(".wrap-list .cur").length;
	if (leng > 0) {
		$(".wrap-list .buy-serve").css({
			"background-color": 'rgb(51, 204, 255)',
			"cursor": 'pointer'
		});
	}else{
		$(".wrap-list .buy-serve").css({
			"background-color": '#ccc',
			"cursor": 'inherit'
		});
	}
});

/**
 * tab切换页--案例展示页瀑布流效果和图片延时加载效果
 * @param  {[type]} ){	} [description]
 * @return {[type]}        [description]
 */
$(function(){
	$('.context .tab li').eq(1).click(function(){
        waterfall('pblUl','li');
        delay();
    });
    $('.context .tab li').eq(3).click(function(){
        waterfall('pblUl','li');
        delay();
	});

	$("#loveWorkList").css("display","none"); //隐藏喜欢的作品tab切换。因为隐私设置
	$("#loveDesignerList").css("display","none"); //隐藏喜欢的设计师tab切换。因为隐私设置
	ajaxGetPrivacySetList(); //根据隐私设置，判断是否显示喜欢的设计师或作品

	ajaxAllWorksList("important"); //初始化加载首页推荐作品
});

/**
 * tab切换页--案例展示页瀑布流效果和图片延时加载效果两个函数
 */
function delay() {
	if ($('div.wrap-list').length == 4) {
		if ($('div.wrap-list').eq(1).css('display') == 'block') {
			$('div.wrap-list').eq(1).find('li.ljz').each(function() {
				var LiHeg = parseInt($(this).css('top')) + $(this).parent().offset().top;
				if (LiHeg < $(window).height() + $(window).scrollTop()) {
					$(this).removeClass('ljz');
				} else {
					false;
				}
			});
		}
		if ($('div.wrap-list').eq(3).css('display') == 'block') {
			$('div.wrap-list').eq(3).find('li.ljz').each(function() {
				var LiHeg = parseInt($(this).css('top')) + $(this).parent().offset().top;
				if (LiHeg < $(window).height() + $(window).scrollTop()) {
					$(this).removeClass('ljz');
				} else {
					false;
				}
			});
		} else {
			false;
		}
	} else {
		$('ul.pblUl>li.ljz').each(function() {
			var LiHeg = parseInt($(this).css('top')) + $('ul.pblUl').offset().top;
			if (LiHeg < $(window).height() + $(window).scrollTop()) {
				$(this).finish().animate({
					'opacity': '1'
				}, 500);
				$(this).removeClass('ljz');
			} else {
				false;
			}
		});
	}
}

function waterfall(parent, li) {
	var $aLi = $('ul.pblUl>li'); //获取li
	var LiW = $('ul.pblUl>li').eq(0).width() + 27; //获取li的宽度
	// $('ul.pblUl').css({
	// 	'width': LiW * 4
	// });
	var LiHArr = [] //用于存储 没列中所有块相加的高度

	$('ul.pblUl').each(function() {
		$(this).children('li').each(function(index, value) {
			var LiH = $(this).parent().children('li').eq(index).height();
			if (index < 4) {
				LiHArr[index] = LiH;
			} else {
				var minH = Math.min.apply(null, LiHArr);
				var minHIndex = $.inArray(minH, LiHArr);
				$(value).finish().css({
					'position': 'absolute',
					'top': minH + 35,
					'left': $(this).parent().children('li').eq(minHIndex).position().left
				});
				//数组 最小高元素的高 + 添加上的aLi[i]块框高
				LiHArr[minHIndex] += $(this).parent().children('li').eq(index).height() + 35;
				var maxH = Math.max.apply(null, LiHArr);
				var maxHIndex = $.inArray(maxH, LiHArr);
				$(this).parent().finish().css({
					'height': maxH,
					'margin-bottom': '80px'
				});
			}
		});
	});
}

/**
 * [description]
 * @param 
 * @param  {[type]}
 * @return {[type]}            [description]
 */
$(function() {
	//$('.hkw-work-list li').hover(function() { //热爱设计到狂热边框显示
	//	//	$(this).children('.iInspir-block').finish().fadeIn(100).animate({'opacity':'1'},500);
	//	$(this).find('div.caption').finish().slideDown(100);
	//	$(this).children('.iInspir-block').css({
	//		'border': '1px solid #03a5ee'
	//	});
	//}, function() {
	//	//	$(this).children('.iInspir-block').finish().fadeOut(100).animate({'opacity':'0'});
	//	$(this).find('div.caption').finish().slideUp(100);
	//	$(this).children('.iInspir-block').css({
	//		'border': '1px solid transparent'
	//	});
	//});
});
/**
 * 鼠标hover喜欢的设计师卡片上边框变色,显示对话，约见，下单按钮
 */
$('.ca-item').hover(function() {
	$(this).children('.ca-item-main').css({
		'border': '1px solid #0096ff'
	});
	$(this).children('.ca-item-main').find('.ca-item-photo img').css({
		'border': '1px solid #0096ff'
	});
	$(this).find('.fn-hide').finish().slideDown(200);
}, function() {
	$(this).children('.ca-item-main').css({
		'border': '1px solid #c9c9c9'
	});
	$(this).children('.ca-item-main').find('.ca-item-photo img').css({
		'border': '1px solid #fff'
	});
	$(this).find('.fn-hide').finish().slideUp(200);
});
/**
 * 遮罩弹出层代码
 * @param  {[type]} mask  [遮罩层id]
 * @param  {[type]} login [弹出层di]
 * @param  {[type]} close [关闭按钮id]
 * @param  {[type]} btn   [打开弹出层按钮id]
 * @return {[type]}       [没有返回值]
 */
function popUp(mask,login,close,btn){
	var oMask = document.getElementById(mask);
	var oLogin = document.getElementById(login);

	function displayNone(){
		$(oMask).fadeOut();
		$(oLogin).fadeOut();
	}

	function displayBlock(){
		$(oMask).fadeIn(300);
		$(oLogin).fadeIn(300);
	}

	function openNewLogin(){
		var sHeight = document.documentElement.scrollHeight;
		var sWidth = document.documentElement.scrollWidth;
		var wHeight = document.documentElement.clientHeight;
		oMask.style.height = sHeight + "px";
		oMask.style.width = sWidth + "px";
		displayBlock(); //显示弹出层
		var dHeight = oLogin.offsetHeight;
		var dWidth = oLogin.offsetWidth;
		oLogin.style.left = (sWidth - dWidth) / 2 + "px";
		oLogin.style.top = (wHeight - dHeight) / 2 + "px";

		var oClose = document.getElementById(close);
		oMask.onclick = oClose.onclick = function(){
			displayNone(); //隐藏弹出层
		}
		return true;
	}

	var oBtn = document.getElementById(btn);
	oBtn.onclick = function(){
		NewLoginDOM() && openNewLogin() && shoppingCart() && cycle();

		//模拟点击二维码
		// $(".ewm .ewmLeft .click-pay").trigger("click");
		getYeNum(); //获取余额
	}
}

/**
 * 点击弹出层按钮时，计算用户选中了哪些商品,渲染弹出层
 */
function NewLoginDOM(){
	var selected = [];
	var oneSelected = [];

	var selectedDOM = document.querySelectorAll(".serve-card.cur");
	for (var i = 0,leng = selectedDOM.length; i < leng; i++) {
		oneSelected[0] = selectedDOM[i].getElementsByClassName("card-right-word")[0].innerHTML;
		oneSelected[1] = selectedDOM[i].getElementsByClassName("card-right-money")[0].innerHTML;
		oneSelected[2] = selectedDOM[i].getElementsByClassName("card-right-price")[0].innerHTML;
		oneSelected[3] = selectedDOM[i].getAttribute("data-id");

		// selected[i] = oneSelected;
		selected[i] = [oneSelected[0],oneSelected[1],oneSelected[2],oneSelected[3]];
		var template1 = document.getElementById("template1").innerHTML;
		document.getElementById("tempView1").innerHTML = doT.template(template1)(selected);
	}

	return selectedDOM.length;
}

/**
 * 弹出层初始化
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
$(function(){
	popUp("mask-detailed","pay-detailed","mask-close","buy-serve");
})

/**
 * 购物车代码
 * @return {[type]} [description]
 */
function shoppingCart(){
	if (!document.getElementsByClassName) {
		document.getElementsByClassName = function (cls) {
			var ret = [];
			var els = document.getElementsByTagName('*');
			for (var i = 0, len = els.length; i < len; i++) {

				if (els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
					ret.push(els[i]);
				}
			}
			return ret;
		}
	}	


	var tr = document.querySelectorAll(".cartTable tbody tr");//所有的tr对象
	var priceTotal = document.getElementById("priceTotal"); //总计
	var taxPrice = document.getElementById("taxPrice"); //税费
	
	/**
	 * 计算总价和更新总价
	 * @param  {[type]} preTax [是否计算税率，默认是计算税率，不需要写参数。凡是参数为true都不计算税率]
	 * @return {[type]}        [description]
	 */
	function updateTotal(preTax){
		var preTax = !preTax;
		var price = 0;
		for (var i = 0; i < tr.length; i++) {
			// price += parseFloat(tr[i].getElementsByTagName("td")[2].children[0].children[0].innerHTML); //计算纳税前总价格
			price += parseFloat(tr[i].getElementsByTagName("td")[2].children[0].children[0].getAttribute("data-linePrice")); //计算纳税前总价格
		}

		//更新代码，当更新总价时，就显示二维码遮罩层
		showClickPay();	

		if (preTax) {   //默认计算税率
			var rate = taxPrice.getAttribute("data-taxRate"); //获取税率;
			var tax = (price*rate).toFixed(2); //税费 变量price是不计算税率的总价
			taxPrice.innerHTML = tax; //写入税费
			price += parseFloat(tax); //总价添加税率
			var totalPrice = price.toFixed(2); //总价
			priceTotal.innerHTML = totalPrice; //更新总价
			$(".ewm .RMB").html(totalPrice); //更新二维码右边的总价
			return totalPrice;			
		}
		return price;
	}
	/**
	 * 计算单行价格
	 * @param  {[type]} tr [description]
	 * @return {[type]}    [description]
	 */
	function getSubtotal(tr){
		// console.log(tr);
		var unitPrice = tr.getAttribute("data-unitPrice"); //获取单价
		var subtotal = tr.getElementsByClassName("subtotal-in")[0];//获取一行的总价对象
		var countInput = tr.getElementsByTagName('input')[0];//获取input对象
		var count = tr.getElementsByTagName('input')[0].getAttribute("data-value"); //获取数量数据
		// console.log("单价："+unitPrice+" 数量："+count);
		var less = tr.getElementsByClassName("buyNumberLess")[0] //-号
		var plus = tr.getElementsByClassName("buyNumberPlus")[0] //+号
		//更新每行价格
		// subtotal.innerHTML = (parseInt(count)*parseFloat(unitPrice)).toFixed(2);
		//更改每行价格计算方式
		subtotal.setAttribute("data-linePrice",(parseInt(count)*parseFloat(unitPrice)).toFixed(2));

		//为了获取方便将每行价格和每行数量放到tr上
		tr.setAttribute("data-linePrice",(parseInt(count)*parseFloat(unitPrice)).toFixed(2));
		tr.setAttribute("data-num",count);

		//如果用户输入数量少于1就改变-号的颜色，显示为不可点击.
		if (count <= 1) {
			less.style.backgroundColor = "#ccc";
			less.style.cursor = "inherit";
		} else {
			less.style.backgroundColor = "#01a1ea";
			less.style.cursor = "pointer";
		}
	}
	/**
	 * 初始化单行价格和总价格，以及按钮显示样式，是否可点击。
	 * @param  {[type]}
	 * @return {[type]}
	 */
	for (var i = 0; i < tr.length; i++) {
		var outLess = tr[i].getElementsByClassName("buyNumberLess")[0] //-号
		outLess.style.backgroundColor = "#ccc";
		outLess.style.cursor = "inherit";
		getSubtotal(tr[i])
	}
	updateTotal() //初始化显示总价

	/**
	 * 为每行元素添加点击事件
	 * @param  
	 * @return 
	 */
	for (var i = 0; i < tr.length; i++) {
		//将点击事件绑定到tr元素，利用事件代理判断点击事件发生位置。
		tr[i].onclick = function(e){
			var e = e || window.event;
			var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素，兼容IE
			var cls = el.className; //触发元素的class
			var countInput = this.getElementsByTagName('input')[0];//获取input对象
			var countValue = parseInt(countInput.value) //input的值

			//通过判断触发元素的class确定用户点击了那个元素
			switch(cls){
				case "buyNumberLess" :
					if(countValue > 1) {
						countInput.value = countValue - 1;
						countInput.setAttribute("data-value",countValue - 1);
						getSubtotal(this);
						updateTotal();
					}
					break;
				case "buyNumberPlus" :
					countInput.value = countValue + 1;
					countInput.setAttribute("data-value",countValue + 1);
					getSubtotal(this);
					updateTotal();
			}
			
		}
		//给数目输入框绑定keyup事件
		tr[i].getElementsByTagName("input")[0].onkeyup = function(e){
			var e = e || window.event;
			var k = e.keyCode;
			if (this.value !== "") {
     			var val = parseInt(this.value) || 1;
				var valData = this.getAttribute("data-value");
				if (isNaN(val) || val < 1) {
					this.value = valData;
				}
				if (this.value != val) {
					this.value = val;
					if (val < 1) {
						this.value = valData;
					}
				}
				if (val >= 1) {
				// console.log("输入内容： "+val);
					this.setAttribute("data-value",val);
				//更新单行价格
				// console.log("更新单行价格");
				getSubtotal(this.parentNode.parentNode.parentNode.parentNode.parentNode);
				updateTotal(); //更新总价
				}
			} else {
				this.onblur = function(e){
					if (this.value === "") {
						this.value = 1;
						this.setAttribute("data-value",1);
						//更新单行价格
						getSubtotal(this.parentNode.parentNode.parentNode.parentNode.parentNode);
						updateTotal(); //更新总价
					}
				}
			}
		}
	}
	$(".tax-rate").click(function(event) {
		$(".tax-rate").removeClass('cur');
		$(this).addClass('cur');
		var indexNum = $('.tax-rate').index(this); //点击税率按钮的序列号
		var preTax = updateTotal(true); //不计算税费的总价
		var taxRate = [0,0.06];
		var tax = (preTax*taxRate[indexNum]).toFixed(2); //税费
		taxPrice.setAttribute("data-taxRate",taxRate[indexNum]);
		taxPrice.innerHTML = tax;
		var endPrice = (parseFloat(preTax)  + parseFloat(tax)).toFixed(2);
		priceTotal.innerHTML = endPrice; //更新总价
		$(".ewm .RMB").html(endPrice); //更新二维码右边的总价
	});
	function taxRate(){
		var rate = taxPrice.getAttribute("data-taxRate");
		var preTax = updateTotal(true); //不计算税费的总价
		var tax = (preTax*rate).toFixed(2); //税费
		taxPrice.innerHTML = tax; //写入税费
	}
	return true;
}

function cycle(){
	var tr =document.getElementById("cycle-in");

	//如果输入框内文字等于1，则减小按钮样式变化，不可点击
	function lessStyle(countValue){
        //如果用户输入数量少于1就改变-号的颜色，显示为不可点击. 有问题
        var less = tr.getElementsByClassName("buyNumberLess")[0];
        if (countValue <= 1) {
            less.style.backgroundColor = "#ccc";
            less.style.cursor = "inherit";
        } else {
            less.style.backgroundColor = "#01a1ea";
            less.style.cursor = "pointer";
        }
	}
    lessStyle(1);
	tr.onclick = function(e){
        var e = e || window.event;
        var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素，兼容IE
        var cls = el.className; //触发元素的class
        var countInput = this.getElementsByTagName('input')[0];//获取input对象
        var countValue = parseInt(countInput.value) //input的值

        //通过判断触发元素的class确定用户点击了那个元素
        switch(cls){
            case "buyNumberLess" :
                if(countValue > 1) {
                    countInput.value = countValue - 1;
                    countInput.setAttribute("data-value",countValue - 1);
                    // getSubtotal(this);
                    // updateTotal();
                    lessStyle(countInput.value); //判断减按钮是否可点击
                }
                break;
            case "buyNumberPlus" :
                countInput.value = countValue + 1;
                countInput.setAttribute("data-value",countValue + 1);
                // getSubtotal(this);
                // updateTotal();
                lessStyle(countInput.value); //判断减按钮是否可点击
        }

        //给数目输入框绑定keyup事件
		tr.getElementsByTagName("input")[0].onkeyup = function(e){
            if (this.value !== "") {
                var val = parseInt(this.value) || 1;
                var valData = this.getAttribute("data-value");
                if (isNaN(val) || val < 1) {
                    this.value = valData;
                }
                if (this.value != val) {
                    this.value = val;
                    if (val < 1) {
                        this.value = valData;
                    }
                }
                if (val >= 1) {
                    // console.log("输入内容： "+val);
                    this.setAttribute("data-value",val);
                    //更新单行价格
                    // console.log("更新单行价格");
                    // getSubtotal(this.parentNode.parentNode.parentNode.parentNode.parentNode);
                    // updateTotal(); //更新总价
                    lessStyle(val); //判断减按钮是否可点击
                }
            } else {
                this.onblur = function(e){
                    if (this.value === "") {
                        this.value = 1;
                        this.setAttribute("data-value",1);
                        //更新单行价格
                        // getSubtotal(this.parentNode.parentNode.parentNode.parentNode.parentNode);
                        // updateTotal(); //更新总价
                        lessStyle(this.value); //判断减按钮是否可点击
                    }
                }
            }
		}
	}
}
/**支付宝，微信，画客网支付方式切换**/
$('div.paymentMainDiv ul.zfUl li').click(function() {
	$('div.paymentMainDiv ul.zfUl li').removeClass('cur');
	$(this).toggleClass('cur');
	var liIndex = $('div.paymentMainDiv ul.zfUl li').index($(this));
	$('div.ewm').css({
		'display': 'none'
	});
	$('div.ewm:eq(' + liIndex + ')').css({
		'display': 'block'
	});
	showClickPay(); //二维码显示遮罩层。
	//清除定时器轮询订单状态
	window.PayStausTimer.map(function (value, index, elem) {
		clearInterval(value);
	});
});
/**支付宝，微信，画客网支付方式切换**/

/**
 * 个人首页关注按钮点击一下判断是否是已关注状态，两种状态间切换
 * @param  {[type]} obj    DOM对象
 * @param  {[type]} number 关注数是+1还是-1
 * @return {[type]}        无
 */


$(function(){
	ajaxGetServerCard(); //ajax获取设计师主页的有偿服务列表
});

 /**
  * ajax获取设计师主页的有偿服务列表
  * 
  * @author ZhengGuoQing
  * @param {Number} per_page 每页数量
  * @param {Number} page 第几页
  */
function ajaxGetServerCard(per_page, page){
	var per_page = per_page || 10;
    var page = page || 1;
	var offset = (page - 1)*per_page;
	
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_user_service_template_list',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getLocationParam("id"),
			limit: per_page,
			offset: offset
		},
		success: function (res) {
			if (res.success) {
				if (res.data.item_list.length > 0) {
					renderServerCard(res.data.item_list);
				} else {
					$("#buy-serve").css("display","none");
					$("#viewServreCard").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
			}
		}
	});
}

 /**
  * 渲染设计师主页的有偿服务列表
  * 
  * @author ZhengGuoQing
  * @param {any} data 
  */
 function renderServerCard(data){
	var template1 = $("#templateServreCard").html();
	$("#viewServreCard").empty().append(doT.template(template1)(data));
 }

/**
 * [获取关注的作品]
 * @Author   郑国庆
 * @DateTime 2017-09-08T09:52:51+0800
 * @param    {[type]} per_page [每页显示几条数据]
 * @param    {[type]} page     [第几页]
 */
function ajaxUserList(page, per_page){
	var type = type || "user";
	var page = page || 1;
	var per_page = per_page || 20;
	var user_id = $("#img-touxiang").attr("data-id");
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_user_favorite_list/works'+'/0/0/'+per_page+'/'+page+'/'+user_id, 
        type: "POST",
        dataType: 'JSON',
        data: {
        	user_id: getCookie("user_id")
        }
	})
	.done(function(req) {
		if (req.success) {
			// console.log(req.data.item_list.length);
			if (req.data.item_list.length > 0) {
				//自定义页面锚点
                req.data.item_list[0].diyAnchorPage = "page_"+ page;
				page == 1 ? $("#view5Work").empty() : "";
				var template3 = $("#template5Work").html();
				$("#view5Work").append(doT.template(template3)(req.data.item_list));
				var className = "#view5Work "+".page_"+ page+" .delay.maxImgWidth";
            	$(className).load(function(event) {
            		waterfall();
            		$('.hkw-work-list li').off();
            		// hoverWork();
            	});						
            	// proPagePaper5("works",req.data.total_pages, page);				
			} else {
				// $("#mixdb").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
			}
			renderLoadMore(page, req.data.total_pages); //加载更多，相当于分页功能
		}
	})
	.fail(function(err) {
		console.log(err);
	});		
}

// //点击已收藏，取消收藏
// $("body").on('click', '.deleteWroks', function(event) {
// 	event.preventDefault();
// 	var $dom = $(this);
// 	var id = $(this).attr('data-id');
// 	deleteLove("works", id, $dom);
// });

// /**
//  * [删除我的关注]
//  * @Author   郑国庆
//  * @DateTime 2017-09-08T20:42:32+0800
//  * @param    {[String]} type [删除类型]
//  * @param    {[Number]} id   [关注的id]
//  * @param    {[Object]} $dom   [删除按钮]
//  */
// function deleteLove(type, id, $dom){
// 	$.ajax({
// 		url: CONFIG.getUrl()+CONFIG.getPath()+'my_love_delete',
// 		type: 'POST',
// 		dataType: 'JSON',
// 		data: {
// 			user_id: getCookie("user_id"),
// 			id: id
// 		}
// 	})
// 	.done(function(req) {
// 		// layer.msg(req.message,{time:1000});	
// 		$dom.html("收藏");
// 		layer.msg(req.message,{time:1000});	
// 	})
// 	.fail(function(err) {
// 		console.log(err);
// 	});
	
// }

/**
 * [添加我的关注，如果该作品已经被关注，则取消关注]
 * @Author   郑国庆
 * @DateTime 2017-09-08T20:42:32+0800
 * @param    {[String]} model [删除类型]
 * @param    {[Number]} id   [关注的id]
 * @param    {[Object]} $dom   [删除按钮]
 */
function addLove(model, id, $dom){
	if (window.ajaxAddLove != null) {
		window.ajaxAddLove.abort();
	}
	window.ajaxAddLove = $.ajax({
		url: CONFIG.getUrl()+CONFIG.getPath()+'add_favorite',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			id: id,
			type:model
		}
	})
	.done(function(req) {
		// layer.msg(req.message,{time:1000});
		if (req.message.type == "delete") {
			$dom.html("收藏");
			layer.msg("删除成功",{time:1000});		
		}
		if (req.message.type == "add") {
			$dom.html("已收藏");
			layer.msg("收藏成功",{time:1000});		
		}	
	})
	.fail(function(err) {
		console.log(err);
	});
	
}


//点击已收藏，取消收藏
$("body").on('click', '.deleteWroks', function(event) {
	event.preventDefault();
	var $dom = $(this);
	var id = $(this).attr('data-id');
	// deleteLove("works", id, $dom); //原来的删除接口
	addLove("works", id, $dom);
});

/**
 * 点击加载更多的事件
 */
$("body").on("click", "#workListAddMoreContent h2", function (e) {
	var page = $(this).attr("data-page");
	var maxPage = $(this).attr("data-maxPage");
	maxPage > page ? ajaxUserList(parseInt(page) + 1) : "";
});

$("body").on("click", "#workListAddMoreContent_designer h2", function (e) {
	var page = $(this).attr("data-page");
	var maxPage = $(this).attr("data-maxPage");
	maxPage > page ? ajaxAllWorksList("all", (parseInt(page) + 1)) : "";
});

$("body").on("click", "#workListAddMoreContent_designer0 h2", function (e) {
	var page = $(this).attr("data-page");
	var maxPage = $(this).attr("data-maxPage");
	maxPage > page ? ajaxAllWorksList("important", (parseInt(page) + 1)) : "";
});

/**
 * 渲染加载更多按钮，判断是显示加载更多还是显示没有更多了
 * 同时将当前页和页面总数写到DOM上
 * 
 * @author ZhengGuoQing
 * @param {any} page 
 * @param {any} maxPage 
 */
function renderLoadMore(page, maxPage){
	if (maxPage == "0") {
		$("#error_workslist_user_like").css("display","block");
	}
	if (page >= maxPage) {
		$("#workListAddMoreContent").css("display","none");
	} else {
		$("#workListAddMoreContent").css("display","block");
	}
	$("#workListAddMoreContent h2").attr("data-page", page);
	$("#workListAddMoreContent h2").attr("data-maxPage", maxPage);
}

function renderLoadMor1(page, maxPage){
	if (maxPage == "0") {
		$("#error_workslist_designer").css("display","block");
	}
	if (page >= maxPage) {
		$("#workListAddMoreContent_designer").css("display","none");
	} else {
		$("#workListAddMoreContent_designer").css("display","block");
	}
	$("#workListAddMoreContent_designer h2").attr("data-page", page);
	$("#workListAddMoreContent_designer h2").attr("data-maxPage", maxPage);
}

function renderLoadMor0(page, maxPage){
	if (maxPage == "0") {
		$("#error_workslist_showout_designer").css("display","block");
	}
	if (page >= maxPage) {
		$("#workListAddMoreContent_designer0").css("display","none");
	} else {
		$("#workListAddMoreContent_designer0").css("display","block");
	}
	$("#workListAddMoreContent_designer0 h2").attr("data-page", page);
	$("#workListAddMoreContent_designer0 h2").attr("data-maxPage", maxPage);
}

/**
 * ajax获取隐私设置列表,即判断，我喜欢的作品和我喜欢的设计师是否出现
 * 
 * @author ZhengGuoQing
 */
function ajaxGetPrivacySetList(){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_privacy_set_list',
        type: "POST",
        dataType: "JSON",
        data: {
            user_id: getCookie("user_id")
        },
        success: function (res) {
            if (res.success) {
                setPrivacy(res.data);
            }
        }
    }); 
}

/**
 * 根据隐私设置，设置是否显示喜欢的设计师和喜欢的作品
 * 
 * @author ZhengGuoQing
 * @param {any} data 隐私设置数据
 */
function setPrivacy(data){
	if (data.show_love_users == "0") {
		//隐藏设计师
		$("#loveDesignerList").css("display","none"); //隐藏喜欢的设计师tab切换。因为隐私设置
	} else {
		//显示设计师
		$("#loveDesignerList").css("display","block"); //显示喜欢的设计师tab切换。因为隐私设置
	}
	if (data.show_love_works == "0") {
		//隐藏作品
		$("#loveWorkList").css("display","none"); //隐藏喜欢的作品tab切换。因为隐私设置
	} else {
		//显示作品
		$("#loveWorkList").css("display","block"); //显示喜欢的作品tab切换。因为隐私设置
	}
}

/**
 * [获取案例展示的作品]
 * @Author   郑国庆
 * @DateTime 2017-09-08T09:52:51+0800
 * @param    {[type]} type [判断是显示案例展示的所有作品，还是显示推荐到主页的作品，前者为all,或者为important]
 * @param    {[type]} per_page [每页显示几条数据]
 * @param    {[type]} page     [第几页]
 */
function ajaxAllWorksList(type, page, per_page){
	var type = type || "all";
	var page = page || 1;
	var per_page = per_page || 20;
	var user_id = getLocationParam("id");
	var is_home_page = "";
	if (type == "important") {
		is_home_page = 1;
	}
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_user_works_list_ex/'+user_id+'/add_time/'+per_page+'/'+page, 
        type: "POST",
        dataType: 'JSON',
        data: {
			user_id: getCookie("user_id"),
        	is_home_page: is_home_page
        }
	})
	.done(function(req) {
        if (req.success) {
			// console.log(req.data.item_list.length);
			var viewID = "#view0Work";
			var templateID = "#template0Work";
			if (type != "important") {
				viewID = "#view1Work";
				templateID = "#template1Work";
			}
			if (type == "important" && page == 1 && req.data.item_list.length < 8) {
				ajaxNoHomePageWorksList((8 - parseInt(req.data.item_list.length)), req.data.item_list); //如果设计师主页作品少于8个时获取案例展示页的更多数据
				return;
			}
			if (req.data.item_list.length > 0) {
				//自定义页面锚点
				page == 1 ? $(viewID).empty() : "";
				req.data.item_list[0].diyAnchorPage = "page_"+ page;
				var template3 = $(templateID).html();
				$(viewID).append(doT.template(template3)(req.data.item_list));
				var className = viewID+" .page_"+ page+" .delay.maxImgWidth";
            	$(className).load(function(event) {
            		waterfall();
            		$('.hkw-work-list li').off();
            		// hoverWork();
            	});						
            	// proPagePaper5("works",req.data.total_pages, page);				
			} else {
				// $("#mixdb").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
			}
			if (type != "important") {
				renderLoadMor1(page, req.data.total_pages); //加载更多，相当于分页功能
			} else {
				renderLoadMor0(page, req.data.total_pages);
			}
		}
	})
	.fail(function(err) {
		console.log(err);
	});		
}

/**
 * 当设计师首页的数据少于八个时,向案例展示页借几个数据展示，即获取is_home_page=0的数据筹齐八个
 * 
 * @author ZhengGuoQing
 * @param {any} number 
 * @param {any} importData 
 */
function ajaxNoHomePageWorksList (number, importData) {
	var page = 1;
	var per_page = number || 8;
	var user_id = getLocationParam("id");
	$.ajax({
		url: CONFIG.getUrl() + CONFIG.getPath() + 'get_user_works_list_ex/' + user_id + '/add_time/' + per_page + '/' + page,
		type: "POST",
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			is_home_page: 0
		}
	})
	.done(function (req) {
		if (req.success) {
			// console.log(req.data.item_list.length);
			var newData = importData.concat(req.data.item_list);
			if (newData.length > 0) {
				var viewID = "#view0Work";
				var templateID = "#template0Work";
				$(viewID).empty();
				//自定义页面锚点
				req.data.item_list[0].diyAnchorPage = "page_" + page;
				var template3 = $(templateID).html();
				$(viewID).append(doT.template(template3)(newData));
				var className = viewID + " .page_" + page + " .delay.maxImgWidth";
				$(className).load(function (event) {
					waterfall();
					$('.hkw-work-list li').off();
					// hoverWork();
				});
				// proPagePaper5("works",req.data.total_pages, page);				
			} else {
				$("#error_workslist_showout_designer").css("display", "block");
				// $("#mixdb").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
			}
			$("#workListAddMoreContent_designer0").css("display", "none");
		}
	})
	.fail(function (err) {
		console.log(err);
	});	
}
/**
 * 获取服务下单的参数
 * 
 * @author ZhengGuoQing
 */
function paramBookService(){
	var service_list = [];
	var $list = $("#tempView1 tr");
	for (var i = 0; i < $list.length; i++) {
		service_list[i] = {
			id:	$list[i].getAttribute("data-id"),
			num: $list[i].getAttribute("data-num"),
			total_price: $list[i].getAttribute("data-lineprice")
		};
	}

	return {
		user_id: getCookie("user_id"),
		service_list: service_list,
		attention: $("#pay-detailed textarea").val(),
		need_invoice: $(".tax .tax-rate.cur").attr("data-tax"),
		days: $("#cycle-in .days").attr("data-value"),
		tax: $("#taxPrice").html(),
		total_price: $("#priceTotal").html()
	}
}

/**
 * ajax发送服务下单
 * 
 * @author ZhengGuoQing
 */
function ajaxBookService(type){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'book_service',
		type: "POST",
		dataType: "JSON",
		data: paramBookService(),
		success: function (res) {
			if (res.success) {
				var paymoney = $(".ewm .RMB")[0].innerHTML;
				getErweima(res.data, paymoney, "project", type); //获取支付二维码
			} else {
				showClickPay("点击重新刷新");
			}
		}, error: function () {
			alert("数据获取异常！");
		}
	});
}

//点击遮罩层，发送服务下单的ajax
$(".ewm .ewmLeft #click-pay-id").click(function (e) { 
	e.preventDefault();
	showClickPay("正在刷新中...");
	ajaxBookService();
});
//点击遮罩层，发送服务下单的ajax,使用微信支付
$(".ewm .ewmLeft #click-pay-id2").click(function (e) {
	e.preventDefault();
	showClickPay("正在刷新中...");
	ajaxBookService("WxPay");
});
//不显示遮罩层，修改二维码url地址
function hidenClickPay(url){
	var url = url || "images/ewma1.png";
	$(".ewmLeft .click-pay").addClass("display-none");
	$(".ewmLeft .ewmimg").attr("src", url);
	$(".TzLink").removeClass("display-none");
}

//显示遮罩层，不让扫码,参数书文字，表示遮罩层上面显示的文字
function showClickPay(txt){
	var txt = txt || "点击刷新二维码";
	$(".ewmLeft .click-pay").removeClass("display-none");
	$(".ewmLeft .click-pay .click-pay-span").html(txt);
	$(".ewmLeft .ewmimg").attr("src", "images/ewma1.png"); //放假的二维码图片

	$(".TzLink").addClass("display-none");
}

$("#pay-detailed textarea").change(function (e) { 
	e.preventDefault();
	showClickPay();
});
//获取支付状态是定时器，支付宝，微信，有两个，用一个数组保存
window.PayStausTimer = [];
/**
 * 支付二维码生成，为服务订单付款
 * @param id[约见id]
 * @param paymoney
 * @param mod [支付模块meet]
 */
function getErweima(id, paymoney, mod, type) {
	var type = type || "AliPay";
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_pay_qrcode',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),     //支付用户的id
			totalAmount: paymoney,                //费用总数
			pay_type: type,                //AliPay：支付宝支付，WeiXinPay：微信支付
			pay_model: mod,                    //支付模块
			model_id: id                       //约见id
		},
		success: function (res) {
			if (res.success) {
				hidenClickPay(res.data.qr_path); //不显示遮罩层，修改二维码url地址
				changeWeb(res.data.out_trade_no); //点击跳转到网页版支付
				//定时查询支付状态
				var waitingTime = 0;
				var timer = setInterval(function () {
					waitingTime ++;
					getPayStaus(res.data.out_trade_no, timer);
					if (waitingTime > 90) {
						clearInterval(timer);
						showClickPay();
					};
				}, 3000);
				window.PayStausTimer.push(timer);

			} else {
				layer.alert(res.message);
				showClickPay("点击重新刷新");
			};
		}, error: function () {
			showClickPay("点击重新刷新");
			alert("数据获取异常！");
		}
	});
};

//点击跳转到网页版支付
function changeWeb(key) {
	$(document).on("click",".TzLink",function () {
		$.ajax({
			url: CONFIG.getUrl()+CONFIG.getPayPath()+'turn_to_pay_page/'+key,
			type:"get",
			dataType:"html",
			success:function (res) {
				$("#newWebHtml").html(res);
			},error:function () {
				alert("数据获取异常！");
			}
		});
	});
}

//获取约见的支付状态
function getPayStaus(key, timer) {
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_pay_status',
		type: "post",
		data: {
			user_id: getCookie('user_id'),
			out_trade_no: key
		},
		dataType: "json",
		success: function (res) {
			if (res.success) {
				if (res.data.trade_status == "TRADE_SUCCESS") {
					// 付款成功
					//清除定时器轮询订单状态
					window.PayStausTimer.map(function (value, index, elem) {
						clearInterval(value);
					});
					showClickPay();
					$("#mask-close").trigger("click"); //关闭弹窗
					paySuccessAlert();
				};
			} else {
				alert("支付失败！");
			};
		},
		error: function (params) {
			//清除定时器轮询订单状态
			window.PayStausTimer.map(function (value, index, elem) {
				clearInterval(value);
			});
		}
	});
};

function paySuccessAlert(){
	layer.open({
	  title: '支付成功',
	  icon: 1,
	  content: '您已成功支付服务订单',
	  btn: ["查看我的订单","关闭"],
	  yes: function(index, layero){
		var url = "Personal-2.html";
		window.open(url, "_blank");
		layer.close(index);
	  },
	  btn2: function(index, layero){
		layer.close(index);
	  }
	});      
}

//获取余额
function getYeNum() {
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_blance',
		type:"post",
		dataType:"json",
		data:{
			user_id:getCookie("user_id")
		},
		success:function (res) {
			if(res.success){
				$(".ewm .color .money").html((res.message-0).toFixed(2));
				if(res.message < $(".ewm .RMB")[0].innerHTML){
					$(".dqye2 .notMoreBalance").css("display","block");
					$(".dqye2 .qrzf").addClass("no");
				} else {
					$(".dqye2 .notMoreBalance").css("display","none");
					$(".dqye2 .qrzf").removeClass("no");
				}
			}else{
				layer.alert(res.message);
			};
		},error:function () {
			alert("余额获取失败！");
		}
	});
}

/**
 * 点击确认支付，弹出手机号验证弹窗
 */
$("body").on("click" ,".dqye2 .qrzf", function (event) {
	event.preventDefault();
	if ($(this).hasClass("no")) {
		return;
	}

	$(".smrq").removeClass("cur"); //隐藏充值弹窗

	var paymoney = $(".ewm .RMB")[0].innerHTML;
	$("#ok-change-phone").html("确认支付"+paymoney+"元");
    window.alertInputValidatePhone = layer.open({
        type: 1,
        title: "",
        area: "340px",
        content: $("#changePhonePouup")
    });
});

//点击获取短信验证码事件
$("body").on('click', '#SMS-code-txt', function(event) {
	event.preventDefault();
	var $dom = $(this);
	var phone = $("#new-phone-val").val();
	if (testPhone(phone) && $dom.html() == "获取验证码" ) {
        detailPicCheck(phone, $dom);
	}
});

function testPhone(val){
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
        layer.msg("请输入正确手机号！",{time:1000});
    	return false;        
    } else {
    	return true; 
    }
}

function testSMSCode(val){
	if (!(/^\d{4}$/.test(val))) {
        layer.msg("请输入4位数字短信验证码！",{time:1000});
		return false;
	} else {
		return true;
	}
}

/**
 * 发送获取短信验证码的请求
 * @Author   郑国庆
 * @DateTime 2017-08-28T10:00:49+0800
 * @param    {[number]} phone [手机号]
 * @param    {[jquery object]} $dom [点击元素]
 */
function ajaxGetSMSCode(phone, $dom) {
	//余额支付
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_reg_sms_code', //真实接口
        type: 'POST',
        dataType: 'JSON',
        data: {
            user_id: getCookie("user_id"),
        	type: "pay",
		    mobile: phone,
			tokeen: $("#detailedVal").val().toUpperCase()
        }
	})
	.done(function(req) {
		if (req.success) {
			SMSCountdown($dom);
		}
        layer.msg(req.message,{time:1500});
	})
	.fail(function(err) {
		console.log(err);
	});
}

function SMSCountdown($dom){
	var second = 60;
	function render(){
		var value = second + "秒后重试";
		$dom.html(value);
		second --;
		if (second == 0) {
			window.clearInterval(token);
            $dom.html("获取验证码");
		}
	}
	var token = window.setInterval(render, 1000);
}

/**
 * 获取短信验证码后向后端发送确认余额支付
 */
$("body").on("click", "#ok-change-phone", function (event) {
	event.preventDefault();
	if ($(this).hasClass("paying")) {
		return;
	}
    var phone = $("#new-phone-val").val();
	var SMSCode = $("#SMS-code-val").val();
    if (testPhone(phone) && testSMSCode(SMSCode)) {
		$("#ok-change-phone").html("确认支付中...");
		$(this).addClass("paying");
		ajaxBookService2(SMSCode);
	}
});

/**
 * ajax余额支付
 * 
 * @author ZhengGuoQing
 * @param {any} model_id 订单ID
 * @param {any} code 短信验证码
 */
function ajaxPayByBlance(model_id, code){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPayPath()+'pay_by_blance',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			pay_model: "project",
			model_id: model_id,
			code: code
		},
		success: function (res) {
			if (res.success) {
				layer.close(layer.index);
				$("#mask-close").trigger("click"); //关闭弹窗
				paySuccessAlert();
			} else {
				layer.msg(res.message,{time:2000});
			}
			$("#ok-change-phone").removeClass("paying");
			var paymoney = $(".ewm .RMB")[0].innerHTML;
			$("#ok-change-phone").html("确认支付"+paymoney+"元");
		}, 
		error: function () {
			layer.close(layer.index);
			alert("数据获取异常！");
		}
	});
}

/**
 * ajax发送服务下单
 * 
 * @author ZhengGuoQing
 * @param {any} code 短信验证码
 */
function ajaxBookService2(code){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'book_service',
		type: "POST",
		dataType: "JSON",
		data: paramBookService(),
		success: function (res) {
			if (res.success) {
				// var paymoney = $(".ewm .RMB")[0].innerHTML;
				ajaxPayByBlance(res.data, code); //获取订单ID后,ajax余额支付
			} else {
				$("#ok-change-phone").html("确认订单失败，请重试");
			}
		}, error: function () {
			alert("数据获取异常！");
		}
	});
}

/*点击显示充值方式*/
$(".ewm .dqye2 .zhcz").click(function () {
	$(".smrq").addClass("cur");
});
/**充值方式切换**/
$('div.smrq ul li').click(function() {
	$('div.smrq ul li').removeClass('cur');
	$(this).toggleClass('cur');
	$(this).parents('div.smrq').find('div.sewm').css('display', 'none');
	var liIndex = $('div.smrq ul li').index($(this));
	$('div.sewm:eq(' + liIndex + ')').css({
		'display': 'block'
	});
	window.PostStausTimer.map(function (value, index, elem) {
		clearInterval(value);
	});
});
/**充值方式切换**/
/**点击.close关闭div.smrq**/
$('div.smrq div.smrqTop span.close').click(function() {
	$(this).parents('div.smrq').removeClass('cur');
});
/**点击.close关闭div.smrq**/

//充值
$(document).on("keyup",".payCashApplys",function () {
    //中断之前的ajax请求
    if(num != 0) {
		stopAjax.abort();
		window.PostStausTimer.map(function (value, index, elem) {
			clearInterval(value);
		});
    };
    $(this).parent().find(".payZxMoney").html(($(this).val()-0).toFixed(2));
    $(this).parent().find(".payCashApplyImg").attr("src","images/zwwem.png");
    var num1 = $(this).val(),
        num2 = "",
        num3 = $(this).parent().find(".payZxMoney").html(),
        $this=$(this);
    //键盘弹起生成二维码
    if(num1 > 0) {
        if(num1.indexOf(".") != -1 && num1.split(".")[1].length > 0){
            getPostErweima(num2,num3,'other',$this);
        }else if(num1.indexOf(".") == -1){
            getPostErweima(num2,num3,'other',$this);
        };
    }else if(num1 == ""){
        $this.parent().find(".payZxMoney").html("0.00");
        $this.parent().find(".payCashApplyImg").attr("src","images/zwwem.png");
    };
});
window.PostStausTimer = [];
/**
 * 充值二维码生成
 * @param id[空]
 * @param paymoney
 * @param mod [支付模块other]
 */
var timers,num = 0;
function getPostErweima(id,paymoney,mod,el) {
	var pay_type = "AliPay";
	if (el.attr("data-type") == "WxPay") {
		pay_type = "WxPay";
	}
    console.log(paymoney);
    console.log(mod);
    console.log(id);
    num++;
    var stopAjax = $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_pay_qrcode',
        type:"post",
        data:{
            user_id:getCookie("user_id"),     //支付用户的id
            totalAmount:paymoney,         //费用总数
			pay_type: pay_type,  //AliPay：支付宝支付，WeiXinPay：微信支付
            pay_model:mod,                    //支付模块
            model_id:id                       //约见id
        },
        dataType:"json",
        success:function (res) {
            if(res.success){
                el.parent().find(".payCashApplyImg").attr("src",res.data.qr_path);
                //定时查询充值支付状态
                timers = setInterval(function () {
                    getPostStaus(res.data.out_trade_no,timers);
				},3000);
				window.PostStausTimer.push(timers);
            }else{
                alert(res.message);
            };
        }
    });
    window.stopAjax = stopAjax;
};

/**
 * 获取充值的支付状态
 * @param key
 * @param timer
 */
function getPostStaus(key,timer) {
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getPayPath()+'get_pay_status',
        type:"post",
        data:{
            user_id:getCookie('user_id'),
            out_trade_no:key
        },
        dataType:"json",
        success:function (res) {
            if(res.success) {
                if(res.data.trade_status == "TRADE_SUCCESS") {
                    // 约见费用付款成功
                    $(".smrq").css("display", "none");
                    getYeNum();
					window.PostStausTimer.map(function (value, index, elem) {
						clearInterval(value);
					});
                };
            }else{
                alert("支付失败！");
            };
		},
		error: function () {
			window.PostStausTimer.map(function (value, index, elem) {
				clearInterval(value);
			});
		}
    });
}

/*
 * 输入类型的限定
 * */
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    obj.value = obj.value.replace(/^\.*$/, '');//开头不能为"."

    if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
        obj.value = parseFloat(obj.value);
    };
};
/*图片验证码*/
var detailCodePlusNum = 10;
$(document).on("click","#detailedPicCode",function () {
    detailCodePlusNum++;
    $(this).attr('src', 'images/loading.gif');
    setTimeout(function () {
        $("#detailedPicCode").attr('src', baseLink + 'index.php/verifycode/index/' + detailCodePlusNum);
    },300);
});
//验证图形验证码
function detailPicCheck(phone,ele) {
    $.ajax({
        url: "https://www.huakewang.com/verifycode/check",
        type: "POST",
        dataType: "JSON",
        data: {
            secode: $("#detailedVal").val().toUpperCase()
        },
        success: function(res) {
            if (res.success) {
                ajaxGetSMSCode(phone, ele);
            } else {
                layer.msg("请输入正确的图形验证码！",{time:1000});
                $('#detailedPicCode').click();
            };
        }
    });
};