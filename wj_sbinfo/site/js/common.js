(function($) {
	'use strict';

	$(function() {

        var $window = $(window),
            $html = $('html'),
            $header = $('#header'),
            $footer = $('#footer');

        $window.on('scroll', function() {
            var windowTop = $(this).scrollTop();
            var $header = $('#header');

            if (windowTop > 0) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });

        /* 토글 */
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
            variableWidth: false,
            slidesToShow: 9,
            slidesToScroll: 1,
            autoplay: true,
            playText : '재생',
            pauseText : '정지',
            autoArrow : $bannerAuto,
            prevArrow : $bannerPrev,
            nextArrow : $bannerNext,
            responsive: [
                {
                    breakpoint: 1501,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow:4,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow:3,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow:2,
                    }
                },
            ],
        });

        /* 상단으로 */
        var $bodyHtml = $('body,html'),
            $upButton = $footer.find('.footer_top');

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });



	});
})(window.jQuery);
