(function($) {
	'use strict';

	$(function() {
        var $window = $(window),
            $container = $('#container');

        //검색 셀렉트박스
        var $search = $container.find('.search'),
            $searchSelect = $search.find('.search_select'),
            $selectedBtn =  $searchSelect.find('.selected_btn'),
            $selectList =  $searchSelect.find('.select_list'),
            $selectBtn = $selectList.find('.select_btn');

        $selectedBtn.on('click', function() {
            $selectedBtn.toggleClass('active');

            if ($selectedBtn.hasClass('active')) {
                $selectList.css('display', 'block');
            } else {
                $selectList.css('display', 'none');
            }
        });

        $selectBtn.click(function() {
            var newText = $(this).text();
            $selectedBtn.text(newText);

            $selectList.css('display', 'none');
            $selectedBtn.removeClass('active');
        });

	});
})(window.jQuery);
