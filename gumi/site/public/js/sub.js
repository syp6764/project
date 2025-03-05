(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

		$window.load(function(){
			$('.sub_visual').addClass('active');
		});

        //cms 탭메뉴
        var $tab = $container.find('.tab'),
            $tabMenu = $tab.find('.tab_menu'),
            $tabSelect = $tabMenu.find('.tab_select');

        $tabSelect.on('click', function(){
            var $this = $(this);

            if(!$this.parent().is('.active')){
                $this.attr('title','목록닫기')
                    .parent().addClass('active')
                    .end().next().slideDown('250');
            } else{
                $this.attr('title','목록열기')
                    .parent().removeClass('active')
                    .end().next().slideUp('250');
            }
        });

        //컨텐츠 탭메뉴
        $tab.each(function(index, element){
            var $tabMenu = $(element).find('.tab_menu'),
                $tabList = $(element).find('.tab_list'),
                $tabBtn = $(element).find('.tab_list.n1 > .tab_item > button.tab_button'),
                tabAllChk = $tabBtn.is('.tab_all'),
                $tabContent = $(element).find('.tab_content');

            var liLength = $tabMenu.find('.tab_list.n1 > .tab_item').length;
            $tabList.addClass('divide' + liLength);

            $tabBtn.click(function () {
                var $this = $(this),
                    index = $tabBtn.index(this),
                    tabButtonText = $this.text(),
                    IsTabAll = $this.is('.tab_all'),
                    $tabPanel = $this.parents('.tab_panel'),
                    $tabMenu = $this.parents('.tab_menu');

                $this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
                $this.parents('.tab').find('.tab_select span').text(tabButtonText);
                $tabPanel.attr('class','tab_panel').addClass('active' + (index + 1));

                if (tabAllChk){
                    if (IsTabAll) {
                        $tabContent.addClass('active');
                    } else {
                        $tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
                    }
                } else if (!tabAllChk){
                    $tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
                }
                if ($window.width() <= 800) {
                    $tabMenu.removeClass('active');
                    $tabPanel.slideUp('250');
                }
                if ($window.width() <= 800 && IsTabAll) {
                    $tabMenu.removeClass('active');
                    $tabPanel.slideUp('250');
                };

                colboxAutoHeight();

            });
        });

		// /* 컨텐츠 탭메뉴 */
		// var $tab = $contents.find('.tab'),
		// 	$tabButton = $tab.find('button.tab_button'),
		// 	$tabContent = $tab.find('.tab_content');
        //
		// $('.tab_select').click(function () {
		// 	$(this).parent('.tab').toggleClass('active');
		// });
        //
		// $tabButton.click(function (event) {
		// 	var $this = $(this),
		// 		tabButtonText = $this.text(),
		// 		index = $tabButton.index(this);
        //
		// 	$this.parent().addClass('active').siblings().removeClass('active');
		// 	$this.parents('.tab').find('.tab_select span').text(tabButtonText);
		// 	$tabContent.eq(index).addClass('active').siblings().removeClass('active');
		// });

		/* 스텝(가로) */
		function stepAutoHeight(){
			var $step = $container.find('.step.width'),
				$stepList = $step.find('.step_list'),
				$stepTitle = $step.find('.step_title'),
				$stepText = $step.find('.step_text');

			//초기화
			$stepTitle.removeAttr('style', 'height');
			$stepText.removeAttr('style', 'height');

			$stepList.each(function (index, element) {
				var $element = $(element),
					titleMinHeight = 52, //기본 제목 높이
					textMinHeight = 95; //기본 텍스트 높이

				$element.find('li').each(function (index, element) {
					var $element = $(element),
						titleHeight = $element.find('.step_title').height(),
						textHeight = $element.find('.step_text').height();

					//제목 최고높이
					if (titleHeight > titleMinHeight) {
						titleMinHeight = titleHeight;
					}

					//텍스트 최고높이
					if (textHeight > textMinHeight) {
						textMinHeight = textHeight;
					}
				});

				$element.find('.step_title').height(titleMinHeight);
				$element.find('.step_text').height(textMinHeight);
			});

		}
		stepAutoHeight();

		function boxinfoHeightCheck(){

			var $boxinfo = $container.find('.box.info');

			//초기화
			$boxinfo.removeClass('over');

			$boxinfo.each(function (index, element) {
				var $element = $(element),
					minHeight = 64,
					outerHeight = $element.outerHeight();

				$element[(minHeight < outerHeight) ? 'addClass' : 'removeClass']('over');
				/*
				if(minHeight < outerHeight){
					$element.addClass('over');
				}else{
					$element.removeClass('over');
				}
				*/
			});

		}
		boxinfoHeightCheck();

		$window.on('resize', function () {
			clearTimeout(debounce);
			debounce = setTimeout(function (){
				stepAutoHeight();
				boxinfoHeightCheck();
			}, 50);
		});


		// 반응형 테이블
		var $tableResponsive = $container.find('.table.responsive');

		$tableResponsive.each(function(index, element) {
			var $element = $(element),
				rowdivIs = $element.find('td, th').is('[rowdiv]'),
				theadLength = $element.find('thead').length;

			if(rowdivIs == false && !theadLength == 0){
				$element.find('tbody th, tbody td').each(function(index, element) {
					var $this = $(element),
						thisIndex = $this.index(),
						theadText = $this.parents('tbody').siblings('thead').find('th').eq(thisIndex).text();

					$this.attr('data-content', theadText);
				});

				$element.find('tfoot th, tfoot td').each(function(index, element) {
					var $this = $(element),
						thisIndex = $this.index(),
						theadText = $this.parents('tfoot').siblings('thead').find('th').eq(thisIndex).text();

					$this.attr('data-content', theadText);
				});
			}
		});

        //셀렉트박스 디자인
        $('.style_select_box .search_select').on('click', function (){
            var $this = $(this),
                $MyParent = $this.parent('.style_select_box'),
                MyParentIsActive = $MyParent.is('.active'),
                $MyLayer = $this.siblings('.search_list');

            if(!MyParentIsActive){
                $MyParent.addClass('active');
                $this.attr('title','목록닫기');
                $MyLayer.slideDown();
            } else {
                $MyParent.removeClass('active');
                $this.attr('title','목록열기');
                $MyLayer.slideUp();
            }
        });

        //레이어팝업
        $('.popup_btn').click(function (){
            $(this).siblings().addClass('on');
        });
        $('.popup_close').click(function (){
            $('.popup').removeClass('on');
            $('.popup_btn').focus();
        });

	});
})(window.jQuery);
