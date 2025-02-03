// Ensure the script runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script Loaded: Initializing Snake Game...");

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Canvas settings
    const tileSize = 20;
    const rows = canvas.height / tileSize;
    const cols = canvas.width / tileSize;

    let snake = [{ x: 200, y: 200 }];
    let food = getRandomFoodPosition();
    let direction = { x: 0, y: 0 };
    let score = 0;
    let gameRunning = true;

    // Listen for keyboard input
    document.addEventListener("keydown", changeDirection);

    // Touchscreen Controls
    document.getElementById("up").addEventListener("click", () => move("UP"));
    document.getElementById("down").addEventListener("click", () => move("DOWN"));
    document.getElementById("left").addEventListener("click", () => move("LEFT"));
    document.getElementById("right").addEventListener("click", () => move("RIGHT"));

    function gameLoop() {
        if (!gameRunning) return;
        update();
        draw();
        setTimeout(gameLoop, 100);
    }

    function update() {
        // Move the snake
        const head = { x: snake[0].x + direction.x * tileSize, y: snake[0].y + direction.y * tileSize };

        // Check for wall collisions
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            gameOver();
            return;
        }

        // Check for self-collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        // Check if snake ate the food
        if (head.x === food.x && head.y === food.y) {
            score++;
            food = getRandomFoodPosition();
        } else {
            snake.pop();
        }

        updateScore();
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = "#000d26"; // Dark background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = "#FFD700"; // Gold snake
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));

        // Draw food
        ctx.fillStyle = "#FF4500"; // Orange food
        ctx.fillRect(food.x, food.y, tileSize, tileSize);
    }

    function changeDirection(event) {
        const key = event.key.toLowerCase();
        if (key === "arrowup" && direction.y === 0) direction = { x: 0, y: -1 };
        if (key === "arrowdown" && direction.y === 0) direction = { x: 0, y: 1 };
        if (key === "arrowleft" && direction.x === 0) direction = { x: -1, y: 0 };
        if (key === "arrowright" && direction.x === 0) direction = { x: 1, y: 0 };
    }

    function move(dir) {
        if (dir === "UP" && direction.y === 0) direction = { x: 0, y: -1 };
        if (dir === "DOWN" && direction.y === 0) direction = { x: 0, y: 1 };
        if (dir === "LEFT" && direction.x === 0) direction = { x: -1, y: 0 };
        if (dir === "RIGHT" && direction.x === 0) direction = { x: 1, y: 0 };
    }

    function getRandomFoodPosition() {
        return {
            x: Math.floor(Math.random() * cols) * tileSize,
            y: Math.floor(Math.random() * rows) * tileSize
        };
    }

    function updateScore() {
        document.getElementById("score").innerText = `Score: ${score}`;
    }

    function gameOver() {
        gameRunning = false;
        alert("Game Over! Your score: " + score);
        location.reload(); // Restart game
    }

    gameLoop();
});