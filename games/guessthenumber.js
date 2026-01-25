// Guess the Number Game Logic

function renderGuessTheNumber() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="game guess-number">
            <h2>🎲 Guess the Number</h2>
            <p>I'm thinking of a number between <strong>1 and 100</strong>. You have <strong>5 tries</strong>!</p>
            
            <div class="game-info">
                <p>Tries remaining: <span id="tries-remaining">5</span></p>
                <p id="hint-message" class="hint-message"></p>
            </div>
            
            <div class="guess-input-container">
                <input type="number" id="guess-input" min="1" max="100" placeholder="Enter your guess..." />
                <button onclick="submitGuess()" class="submit-btn">Submit</button>
            </div>
            
            <div id="guess-history" class="guess-history"></div>
            
            <div id="game-over" class="game-over hidden">
                <p id="game-over-message"></p>
                <button onclick="resetGuessTheNumber()" class="reset-btn">Play Again</button>
            </div>
            
            <button onclick="backToMenu()" class="back-btn">Back to Menu</button>
        </div>
    `;
    
    initGuessTheNumber();
}

function initGuessTheNumber() {
    appState.guessNumber = {
        secretNumber: Math.floor(Math.random() * 100) + 1,
        triesLeft: 5,
        guesses: [],
        gameOver: false
    };
    
    document.getElementById("guess-input").focus();
    document.getElementById("guess-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") submitGuess();
    });
}

function submitGuess() {
    if (appState.guessNumber.gameOver) return;
    
    const input = document.getElementById("guess-input");
    const guess = parseInt(input.value);
    
    if (!guess || guess < 1 || guess > 100) {
        showNotification("Please enter a valid number between 1 and 100");
        return;
    }
    
    const secret = appState.guessNumber.secretNumber;
    appState.guessNumber.guesses.push(guess);
    appState.guessNumber.triesLeft--;
    
    const hintMessage = document.getElementById("hint-message");
    
    if (guess === secret) {
        endGame(true, `🎉 Correct! The number was ${secret}! You got it in ${6 - appState.guessNumber.triesLeft} tries!`);
    } else if (appState.guessNumber.triesLeft === 0) {
        endGame(false, `😢 Game Over! The number was ${secret}. Better luck next time!`);
    } else {
        if (guess < secret) {
            hintMessage.textContent = "📈 Too low! The number is higher.";
            hintMessage.style.color = "#FF9800";
        } else {
            hintMessage.textContent = "📉 Too high! The number is lower.";
            hintMessage.style.color = "#2196F3";
        }
    }
    
    updateGuessDisplay();
    input.value = "";
    input.focus();
}

function updateGuessDisplay() {
    const triesEl = document.getElementById("tries-remaining");
    const historyEl = document.getElementById("guess-history");
    
    triesEl.textContent = appState.guessNumber.triesLeft;
    
    historyEl.innerHTML = appState.guessNumber.guesses.map(guess => {
        const secret = appState.guessNumber.secretNumber;
        let status = "";
        if (guess < secret) status = "📈 Too low";
        else if (guess > secret) status = "📉 Too high";
        else status = "✅ Correct!";
        
        return `<p class="guess-item"><strong>${guess}</strong> - ${status}</p>`;
    }).join("");
}

function endGame(won, message) {
    appState.guessNumber.gameOver = true;
    const gameOverDiv = document.getElementById("game-over");
    const messageEl = document.getElementById("game-over-message");
    
    messageEl.textContent = message;
    messageEl.style.color = won ? "#4CAF50" : "#F44336";
    gameOverDiv.classList.remove("hidden");
    
    document.getElementById("guess-input").disabled = true;
}

function resetGuessTheNumber() {
    renderGuessTheNumber();
}
