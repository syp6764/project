$(function(){


	//header, footer - 2024-12
	var $window = $(window),
		$html = $('html'),
		$header = $('#header'),
		$container = $('#container'),
		$footer = $('#footer'),
		debounce = null;

	//device check
	function screen(){
		var windowWidth = $window.outerWidth();

		if(windowWidth > 1000){
			window.mode = 'pc';
		} else {
			window.mode = 'mobile';
		}
	}
	screen();

	//lnb
	var $lnb = $header.find('.lnb'),
		$lnbShow = $lnb.find('.menu_show'),
		$lnbHide = $lnb.find('.menu_hide'),
		$lnbDepthItem = $lnb.find('.depth_item'),
		$lnbMenu = $lnb.find('.menu'),
		$lnbDepth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
		lnbHeight;

	//$lnb.addClass('length' + $lnb.find('.depth1_item').length);

	function refreshlnbHeight() {
		$html.removeClass('lnb_show lnb_open');
		lnbHeight = $lnbMenu.css('transition-property', 'none').removeClass('init').outerHeight() || '';
		$lnbMenu.css('transition-property', '').addClass('init').height('');
	}
	refreshlnbHeight();

	$window.on('resize', function () {
		clearTimeout(debounce);
		debounce = setTimeout(function (){
			screen();
		}, 100);

		refreshlnbHeight();
	});

	$lnbShow.on('click', function(event) {
		$html.addClass('lnb_show');

		if(mode === 'mobile') {
			//2단메뉴일때 1차메뉴에 active가 없을때
			if($lnbMenu.hasClass('multiple') && $lnb.find('.depth1_item').hasClass('active') === false){
				$lnb.find('.depth1_item:first-child').addClass('active');
			}
		}
	});

	$lnbHide.on('click', function(event) {
		$html.removeClass('lnb_show');
	});

	$lnbDepthItem.on('mouseover focusin', function(event) { //mouseover
		if(mode === 'pc') {
			var $this = $(this),
				$depth1Itme = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');

			//$lnbMenu.height('');

			if($lnbMenu.hasClass('pulldown')) {
				var maxHeight = 0;

				$lnbDepth2FirstChild.each(function(index, element) {
					var $element = $(element),
						outerHeight = $element.outerHeight() || 0;

					//기존 값 보다 얻은 값이 초과일 때
					if(outerHeight > maxHeight) {
						maxHeight = outerHeight;
					}
				});

				$lnbMenu.height(lnbHeight + maxHeight);

			}else if($lnbMenu.hasClass('eachdown')) {
				$lnbMenu.height(lnbHeight + ($depth1Itme.find('.depth2 > :first-child').outerHeight() || ''));
			}

			$html.addClass('lnb_open');
			$lnbDepthItem.removeClass('active');
			$this.addClass('active').parents('li').addClass('active');
		}

		event.stopPropagation();

	}).on('click', function(event) {
		if(mode === 'mobile') {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target;

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('lnb_open');
					}else{
						$html.addClass('lnb_open');
					}
				}

				if($this.children('.depth2').length) {
					if($lnbMenu.hasClass('multiple')) { //모바일 2단 메뉴일때
						$this.addClass('active').siblings('.depth_item').removeClass('active');
					}else{
						$this.toggleClass('active').siblings('.depth_item').removeClass('active');
					}
					event.preventDefault();
				}

				if($this.children('.depth3, .depth4, depth5').length) {
					$this.toggleClass('active').siblings('.depth_item').removeClass('active');
					event.preventDefault();
				}

				/* 기존소스
                if($this.children('.depth').length) {
                    $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                    event.preventDefault();
                }
                */
			}
		}

		event.stopPropagation();
	}).each(function(index, element) {
		var $element = $(element);

		if($element.children('.depth').length) {
			$element.addClass('has');
		}
	});

	$lnbMenu.find('.depth1_item:last-child .depth2 .depth2_itemst .depth2_item:last-child .depth2_text').on('focusout', function(event) {
		if(mode === 'pc') {
			$lnbMenu.height('');
			$html.removeClass('lnb_open');
			$lnbDepthItem.removeClass('active');
		}
	});

	$lnbMenu.on('mouseleave', function(event) {//mouseleave
		if(mode === 'pc') {
			$lnbMenu.height('');
			$html.removeClass('lnb_open');
			$lnbDepthItem.removeClass('active');
		}
	});

	/*$window.on('screen:wide screen:web', function(event) {
        refreshlnbHeight();

        if($lnbSpy.length) {
            $html.removeClass('lnb_open');
            $lnbSpy.parents('.depth_item').removeClass('active');
        }
    });

    $window.on('screen:tablet screen:phone', function(event) {
        refreshlnbHeight();

        if($lnbSpy.length) {
            $html.addClass('lnb_open');
            $lnbSpy.parents('.depth_item').addClass('active');
        }
    });*/

	//사이드
	var $side = $container.find('.side'),
		$sideDepthLI = $side.find('.depth_item');

	//$side.addClass('length' + $side.find('.depth1_item').length);

	$sideDepthLI.on('click', function(event) {
		var $this = $(this),
			$depthText = $this.children('.depth_text'),
			eventTarget = event.target;

		if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
			if($this.hasClass('depth1_item')) {
				if($this.hasClass('active')) {
					$html.removeClass('side_open');
				}else{
					$html.addClass('side_open');
				}
			}

			if($this.children('.depth').length) {
				$this.toggleClass('active').siblings('.depth_item').removeClass('active');
				event.preventDefault();
			}
		}

		event.stopPropagation();
	}).each(function(index, element) {
		var $element = $(element);

		if($element.children('.depth').length) {
			$element.addClass('has');
		}
	});

	var $toggle = $('.toggle'),
		$toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

	$toggleSelector.on('click', function (event) {
		var $this = $(this),
			$parent = $this.parents('.toggle'),
			parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

		if($this.is('[class*="_show"]')){
			if ($parent.siblings().hasClass('active')){
				$parent.siblings().removeClass('active');
				$html.removeClass(parentClass + '_open');
			}
			$html.toggleClass(parentClass + '_open');
			$parent.toggleClass('active');
		}

		if($this.is('[class*="_hide"]')){
			$html.removeClass(parentClass + '_open');
			$this.closest('.active').removeClass('active');
		}
	});

	/* 배너모음 */
	var $banner = $footer.find('.banner'),
		$bannerList = $banner.find('.banner_list'),
		$bannerPrev = $banner.find('.banner_prev'),
		$bannerAuto = $banner.find('.banner_auto'),
		$bannerNext = $banner.find('.banner_next');

	$bannerList.slick({
		draggable : false,
		infinite: true,
		variableWidth: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		playText : '재생',
		pauseText : '정지',
		autoArrow : $bannerAuto,
		prevArrow : $bannerPrev,
		nextArrow : $bannerNext,
	});

	/* 상단으로 */
	var $bodyHtml = $('body,html'),
		$upButton = $footer.find('.up_button');

	$upButton.click(function(){
		$bodyHtml.stop().animate({
			scrollTop: 0
		}, 250);
	});




	//이전 소스
	$('.bxslider').bxSlider({
		auto: true,
		autoControls: true,
		touchEnabled : (navigator.maxTouchPoints > 0)
	});

    // 알림판
	$('.bxslider2').bxSlider({
	    mode: 'fade',
        auto:true,
        autoControls: true,
        touchEnabled : (navigator.maxTouchPoints > 0)
    });
	$(".noti-slide .bx-start").click(function(){
        $(this).css("display","none");
        $(".noti-slide .bx-stop").css("display","block");
    });
    $(".noti-slide .bx-stop").click(function(){
        $(this).css("display","none");
        $(".noti-slide .bx-start").css("display","block");
    });

	$(".tab-d1 > li > a").click(function(){
		$(".tab-d1 > li").find(".tab-d1box").css("display","none");
		$(".tab-d1 > li > a").removeClass("on");
		$(this).next(".tab-d1box").css("display","block");
		$(this).addClass("on");
	});

	var sbheight = $(".sbbox").height();
	$(".sbcon").css("height",sbheight+"px");

	/*소셜버튼*/
	$(".etc1").parent("li").css("min-height","60px");

	$(".social-btn a").eq(0).css("color","#fff");
	$(".social-btn a").eq(0).click(function(){
		$(".social-btn span").animate({left:0},400);
		$(this).css("color","#fff");
		$(".social-btn a").eq(1).css("color","#7c7c7c");
	});
	$(".social-btn a").eq(1).click(function(){
		$(".social-btn span").animate({left:"115px"},400);
		$(this).css("color","#fff");
		$(".social-btn a").eq(0).css("color","#7c7c7c");
	});

	/*소셜롤링*/
	var o = $(".tag-list div ul").height();
	var p = Math.ceil(o/32);
	var n = 0;
	$(".down").click(function(){
		n = n+1;
		if(n >= p){
			n = 0;
		};
		$(".tag-list div ul").css("margin-top",(-1*(n*32))+"px");
	});
	$(".up").click(function(){
		n = n-1;
		if(n == -1){
			n = (p-1);
		};
		$(".tag-list div ul").css("margin-top",(-1*(n*32))+"px");
	});

	/*서브 레프트 메뉴*/
	$(".sblist > li > a").click(function(){
		if( $(this).parent("li").is(".on")){
			$(".sblist  li").removeClass("on");
			$(".sblist  li div").css("display","none");
		}else{
			$(".sblist  li").removeClass("on");
			$(".sblist  li div").css("display","none");
			$(this).parent("li").addClass("on");
			$(this).parent("li").find("div").css("display","block");
		}
	});

	$(".sblist li div ul li").click(function(){
		if( $(this).is(".on")){
			$(".sblist li div ul li").removeClass("on");
		}else{
			$(".sblist li div ul li").removeClass("on");
			$(this).addClass("on");
		}
	});

	/*레이어팝업과 접근성탭키운영*/
	$(".popbtn1").click(function(){
		$(".popup").css("display","block");
	});
	/* 재료현황 에서 버튼 이벤트와 중복됨 ( 사용 유무 변동 필요시 클래스 명 재정리 필요 함)
	  $(".popbtn2").click(function(){
		$(".popup").css("display","block");
	});
	*/
	$(".popbtn3").click(function(){
		$(".popup").css("display","block");
	});

	// 내게 맞는 여행코스 찾기
	$(".popbtn4").click(function(){
		$(".popup").css("display","block");
		$(".pop-close").focus();
	});

	$(".lpop4 .pop-close").click(function(){
	    $(".popup").css("display","none");
        $(".popbtn4").focus();
    });

	$(".pop-close").click(function(){
		$(".popup").css("display","none");
		$(".popbtn1").focus();
	});
	$(".pop-close2").click(function(){
		$(".popup").css("display","none");
		$(".popbtn1").focus();
	});	

	
	//팝업
	var $popup = $('.sb-contents'),
		$popupAuto = $popup.find('.popup_auto'),
		$popupPrev = $popup.find('.mt_btn #mt_prev'),
		$popupNext = $popup.find('.mt_btn #mt_next'),
		$popupList = $popup.find('#mt_slide');

	$popupList.slick({
		draggable : false,
		swipe : false,
		touchMove : false,
		cssEase : 'cubic-bezier(1, 0, 0, 1)',
		speed : 250,
		pauseOnArrowClick : false,
		pauseOnDirectionKeyPush : true,
		pauseOnSwipe : true,
		autoplay : false,
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

	$('.mt_btn a').on("click", function(e) {
        e.preventDefault();
    });
	
	/*리사이징 열기*/
	$(window).on('load resize', function(){
		var width = $(window).width();

		$(".sb-contents").ready(function(){
			if( width <= 640 ){
				$(".sb-contents").css({"width":(width-40)+"px","margin":"0 auto"});
			}else{
				$(".sb-contents").css("width","948px");
			}
		});

		 if(width >= 640){
			$(".tbl-gnb").css("display","none");
		 }

		var sbheight = $(".sbbox").height();
		$(".sbcon").css("height",sbheight+"px");

		$(".etc1").parent("li").css("min-height","60px");

	});/*리사이징 닫기*/

	$('.gnb').hover(
		function() {
			$('html').addClass('lnb_open');
		},
		function() {
			$('html').removeClass('lnb_open');
		}
	);

});