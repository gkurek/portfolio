let DOMstrings = {

    // inputType: '.add__type', 
    // inputDescription: '.add__description', 
    // inputValue: '.add__value',
    // inputBtn: '.add__btn', 
    // incomeContainer: '.income__list',
    // expensesContainer: '.expenses__list', 
    // budgetLabel: '.budget__value', 
    // incomeLabel: '.budget__income--value', 
    // expensesLabel: '.budget__expenses--value',
    // percentageLabel: '.budget__expenses--percentage', 
    // container: '.container', 
    // expensesPercLabel: '.item__percentage', 
    // dateLabel: '.budget__title--month'
}

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

document.querySelector(".projects--1").addEventListener('click', modalOn);

function modalOn(e){
    
    let start = e.timeStamp
    let time
    
    document.querySelector(".modal").classList.add("show")
    document.querySelector(".modal").classList.add("fadeIn")

    document.addEventListener('click', (e)=> {
        let end = e.timeStamp;
        time = (end - start) / 1000;
        time = time.toFixed(3)
        if (time > 0) {
            gameEnd(time);
        }
    })
}

function gameEnd(time){
    document.querySelector('.game-header').textContent = "YOU LOST!";
    document.querySelector('.game-header').style.fontSize = '3em';
    // document.querySelector('.game-result').style.display = 'block';
    document.querySelector('.game-options').style.display = 'block';
    document.querySelector('.fa-spinner').style.display = 'none';
    
    
    // document.querySelector('.game-result').textContent = "your score: " + time +"s - that's pretty bad"   
}

function modalOff(){
    document.querySelector(".modal").classList.add("fadeOut")
    document.querySelector(".modal").classList.remove("fadeIn")
    document.querySelector(".modal").classList.remove("show")
}

// document.querySelector(".projects--1").addEventListener('click', modalOff);