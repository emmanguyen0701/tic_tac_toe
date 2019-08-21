const Board = require('./board.js');
class Game {
    constructor() {       
        this.board = new Board();
        this.currentPlayer = Board.marks[0];
    }

    isOver() {
        return this.board.isOver();
    }

    playMove(pos) {
        this.board.place_mark(pos, this.currentPlayer);
        this.swapTurn();
    }

    promptMove(reader, callback) {
        this.board.print();
        console.log(`Current player is ${this.currentPlayer}`)
        reader.question("Enter a row index (e.g 1) ", function(rowIdx) {
            let rowNum = parseInt(rowIdx);
            reader.question("Enter a col index (e.g 2) ", function(colIdx) {
                let colNum = parseInt(colIdx);
                callback([rowNum, colNum]);
            })
        })
    };

    swapTurn() {
        if (this.currentPlayer === Board.marks[0]) {
            this.currentPlayer = Board.marks[1];
        } else {
            this.currentPlayer = Board.marks[0]
        }
    };

    winner() {
        return this.board.winner();
    };

    run(reader, completionCallback) {
        this.promptMove(reader, (move) => {
            this.playMove(move);
            if (this.isOver()) {
                this.board.print();
                if (this.winner()) {
                    console.log(`Winner is ${this.winner()}!`);           
                } else {
                    console.log("No one wins!")
                }
                completionCallback()
            } else {
                this.run(reader, completionCallback)
            }
        });
    }
}

module.exports = Game;
