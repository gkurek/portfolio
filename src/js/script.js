


document.querySelector('#projects').addEventListener('click', animLeft)

function animLeft(){
    document.querySelector('.icons').classList.remove("fadeInRight"); 
    document.querySelector('.icons').classList.add("fadeOutRight"); 
    document.querySelector('.projects').classList.remove("fadeOutRight"); 
    document.querySelector('.projects').classList.add("fadeInLeft");
}

document.querySelector(".fa-arrow-left").addEventListener('click', animRight)

function animRight(){
    document.querySelector('.icons').classList.remove("fadeOutRight")
    document.querySelector('.icons').classList.add("fadeInRight")
    document.querySelector('.projects').classList.remove("fadeInLeft");
    document.querySelector('.projects').classList.add("fadeOutLeft");
}