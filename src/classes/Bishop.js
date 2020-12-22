const Piece = require('./Piece')

class Bishop extends Piece {
    constructor(startLocation, color) {
        super(startLocation, color)
        this.pieceType = 'bishop'
        this.moveChanges = []
        // create moves bishop could make
        for (var i = 1; i <= 7; i++) {
            // push an increase of i right and i up to array
            this.moveChanges.push({ letter: i, number: i })
            // push an increase of i right and i down to array
            this.moveChanges.push({ letter: i, number: -i })
            // push an increase of i left and i down to array
            this.moveChanges.push({ letter: -i, number: -i })
            // push an increase of i left and i up to array
            this.moveChanges.push({ letter: -i, number: i })
        }
    }

    removeBlockedPaths(blockedSpotsArr, availableSpotsArr) {
        // let availableSpots = availableSpotsArr
        // blockedSpotsArr.forEach(spot => {
            
        //     // find direction to block off
        //     if (spot.letter === this.currentLocation.letter) {
        //         // letters are same so blocked path is horizontal
                
        //         if (spot.number > this.currentLocation.number) {
        //             // if blocked spot number is greater than current number, block all paths above current spot
        //             availableSpots = availableSpots.filter(location => location.number < spot.number)
        //         } else {
        //             // blocked spot number is less than current number, block paths below current spot
        //             availableSpots = availableSpots.filter(location => location.number > spot.number)
        //         }
        //     } else {
        //         // letters are different so blocked path is vertical
        //         if (spot.letter > this.currentLocation.letter) {
        //             // blocked spot letter is greater so much be to right
        //             availableSpots = availableSpots.filter(location => location.letter < spot.letter)
        //         }
        //     }
        // })
        // return availableSpots
    }
}

module.exports = Bishop;

let bishop = new Bishop({ letter: 'h', number: 8 }, 'white')

// console.log(bishop)

console.log(bishop.getPossibleMoves()) 