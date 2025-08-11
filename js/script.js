const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverScreen = document.getElementById('game-over-screen'); 
const restartBtn = document.getElementById('restart-btn');          

const jumpSound = new Audio('./sounds/Super Mario - Jump (Sound Effect).mp3');
jumpSound.volume = 0.1;
const gamerOversound = new Audio('./sounds/smb_gameover.wav');

const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score'); 
let score = 0;
let scoreTimer = null;


restartBtn.addEventListener('click', () => {
  location.reload();
});



const jump = () => {
 jumpSound.currentTime = 0; 
    jumpSound.play();


    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500)
}


scoreTimer = setInterval(() => {
  score += 1;
  if (scoreEl) scoreEl.textContent = score;
}, 100);

const loop = setInterval(() =>{
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom.replace('px', ''));


    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80 )
    {
        if (scoreTimer) clearInterval(scoreTimer);
        gameOverScreen.classList.remove('hidden');
        gamerOversound.play();
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`

        mario.src = './images/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft ='50px'

        clearInterval(loop)
    }

}, 10)

document.addEventListener('keydown', jump)