


document.querySelector('#projects').addEventListener('click', animLeft)

function animLeft(){
    document.querySelector('.icons').classList.remove("fadeInRight"); 
    document.querySelector('.icons').classList.add("fadeOutRight"); 
    document.querySelector('.projects').classList.remove("fadeOutRight"); 
    document.querySelector('.projects').classList.add("fadeInLeft");
}

document.querySelector(".fa-chevron-left").addEventListener('click', animRight)

function animRight(){
    document.querySelector('.icons').classList.remove("fadeOutRight")
    document.querySelector('.icons').classList.add("fadeInRight")
    document.querySelector('.projects').classList.remove("fadeInLeft");
    document.querySelector('.projects').classList.add("fadeOutLeft");
}

document.querySelector("#patience-modal").addEventListener('click', modalOn);

function modalOn(e){
    
    let start = e.timeStamp
    let time
    
    document.querySelector(".modal").classList.add("show")
    document.querySelector(".modal").classList.add("fadeIn")
    console.log('asd');
    document.addEventListener('click', (e)=> {
        let end = e.timeStamp;
        time = (end - start) / 1000;
        time = time.toFixed(3)
        console.log(time);
        if (time > 0) {
            gameEnd(time);
        }
    })
}

function gameEnd(time){
    document.querySelector('.game-header').textContent = "YOU LOST!"
    document.querySelector('.game-result').textContent = "your score: " + time +"s - that's pretty bad"   
    document.querySelector('.fa-spinner').style.display = 'none';
}

