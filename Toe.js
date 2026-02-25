const statusText = document.getElementById("status");
const board = document.getElementById("board");
const cells = Array.from(board.querySelectorAll(".cell"));
const restartButton = document.getElementById("restart");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let gameActive = true;
let boardState = Array(9).fill("");

const updateStatus = (message) => {
  statusText.textContent = message;
};

const checkWinner = () => {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return null;
};

const handleCellClick = (event) => {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (!gameActive || boardState[index]) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "cell--x" : "cell--o");
  cell.setAttribute("aria-label", `Cell ${index + 1} ${currentPlayer}`);
  cell.disabled = true;

  const winner = checkWinner();
  if (winner) {
    updateStatus(`Player ${winner} wins!`);
    gameActive = false;
    cells.forEach((button) => (button.disabled = true));
    return;
  }

  if (boardState.every((value) => value)) {
    updateStatus("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Player ${currentPlayer}'s turn`);
};

const resetGame = () => {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  updateStatus("Player X's turn");

  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.classList.remove("cell--x", "cell--o");
    cell.disabled = false;
    cell.setAttribute("aria-label", `Cell ${index + 1}`);
  });
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", resetGame);
