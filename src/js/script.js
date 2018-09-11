let body = document.querySelector('body');
    icons = document.querySelector('.icons');
    projects = document.querySelector('.projects');
    navLeft = document.querySelector('#projects');
    navRight = document.querySelector(".fa-chevron-left");
    proj1 = document.querySelector(".projects--1");
    modal = document.querySelector(".modal");
    modalStats = document.querySelector(".modal-stats");
    gameResult = document.querySelector(".game-result");
    gameHeader = document.querySelector(".game-header");
    gameOptions = document.querySelector(".game-options");
    gameSpinner = document.querySelector(".fa-spinner");
    gameStats = document.querySelector(".stats");

let timeGlobal = null

navLeft.addEventListener('click', animLeft)

function animLeft(){
    icons.classList.remove("fadeInRight"); 
    icons.classList.add("fadeOutRight"); 
    projects.classList.remove("fadeOutRight"); 
    projects.classList.add("fadeInLeft");
}

navRight.addEventListener('click', animRight);

function animRight(){
    icons.classList.remove("fadeOutRight");
    icons.classList.add("fadeInRight");
    projects.classList.remove("fadeInLeft");
    projects.classList.add("fadeOutLeft");
}

proj1.addEventListener('click', modalOn);

function modalOn(e){
    
    let start = e.timeStamp;
    let time = null; 
    let clicked = false;

    modal.classList.add("show")

    body.addEventListener('click', (e)=> {
        let end = e.timeStamp;
        time = (end - start) / 1000;
        time = time.toFixed(3);
        if (time > 0 && !clicked) {
            gameEnd(time);
            timeGlobal = time; //send to server
            clicked = true;
        }
    })
}

function gameEnd(time){
    gameHeader.style.display = 'none'
    // gameHeader.textContent = 'score: '+time+'s'
    gameResult.textContent = "YOU LOST!";
    gameResult.style.display = 'block'
    gameOptions.style.display = 'block';
    gameSpinner.style.display = 'none';
}

function modalOff(){
    modal.classList.remove("show");
    modalStats.classList.remove("show");
    gameSpinner.style.display = 'block';
    gameHeader.textContent = 'patience game';
    gameHeader.style.display = 'block';
    gameResult.textContent = "";
    gameResult.style.display = 'none';
    gameOptions.style.display = 'none';
}


function seeStats(){
    modalStats.classList.add('show');
    modal.classList.remove('show');
    gameStats.textContent = 'your score: '+timeGlobal+'s'

    //read from serwer


}