$(function() {
console.log("dom");

//1======================================
//parallax effect
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.starsLayer1').css('top', -(scrolled * 0.2) + 'px');
    $('.starsLayer2').css('top', -(scrolled * 0.3) + 'px');
}
$(window).scroll(function(e){
  parallax();
});

//2=======================================
$(".home p").delay(700).animate({opacity: 1}, 1000); //aniamcja junior front-end devloper i znaczek na dole

//3=====================================
//scrollreveal - z nim mozna jeszcze sie troche pobawic potem, ew. w footerze itp
//window.sr = ScrollReveal();
//sr.reveal(".row", {
//  reset: true,
//  delay: 400,
//  duration: 1200,
  //distance: 0, default podnosi 20px do gory, 0 zostaje w miejscu
  //viewOffset: {top: 48px, right: 0, bottom: 0, left: 0 } dla toolbaru przyklejonego z gory o wysokosci 48px
//});

//4=======================================
//zjazd do odpowiedniej sekcji na stronie
function scroller(){
  var a = $(".menu-side, .menu-top, .downBtn").find("a") //czy to jest optymalne wyszukanie?
  a.on("click", function(e){
    e.preventDefault();
    var href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(href).offset().top
    }, 1000); //zmienic jeszcze czas, zeby niezaleznie od odleglosci zjezdzalo tak samo szybko
  });
}
scroller();

//6========================================
// function slider(){
//   var slider = $(".portfolio").find(".slider");
//   var next = slider.find(".nextButton");
//   var prev = slider.find(".prevButton");
//   var li = slider.find("li");
//   var ul = slider.find("ul");
//
//   var index = 1; // tu z zera tez zmienic na 1 bo pamietaj ze nizej przesuwamy widzialny obrazem o 400
//   var widthLi = li.first().width();
//
//   var first = li.first().clone(); //tworzymy sciemnione elementy
//   var last = li.last().clone();
//
//   ul.append(first).prepend(last); //dodajemy elementy do listy
//   ul.css("left", -widthLi); //przesuwamy go zeby byl pierwszym z listy nie ostatnim
//
//   ul.width((li.length+2)*widthLi); //zmienialy szerokosc ul
//
//   next.on("click", function(){
//     index++;
//     ul.animate({left: -(index*widthLi)}, function(){
//       if (li.length < index){
//         index = 1;
//         ul.css("left", -widthLi);
//       }
//     });
//   });
//   prev.on("click", function(){
//     index--;
//     ul.animate({left: -(index*widthLi)}, function(){
//       if (index < 1){
//         index = 2;
//         ul.css("left", -index*widthLi);
//       }
//     });
//   });
// }
// slider();
$('.slider ul').owlCarousel({
  items: 1
});

//7===========================================
//sticky sidemenu
var nav = $("nav");
var icons = nav.find("ul").find("i").hide();
var homeLi = nav.find("li").first().hide();
var sideBtn = nav.find(".sideBtn");
var menuList = sideBtn.next();

function check(){
  if ($(window).width() < 768){
    return false;
  }
  var scrolled = $(window).scrollTop();
  if (scrolled > 51){
    if (sideBtn.hasClass("hidden"))
    {
      icons.show();
      homeLi.show();
      sideBtn.removeClass("hidden").css("opacity", "+=1"); //ale patentu z opacity nie da sie analogicznie zrobic w druga strone
      nav.removeClass("menu-top").addClass("menu-side");
      menuList.addClass("menu-side-list hidden").removeClass("container");
    }
  }else {
    $('.sideBtn').removeClass('btnRadiusFix');
    icons.hide();
    homeLi.hide();
    sideBtn.addClass("hidden").css("opacity", "0"); //ew. animate opacity, albo scroll reveal - zebypojawialo sie miękko
    nav.addClass("menu-top").removeClass("menu-side");
    menuList.removeClass("menu-side-list hidden").addClass("container");
    menuList.css('height', 'auto');
  }
}

$(window).on("load scroll", function(){ // alternatywa: $(window).scroll(function(){...});
  check(menuList);
});

//=====================================
//side button zmienia sie z kolka na polkolko
sideBtn.on("click", function(){
  if (menuList.hasClass('hidden')) {
    menuList.removeClass('hidden');
    sideBtn.addClass("btnRadiusFix");
    setTimeout(function(){
      $('.menu-side-list').css('height', '250px');
      setTimeout(function(){
        $('.menu-side-list').css('overflow', 'visible');
      }, 200)
    }, 10);
  } else {
    $('.menu-side-list').css('height', '0px');
    $('.menu-side-list').css('overflow', 'hidden');
    setTimeout(function(){
      menuList.addClass('hidden');

      sideBtn.removeClass("btnRadiusFix");
    }, 200);
  }



})

//======================================
// ruchoma ryba (wywolac w evencie scroll razem z paralaksą?)
function fish(_curve, _offsetLeft){
  var scrolled = $(window).scrollTop();
  var fish = $(".fish");
  if (scrolled > fish.position().top){
      fish.css("left", (_offsetLeft + (scrolled-fish.position().top)) * $(window).width()/$(window).height() * _curve ); //zapisac -90 do zmiennej?
  }
}
$(window).scroll(function(e){
    fish(1, 0);
});
});


// sticky menu
/*
function sticky(){
  var nav = $("nav");
  //var menu = $(".menu");
  var menuPosition = nav.offset().top;
  console.log(menuPosition);

  function checkScrollAddSticky(){
    var scrolled = $(window).scrollTop();
    if (scrolled > menuPosition){
      $(nav).addClass("sticky");
    }else{
      $(nav).removeClass("sticky");
    }
  };
  checkScrollAddSticky();

  $(window).on("scroll", function(){ // alternatywa: $(window).scroll(function(){console.log("dziala")});
    checkScrollAddSticky();
  });

  $(window).on("resize", function(){
    if ($(menu).hasClass("sticky")){
      menuPosition = menu.offset().top;
    }else{
      menuPosition = nav.offset().top;
    }
  });
}
sticky();
*/
