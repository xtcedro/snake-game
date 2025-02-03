// Game Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas Size (Adjusts Dynamically)
const TILE_SIZE = 20;
canvas.width = 400;
canvas.height = 400;

// Snake Properties
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = generateFood();
let score = 0;
let gameRunning = false;

// Touch Control Buttons
const controls = {
    up: document.getElementById("up"),
    down: document.getElementById("down"),
    left: document.getElementById("left"),
    right: document.getElementById("right"),
};

// Start Game on First Move
document.addEventListener("keydown", (event) => {
    if (!gameRunning) gameRunning = true;

    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -TILE_SIZE };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: TILE_SIZE };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -TILE_SIZE, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: TILE_SIZE, y: 0 };
            break;
    }
});

// Touch Controls for Mobile
Object.keys(controls).forEach((key) => {
    controls[key].addEventListener("click", () => {
        if (!gameRunning) gameRunning = true;

        switch (key) {
            case "up":
                if (direction.y === 0) direction = { x: 0, y: -TILE_SIZE };
                break;
            case "down":
                if (direction.y === 0) direction = { x: 0, y: TILE_SIZE };
                break;
            case "left":
                if (direction.x === 0) direction = { x: -TILE_SIZE, y: 0 };
                break;
            case "right":
                if (direction.x === 0) direction = { x: TILE_SIZE, y: 0 };
                break;
        }
    });
});

// Game Loop
function gameLoop() {
    if (!gameRunning) return;

    update();
    draw();

    setTimeout(gameLoop, 150); // Adjust speed
}

// Update Snake Position
function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Collision Detection
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snakeCollision(head)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    // Check for Food Consumption
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = score;
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Draw Game Elements
function draw() {
    ctx.fillStyle = "#001f54"; // Dark Blue Background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Food
    ctx.fillStyle = "#FFD700"; // Gold Food
    ctx.fillRect(food.x, food.y, TILE_SIZE, TILE_SIZE);

    // Draw Snake
    ctx.fillStyle = "#ffffff"; // White Snake
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, TILE_SIZE, TILE_SIZE);
    });
}

// Generate Random Food Position
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / TILE_SIZE)) * TILE_SIZE,
        y: Math.floor(Math.random() * (canvas.height / TILE_SIZE)) * TILE_SIZE,
    };
}

// Check for Snake Collision with Itself
function snakeCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Reset Game on Collision
function resetGame() {
    alert("Game Over! Your Score: " + score);
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    food = generateFood();
    score = 0;
    document.getElementById("score").innerText = score;
    gameRunning = false;
}

// Start Game
gameLoop();