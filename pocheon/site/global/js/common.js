(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $header = $('#header'),
            $footer = $('#footer');

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
            $bannerList = $banner.find('.banner_list');

        $bannerList.slick({
            draggable: false,
            infinite: true,
            variableWidth: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            playText: '재생',
            pauseText: '정지',
            autoArrow: $banner.find('.banner_auto'),
            prevArrow: $banner.find('.banner_prev'),
            nextArrow: $banner.find('.banner_next')
        });

        /* 상단으로 */
        var $bodyHtml = $('body,html'),
            $upButton = $footer.find('.up_btn');

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });

        /* 구글 언어 선택 */
        // 번역 도구가 로드된 후에 실행되도록 딜레이
        $(document).ready(function () {
            var intervalId = setInterval(function () {
                var selectBox = $('#google_translate_element select');
                if (selectBox.length) {
                    var option = selectBox.find('option[value=""]');
                    if (option.length) {
                        option.text('Select Language');
                        var selBoxClone = selectBox.closest('#google_translate_element').clone();
                        $('.menu .link_item.language').prepend(selBoxClone.attr('id','google_translate_element2'));
                        selBoxClone.find('select').on('change',function(){
                            selectBox.val($(this).val());
                            var event = new Event('change', { bubbles: true });
                            selectBox[0].dispatchEvent(event);
                        });
                        selectBox.on('change',function(){
                            var thisVal = $(this).val();
                            selBoxClone.find('[value='+thisVal+']').prop('selected',true);
                        });
                        clearInterval(intervalId); // 옵션 변경 후 인터벌 중지
                    }
                }
            }, 100);
        });

        $(document).ready(function() {
            setTimeout(function() {
                $('.select_icon').css('display', 'block');
            }, 300);

        });

    });
})(window.jQuery);
