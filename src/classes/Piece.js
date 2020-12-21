class Piece {
    constructor(startLocation, color) {
        this.startLocation = startLocation;
        this.color = color;
        this.currentLocation = startLocation;
        this.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    }

    getPossibleMoves() {
        // index of letter of piece's current location
        const locationLetterIndex = this.letters.indexOf(this.currentLocation.letter)

        const possibleMoves = []
        this.moveChanges.forEach(change => {
            // get letter based on it's new index
            const newLetter = this.letters[locationLetterIndex + change.letter]

            // create new obj of new possible location
            const newMove = {
                letter: newLetter,
                number: this.currentLocation.number + change.number
            }
            
            // push move to array of moves if both are within possible letters and numbers
            if (newMove.letter && newMove.number >= 1 && newMove.number <= 8) {
                possibleMoves.push(newMove)
            }
        })

        return possibleMoves
    }

    setCurrentLocation(newLocation) {
        // update current Location
        this.currentLocation = newLocation
    }
}

module.exports = Piece