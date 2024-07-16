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

		/* breadcrumbs*/
		var $breadcrumbs = $container.find('.breadcrumbs'),
			$breadcrumbsItem = $breadcrumbs.find('.breadcrumbs_list'),
			$breadcrumbsAnchor = $breadcrumbs.find('.breadcrumbs_anchor'),
			$breadcrumbsLayer = $breadcrumbs.find('.layer');

		$breadcrumbsAnchor.on('click', function (event) {
			var $this = $(this);
			event.stopPropagation();
			// event.preventDefault();
			if ($this.parent().hasClass('active') === true) {
				$this.parent().removeClass('active');
				$this.parent($breadcrumbsItem).find('.layer').slideUp('250');
			} else {
				$this.parent($breadcrumbsItem).addClass('active').siblings().removeClass('active');

				$breadcrumbsLayer.slideUp('250');
				$this.parent($breadcrumbsItem).find('.layer').slideDown('250');
			}
			if(windowWidth > 1000){
				window.mode = 'pc';
			}
		});



		/* 컨텐츠 탭메뉴 */
		var $tab = $contents.find('.template_tab');

		$window.on('load resize', function (){
			$('.template_tab .tab_select').on('click', function () {
				$(this).parent('.template_tab').toggleClass('active');
			});
		})

		$tab.each(function(){
			var $this = $(this),
				$tabButton = $this.find('button.tab_button'),
				$tabContent = $this.find('.tab_content');

			$tabButton.on('click', function () {
				var $this = $(this),
					$parent = $this.parent('.tab_item'),
					tabButtonText = $this.text(),
					index = $parent.index();

				$this.parent().addClass('active').siblings().removeClass('active');
				$this.parents('.template_tab').find('.tab_select span').text(tabButtonText);
				$tabContent.eq(index).addClass('active').siblings().removeClass('active');
			});
		});

		/* var $tabType1 = $container.find('.template_tab.type1'),
             $tabSelect = $tabType1.find('.tab_select'),
             $tabItem = $tabType1.find('.tab_item');

         $(document).ready(function(){
             if($(window).width() < 641){
                 $tabSelect.each(function (){
                     $(this).on('click', function(event) {
                         $(this).next('.tab_panel').stop().slideToggle('250');
                     });
                 });
             }
         });*/


		/* 스텝(가로) */
		function stepAutoHeight(){
			var $step = $container.find('.step'),
				$stepList = $step.find('.step_list'),
				$stepTitle = $step.find('.step_title'),
				$stepText = $step.find('.step_text');

			//초기화
			$stepTitle.removeAttr('style', 'height');
			$stepText.removeAttr('style', 'height');

			$stepList.each(function (index, element) {
				var $this = $(this),
					$parent = $this.parent('.step'),
					$element = $(element),
					titleMinHeight = 18, //기본 제목 높이
					textMinHeight = 15; //기본 텍스트 높이


				if ( $window.width() < 800 ){
					titleMinHeight = 15;
					textMinHeight = 12;
				} if ( $window.width() < 640 ) {
					titleMinHeight = 12;
					textMinHeight = 10;
				}

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

		$window.on('load resize', function(){
			stepAutoHeight();
		});

		/* 반응형 테이블 */
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

		/* 아코디언 열고 닫기*/
		$('.accordion_item .title_wrap .accordion_btn').on('click', function() {
			var $this = $(this),
				$Title = $this.parent('.title_wrap'),
				$Item = $Title.parent('.accordion_item'),
				$Layer = $Title.siblings('.text_wrap'),
				IsActive = $Item.is('.active');
			if(!$Item.closest('.accordion').hasClass('open')){
				if(!IsActive){
					if($('body#eng').length){
						$this.addClass('active').attr("title","close");
					}else{
						$this.addClass('active').attr("title","닫기");
					}
					$Item.addClass('active');
					$Layer.stop().slideDown();
				} else {
					if($('body#eng').length){
						$this.removeClass('actvie').attr("title","open");
					}else{
						$this.removeClass('actvie').attr("title","열기");
					}
					$Item.removeClass('active');
					$Layer.stop().slideUp();
				}
			}
		}).eq(0).trigger('click');

		/*계산기 팝업*/
		$('.calculator_open.calc').on('click', function() {
			$('.popup.calc').addClass('active');
			$html.addClass('dimded').removeClass('menu_open');
			$('body').removeClass('menu_open');
		});

		$('.calc_hide').on('click', function() {
			$('.popup.calc').removeClass('active');
			$html.removeClass('dimded');
		});
		$('.calc_content .btn.close').on('click', function() {
			$('.popup.calc').removeClass('active');
			$html.removeClass('dimded');
		});

		/*이자계산기팝업*/
		$(document).ready(function() {
			$('.calculator_open.interest').on('click', function() {
				$('.popup.interest').addClass('active');
				$html.addClass('dimded').removeClass('menu_open');
				$('body').removeClass('menu_open');
			});
			$('.calc_hide.interest').on('click', function() {
				$('.popup.interest').removeClass('active');
				$html.removeClass('dimded');
			});
			$('.calc_content .btn.close.interest').on('click', function() {
				$('#interest_popup .popup').removeClass('active');
				$html.removeClass('dimded');
			});
		});
		/* value값 수치써지면 컬러바뀌기 */
		$(".p-input.number").each(function() {
			if ($(this).val() === "0") {
				$(this).addClass("inactive");
			}
		});
		$(".p-input.number").on("input", function() {
			if ($(this).val() !== "0") {
				$(this).removeClass("inactive");
			} else {
				$(this).addClass("inactive");
			}
		});


	});
})(window.jQuery);
