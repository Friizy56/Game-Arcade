// Reaction Speed Test Game Logic

function renderReactionTest() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="game reaction-test">
            <h2>⚡ Reaction Speed Test</h2>
            <div class="reaction-info">
                <p>Click "Start Test" and wait for the screen to turn green, then click as fast as you can!</p>
            </div>
            <div id="reaction-screen" class="reaction-screen red"></div>
            <div id="reaction-result" class="reaction-result hidden">
                <p id="reaction-time">Your reaction time: <strong>0ms</strong></p>
                <p id="reaction-feedback"></p>
            </div>
            <div class="reaction-controls">
                <button onclick="startReactionTest()" class="start-btn" id="start-btn">Start Test</button>
                <button onclick="backToMenu()" class="back-btn">Back to Menu</button>
            </div>
        </div>
    `;
}

function startReactionTest() {
    const screen = document.getElementById("reaction-screen");
    const resultDiv = document.getElementById("reaction-result");
    const startBtn = document.getElementById("start-btn");
    
    // reset the screen
    screen.className = "reaction-screen red";
    resultDiv.classList.add("hidden");
    startBtn.disabled = true;
    
    // Random delay between 1-4 seconds
    const delay = Math.random() * 3000 + 1000;
    
    setTimeout(() => {
        const startTime = Date.now();
        screen.className = "reaction-screen green";
        
        function handleClick() {
            screen.removeEventListener("click", handleClick);
            const reactionTime = Date.now() - startTime;
            
            screen.className = "reaction-screen gray";
            showReactionResult(reactionTime);
            startBtn.disabled = false;
        }
        
        screen.addEventListener("click", handleClick);
        
        // timeout if user doesn't click within 5 seconds
        setTimeout(() => {
            if (screen.classList.contains("green")) {
                screen.removeEventListener("click", handleClick);
                showNotification("Too slow! Try again.");
                screen.className = "reaction-screen red";
                startBtn.disabled = false;
            }
        }, 5000);
    }, delay);
}

function showReactionResult(time) {
    const resultDiv = document.getElementById("reaction-result");
    const timeDisplay = document.getElementById("reaction-time");
    const feedback = document.getElementById("reaction-feedback");
    
    timeDisplay.innerHTML = `Your reaction time: <strong>${time}ms</strong>`;
    
    //feedback based on reaction time
    if (time < 150) {
        feedback.textContent = "🚀 Incredible! You're a speed demon!";
        feedback.style.color = "#4CAF50";
    } else if (time < 200) {
        feedback.textContent = "⭐ Excellent! That's very fast!";
        feedback.style.color = "#2196F3";
    } else if (time < 250) {
        feedback.textContent = "👍 Good! Average human reaction time is ~250ms";
        feedback.style.color = "#FF9800";
    } else {
        feedback.textContent = "🎯 Not bad! Practice makes perfect!";
        feedback.style.color = "#F44336";
    }
    
    resultDiv.classList.remove("hidden");
}
