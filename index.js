
document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const game = document.getElementById('game');
    const scoreDisplay = document.getElementById('scoreDisplay');
    let isJumping = false;
    let jumpHeight = 0;
    let score = 0;
    let cactusSpeed = 5;
    let cactusIntervals = []; // Store cactus intervals
    let cactusCreationInterval = null; // Interval for creating cacti

    function jump() {
        if (isJumping) return;
        isJumping = true;

        let upInterval = setInterval(() => {
            if (jumpHeight >= 100) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                        jumpHeight = 0;
                    }
                    jumpHeight -= 3; // Smooth descent
                    dino.style.bottom = jumpHeight + 'px';
                }, 15);
            }
            jumpHeight += 3; // Smooth ascent
            dino.style.bottom = jumpHeight + 'px';
        }, 15);
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            jump();
        }
    });

    game.addEventListener('touchstart', () => {
        jump();
    });

    function createCactus() {
        const cactus = document.createElement('img');
        cactus.src = 'download__2_-removebg-preview.png';
        cactus.classList.add('cactus');
        game.appendChild(cactus);

        let cactusPosition = game.offsetWidth;

        const moveCactus = setInterval(() => {
            if (cactusPosition < -50) {
                // Cactus is off-screen
                clearInterval(moveCactus);
                cactus.remove();
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            } else if (
                cactusPosition > dino.offsetLeft && // Check cactus is still in front of dino
                cactusPosition < dino.offsetLeft + dino.offsetWidth && // Cactus overlaps horizontally with dino
                parseInt(window.getComputedStyle(dino).bottom) < 60 // Dino is low enough for collision
            ) {
                clearInterval(moveCactus);
                stopCactusCreation();
                alert(`Game Over! Your Score: ${score}`);
                resetGame(); // Reset the game state when game is over
            }
            cactusPosition -= cactusSpeed;
            cactus.style.left = cactusPosition + 'px';
        }, 20);

        cactusIntervals.push(moveCactus); // Store interval so it can be cleared later
    }

    function startCactusCreation() {
        cactusCreationInterval = setInterval(createCactus, 2000);
    }

    function stopCactusCreation() {
        clearInterval(cactusCreationInterval); // Stop cactus creation
        cactusIntervals.forEach(interval => clearInterval(interval)); // Clear all movement intervals
        cactusIntervals = []; // Reset cactus intervals array
        const cacti = document.querySelectorAll('.cactus'); // Remove all cactus elements
        cacti.forEach(cactus => cactus.remove());
    }

    function resetGame() {
        stopCactusCreation(); // Stop all cactus-related intervals and remove them
        score = 0; // Reset score
        scoreDisplay.textContent = `Score: ${score}`;
        dino.style.bottom = '0px'; // Reset dino position
        jumpHeight = 0; // Reset jump height
        isJumping = false; // Reset jumping state
        startCactusCreation(); // Restart cactus creation
    }

    startCactusCreation(); // Start the game initially

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopCactusCreation(); // Stop cactus intervals when the tab is inactive
        } else {
            startCactusCreation(); // Restart cactus creation when the tab is active
        }
    });
});




/*document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const game = document.getElementById('game');
    const scoreDisplay = document.getElementById('scoreDisplay');
    let isJumping = false;
    let jumpHeight = 0;
    let score = 0;
    let cactusSpeed = 5;
    let cactusIntervals = []; // Store cactus intervals
    let cactusCreationInterval = null; // Interval for creating cacti

    function jump() {
        if (isJumping) return;
        isJumping = true;

        let upInterval = setInterval(() => {
            if (jumpHeight >= 150) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                        jumpHeight = 0;
                    }
                    jumpHeight -= 5;
                    dino.style.bottom = jumpHeight + 'px';
                }, 20);
            }
            jumpHeight += 5;
            dino.style.bottom = jumpHeight + 'px';
        }, 20);
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            jump();
        }
    });

    game.addEventListener('touchstart', () => {
        jump();
    });

    function createCactus() {
        const cactus = document.createElement('img');
        cactus.src = 'download__2_-removebg-preview.png';
        cactus.classList.add('cactus');
        game.appendChild(cactus);

        let cactusPosition = game.offsetWidth;

        const moveCactus = setInterval(() => {
            if (cactusPosition < -50) {
                clearInterval(moveCactus);
                cactus.remove();
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            } else if (
                cactusPosition < dino.offsetLeft + dino.offsetWidth &&
                cactusPosition + 50 > dino.offsetLeft &&
                parseInt(window.getComputedStyle(dino).bottom) < 60
            ) {
                clearInterval(moveCactus);
                alert(`Game Over! Your Score: ${score}`);
                resetGame(); // Reset the game state when the game is over
            }
            cactusPosition -= cactusSpeed;
            cactus.style.left = cactusPosition + 'px';
        }, 20);

        cactusIntervals.push(moveCactus); // Store interval so it can be cleared later
    }

    function startCactusCreation() {
        cactusCreationInterval = setInterval(createCactus, 2000);
    }

    function stopCactusCreation() {
        clearInterval(cactusCreationInterval); // Stop cactus creation
        cactusIntervals.forEach(interval => clearInterval(interval)); // Clear all movement intervals
        cactusIntervals = []; // Reset cactus intervals array
        const cacti = document.querySelectorAll('.cactus'); // Remove all cactus elements
        cacti.forEach(cactus => cactus.remove());
    }

    function resetGame() {
        stopCactusCreation(); // Stop all cactus-related intervals and remove them
        score = 0; // Reset score
        scoreDisplay.textContent = `Score: ${score}`;
        dino.style.bottom = '0px'; // Reset dino position
        jumpHeight = 0; // Reset jump height
        isJumping = false; // Reset jumping state
        startCactusCreation(); // Restart cactus creation
    }

    startCactusCreation(); // Start the game initially

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopCactusCreation(); // Stop cactus intervals when the tab is inactive
        } else {
            startCactusCreation(); // Restart cactus creation when the tab is active
        }
    });
});*/
