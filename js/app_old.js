$(function() {
console.log("dom");

// parallax effect
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.starsLayer1').css('top', -(scrolled * 0.2) + 'px');
    $('.starsLayer2').css('top', -(scrolled * 0.3) + 'px');
}

// ryba ruchoma
function fish(_curve, _offsetLeft){
  var scrolled = $(window).scrollTop();
  var fish = $(".fish");
  if (scrolled > fish.position().top){
      fish.css("left", (_offsetLeft + (scrolled-fish.position().top)) * $(window).width()/$(window).height() * _curve ); //zapisac -90 do zmiennej?
  }
}

// wywolanie paralaksy i ryby
$(window).scroll(function(e){
  parallax();
  fish(1,0);
});

// delay na napis junior front-end dev
$(".home p").delay(700).animate({opacity: 1}, 1000);

// zjazd do odpowiedniej sekcji na stronie
function scroller(){
  var a = $(".menu-side, .menu-top, .downBtn").find("a")
  a.on("click", function(e){
    e.preventDefault();
    var href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(href).offset().top
    }, 1000);
  });
}
scroller();

// sidemenu
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
    if (sideBtn.hasClass("hidden")){
      icons.show();
      homeLi.show();
      sideBtn.removeClass("hidden").css("opacity", "+=1");
      nav.removeClass("menu-top").addClass("menu-side");
      menuList.addClass("menu-side-list hidden").removeClass("container");
    }
  } else {
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

// sidebutton radius fix
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
});

// podpiety slider
$('.slider ul').owlCarousel({
  items: 1,
  nav: true,
  navText: ['&lt;', '&gt;'],
});

// podpiety skrypt do animacji
window.sr = ScrollReveal();
sr.reveal(".col-3", {
  reset: true,
  delay: 400,
  duration: 1200,
  //distance: 0, default podnosi 20px do gory, 0 zostaje w miejscu
  //viewOffset: {top: 48px, right: 0, bottom: 0, left: 0 } dla toolbaru przyklejonego z gory o wysokosci 48px
});

});
