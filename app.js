let loginData = JSON.parse(localStorage.getItem('users'));
let playerName = document.querySelector('.player-name');
playerName.textContent = loginData[0].name;

const score = document.querySelector('.score');
const highScore = document.querySelector('.high-score');
highScore.innerHTML = loginData[0].highScore;
const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game-screen');
let player = { speed: 5, score: 0 };

startScreen.addEventListener('click', start);

let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;

}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;

}
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right) );
}
function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';

    })
}
function endGame() {
    player.start = false;
    
    gameScreen.classList.add('hide');
    startScreen.classList.remove('hide');
    window.location.href = 'leaderboard.html';
}
document.querySelector('.leaderboard').addEventListener('click', () =>{
    window.location.href = 'leaderboard.html';
})
function moveCar(car) {
    let other = document.querySelectorAll('.other');
    other.forEach(function (item) {
        if (isCollide(car, item)) {
            console.log('HIT');
            endGame();
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 300) + 'px';
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';

    })
}
let finalScore = 0;
let finalHighScore = 0;
let highest = loginData[0].highScore;

function gamePlay() {

    let car = document.querySelector('.car');
    let road = gameScreen.getBoundingClientRect();
    // console.log(road)
    if (player.start) {

        moveLines();
        moveCar(car);
        if (keys.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 90)) {
            player.x += player.speed;
        }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        //console.log(player.score++);
        player.score++;

        if (player.score >= highest) {
            highest = player.score;

        }
        score.innerHTML = player.score;
        finalScore = player.score;
        finalHighScore = highest;




        loginData[0].highScore = finalHighScore;
        highScore.innerHTML = loginData[0].highScore;
        loginData[0].score = finalScore;
        highScore.innerHTML = loginData[0].highScore;

        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(loginData));
    }

}


function start() {
    //gameScreen.classList.remove('hide');
    startScreen.classList.add('hide');
    gameScreen.classList.remove('hide');
    document.querySelector('.finalLeaderboard').classList.add('hide');
    gameScreen.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);



    for (x = 0; x < 5; x++) {
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'lines');
        roadline.y = (x * 150);
        roadline.style.top = roadline.y + 'px';
        gameScreen.appendChild(roadline);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameScreen.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for (x = 0; x < 3; x++) {
        let othercar = document.createElement('div');
        othercar.setAttribute('class', 'other');
        othercar.y = ((x + 1) * 350) * -1;
        othercar.style.top = othercar.y + 'px';

        othercar.style.left = Math.floor(Math.random() * 350) + 'px';
        gameScreen.appendChild(othercar);
    }
}

