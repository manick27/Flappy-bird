const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.heigth = 400;

const pressSpace = new Audio('espace.ogg');
const lose =  new Audio('explosion.mp3');

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = 'bg.png';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    heigth: canvas.heigth
}
function handleBackgroud(){
    if(BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else BG.x1 -= gamespeed;
    if(BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else BG.x2 -= gamespeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.heigth);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.heigth);
}


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
    handleBackgroud();
    handleObstacles();
    handleParticles();
    bird.update();
    bird.draw();
    ctx.fillStyle = gradient;
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollision();
    if(handleCollision()) return;
    requestAnimationFrame(animate);
    angle+=0.12;
    hue++;
    frame++;
}
animate();

window.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        spacePressed = true;
        pressSpace.play();
    } 
})
window.addEventListener('keyup', function(e){
    if(e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
})

const bang = new Image();
bang.src =   'baam.png';
function handleCollision(){
    for(let i = 0; i < obstaclesArray.length; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y +  bird.heigth > 0) ||
            (bird.y > canvas.heigth - obstaclesArray[i].bottom &&
            bird.y + bird.heigth < canvas.heigth))){
                //collision detected
                ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                lose.play();
                ctx.font = "25px Georgia";
                ctx.fillStyle = "orange";
                ctx.fillText('Game Over, Your score is: ' + score, 160, 200);
                // alert('Game Over, Your score is ' + score);
                return true;
            }
    }
}
