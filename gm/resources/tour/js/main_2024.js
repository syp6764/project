(function($) {
    'use strict';

    $(function() {
        var $container = $('#container');

        //비주얼 슬라이드
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualPrev =  $visual.find('.visual_prev'),
            $visualNext =  $visual.find('.visual_next'),
            $visualAuto =  $visual.find('.visual_auto'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal = $visual.find('.visual_total'),
            $visualProgress = $visual.find('.visual_progress');

        splitText('.visual_text .sub_title');
        splitText('.visual_text .title');

        $visualList.on('init reInit afterChange',function(){
            const $initialSlide = $visualList.find('.slick-current');
            animateText($initialSlide.find('.sub_title, .title'));
        });
        $visualList.slick({
            rows: 1,
            draggable: false,
            infinite: true,
            variableWidth: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow: $visualPrev,
            nextArrow: $visualNext,
            autoArrow: $visualAuto,
            pauseText: '정지',
            playText: '재생',
            fade: true,
            current: $visualCurrent,
            total: $visualTotal,
            pauseOnFocus: false,
            pauseOnHover: false,
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


        // 텍스트를 한 글자씩 분리하는 함수
        function splitText(selector) {
            $(selector).each(function () {
                const text = $(this).text();
                let html;

                if (window.innerWidth <= 640) {
                    // 화면 너비가 640px 이하일 경우: 공백 전후로 나눔
                    html = text.split(' ').map((word) => {
                        return `<span>${word}</span>`;
                    }).join('<span>&nbsp;</span>');
                } else {
                    // 화면 너비가 641px 이상일 경우: 한 글자씩 나눔
                    html = text.split('').map((char) => {
                        if (char === ' ') {
                            return `<span>&nbsp;</span>`;
                        }
                        return `<span>${char}</span>`;
                    }).join('');
                }

                $(this).html(html);
            });
        }

        // 텍스트 애니메이션 트리거
        function animateText($element) {
            if($element.length < 1) return;
            $element.find('span').each(function(idx){
                var $this = $(this);
                setTimeout(function(){
                    $this.addClass('animate');
                },50*idx)
            })
        }

        // $visualList.on('init reInit',function(e, slick){
        //     // 첫 슬라이드 초기 애니메이션 실행
        //     const $initialSlide = $visualList.find('.slick-current');
        //     animateText($initialSlide.find('.sub_title, .title'));
        // })

        // 슬라이드 전환 시 애니메이션 실행
        $visualList.on('beforeChange', function(event, slick, current, next) {
            const $currentSlide = $(slick.$slides[current]);
            $currentSlide.find('.sub_title span, .title span').removeClass('animate');
        });


        //문화예술공연 슬라이드
        var $poster = $container.find('.poster'),
            $posterContList = $poster.find('.post_cont_slide .cont_list'),
            $postImgSlide = $poster.find('.post_img_slide'),
            $firstImg = $postImgSlide.find('.img_list .img_item:first-child img'),
            $posterImgList = $poster.find('.post_img_slide .img_list'),
            mobileImgHtml = `
                <div class="post_m_img">
                    <a href="#n">
                        <img src="${$firstImg.attr('src')}" alt="${$firstImg.attr('alt')}" class="current_img" />
                    </a>
                    <a href="#n">
                        <img src="${$firstImg.attr('src')}" alt="${$firstImg.attr('alt')}" class="next_img" />
                    </a>
                </div>
            `,
            $posterPrev =  $poster.find('.poster_prev'),
            $posterNext =  $poster.find('.poster_next');

        $postImgSlide.append(mobileImgHtml);

        $posterContList.slick({
            rows: 1,
            draggable: false,
            infinite: true,
            variableWidth: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: false,
            autoplay: false,
            fade: true,
            arrow: false,
            speed: 1000,
            asNavFor: $posterImgList,
            pauseOnFocus: false,
            pauseOnHover: false,
            responsive: [
                {
                    breakpoint: 641,
                    settings: {
                        asNavFor: false,
                    }
                }
            ]
        });

        $posterImgList.on('init',function(event, slick){
            $poster.find('.post_m_img a').attr('href', slick.$slides.eq(0).find('a').attr('href'));
        }).slick({
            rows: 1,
            draggable: false,
            infinite: true,
            variableWidth: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            prevArrow: $posterPrev,
            nextArrow: $posterNext,
            asNavFor: $posterContList,
            pauseOnFocus: false,
            pauseOnHover: false,
            speed: 1000,
            responsive: [
                {
                    breakpoint: 641,
                    settings: {
                        draggable: true,
                        variableWidth: false,
                        slidesToShow: 3,
                        swipeToSlide: true,
                        initialSlide: 1,
                        asNavFor: false,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        draggable: true,
                        variableWidth: false,
                        slidesToShow: 2,
                        swipeToSlide: true,
                        initialSlide: 1,
                        asNavFor: false,
                    }
                }
            ]
        }).on('beforeChange',function(event, slick, currentIdx, nextIdx){
            if(window.innerWidth <= 640) $posterContList.slick('slickGoTo',nextIdx-1);
            PostSlckSetPosition($(this), currentIdx, nextIdx);

            var $nextSlide = $posterImgList.find('.slick-slide[data-slick-index="' + (nextIdx-1) + '"]'),
                $nextImg = $nextSlide.find('img'),
                $postMImgContainer = $('.post_m_img'),
                $currentImg = $postMImgContainer.find('.current_img'),
                $nextImgElement = $postMImgContainer.find('.next_img');

            $nextImgElement.attr('src', $nextImg.attr('src')).attr('alt', $nextImg.attr('alt'));
            $nextImgElement.addClass('visible');

            setTimeout(function () {
                $currentImg.attr('src', $nextImgElement.attr('src')).attr('alt', $nextImgElement.attr('alt'));
                $nextImgElement.removeClass('visible');
            }, 500);

        }).on('click', '.img_item > a', function (e) {

            var thisIdx = parseInt($(this).closest('.slick-slide').attr('data-slick-index')),
                activeIdx = parseInt($posterImgList.find('.img_item.slick-current').prev().attr('data-slick-index'));

            if (window.innerWidth <= 640) {
                if (thisIdx !== activeIdx) {
                    e.preventDefault();
                    $posterImgList.slick('slickGoTo', thisIdx+1);
                }
            }
            // var $thisSlide = $(this).closest('.img_item');
            // var $currentSlide = $posterImgList.find('.img_item.slick-current');
            //
            // // 현재 슬라이드가 아닌 경우 이동 방지
            // if ($(window).width() <= 640) {
            //     if (!$thisSlide.is($currentSlide)) {
            //         e.preventDefault();
            //         $posterImgList.slick('slickGoTo', $thisSlide.data('slick-index'));
            //     }
            // }

        }).on('afterChange',function(event, slick, currentIdx){

            var $this = $(this),
                $clonedSlides = $this.find('.slick-cloned'),
                $allSlides = $this.find('.slick-slide'),
                $currentSlide = $this.find('.slick-slide[data-slick-index="' + currentIdx + '"]');

                $poster.find('.post_m_img a').attr('href', slick.$slides.eq(currentIdx).find('a').attr('href'));

            if ($clonedSlides.hasClass('slick-current')) {
                $clonedSlides.removeClass('slick-current');
                $allSlides.css('transition', 'none');
                $currentSlide.css('transition', 'none').addClass('slick-current');
                $this.slick('setPosition');
                $allSlides.removeAttr('style');
            }

        });

        $(window).on('resize', function () {
            setTimeout(function (){
                $posterImgList.slick('setPosition');
            },300);

        });

        function PostSlckSetPosition($slider, current, next){
            if (window.innerWidth <= 640) return;

            var $track = $slider.find('.slick-track'),
                total = $slider[0].slick.slideCount - 1,
                activeOuter = $slider.find('.slick-slide.slick-current').outerWidth(true),
                defaultOuter = $slider.find('.slick-slide:not(.slick-current)').outerWidth(true),
                dirctChk;

            if(next > current){
                if(current === 0 && next === total) dirctChk = false;
                else dirctChk = true;
            }else{
                if(current === total && next === 0) dirctChk = true;
                else dirctChk = false;
            }

            setTimeout(function(){
                var $next = $slider.find('.slick-slide[data-slick-index="'+(current+(dirctChk?1:-1))+'"]'),
                    trackLeft = $track.offset().left - ($next.offset().left - (activeOuter-defaultOuter));
                $slider.find('.slick-slide').removeClass('slick-current');
                $next.addClass('slick-current');
                if(!dirctChk) return;
                $track.css('transform','translate('+trackLeft+'px, 0)');

                // setTimeout(function(){
                //     var $next = $slider.find('.slick-slide[data-slick-index="'+next+'"]'),
                //         trackLeft = $track.offset().left - $next.offset().left;
                //     $track.css('transform','translate('+trackLeft+'px, 0)');
                //     $slider.slick('setPosition');
                // },$slider.slick('slickGetOption','speed'));
            });
        }




        //모바일 post_m_img 스와이프 제어
        var touchStartX = 0;
        var touchEndX = 0;
        var $postMImg = $('.post_m_img');

        // 터치 시작
        $postMImg.on('touchstart', function(e) {
            touchStartX = e.originalEvent.changedTouches[0].screenX; // 터치 시작 X 좌표
        });

        // 터치 끝
        $postMImg.on('touchend', function(e) {
            touchEndX = e.originalEvent.changedTouches[0].screenX; // 터치 종료 X 좌표
            handleSwipeGesture();
        });

        // 스와이프 방향 처리
        function handleSwipeGesture() {
            if (touchStartX > touchEndX) {
                // 왼쪽으로 스와이프
                $posterImgList.slick('slickNext');  // 다음 슬라이드로 이동
            }
            if (touchStartX < touchEndX) {
                // 오른쪽으로 스와이프
                $posterImgList.slick('slickPrev');  // 이전 슬라이드로 이동
            }
        }



    });
})(window.jQuery);