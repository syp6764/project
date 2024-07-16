(function($) {
    'use strict';
    $(function() {
        var $window = $(window),
            $container = $('#container');

        //통합로그인 탭메뉴 시작
        var $login = $container.find('.form_box .form_wrap'),
            $loginTab = $container.find('.login_tab'),
            $loginTabItem = $loginTab.find('.tab_item'),
            $loginTabBtn = $loginTabItem.find('.tab_btn'),
            $loginTabContent = $login.find('.login_cont');

        $loginTabItem.click(function (event) {
            var $this = $(this),
                tabButtonText = $this.text(),
                index = $loginTabItem.index(this);

            $this.addClass('active').siblings().removeClass('active');
            $loginTabContent.eq(index).addClass('active').siblings().removeClass('active');
        });

        $loginTabBtn.click(function (event) {
            $loginTabBtn.removeAttr('title');
            $(this).attr('title','선택됨').parent().addClass('active').siblings().removeClass('active');
        });
        //통합로그인 탭메뉴 끝

        //아이디,비밀번호 찾기 탭메뉴 시작
        var $find = $container.find('.form_box.find .form_wrap .login_cont'),
            $findTab = $container.find('.find_tab'),
            $findTabItem = $findTab.find('.tab_item'),
            $findTabBtn = $loginTabItem.find('.tab_btn'),
            $findTabContent = $login.find('.find_cont');

        $findTabItem.click(function (event) {
            var $this = $(this),
                tabButtonText = $this.text(),
                index = $findTabItem.index(this);

            $this.addClass('active').siblings().removeClass('active');
            $findTabContent.eq(index).addClass('active').siblings().removeClass('active');
            $('h2.title2.n6').text(function(_, text) {
                return text === '아이디 찾기' ? '비밀번호 찾기' : '아이디 찾기';
            });
        });

        $findTabBtn.click(function (event) {
            $findTabBtn.removeAttr('title');
            $(this).attr('title','선택됨').parent().addClass('active').siblings().removeClass('active');
        });
        //아이디,비밀번호 찾기 탭메뉴 끝

        //약관동의 아코디언 시작
        $('.accordion_item .title_wrap .accordion_btn').on('click', function() {
            var $this = $(this),
                $Title = $this.parent('.title_wrap'),
                $Item = $Title.parent('.accordion_item'),
                $Layer = $Title.siblings('.text_wrap'),
                IsActive = $Item.is('.active');
            if(!$Item.closest('.accordion').hasClass('open')) {
                if (!IsActive) {
                    if ($('body#eng').length) {
                        $this.addClass('active').attr("title", "close");
                    } else {
                        $this.addClass('active').attr("title", "닫기");
                    }
                    $Item.addClass('active');
                    $Layer.stop().slideDown();
                } else {
                    if ($('body#eng').length) {
                        $this.removeClass('actvie').attr("title", "open");
                    } else {
                        $this.removeClass('actvie').attr("title", "열기");
                    }
                    $Item.removeClass('active');
                    $Layer.stop().slideUp();
                }
            }
        });
        //약관동의 아코디언 끝

        //약관 동의
        $('.check_all').click(function(){
            if($('.check_all').prop("checked")){
                $('.check').prop("checked", true);
            } else{
                $('.check').prop("checked", false);
            }
        });
        $('.check').click(function(){
            if($("input[name='chk']:checked").length == 3){
                $('.check_all').prop("checked", true);
            } else{
                $('.check_all').prop("checked", false);
            }
        });

    });
})(window.jQuery);
