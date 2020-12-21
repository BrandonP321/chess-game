const Piece = require('./Piece')

class Knight extends Piece {
    constructor(startLocation, color) {
        super(startLocation, color);
        this.pieceType = 'knight'
        this.moveChanges = [
            {
                letter: 2,
                number: 1,
            },
            {
                letter: 1,
                number: 2,
            },
            {
                letter: -1,
                number: 2,
            },
            {
                letter: -2,
                number: 1,
            },
            {
                letter: -2,
                number: -1,
            },
            {
                letter: -1,
                number: -2,
            },
            {
                letter: 1,
                number: -2,
            },
            {
                letter: 2,
                number: -1,
            },
        ]
    }
}

module.exports = Knight

// let knight = new Knight({ letter: 'b', number: 1}, 'black')

// console.log(knight.getPossibleMoves())

// knight.setCurrentLocation({ letter: 'c', number: 3 })

// console.log(knight)

// console.log(knight.getPossibleMoves())