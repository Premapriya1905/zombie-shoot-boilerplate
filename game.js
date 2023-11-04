// Iteration 1: Declare variables required for this game
const gamebody=document.getElementById("game-body");
var timer=document.getElementById("timer").textContent;
const $lives=document.getElementById("lives");
var zombieId=0;
const images=[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
];


// Iteration 1.2: Add shotgun sound
const shotgunaudio=new Audio("https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav");
shotgunaudio.volume=0.2;
gamebody.onclick=()=>{
    shotgunaudio.pause();
    shotgunaudio.currentTime=0;
    shotgunaudio.play();

};


// Iteration 1.3: Add background sound
const backgroundAudio=new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3");
backgroundAudio.play();
backgroundAudio.loop=true;

// Iteration 1.4: Add lives
const maxlives=4;
var lives=4;

// Iteration 2: Write a function to make a zombie
function makeZombie(){
    randomImages=images[getRandomInt(0,images.length)];
    gamebody.innerHTML+=`<img src="./assets/${randomImages}" class="zombie-image" id="zombie${zombieId}">`;
    let zombie=document.getElementById("zombie"+zombieId);
    zombie.style.transform=`translateX(${getRandomInt(20,80)}vw)`;
    zombie.style.animationDuration=`${getRandomInt(2,6)}s`;
    zombie.onclick=()=>{
        zombieDestruct(zombie);
    };
}


// Iteration 3: Write a function to check if the player missed a zombie
function missedZombie(zombie){
    if(zombie.getBoundingClientRect().top<=0){
        lives--;
        return true;
    }
    return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestruct(zombie){
    zombie.style.display="none";
    zombieId++;
    makeZombie();
}

// Iteration 5: Creating timer
var timerId=setInterval(function(){
    timer--;
    document.getElementById("timer").textContent=timer;
    let zombie=document.getElementById("zombie"+zombieId);
    if(missedZombie(zombie)==true){
        zombieDestruct(zombie);
        if(lives==0){
            clearInterval(timer);
            location.href="./game-over.html";
        }
    }
    if(timer==0){
        clearInterval(timer);
        location.href="./win.html";
    }

},1000);

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie(zombieId);


// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min)) + min;
}