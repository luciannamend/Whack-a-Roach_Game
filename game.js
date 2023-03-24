const holes = [...document.querySelectorAll('.hole')]; // [...] array of 9 divs
const scoreEl = document.querySelector('.score span');
const resetScoreBtn = document.getElementById('resetScore');
const resetSpeedBtn = document.getElementById('resetSpeed');
const restartGameBtn = document.getElementById('restartGame');
let score = 0;
let timer = null;
let miliseconds = 2000;
let speedFactor = 0;  //this is the condition checked to define the roach speed

function roachRuns() {

    //gets a random number to choose which hole roach should appear
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    const roachImg = document.createElement('img');
    roachImg.classList.add('roach');
    roachImg.src = '/img/roach_running1.png';    

    roachImg.addEventListener('click', () => {

        score += 1;

        if (speedFactor < score ) {            
            speedFactor +=1;
        }

        scoreEl.textContent = score;
        roachImg.src = '/img/roach_dead.png';
        roachImg.classList.add('roachDead');
        
        clearTimeout(timer); 
        
        //Condition statements to determine the roach speed 
        // easy level
        if (speedFactor > 5 && speedFactor <= 15) {
            miliseconds = 1600;
            
        }
        
        //moderate level
        else if (speedFactor >= 16 && speedFactor <= 25) {
            miliseconds = 1200;
        }
    
        //difficult level
        else if (speedFactor >= 26 && speedFactor <= 35 ) {
            miliseconds = 800;
        }
        
        //almost impossible level
        else if (speedFactor >= 36) {
            miliseconds = 500;
        }
    
        else {
            miliseconds = 2000;
        }
        
        setTimeout(() => {
            hole.removeChild(roachImg);
            roachRuns();   
        }, miliseconds);           
    });

    hole.appendChild(roachImg);
    
    timer = setTimeout(() => {
        hole.removeChild(roachImg);
        roachRuns();           
    }, miliseconds);   
};

roachRuns();

//Resets score only
resetScoreBtn.addEventListener('click', () => {
    score = 0;
    scoreEl.textContent = score;
});

//Resets speed only
resetSpeedBtn.addEventListener('click', () => {
    miliseconds = 2000;
    speedFactor = 0;
});

//Restarts the Game - resets score and speed
restartGameBtn.addEventListener('click', () => {
    miliseconds = 2000;
    speedFactor = 0;
    score = 0;
    scoreEl.textContent = score;
});