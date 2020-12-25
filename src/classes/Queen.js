// const Piece = require('./Piece')
import Piece from './Piece'

export default class Queen extends Piece {
    constructor(startLocation, color) {
        super(startLocation, color)
        this.pieceType = 'queen'
        this.moveChanges = []
        // create moves queen could make
        for (var i = 1; i <= 7; i++) {
            // push an increase of i right and i up to array
            this.moveChanges.push({ letter: i, number: i })
            // push an increase of i right and i down to array
            this.moveChanges.push({ letter: i, number: -i })
            // push an increase of i left and i down to array
            this.moveChanges.push({ letter: -i, number: -i })
            // push an increase of i left and i up to array
            this.moveChanges.push({ letter: -i, number: i })
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
        console.log(availableSpots)
        console.log()
        console.log(blockedSpotsArr)
        console.log(this.currentLocation)
        console.log('begin loop\n')
        blockedSpotsArr.forEach(spot => {
            console.log(availableSpots)
            console.log(spot)
            // find direction to block off
            if (spot.letter === this.currentLocation.letter) {
                console.log('letters are same')
                // letters are same so blocked path is horizontal

                if (spot.number > this.currentLocation.number) {
                    // if blocked spot number is greater than current number, block all paths above current spot
                    availableSpots = availableSpots.filter(location => location.number <= spot.number || location.letter !== this.currentLocation.letter)
                } else {
                    // blocked spot number is less than current number, block paths below current spot
                    availableSpots = availableSpots.filter(location => location.number >= spot.number || location.letter !== this.currentLocation.letter)
                }
            } else if (spot.number === this.currentLocation.number) {
                console.log('numbers are same')
                // letters are different so blocked path is vertical
                if (spot.letter > this.currentLocation.letter) {
                    // blocked spot letter is greater so must be to right
                    availableSpots = availableSpots.filter(location => location.letter <= spot.letter || location.number !== this.currentLocation.number)
                } else {
                    // otherwise blocked path must be to the left
                    availableSpots = availableSpots.filter(location => location.letter >= spot.letter || location.number !== this.currentLocation.number)
                }
            } else if (spot.number > this.currentLocation.number) {
                console.log('upwards diagonal')
                // if blocked spot's number is greater than current, path is upwards
                // check if path is up and left or up and right
                if (spot.letter > this.currentLocation.letter) {
                    console.log('up and right')
                    // if blocked spot's letter is greater than current, path is up and right
                    availableSpots = availableSpots.filter(location => location.letter <= spot.letter || location.number < spot.number)
                } else {
                    console.log('up and left')
                    // otherwise path is up and left
                    availableSpots = availableSpots.filter(location => location.letter >= spot.letter || location.number < spot.number)
                }
            } else {
                console.log('downwards diagonal')
                // otherwise path is downwards
                // check if path is down and left or down and right
                if (spot.letter > this.currentLocation.letter) {
                    // if blocked spot's leter is greater than current, path is down and right
                    availableSpots = availableSpots.filter(location => location.letter <= spot.letter || location.number > spot.number)
                } else {
                    // otherwise path is down and left
                    availableSpots = availableSpots.filter(location => location.letter >= spot.letter || location.number > spot.number)
                }
            }
        })
        return availableSpots
    }
}

// module.exports = Queen;

// let queen = new Queen({ letter: 'd', number: 1 }, 'white')

// console.log(queen)

// console.log(queen.getPossibleMoves()) 