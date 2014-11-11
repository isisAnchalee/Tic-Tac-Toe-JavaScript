var Board = require("./board");
var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Game () {
  this.board = new Board ();
  this.curPlayer = 'x';
  // this.winner = Board.
}

Game.prototype.togglePlayer = function () {
  this.curPlayer = (this.curPlayer === 'x') ? 'o' : 'x';
};

Game.prototype.print = function () {
  console.log(this.board.grid[0]);
  console.log(this.board.grid[1]);
  console.log(this.board.grid[2]);
};

Game.prototype.promptMove = function (callback) {
  var game = this;
  
  reader.question("Enter move position: ", function (pos) {
    
    var newPos = pos.split(' ')
    newPos[0] = parseInt(newPos[0]);
    newPos[1] = parseInt(newPos[1]);

    console.log(newPos);
    
    if (callback(newPos)) {
      return;
    }
  });
}; 


Game.prototype.run = function (callback) {
  var game = this;
  this.print();
  this.promptMove(function (pos) {
    game.board.move(pos, game.curPlayer);
    game.togglePlayer();
    callback();
  });

};
  
Game.prototype.startGame = function (func) {
  var game = this;
  
  function loopStep() {
    if (game.board.hasWon()) {
      return func();
    } else {
      game.run(loopStep);
    }
  }
  
  loopStep();
};

var completionCallback = function () {
  this.board.print();
  console.log("Congrats " + this.curPlayer + ", you won!");
  reader.close();
};

var game = new Game ();
game.startGame(completionCallback);
