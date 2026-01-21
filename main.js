let appState = {
    currentScreen: "menu",
    score: {
        ttt: { X: 0, O: 0 },
        rps: { user: 0, computer: 0 }
    },
    ttt: {
        board: ['', '', '', '', '', '', '', '', ''],
        currentPlayer: 'X',
        gameOver: false
    },
    rps: {
        userScore: 0,
        computerScore: 0,
        result: ''
    }
};

// Menu button handlers
document.querySelectorAll(".game-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const game = btn.dataset.game;
        if (!game || btn.classList.contains("disabled")) return;
        loadGame(game);
    });
});

// Load Game
function loadGame(game) {
    appState.currentScreen = game;
    document.getElementById("menu").classList.remove("active");
    
    if (game === "tictactoe") {
        renderTicTacToe();
    } else if (game === "rps") {
        renderRPS();
    }
}

// Back to menu
function backToMenu() {
    appState.currentScreen = "menu";
    document.getElementById("menu").classList.add("active");
    document.getElementById("game-container").innerHTML = "";
}

// ========== TIC TAC TOE ==========
function renderTicTacToe() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="game ttt">
            <h2>Tic Tac Toe</h2>
            <p>Player: <span id="current-player">X</span></p>
            <div class="board">
                ${appState.ttt.board.map((cell, i) => `
                    <div class="cell" onclick="makeMove(${i})">${cell}</div>
                `).join('')}
            </div>
            <button onclick="backToMenu()" class="back-btn">Back to Menu</button>
            <button onclick="resetTicTacToe()" class="reset-btn">Reset Game</button>
        </div>
    `;
}

function makeMove(index) {
    if (appState.ttt.board[index] || appState.ttt.gameOver) return;
    
    appState.ttt.board[index] = appState.ttt.currentPlayer;
    
    const winner = checkWinner();
    if (winner) {
        appState.ttt.gameOver = true;
        alert(`Player ${winner} wins!`);
        resetTicTacToe();
        return;
    }
    
    if (appState.ttt.board.every(cell => cell !== '')) {
        alert("It's a Draw!");
        resetTicTacToe();
        return;
    }
    
    appState.ttt.currentPlayer = appState.ttt.currentPlayer === 'X' ? 'O' : 'X';
    renderTicTacToe();
}

function checkWinner() {
    const board = appState.ttt.board;
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function resetTicTacToe() {
    appState.ttt.board = ['', '', '', '', '', '', '', '', ''];
    appState.ttt.currentPlayer = 'X';
    appState.ttt.gameOver = false;
    renderTicTacToe();
}

// ========== ROCK PAPER SCISSORS ==========
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
    renderRPS();
}

function resetRPS() {
    appState.rps.userScore = 0;
    appState.rps.computerScore = 0;
    appState.rps.result = '';
    renderRPS();
}
