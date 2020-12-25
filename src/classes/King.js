import Piece from './Piece'

export default class King extends Piece {
    constructor(startLocation, color) {
        super(startLocation, color)
        this.pieceType = 'king'
        this.moveChanges = [
            { letter: 0, number: -1 },
            { letter: 0, number: 1 },
            { letter: 1, number: 0 },
            { letter: 1, number: 1 },
            { letter: 1, number: -1 },
            { letter: -1, number: 0 },
            { letter: -1, number: 1 },
            { letter: -1, number: -1 }
        ]
    }

    removeBlockedPaths(blockedSpotsArr, availableSpotsArr) {
        let availableSpots = availableSpotsArr
        blockedSpotsArr.forEach(spot => {
            // because the king can only move one square in any direction, there is no path to block
            // we only need to remove the spot from the array of possible squares the king can move to
            availableSpots = availableSpots.filter(openSpot => openSpot.letter !== spot.letter || openSpot.number !== spot.letter)
        })
        return availableSpots
    }
}