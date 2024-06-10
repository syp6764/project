(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');

        //포토게시판 상단 슬릭
        var $photo = $container.find('.gallery_photo .photo'),
            $photoList = $photo.find('.photo_list'),
            $photoPrev = $photo.find('.photo_prev'),
            $photoNext = $photo.find('.photo_next'),
            $photoAuto = $photo.find('.photo_auto');

        $photoList.slick({
            rows: 1,
            draggable: false,
            infinite: false,
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: $photoPrev,
            nextArrow: $photoNext,
            autoArrow: $photoAuto,
            pauseText: '정지',
            playText: '재생',
            centerMode: true
        });
    });
})(window.jQuery);
