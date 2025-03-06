function pc_menu(e){ //PC 메뉴
  //메뉴 변수선언
  var localNav = $(".lnb_wrap"),/* .lnb_wrap */
  header = $("#header"),
      topMenu = $(".top1menu"),/* topmenu */
      topDepth1 = $(".depth1"),/* 1차메뉴 li */
      topDepth1_ti = $(" .depth1_ti"),/* 1차메뉴 앵커 */
      topDepth2_wrap = $(".top2m"),/* 2차메뉴 wrap */
      topDepth2Menu = $(".depth2"),
      topLastMenu = $(".top1menu li:last-child div.depth2_wrap > ul > li:last-child"),/* 상단메뉴 전체중 맨 마지막 메뉴 변수 */
      bodyHeight = $("body").height(),
      menuMask = $(".black_wrap").css({height:bodyHeight});

  //스마트기기에서 적용되던 이벤트 제거 및 초기화
  $("html").css({overflow:"visible"});
  $("body").css({overflow:"visible",height:"inherit"});
  localNav.css({right:"inherit"});
  topDepth1.unbind();
  topDepth1_ti.unbind();
  topDepth1_ti.removeClass("on").next(topDepth2_wrap).stop().hide();// 모바일에서 활성화 되었던 메뉴 닫기
  menuMask.hide();
  // 이벤트 제거 및 초기화 끝

  topDepth1_ti.on("mouseenter focusin",function(){
    var topDepth2_height = $(this).next(topDepth2_wrap).height();
	header.css("z-index","50");
    $(this).addClass("on").next(topDepth2_wrap).stop().slideDown(200).find(topDepth2Menu).css({"min-height":topDepth2_height});
    $(this).parent().siblings().children(topDepth1_ti).removeClass("on");
    $(this).parent().siblings().find(topDepth2_wrap).stop().slideUp(100).find(topDepth2Menu).css({"min-height":"inherit"});
     menuMask.fadeIn(200);
  });
  topMenu.on("mouseleave",function(){
    topDepth1_ti.removeClass("on");
    topDepth2_wrap.stop().slideUp(100);
    topDepth2Menu.css({"min-height":"inherit"});
    menuMask.fadeOut(200);
	header.css("z-index","initial");
  });
  topLastMenu.on("focusout",function(){
    $(this).parent().parent().parent().parent().slideUp(100).siblings().removeClass("on");
    topDepth2Menu.css({"min-height":"inherit"});
    menuMask.fadeOut(200);
	header.css("z-index","initial");
  });
  //포커스가 마지막 메뉴를 빠져나왔을 때 펼쳐진 메뉴 가림.
}
function pc_menu_all(e){ //PC 메뉴
  //메뉴 변수선언
  var localNav = $(".lnb_wrap"),/* .lnb_wrap */
    topMenu = $(".top1menu"),/* topmenu */
    topDepth1 = $(".depth1"),/* 1차메뉴 li */
    topDepth1_ti = $(".depth1_ti"),/* 1차메뉴 앵커 */
    topDepth2_wrap = $(".top2m"),/* 2차메뉴 wrap */
    topDepth2menu = $(".menu_bg"),
    topDepth2 = $(".depth2"),
    topLastMenu = $(".top1menu li:last-child div.depth2_wrap > ul > li:last-child");/* 상단메뉴 전체중 맨 마지막 메뉴 변수 */
  //bodyHeight = $("body").height(),
  //menuMask = $(".black_wrap").css({height:bodyHeight});

  //스마트기기에서 적용되던 이벤트 제거 및 초기화
    $("html").css({overflow:"visible"});
  $("body").css({overflow:"visible",height:"inherit"});
  localNav.css({right:"inherit"});
  topDepth1.unbind();
  topDepth1_ti.unbind();
  topDepth1_ti.removeClass("on").next(topDepth2_wrap).stop().hide();// 모바일에서 활성화 되었던 메뉴 닫기
  //menuMask.hide();
  // 이벤트 제거 및 초기화 끝

  topMenu.on("mouseenter focusin", function(){
    topDepth2_wrap.fadeIn(100);
  });
  topDepth1_ti.on("mouseenter focusin",function(){
    var topDepth2_height = $(this).next(topDepth2_wrap).height();
    //$(this).addClass("on").next(topDepth2_wrap).find(topDepth2).css({"min-height":topDepth2_height});
    $(this).parent().siblings().children(topDepth1_ti).removeClass("on");
    //$(this).parent().siblings().find(topDepth2_wrap).find(topDepth2).css({"min-height":"inherit"});
    //menuMask.fadeIn(200);
  });
  topDepth2menu.on("mouseenter focusin",function(){
    $(this).parent().siblings().addClass("on");
    $(this).parent().parent().siblings().find(topDepth1_ti).removeClass("on");
  });
  topMenu.on("mouseleave",function(){
    topDepth1_ti.removeClass("on");
    topDepth2_wrap.stop().fadeOut(100);
    topDepth2.css({"min-height":"inherit"});
    //menuMask.fadeOut(200);
  });
  topLastMenu.on("focusout",function(){
    topDepth2_wrap.fadeOut();
    topDepth1_ti.removeClass("on");
  });
  //포커스가 마지막 메뉴를 빠져나왔을 때 펼쳐진 메뉴 가림.
}

var isMobileResizingMenu = false;//모바일 메뉴가 활성화된 상태에서 화면 스크롤이나 터치할 경우 세로 사이즈가 리사이징되어 모바일 메뉴 비활성화되는 오류 및 함수 중복 호출을 막아줌
function mobile_menu(e){ //모바일메뉴
  //메뉴 변수선언
  var lnbBtn = $(".m_menu_btn"),/* mobile menu active Button */
      localNav = $(".lnb_wrap"),/* lnb local navigation bar pc랑 공통 변수 */
      topMenu = $(".top1menu"),/* topmenu pc랑 공통 변수 */
      topDepth1 = $(".depth1"),/* 1차메뉴 li pc랑 공통 변수 */
      topDepth1_ti = $(" .depth1_ti"),/* 1차메뉴 앵커 pc랑 공통 변수 */
      topDepth2_wrap = $(".top2m").css({height:"auto"}),/* 2차메뉴 wrap pc랑 공통 변수 */
      topDepth2Menu = $(".depth2"),/* pc랑 공통 변수 */
      topDepth2_ti = $(".depth2").find(" > li").find(" > a"),
      topDepth3 = $(".depth3"),/* 3차메뉴 */
      srcBtn = $(".src_btn"),
      menuMask = $(".black_wrap");/* pc랑 공통 변수*/
  //PC적용되던 이벤트 제거
  localNav.css({right:"inherit"});
  topDepth1_ti.parent().siblings().children(topDepth1_ti).removeClass("open");
  topDepth2_wrap.hide().removeClass("open").parent().removeClass("open");// 활성화 되었던 메뉴 닫기
  topDepth2Menu.css({height:"inherit"});
  $("body").off("mouseenter",topDepth1_ti,pc_menu);
  menuMask.off();
  topMenu.off().removeClass("clearfix");
  topDepth1_ti.off();
  topDepth1.off();
  // 이벤트 제거 및 초기화 끝

  if ( !isMobileResizingMenu ) {//위에서 선언한 모바일 메뉴 함수를 실행하기 위한 변수를 비교하여 조건에 맞을 경우 모바일 함수 호출
    isMobileResizingMenu = true;//함수를 호출한 후엔 반드시 값을 변경해줘야함. 그렇지 않으면 세로 리사이징 시 모바일 함수 중복 호출됨.
    var stat = true;
    lnbBtn.click(function(){
      if(stat){
        var winHeight = $(window).innerHeight();
        $(this).addClass("active").removeClass("inactive").children("em").text("닫기");
        $("html,body").css({overflow:"hidden",height:winHeight});
        menuMask.fadeIn(200);
        topMenu.animate({right:"0px"},300);
        srcBtn.css({"z-index":"20"});
        stat = false;
      }else if(stat == false){
        $(this).addClass("inactive").removeClass("active").children("em").text("메뉴");
        $("html,body").css({overflow:"visible",height:"inherit"});
        topMenu.animate({right:"-240px"},300);
        topDepth1_ti.removeClass("open");
        topDepth2_wrap.slideUp(100);
        menuMask.fadeOut(200);
        srcBtn.css({"z-index":"31"});
        stat = true;
      }
    });
  }
  topDepth1_ti.on("click",function(e){
    event.preventDefault();
    if($(this).hasClass("open")){
      $(this).removeClass("open").siblings(topDepth2_wrap).slideUp(100);
    }else{
      topMenu.not(this).each(function($){
        topDepth1_ti.removeClass("open").siblings(topDepth2_wrap).slideUp(100);
      });
      $(this).addClass("open");
      $(this).siblings(topDepth2_wrap).slideDown(200);
    }
  });
  topDepth2_ti.on("click",function(e){
    var depth3Length = $(this).next(topDepth3).length;
    if(depth3Length > 0){
      event.preventDefault();
      if($(this).hasClass("depth2_open")){
        $(this).removeClass("depth2_open").next(topDepth3).stop().slideUp(100);
      }else{
        topMenu.not(this).each(function($){
          topDepth2_ti.removeClass("depth2_open").next(topDepth3).stop().slideUp(100);
        });
        $(this).addClass("depth2_open");
        $(this).next(topDepth3).stop().slideDown(200);
      }
    }
  });
};
jQuery(function($) {
  //다국어 홈페이지 선택
  $(".language_btn").click(function () {
    $(this).toggleClass("open").next().slideToggle(100);
  });
  //통합검색
  var lnbWrap = $(".lnb_wrap"),
      searchWrap = $(".search_wrap"),
      srcBtn = $(".src_btn"),
      srcArea = $(".search_detail").hide(),
      menuMask = $(".black_wrap"),
      winHeight = $(window).innerHeight(),
      stat = true;
  srcBtn.click(function(){
    if(stat){
      $(this).addClass("on");
      $("html,body").css({overflow:"hidden",height:winHeight});
      menuMask.fadeIn(200);
      srcArea.slideDown(200);
      lnbWrap.css({"z-index":"inherit"});
      searchWrap.css({"z-index":"40"});
      $(this).attr('title', '검색창 닫기');
      stat = false;
    }else if(stat == false){
      $(this).removeClass("on");
      $("html,body").css({overflow:"visible",height:"auto"});
      menuMask.fadeOut(200);
      srcArea.slideUp(200);
      lnbWrap.css({"z-index":"40"});
      searchWrap.css({"z-index":"inherit"});
      $(this).attr('title', '검색창 열기');
      stat = true;
    }
  });
  //풋터  - 관련사이트 바로가기
  $(".site_link div.layer").fadeOut("fast");
  $(".site_link h3 button.open").click(function(){
    $(".site_link div.layer").fadeOut("fast");
    $(this).parent().next("div.layer").fadeIn("fast");return false;
  });
  $(".site_link .close").click(function(){
    $(this).parent().fadeOut("fast");return false;
  });

  $(".depart_open").click(function(){
    var bodyHeight = $("body").height();
    $(this).siblings().fadeIn("fast");
    $(".black_wrap2").css({height:bodyHeight}).show();
  });
  $(".org_close").click(function(){
    $(this).parent().fadeOut("fast");
    $(".black_wrap2").hide();
  });
});
//메인 이미지 롤링 함수
$.fn.imageRolling = function(options) {

  var settings = {
    prevBtn : '',
    nextBtn : '',
    playBtn : '',
    rollList : '',
    rollThum : '',
    rollCurrent : $(".count"),
    rollAll : $(".all"),
    waitingTime : ''
  };

  $.extend(settings, options);
  settings.areaDiv = this;
  settings.prevBtn = $(settings.prevBtn);
  settings.nextBtn = $(settings.nextBtn);
  settings.rollList = $(settings.rollList);
  settings.rollThum = $(settings.rollThum);
  settings.rollCurrent = $(settings.rollCurrent);
  settings.rollAll = $(settings.rollAll);
  settings.controlBtn = $(settings.controlBtn);

  settings.cnt = settings.areaDiv.find(settings.rollList).length;
  settings.waitingTime = parseInt(settings.waitingTime);
  settings.nowNum = 0;
  settings.moveFlag = true;
  //settings.moveType;
  //settings.setTimeOut;
  var status=true;

  function emptySetting() {
    settings.areaDiv.find(settings.rollCurrent).html(settings.nowNum+1);
    settings.areaDiv.find(settings.rollAll).html(settings.cnt);
    settings.areaDiv.find(settings.rollList).hide();
  }
  function setRolling(aniFlag) {
    if(!settings.moveFlag){
      if(settings.moveType=="next" || settings.moveType == null){
        settings.nowNum++;
        if(settings.nowNum == settings.cnt) settings.nowNum = 0;
      } else if(settings.moveType=="prev") {
        settings.nowNum--;
        if(settings.nowNum < 0) settings.nowNum = (settings.cnt-1);
      }
    }
    emptySetting();

    if(aniFlag) settings.areaDiv.find(settings.rollList).eq(settings.nowNum).show();
    else settings.areaDiv.find(settings.rollList).eq(settings.nowNum).fadeIn('normal');
    // 기본 : aniFlag 설정 없으면 fade 효과 - 조정

    //aniFlag = false;
    settings.moveFlag = false;
    if(status){
      if(settings.cnt >1){
        settings.setTimeOut= setTimeout(setRolling , settings.waitingTime);
      }
    }
  }
  function thumClick(){
    //alert("aa");
  }
  function controlRolling(){
    //정지 재생버튼 이미지로 제어.
    if(status){
      clearTimeout(settings.setTimeOut);
      settings.controlBtn.attr('class',"rolling_play");
      settings.controlBtn.text("비주얼 팝업 롤링 재생");
      status = false;
    }else{
      settings.controlBtn.attr('class',"rolling_stop");
      settings.controlBtn.text("비주얼 팝업 롤링 정지");
      status = true;
      setRolling();
    }
    return false;
  }
  function prevRolling(){
    clearTimeout(settings.setTimeOut);
    settings.moveType = "prev";
    setRolling();
    return false;
  }
  function nextRolling() {
    clearTimeout(settings.setTimeOut);
    settings.moveType = "next";
    setRolling();
    return false;
  }
  setRolling();
  settings.prevBtn.click(prevRolling);
  settings.nextBtn.click(nextRolling);
  settings.controlBtn.click(controlRolling);
  settings.rollThum.click(thumClick);
};
//비주얼
$.fn.imageRolling2 = function(options) {

  var settings = {
    item : '',
    btns : '',
    prevBtn : '',
    nextBtn : '',
    stopBtn : '',
    playBtn : '',
    btn_nums_wrap : '',
    btn_nums : '',
  };
  $.extend(settings, options);
  settings.item = $(settings.item);
  settings.btns = $(settings.btns);
  settings.prevBtn = $(settings.prevBtn);
  settings.nextBtn = $(settings.nextBtn);
  settings.stopBtn = $(settings.stopBtn);
  settings.playBtn = $(settings.playBtn);
  settings.btn_nums_wrap = $(settings.btn_nums_wrap);
  settings.btn_nums = $(settings.btn_nums);
  var _this = this,
  _lens = settings.item.length;
  _this.index   = 0;
  _this.next    = 0;
  _this.next_nums_move = 0;
  _this.prev_nums_move = 0;
  _this.nums_move = settings.btn_nums.height();
  _this.animated  = false;
  _this.interval  = null;
  _this.auto_play = true;
  _this.time    = 5000; //시간
  _this.ani = function() {
    if (_this.animated) return;
    _this.animated  = true;
    settings.item.eq(_this.next).hide();

    var btn_nums_off = settings.btn_nums.eq(_this.index);
    btn_nums_off.removeClass('active');
    var btn_nums_active = settings.btn_nums.eq(_this.next);
    btn_nums_active.addClass('active');

    settings.item.eq(_this.index).show(function() {
      //alert("bb");
      $(this).removeClass('active');
      settings.item.eq(_this.next).addClass('active');
      _this.animated = false;
      _this.index = _this.next;
    });
  };
  _this.nextAni = function(index) {
    if(index == null) {
      _this.next = _this.next+1;
    }
    else{
      _this.next = index
    }
    //_this.next = index || _this.next+1;

    if (_this.next == _lens)
      _this.next = 0;
    _this.ani();
  };
  _this.auto = function() {
    _this.interval = setInterval(function() {
      _this.nextAni();
    }, _this.time);
  };
  _this.stop = function() {
    clearInterval(_this.interval);
    _this.interval = null;
  };

  settings.btn_nums.on('click', function() {
    _this.stop();
    alert("aa");
    var num_type = $(this).attr('class');
    num_type = num_type.replace('active','');
    var array_num = num_type.split("_");
    var slt_num = array_num[1]-1;

    if (slt_num == _lens) {
      slt_num = 0;
    }
    if (slt_num < 0) {
      slt_num = _lens-1;
    }
    _this.nextAni(slt_num);
    if (_this.auto_play)
      _this.auto();
  });

  settings.btns.on('click', function() {
    var type = $(this).attr('class');
    switch(type) {
      case settings.prevBtn :
        //console.log('a');
       _this.stop();
       var next = _this.index - 1;
        var nums_move =  _this.nums_move;
        var moveSize = nums_move * next;
        //alert(moveSize);
        settings.btn_nums_wrap.css({"top": -moveSize});
        //alert(moveSize);
       if (next < 0 ){
       next = _lens-1;

         var moveSize = nums_move * next;
         settings.btn_nums_wrap.css({"top": -moveSize});
       }

       _this.nextAni(next);
       if (_this.auto_play)
       _this.auto();
       break;
      case settings.nextBtn :
      alert("aa");
       _this.stop();
       var next = _this.index + 1;
         var moveSize = _this.nums_move * next;
         settings.btn_nums_wrap.css({"top": -moveSize});
         //alert(moveSize);
       if (next == _lens) {
       next = 0;
         var moveSize = 0;
         settings.btn_nums_wrap.css({"top": moveSize});
       }
      _this.nextAni(next);
       if (_this.auto_play)
       _this.auto();
       break;
      case settings.stopBtn :
        //console.log('a');
        _this.stop();
        _this.auto_play = false;
        $(this).attr('class',"play").html("비주얼 롤링 재생");
        break;
      case settings.playBtn :
        //console.log('b');
        _this.auto();
        _this.auto_play = true;
        $(this).attr('class',"stop").html("비주얼 롤링 정지");
        break;
    }
    return false;
  });
  _this.init = function( a ) {
    settings.item.eq(0).addClass('active');
    _this.auto_play = a || _this.auto_play;
    if (_this.auto_play) {
      _this.auto();
    }
  }
}
// 탭메뉴 공통적으로 사용
//ex) tabOn(1,1);
function tabOn(tabid,a) {
  for (i=1;i<=10;i++) {
    if(i<10){inn="0"+i;} else {inn=""+i;}
    tabMenu = document.getElementById("tab"+tabid+"m"+i);
    tabContent = document.getElementById("tab"+tabid+"c"+i);
    tabMore = document.getElementById("tab"+tabid+"more"+i);
    if (tabMenu) { //객체가존재하면
      if (tabMenu.tagName=="A") { tabMenu.className=""; } //앵커일때
      if (tabMenu.tagName=="BUTTON") { tabMenu.className=""; } //버튼일때
      if (tabMenu.tagName=="BUTTON") { tabMenu.parentNode.className=""; } //버튼일때
      if (tabMenu.tagName=="SPAN") { tabMenu.className=""; } //span 일때
      if (tabMenu.tagName=="SPAN") { tabMenu.parentNode.className=""; } //span 일때 부모요소에도 클래스 삭제
    }
    if (tabContent) { tabContent.style.display="none"; }
    if (tabMore) { tabMore.style.display="none"; }
  }
  if(a<10){ann="0"+a;} else {ann=""+a;}
  tabMenu = document.getElementById("tab"+tabid+"m"+a);
  tabContent = document.getElementById("tab"+tabid+"c"+a);
  tabMore = document.getElementById("tab"+tabid+"more"+a);
  if (tabMenu) { //객체가존재하면
    if (tabMenu.tagName=="A") { tabMenu.className="on"; } //앵커일때
    if (tabMenu.tagName=="BUTTON") { tabMenu.className="on"; } //버튼일때
    if (tabMenu.tagName=="BUTTON") { tabMenu.parentNode.className="on"; } //버튼일때
    if (tabMenu.tagName=="SPAN") { tabMenu.className="on"; } //span 일때
    if (tabMenu.tagName=="SPAN") { tabMenu.parentNode.className="on"; } //span 일때 부모요소에도 클래스추가
  }
  if (tabContent) { tabContent.style.display="block"; }
  if (tabMore) { tabMore.style.display="block"; }
};
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
//배너 롤링
$(document).ready(function(){
  var bn_length = $(".banner li").length;
  if (bn_length > 7)
  {
    var bannerAuto=null;
    var bannerDirect="left";

    function rightBanner(){
      $(".banner ul").stop().animate(
        {left:"-=130px"},0,function(){
          var $bannerObj=$(".banner ul li:first").clone(true);
          $(".banner ul li:first").remove();
          $(".banner ul").css("left",0);
          $(".banner ul").append($bannerObj);
        }
      );
      if(bannerAuto)clearTimeout(bannerAuto);
      bannerAuto=setTimeout(rightBanner,3000)
    }

    function leftBanner(){
      $(".banner ul").stop().animate(
        {left:"0px"},0,function(){
          var $bannerObj=$(".banner ul li:last").clone(true);
          $(".banner ul li:last").remove();
          $(".banner ul").css("left","0");
          $(".banner ul").prepend($bannerObj);
        }
      );
      if(bannerAuto)clearTimeout(bannerAuto);
      bannerAuto=setTimeout(rightBanner,3000)
    }

    $(document).ready(function(){

      bannerAuto=setTimeout(rightBanner,3000)

      $rightB=$(".bn_ctrl .bn_next");
      $leftB=$(".bn_ctrl .bn_prev");
      $pauseB=$(".bn_ctrl .bn_stop");
      var bPlay = false;

      $leftB.click(function(){
        bannerDirect="left";
        clearTimeout(bannerAuto);
        leftBanner();
        return false;
        /*}*/
      });

      $rightB.click(function(){
        bannerDirect="right";
        clearTimeout(bannerAuto);
        rightBanner();
        return false;
        /*}*/
      });


      $pauseB.click(function(){
        if (bPlay == false){
          clearTimeout(bannerAuto);
          $pauseB.addClass("play").text("배너 롤링 재생하기");
          bPlay = true;
        }else{
          bPlay = false;
          $pauseB.removeClass("play").text("배너 롤링 일시정지하기");
          bannerAuto=setTimeout(rightBanner,1500)
        }
      });

      $(".banner ul li a").on("mouseover focusin", function(){
        clearTimeout(bannerAuto);
      });
      $(".banner ul li a").on("mouseleave focusout", function(){
        bPlay = false;
      });
    });
  }
});
//배너모음
/*
function bannerRolling{}
var bannerAuto=null;
var bannerDirect="left";

function rightBanner(){
  $(".banner_img").stop().animate(
    {left:"-=164px"},"fast",function(){
      var $bannerObj=$(".banner_img li:first").clone(true);
      $(".banner_img li:first").remove();
      $(".banner_img").css("left",0);
      $(".banner_img").append($bannerObj);
    }
  )
  if(bannerAuto)clearTimeout(bannerAuto);
  bannerAuto=setTimeout(rightBanner,3000);
};
function leftBanner(){
  var $bannerObj=$(".banner_img li:last").clone(true);
  $(".banner_img li:last").remove();
  $(".banner_img").css("left","-164px");
  $(".banner_img").prepend($bannerObj);
  $(".banner_img").stop().animate({left:"0px"},"fast");
  if(bannerAuto)clearTimeout(bannerAuto);
  bannerAuto=setTimeout(rightBanner,3000);
};

$(document).ready(function(){
  bannerAuto=setTimeout(rightBanner,3000)
  $leftB=$(".banner_control .prev_banner a");
  $rightB=$(".banner_control .next_banner a");
  $pauseB=$(".banner_control .pause_banner a");
  $bannerP_btn=$(".banner_control .pause_banner a img");
  var bPlay = false;

  $leftB.click(function(){
    bannerDirect="left"
    leftBanner();
    return false;
  });

  $rightB.click(function(){
    bannerDirect="right"
    rightBanner();
    return false;
  });

  $pauseB.click(function(){
    if (bPlay == false){
      clearTimeout(bannerAuto);
      $bannerP_btn.attr("src","images/common/banner_play.gif");
      $bannerP_btn.attr("alt","바로가기 재생");
      bPlay = true;
    }else{
      bPlay = false;
      $bannerP_btn.attr("src","images/common/banner_stop.gif");
      $bannerP_btn.attr("alt","바로가기 정지");
      bannerAuto=setTimeout(rightBanner,1500);
    };
    return false;
  });
});
*/
/*
var global1 = {
  _value: '',
  setValue: function(){this._value = $(".lnb_wrap");},
  getValue: function(){return this._value;}
},global2 = {
  _value: '',
  setValue: function(){this._value = $(".top1menu");},
  getValue: function(){return this._value;}
};

// 값 설정
global1.setValue();
global2.setValue();

// 함수1
function aaa() {
  console.log(global1.getValue());
  console.log(global2.getValue());
}

// 함수2
function bbb() {
  console.log(global2.getValue());
}

aaa();
bbb();
*/
