const Piece = require('./Piece')

class Rook extends Piece {
    constructor(startLocation, color) {
        super(startLocation, color)
        this.pieceType = 'rook'
        this.moveChanges = []
        // create moves rook could make
        for (var i = 1; i <= 7; i++) {
            // push an increase of i right to array
            this.moveChanges.push({ letter: i, number: 0 })
            // push an increase of i left to array
            this.moveChanges.push({ letter: -i, number: 0 })
            // push an increase of i up to array
            this.moveChanges.push({ letter: 0, number: i })
            // push an increase of i down to array
            this.moveChanges.push({ letter: 0, number: -i })
        }
    }
}

module.exports = Rook;

// let rook = new Rook({ letter: 'a', number: 1}, 'white')

// console.log(rook)

// console.log(rook.getPossibleMoves()) 