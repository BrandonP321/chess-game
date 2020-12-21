const Piece = require('./Piece')

class Knight extends Piece {
    getPossibleMoves() {
        // index of letter of current location in alphabet
        const letterIndex = this.letters.indexOf(this.currentLocation.letter)
        console.log(letterIndex)

        
    }
}

let knight = new Knight({ letter: 'b', number: '1'}, 'black')

knight.getPossibleMoves()

console.log(knight)