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
  this.board.print();
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
      game.board.print();
      console.log("Congrats " + game.curPlayer + ", you won!");
      return func();
    } else {
      game.run(loopStep);
    }
  }
  
  loopStep();
};

var completionCallback = function () {

  reader.close();
};

var game = new Game ();
game.startGame(completionCallback);
