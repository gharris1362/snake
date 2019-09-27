let score = 0;
let gameEnd = false;
let canvas, ctx;
/*window.onload =*/ function start() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    document.addEventListener('keydown', keyDownEventp1 /*, keyDownEventp2*/);
    // const scoreBoard = document.getElementById('score');
    let x = 8;
    setInterval(draw, 700 / x);
};

// Game Board
let gridSize = (tileSize = 20); // 20 * 20 = 400
let nextX = (nextY = 0);

// Snake 1
let defaultTailSize = 3;
let tailSize = defaultTailSize;
let snakeTrail = [];
let snakeX = (snakeY = 10);

// Score
function drawScore() {
    document.getElementById('score').innerHTML = 'SCORE: ' + score
}

// Apple
let appleX = (appleY = 15);
function draw() {

    // Move snake in next pos
    snakeX += nextX;
    snakeY += nextY;
    
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
    
    // Snake bite apple? 
    if (snakeX == appleX && snakeY == appleY) {
        tailSize++; score++;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
        drawScore()
        if (tailSize++) {
            console.log(score)
        }
    }
    
    //paint background
    ctx.fillStyle = "#71b280";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Paint Snake
    ctx.fillStyle = "darkgreen";
    for (i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );
        
        // Snake bites its tail?
        if (score > 0 && snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            tailSize = defaultTailSize;
            document.getElementById('score').innerHTML = 'SCORE: 0'
            gameEnd = true
            gameOver()
        }
    }
    
    // Game Over
    function gameOver() {
        alert('Game Over, Your Score Was: ' + score)
        window.location.reload()
        score = 0 
    }

        // Paint apple 
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
        
        // Set snake trail
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
            snakeTrail.shift();
        }
    }
    
    // Input P1
    function keyDownEventp1(e) {
        switch (e.keyCode) {
            case 37:
                nextX = -1;
                nextY = 0;
                break;
            case 38:
                nextX = 0;
                nextY = -1;
                !40;
                break;
            case 39:
                nextX = 1;
                nextY = 0;
                break;
            case 40:
                nextX = 0;
                nextY = 1;
                !38
                break;
        }
    }


        // // Input P1
        // function keyDownEventp1(e) {
        //     switch (e.keyCode) {
        //         case 65:
        //             nextX = -1;
        //             nextY = 0;
        //             break;
        //         case 87:
        //             nextX = 0;
        //             nextY = -1;
        //             break;
        //         case 68:
        //             nextX = 1;
        //             nextY = 0;
        //             break;
        //         case 83:
        //             nextX = 0;
        //             nextY = 1;
        //             break;
        //     }
        // }