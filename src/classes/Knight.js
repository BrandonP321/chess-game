// const Piece = require('./Piece')
import Piece from './Piece'

export default class Knight extends Piece {
    constructor(startLocation, color, currentLocation) {
        super(startLocation, color, currentLocation)
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

// let knight = new Knight({ letter: 'b', number: 1}, 'black')

// console.log(knight.getPossibleMoves())

// knight.setCurrentLocation({ letter: 'c', number: 3 })

// console.log(knight)

// console.log(knight.getPossibleMoves())