(function($) {
	'use strict';
    $(function() {
        var $window = $(window),
            $container = $('#container');

        //스크롤시 상단메뉴 고정
        $window.on('scroll', function() {
            var windowTop = $(this).scrollTop();
            var $header = $('#header');

            if (windowTop > 0) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });

        //비주얼 슬라이드 시작
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualDots = $visual.find('.visual_dots'),
            $visualAuto =  $visual.find('.visual_auto');

        $visualList.slick({
            rows: 1,
            draggable: false,
            infinite: true,
            variableWidth: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            prevArrow: false,
            nextArrow: false,
            appendDots: $visualDots,
            autoArrow: $visualAuto,
            pauseText: '정지',
            playText: '재생',
            fade: true
        });

        var $visualDotsLi = $visualDots.find('ul.slick-dots li'),
            $visualDotsBtn = $visualDotsLi.find('button');

        $visualDotsBtn.append('<svg class="circle" width="54" height="54"><circle class="path" cx="50%" cy="50%" r="26" fill="none" stroke="#FFF" stroke-opacity="0.5" stroke-width="1px"></circle></svg>');

        // 화면 크기에 따라 SVG 속성 변경
        function updateSVGSize() {
            var $svgElement = $('.circle');
            var screenWidth = $(window).width();

            // SVG 크기 변경
            if (screenWidth <= 640) {
                $svgElement.attr('width', '35');
                $svgElement.attr('height', '35');
                $svgElement.find('circle').attr('r', '17');
            } else if (screenWidth <= 1000) {
                $svgElement.attr('width', '43');
                $svgElement.attr('height', '43');
                $svgElement.find('circle').attr('r', '21');
            } else {
                // 기본값으로 복원
                $svgElement.attr('width', '54');
                $svgElement.attr('height', '54');
                $svgElement.find('circle').attr('r', '26');
            }
        }

        // 페이지 로드 및 창 크기 변경 시에도 업데이트 수행
        $(document).ready(function() {
            updateSVGSize(); // 초기화
            $(window).resize(updateSVGSize);
        });

        //정지 버튼 누른경우
        var $visualDotsBtnCircle = $visualDotsLi.find('button .circle');
        $visualAuto.click(function() {
            $visualDotsBtnCircle.toggleClass("pause");
        });
        $visualDotsBtn.click(function() {
            if ($visualDotsBtnCircle.hasClass("pause")) {
                $visualDotsBtnCircle.removeClass("pause");
            }
        });
        //비주얼 슬라이드 끝

        //퀵메뉴 슬라이드 및 탭메뉴 시작
        var $quick = $('.quick'),
            $quickTab = $quick.find('.quick_tab'),
            $tabBtn = $quickTab.find('.tab_btn'),
            $contentList = $quick.find('.cont_list'),
            $contentItem = $contentList.find('.cont_item');

        $tabBtn.on("click", function (){
            var $parent = $(this).parent(),
                $tabContent = $contentList.find('.cont_item'),
                parentIndex = $parent.index(),
                $MyCont = $tabContent.eq(parentIndex),
                $MySlide = $MyCont.find('.quick_list');

            $(this).attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_btn').removeAttr('title');
            $tabContent.eq(parentIndex).addClass('active').siblings().removeClass('active');

            $MySlide.slick('setPosition');
        });

        $contentItem.each(function (){
            var $this = $(this),
                $quickList = $this.find('.quick_list'),
                $quickDots = $this.find('.quick_dots');

            $quickList.on('init', function (event, slick) {
                // 슬라이드의 총 개수가 3개 이하인 경우 $quickDots를 숨김
                if (slick.slideCount <= 3) {
                    $quickDots.css('opacity', 0);
                } else {
                    $quickDots.css('opacity', 1);
                }
            });

            $quickList.slick({
                autoplay : false,
                dots:false,
                appendDots: $quickDots,
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: false,
                arrows: false,
                swipe:false,
                draggable:true,
                responsive: [
                    {
                        breakpoint: 1431,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 1201,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            dots: false,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            swipe: true,
                            dots: true,
                        }
                    }
                ]
            })
        });
        //퀵메뉴 슬라이드 및 탭메뉴 끝

        //교육프로그램 슬라이드 및 탭메뉴 시작
        var $contItem = $('.program .cont_list .cont_item');
        $contItem.each(function(){
            var $this = $(this),
                $programList = $this.find('.program_list'),
                $programPrev = $this.find('.program_prev'),
                $programNext = $this.find('.program_next'),
                $stateBar = $this.find('.state_bar'),
                percent;
            $programList.on('init', function(event, slick, currentSlide, nextSlide) {
                percent = ((slick.currentSlide+1) / (slick.slideCount)) * 100;
                $stateBar.css('width', percent + '%');
            });
            $programList.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                percent = ((nextSlide+1) / (slick.slideCount)) * 100;
                $stateBar.css('width', percent + '%');
            });
            $programList.slick({
                autoplay : true,
                dots : false,
                draggable : false,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 2,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : false,
                arrows : true,
                prevArrow : $programPrev,
                nextArrow : $programNext,
                responsive: [
                    {
                        breakpoint: 801,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                /* 자바스크립트
                if (currentSlide !== nextSlide) {
                    document.querySelectorAll('.slick-center + .slick-cloned').forEach((next) => {
                        // timeout required or Slick will overwrite the classes
                        setTimeout(() => next.classList.add('slick-current', 'slick-center'));
                    });
                }
                */
                // IE 호환성을 고려한 제이쿼리
                if (currentSlide !== nextSlide) {
                    $('.slick-active + .slick-cloned').each(function(index, node) {
                        var $node = $(node);

                        setTimeout(function() {
                            $node.addClass('slick-current');
                            $node.addClass('slick-active');
                        });
                    });
                }
            });;

        });
        if ($('.tab_item.all').hasClass('active')) {
            $('.program_more').hide();
        }
        $('.program .program_tab .tab_list .tab_item button.tab_btn').on('click', function(){
            var $this = $(this),
                $MyTabItem = $this.parent('.tab_item'),
                IsActive = $MyTabItem.is('.active'),
                MyContItemData = $MyTabItem.attr('data-cont'), //?
                $OtherTabItem = $MyTabItem.siblings('.tab_item'),
                $OtherTabBtn = $OtherTabItem.find('button.tab_btn'),
                $contList = $('.program .cont_list'),
                $MyContItem = $contList.find('.cont_item[data-cont="'+MyContItemData+'"]'), //?
                $MyProgramList = $MyContItem.find('.program_list'),
                $OtherContItem = $contList.find('.cont_item').not($MyContItem);
            if(!IsActive){
                $OtherTabItem.removeClass('active');
                $OtherTabBtn.removeAttr('title');
                $OtherContItem.removeClass('active');
                $MyTabItem.addClass('active');
                $this.attr('title', '선택됨');
                $MyContItem.addClass('active');
                $MyProgramList.slick('setPosition');

                // .tab_item.all에 .active 클래스가 추가되면 program_more 버튼을 숨깁니다.
                if ($MyTabItem.hasClass('all')) {
                    $('.program_more').hide();
                } else {
                    $('.program_more').show();
                }
            }
        });
         //교육프로그램 슬라이드 및 탭메뉴 끝

        //공지사항 탭메뉴 시작
        var $newsTab = $container.find('.news'),
            $newsTabItem = $newsTab.find('.tab_item'),
            $newsTabBtn = $newsTabItem.find('.tab_btn'),
            $newsTabContent = $newsTab.find('.cont_list .cont_item');

        $newsTabItem.click(function (event) {
            var $this = $(this),
                tabButtonText = $this.text(),
                index = $newsTabItem.index(this);

            $this.addClass('active').siblings().removeClass('active');
            $newsTabContent.eq(index).addClass('active').siblings().removeClass('active');
        });

        $newsTabBtn.click(function (event) {
            $newsTabBtn.removeAttr('title');
            $(this).attr('title','선택됨').parent().addClass('active').siblings().removeClass('active');
        });
        //공지사항 탭메뉴 끝

        //알림창 팝업 시작
        var $popup = $container.find('.popup'),
            $popupList = $popup.find('.popup_list'),
            $popupPrev =  $popup.find('.popup_prev'),
            $popupNext =  $popup.find('.popup_next'),
            $popupAuto =  $popup.find('.popup_auto'),
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
            autoplaySpeed: 3000,
            prevArrow: $popupPrev,
            nextArrow: $popupNext,
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
        //알림창 팝업 끝

        // 스크롤
        $window.on('load scroll', function (){
            var $rowgroup = $("[class^=\'rowgroup\']"),
                scrollTop = $(window).scrollTop();

            $rowgroup.each(function (index){
                var rowgroupOffset = $(this).offset().top;

                if(rowgroupOffset < scrollTop + 500) {
                    $rowgroup.eq(index).addClass('scroll_effect');
                }
            });
        })

    });
})(window.jQuery);
