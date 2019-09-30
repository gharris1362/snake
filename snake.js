
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


let snakeTrail = [];
let snake2Trail = [];
let snakeX = (snakeY = 5);
let snakeX2 = (snakeY2 = 15);
// Apple
let appleX = Math.floor(Math.random() * gridSize);
let appleY = Math.floor(Math.random() * gridSize);
let lastKey;
let lastKey2;
window.addEventListener('keydown', function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false)

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
    document.getElementById('score').innerHTML = score
}
function drawScore2() {
    document.getElementById('score2').innerHTML = score2
}
function draw() {
    // Move snake in next pos
    snakeX += nextX;
    snakeY += nextY;
    snakeX2 += nextX2;
    snakeY2 += nextY2;
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

    // Snake bite apple? 
    if (snakeX == appleX && snakeY == appleY) {
        tailSize + 1; score++;
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

    else if (snakeX2 == appleX && snakeY2 == appleY) {
        tailSize2++; score2++;
        x = x + 0.5;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
        drawScore2()
        clearInterval(drawInterval)
        drawInterval = setInterval(draw, 1000 / x)
    }
    //paint background
    ctx.fillStyle = "#71b280";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Paint Snake
    ctx.fillStyle = "green";
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
            document.getElementById('score').innerHTML = '0'
            running = false
            gameOver()
        }
        if (snake2Trail[i] !== undefined) {
            if (snakeX == snake2Trail[i].x && snakeY == snake2Trail[i].y) {
                tailSize = defaultTailSize;
                document.getElementById('score').innerHTML = 'SCORE: 0'
                running = false
                gameOver()
            }
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
            document.getElementById('score').innerHTML = '0'
            running = false
            gameOver2()
        }
        if (snakeTrail[i] !== undefined) {
            if (snakeX2 == snakeTrail[i].x && snakeY2 == snakeTrail[i].y) {
                tailSize2 = defaultTailSize;
                document.getElementById('score').innerHTML = '0'
                running = false
                gameOver2()
            }
        }

    }


    // Paint apple 
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    // Set snake trail
    snakeTrail.push({ x: snakeX, y: snakeY });
    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }

    snake2Trail.push({ x: snakeX2, y: snakeY2 });
    while (snake2Trail.length > tailSize2) {
        snake2Trail.shift();
    }



}

// Game Over
function gameOver() {
    alert('Game Over Player 1, Your Score Was: ' + score);
    alert('Player 2 Wins! Player 2 Score was ' + score2);
    snakeTrail = [];
    snake2Trail = [];
    snakeX = (snakeY = 5);
    snakeX2 = (snakeY2 = 15);
    console.log('Game Over')
    score = 0
    score2 = 0
    window.location.reload();
}

function gameOver2() {
    alert('Game Over Player 2, Your Score was ' + score2);
    alert('Player 1 Wins! Player 1 score was ' + score);
    snakeTrail = [];
    snake2Trail = [];
    snakeX = (snakeY = 5);
    snakeX2 = (snakeY2 = 15);
    console.log('Game Over');
    window.location.reload()
    score = 0;
    score2 = 0;
}

// Input 
function keyDownEvent(e) {
    console.log(e.keyCode);
    if (e.keyCode != lastKey) {
        switch (e.keyCode) {
            case 37:
                if (lastKey != 39) {
                    nextX = -1;
                    nextY = 0;
                    lastKey = e.keyCode;
                    break;
                }
                else {
                    return
                }
            case 38: {
                if (lastKey != 40) {
                    console.log(e.keyCode);
                    nextX = 0;
                    nextY = -1;
                    lastKey = e.keyCode;
                    break;
                } else {
                    return
                }
            }

            case 39:
                if (lastKey != 37) {
                    nextX = 1;
                    nextY = 0;
                    lastKey = e.keyCode;
                    break;
                }
                else {
                    return
                }

            case 40: {
                if (lastKey != 38) {
                    nextX = 0;
                    nextY = 1;
                    lastKey = e.keyCode;
                    break;
                }
            }
        }
        //-----------Snake 2 ------------------//
        if (e.keyCode != lastKey2) {
            switch (e.keyCode) {
                case 87:
                    if (lastKey2 != 83) {
                        nextX2 = 0;
                        nextY2 = -1;
                        lastKey2 = e.keyCode;
                        console.log(lastKey2)
                        break;
                    }
                    else {
                        return
                    }
                case 65:
                    if (lastKey2 != 68) {
                        nextX2 = -1;
                        nextY2 = 0;
                        lastKey2 = e.keyCode;
                        break;
                    }
                    else { return }

                case 83:
                    if (lastKey2 != 87) {
                        nextX2 = 0;
                        nextY2 = 1;
                        lastKey2 = e.keyCode;
                        break;
                    }
                    else { return }
                case 68: if (lastKey2 != 65) {
                    nextX2 = 1;
                    nextY2 = 0;
                    lastKey2 = e.keyCode;
                    break;
                }
                else { return }
            }
        }
    }
    if (lastKey == undefined) {
        if (e.keyCode == 37 ||
            e.keyCode == 38 ||
            e.keyCode == 39 ||
            e.keyCode == 40) {
            lastKey = e.keyCode;
            return;
        }
    }
    if (lastKey2 == undefined) {
        if (e.keyCode == 87 ||
            e.keyCode == 65 ||
            e.keyCode == 83 ||
            e.keyCode == 68) {
            lastKey2 = e.keyCode;
            return;
        }
    }
}