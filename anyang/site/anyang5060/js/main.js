(function($) {
	'use strict';

	$(function() {
        var $window = $(window),
            $container = $('#container');

        //비주얼 슬라이드
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualDots = $visual.find('.visual_dots'),
            $visualAuto =  $visual.find('.visual_auto'),
            $visualPrev =  $visual.find('.visual_prev'),
            $visualNext =  $visual.find('.visual_next'),
            $visualProgress = $visual.find('.svg .progress'),
            slickTransitionTime = 8,
            progressCheck = true,
            Interval;

        $visualList.on('init reInit',function(){
            Interval = setInterval(progressFunction);
        }).on('beforeChange',function(){
            clearInterval(Interval);
        }).on('afterChange',function(){
            $visualProgress.removeAttr('style');
            Interval = setInterval(progressFunction);
        });

        $visualAuto.on('click',function(){
            progressCheck = !progressCheck;
        });
        var progressTotal = parseInt($visualProgress.css('stroke-dasharray').replace('px','')),
            cumulativeProgress = progressTotal;
        console.log(progressTotal)
        function progressFunction(){
            if(!progressCheck) return;
            var progressValue = progressTotal * (1/(slickTransitionTime*100));
            cumulativeProgress = (cumulativeProgress - progressValue).toFixed(3);
            $visualProgress.css('stroke-dashoffset', cumulativeProgress)
            if(cumulativeProgress <= 0){
                clearInterval(Interval);
                $visualList.slick('slickNext');
                return cumulativeProgress = progressTotal;
            }
        }

        $visualList.slick({
            rows: 1,
            draggable: false,
            infinite: true,
            variableWidth: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            prevArrow: $visualPrev,
            nextArrow: $visualNext,
            appendDots: $visualDots,
            autoArrow: $visualAuto,
            pauseText: '정지',
            playText: '재생',
            fade: true,
        });

        function resizeCircle() {
            var screenWidth = $(window).width();
            var newRadius;

            if (screenWidth <= 640) {
                newRadius = 12;
            } else if (screenWidth <= 1000) {
                newRadius = 15.5;
            } else {
                newRadius = 18;
            }
            $(".svg circle").attr("r", newRadius);
        }
        // 초기 호출
        resizeCircle();
        // 창 크기 변경 시 호출
        $(window).resize(resizeCircle);

        // $visualAuto.click(function() {
        //     var progressCircle = $('.svg .progress');
        //
        //     if (progressCircle.hasClass('pause')) {
        //         progressCircle.removeClass('pause');
        //     } else {
        //         progressCircle.addClass('pause');
        //     }
        // });

        //팝업 슬라이드
        var $popup = $container.find('.popup'),
            $popupList = $popup.find('.popup_list'),
            $popupDots = $popup.find('.popup_dots'),
            $popupAuto =  $popup.find('.popup_auto'),
            $popupPrev =  $popup.find('.popup_prev'),
            $popupNext =  $popup.find('.popup_next'),
            $popupCurrent = $popup.find('.popup_current'),
            $popupTotal = $popup.find('.popup_total');

        $popupList.slick({
            rows: 1,
            draggable: false,
            infinite: true,
            variableWidth: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3500,
            dots: true,
            prevArrow: $popupPrev,
            nextArrow: $popupNext,
            appendDots: $popupDots,
            autoArrow: $popupAuto,
            pauseText: '정지',
            playText: '재생',
            current: $popupCurrent,
            total: $popupTotal,
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
        });

        //센터소식 슬라이드
        var $news = $container.find('.news'),
            $newsList = $news.find('.news_list')

        $newsList.slick({
            rows: 1,
            draggable: true,
            infinite: true,
            variableWidth: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            dots: false,
            responsive: [
                {
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        variableWidth: true,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true,
                    }
                },

            ]
        });

	});
})(window.jQuery);
