(function($) {
    'use strict';

    $(function() {
        var $window = $(window),
            $container = $('#container');

        //비주얼 슬라이드
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualPrev =  $visual.find('.visual_prev'),
            $visualNext =  $visual.find('.visual_next'),
            $visualDots =  $visual.find('.visual_dots'),
            $visualAuto =  $visual.find('.visual_auto'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal = $visual.find('.visual_total'),
            $visualProgress = $visual.find('.visual_progress');

        $visualList.slick({
            rows: 0,
            draggable: true,
            infinite: true,
            variableWidth: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow: $visualPrev,
            nextArrow: $visualNext,
            dots: true,
            appendDots: $visualDots,
            autoArrow: $visualAuto,
            pauseText: '정지',
            playText: '재생',
            fade: true,
            current: $visualCurrent,
            total: $visualTotal,
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

        $visualList.on("beforeChange", function() {
            $visualProgress.removeClass('on');
        }).on('afterChange', function(event, slick, current) {
            if(!$visualProgress.hasClass('pause')){
                $visualProgress.addClass('on');
            }
        });
        $visualAuto.on('click', function(event){
            if($visualProgress.hasClass('pause')){
                $visualProgress.removeClass('pause');
            } else {
                $visualProgress.addClass('pause');
            }
        });


        //시정사진 슬라이드
        var $photo = $container.find('.photo'),
            $photoList = $photo.find('.photo_list'),
            $photoPrev =  $photo.find('.photo_prev'),
            $photoNext =  $photo.find('.photo_next');

        $photoList.slick({
            rows: 1,
            draggable: true,
            infinite: false,
            variableWidth: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            prevArrow: $photoPrev,
            nextArrow: $photoNext,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true
                    }
                }
            ]
        });

        // 슬라이더가 초기화되었을 때와 슬라이드 변경 시 실행될 콜백 함수
        $photoList.on('init afterChange', function (event, slick, currentSlide) {

            // 슬라이더의 현재 슬라이드가 첫 번째 슬라이드인 경우 (이전 슬라이드가 없음)
            if (currentSlide === 0) {
                // 이전 화살표의 색상을 변경
                $photoPrev.removeClass('change');
            } else {
                // 그렇지 않으면 이전 화살표의 색상을 원래대로 복원
                $photoPrev.addClass('change');
            }

            // 슬라이더의 현재 슬라이드가 마지막 슬라이드인 경우
            if (currentSlide === slick.slideCount - slick.options.slidesToShow) {
                $photoNext.addClass('change');
            } else {
                $photoNext.removeClass('change');
            }
        });

        //정례브리핑 슬라이드
        var $briefing = $container.find('.briefing'),
            $briefingList = $briefing.find('.briefing_list'),
            $briefingPrev =  $briefing.find('.briefing_prev'),
            $briefingNext =  $briefing.find('.briefing_next');

        $briefingList.slick({
            rows: 1,
            draggable: true,
            infinite: false,
            variableWidth: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            prevArrow: $briefingPrev,
            nextArrow: $briefingNext,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true
                    }
                }
            ]
        });

        // 슬라이더가 초기화되었을 때와 슬라이드 변경 시 실행될 콜백 함수
        $briefingList.on('init afterChange', function (event, slick, currentSlide) {

            // 슬라이더의 현재 슬라이드가 첫 번째 슬라이드인 경우 (이전 슬라이드가 없음)
            if (currentSlide === 0) {
                // 이전 화살표의 색상을 변경
                $briefingPrev.removeClass('change');
            } else {
                // 그렇지 않으면 이전 화살표의 색상을 원래대로 복원
                $briefingPrev.addClass('change');
            }

            // 슬라이더의 현재 슬라이드가 마지막 슬라이드인 경우
            if (currentSlide === slick.slideCount - slick.options.slidesToShow) {
                $briefingNext.addClass('change');
            } else {
                $briefingNext.removeClass('change');
            }
        });

        // 스크롤
        $window.on('load scroll', function (){
            var $rowgroup = $("[class^=\'rowgroup\']"),
                scrollTop = $(window).scrollTop();

            $rowgroup.each(function (index){
                var rowgroupOffset = $(this).offset().top;

                if(rowgroupOffset < scrollTop + 650) {
                    $rowgroup.eq(index).addClass('scroll_effect');

                    // 슬로건 효과 추가
                    if ($(this).hasClass('rowgroup5')) {
                        $('.slogan .text').addClass('active');
                    }

                }
            });
        });




    });
})(window.jQuery);