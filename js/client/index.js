var cur_status = "less"; //文本收起展开效果
$.extend({
	show_more_init: function() {
		var c = false;
		$('span.zhankai').click(function() {
			if (c = !c) {
				$('div.intro-details').fadeIn();
				$('span.zhankai').html('合起');
			} else {
				$('div.intro-details').fadeOut();
				$('span.zhankai').html('展开');
			}
		});
		$('div.p-img>.img_1').mouseenter(function() {
			$('div.intro-details').fadeIn();
		});
		$('div.intro-details').mouseleave(function() {
			$('div.intro-details').fadeOut();
		})

		//选择是否喜欢
		$('.click-like').click(function() {
			if (c = !c) {
				$('div.click-like').css({
					'background': '#1ebaef'
				});
				$('div.click-like>span').css({
					'color': '#fff'
				})
			} else {
				$('div.click-like').css({
					'background': '#eee'
				});
				$('div.click-like>span').css({
					'color': '#949494'
				})
			}
		})
	}
});
//************瀑布流开始************//
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
	$('ul.pblUl').css({
		'width': LiW * 4
	});
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
//************瀑布流开始************//
$(function() {
	$('.hkw-work-list li').hover(function() { //热爱设计到狂热边框显示
		//	$(this).children('.iInspir-block').finish().fadeIn(100).animate({'opacity':'1'},500);
		$(this).find('div.caption').finish().slideDown(100);
		$(this).children('.iInspir-block').css({
			'border': '1px solid #03a5ee'
		});
	}, function() {
		//	$(this).children('.iInspir-block').finish().fadeOut(100).animate({'opacity':'0'});
		$(this).find('div.caption').finish().slideUp(100);
		$(this).children('.iInspir-block').css({
			'border': '1px solid transparent'
		});
	});
	/**轮播开始**/
	var isRun = true;
	var liImgLength = $('#flexslider ul.slides li').length;
	var num = '<ul id="num">';
	for (var i = 1; i <= liImgLength; i++) {
		num += '<li>' + i + '</li>';
	}
	num += '</ul>';
	$('#flexslider ul.slides').after(num);
	showSlide(0);

	function showSlide(n) {
		if (n == $('#num li').index($('#num li.current'))) {
			return null;
		}
		$('#flexslider ul.slides li')
			.finish()
			.fadeOut(500)
			.filter(':visible')
			.css({
				'display': 'none'
			})
			.end()
			.eq(n)
			.fadeIn(500)
			.css({
				'display': 'block'
			});
		$('#num li')
			.filter('.current')
			.removeClass('current')
			.end()
			.eq(n)
			.addClass('current');
	}
	$('#num li').on('mouseenter.trigger', function() {
		showSlide($('#num li').index(this));
	});
	$('#flexslider span.flexslider-right').on('click', function() {
		if ($('#num li.current').next().length == 0) {
			$('#num li').eq(0).triggerHandler('mouseenter.trigger');
		} else {
			$('#num li.current').next().triggerHandler('mouseenter.trigger');
		}
	});
	$('#flexslider span.flexslider-left').on('click', function() {
		if ($('#num li.current').prev().length == 0) {
			$('#num li').eq($('#num li').index($('#num li').length)).triggerHandler('mouseenter.trigger');
		} else {
			$('#num li.current').prev().triggerHandler('mouseenter.trigger');
		}
	});
	$('span.flexslider-left,span.flexslider-right,#flexslider ul.slides,#num li').hover(function() {
		isRun = false;
	}, function() {
		isRun = true;
	});
	setInterval(function() {
		if (isRun) {
			if ($('#num li.current').next().length == 0) {
				$('#num li').eq(0).triggerHandler('mouseenter.trigger');
			} else {
				$('#num li.current').next().triggerHandler('mouseenter.trigger');
			}
		}
	}, 5000);
	/**轮播结束**/
	/**切换城市**/
	$('.change-city').click(function() {
		$('ul.drop-select-options').removeClass('cur');
		$(this).parent().children('ul.drop-select-options').toggleClass('cur');
		return false;
	});
	$('.drop-select .drop-select-options.huoqv li').click(function() {
		var cityText = $(this).children('a').text();
		$(this).parents('.city-bar').find('.city-show').text(cityText);
		$(this).parents('ul.drop-select-options').toggleClass('cur');
	});
	$('div.cityInput input').focus(function() {
		$(this).parent().find('ul.drop-select-options').addClass('cur');
		$('ul.drop-select-options:eq(0)').removeClass('cur');
	});
	$('div.cityInput input').blur(function() {
		$(this).parent().find('ul.drop-select-options').removeClass('cur');
	});
	$('div.cityInput input').keyup(function() {
		$(this).parent().find('ul.drop-select-options').removeClass('cur');
	});
	/**切换城市结束**/
	/**切换最近距离开始**/
	$('.change-select').click(function() {
		$('ul.drop-select-options').removeClass('cur');
		$(this).parent().children('ul.drop-select-options').toggleClass('cur');
		return false;
	});
	$('.zjjl-select .drop-select-options.huoqv li').click(function() {
		var _this = $(this);
		var cityText = $(this).children('a').text();
		$(this).parents('.city-bar').find('.zjjl-show').text(cityText);
		$(this).parents('ul.drop-select-options').toggleClass('cur');
	});

	/*****获取input地址栏显示*****/
	$('div.cityWrap ul.cityWrapUl li input').focus(function() {
		$(this).parent().siblings('div.tuosen').addClass('cur');;
	});
	/*****失去焦点input地址栏显示*****/



	var caseB = $('ul.drop-select-options.fn-hide.dz.payment');
	var caseIp = $('#sousuo');
	var caseLis = caseB.children('li');
	caseLis.on('click', function() {
		var val1 = $(this).children('p').text();
		caseIp.val(val1);
		caseB.removeClass('cur');
		return false;
	});


	$('div.paymentMainDiv div.sjsxx input.sousuo ').click(function() {
		$(this).parent().children('ul.drop-select-options.fn-hide.dz.payment').addClass('cur');
		return false;
	});
	$('div.paymentMainDiv div.xl ').click(function() {
		$(this).parent().children('ul.drop-select-options.fn-hide.dz.payment').toggleClass('cur');
		return false;
	});
	$('div.paymentMainDiv div.sjsxx input.sousuo ').keyup(function() {
		$(this).parent().children('ul.drop-select-options.fn-hide.dz.payment').removeClass('cur');
	});
	$('div.cityInput input').keyup(function() {
		$(this).parent().find('ul.drop-select-options').removeClass('cur');
	});
	var btnJL = $('.zjjl-select .drop-select-options.huoqv');
	var btnCT = $('.city-barWrap .drop-select-options.huoqv');
	$(document).click(function() {
		caseB.removeClass('cur');
		btnJL.removeClass('cur');
		btnCT.removeClass('cur');
	});

	/**切换最近距离结束**/
	/**设计师轮播开始**/
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
	var itemLength = $('.ca-item').css("width");
	var item = parseInt(itemLength);
	var itemLength = $('#ca-container div.ca-item').length;
	$('#ca-item-wrap').css({
		'width': (itemLength * item) + 'px',
		'height': '100%',
		'position': 'relative',
		'left': '0px'
	});
	for (var i = 0; i < itemLength; i++) {
		$('#ca-container div.ca-item:eq(' + i + ')').css({
			'left': (i * item) + 'px'
		});
	}
	$('#ca-container .ca-nav span.ca-nav-next').on('click', function() { //点击next触发					
		var leftNum = $('#ca-item-wrap').finish().css('left').substring();
		var numLeft = parseInt(leftNum);
		if (numLeft > -(itemLength - 3) * item) { //判断当前ul.slide ‘margin-left’的宽度是否小于（ul.slide li的个数-4）*250																										
			$('#ca-item-wrap').finish().animate({
				'left': (numLeft - item) + 'px'
			});
		} else {
			$('#ca-item-wrap').finish().animate({
				'left': '0px'
			});
			return false;
		}
	});
	$('#ca-container .ca-nav span.ca-nav-prev').on('click', function() { //点击next触发					
		var leftNum = $('#ca-item-wrap').finish().css('left').substring();
		var numLeft = parseInt(leftNum);
		if (numLeft < 0) { //判断当前ul.slide ‘margin-left’的宽度是否小于（ul.slide li的个数-4）*250																										
			$('#ca-item-wrap').finish().animate({
				'left': (numLeft + item) + 'px'
			});
		} else {
			$('#ca-item-wrap').finish().animate({
				'left': -(itemLength - 3) * item + 'px'
			});
			return false;
		}
	});
	/**设计师轮播结束**/
	/**项目轮播开始**/
	var proLength = $('.ca-item').css("width");
	var item = parseInt(proLength);
	var proLength = $('#project-ca-wrapper div.ca-item').length;
	$('#project-ca-wrapper').css({
		'width': (proLength * item) + 'px',
		'height': '100%',
		'position': 'relative',
		'left': '0px'
	});
	for (var i = 0; i < proLength; i++) {
		$('#ba-container div.ca-item:eq(' + i + ')').css({
			'left': (i * item) + 'px'
		});
	}
	$('#proMaxBox .ca-nav span.ca-nav-next').on('click', function() { //点击next触发	
		var leftNuma = $('#project-ca-wrapper').finish().css('left').substring();
		var numLefta = parseInt(leftNuma);
		if (numLefta > -(proLength - 3) * item) { //判断当前ul.slide ‘margin-left’的宽度是否小于（ul.slide li的个数-4）*250																										
			$('#project-ca-wrapper').finish().animate({
				'left': (numLefta - item) + 'px'
			});
		} else {
			$('#project-ca-wrapper').finish().animate({
				'left': '0px'
			});
			return false;
		}
	});
	$('#proMaxBox .ca-nav span.ca-nav-prev').on('click', function() { //点击next触发					
		var leftNuma = $('#project-ca-wrapper').finish().css('left').substring();
		var numLefta = parseInt(leftNuma);
		if (numLefta < 0) { //判断当前ul.slide ‘margin-left’的宽度是否小于（ul.slide li的个数-4）*250																										
			$('#project-ca-wrapper').finish().animate({
				'left': (numLefta + item) + 'px'
			});
		} else {
			$('#project-ca-wrapper').finish().animate({
				'left': -(proLength - 3) * item + 'px'
			});
			return false;
		}
	});
	/**项目轮播结束**/
	$('#main-body.personal div.right div.neirong div.neirong-top div.wddt span').click(function() {
		$('#main-body.personal div.right div.neirong div.neirong-top div.xttz span').css({
			'border-bottom': 'none'
		});
		$('.Wrap:eq(0)').css({
			'display': 'block'
		});
		$('.Wrap:eq(1)').css({
			'display': 'none'
		});
		$(this).css({
			'border-bottom': '2px solid #0b83d8'
		});
	});
	$('#main-body.personal div.right div.neirong div.neirong-top div.xttz span ').click(function() {
		$('#main-body.personal div.right div.neirong div.neirong-top div.wddt span').css({
			'border-bottom': 'none'
		});
		$('.Wrap:eq(0)').css({
			'display': 'none'
		});
		$('.Wrap:eq(1)').css({
			'display': 'block'
		});
		$(this).css({
			'border-bottom': '2px solid #0b83d8'
		});
	});
	$('body .fn-hide div.designer-zx div.designer-zx-left span.zxImg').click(function() { //收藏切换
		$(this).toggleClass('cur');
		$(this).parents('.ca-item-main').find('.shoucang').toggleClass('cur');
	});
	$('.shoucang').click(function() { //收藏切换
		$(this).toggleClass('cur');
	});
	/**弹出评论框开始**/
	$('.Tbodymodules .textWrap .divText .inputWrap .input_2').on('click', function() {
		$(this).parents('.divText').find('div.huifu').css({
			'display': 'block'
		});
	});
	$(' div.div-right img.img2').on('click', function() {
		$(this).parents(' div.right').find('div.huifu').css({
			'display': 'block'
		});
	});
	$('div.huifu div.fabiao').on('click', function() {
		$(this).parents(' div.right').find('div.huifu').css({
			'display': 'none'
		});
	});
	$('div.huifu div.fabiao').on('click', function() {
		$(this).parents('div.huifu ').css({
			'display': 'none'
		});
	});
	$('div.huifu div.fabiao').on('click', function() {
		$(this).parents(' div.wenzhang').find('div.huifu').css({
			'display': 'none'
		});
	});
	/****/
	$('#social-main-body-left div.yh-modules div.right div.div-bottom .div-bottom-right .div-bottom-right-div1 .div-img-a .img2').on('click', function() {
		$(this).parents('.div-bottom-right').find('div.hd').css({
			'display': 'block'
		});
	});
	$('#social-main-body-left div.yh-modules div.right div.div-bottom .div-bottom-right div.hd .tijiao').on('click', function() {
		$(this).parents('.div-bottom-right').find('div.hd').css({
			'display': 'none'
		});
	});
	/****/
	/**弹出评论框结束**/

	/**点赞效果**/
	$('.Tbodymodules .textWrap .divText .inputWrap .input_1').click(function() {
		$(this).toggleClass('cur');
	});
	/**点赞效果**/
	/**点击button触发input.file**/
	$('input.button').click(function() {
		$('input.file').click();
	});
	/**点击button触发input.file**/
	/**hover添加crud图标**/
	$('ul.xhnr.yinying').hover(function() {
		$(this).toggleClass('cur');
		$(this).append('<div class="cruds"><span class="crud c"></span><span class="crud r"></span><span class="crud u"></span><span class="crud d"></span></div>');
	}, function() {
		$(this).toggleClass('cur');
	});
	/**hover添加crud图标**/
	/** 点击div.ditu加载map**/
	$('div.ditu').click(function() {
		$('div.superbox').load('map.html');
		$('div.superbox').finish().css({
			'display': 'block'
		});
	});
	/** 点击div.ditu加载map**/
	/**case.html页面切换**/
	$('div.paymentMain div.fsyj ul li').click(function() {
		$('div.paymentMain div.fsyj ul li').removeClass('cur');
		$(this).toggleClass('cur');
		if ($('div.paymentMain div.fsyj ul li').index($(this)) == 0) {
			$('div.hzyx').css({
				'display': 'block'
			});
			$('div.zjxd').css({
				'display': 'none'
			});
		} else {
			$('div.hzyx').css({
				'display': 'none'
			});
			$('div.zjxd').css({
				'display': 'block'
			});
		}
	});
	/**case.html页面切换**/
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
	/**点击账户充值显示div.smrq**/
	$('span.zhcz').click(function() {
		$('div.smrq').addClass('cur');
	});
	/**点击账户充值显示div.smrq**/
	/**充值方式切换**/
	$('div.smrq ul li').click(function() {
		$('div.smrq ul li').removeClass('cur');
		$(this).toggleClass('cur');
		$(this).parents('div.smrq').find('div.sewm').css('display', 'none');
		var liIndex = $('div.smrq ul li').index($(this));
		$('div.sewm:eq(' + liIndex + ')').css({
			'display': 'block'
		});
	});
	/**充值方式切换**/
	/**点击.close关闭div.smrq**/
	$('div.smrq div.smrqTop span.close').click(function() {
		$(this).parents('div.smrq').removeClass('cur');
	});
	/**点击.close关闭div.smrq**/

	/**点击div.sjsinput显示下拉框**/
	$('div.sjsinput').on('click', function() {
		$(this).children('ul.xlUl').toggleClass('cur');
		$('#rzform div.rows div.sjsinput span.spbk .remove').click(function() {
			var spbk = $(this).parent().text();
			$(this).parents('div.sjsinput').children('ul.xlUl').append('<li class="append">' + spbk + '</li>');
			$(this).parent().remove();
		});
	});
	/**点击div.sjsinput显示下拉框**/
	/**点击div.sjsinput 下的li,添加职业**/
	$('#rzform div.rows div.inputWrapper ul.xlUl li').on('click', function() {
		if ($(this).parents('div.sjsinput').find(' div.sjsinput-left span').text() == '请选择') {
			$(this).parents('div.sjsinput').find(' div.sjsinput-left span').remove();
		}
		var thisText = $(this).text();
		$("#rzform div.rows div.sjsinput").children('div.sjsinput-left').append('<span class="spbk">' + thisText + '<i class="remove"></i></span>');
		$(this).remove();
	});
	/**点击div.sjsinput 下的li,添加职业**/
	/**project.html热门城市点击字体变红**/
	$('ul.designer-select-navUl li span.text a').click(function() {
		$(this).parents('ul.designer-select-navUl').find('li span.text a').not('.more').css({
			'color': '#676767'
		});
		$(this).not('.more').css({
			'color': 'red'
		});
	});
	/**project.html热门城市点击字体变红**/
	/**social.html最近、与我有关切换**/
	$('#social-main-body-left div.div-control span.div-control-sp1').on('click', function() {
		$('div.zuijin').css({
			'display': 'block'
		});
		$('div.yuwoxiangguan').css({
			'display': 'none'
		});
		$(this).css({
			'border-bottom': '2px solid #ff9023',
			'height': '41px'
		});
		$('#social-main-body-left div.div-control span.div-control-sp2').css({
			'border-bottom': 'none',
			'height': '42px'
		});
	});
	$('#social-main-body-left div.div-control span.div-control-sp2 ').on('click', function() {
		$('div.yuwoxiangguan').css({
			'display': 'block'
		});
		$('div.zuijin').css({
			'display': 'none'
		});
		$(this).css({
			'border-bottom': '2px solid #ff9023',
			'height': '41px'
		});
		$('#social-main-body-left div.div-control span.div-control-sp1').css({
			'border-bottom': 'none',
			'height': '42px'
		});
	});
	/**social.html最近、与我有关切换**/
	/**social.html点赞切换页面开始**/
	$('#social-main-body-left div.yh-modules div.right div.div_hf div.div-right span.dianzan').click(function() {
		$(this).toggleClass('cur');
	});
	$('#social-main-body-left div.yh-modules div.right div.div-bottom .div-bottom-right .div-bottom-right-div1 .div-img-a span.dianzan').click(function() {
		$(this).toggleClass('cur');
	});
	/**social.html点赞切换页面结束**/
	/**news-more.html点赞切换**/
	$('#main-body div.dianzanImg').on('click', function() {
		$(this).toggleClass('cur');
	});
	/**news-more.html点赞切换**/
	/**弹出更多**/
	$('#towheaderWrap div.divWrap ul li.li_7 ').on('click', function() {
		$('#towheaderWrap ul.gengduode').toggle();
	});
	/**弹出更多**/
	/**ProjectDetails.html图片放大显示**/
	$('#main-body.ProjectDetails div.divImgList ul.ulImgList li').on('click', function() {
		var liSrc = $(this).find('img').attr('src');
		$('#main-body.ProjectDetails div.imgWraptp').css({
			'display': 'block'
		});
		$('#main-body.ProjectDetails div.imgWraptp img').attr('src', liSrc);
	});
	$('#main-body.ProjectDetails div.imgWraptp img').on('click', function() {
		$(this).parent().css({
			'display': 'none'
		});
	});
	/**ProjectDetails.html图片放大显示**/
	/*************瀑布流开始************/

	$('.maxImgWidth').width(260);
	$(window).on('load', function() {
		delay();
		waterfall('pblUl', 'li');
	});
	$(window).on('scroll resize', delay);
	/*************瀑布流截图************/
	/*************projectExtend.html二级页面导航切换************/
	$('div.ExtendNav ul.ExtendNavLeft li').click(function() {
		$('div.ExtendNav ul.ExtendNavLeft li').removeClass('cur');
		$(this).toggleClass('cur');
		var liIndex = $('div.ExtendNav ul.ExtendNavLeft li').index($(this));
		$('div.ExtendMain').css({
			'display': 'none'
		});
		$('div.ExtendMain:eq(' + liIndex + ')').css({
			'display': 'block'
		});
	});
	/*************projectExtend.html二级页面导航切换************/
	/**projectExtend.html图片放大显示**/
	$('div.imagesWrap img ').click(function() {
		$(this).parent().css({
			'display': 'none'
		});
	});
	$('div.textWrapChildernR img ').click(function() {
		var thisSrc = $(this).attr('src');
		$(this).parent().siblings('div.imagesWrap').css({
			'display': 'block'
		});
		$(this).parent().siblings('div.imagesWrap').children('img').attr({
			'src': thisSrc
		});
	});
	/**projectExtend.html图片放大显示**/
	/**ul.切换cur**/
	$('ul.bjfkw li').click(function() {
		$(this).parent().children('ul.bjfkw li').removeClass('cur');
		$(this).addClass('cur');
	});
	/**ul.切换cur**/
	$('span.zhaikaixl').click(function() {
		$(this).parents('div.kfkbMainDiv').children('div.ExtendMainBodyWrap').slideToggle(100);

		if ($(this).children('b').text() == '展开') {
			$(this).children('b').text('收起');
		} else {
			$(this).children('b').text('展开');
		}
	});
	$('ul.syg li').click(function() {
		$('ul.syg li').removeClass('cur');
		$(this).addClass('cur');
		$('div.kfkbMain').css({
			'display': 'none'
		});
		var index = $('ul.syg li').index($(this));
		$('div.kfkbMain').eq(index).css({
			'display': 'block'
		});
	});

	/*活动详情 头像图片的移动 开始*/
	(function($) {
		//参数，格式设置
		var picNumbers = $("#activityDetail_nav_springContainer").children().size();
		var picShowNumber = 8; //要显示图片的个数
		var picWrapWidth = $("#activityDetail_nav_springContainer").css('width');
		var picWidth = $(".activityDetail_nav_spring").css("width");
		var picMargin = $('.activityDetail_nav_spring').css('margin-right'); //获取右边距，图片宽
		var $boxs = $(".activityDetail_nav_spring");
		var $picWrap = $("#activityDetail_nav_springContainer");
		var $container = $('#activityDeatil_nav_springWrap');
		var picoffsetWidth = parseFloat(30);
		var picMarginInt = parseFloat(picMargin);
		var picMoveWidth = picoffsetWidth + picMarginInt;
		var picMovedLeft = 0;
		var number = 0;
		$boxs.css({
			float: 'left',
			'position': 'relative'
		});
		$boxs.css({
			'margin-right': picMargin
		});
		$picWrap.css({
			width: picMoveWidth * picNumbers + 100
		})
		$container
			.css('width', picMoveWidth * picShowNumber);
		//动画
		function move(direction) {
			if (picNumbers < picShowNumber) return false;
			number = direction ? number + 1 : number - 1;
			var picShouldLeft = -(picNumbers - picShowNumber);
			$("#activityDetail_nav_springContainer").animate({
				'left': number * picMoveWidth
			}, 0);
			if (number > picShouldLeft && number < 0) {
				$('#activityDetail_navSpring_btn1').css('visibility', 'visible');
				$('#activityDetail_navSpring_btn2').css('visibility', 'visible');
			} else if (number < picShouldLeft + 1) {
				$('#activityDetail_navSpring_btn1').css('visibility', 'hidden');
				$('#activityDetail_navSpring_btn2').css('visibility', 'visible');
				return;
			} else if (number > 0) {
				$('#activityDetail_navSpring_btn1').css('visibility', 'visible');
				$('#activityDetail_navSpring_btn2').css('visibility', 'hidden');
				return;
			} else return;
		};
		//绑定事件
		$("#activityDetail_navSpring_btn1").click(function() {
			move(false)
		});
		$("#activityDetail_navSpring_btn2").click(function() {
			move(true)
		});
	})(jQuery);
	/*活动详情 头像图片的移动 结束*/



	//搜索结果选择
	function searchSelect() {
		var uls = $('#seachResult-nav a');
		var lis = $('.searchResult');
		for (var i = 0; i < uls.length; i++) {
			uls[i].index = i;
			uls[i].onclick = function() {
				for (var i = 0; i < uls.length; i++) {
					uls[i].style.color = 'black';
				}
				this.style.color = 'red';
				for (var j = 0; j < lis.length; j++) {
					lis[j].style.display = 'none';
				}
				lis[this.index].style.display = 'block';
			}
		};
	}
	window.onload = searchSelect();

});



$(document).on("load", function() {
	waterfall('main', 'pin');
	window.onscroll = function() {
		// if(checkscrollside()){
		waterfall();
		// };
	}
});

/*
    parend 父级id
    pin 元素id
*/
function waterfall(parent, pin) {
	var warpH = $('#searchResult-works')
	var $aPin = $("#searchResult-works>li");
	var iPinW = $aPin.eq(0).width(); // 一个块框pin的宽
	var num = Math.floor($(window).width() / iPinW); //每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
	//oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

	var pinHArr = []; //用于存储 每列中的所有块框相加的高度。

	$aPin.each(function(index, value) {
		var pinH = $aPin.eq(index).height();
		if (index < 4) {
			pinHArr[index] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
		} else {
			var minH = Math.min.apply(null, pinHArr); //数组pinHArr中的最小值minH
			var minHIndex = $.inArray(minH, pinHArr);
			$(value).css({
				'position': 'absolute',
				'top': minH + 35,
				'left': $aPin.eq(minHIndex).position().left
			});
			//数组 最小高元素的高 + 添加上的aPin[i]块框高
			pinHArr[minHIndex] += $aPin.eq(index).height() + 35; //更新添加了块框后的列高
			var maxH = Math.max.apply(null, pinHArr);
			warpH.css('height', maxH + 50);
		}
	});
}
// function checkscrollside(){
//     var $aPin = $( "#main>div" );
//     var lastPinH = $aPin.last().get(0).offsetTop + Math.floor($aPin.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
//     var scrollTop = $( window ).scrollTop()//注意解决兼容性
//     var documentH = $( document ).width();//页面高度
//     return (lastPinH < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
// }



//下拉菜单
function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('div').children('span');
	this.placeholder2 = $('#inputP');
	this.opts = this.dd.find('ul.dropdown > li');
	this.opts2 = this.dd.find('#dropdownP>li');
	this.val = '';
	this.index = -1;
	this.initEvents();
}
DropDown.prototype = {
	initEvents: function() {
		var obj = this;
		obj.dd.on('click', function(event) {
			$(this).toggleClass('active');
			return false;
		});

		obj.opts.on('click', function() {
			var opt = $(this);
			obj.val = opt.text();
			obj.index = opt.index();
			obj.placeholder.text(obj.val);
			obj.dd.children().addClass('border')
		});
		obj.opts2.on('click', function() {
			var opt = $(this);
			obj.val2 = opt.text();
			obj.index = opt.index();
			obj.placeholder2.val(obj.val2);
			obj.dd.children().addClass('border')
		});
	},
	getValue: function() {
		return this.val;
	},
	getIndex: function() {
		return this.index;
	}
}


$(function() {

	var dd = new DropDown($('#dd'));
	var dd = new DropDown($('#dd2'));
	var dd = new DropDown($('#dd3'));

	$(document).click(function() {
		// all dropdowns
		$('.wrapper-dropdown-3').removeClass('active');
	});
	$(document).click(function() {
		$('div.li-Div').siblings('div.divXl').slideUp(100);
	});

});



// activity
var foo = {
	parm: {
		tm: true
	},
	chaIner: function() {
		var clNum = 1; //收起
		// var ne = false;
		var addBtn = $('#btn-sjI');
		var tagA = $('#btn-sj2');
		var inputS = tagA.children('input');
		var par;

		addBtn.on('click', function() {
			par = false;
			setTimeout(function() {
				par = true
			}, 500)
			_this = $(this); //按钮
			if (clNum == 1) {
				_this.html("确定");
				inputS.css('display', 'inline-block');
				inputS.animate({
					width: '270px',
					height: '30px'
				}, 400, 'linear');
				clNum = 2;
				inputS.focus();
			} else if (clNum == 2) {
				ct();
			}
		});
		inputS[0].onfocus = function() {
			window.onkeyup = function(e) {
				if (e.keyCode == 13) {
					ct();
				}
			}
		}

		function ct() {
			var inputInner = inputS.val();
			if (!inputInner && clNum == 2) {
				foo.alert('请输入您的擅长及亮点');
			}
			if (inputInner) {
				foo.creatA('#addBox-sj', inputInner, '#btn-sj2');
				clNum = 1;
				inputS.val(null);
				blur();
				btnCl = $('.icon-close');
				btnCl.click(function() {
					var $this = $(this);
					var sp = $this.parent().parent();
					sp.remove();
				});
			};
		}

		function blur() {
			inputS.animate({
				width: 0,
				height: 0
			}, 200, 'linear', function() {
				inputS.css('display', 'none');
			});
			setTimeout(function() {
				addBtn.html("添加 <i class=\"icon-add\"></i>")
			}, 100)
			clNum = 1;
		};
		inputS[0].onclick = function(e) {
			e.stopPropagation();
		}
		document.onclick = function() {
			if (clNum == 2 && par) {
				blur()
			}
		}

	},
	alert: function(val) {
		var ly = document.getElementById('login-LY');
		if (ly) return;
		var txt = val;
		dd = document.documentElement
		var sWeidth = dd.clientWidth;
		var sHeight = dd.clientHeight;
		var oLogin = document.createElement('div');
		oLogin.id = 'login-LY';
		dWidth = 420;
		oLogin.style.width = dWidth + 'px';
		dHeight = 60;
		oLogin.style.height = 0;
		oLogin.style.left = parseInt(sWeidth / 2) - parseInt(dWidth / 2) + 'px';
		oLogin.style.top = parseInt(sHeight / 2) - parseInt(dHeight / 2) + 'px';
		oLogin.innerHTML = txt;
		oLogin.style.position = 'fixed';
		document.body.appendChild(oLogin);
		var h = 0;
		i = setInterval(function() {
			if (h < dHeight) {
				h += 10;
				oLogin.style.height = h + 'px';
			};
		}, 50);

		var h = parseInt(oLogin.style.height) + 1;
		setTimeout(function() {
			clearInterval(i);
			setInterval(function() {
				if (h > 1) {
					h -= 10;
					oLogin.style.height = h + 'px';
				}
			}, 50);
		}, 1500);
		setTimeout(function() {
			document.body.removeChild(oLogin);
		}, 1900)
	},
	pinLY: function(pin) {
		var sWidth = document.body.scrollWidth;
		var sHeight = document.body.scrollHeight; //页面高
		var pHeight = window.screen.height; //屏幕高
		var close;
		if (!pin) {
			pin = ['工业设计', '环艺设计', '装潢设计', '展示设计', '服饰设计', '平面设计', '网站设计', '设计', '广告设计']
		}
		var html = "<div class=\"pinBox-nav\">设计领域<i class=\"icon-closeB\"></i></div>";
		html += "<div class=\"pinBox-main\">";
		for (var i = 0; i < pin.length; i++) {
			html += "<span class=\"pin-ly\">" + pin[i] + "</span>";
		}
		html += "<div class=\"pinBox-footer\"><span class=\"footer-pin pinL\">取消</span><span class=\"footer-pin pinR\">保存</span></div>";
		var chBox = document.createElement('div');
		chBox.id = "chBox-LY";
		var cWidth = chBox.style.width;
		var cHeight = chBox.style.height;
		chBox.className = "pingBox-ly";
		chBox.innerHTML = html;
		chBox.style.left = parseInt(sWidth / 2) - parseInt(cWidth / 2) + 'px';
		var mask = document.createElement('div');
		mask.id = "mask-LY";
		mask.style.height = sHeight + 'px';
		mask.style.width = sWidth + 'px';
		document.body.appendChild(mask);
		document.body.appendChild(chBox);
		var iClose = $('.icon-closeB');
		var cClose = $('.footer-pin.pinL');
		iClose.click(function() {
			removeLY();
		});
		cClose.click(function() {
			removeLY();
		});
		var save = $('.footer-pin.pinR');
		save.click(function() {
			$('.lineBox .tag-added').remove();
			var creatp = $(".pinBox-main").find('.active');
			if (creatp.length == 0) {
				return
			} else {
				for (var l = 0; l < creatp.length; l++) {
					foo.creatA('#addBox2', creatp[l].innerHTML, '#btn-sj');
				}
			}
			removeLY();
			close = $('.tag-added .icon-close');
			cls(close);
		});

		function cls(cls) {
			cls.click(function() {
				$(this).parents('.tag-added').remove();
			});
		}


		function removeLY() {
			document.body.removeChild(chBox);
			document.body.removeChild(mask);
		};
		//choose
		var pinBox = $('.pinBox-main')[0];
		var num = 0;
		var pins = pinBox.getElementsByClassName('pin-ly');
		for (var i = 0; i < pins.length; i++) {
			pins[i].onclick = function() {
				_this = $(this);
				if (_this.hasClass('active')) {
					_this.removeClass('active');
					num = foo.findNum('.pinBox-main', '.active');
				} else {
					if (num < 3) {
						_this.addClass('active');
						num = foo.findNum('.pinBox-main', '.active');
					} else if (document.getElementById('login-LY')) {
						return false;
					} else {
						foo.alert('最多只能选择三个');
					}
				}
			}
		}
	},
	findNum: function(pt, clName) {
		var pare = $(pt);
		var clNum = $(clName, pt);
		return clNum.length;
	},
	creatA: function(pt, mess, bf) {
		var pB = $(pt);
		var tagA = $(bf);
		var _html = '<span class="tag-added"><input name=\'jobs[]\' type=\"hidden\" value=\"' + mess + '\"><span class="addBtn">';
		_html += mess;
		_html += '<i class="icon-close"></i></span></span>';
		$(_html).insertBefore(tagA);
	}
};
var bar = {
	pinC: function() {
		var pin = $('.mar-l .pin-g');
		var pinI = $('.mar-l .icon-lighting');
		tool.hovC(pin, pinI);
		// localB
		var inpt = $('#input-TS');
		var localB = $('.icon-localB');
		tool.hovC(inpt, localB);
	},
	//未解决      事件的嵌套
	focC: function() {
		var inpt = $('#input-TS');
		var localB = $('.icon-localB');
		tool.hovC(inpt, localB);
		tool.hovC(inpt, inpt);
		inpt.focus(function() {
			inpt.css('border-color', '#4dc0fa');
			localB.css('color', '#4dc0fa');
		});
		inpt.blur(function() {
			inpt.css('border-color', '#a3a3a3');
			tool.hovC(inpt, inpt);
		});
	},
	/**
	 * [chg description]
	 * @param  {[id]} aul  [description]
	 * @param  {[classname]} alis [description]
	 * @param  {[id]} bul  [description]
	 * @param  {[classname]} blis [description]
	 * @return {[type]}      [description]
	 */
	chg: function(aul, alis, bul, blis, clnm) {
		alis = $(aul).find(alis);
		blis = $(bul).find(blis);
		if (alis.length == 0 || blis.length == 0) return;
		for (var i = 0; i < alis.length; i++) {
			alis[i].ide = i;
			alis.click(function(el) {
				if (blis.hasClass(clnm)) {
					blis.removeClass(clnm)
				};
				if (alis.hasClass(clnm)) {
					alis.removeClass(clnm)
				}
				var self = $(this);
				blis.eq(self[0].ide).addClass(clnm);
				self.addClass(clnm);
			});
		}
	},
	logined: function(state) {
		var
			lgdbox = $('.lgd-rowbox.s2'),
			mes = lgdbox.find('.check-mes'),
			pre = lgdbox.find('.checked-pre'),
			info = lgdbox.find('.info');
		aft = lgdbox.find('.checked-aft')
		switch (state) {
			case 0:
				pre.text('认证').addClass('nomove')
				mes.hover(function() {
					info.text('赶快认证吧');
				}, function() {
					info.html('设计师入住&nbsp;&nbsp;&nbsp;&rarr;');
				});
				break;
			case 1:
				pre.replaceWith('<div class="checked-pre animate"><p class="wrp">审核中</p></div>').addClass('animate');
				aft.text('审核中');
				info.text('画客网努力审核中');
				break;
			case 2:
				pre.text('未通过');
				aft.text('未通过');
				info.text('继续完善信息');
				mes.addClass('fail')
				break;
			case 3:
				mes.remove();
				break;
		}
	},
	move: function(obj, head) {
		var self = this;
		obj = $(obj);
		head = $(head);
		if (head.length == 0) return
		this.move = false
		this.width = obj.width();
		this.height = obj.height();
		var o = {
			w: 0,
			h: 0,
			lt: 0,
			tp: 0,
			ow: 0,
			oh: 0
		}
		m = {
			sx: 0,
			sy: 0,
			ex: 0,
			ey: 0,
			mx: 0,
			my: 0,
			x: 0,
			y: 0,
			minx: 0,
			miny: 0,
			maxx: 0,
			maxy: 0
		};
		o.ow = obj.get(0).offsetWidth;
		o.oh = obj.get(0).offsetHeight;
		head.mousedown(function(e) {
			self.move = true;
			o.lt = $(this).offset().left;
			o.tp = $(this).offset().top;
			o.w = document.documentElement.clientWidth;
			o.h = document.documentElement.clientHeight;
			m.sx = e.clientX;
			m.sy = e.clientY;
			m.x = obj.css('left');
			m.y = obj.css('top');
		});
		$(document).mousemove(function(e) {
			if (self.move) {
				m.mx = e.clientX - m.sx;
				m.my = e.clientY - m.sy;
				m.minx = -o.lt;
				m.miny = -o.tp;
				m.maxx = o.w - o.ow - o.lt;
				m.maxy = o.h - o.oh - o.tp;
				m.mx = m.mx < m.minx ? m.minx : m.mx;
				m.mx = m.mx > m.maxx ? m.maxx : m.mx;
				obj.css({
					left: parseInt(m.x) + m.mx,
					top: parseInt(m.y) + m.my
				});
			}
		});
		$(document).mouseup(function(e) {
			obj.css({
				left: parseInt(m.x) + m.mx,
				top: parseInt(m.y) + m.my
			});

			self.move = false;

		});
	}
};
var tool = {
	hovC: function(par, chid, col1, col2) {
		var col1 = col1 ? col1 : '#4dc0fa';
		var col2 = col2 ? col2 : '#a3a3a3';
		par.hover(function() {
			chid.css('color', col1);
		});
		par.mouseout(function() {
			chid.css('color', col2);
		});
	}
}
var person = {
	enter: function() {
		var nxt = $('.submit .nxt');
		lis = $('.cki-head-bt li');
		section = $('section');
		star = $('.js-star');
		nxt.eq(0).click(function(e) {
			for (var i = 0; i < 3; i++) {
				var c = star.eq(i).find('.successed');
				if (c.length == 0) {
					foo.alert("请填写信息完整");
					return
				}
			}
			lis.eq(0).removeClass('cur').addClass('added');
			lis.eq(1).addClass('cur');
			section.eq(0).css('display', 'none');
			section.eq(1).css('display', 'block');
		});
		nxt.eq(1).click(function(e) {
			for (var i = 5; i < 6; i++) {
				var c = star.eq(i).find('.successed');
				if (c.length == 0) {
					foo.alert("请填写信息完整");
					return
				}
			}
			if (star.eq(3).find('.tag-added').length == 0) {
				foo.alert("请填写信息完整");
				return
			}
			$('#form1').submit();
			lis.eq(1).removeClass('cur').addClass('added');
			lis.eq(2).addClass('cur');
			section.eq(1).css('display', 'none');
			section.eq(2).css('display', 'block');
		});
	},
	iptinfo: function() {
		var ipts = $('.js-person-ipt');
		ipts.focus(function() {
			var self = $(this);
			person.verify.cur(self);
		});
		ipts.on("keyup blur paste", function() {
			var self = $(this);
			switch ($(this).attr('data-pattern')) {
				case 'twoword':
					if (/.{2,}/.test(self.val())) {
						person.verify.successed(self);
					} else {
						person.verify.check(self)
					}
					break;
				case 'single':
				case 'wechat':
					if (/./.test(self.val())) {
						person.verify.successed(self);
					} else {
						person.verify.check(self)
					}
					break;
				case 'identity':
					if (/^\d{15}$|\d{18}/.test(self.val())) {
						person.verify.successed(self);
					} else {
						person.verify.check(self)
					}
					break;
				case 'phone':
					if (/1\d{10,}/.test(self.val())) {
						person.verify.successed(self)
					} else {
						person.verify.check(self)
					}
					break;
				case 'qq':
					if (/[1-9]\d{4,}/.test(self.val())) {
						person.verify.successed(self)
					} else {
						person.verify.check(self)
					}
					break;
			}
		});
	},
	verify: {
		cur: function(self) {
			self.parent().removeClass('change').removeClass('successed').addClass('cur');
			if (self.parent().find('.js-person-info')) {
				self.parent().find('.js-person-info').remove()
			};
			person.creatSigh(self, self.attr('data-tips'));
			self.select();
		},
		check: function(self) {
			self.parent().removeClass('cur').removeClass('successed').addClass('change');
			if (self.parent().find('.js-person-info')) {
				self.parent().find('.js-person-info').remove()
			};
			person.creatSigh(self, self.attr('data-check'));
		},

		successed: function(self) {
			self.parent().removeClass('cur').removeClass('change').addClass('successed');
			if (self.parent().find('.js-person-info')) {
				self.parent().find('.js-person-info').remove()
			};
			person.creatSigh(self, '');
		}
	},
	creatSigh: function(ipt, mes) {
		var par = ipt.parent();
		par.append($('<p class="js-person-info"><i class="icon-sigh"></i> <span class="js-info">' + mes + '</span></p>'))
	},
	sex: function(ul, lis, ipt) {
		var lis = $(lis);
		ul = $(ul);
		ipt = $(ipt);
		lis.on('click', function(e) {
			for (var i = 0; i < lis.length; i++) {
				ul.removeClass(function() {
					return lis.eq(i).attr('data-class');
				})
			}
			ul.addClass($(this).attr('data-class'));
			ipt.val($(this).attr('data-num'));
		})
	},
	local: function(ulipt, ul, lis) {
		var ipt = $(ulipt);
		ul = $(ul)
		lis = $(lis);
		iptp = $('#inputP');
		drop = $('#dropdownP');
		exampu = $('#js-person-exampu');
		exampl = $('#js-person-exampl');
		e1 =
			parm = false;
		ipt.on('focus', function(e) {
			ul.css('display', 'block');
			e.stopPropagation();
		})
		lis.on('click', function() {
			ipt.val($(this).find('p').text())
			ipt.parent().addClass('cur').addClass('successed')
		});
		$(document).on('click', function() {
			ul.css('display', 'none');
		})


		var c = new s(exampu, exampl);
		var b = new s($('#js-person-exu'), $('#js-person-exl'))

		function s(exampu, exampl) {
			exampu.hover(function() {
				exampl.css('display', 'block');
			}, function() {
				setTimeout(function() {
					if (!parm) {
						exampl.css('display', 'none')
					}
				}, 500)
			});
			exampl.hover(function() {
				exampl.css('display', 'block');
				parm = true;
			}, function() {
				exampl.css('display', 'none');
				parm = false;
			});
		}
	},
	upload: function(fil, uppic) {
		var fil = $(fil);
		bg = fil.parent();
		reload = bg.find('.js-person-reload');
		sh = bg.find('.js-person-show');
		picshow = bg.find('.js-person-up');
		var fileval = fil.change(function(event) {
			var self = $(this);
			pic = self.parent().find(uppic);
			$(this).parent().addClass('cur successed');
			$(this).parent().find('.js-person-up').html('');
			if ($(this).val()) {
				var files = $(this)[0].files[0];
				var reader = new FileReader();
				reader.readAsDataURL(files);
				reader.onload = function(e) {
					var data = e.target.result;
					pic.css('backgroundImage', 'url(' + data + ')');
				};
			}
			return files;
		});
		reload.on('click', function(event) {
			$(this).parent().find('input').trigger('click');
		});
	},
	upload2: function() {
		var fil = $('.js-person-up-sj');
		bg = fil.parent(); //
		ul = $('.js-person-upbtn-sj');

		fil.change(function(event) {
			var self = $(this);
			if ($(this).val()) {
				if ($('.js-sj-lis').length > 1) {
					self.parent().next().find('ul').addClass('successed')
				}
				var files = $(this)[0].files[0];
				var reader = new FileReader();
				reader.readAsDataURL(files);
				reader.onload = function(e) {
					if ($('.js-sj-lis').length == 9) {
						foo.alert('最多上传9张');
						return;
					}
					var lis = $('<li class="js-sj-lis"><span class="js-sj-close">取消</span></li>');
					var data = e.target.result;
					lis.css('backgroundImage', 'url(' + data + ')');
					ul.append(lis);
				};
			}
		});
		$('.js-person-upbtn-sj').mousemove(function() {
			$('.js-sj-close').on('click', function(el) {
				var picul = $(this).parent().parent();
				$(this).parent().remove();
				if (picul.find('li').length == 0) {
					picul.removeClass('successed');
				}
			});
		});
	},
	send: function(mes) {
		if ($('.js-verify1').length != 0) return;
		phonenum = $('#moblie').val();
		mes = mes ? mes : $('<div class="js-verify1"><div ><span class="js-head">验证手机</span><i class="icon-closeB"></i></div><p>已向' + phonenum + '发送验证短信</p><p><span>验证码：</span><input class="js-ipt" type="text" placeholder="请输入验证码"><span class="js-send">重新获取<span class="sec">(<b>60</b>s)<span></span></p><span class="js-sure">确定</span><span class="js-close">取消</span></div>');
		$('body').append(mes);
		var wh = document.documentElement.clientHeight;
		ww = $(document).width();
		min = 60;
		mes.css({
			top: wh / 2 - 100,
			left: ww / 2 - 250
		});
		person.resend();
	},
	sendphone: function(phpar) {
		var
			phonever = $('#js-connect-phone');
		phonesend = $('#js-phone-send');
		if (phpar) {
			phonever.text('已绑定');
			phonesend.text('修改');
		} else {
			phonever.text('未绑定');
			phonesend.text('绑定');
		}
		phonesend.on('click', function() {
			if (phpar) {
				sendmes()
			}
			phoneverify();
		});

		function sendmes() {
			if ($('.js-verify1').length != 0) return;
			var mes = $('<div class="js-verify1"><div ><span class="js-head">验证手机</span><i class="icon-closeB"></i></div><div class="js-ipt-wrp"><input id="moblie" class="js-person-ipt iptcki js-send-ipt" type="text" placeholder="请填写手机号码" data-msg="请输入正确的手机号码，并验证手机" data-tips="请填写手机号码" data-check="请输入正确的手机号" class="iptcki" data-pattern="phone" maxlength="11"></div><p><span>验证码：</span><input class="js-ipt" type="text" placeholder="请输入验证码"><span class="js-send"><span class="js-send-tip">发送短信</span></p><span class="js-sure">确定</span><span class="js-close">取消</span></div>');
			$('body').append(mes);
			var wh = document.documentElement.clientHeight;
			ww = $(document).width();
			min = 60;
			mes.css({
				top: wh / 2 - 100,
				left: ww / 2 - 250
			});
			person.resend();
		}

		function phoneverify() {
			$('.js-person-ipt.js-send-ipt').on('focus', function() {
				person.verify.cur($(this));
			});
			$('.js-person-ipt.js-send-ipt').on('keyup blur paste', function() {
				if (/1[3456789]\d{9,}/.test($(this).val())) {
					person.verify.successed($(this))
				} else {
					person.verify.check($(this))
				}
			})
		}
	},
	sendemail: function(mlpar) {
		var
			emailver = $('#js-connect-email');
		emailsend = $('#js-email-send');
		if (mlpar) {
			emailver.text('已绑定');
			emailsend.text('修改');
		} else {
			emailver.text('未绑定');
			emailsend.text('绑定');
		}
		emailsend.on('click', function() {
			if (mlpar) {
				sendmes()
			}
			$('.icon-closeB').on('click', function() {
				$('.js-verify1').remove()
			});
			$('.js-sure').on('click', function() {
				$('.js-verify1').remove()
			});
		});

		function sendmes() {
			if ($('.js-verify1').length != 0) return;
			var mes = $('<div class="js-verify1 email"><div ><span class="js-head">验证邮箱</span><i class="icon-closeB"></i></div><p><span>邮箱：</span><input class="js-ipt" type="text" placeholder="请输入邮箱"></p><span class="js-sure">发送</span></div>');
			$('body').append(mes);
			var wh = document.documentElement.clientHeight;
			ww = $(document).width();
			min = 60;
			mes.css({
				top: wh / 2 - 100,
				left: ww / 2 - 250
			});
		}
	},
	video: function() {
		var
			upvideo = $('.js-person-video');
		upvideo.on('click', function() {
			sendmes()
			$('.icon-closeB').on('click', function() {
				$('.js-verify1').remove()
			});
			$('.js-sure').on('click', function() {
				$('.js-verify1').remove()
			});
		});

		function sendmes() {
			if ($('#js-verify1').length != 0) return;
			var mes = $('<div class="js-verify1 video" id="js-verify1"><div class="js-move-head"><span class="js-head">验证邮箱</span><i class="icon-closeB"></i></div><p><span>邮箱：</span><input class="js-ipt" type="text" placeholder="请输入邮箱"></p><span class="js-sure">发送</span></div>');
			$('#js-person-video').append(mes);
			var wh = document.documentElement.clientHeight;
			ww = $(document).width();
			min = 60;
			mes.css({
				top: 0,
				left: 350,
				position: 'absolute'
			});
			bar.move('.js-verify1', '.js-move-head');
		}
	},
	resend: function() {
		var icb, cl, secnum;
		icb = $('.js-verify1 .icon-closeB');
		cl = $('.js-verify1 .js-close');
		par = true;
		icb.on('click', function() {
			rem();
		})
		cl.on('click', function() {
			rem();
		})
		$('.js-sure').on('click', function() {
			$('.js-verify1').remove()
		});
		$('.js-send').on('click', function() {
			if ($('.js-verify1 .js-ipt-wrp.successed').length == 0) {
				foo.alert('请输入正确的手机号');
				return
			}
			if ($('.js-send .sec').length == 0) {
				$(this).css('color', '#555');
				min = par ? 60 : 0;
				$('.js-send').append($('<span class="sec">(<b>60</b>s)<span>'));
				$(this).removeClass('cur');
				var dt = setInterval(function() {
					setint(dt)
				}, 1000);
			}
		});

		function rem() {
			$('.js-verify1').remove();
		}

		function setint(dt) {
			if (min < 0 || min > 60) {
				par = par ? false : true;
				clearInterval(dt);
				$('.js-send .sec').remove();
				$('.js-send').css({
					color: '#178eee'
				}).addClass('cur');
			}
			$('.js-send-tip').text('重新发送');
			if (par) {
				min--;
				secnum = min
			} else {
				min++;
				secnum = 60 - min
			}
			secnum = secnum <= 0 ? 0 : secnum;
			$('.js-send b').text(secnum);
		}
	},
	avatar: function(target, config) {
		if (!this instanceof person.avatar) return new person.avatar(target, config);
		var Target = typeof(target) === 'string' ? $(target) : target;
		Target.data('upload') ? '' : Target.data('upload', new upload(target, config));

		var bd = $('body'),
			apd, o = {},
			obj = {},
			I = {
				start: {
					left: 0,
					top: 0,
					eLeft: 0,
					eTop: 0
				},
				end: {
					left: 0,
					top: 0,
					left: 0,
					top: 0
				},
				temp: {
					mx: 0,
					my: 0
				},
				ismoving: false
			},
			S = {
				isScroll: false
			},
			P = {
				ratio: 0,
				moveS1: 0,
				moveS2: 0
			}

		function upload(target, config) {
			o = $.extend(true, {
				img: '',
				width: 164,
				height: 164
			}, config);
			Target.img = $(o.img);
			init();
		}

		function init() {
			upFile();
		}

		function upFile() {
			Target.on('change', function(e) {
				var upfile = $(this).parents('.js-publish-pics'),
					file = this.files[0],
					reader = new FileReader(),
					data;
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					data = e.target.result;
					fileRead(data);
				};
			});
		}

		function fileRead(data) {
			obj.apd = $('.Ojs-upload-avatar');
			// if (!obj.apd.length) {
			// 	obj.apd = $('<div class="Ojs-upload-avatar"><div class="js-mask"></div><div class="Ojs-up-wrp js-avatar-clip animate-fadeIn"><header><span class="tit">选择裁剪区域</span><i class="icon-closeB"></i></header><div class="up-main"><div class="hidbox"><div class="img-contain"><div class="Ojs-img-wrp"><img src="' + data + '" class="clip-img"></div></div><div class="img-mask"></div><div class="mask mask-t"></div><div class="mask mask-r"></div><div class="mask mask-b"></div><div class="mask mask-l"></div></div></div><div class="bottm"><span class="cancle">取消</span><span class="sure">确定</span></div></div></div>');
			// 	bd.append(obj.apd);
			// }
			obj.apd = $('.Ojs-upload-avatar');
			obj.box = $('.Ojs-up-wrp');
			obj.close = $('.icon-closeB');
			obj.cancel = obj.apd.find('.cancle');
			obj.ok = obj.apd.find('.sure');
			obj.mask = $('.js-mask');
			obj.img = $('.clip-img');
			obj.imgContain = $('.img-contain');
			obj.border = obj.apd.find('.img-mask');
			obj.contain = $('#Ojs-clip-contain');
			// obj.imgWrp = $('.Ojs-img-wrp');

			function objInit() {
				obj.box.jsmove({
					head: 'header'
				});
				cursor(obj);
				// var stI = setInterval(function() {
				// updateImg(obj); //初始化图片参数
				// if (P.ratio) {
				// 	clearInterval(stI);
				// 	obj.apd.css('display', 'block');
				// }
				initPos(obj); //弹框位置初始化
				// initImgPos(obj); //图片位置初始化
				// imgMove(obj); // move
				// imgScale(obj);
				console.count('repeat time:');
				// }, 100);

				obj.ok[0].onclick = obj.close[0].onclick = obj.cancel[0].onclick = function() {
					close(obj);
				}
			}
			objInit();
		}

		function initPos(obj) {
			obj.box.w = obj.box[0].offsetWidth || 440;
			obj.box.h = obj.box[0].offsetHeight || 540;
			obj.box.css({
				left: (hkglb.win.w - obj.box.w) / 2,
				top: (hkglb.win.h - obj.box.h) / 2
			});
		}

		function initImgPos(obj) {
			if (P.ratio > 1) {
				obj.img.width = 252;
				obj.img.height = 252 * P.ratio;
				obj.img.top = 54 - (obj.img.height - 252) / 2;
				obj.img.left = 54;
			} else {
				obj.img.height = 252;
				obj.img.width = 252 / P.ratio;
				obj.img.left = 54 - (obj.img.width - 252) / 2;
				obj.img.top = 54;
			};
			obj.img.css({
				top: obj.img.top,
				left: obj.img.left,
				width: obj.img.width,
				height: obj.img.height
			});
		}

		function close(obj) {
			obj.box.removeClass('animate-fadeIn').addClass('animate-fadeOutUp');
			obj.mask.fadeOut();
			setTimeout(function() {
				obj.box.removeClass('animate-fadeOutUp').addClass('animate-fadeIn');
				// obj.apd.remove();
				obj.apd.css('display', 'none');
				obj.mask.fadeIn();
			}, 400);
		}

		function imgMove(obj) {
			obj.border.on('mousedown', function(e) {
				e.preventDefault();
				obj.border.addClass('moving');
				I.ismoving = true;
				I.start = {
					left: parseFloat(obj.img.css('left')),
					top: parseFloat(obj.img.css('top')),
					eLeft: e.clientX,
					eTop: e.clientY
				}
			});
			$(window).on('mousemove', function(e) {
				if (I.ismoving) {
					e.preventDefault();
					I.end.eLeft = e.clientX;
					I.end.eTop = e.clientY;
					I.temp.mx = I.end.eLeft - I.start.eLeft;
					I.temp.my = I.end.eTop - I.start.eTop;
					obj.img.css({
						left: I.start.left + I.temp.mx,
						top: I.start.top + I.temp.my
					});
				}
			})
			$(window).on('mouseup', function(e) {
				if (I.ismoving) {
					e.preventDefault();
					obj.border.removeClass('moving');
					I.temp = {
						mx: 0,
						my: 0
					};
					I.end.left = parseFloat(obj.img.css('left'));
					I.end.top = parseFloat(obj.img.css('top'));
				}
				I.ismoving = false;
				endPosition(obj);
			})

			function endPosition(obj) {
				if (I.end.left > 54) {
					if (I.end.top > 54) {
						P.moveS1 = 1; //左 上
					} else {
						P.moveS1 = 2; //左
					}
				} else if (I.end.top > 54) {
					P.moveS1 = 3; //上
				} else {
					P.moveS1 = 0;
				}
				if (I.end.left + obj.img.width < 306) {
					if (I.end.top + obj.img.height < 306) {
						P.moveS2 = 1;
					} else {
						P.moveS2 = 2;
					}
				} else if (I.end.top + obj.img.height < 306) {
					P.moveS2 = 3;
				} else {
					P.moveS2 = 0;
				}
				console.log(P.moveS1, P.moveS2);
				obj.img.animate({
					top: (function() {
						if (P.moveS1 == 1 || P.moveS1 == 3) {
							return 54
						} else if (P.moveS2 == 1 || P.moveS2 == 3) {
							return (306 - obj.img.height)
						} else {
							return obj.img.top
						}
					})(),
					left: (function() {
						if (P.moveS1 == 1 || P.moveS1 == 2) {
							return 54
						} else if (P.moveS2 == 1 || P.moveS2 == 2) {
							return (306 - obj.img.width)
						} else {
							return obj.img.left
						}
					})()
				}, 200, 'backout')
				updateImg(obj);
			}
		}

		function imgScale(obj) {
			var delta, scale;
			obj.border.on('mousewheel DOMMouseScroll', function(e) {
				delta = -e.originalEvent.detail || -e.originalEvent.deltaY || e.wheelDelta;
				scale = /none/.test(obj.img.css('transform')) ? 1 : /matrix\(([\d.]+)/gi.exec(obj.img.css('transform'))[1];
				e.preventDefault();
				delta > 0 ? big() : small();
				updateImg(obj);

				function big() {
					var imgW = $(obj.img).width(),
						imgH = $(obj.img).height();
					obj.img.animate({
						width: imgW + 50,
						height: imgH + 50
					});
				}

				function small() {
					if (S.isScroll) return;
					var temp, imgW = $(obj.img).width(),
						imgH = $(obj.img).height();
					if (P.ratio > 1) {
						imgW = imgW - 50 >= 250 ? (function() {
							imgH -= 50;
							return (imgW - 50)
						})() : (function() {
							temp = imgW - 250;
							imgH = imgH - temp * P.ratio;
							return 250;
						})();
					} else {
						imgH = imgH - 50 >= 250 ? (function() {
							imgW -= 50;
							return (imgH - 50)
						})() : (function() {
							temp = imgH - 250;
							imgW = imgW - temp / P.ratio;
							return 250;
						})
					}
					obj.img.animate({
						width: imgW,
						height: imgH
					}, 200);
					S.isScroll = true;
					setTimeout(function() {
						S.isScroll = false;
					}, 200);
				}
			});
		}

		function cursor(obj) {
			var moving = false;
			obj.contain.on('mousedown', function(e) {
				e.preventDefault();
				$(this).addClass('moving');
				moving = true;
			});
			$(window).on('mouseup', function(e) {
				e.preventDefault();
				if (moving) {
					obj.contain.removeClass('moving');
					moving = false;
				}
			});
		}

		function updateImg(obj) {
			obj.img.left = I.end.left;
			obj.img.top = I.end.top;
			obj.img.width = obj.img[0].offsetWidth;
			obj.img.height = obj.img[0].offsetHeight;
			obj.img.Width = obj.img[0].naturalWidth;
			obj.img.Height = obj.img[0].naturalHeight;
			P.ratio = obj.img.Height / obj.img.Width;
		}
	},
	inti: function() {
		if ($('.checkin')) {
			person.enter();
			person.iptinfo();
			person.sex('#js-person-sex', '.js-person-sex', '#js-sex');
			person.local('#input-TS', '#js-person-locals', '.js-person-locals');
			person.upload('.js-person-upbtn', '.js-person-up');
			person.upload2();
			person.sendphone(1);
			person.sendemail(1);
			person.video();
		}
		var nm = 10;
		var st = setInterval(function() {
			$('.Ojs-person-avatar').length && person.avatar('.Ojs-upload-avater', {
				img: '.Ojs-person-avatar'
			});
			if (!--nm) clearInterval(st);
		}, 100);
	}
};

(function($, window) {
	$.extend($.easing, {
		backout: function(x, t, b, c, d) {
			var s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
		}
	});
	$.fn.navshow1 = function(config) {
		var o = {
			fx: 'backout',
			speed: 500,
			click: function() {}
		}
		o = $.extend(o, config);
		
		return $(this).each(function(index, el) {
			var self = this,
				$this = $(this),
				noop = function() {},
				back = $('<li class="back"><div class="append"></div></li>').appendTo($this),
				lis = $('li', this),
				cur = $('li.cur', this)[0] || lis.eq(0).addClass('cur');
			lis.not('.back').hover(function() {
				move(this);
			}, noop);
			$this.hover(noop, function() {
				move(cur)
			})
			lis.click(function(e) {
				thisl = $(this);
				set(this);
				return o.click.apply(this, [e, this])
			});

			function move(a) {
				back.each(function() {
					$(this).dequeue()
				}).animate({
					left: a.offsetLeft,
					width: a.offsetWidth
				}, o.speed, o.fx)
			}

			function set(a) {
				thisl.addClass('cur').siblings().removeClass('cur');
				cur = a;
			}
		});
	}
	$.fn.navshow2 = function(config) {
		var o = $.extend({
			speed : 500,
			module : 'easing',
			width: '60%'
		},config)
		return $(this).each(function(){
			var 
				self = this,
				$this = $(this),
				lis = $('li', this);
				lis.each(function(index, el) {
					var back = $('<div class="nav-back"></div>').appendTo($(this));
					$(this).css('position', 'relative');
				});
				$('.nav-back').css({
					bottom: 0,
					height: '3px',
					margin: '0 auto',
					background: '#0096ff',
					opacity: 0,
					width: 0
				});

				lis.hover(function() {
					$('div',this).dequeue().animate({width: o.width,opacity: 1}, o.speed)
				}, function() {
					$('div',this).dequeue().animate({width: 0,opacity: 0}, o.speed)
				});
		})
	}
	$.fn.jsmove = function(config) {
			var
				p = {
					head: ''
				};
			$.extend(true, p, config);
			self = this;
			obj = $(this);
			head = $(p.head);
			if (head.length == 0 || obj.length == 0) return;
			this.move = false
			var o = {
				w: 0,
				h: 0,
				lt: 0,
				tp: 0,
				ow: 0,
				oh: 0
			}
			m = {
				sx: 0,
				sy: 0,
				ex: 0,
				ey: 0,
				mx: 0,
				my: 0,
				x: 0,
				y: 0,
				minx: 0,
				miny: 0,
				maxx: 0,
				maxy: 0
			};
			o.ow = obj[0].offsetWidth;
			o.oh = obj[0].offsetHeight;
			m.x = obj.css('left');
			m.y = obj.css('top');
			head.mousedown(function(e) {
				self.move = true;
				o.lt = $(this).offset().left;
				o.tp = $(this).offset().top;
				o.w = document.documentElement.clientWidth;
				o.h = document.documentElement.clientHeight;
				m.sx = e.clientX;
				m.sy = e.clientY;
				m.x = obj.css('left');
				m.y = obj.css('top');
			});
			$(document).mousemove(function(e) {
				if (self.move) {
					m.mx = e.clientX - m.sx;
					m.my = e.clientY - m.sy;
					m.minx = -o.lt;
					m.miny = -o.tp;
					m.maxx = o.w - o.ow - o.lt;
					m.maxy = o.h - o.oh - o.tp;
					m.mx = m.mx < m.minx ? m.minx : m.mx;
					m.mx = m.mx > m.maxx ? m.maxx : m.mx;
					obj.css({
						left: parseInt(m.x) + m.mx,
						top: parseInt(m.y) + m.my
					});
				}
			});
			$(document).mouseup(function(e) {
				if (self.move) {
					obj.css({
						left: parseInt(m.x) + m.mx,
						top: parseInt(m.y) + m.my
					});
					m = {
						mx: 0,
						my: 0
					};
				}
				self.move = false;
			});
	}
})(jQuery, window)



function inti() {
	bar.chg('#js-bc-aul', '.js-bc-alis', '#js-bc-bul', '.js-bc-blis', 'cur');
	bar.chg('#js-personbase-aul','.js-personbase-alis','#js-personbase-bul','.js-personbase-blis','cur');
	person.inti();
	$('#js-personbase-aul').navshow1({speed:700});
	setTimeout(function(){
		$('.hkw-header-nav-ul').navshow2({width:'100%',speed:500});
	},1000)
}
inti();
