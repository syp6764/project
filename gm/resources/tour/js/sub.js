$(document).ready(function(){
	$(".sb-list04 li a").click(function(){
		$(this).next(".TR-MT-0003_photo").show();
	});
	$(".TR-MT-0003_photo_cont a").click(function(){
		$(".TR-MT-0003_photo").hide();
	});

	//팝업
	var $popup = $('.popup_zone'),
		$popupAuto = $popup.find('.popup_auto'),
		$popupPrev = $popup.find('.popup_prev'),
		$popupNext = $popup.find('.popup_next'),
		$popupList = $popup.find('.popup_list');

	$popupList.slick({
		draggable : false,
		swipe : false,
		touchMove : false,
		cssEase : 'cubic-bezier(1, 0, 0, 1)',
		speed : 250,
		pauseOnArrowClick : true,
		pauseOnDirectionKeyPush : true,
		pauseOnSwipe : true,
		autoplay : true,
		playText : '재생',
		pauseText : '정지',
		autoArrow : $popupAuto,
		prevArrow : $popupPrev,
		nextArrow : $popupNext,
		dots : false,
		responsive : [{
			breakpoint : 1001,
			settings : {
				draggable : true,
				swipe : true,
				touchMove : true,
				adaptiveHeight : true
			}
		}]
	});
	
	/* 접근성 심사에 걸려서 주석처리함 2024-11-20 서정한
	$('.popup_item.slick-current').find('span').attr('tabindex','0');
	$popupList.on('afterChange',function(e,slick,current,next){
		$('.popup_item span').removeAttr('tabindex');
		$('.popup_item.slick-current').find('span').attr('tabindex','0');
	});
	*/

	//2023-12-20 접근성 관련 table summary(항목)로 들어갈 경우 지우고 caption으로 합침
	if($('.sb-contents table').length){
		$('table').each(function(){
			if($(this).attr('summary')){
				var thisSummary = $(this).attr('summary'),
					thisCaption = $(this).find('caption').text();
				
				if($(this).find('caption').length){
					$(this).find('caption').text(thisCaption + ' - ' + thisSummary + '정보 제공');
				}else{
					$(this).prepend('<caption>' + thisSummary + '</caption>');
				}

				$(this).removeAttr('summary');

			}
		});
	}

});

/*
$(window).load(function(){
	$(".root_daum_roughmap fieldset, .root_daum_roughmap img").attr('alt','');
	$(".root_daum_roughmap .wrap_controllers .wrap_btn_zoom .btn_big_map").html('<span class="blind">�곗���</span>');
	$(".root_daum_roughmap map > area").attr('alt','�꾩튂�쒓린');
	$(".wrap_btn_roadview a").attr('title','�덉갹�쇰줈�대룞');
	$(".wrap_btn_zoom a").attr('title','�덉갹�쇰줈�대룞');
	$(".root_daum_roughmap a").attr('title','�덉갹�쇰줈�대룞');
	$(".wrap_btn_zoom .btn_zoom_in").html('<span class="blind">吏��� �ш쾶</span>');
	$(".wrap_btn_zoom .btn_zoom_out").html('<span class="blind">吏��� �묎쾶</span>');
});
*/

