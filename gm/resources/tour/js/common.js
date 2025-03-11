$(function(){
    //$a = $(".gnb1 li:nth-child(3)");
	//$(".gnb1 > li").not($a).mouseenter(function(){
	//	$(".gnb1 > li").find(".gnb2-box").css("display","none");
	//	$(".mback1").css("display","block");
	//	$(this).find(".gnb2-box").css("display","block");
	//});
	$(".gnb1 > li").mouseenter(function(){
		$(".gnb1 > li").find(".gnb2-box").css("display","none");
		$(".mback1").css("display","block");
		$(this).find(".gnb2-box").css("display","block");
	});
	$(".gnb1 > li").mouseleave(function(){
		$(".gnb1 > li").find(".gnb2-box").css("display","none");
		$(".mback1").css("display","none");
	});
	$(".gnb2 > li").mouseenter(function(){
		if( $(this).find("div").is(".gnb3") ){
			$(".gnb2 > li").removeClass("on");
			$(".gnb2 > li").find(".gnb3").css("display","none");
			$(".gnb2 > li").find(".gb2-ico img").css("margin-top","0");
			$(this).addClass("on");
			$(this).find(".gnb3").css("display","block");
			$(this).find(".gb2-ico img").css("margin-top","-84px");
			$(".mback2").css("display","block");
		}else{
			$(".gnb2 > li").removeClass("on");
			$(".gnb2 > li").find(".gnb3").css("display","none");
			$(".gnb2 > li").find(".gb2-ico img").css("margin-top","0");
			$(this).find(".gb2-ico img").css("margin-top","-84px");
		}
	});
	$(".gnb2 > li").mouseleave(function(){
		$(".gnb2 > li").removeClass("on");
		$(".gnb2 > li").find(".gnb3").css("display","none");
		$(".gnb2 > li").find(".gb2-ico img").css("margin-top","0");
		$(".mback2").css("display","none");
	});


	//메뉴 포커스
	$(".gnb1 > li").focusin(function(){
        $(".mback1").css("display","block");
        $(this).find(".gnb2-box").css("display","block");
    });
    $(".gnb2 > li").focusin(function(){
        $(".mback2").css("display","block");
		$('.gnb3').hide();
        $(this).find(".gnb3").css("display","block");
        $(this).find(".gb2-ico img").css("margin-top","-84px");
    });

    $(".gnb2 > li").focusout(function(){
        $(this).find(".gb2-ico img").css("margin-top","0");
    });

    $('.gnb2 > li').each(function(){
        $(this).find('.gnb3 a:last').focusout(function(){
            $(this).parent().css('display' , 'none');
        });
    });

    $(".gnb2 > li:last-child > .gnb3 a:last-child").focusout(function(){
        $(".mback1").css("display","none");
        $(".mback2").css("display","none");
        $(".gnb2-box").css("display","none");
    });
    $(".gnb2 > li:last-child a:last-child").focusout(function(){
        $(".mback1").css("display","none");
        $(".mback2").css("display","none");
        $(".gnb2-box").css("display","none");
    });


	$('.bxslider').bxSlider({
		auto: true,
		autoControls: true,
		touchEnabled : (navigator.maxTouchPoints > 0)
	});



    // 알림판
	$('.bxslider2').bxSlider({
	    mode: 'fade',
        auto:true,
        autoControls: true,
        touchEnabled : (navigator.maxTouchPoints > 0)
    });
	$(".noti-slide .bx-start").click(function(){
        $(this).css("display","none");
        $(".noti-slide .bx-stop").css("display","block");
    });
    $(".noti-slide .bx-stop").click(function(){
        $(this).css("display","none");
        $(".noti-slide .bx-start").css("display","block");
    });

	$(".tab-d1 > li > a").click(function(){
		$(".tab-d1 > li").find(".tab-d1box").css("display","none");
		$(".tab-d1 > li > a").removeClass("on");
		$(this).next(".tab-d1box").css("display","block");
		$(this).addClass("on");
	});

	var width = $(window).width();
	var mconw = $(".main-con").width();
	$(".tblbox").ready(function(){
		if((width <= 640) && (width >= 480)){
			$(".tblbox").css("width",(mconw-40)+"px");
		}else if(width <= 479){
			$(".tblbox").css("width","100%");
		}
	});
	$(".gnb3").css({"width":width+"px","left":(((width-1200)/2)*-1)+"px"});

	var height = $("body").height();
	$(".tbl-gnb").css("height",(height-40)+"px");
	$(".tblm").css("height",(height-99)+"px");

	$(".tbl-btn-m").click(function(){
		$(".tbl-gnb").css("display","block");
	});
	$(".close-menu").click(function(){
		$(".tbl-gnb").css("display","none");
		$(".tblm > li > a").parent("li").find("div.g-depth2").css("display","none");
		$(".g-depth2 > ul > li").find("ul").css("display","none");
		$(".tblm > li > a").removeClass("on");
		$(".g-depth2 > ul > li > a").removeClass("on");
	});
	$(".tblm > li > a").click(function(){
		if( $(this).is(".on") ){
			$(this).removeClass("on");
			$(this).parent("li").find("div.g-depth2").css("display","none");
			$(".g-depth2 > ul > li").find("ul").css("display","none");
		}else{
			$(".tblm > li > a").parent("li").find("div.g-depth2").css("display","none");
			$(".tblm > li > a").removeClass("on");
			$(this).parent("li").find("div.g-depth2").css("display","block");
			$(this).addClass("on");
		}
	});
	$(".g-depth2 > ul > li > a").click(function(){
		if( $(this).is(".on") ){
			$(this).removeClass("on");
			$(this).parent("li").find("ul").css("display","none");
		}else{
			$(".g-depth2 > ul > li").find("ul").css("display","none");
			$(".g-depth2 > ul > li > a").removeClass("on");
			$(this).parent("li").find("ul").css("display","block");
			$(this).addClass("on");
		}
	});

	var sbheight = $(".sbbox").height();
	$(".sbcon").css("height",sbheight+"px");

	//$('#mycalendar').monthly({
	//	mode: 'event',
	//	xmlUrl: 'events.xml'
	//});

	/*소셜버튼*/
	$(".etc1").parent("li").css("min-height","60px");

	$(".social-btn a").eq(0).css("color","#fff");
	$(".social-btn a").eq(0).click(function(){
		$(".social-btn span").animate({left:0},400);
		$(this).css("color","#fff");
		$(".social-btn a").eq(1).css("color","#7c7c7c");
	});
	$(".social-btn a").eq(1).click(function(){
		$(".social-btn span").animate({left:"115px"},400);
		$(this).css("color","#fff");
		$(".social-btn a").eq(0).css("color","#7c7c7c");
	});

	/*소셜롤링*/
	var o = $(".tag-list div ul").height();
	var p = Math.ceil(o/32);
	var n = 0;
	$(".down").click(function(){
		n = n+1;
		if(n >= p){
			n = 0;
		};
		$(".tag-list div ul").css("margin-top",(-1*(n*32))+"px");
	});
	$(".up").click(function(){
		n = n-1;
		if(n == -1){
			n = (p-1);
		};
		$(".tag-list div ul").css("margin-top",(-1*(n*32))+"px");
	});

	/*서브 레프트 메뉴*/
	$(".sblist > li > a").click(function(){
		if( $(this).parent("li").is(".on")){
			$(".sblist  li").removeClass("on");
			$(".sblist  li div").css("display","none");
		}else{
			$(".sblist  li").removeClass("on");
			$(".sblist  li div").css("display","none");
			$(this).parent("li").addClass("on");
			$(this).parent("li").find("div").css("display","block");
		}
	});

	$(".sblist li div ul li").click(function(){
		if( $(this).is(".on")){
			$(".sblist li div ul li").removeClass("on");
		}else{
			$(".sblist li div ul li").removeClass("on");
			$(this).addClass("on");
		}
	});

	/*레이어팝업과 접근성탭키운영*/
	$(".popbtn1").click(function(){
		$(".popup").css("display","block");
	});
	/* 재료현황 에서 버튼 이벤트와 중복됨 ( 사용 유무 변동 필요시 클래스 명 재정리 필요 함)
	  $(".popbtn2").click(function(){
		$(".popup").css("display","block");
	});
	*/
	$(".popbtn3").click(function(){
		$(".popup").css("display","block");
	});

	// 내게 맞는 여행코스 찾기
	$(".popbtn4").click(function(){
		$(".popup").css("display","block");
		$(".pop-close").focus();
	});

	$(".lpop4 .pop-close").click(function(){
	    $(".popup").css("display","none");
        $(".popbtn4").focus();
    });

	$(".pop-close").click(function(){
		$(".popup").css("display","none");
		$(".popbtn1").focus();
	});
	$(".pop-close2").click(function(){
		$(".popup").css("display","none");
		$(".popbtn1").focus();
	});	

	
	//팝업
	var $popup = $('.sb-contents'),
		$popupAuto = $popup.find('.popup_auto'),
		$popupPrev = $popup.find('.mt_btn #mt_prev'),
		$popupNext = $popup.find('.mt_btn #mt_next'),
		$popupList = $popup.find('#mt_slide');

	$popupList.slick({
		draggable : false,
		swipe : false,
		touchMove : false,
		cssEase : 'cubic-bezier(1, 0, 0, 1)',
		speed : 250,
		pauseOnArrowClick : false,
		pauseOnDirectionKeyPush : true,
		pauseOnSwipe : true,
		autoplay : false,
		playText : '재생',
		pauseText : '정지',
		autoArrow : $popupAuto,
		prevArrow : $popupPrev,
		nextArrow : $popupNext,
		dots : false,
		responsive : [{
			breakpoint : 1001,
			settings : {
				draggable : true,
				swipe : true,
				touchMove : true,
				adaptiveHeight : true
			}
		}]
	});

	$('.mt_btn a').on("click", function(e) {
        e.preventDefault();
    });
	
	/*리사이징 열기*/
	$(window).on('load resize', function(){
		var width = $(window).width();
		var mconw = $(".main-con").width();
		
		$(".tblbox").ready(function(){
			if((width <= 640) && (width >= 480)){
				$(".tblbox").css("width",(mconw-40)+"px");
			}else if(width <= 479){
				$(".tblbox").css("width","100%");
			}
		});

		$(".sb-contents").ready(function(){
			if( width <= 640 ){
				$(".sb-contents").css({"width":(width-40)+"px","margin":"0 auto"});
			}else{
				$(".sb-contents").css("width","948px");
			}
		});


		 if(width >= 640){
			$(".tbl-gnb").css("display","none");
		 };


		$(".gnb3").css({"width":width+"px","left":(((width-1200)/2)*-1)+"px"});

		var tblboxw = $(".tblbox").width();
		$(".tab-d1 > li").css("width",((tblboxw-51)/2)+"px");

		var height = $("body").height();
		$(".tbl-gnb").css("height",(height-40)+"px");
		$(".tblm").css("height",(height-99)+"px");

		var sbheight = $(".sbbox").height();
		$(".sbcon").css("height",sbheight+"px");

		$(".etc1").parent("li").css("min-height","60px");
		//$(".tbl-gnb").css("display","none");


	});/*리사이징 닫기*/






});