//全局变量,临时保存用户输入的标签
var tagsArray = [];

//全局变量,保存ajax获取的有偿服务数据
var serverCardListData = [];

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
	if (indexNum == 4) {
		ajaxUserList();
	}
	if (indexNum == 1) {
		ajaxAllWorksList("all");
	}
	if (indexNum == 0) {
		ajaxAllWorksList("important");
	}
});

// $("body").on("click", ".wrap-list .serve-card", function () {
// 	$(this).toggleClass('cur');
// 	var leng = 0;
// 	leng = $(".wrap-list .cur").length;
// 	if (leng > 0) {
// 		$(".wrap-list .buy-serve").css({
// 			"background-color": 'rgb(51, 204, 255)',
// 			"cursor": 'pointer'
// 		});
// 	}else{
// 		$(".wrap-list .buy-serve").css({
// 			"background-color": '#ccc',
// 			"cursor": 'inherit'
// 		});
// 	}
// });

/**
 * 点击有偿服务卡片
 */
$("body").on("click", ".wrap-list .serve-card", function () {
	if ( !$(this).hasClass("undercarriage")) {
		$(".wrap-list .serve-card").removeClass("cur");
		$(this).toggleClass('cur');
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
    $('.context .tab li').eq(4).click(function(){
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

	// var oBtn = document.getElementById(btn);
	// oBtn.onclick = function(){
	// 	NewLoginDOM() && openNewLogin() && shoppingCart() && cycle();
	// }
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
		// selected[i] = oneSelected;
		selected[i] = [oneSelected[0],oneSelected[1]];
		// console.log(oneSelected[0] +":"+oneSelected[1]);
		// console.log(selected.join(""));
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
		if (preTax) {   //默认计算税率
			var rate = taxPrice.getAttribute("data-taxRate"); //获取税率;
			var tax = (price*rate).toFixed(2); //税费 变量price是不计算税率的总价
			taxPrice.innerHTML = tax; //写入税费
			price += parseFloat(tax); //总价添加税率
			var totalPrice = price.toFixed(2); //总价
			priceTotal.innerHTML = totalPrice; //更新总价
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
		var taxRate = [0,0.03,0.06];
		var tax = (preTax*taxRate[indexNum]).toFixed(2); //税费
		taxPrice.setAttribute("data-taxRate",taxRate[indexNum]);
		taxPrice.innerHTML = tax;
		var endPrice = (parseFloat(preTax)  + parseFloat(tax)).toFixed(2);
		priceTotal.innerHTML = endPrice; //更新总价
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
  * ajax获取设计师主页的有偿服务列表,获取自己的服务报价列表，设计师编辑报价列表有用
  * 
  * @author ZhengGuoQing
  * @param {Number} per_page 每页数量
  * @param {Number} page 第几页
  */
function ajaxGetServerCard(page, per_page){
    var page = page || 1;
	var per_page = per_page || 10;
	var offset = (page - 1)*per_page;
	
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getQuotePath()+'get_self_service_template_list',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			limit: per_page,
			offset: offset
		},
		success: function (res) {
			if (res.success) {
				if (res.data.item_list.length > 0) {
					serverCardListData = res.data.item_list;
					renderServerCard(res.data.item_list);
					if (res.data.total_pages == 1) {
						$("#kkpager").css("display","none");
					} else {
						$("#kkpager").css("display","block");
					}
					proPagePaperDetailed(res.data.total_pages, page); //分页
				} else {
					$("#viewServreCard").empty().html('<img src="image/tempNull2.png" alt="无数据" class="tempNullPng">');
				}
			}
		}
	});
}

function proPagePaperDetailed(totalPage, pageNo) {
	var pageNo = pageNo || 1;
    //生成分页
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        mode: 'click', //默认值是link，可选link或者click
        click: function(n) {
        	// console.log(n);
            //手动选中按钮
            this.selectPage(n);
            ajaxGetServerCard(n);
            return false;
        }
    },true);
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
 * ajax发送请求，删除（下架）服务
 * 
 * @author ZhengGuoQing
 * @param {any} id 
 * @param {any} $dom 
 */
function ajaxDeleteServreCard(id, $dom){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+'ban_service_template',
        type: "POST",
        dataType: "JSON",
        data: {
			user_id: getCookie("user_id"),
			service_template_id: id
        },
        success: function (res) {
            if (res.success) {
                layer.msg(res.message,{time:1000},function(){
					$dom.parent().parent().parent().remove(); //删除DOM
				});
            } else {
				layer.msg(res.message,{time:1000});
			}
        }
    }); 
}

$("body").on("click", "#viewServreCard .setting-right .delete", function () {
	var id = $(this).attr("data-id");
	var $dom = $(this);
	layer.alert("是否删除该有偿服务？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		ajaxDeleteServreCard(id, $dom); // ajax发送请求，删除（下架）服务
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

/**
 * 标签输入框回车视图层添加标签
 * @Author   郑国庆
 * @DateTime 2017-06-15T16:38:44+0800
 */
$("#addPaidServices .addTage").click(function(event) {
	var input = $("#addPaidServices .add-course-custom-price3 .add-course-input");
    var val = input.val();
	val = val.trim(); //去除空格
	val = html_encode(val); //防止XSS，进行html转义
	var isLeng = false;
	val.length > 0 ? isLeng = true : isLeng = false;
	var ismore = false;
	SimpoValidate.isMyBlur(".out-validate") ? ismore = true : ismore = false;
	var isArray = false;
	if (tagsArray.length < 5) {
		isArray = true;
	} else {
		isArray = false;
		errorStyle(input, "最多输入5个标签！");
	}
	if (isLeng && ismore && isArray) {
		var unIndex = tagsArray.length + 1;
		var appendDOM = "<span class='tag-span' data-unIndex='" + unIndex + "'>" + val + "<i class='fork'>X</i></span>";
		$("#addPaidServices .tag-p").prepend(appendDOM);
		tagsArray.unshift(val);
	}
	input.val("");
});

/**
 * 点击个人标签，删除该标签
 * @Author   郑国庆
 * @DateTime 2017-06-15T16:37:48+0800
 */
$("#addPaidServices .tag-p").on('click', '.tag-span', function(event) {
    event.preventDefault();
    $(this).remove();
    var unIndex = $(this).attr('data-unIndex');
    tagsArray.splice(tagsArray.length - unIndex, 1);
});

/**
 * 输入框显示错误样式
 * @Author   郑国庆
 * @DateTime 2017-06-07T20:11:28+0800
 * @param    {object}  target 该input的jquery对象
 * @param    {string}  msg    中文错误提示
 */
function errorStyle(target, msg) {
    target.parent('.validate').addClass('error');
    var validate = target.parent('div.validate').next().find('div.input_valid');
    validate.html('<span class="errorInput">' + msg + '</span>');
}

/**
 * 点击添加有偿服务按钮的弹出框
 * 
 */
function alertAddPaidServices(){
    window.alertAddPaidServicesIndex = layer.open({
        type: 1,
        title: "",
        area: ['630px', '620px'],
        content: $("#addPaidServices")
    });
}
/**
 * 点击添加有偿服务
 */
$("#add-serve").click(function (e) { 
	e.preventDefault();
	emptyInput(); //清空添加有偿服务的输入框
	alertAddPaidServices(); //点击添加有偿服务按钮的弹出框
});

/**
 * 清空添加有偿服务的输入框
 */
function emptyInput(){
	$("#addPaidServices input").val("");
	tagsArray = []; //清空数组
	$("#addPaidServices .tag-p").empty();
	$(".validate.error").removeClass("error");
	$(".errorMsg .input_valid").empty();

	//渲染默认的城市限制
	$(".isSameArea").attr("data-isSameArea","1");
	$(".isSameArea span").removeClass("cur");
	$(".isSameArea span").eq(0).addClass("cur");

	//清空保存按钮上的服务ID
	$(".box1 .save").attr("data-id", "");
}

/**
 * 点击取消，清空输入框，关闭弹出
 */
$(".box1 .cancel").click(function (e) { 
	e.preventDefault();
	emptyInput(); //清空添加有偿服务的输入框
	layer.close(window.alertAddPaidServicesIndex);
});

/**
 * 获取input输入框的值
 * 
 */
function paramAddPaidServices(){
	var inputs = $("#addPaidServices input");
	var id = $(".box1 .save").attr("data-id");
	var is_same_area = $(".isSameArea").attr("data-isSameArea");
	return {
		user_id: getCookie("user_id"),
		service_template_id: id ? id : "",
		Name: inputs.eq(0).val(),
		Description: inputs.eq(1).val(),
		type: inputs.eq(2).val(),
		unit_price: inputs.eq(3).val(),
		unit: "元/" + inputs.eq(4).val(),
		tags: tagsArray,
		is_same_area: is_same_area || "1",
	}
}

/**
 * ajax增加或修改服务模板
 * 
 * @param {any} param 
 */
function ajaxAddService(param){
    $.ajax({
        url: CONFIG.getUrl()+CONFIG.getQuotePath()+'add_service_template',
        type: "POST",
        dataType: "JSON",
        data: param,
        success: function (res) {
            if (res.success) {
                layer.msg(res.message,{time:1000},function(){
					ajaxGetServerCard(); //ajax获取设计师主页的有偿服务列表
					emptyInput(); //清空添加有偿服务的输入框
					layer.close(window.alertAddPaidServicesIndex);
				});
            } else {
				layer.msg(res.message,{time:1000});
			}
        }
    }); 
}
/**
 * 点击保存
 */
$(".box1 .save").click(function (e) { 
	e.preventDefault();
	ajaxAddService(paramAddPaidServices());
	
});

/**
 * 点击修改按钮
 */
$("body").on("click", ".setting-right .mondify", function () {
	var eq = $(this).attr("data-eq");
	var id = $(this).attr("data-id");
	setInputDefaultValue(serverCardListData[eq]); //设置有偿服务弹窗的input默认值
	alertAddPaidServices(); //点击添加有偿服务按钮的弹出框
	//将有偿服务id绑定到保存按钮上
	$(".box1 .save").attr("data-id",id);
});

/**
 * 设置有偿服务弹窗的input默认值，用于在修改有偿服务时使用
 * 
 * @author ZhengGuoQing
 * @param {any} data 
 */
function setInputDefaultValue(data){
	var inputs = $("#addPaidServices input");
	inputs.eq(0).val(data.Name);
	inputs.eq(1).val(data.Description);
	inputs.eq(2).val(data.type);
	inputs.eq(3).val(data.unit_price);
	inputs.eq(4).val(data.unit.substr(2));
	inputs.eq(5).val(data.Name);

	tagsArray = data.tags;
	renderTags($("#addPaidServices .tag-p"), tagsArray); //渲染标签

	//渲染城市限制
	$(".isSameArea").attr("data-isSameArea",data.is_same_area);
	$(".isSameArea span").removeClass("cur");
	var index = data.is_same_area == "1" ? 0 : 1;
	$(".isSameArea span").eq(index).addClass("cur");

}

/**
 * 根据tagsArray渲染标签
 * 
 * @author ZhengGuoQing
 * @param {any} element jquery对象
 * @param {any} tagsArray 标签数组
 */
function renderTags(element, tagsArray){
	element.empty();
	for (var i = 0; i < tagsArray.length; i++) {
		var val = tagsArray[i];
		var appendDOM = "<span class='tag-span' data-unIndex='" + (tagsArray.length - i) + "'>" + val + "<i class='fork'>X</i></span>";
		element.append(appendDOM);
	}
}

/**
 * 切换是否限制为同城
 */
$(".isSameArea .span").click(function (e) { 
	e.preventDefault();
	$(".isSameArea span").removeClass("cur");
	$(this).toggleClass("cur");
	var index = $(this).index();
	index = index == 0 ? "1" : "0";
	$(".isSameArea").attr("data-isSameArea",index);
});

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
	var user_id = getCookie("id");
	var is_home_page = "";
	if (type == "important") {
		is_home_page = 1;
	}
	$.ajax({
        url: CONFIG.getUrl()+CONFIG.getPath()+'get_works_list_by_self/'+user_id+'/'+per_page+'/'+page, 
        type: "POST",
        dataType: 'JSON',
        data: {
        	is_home_page: is_home_page
        }
	})
	.done(function(req) {
        console.log(req);
        if (req.success) {
			// console.log(req.data.item_list.length);
			if (req.data.item_list.length > 0) {
				var viewID = "#view0Work";
				var templateID = "#template0Work";
				if (type != "important") {
					viewID = "#view1Work";
					templateID = "#template1Work";
				}
				//自定义页面锚点
                req.data.item_list[0].diyAnchorPage = "page_"+ page;
				page == 1 ? $(viewID).empty() : "";
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
 * [修改作品信息，比如隐藏，取消首页展示，删除.]
 * @Author   郑国庆
 * @DateTime 2017-09-08T20:42:32+0800
 * @param    {[String]} type [修改类型]
 * @param    {[String]} value [修改类型的值，为1 和0.]
 * @param    {[Number]} id   [关注的id]
 * @param    {[Object]} $dom   [删除按钮]
 */
function changeWorkInfo(type, value, id, $dom){
	var is_show_out = ""; //是否隐藏，0为隐藏，1为不隐藏（原意为是否显示，默认1显示，0不显示）
	var is_home_page = ""; //是否在首页展示，1为是，0位否
	var delete_work_info = ""; //是否删除，1为删除
	switch (type) {
		case "hide":
			is_show_out = value;
			break;
		case "important":
			is_home_page = value;
			break;
	}
	if (window.ajaxChangeWorkInfo != null) {
		window.ajaxChangeWorkInfo.abort();
	}
	window.ajaxChangeWorkInfo = $.ajax({
		url: CONFIG.getUrl()+CONFIG.getPath()+'change_work_info',
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			work_id: id,
			is_home_page: is_home_page,
			is_show_out:is_show_out,
			delete_work_info:delete_work_info
		}
	})
	.done(function(req) {
		// layer.msg(req.message,{time:1000});
		// if (req.message.type == "delete") {
		// 	$dom.html("收藏");
		// 	layer.msg("删除成功",{time:1000});		
		// }
		// if (req.message.type == "add") {
		// 	$dom.html("已收藏");
		// 	layer.msg("收藏成功",{time:1000});		
		// }	
		if (req.success) {
			$dom.attr("data-value", value); //设置新的value
			switch (type) {
				case "hide":
					if (value == "0") {
						$dom.html("已隐藏");
						$dom.addClass("yes");
						$dom.removeClass("no");
					} else {
						$dom.html("隐藏");
						$dom.addClass("no");
						$dom.removeClass("yes");
					}
				break;
				case "important":
					if (value == "0") {
						$dom.html("主页展示");
						$dom.addClass("no");
						$dom.removeClass("yes");
					} else {
						$dom.html("取消主页展示");
						$dom.addClass("yes");
						$dom.removeClass("no");
					}
				break;
			}
		}
	})
	.fail(function(err) {
		console.log(err);
	});
	
}


//点击隐私设置按钮
$("body").on('click', '.privacy .sc', function(event) {
	// event.preventDefault();
	var $dom = $(this);
	var type = $dom.attr("data-type");
	var id = $dom.attr('data-id');
	var value = $dom.attr("data-value");
	//翻转value
	value == "1" ? value = "0" : value = "1";
	if (type != "delete") {
		changeWorkInfo(type, value, id, $dom);
	}
});

//点击删除某个作品
$("body").on("click", ".privacy .sc.delete", function () {
	var $dom = $(this);
	var id = $dom.attr('data-id');

	layer.alert("是否删除该作品？",{
		btn: ['确定', '取消']
	}, function(index, layero){
		deleteWorkInfo(id, $dom); //ajax删除作品
		layer.close(index);
	}, function(index, layero){
		layer.close(index);
	});
});

/**
 * ajax删除某个作品
 * 
 * @author ZhengGuoQing
 * @param {any} id 
 * @param {any} $dom 
 */
function deleteWorkInfo(id, $dom){
	$.ajax({
		url: CONFIG.getUrl()+CONFIG.getPath()+'delete_work_info',
		type: "POST",
		dataType: "JSON",
		data: {
			user_id: getCookie("user_id"),
			work_id: id
		},
		success: function (res) {
			if (res.success) {
                layer.msg(res.message,{time:1000},function(){
					$dom.parent().parent().parent().remove(); //删除DOM
					waterfall();
            		$('.hkw-work-list li').off();
				});
            } else {
				layer.msg(res.message,{time:1000});
			}
		}
	});
}