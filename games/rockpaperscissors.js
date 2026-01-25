// Rock Paper Scissors Game Logic

function renderRPS() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="game rps">
            <h2>Rock Paper Scissors</h2>
            <div class="scores">
                <p>You: <span>${appState.rps.userScore}</span></p>
                <p>Computer: <span>${appState.rps.computerScore}</span></p>
            </div>
            <div class="result">${appState.rps.result}</div>
            <div class="choices">
                <button onclick="playRPS('rock')" class="choice">🪨 Rock</button>
                <button onclick="playRPS('paper')" class="choice">📄 Paper</button>
                <button onclick="playRPS('scissors')" class="choice">✂️ Scissors</button>
            </div>
            <button onclick="backToMenu()" class="back-btn">Back to Menu</button>
            <button onclick="resetRPS()" class="reset-btn">Reset Scores</button>
        </div>
    `;
}

function loadRPSScores() {
    const savedScores = localStorage.getItem('rpsScores');
    if (savedScores) {
        const scores = JSON.parse(savedScores);
        appState.rps.userScore = scores.userScore;
        appState.rps.computerScore = scores.computerScore;
    }
}

function saveRPSScores() {
    const scores = {
        userScore: appState.rps.userScore,
        computerScore: appState.rps.computerScore
    };
    localStorage.setItem('rpsScores', JSON.stringify(scores));
}

function playRPS(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    let result = '';
    if (userChoice === computerChoice) {
        result = "It's a Draw!";
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = `You win! ${userChoice} beats ${computerChoice}`;
        appState.rps.userScore++;
    } else {
        result = `Computer wins! ${computerChoice} beats ${userChoice}`;
        appState.rps.computerScore++;
    }
    
    appState.rps.result = result;
    saveRPSScores();
    renderRPS();
}

function resetRPS() {
    appState.rps.userScore = 0;
    appState.rps.computerScore = 0;
    appState.rps.result = '';
    saveRPSScores();
    renderRPS();
}
