$(function() {
console.log("dom");

//1======================================
//parallax effect
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.starsLayer1').css('top', -(scrolled * 0.2) + 'px');
    $('.starsLayer2').css('top', -(scrolled * 0.3) + 'px');
    //console.log(scrolled); //test
    //wywolanie w evencie scroll - dac jeden taki event tylko?
}
$(window).scroll(function(e){
  parallax();
});

//2=======================================
$(".home p").delay(700).animate({opacity: 1}, 1000); //aniamcja junior front-end devloper i znaczek na dole

//3=======================================
var img = $(".skills").find("img"); //ustalamy wysokosc img w skills
img.each(function(){
  if ($(this).width()>$(this).height()){
    $(this).css('height', 'auto');
    $(this).css('width', '100%');
  }else{
    $(this).css('height', '100%');
    $(this).css('width', 'auto');
  }
});

//dla obrazkow szerszych niz wyzszych (bo w css mają height 100%, a te trzeba zmienic na width 100%)
//czyli potem: napisac funkcje ktora sprawdza ile ma kazdy obazek i dla wyzszych ustawia tak a szerszych inaczej

//4=====================================
//scrollreveal - z nim mozna jeszcze sie troche pobawic potem, ew. w footerze itp

window.sr = ScrollReveal();
sr.reveal(".row-1, .row-2, .row-3", {
  reset: true,
  delay: 400,
  duration: 1200,
  //distance: 0, default podnosi 20px do gory, 0 zostaje w miejscu
  //viewOffset: {top: 48px, right: 0, bottom: 0, left: 0 } dla toolbaru przyklejonego z gory o wysokosci 48px
});

//5=======================================
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
function slider(){
  var slider = $(".portfolio").find(".slider");
  var next = slider.find(".nextButton");
  var prev = slider.find(".prevButton");
  var li = slider.find("li");
  var ul = slider.find("ul");

  var index = 1; // tu z zera tez zmienic na 1 bo pamietaj ze nizej przesuwamy widzialny obrazem o 400 (w 60)
  var widthLi = li.first().width();

  var first = li.first().clone(); //tworzymy sciemnione elementy
  var last = li.last().clone();

  ul.append(first).prepend(last); //dodajemy elementy do listy
  ul.css("left", -widthLi); //przesuwamy go zeby byl pierwszym z listy nie ostatnim

  ul.width((li.length+2)*widthLi); //zmienialy szerokosc ul

  next.on("click", function(){
    index++;
    ul.animate({left: -(index*widthLi)}, function(){
      if (li.length < index){
        index = 1;
        ul.css("left", -widthLi);
      }
    });
  });
  prev.on("click", function(){
    index--;
    ul.animate({left: -(index*widthLi)}, function(){
      if (index < 1){
        index = 2;
        ul.css("left", -index*widthLi);
      }
    });
  });
}
slider();

//7===========================================
//sticky

function check(){
  var scrolled = $(window).scrollTop();
  var sideBtn = $(".sideBtn");
  if (scrolled > 51){
    sideBtn.removeClass("hidden");
  }else {
    sideBtn.addClass("hidden"); //ew. animate opacity, albo scroll reveal - zebypojawialo sie miękko
  }
}
$(window).on("scroll", function(){ // alternatywa: $(window).scroll(function(){console.log("dziala")});
  //check();
});

//=======

var sideBtn = $(".sideBtn");
var menu = $(".menu-side-list");
sideBtn.on("click", function(){
  console.log("asd");
  menu.toggleClass("hidden");
})



/*
function sticky(){
  function check(){
    var scrolled = $(window).scrollTop();
    var bars = $("header").find("i")
    if (scrolled > 51 ){
      $(bars).addClass("sticky");
    }else{
      $(bars).remove("sticky").addClass("hidden");
    }
  }
  $(window).on("scroll", function(){ // alternatywa: $(window).scroll(function(){console.log("dziala")});
    check();
  });
}
//sticky();


*/



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


//=======================================================================
// ruchoma ryba - wywolac w evencie scroll (podobnie jak paralakse)
function fish(){
  var scrolled = $(window).scrollTop();
  console.log(scrolled);
  var fish = $(".fish");
  var movePosition = ((fish.position().top)-(scrolled*2));
  console.log("movePosition: "+movePosition);
  console.log("scrollTop: "+scrolled);
  console.log("fish.position().top: "+fish.position().top);
    fish.css("left", -(movePosition));
}
//$(window).scroll(function(e){
//    fish();
//});
});
