// Get the game canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

// Snake properties
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = getRandomFoodPosition();
let score = 0;
const gridSize = 20;

// Listen for key presses
document.addEventListener("keydown", changeDirection);

// Add touch support for mobile
document.getElementById("up").addEventListener("click", () => setDirection("UP"));
document.getElementById("down").addEventListener("click", () => setDirection("DOWN"));
document.getElementById("left").addEventListener("click", () => setDirection("LEFT"));
document.getElementById("right").addEventListener("click", () => setDirection("RIGHT"));

// Game loop
setInterval(updateGame, 100);

function updateGame() {
    moveSnake();
    checkCollision();
    drawGame();
}

// Move the snake
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= gridSize;
    if (direction === "DOWN") head.y += gridSize;
    if (direction === "LEFT") head.x -= gridSize;
    if (direction === "RIGHT") head.x += gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = getRandomFoodPosition();
    } else {
        snake.pop(); // Remove tail
    }
}

// Change direction with arrow keys
function changeDirection(event) {
    const key = event.key;
    setDirection(
        key === "ArrowUp" ? "UP" :
        key === "ArrowDown" ? "DOWN" :
        key === "ArrowLeft" ? "LEFT" :
        key === "ArrowRight" ? "RIGHT" : direction
    );
}

// Change direction via touch buttons
function setDirection(newDirection) {
    if (
        (newDirection === "UP" && direction !== "DOWN") ||
        (newDirection === "DOWN" && direction !== "UP") ||
        (newDirection === "LEFT" && direction !== "RIGHT") ||
        (newDirection === "RIGHT" && direction !== "LEFT")
    ) {
        direction = newDirection;
    }
}

// Get random position for food
function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
    };
}

// Check for collisions
function checkCollision() {
    const head = snake[0];

    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }
}

// Reset game after collision
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = getRandomFoodPosition();
    score = 0;
}

// Draw the game
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "#FFD700";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}