// Tic Tac Toe Game Logic

function renderTicTacToe() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="game ttt">
            <h2>Tic Tac Toe</h2>
            <p>Player: <span id="current-player">${appState.ttt.currentPlayer}</span></p>
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
        showNotification(`Player ${winner} won!`);
        setTimeout(resetTicTacToe, 1500);
        return;
    }
    
    if (appState.ttt.board.every(cell => cell !== '')) {
        showNotification("It's a Draw!");
        setTimeout(resetTicTacToe, 1500);
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
