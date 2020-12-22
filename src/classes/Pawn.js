const Piece = require('./Piece')

class Pawn extends Piece {
    constructor(startLocation, color) {
        super(startLocation, color)
        this.pieceType = 'pawn'
        this.moveChanges = [
            {
                letter: 0,
                number: this.color == 'black' ? -1: 1
            }
        ]
    }
    // getPossibleMoves() {
    //     // can only move up one number
    //     return { letter: this.currentLocation.letter, number: this.currentLocation.number + 1 }
    // }

    // setCurrentLocation(newLocation) {
    //     this.currentLocation = newLocation
    // }
}

module.exports = Pawn;

// let pawn = new Pawn({ letter: 'b', number: 2}, 'white')

// pawn.getPossibleMoves() // letter: b, number: 3

// console.log(pawn)