/**
 * @author (주)한신정보기술 퍼블리셔팀 xxx
 * @since 2020-xx-xx
 * @version 1.0.0
 */
(function($) {
    'use strict';

    var $window = $(window);

    $(function() {

        $window.on('screen:wide.menu screen:web.menu', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet.menu screen:phone.menu', function(event) {
            window.mode = 'mobile';
        });

        //path
        function bindButtonClick() {
            $('.path li.list .path_btn').off('click').on('click', function() {
                var $this = $(this),
                    $MyParent = $this.parent('li.list'),
                    $OtherParents = $MyParent.siblings('li.list'),
                    $MyLayer = $this.siblings('.layer'),
                    $OtherBtn = $OtherParents.find('button'),
                    $OtherLayer = $OtherParents.find('.layer'),
                    IsActive = $MyParent.is('.active');
                if(!IsActive){
                    $OtherParents.removeClass('active');
                    $OtherBtn.attr('title', '목록열기');
                    $OtherLayer.slideUp();
                    $MyParent.addClass('active');
                    $this.attr('title', '목록닫기');
                    $MyLayer.slideDown();
                } else{
                    $MyParent.removeClass('active');
                    $this.attr('title', '목록열기');
                    $MyLayer.slideUp();
                };
            });
        }

        function handleResize() {
            if ($(window).width() <= 1000) {
                //버튼을 스팬으로 변경
                $('.path li.list .path_btn').each(function() {
                    var $this = $(this);
                    if ($this.is('button')) {
                        var $span = $('<span class="path_btn"><span>' + $this.text() + '</span></span>');
                        $this.replaceWith($span);
                    }
                });
            } else {
                //스팬을 버튼으로 변경하고 이벤트 바인딩
                $('.path li.list .path_btn').each(function() {
                    var $this = $(this);
                    if ($this.is('span')) {
                        var $button = $('<button type="button" title="목록열기" class="path_btn"><span>' + $this.text() + '</span></button>');
                        $this.replaceWith($button);
                    }
                });
                bindButtonClick(); // 이벤트 다시 바인딩
            }
        }

        bindButtonClick();
        $(window).on('resize',handleResize);
        handleResize();

        //sns
        $('.addons .addons_btn.share').on('click', function(){
            var $this = $(this),
                $layer = $this.parent().find('.addons_list'),
                IsActive = $this.is('.active');
            if(!IsActive){
                $this.addClass('active').attr('title', '하위메뉴 닫기');
            } else{
                $this.removeClass('active').attr('title', '하위메뉴 열기');
            }
        });

        $('.addons .close').on('click', function(){
            $('.addons_btn.share').removeClass('active').attr('title', '하위메뉴 열기');
        });

        //top btn
        var $topBtn = $('.top_btn'),
            $footer = $('#footer');

        function checkScroll() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var footerOffsetTop = $footer.offset().top;
            var defaultBottomOffset = windowWidth <= 1000 ? 20 : 40;

            if (scrollTop > 0) {
                $topBtn.addClass('active');
            } else {
                $topBtn.removeClass('active');
            }

            if (scrollTop + windowHeight >= footerOffsetTop + defaultBottomOffset) {
                $topBtn.css('bottom', (scrollTop + windowHeight - footerOffsetTop + defaultBottomOffset) + 'px');
            } else {
                $topBtn.css('bottom', defaultBottomOffset + 'px');
            }
        }

        checkScroll();
        $(window).on('scroll', checkScroll);
        $(window).on('resize', checkScroll);

        $topBtn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 'smooth');
        });

        //bbs
        if($('.bbs').length){
            $('#container').addClass('isBbs');
        }

        $('table.table.responsive').not($('.prettyprint').children()).each(function() {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });

        $(function() {
            //탭메뉴 슬릭
            var $subHead = $('.sub_head'),
                $tabMenu = $subHead.find('.tab_menu'),
                $tabNav = $tabMenu.find('.tab_nav'),
                $tabMenuList = $tabNav.find('.tab_list');


            //탭메뉴
            var $window = $(window),
                $container = $('#container'),
                colgroup = $container.colgroup = {},
                $colgroup = colgroup.$element = $container.find('.colgroup'),
                tabMenu = colgroup.tabMenu = {},
                $tabMenu = tabMenu.$element = $colgroup.find('.tab_menu'),
                $tabNav = tabMenu.$contents = $tabMenu.find('.tab_nav'),
                $tabBtn = tabMenu.$btn = $tabMenu.find('.tab_btn'),
                $tabSelect = tabMenu.$select = $tabMenu.find('.tab_select');

            $tabBtn.on('click.layoutSub', function(event) {
                var $this = $(this);

                $this.closest('.tab_menu').children('.tab_select').removeClass('active').text($this.text());

                //모바일일 때
                if(mode === 'mobile') {
                    $this.closest('.tab_nav').slideUp(250, 'linear');
                }
            });
            $tabSelect.on('click.layoutSub', function(event) {
                var $this = $(this),
                    $tabNav = $this.next('.tab_nav');

                //애니메이션이 끝났을 때
                if(!$tabNav.is(':animated')) {
                    $tabNav.slideToggle(250, 'linear');
                    $this.toggleClass('active');
                }

                $tabMenuList.slick('setPosition');
            });

            //탭메뉴
            $('.tab_menu .tab_select .tab_btn').on('click', function(){
                var $this = $(this),
                    $tab_select = $this.parent('.tab_select'),
                    $tab_nav = $tab_select.siblings('.tab_nav'),
                    IsActive = $tab_nav.is('.tab_open');
                if(!IsActive){
                    $tab_nav.addClass('tab_open');
                } else{
                    $tab_nav.removeClass('tab_open');
                }
            });

            function tabPosition(){
                var activeIndex = $tabMenuList.find(".tab_item.active").closest(".slick-slide").index();
                $tabMenuList.slick('slickGoTo', activeIndex);
            }
            $(window).on('load resize orientationchange', function() {
                $tabMenuList.slick('setPosition');
                tabPosition();
            });

            $window.on('screen:wide.menu screen:web.menu', function(event) {
                window.mode = 'pc';
                $tabMenuList.slick('init');
                $tabNav.show();
                $tabMenuList.slick('setPosition');
            });

            $tabMenuList.slick({
                draggable: false,
                swipe: false,
                touchMove: false,
                cssEase: 'cubic-bezier(1, 0, 0, 1)',
                speed: 250,
                autoplay: false,
                infinite: false,
                playText: '재생',
                pauseText: '정지',
                dots: false,
                arrow: true,
                slidesToShow: 6,
                slidesToScroll : 6,
                responsive: [{
                    breakpoint : 1001,
                    settings : 'unslick'
                }]
            });
        });

        var $container = $('#container'),
            $contents = $('#contents');

        /* 컨텐츠 탭메뉴 */
        var $tab = $contents.find('.tab'),
            tabActiveText = $tab.find('.tab_menu .tab_item.active').text();

        $window.on('load resize', function (){
            $('.cms_tab .tab_select').on('click', function () {
                $(this).parent('.tab').toggleClass('active');
            });
        })

        $tab.each(function(){
            var $this = $(this),
                $tabButton = $this.find('button.tab_button'),
                $tabContent = $this.find('.tab_content');

            $tab.find('.tab_select span').text(tabActiveText);
            $tabButton.on('click', function () {
                var $this = $(this),
                    $parent = $this.parent('.tab_item'),
                    tabButtonText = $this.text(),
                    index = $parent.index();

                $this.parent().addClass('active').siblings().removeClass('active');
                $this.parent().attr('title' ,'선택됨').siblings().removeAttr('title');
                $this.parents('.tab').find('.tab_select span').text(tabButtonText);
                $tabContent.eq(index).addClass('active').siblings().removeClass('active');
            });
        });
        //colbox 자동 높이
        $window.on('resize',function(){
            colboxAutoHeight();
        });
        colboxAutoHeight();
        function colboxAutoHeight(){
            var $collist = $container.find('.col_box');
            $collist.each(function(){
                var $colItem = $(this).find('.col_item');
                $colItem.removeAttr('style');
                var maxHeight = Math.max.apply(null, $colItem.map(function() {
                    return $(this).height();
                }).get());
                if(window.innerWidth > 800) return $colItem.height(maxHeight);
            });
        };

        //스텝 자동 높이
        function stepAutoHeight(){
            var $step = $container.find('.step'),
                $stepList = $step.find('.step_list'),
                $stepItem = $stepList.find('.step_item');

            $stepList.each(function (index, element) {
                if($window.width() > 640){
                    var $element = $(element),
                        $elementStepItem = $element.find('.step_item'),
                        $elementItemLevel = $elementStepItem.find('.level'),
                        height = 0,
                        width = 0,
                        count;
                    if($element.parents('.step')){
                        $($elementStepItem, element).each(function (index){
                            var $this = $(this),
                                thisWidth = $this.find('.step_content').width(),
                                thisHeight = $this.find('.step_content').height();

                            if (thisWidth > width){
                                width = thisWidth;
                            }
                            if (thisHeight > height){
                                height = thisHeight;
                            }

                            count = index + 1;
                        }).height(height);
                    }
                    $element.closest('.step').addClass('length' + count);
                };
            });
        }
        stepAutoHeight();
        $window.on('resize', function(){
            stepAutoHeight();
        });
    });
})(window.jQuery);

/** 프린트 버튼 클릭 시 이벤트 */
function contentsprint(){
    var $contents = $('#contents'),
        ContentsClass = $contents.attr('class');
    var $head = $('head').clone();
    var $contentsClone = $('#contents').clone();    // 프린트 할 특정 영역 복사

    var headHtml = $head[0].innerHTML
    var innerHtml = $contentsClone[0].innerHTML
    var popupWindow = window.open("", "_blank", "width=910,height=800")
    popupWindow.document.write('<!DOCTYPE html>'+
        '<html>'+
        '<head>'+headHtml+'</head>'+
        '<body><div id="contents" class="'+ContentsClass+'">'+innerHtml+'</div></body>'+
        '</html>')

    popupWindow.document.close();
    popupWindow.focus();


    setTimeout(function(){
        popupWindow.print();         // 팝업의 프린트 도구 시작
        popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
    }, 200);
}

function tabMenuOrg(tabid,a,img) {
    var $tab, $tab_btn, $obj, $obj_view;
    var tabid = tabid, num = a, btn_img = img;

    $tab = $(tabid + ' .tab_list  > .tab_item');
    $tab_btn = $(tabid + ' .tab_list > .tab_item > a');
    $obj = $(tabid + ' .tab_content');
    $obj_view = $(tabid + ' .tab_content.n' + num);

    $tab.eq(num - 1).addClass('active');
    $obj_view.show();

    if (btn_img == 'img') {
        var btn = $tab.eq(num - 1).children('a').find("img");
        btn.attr("src", btn.attr("src").replace("_off", "_on"));
    }

    $tab.bind("click", function (event) {
        if (btn_img == 'img') {
            for (var i = 0; i < $tab.size(); i++) {
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src", btn.attr("src").replace("_on", "_off"));
            }
            var active = $(this).parent().attr('class');
            if (active != 'active') {
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src = btn_img_off.src.replace('_off', '_on');
            }
        }

        var this_eq = $tab.index($(this));
        $tab.removeClass('active');
        $tab.eq(this_eq).addClass('active');

        $obj.hide();
        $(tabid + ' .tab_content.n' + (this_eq + 1)).show();

        event.preventDefault();
    });
}
