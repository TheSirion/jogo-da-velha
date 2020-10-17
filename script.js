const replayButton = document.getElementById("replayButton");
const cells = document.querySelectorAll(".cell");
const humanPlayer = "X";
const machinePlayer = "O";
let board;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// inicia o jogo
const startGame = () => {
  board = Array.from(Array(9).keys()); // cria uma array com números de 0 a 8 para representar o campo

  // define cada célula para seu estágio inicial no jogo.
  cells.forEach((cell) => {
    cell.style.removeProperty("background-color");
    cell.innerText = "";
    cell.addEventListener("click", turnClick, false);
  });
};

// chama a função turn() quando uma célula é clicada.
const turnClick = (square) => {
  turn(square.target.id, humanPlayer);
};

// controla o turno do jogador
const turn = (squareId, player) => {
  board[squareId] = player; // registra a jogada atual na array board
  console.log(board);
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(board, player);
  if (gameWon) gameOver(gameWon);
};

const checkWin = (board, player) => {
  // cria uma array com os índices no tabuleiro onde o jogador fez suas jogadas.
  let plays = board.reduce(
    (accumulator, element, index) =>
      element === player ? accumulator.concat(index) : accumulator,
    []
  );

  let gameWon = null;

  // para cada array em winConditions, cada elemento é comparado
  // com os selecionados no tabuleiro. Se os itens da array forem iguais
  // aos da array plays, a vitória está confirmada e a variável gameWon
  // recebe um objeto com o jogador vitorioso e o índice da sequência vitoriosa.
  winConditions.forEach((win, index) => {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
    }
  });

  console.log(gameWon);
  return gameWon;
};

const gameOver = (gameWon) => {
  // colore o fundo de cada célula de acordo com o vencedor.
  for (let index of winConditions[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == humanPlayer ? "cyan" : "red";
  }
  // remove a capacidade de clicar nas células.
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick);
  }
};

replayButton.addEventListener("click", startGame);

startGame();
