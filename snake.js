// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!+
let score = 0;
let score2 = 0;
let running = false;
let canvas, ctx;
let drawInterval;
let x = 7;
// Game Board
let gridSize = (tileSize = 20); // 20 * 20 = 400
let nextX = (nextY = 0);
let nextX2 = (nextY2 = 0);
// Snake 1
let defaultTailSize = 3;
let tailSize = defaultTailSize;
let tailSize2 = defaultTailSize;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let snakeTrail = [];
let snake2Trail = [];
let snakeX = (snakeY = 5);
let snakeX2 = (snakeY2 = 15);
// Apple
let appleX = Math.floor(Math.random() * gridSize);
let appleY = Math.floor(Math.random() * gridSize);


function start() {
    if (running == false) {
        running = true;
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        document.addEventListener('keydown', keyDownEvent);
        drawInterval = setInterval(draw, 1000 / x)
    }
};

// Score
function drawScore() {
    document.getElementById('score').innerHTML = 'SCORE: ' + score
}

function draw() {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!+
    // Move snake in next pos
    snakeX += nextX;
    snakeY += nextY;
    snakeX2 += nextX2;
    snakeY2 += nextY2;

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Snake over game world
    if (snakeX < 0) {
        snakeX = gridSize - 1;
    }
    if (snakeX > gridSize - 1) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = gridSize - 1;
    }
    if (snakeY > gridSize - 1) {
        snakeY = 0
    }
    //-------------------------------------//
    if (snakeX2 < 0) {
        snakeX2 = gridSize - 1;
    }
    if (snakeX2 > gridSize - 1) {
        snakeX2 = 0;
    }
    if (snakeY2 < 0) {
        snakeY2 = gridSize - 1;
    }
    if (snakeY2 > gridSize - 1) {
        snakeY2 = 0
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Snake bite apple? 
    if (snakeX == appleX && snakeY == appleY) {
        tailSize++; score++;
        x = x + 0.5;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
        drawScore()
        if (tailSize++) {
            console.log(score)
        }
        clearInterval(drawInterval)
        drawInterval = setInterval(draw, 1000 / x)
        console.log(x)
    }

    if (snakeX2 == appleX && snakeY2 == appleY) {
        tailSize2++; score2++;
        x = x + 0.5;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
        drawScore()
        if (tailSize2++) {
            console.log(score2)
        }
        clearInterval(drawInterval)
        drawInterval = setInterval(draw, 1000 / x)
        console.log(x)
    }
    //paint background
    ctx.fillStyle = "#71b280";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Paint Snake
    ctx.fillStyle = "green";
    for (i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // Snake bites its tail?
        if (score > 0 && snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            tailSize = defaultTailSize;
            document.getElementById('score').innerHTML = 'SCORE: 0'
            running = false
            gameOver()
        }
    }

    // Paint Snake 2
    ctx.fillStyle = "purple";
    for (i = 0; i < snake2Trail.length; i++) {
        ctx.fillRect(
            snake2Trail[i].x * tileSize,
            snake2Trail[i].y * tileSize,
            tileSize,
            tileSize
        );

        if (score2 > 0 && snake2Trail[i].x == snakeX2 && snake2Trail[i].y == snakeY2) {
            tailSize2 = defaultTailSize;
            document.getElementById('score').innerHTML = 'SCORE: 0'
            running = false
            gameOver()
        }
    }


    // Paint apple 
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Set snake trail
    snakeTrail.push({ x: snakeX, y: snakeY });
    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }

    snake2Trail.push({ x: snakeX2, y: snakeY2 });
    while (snake2Trail.length > tailSize) {
        snake2Trail.shift();
    }
    

     

}

// Game Over
function gameOver() {
    alert('Game Over, Your Score Was: ' + score)
    window.location.reload()
    score = 0
    score2 = 0
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Input 
function keyDownEvent(e) {
    switch (e.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
        //--------Snake 2 Input----------//
        case 87:
            nextX2 = 0;
            nextY2 = -1;
            console.log(`${snakeX2}, ${snakeY2}`)
            break;
        case 65:
            nextX2 = -1;
            nextY2 = 0;
            console.log(`${snakeX2}, ${snakeY2}`)
            break;
        case 83:
            nextX2 = 0;
            nextY2 = 1;

            console.log(`${snakeX2}, ${snakeY2}`)
            break;
        case 68:
            nextX2 = 1;
            nextY2 = 0;
            console.log(`${snakeX2}, ${snakeY2}`)
            break;

    }
}