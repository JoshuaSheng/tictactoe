const gameBoard = (() => {
  const board = [["", "", ""], ["", "", ""], ["", "", ""]]
  const win = (player, x, y) => {
    console.log(player)
    let win = 0
    if (board[x][0] == player.getPiece() && board[x][1] == player.getPiece() && board[x][2] == player.getPiece()) {
      return 1
    }
    if (board[0][y] == player.getPiece() && board[1][y] == player.getPiece() && board[2][y] == player.getPiece()) {
      return 1
    }
    if (board[0][0] == player.getPiece() && board[1][1] == player.getPiece() && board[2][2] == player.getPiece()) {
      return 1
    }
    if (board[0][2] == player.getPiece() && board[1][1] == player.getPiece() && board[2][0] == player.getPiece()) {
      return 1
    }
    return 0
  }
  const checkGameEnd = (player, x, y) => {
    let currPiece = player.getPiece();
    if (win(player, x, y)) {
      return 1
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          return -1
        }
      }
    }
    return 0
  }
  const gameEnd = (val, player) => {
    if (val == -1) {
      return
    }

    if (val == 1) {
      alert(`${player.getName()} won!`)
    }
    else if (val == 0) {
      alert(`It was a tie!`)
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = ""
      }
    }
    const boxes = document.querySelectorAll(".box")
    boxes.forEach((box) => {
      box.textContent = ""
    })
  }
  const gameMove = (player, coord, target) => {
    let x = Math.floor(coord/3)
    let y = coord%3
    if(!(board[x][y])) {
      board[x][y] = player.getPiece();
      target.textContent = player.getPiece();
      gameEnd(checkGameEnd(player, x, y), player)

    }
  }
  return {gameMove, board}
})();

const player = function (name, piece) {
  const getName = () => name;
  const getPiece = () => piece;
  return {getName, getPiece}
}

const displayController = (() => {
  const game = () => {
    let turn = 1
    const p1 = player("p1", "x");
    const p2 = player("p2", "o");
    const boxes = document.querySelectorAll(".box")
    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        if (turn == 1) {
          gameBoard.gameMove(p1, e.target.getAttribute("data-val"), e.target)
          turn = 2
        }
        else {
          gameBoard.gameMove(p2, e.target.getAttribute("data-val"), e.target)
          turn = 1
        }
      })
    })
  }
  return {game}
})();

displayController.game()
