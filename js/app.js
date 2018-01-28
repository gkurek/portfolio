$(function() {
console.log("dom");

$('.container').click(function(){
    $('.d1').fadeToggle('fast'); 
    $('.img').fadeToggle('fast'); 
    // $('.d1').toggleClass("hidden"); 
    // $('.img').toggleClass("hidden"); 
})

$('.img').click(function(){
    $('.d1').fadeToggle('fast'); 
    $('.img').fadeToggle('fast'); 
    // $('.d1').toggleClass("hidden"); 
    // $('.img').toggleClass("hidden"); 
})

});
