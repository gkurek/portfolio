$(function() {
console.log("dom");

function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('top', -(scrolled * 0.2) + 'px');
    $('.bg2').css('top', -(scrolled * 0.3) + 'px');
    console.log(scrolled);
}

$(window).scroll(function(e){
    parallax();
});




});
