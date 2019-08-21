class Board {
    constructor() {
        this.grid = this.fillGrid();
    }

    createGrid() {
        let arr = new Array(3)
        for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(3)
        } 
        return arr
    }

    fillGrid() {
        let arr = this.createGrid();
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                arr[i][j] = null;
            }  
        }
        return arr
    }

    isOver() {
        if (this.winner() !== null) {
            return true;
        }
        for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
            for (let colIdx = 0; colIdx < 3; colIdx++) {
                if (this.empty([rowIdx, colIdx])) {
                    return false;
                }
            }
        }
    }

    isValidPos(pos) {
        let row = pos[0];
        let col = pos[1];
        return ((row <= 2 && col <= 2) && (row >= 0 && col >= 0))
    }

    empty(pos) {
        let row = pos[0];
        let col = pos[1];
        if (!this.isValidPos(pos)) {
            throw new Error("Invalid position")
        }
        return (this.grid[row][col] === null);
    }    

    place_mark(pos, mark) {
        let row = pos[0];
        let col = pos[1];
        if (!this.isValidPos(pos)) {
            throw new Error("Invalid position")
        };
        return this.grid[row][col] = mark;
    }    

    winner() {
        let posSeq = [ // 1 win = 1 array
            // horizontal:
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            // vertical:
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            // cheo
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]]
        ];
        for (let i = 0; i < posSeq.length; i++) {
            const winner = this.helperWinner(posSeq[i]);
            if (winner !== null) {
                return winner;
            }
        }
        return null;
    };

    helperWinner(sub_posSeq) {
        for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
            let targetMark = Board.marks[markIdx];
            let winner = true;
            for (let winPos = 0; winPos < 3; winPos++) {
                let sub_pos = sub_posSeq[winPos];
                let existingMark = this.grid[sub_pos[0]][sub_pos[1]];
                if (existingMark != targetMark) {
                    winner = false;
                };      
            }
            if (winner) {
                return targetMark
            }
        }
        return null;   
    }

    print() {
        let strs = [];
        for (let i = 0; i < this.grid.length; i++) {
            let marks = [];
            for (let j = 0; j < 3; j++) {
                marks.push(
                    this.grid[i][j] ? this.grid[i][j] : " "
                );
            }
           strs.push(`${marks.join(" | ")}\n`);
        }
        console.log(strs.join("----------\n"));
    }

}
Board.marks = ["x", "o"];

let board = new Board;
 
module.exports = Board;