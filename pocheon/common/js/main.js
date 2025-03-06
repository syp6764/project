// 대표 메인 자주찾는 서비스 반응형 적용
var listLength,
    webLength = Math.ceil($(".srvc_wrap li").length / 10),
    mobileLength = Math.ceil($(".srvc_wrap li").length / 6);
if(navigator.userAgent.indexOf("MSIE 7") > 0 || navigator.userAgent.indexOf("MSIE 8") > 0) {
  $("document").ready(function(){
    //alert("ie7 && ie8");
  });
} else {
  //ie8 이상에서 적용됨
  //메인 사이즈
  $("document").ready(function(){
    if ( $(window).width() > 983){
      webLength = webLength + 1;
      //sub_menu();
    } else {
      listLength = mobileLength;
    }
  });
  var windowWidth = $(window).width();
  $(window).resize(function() {
    if( windowWidth != $(window).width() ) {
      if ( $(window).width() > 983){
        webLength = webLength + 1;
        return false;
      } else {
        listLength = mobileLength;
      }
    }
    windowWidth = $(window).width();
  })
};
//탭메뉴
/*
$.fn.tabMenu = function(options){
  var settings = {

  };
}
*/
/*
jQuery(function(){
  serviceGroup = $(".service_group"),
      tabBtn = $(".service_group").find("button.service_tab"),
      tabCnt = $(".srvc_wrap");
  tabBtn.on("click",function(e){
    console.log("test");
    serviceGroup.not(this).each(function($){
      tabBtn.removeClass("open").siblings(tabCnt).fadeOut(100);
    });
    $(this).addClass("open");
    $(this).siblings(tabCnt).fadeIn(200);
  });
});
*/
/* 메인 탭 컨텐츠 */
$.fn.tabContent = function(options){
  var settings = {
    tabGroup : '',
    tabBtn : '',
    tabCnt : ''
  };
  $.extend(settings, options);
  settings.tabGroup = $(settings.tabGroup);
  settings.tabBtn = $(settings.tabBtn);
  settings.tabCnt = $(settings.tabCnt);
  settings.tabBtn.on("click",function(e){
    //if(settings.tabBtn.hasClass("open")){
      console.log("test");
      settings.tabGroup.not(this).each(function($){
        settings.tabBtn.removeClass("open").siblings(settings.tabCnt).fadeOut(100);
      });
      $(this).addClass("open");
      $(this).siblings(settings.tabCnt).fadeIn(200);
    //}
  });
}

/* 자주찾는 서비스 */
$.fn.serviceRolling = function(options){
  var settings = {
    listAfter : '',
    serviceList : '',
    moveElement : '',
    moveSize  : '',
    animateVal : '',
    topBtn : '',
    downBtn : ''
  };
  $.extend(settings, options);
  settings.serviceList = $(settings.serviceList);
  settings.moveElement = $(settings.moveElement);
  settings.topBtn = $(settings.topBtn);
  settings.downBtn = $(settings.downBtn);

  settings.listAfter = 1;
  settings.animateVal = 0;
  settings.moveSize = settings.moveElement.height();
  //console.log(settings.serviceList + '\n' + settings.moveElement + '\n' + settings.topBtn + '\n' + settings.downBtn + '\n' + settings.listAfter + '\n' + settings.animateVal + '\n' + settings.moveSize + '\n' + mobileLength);

  settings.topBtn.click(function(){
    //console.log("test");
    if(settings.listAfter <= webLength){
      settings.listAfter++;
      settings.animateVal += parseInt(settings.moveSize);
      settings.serviceList.stop().animate({top: settings.animateVal+"px"},200);
    }else{
      return false;
    }
  });
  settings.downBtn.click(function(){
    if(settings.listAfter >= 1){
      settings.listAfter--;
      settings.animateVal -= parseInt(settings.moveSize);
      settings.serviceList.stop().animate({top: settings.animateVal+"px"},200);
      //console.log(settings.serviceList + '\n' + settings.moveElement + '\n' + settings.topBtn + '\n' + settings.downBtn + '\n' + settings.listAfter + '\n' + settings.animateVal + '\n' + settings.moveSize + '\n' + mobileLength);
    }else{
      return false;
    }
  });
}
// 좌우 슬라이딩
$.fn.horizonSlide = function(options){
  var settings = {
    slidePrev : '',
    slideNext : '',
    slideContent : '',
    slideElement : '',
    slideIndex : '',
    slideWidth : '',
    slideView : ''
  };
  $.extend(settings, options);
  settings.slidePrev = $(settings.slidePrev);
  settings.slideNext = $(settings.slideNext);
  settings.slideContent = $(settings.slideContent);
  settings.slideElement = $(settings.slideElement);
  /* settings.slideIndex = Number($(settings.slideIndex));
  settings.slideWidth = Number($(settings.slideWidth));
  settings.slideView = Number($(settings.slideView)); */
  var slideSize = settings.slideElement.size(),
      slideIndex = 1,
      slideWidth = settings.slideElement.width(),
      slideView = 3,
      slidePst = 0;
  //var $clubIdx = 1;
  //var $clubwidth = 305;
  //var $clubview = 4;
  //var $clubSize = $('.recom_list li').size();
  //var $clubpst = 0;

  settings.slidePrev.on("click",function(e) {
    if( slideIndex > 1 ) {
      slidePst = slidePst + slideWidth;
      settings.slideContent.animate({left:slidePst},400);
      slideIndex--;
    }
  });

  settings.slideNext.on("click",function(e) {
    if( slideIndex <= slideSize-slideView ) {
      slidePst = slidePst + -slideWidth;
      settings.slideContent.animate({"left":slidePst},400);
      slideIndex++;
    }
  });
}