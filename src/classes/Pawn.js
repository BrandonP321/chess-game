const Piece = require('./Piece')

class Pawn extends Piece {
    getPossibleMoves() {
        // can only move up one number
        return { letter: this.currentLocation.letter, number: this.currentLocation.number + 1 }
    }

    setCurrentLocation(newLocation) {
        this.currentLocation = newLocation
    }
}

let pawn = new Pawn({ letter: 'b', number: 2}, 'white')

console.log(pawn.getPossibleMoves())

console.log(pawn)