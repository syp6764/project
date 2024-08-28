/**
 * @author (주)한신정보기술 퍼블리셔팀 서정한
 * @since 2020-02
 * @version 1.0.0
 */

$(document).on('ready.responsive', function(event) {
    $.screen({
        state : [{
            name : 'wide',
            horizontal : {
                from : 9999,
                to : 1241
            }
        }, {
            name : 'web',
            horizontal : {
                from : 1240,
                to : 1001
            }
        }, {
            name : 'tablet',
            horizontal : {
                from : 1000,
                to : 641
            }
        }, {
            name : 'phone',
            horizontal : {
                from : 640,
                to : 0
            }
        }]
    });
});

(function($) {
	'use strict';

	window.tag = {};

    var $window = tag.$window = $(window),
        $document = tag.$document = $(document),
        $html = tag.$html = $('html'),
        $head = tag.$head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

	

	$(function() {

		var $body = tag.$body = $('body'),
            $htmlAndBody = tag.$htmlAndBody = $html.add($body),
            $wrapper = tag.$wrapper = $('#wrapper'),
            header = tag.header = {},
            $header = header.$element = $('#header'),
            container = tag.container = {},
            $container = container.$element = $('#container'),
            footer = tag.footer = {},
            $footer = footer.$element = $('#footer');

		$window.on('screen:wide screen:web', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
        });

		//lnb
        var lnb = header.lnb = {},
            $lnb = lnb.$element = $header.find('.lnb'),
            $lnbShow = lnb.$show = $header.find('.menu_show'),
            $lnbShowBtn = lnb.$showBtn = $lnbShow.find('.menu_btn'),
            $lnbHide = lnb.$hide = $lnb.find('.menu_hide'),
            $lnbHideBtn = lnb.$hideBtn = $lnbHide.find('.menu_btn'),
            $lnbDepthItem = lnb.$depthItem = $lnb.find('.depth_item'),
            $lnbMenu = lnb.$menu = $lnb.find('.menu'),
            $lnbDepth2FirstChild = lnb.$depth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
            $lnbSpy = lnb.$spy = $lnbMenu.find('.spy:last'),
            lnbHeight;

        $lnbSpy.parents('.depth_item').addClass('actived');

        function refreshLnbHeight() {
            lnbHeight = $lnbMenu.css('transition-property', 'none').outerHeight() || '';

            $lnbMenu.css('transition-property', '');
        }

        $lnbShowBtn.on('click', function(event) {
            //클래스 토글
            $html.toggleClass('lnb_show');
        });

        $lnbHideBtn.on('click', function(event) {
            //클래스 토글
            $html.removeClass('lnb_show');
        });
		$('.lnb_curtain button').on('click', function(event) {
            $html.removeClass('lnb_show');
        });

        $lnbDepthItem.on('mouseover focusin', function(event) {
            if(mode === 'pc') {
                var $this = $(this),
                    $depth1Item = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');

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
                    $lnbMenu.height(lnbHeight + ($depth1Item.find('.depth_list').outerHeight() || ''));
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

                    if($this.children('.depth').length) {
                        $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                        event.preventDefault();
                    }
                }
            }

            event.stopPropagation();
        }).each(function(index, element) {
            var $element = $(element);

            if($element.children('.depth').length) {
                $element.addClass('has');
            }else{
                $element.addClass('solo');
            }
        });

        $lnbMenu.on('mouseleave', function(event) {
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });
		$lnb.find('.depth1_item:last-child .depth2 .depth2_list .depth2_item:last-child .depth2_text').on('focusout', function(event) {
			if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
		});

		//패밀리홈페이지
		$('.family_open').on('click', function(){
			$(this).next('.family_panel').addClass('active');
			$('html').addClass('freeze');
		});

		$('.family_close').on('click', function(){
			$(this).parents('.family_panel').removeClass('active');
			$('html').removeClass('freeze');
		});
		
		//가상키보드
		$('.search_keyboard').attr('title', '가상키보드 열기');
		var nvk = new NeoVirtualKeyboard({keyLayout:'KOREAN', keyLayoutType:'SIMPLE'});
		$('.search_keyboard').on('click', function(){
			var $this = $(this),
				IsActive = $this.is('.active');
			if(!IsActive){
				$this.addClass('active').attr('title', '가상키보드 닫기');
				nvk.showKeyboard(this, {
					inputElement: '#query',
					offset: {
						top: 0,
						left: 0
					}
				});
				$('.neoVK .close').focus();
			} else{
				nvk.hideKeyboard();
				$this.removeClass('active').attr('title', '가상키보드 열기');
			};
		});
		$(document).on('click', '.neoVK .close', function() {
			$('.search_keyboard').removeClass('active').attr('title', '가상키보드 열기').focus();
		});

		//lnb_language
		$('.lnb_language .gnb_btn').on('click', function(){
			var $this = $(this),
				$ParentBox = $this.parent('.lnb_language'),
				$layer = $this.siblings('.layer'),
				IsActive = $ParentBox.is('.active');
			if(!IsActive){
				$this.attr('title', '하위메뉴 닫기');
				$layer.slideDown(300);
				$ParentBox.addClass('active');
			} else{
				$ParentBox.removeClass('active');
				$this.attr('title', '하위메뉴 열기');
				$layer.slideUp(300);
			};
		});
		//search
		$('.search .search_open').on('click', function(){
			var $this = $(this),
				$ParentBox = $this.parents('.search'),
				$layer = $this.siblings('.search_panel'),
				IsActive = $ParentBox.is('.active');
			if(!IsActive){
				$ParentBox.addClass('active');
				$this.attr('title', '검색창 닫기');
				$layer.slideDown(300);
				$html.addClass('search_open');
			} else{
				$ParentBox.removeClass('active');
				$html.removeClass('search_open');
				$this.attr('title', '검색창 열기');
				$layer.slideUp(300);
			};
		});

		//배너
		var $banner = $('#footer .banner'),
			$bannerList = $banner.find('.banner_list'),
			$bannerPrev = $banner.find('.banner_prev'),
			$bannerNext = $banner.find('.banner_next'),
			$bannerAuto = $banner.find('.banner_auto');

		$bannerList.slick({
			draggable: false,
			swipe: false,
			touchMove: false,
			//cssEase: 'cubic-bezier(1, 0, 0, 1)',
			//speed: 250,
			slidesToShow : 6,
			variableWidth: true,
			prevArrow: $bannerPrev,
			nextArrow: $bannerNext,
			autoArrow: $bannerAuto,
			pauseOnArrowClick: true,
			pauseOnDirectionKeyPush: true,
			pauseOnSwipe: true,
			autoplay: true,
			playText: '재생',
			pauseText: '정지',
			responsive: [{
				breakpoint: 1001,
				settings: {
					draggable: true,
					swipe: true,
					touchMove: true,
					swipeToSlide: true
				}
			}]
		});

		//footer_site
		$('.footer_site .link_btn').on('click', function(){
			var $this = $(this),
				$ParentBox = $this.parent('.linkbox'),
				$layer = $this.siblings('.layer'),
				IsActive = $ParentBox.is('.active'),
				$OtherParents = $ParentBox.siblings('.linkbox'),
				$OtherBtns = $OtherParents.find('.link_btn'),
				$OtherLayers = $OtherParents.find('.layer');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherLayers.slideUp();
				$OtherBtns.attr('title', '목록열기');
				$ParentBox.addClass('active');
				$layer.slideDown();
				$this.attr('title', '목록닫기');
			} else{
				$ParentBox.removeClass('active');
				$this.attr('title', '목록열기');
				$layer.slideUp();
			};
		});

		//Top
		$('.footer_content .up button').click(function(){
			$('html, body').animate({
				scrollTop: $('body').offset().top
			}, 200);
		});

		$window.on('screen:wide screen:web', function(event) {
            refreshLnbHeight();

            if($lnbSpy.length) {
                $html.removeClass('lnb_open');
                $lnbSpy.parents('.depth_item').removeClass('active');
            }
        });

        $window.on('screen:tablet screen:phone', function(event) {
            refreshLnbHeight();

            if($lnbSpy.length) {
                $html.addClass('lnb_open');
                $lnbSpy.parents('.depth_item').addClass('active');
            }
        });

	});
})(window.jQuery);