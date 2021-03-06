'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  //method of play move and show updated board


  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('Game Over!');
        this._board.printBoard();
      } else if (this._board.hasSafeTiles()) {
        console.log("You Win");
        this._board.printBoard();
      } else {
        console.log('Current Board:');
        this._board.printBoard();
      }
    }
  }]);

  return Game;
}();

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',


    //flip tile and reveal what is under it
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }

    //method to get number of neighboring bombs

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [];
      neighborOffsets.push([rowIndex - 1, columnIndex - 1]);
      neighborOffsets.push([rowIndex - 1, columnIndex]);
      neighborOffsets.push([rowIndex - 1, columnIndex + 1]);
      neighborOffsets.push([rowIndex, columnIndex - 1]);
      neighborOffsets.push([rowIndex, columnIndex + 1]);
      neighborOffsets.push([rowIndex + 1, columnIndex - 1]);
      neighborOffsets.push([rowIndex + 1, columnIndex]);
      neighborOffsets.push([rowIndex + 1, columnIndex + 1]);

      var numberOfRows = this._bombBoard.length;
      var numberOfColums = this._bombBoard[0].length;
      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = offset[0];
        var neighborColumnIndex = offset[1];

        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows) {
          if (neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColums) {
            if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
              numberOfBombs++;
            }
          }
        }
      });

      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',


    //returns true if all safe tiles are flipped.
    value: function hasSafeTiles() {
      return !this._numberOfTiles == this._numberOfBombs;
    }

    //print board to screen.

  }, {
    key: 'printBoard',
    value: function printBoard() {
      console.log(this._playerBoard.map(function (row) {
        return row.join('|');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];

      for (var rowCount = 0; rowCount < numberOfRows; rowCount++) {
        var row = [];
        for (var colCount = 0; colCount < numberOfColumns; colCount++) {
          row.push(' ');
        }
        board.push(row);
      }

      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];

      for (var rowCount = 0; rowCount < numberOfRows; rowCount++) {
        var row = [];
        for (var colCount = 0; colCount < numberOfColumns; colCount++) {
          row.push(null);
        }
        board.push(row);
      }

      var numberofBombsPlaced = 0;
      while (numberofBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColIndex] !== 'B') {
          board[randomRowIndex][randomColIndex] = 'B';
          numberofBombsPlaced++;
        }
      }

      return board;
    }
  }]);

  return Board;
}();

var g = new Game(3, 3, 3);

g.playMove(0, 0);