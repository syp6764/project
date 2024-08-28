/**
 * @author (주)한신정보기술 퍼블리셔팀 김진영
 * @since 2018-08-13
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

(function() {
	/**
	 * @name isStringWithCharacter
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {boolean}
	 */
	function _isStringWithCharacter(value) {
		return typeof value === 'string' && !!value.replace(/\s/g, '').length;
	}

	/**
	 * @name isNumeric
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {boolean}
	 */
	function _isNumeric(value) {
		return typeof value === 'number' && !isNaN(value) && isFinite(value);
	}

	window.cookie = {
		/**
		 * @since 2017-01-16
		 * @param {string} name
		 * @param {string} value
		 * @param {number} day
		 * @return {boolean}
		 */
		set : function(name, value, day) {
			var result = false;

			//문자일 때
			if(_isStringWithCharacter(name) && _isStringWithCharacter(value)) {
				var date = new Date();

				//숫자가 아닐 때
				if(!_isNumeric(day)) {
					day = -1;
				}

				date.setDate(date.getDate() + day);

				document.cookie = name + '=' + escape(value) + '; expires=' + date.toUTCString() + '; path=/;';

				//쿠키생성 후 확인해서 있으면
				if(this.get(name) === value) {
					result = true;
				}
			}

			return result;
		},

		/**
		 * @since 2017-01-16
		 * @param {string} name
		 * @return {string}
		 */
		get : function(name) {
			var result = '';

			//문자일 때
			if(_isStringWithCharacter(name)) {
				name += '=';

				var nameLength = name.length,
					splitCookie = document.cookie.split(';');

				for(var i = 0, splitCookieLength = splitCookie.length; i < splitCookieLength; i++) {
					var element = splitCookie[i];

					//첫번째 글자가 공백일 때
					while(element.charAt(0) === ' ') {
						element = element.substring(1);
					}

					//쿠키값이 있을 때
					if(element.indexOf(name) === 0) {
						result = unescape(element.substring(nameLength, element.length));

						break;
					}
				}
			}

			return result;
		}
	};

})();



try {
	//$ 중첩 방지
	(function($) {
		'use strict';


		//제이쿼리가 있는지 확인
		if(typeof $ === 'function') {
			$.tag = {
				wdw : $(window),
				dcmt : $(document),
				html : $('html'),
				head : $('head')
			};

			$.variable = {};
			window.tag = {};
			var $window = tag.$window = $(window),
				$document = tag.$document = $(document),
				$html = tag.$html = $('html'),
				$head = tag.$head = $('head'),
				$screen = $.screen,
				$inArray = $.inArray;

			$(function() {
				$.tag.body = $('body');
				$.tag.wrapper = $('#wrapper');
				$.tag.header = $('#header');
				$.tag.container = $('#container');
				$.tag.footer = $('#footer');
				$.tag.htmlAndBody = $.tag.html.add($.tag.body);

				$.tag.lnb = $.tag.header.children('.lnb');
				$.tag.lnbNav = $.tag.lnb.children('.nav');
				$.tag.lnbNavActivedText = $.tag.lnbNav.find('a[data-menu-actived]');

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
					$lnbShow = lnb.$show = $header.find('.nav_open'),
					$lnbShowBtn = lnb.$showBtn = $lnbShow.find('.nav_button'),
					$lnbHide = lnb.$hide = $lnb.find('.nav_close'),
					$lnbHideBtn = lnb.$hideBtn = $lnbHide.find('.nav_button'),
					$lnbDepthItem = lnb.$depthItem = $lnb.find('.depth_item'),
					$lnbMenu = lnb.$menu = $lnb.find('.menu'),
					$lnbDepth2FirstChild = lnb.$depth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
					$lnbSpy = lnb.$spy = $lnbMenu.find('.spy:last'),
					lnbHeight,
					$lnbDepth1Item = $lnb.find('.depth1_item');

				const LnbEachHeight = [];
				$lnbDepth1Item.each(function() {
					var $this = $(this),
						$Depth2 = $this.find('.depth2'),
						$Depth2List = $this.find('.depth2_list'),
						Depth2Height = $Depth2List.outerHeight();
					LnbEachHeight.push(Depth2Height);
					//console.log(LnbEachHeight);
				});
				const Lnbmax = Math.max.apply(null, LnbEachHeight);
				console.log('메뉴높이:'+Lnbmax);

				$lnbSpy.parents('.depth_item').addClass('actived');

				function refreshLnbHeight() {
					lnbHeight = $lnbMenu.css('transition-property', 'none').outerHeight() || '';

					$lnbMenu.css('transition-property', '');
				}

				$lnbShowBtn.on('click', function(event) {
					//클래스 토글
					console.log('ddd');
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
							$lnbMenu.height(Lnbmax+96);
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




			});


		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}











/**
 * @author (주)한신정보기술 퍼블리셔팀 xxx
 * @since 2020-xx-xx
 * @version 1.0.0
 */


(function($) {
	'use strict';

	window.tag = {};

    var $window = tag.$window = $(window),
        $document = tag.$document = $(document),
        $html = tag.$html = $('html'),
        $head = tag.$head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

	//브라우저
    var _browser = navigator.userAgent.toLowerCase();

    //ie7일 때
    if(_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie7';

    //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie8';

    //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie9';

    //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie10';

    //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie11';

    //edge일 때
    }else if(_browser.indexOf('edge') > -1) {
        _browser = 'edge';

    //opera일 때
    }else if(_browser.indexOf('opr') > -1) {
        _browser = 'opera';

    //chrome일 때
    }else if(_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

    //firefox일 때
    }else if(_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

    //safari일 때
    }else if(_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    }else{
        _browser = 'unknown';
    }

    /**
     * @name 브라우저 얻기
     * @since 2017-12-06
     * @return {string}
     */
    window.getBrowser = function() {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);

	$(function() {

		//addons
		var $addons = $('.addons');

		function checkAddons() {
			var scrollTop = $(window).scrollTop();

			if (scrollTop > 0) {
				$addons.addClass('active');
			} else {
				$addons.removeClass('active');
			}
		}

		checkAddons();
		$(window).on('scroll', checkAddons);


		//search
		$('.gnb ul li.list.searchbtnbox .gnb_btn').on('click', function(){
			var $this = $(this),
				$ParentBox = $this.parent('.searchbtnbox'),
				$layer = $('#header .search'),
				IsActive = $ParentBox.is('.active');
			if(!IsActive){
				$ParentBox.addClass('active');
				$html.addClass('search_open');
			} else{
				$ParentBox.removeClass('active');
				$html.removeClass('search_open');
			};
		});

		$('.search .search_close').on('click', function(){
				$html.removeClass('search_open');
				$('.searchbtnbox.active').removeClass("active");
		});

		//배너
		var $banner = $('#footer .foot_banner'),
			$bannerList = $banner.find('.banner_list'),
			$bannerPrev = $banner.find('.banner_prev'),
			$bannerNext = $banner.find('.banner_next'),
			$bannerAuto = $banner.find('.banner_auto');

		$bannerList.slick({
			draggable: false,
			swipe: false,
			touchMove: false,
			slidesToShow : 3,
			prevArrow: $bannerPrev,
			nextArrow: $bannerNext,
			autoArrow: $bannerAuto,
			autoplay: true,
			playText: '재생',
			pauseText: '정지',
			vertical: true,
			centerMode: true,
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



	});



})(window.jQuery);

