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

    removeBlockedPaths(blockedSpotsArr, availableSpotsArr) {
        let availableSpots = availableSpotsArr
        blockedSpotsArr.forEach(spot => {
            
            // find direction to block off
            if (spot.letter === this.currentLocation.letter) {
                // letters are same so blocked path is horizontal
                
                if (spot.number > this.currentLocation.number) {
                    // if blocked spot number is greater than current number, block all paths above current spot
                    availableSpots = availableSpots.filter(location => location.number < spot.number)
                } else {
                    // blocked spot number is less than current number, block paths below current spot
                    availableSpots = availableSpots.filter(location => location.number > spot.number)
                }
            } else {
                // letters are different so blocked path is vertical
                if (spot.letter > this.currentLocation.letter) {
                    // blocked spot letter is greater so must be to right
                    availableSpots = availableSpots.filter(location => location.letter < spot.letter)
                } else {
                    // otherwise blocked path must be to the left
                    availableSpots = availableSpots.filter(location => location.letter > spot.letter)
                }
            }
        })
        return availableSpots
    }
}

module.exports = Rook;

// let rook = new Rook({ letter: 'a', number: 1}, 'white')

// console.log(rook)

// console.log(rook.getPossibleMoves()) 