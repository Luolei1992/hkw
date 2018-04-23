$(function(){
//µã»÷liÇÐ»»Í¼Æ¬		
	$('.slidewrap ul.bot_slide li').on('click.trigger',function showImg(){
		$(this).parent().css({'width':$(this).parent().children().length*107+'px'});
		$(this).parents('.wrap').find('span.bot_prev,span.bot_next').css({'display':'block'});
		$(this).parents('.wrap').css({
			'background-color':'#444444',
			'width':'650px'
		});
		$(this).parents('.slidewrap').css({'width':'630px'});
		$(this).parent().children().css({'margin':'0px 6px 0 0'});
		
		
		var src_img=$(this).children("img").attr("src");
		$(this).parents('.wrap').find('.img-div-1').attr('src',src_img);
		$(this).parent().children().filter('.current').removeClass('current');
		$(this).addClass('current');
		$(this).parents('.wrap').children('.img-div').css({'display':'block'});	
		
		$(this).parents('.wrap').find('span.close').on('click',function(){
			$(this).parents('.img-div').css({'display':'none'});
			$(this).parents('.wrap').find('.slidewrap ul.bot_slide li').filter('.current').removeClass('current');		
			$(this).parents('.wrap').find('span.bot_prev,span.bot_next').css({'display':'none'});
			$(this).parents('.wrap').css({
				'background-color':'#fff',
				'width':'635px'
			});
			$(this).parents('.wrap').find('.slidewrap').css({'width':'635px'});
			$(this).parents('.wrap').find('.slidewrap ul.bot_slide li').css({'margin':'0px 7px 0 0'});
		});	
		
		
	
		if($(this).parent().children().index(this)<6){
			$(this).parent().css({'left':'0px'});
			
		}else{
			for(var i=1;$(this).parent().children().index(this)>=i*6;i++){
						
						$(this).parent().css({'left':-($(this).parents('.slidewrap').width()*i+i*6)+'px'});									
			}		
		}
		
	});

//µã»÷ÓÒ¼ýÍ·	
	$('.img-div span.next,.wrap span.bot_next ').on('click',function(){
		if($(this).parents('.wrap').find('.slidewrap ul.bot_slide li.current').next().length==0){
			$(this).parents('.wrap').find('.slidewrap ul.bot_slide li').eq(0).triggerHandler('click.trigger');
		}else{
			$(this).parents('.wrap').find('.slidewrap ul.bot_slide li.current').next().triggerHandler('click.trigger');	
		}
		
	});
//µã»÷×ó¼ýÍ·
	$('.img-div span.prev,.wrap span.bot_prev').on('click',function(){
		
			$(this).parents('.wrap').find('.slidewrap ul.bot_slide li.current').prev().triggerHandler('click.trigger');	
		
		
	});
	
					
				
});