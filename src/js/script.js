let body = document.querySelector('body');
    icons = document.querySelector('.icons');
    projects = document.querySelector('.projects');
    navLeft = document.querySelector('.navL');
    navRight = document.querySelector('.navR');
    proj1 = document.querySelector('#project1');
    modal = document.querySelector('.modal');
    modalStats = document.querySelector(".modal-stats");

    gameHeader = document.querySelector(".game-header");
    gameResult = document.querySelector(".game-result");
    gameOptions = document.querySelector(".game-options");
    gameSpinner = document.querySelector(".fa-spinner");
    gameStats1 = document.querySelector(".stats1");
    gameStats2 = document.querySelector(".stats2");
    gameStats3 = document.querySelector(".stats3");
    gameStats4 = document.querySelector(".stats4");
    gameScore1 = document.querySelector(".score1");
    gameScore2 = document.querySelector(".score2");

let timeCurr = null;
let stats = null;

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
            gameEnd();
            sendTime(time) 
            timeCurr = time
            clicked = true;
        }
    })
}

function gameEnd(){
    gameHeader.textContent = "thanks for playing :)";
    gameOptions.style.display = 'block';
    gameSpinner.style.display = 'none';
}

function modalOff(){
    modal.classList.remove("show");
    modalStats.classList.remove("show");
    gameSpinner.style.display = 'block';
    gameHeader.textContent = 'patience game';
    gameHeader.style.display = 'block';
    // gameResult.textContent = "";
    // gameResult.style.display = 'none';
    gameOptions.style.display = 'none';
}

function seeStats(){
    modalStats.classList.add('show');
    modal.classList.remove('show');
    gameScore1.textContent = timeCurr+'s'

    const xhr = new XMLHttpRequest();
    const url='https://grzegorzkurek.pl/test/api.php';
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200){
            if (xhr.response){
                let res = JSON.parse(xhr.response)
                stats = calcStats(res)
                let hiLow = timeCurr > stats.avg ?  'above' : 'below';
                gameStats2.innerHTML = "that's a bit " + hiLow + " our <span>" + stats.avg + "s</span> average";
                let level = timeCurr < stats.avg ? 'TRIGGER HAPPY' : 'ZEN APPRENTICE'
                gameScore2.textContent = level
            }
        }
    }
}

function sendTime(time){
    const xhr = new XMLHttpRequest();
    const url='https://grzegorzkurek.pl/test/add.php?time='+time;
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200){
            if (xhr.response){
                console.log(JSON.parse(xhr.response));
            }
        }
    }
} 

function calcStats(arr){
    
    const minmax = (arr, key) => {
        const values = arr.map(val => parseFloat(val[key]));
        const min = Math.min.apply(null, values)
        const max = Math.max.apply(null, values)
        const avg = parseFloat((values.reduce(add) / values.length).toFixed(3));
        return {
            min: min, 
            max: max, 
            avg: avg
        }
    }

    const add = (a, b) => a + b;
    
    return minmax(arr, 'userTime')

}

