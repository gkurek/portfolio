$(function() {
console.log("dom");

// parallax effect
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

// sticky menu
function sticky(){
  var nav = $("nav");
  var menu = $(".menu");
  var menuPosition = menu.offset().top;

  function checkScrollAddSticky(){
    var scrolled = $(window).scrollTop();
    if (scrolled > menuPosition){
      $(menu).addClass("sticky");
    }else{
      $(menu).removeClass("sticky");
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

// animacja zjazd do odpowiedniej sekcji
function scroller(){
  var menu = $(".menu"); //moze wyciagnac potem przed funkcje - bo uzywamy tez w sticky
  var a = menu.find("a");

  a.on("click", function(e){
    e.preventDefault();
    var href = $(this).attr("href"); //w href wpisane gdzie ma zjechac
    console.log(href);

    $("html, body").animate({
      scrollTop: $(href).offset().top
    }, 1000);
  });
}
scroller();

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
$(window).scroll(function(e){
    fish();
});

});
