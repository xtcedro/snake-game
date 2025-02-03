document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Snake Game Loaded!");

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const tileSize = 20;
    const rows = canvas.height / tileSize;
    const cols = canvas.width / tileSize;

    let snake = [{ x: 200, y: 200 }];
    let food = getRandomFoodPosition();
    let direction = null;
    let score = 0;
    let gameRunning = false;

    // Start game on first input
    function startGame() {
        if (!gameRunning) {
            console.log("🚀 Game Started!");
            gameRunning = true;
            requestAnimationFrame(gameLoop);
        }
    }

    // Keyboard Controls
    document.addEventListener("keydown", (event) => {
        startGame(); // Ensure game starts
        const key = event.key.toLowerCase();
        if (key === "arrowup" && direction?.y === 0) direction = { x: 0, y: -1 };
        if (key === "arrowdown" && direction?.y === 0) direction = { x: 0, y: 1 };
        if (key === "arrowleft" && direction?.x === 0) direction = { x: -1, y: 0 };
        if (key === "arrowright" && direction?.x === 0) direction = { x: 1, y: 0 };
    });

    // Touchscreen Controls
    document.getElementById("up").addEventListener("click", () => move("UP"));
    document.getElementById("down").addEventListener("click", () => move("DOWN"));
    document.getElementById("left").addEventListener("click", () => move("LEFT"));
    document.getElementById("right").addEventListener("click", () => move("RIGHT"));

    function move(dir) {
        startGame(); // Ensure game starts
        if (dir === "UP" && direction?.y === 0) direction = { x: 0, y: -1 };
        if (dir === "DOWN" && direction?.y === 0) direction = { x: 0, y: 1 };
        if (dir === "LEFT" && direction?.x === 0) direction = { x: -1, y: 0 };
        if (dir === "RIGHT" && direction?.x === 0) direction = { x: 1, y: 0 };
    }

    function gameLoop() {
        if (!gameRunning) return;
        update();
        draw();
        setTimeout(() => requestAnimationFrame(gameLoop), 100);
    }

    function update() {
        if (!direction) return;

        const head = { 
            x: snake[0].x + direction.x * tileSize, 
            y: snake[0].y + direction.y * tileSize 
        };

        // Check wall collision
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            gameOver();
            return;
        }

        // Check self-collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            food = getRandomFoodPosition();
        } else {
            snake.pop();
        }

        updateScore();
    }

    function draw() {
        ctx.fillStyle = "#000d26";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#FFD700";
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));

        ctx.fillStyle = "#FF4500";
        ctx.fillRect(food.x, food.y, tileSize, tileSize);
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
        alert(`Game Over! Your score: ${score}`);
        location.reload();
    }
});