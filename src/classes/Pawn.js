// const Piece = require('./Piece')
import Piece from './Piece'

export default class Pawn extends Piece {
    constructor(startLocation, color, currentLocation) {
        super(startLocation, color, currentLocation)
        this.pieceType = 'pawn'
        this.moveChanges = [
            {
                letter: 0,
                number: this.color == 'black' ? -1: 1
            }
        ]
    }
    
    removeBlockedPaths(blockedSpotsArr, availableSpotsArr) {
        console.log(blockedSpotsArr, availableSpotsArr)
        let availableSpots = availableSpotsArr;

        blockedSpotsArr.forEach(spot => {
            // if spot is on a different letter square than current, ignore since that piece can be attacked
            if (spot.letter !== this.currentLocation.letter) {
                return false
            }
            // if blocked spot is above current, block all spots above it including it
            if (spot.number > this.currentLocation.number) {
                // if piece is at starting location and can move 2 squares, only remove the square in front 
                // if piece blocking is 2 squares in front of pawn
                if (Math.abs(this.currentLocation.number - spot.number) === 2) {
                    availableSpots = availableSpots.filter(openSpot => Math.abs(openSpot.number - this.currentLocation.number) === 1)
                } else {
                    availableSpots = availableSpots.filter(openSpot => openSpot.number >= spot.number && openSpot.letter !== this.currentLocation.letter)
                }
            } else {
                // if blocked spot is below current, block all spots beneath it including it

                // if piece is at starting location and can move 2 squares, only remove the square in front
                // if piece blocking is 2 squares in front of pawn
                if (Math.abs(this.currentLocation.number - spot.number) === 2) {
                    availableSpots = availableSpots.filter(openSpot => Math.abs(openSpot.number - this.currentLocation.number) === 1)
                } else {
                    availableSpots = availableSpots.filter(openSpot => openSpot.number <= spot.number && openSpot.letter !== this.currentLocation.letter)
                }
            }
        })

        return availableSpots
    }
}
