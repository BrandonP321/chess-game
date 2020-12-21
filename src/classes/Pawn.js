const Piece = require('./Piece')

class Pawn extends Piece {
    constructor(startLocation, color) {
        super(startLocation, color)
        this.moveChanges = [
            {
                letter: 0,
                number: 1
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

// let pawn = new Pawn({ letter: 'b', number: 2}, 'white')

// pawn.getPossibleMoves() // letter: b, number: 3

// console.log(pawn)