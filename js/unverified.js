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
});

$(".wrap-list .serve-card").click(function(event) {
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
 * 个人首页关注按钮点击一下判断是否是已关注状态，两种状态间切换
 * @param  {[type]} obj    DOM对象
 * @param  {[type]} number 关注数是+1还是-1
 * @return {[type]}        无
 */
(function(){
	var toggle = false;
	$("#followIcon").click(function(event) {
		toggle = !toggle;
		if (toggle) {
			followIconToggle(this,"+1","#555","已关注");
		} else {
			followIconToggle(this,"-1","#fff","关注");
		}	
	});
})();
function followIconToggle(obj,number,color,text){
	$(obj).css("color",color);
	$(obj).html(text);
	var followNumber = $(obj).parent("li").find("p")[0];
	oldFollowNumber = parseInt(followNumber.innerHTML);
	followNumber.innerHTML = oldFollowNumber + parseInt(number);	
}
