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
    
    removeBlockedPaths(blockedSpotsArr, availableSpotsArr) {
        let availableSpots = availableSpotsArr;

        blockedSpotsArr.forEach(spot => {
            // if spot is on a different letter square than current, ignore since that piece can be attacked
            if (spot.letter !== this.currentLocation.letter) {
                return false
            }
            // if blocked spot is above current, block all spots above it including it
            if (spot.number > this.currentLocation.number) {
                console.log('i should show up')
                console.log(availableSpots)
                availableSpots = availableSpots.filter(openSpot => openSpot.number >= spot.number && openSpot.letter !== this.currentLocation.letter)
            } else {
                // if blocked spot is below current, block all spots beneath it including it
                availableSpots = availableSpots.filter(openSpot => openSpot.number <= spot.number && openSpot.letter !== this.currentLocation.letter)
            }
        })

        return availableSpots
    }
}

module.exports = Pawn;
