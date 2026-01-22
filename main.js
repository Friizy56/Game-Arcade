let appState = {
    currentScreen: "menu",
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

document.querySelectorAll(".game-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("disabled")) return;
        const game = btn.classList.contains("tictactoe") ? "tictactoe" : btn.classList.contains("rps") ? "rps" : null;
        if (!game) return;
        loadGame(game);
    });
});

function loadGame(game) {
    appState.currentScreen = game;
    document.getElementById("menu").classList.remove("active");
    
    if (game === "tictactoe") {
        renderTicTacToe();
    } else if (game === "rps") {
        renderRPS();
    }
}

function backToMenu() {
    appState.currentScreen = "menu";
    document.getElementById("menu").classList.add("active");
    document.getElementById("game-container").innerHTML = "";
}

function showNotification(message) {
    const modal = document.getElementById("notification-modal");
    const messageEl = document.getElementById("notification-message");
    messageEl.textContent = message;
    modal.classList.remove("hidden");
}

function closeNotification() {
    const modal = document.getElementById("notification-modal");
    modal.classList.add("hidden");
}
