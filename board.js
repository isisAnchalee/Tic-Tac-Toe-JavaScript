function Board () {
  this.grid = [ 
    ['_', '_', '_'], 
    ['_', '_', '_'], 
    ['_', '_', '_'] 
  ]; 
  this.winner = null;
}


Board.prototype.checkWinner = function () {
  var posSeqs = [
    // horizontals
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // verticals
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];

  for (var i = 0; i < posSeqs.length; i++) {
    var winner = this.winnerHelper(posSeqs[i]);
    if (winner != null) {
      return winner;
    }
  }

  return null;
};

Board.marks = ["x", "o"];

Board.prototype.hasWon = function () {
  
  return this.checkWinner()
  
};


Board.prototype.winnerHelper = function (posSeq) {
  for (var markIdx = 0; markIdx < Board.marks.length; markIdx++) {
    var targetMark = Board.marks[markIdx];
    var winner = true;
    for (var posIdx = 0; posIdx < 3; posIdx++) {
      var pos = posSeq[posIdx];
      var mark = this.grid[pos[0]][pos[1]];

      if (mark != targetMark) {
        winner = false;
      }
    }

    if (winner) {
      return targetMark;
    }
  }

  return null;
};

Board.prototype.isOver = function () {
  if (this.winner() != null) {
    return true;
  }

  for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (var colIdx = 0; colIdx < 3; colIdx++) {
      if (this.isEmptyPos([rowIdx, colIdx])) {
        return false;
      }
    }
  }

  return true;
};

Board.prototype.isEmptyPos = function (pos) {
  if (!Board.isValidPos(pos)) {
    throw new MoveError("Is not valid position!");
  }

  return (this.grid[pos[0]][pos[1]] === null);
};

Board.prototype.validMove = function (pos, spot) {
  return spot === '_' ? true : false
};

Board.prototype.move = function (pos, mark) {
  // console.log(pos);
  var spot = this.grid[pos[0]][pos[1]];
  
  if (this.validMove(pos, spot)) {
    this.grid[pos[0]][pos[1]] = mark;
  } else {
    console.log("Spot not valid.");
  }
};


module.exports = Board;



