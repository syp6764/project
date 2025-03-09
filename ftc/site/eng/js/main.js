$(function(){

    var $window = $(window),
        $html = $('html'),
        $container = $('#container');

    //비주얼 효과
    var $visual = $container.find('.visual'),
        $visualTit1 = $visual.find('.visual-tit .tit'),
        $visualTit2 =  $visual.find('.visual-tit .tit2');

    $visual.addClass('scale');
    $visualTit1.addClass('effect');
    $visualTit2.addClass('effect');

    //퀵메뉴 스와이퍼
    var quickSwiper = new Swiper('.quick .swiper', {
        slidesPerView: 3,
        spaceBetween: 0,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.quick .swiper-button-next',
            prevEl: '.quick .swiper-button-prev',
        },
        breakpoints: {
            600: {
                slidesPerView: 4,  //브라우저가 600보다 클 때
            },
            1024: {
                slidesPerView: 5,  //브라우저가 1024보다 클 때
            },
        },
    });

    //배너 스와이퍼
    var bannerSwiper = new Swiper('.banner .swiper', {
        slidesPerView: 2,
        spaceBetween: 0,
        autoplay:{
            delay: 3000,
            disableOnInteraction : false,
        },
        loop: true,
        navigation: {
            nextEl: '.banner .swiper-button-next',
            prevEl: '.banner .swiper-button-prev',
        },
        breakpoints: {
            600: {
                slidesPerView: 4,  //브라우저가 600보다 클 때
            },
            1024: {
                slidesPerView: 6,  //브라우저가 1024보다 클 때
                loop: false,
            },
        },

    });

    const $bannerSwiperPlay = document.querySelector('.banner .swiper-button-play');
    const $bannerSwiperStop = document.querySelector('.banner .swiper-button-stop');

    $bannerSwiperPlay.style.display = "none";

    $bannerSwiperPlay.addEventListener("click", () => {
        bannerSwiper.autoplay.start();
        $bannerSwiperStop.style.display = "";
        $bannerSwiperPlay.style.display = "none";
    });

    $bannerSwiperStop.addEventListener("click", () => {
        bannerSwiper.autoplay.stop();
        $bannerSwiperStop.style.display = "none";
        $bannerSwiperPlay.style.display = "";
    });

});