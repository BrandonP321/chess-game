const Pawn = require('./Pawn')
const Knight = require('./Knight')

class Board {
    constructor(pieces = []) {
        this.pieces = pieces
    }

    addPiece(piece) {
        // add a new piece to the pieces array
        this.pieces.push(piece)
    }

    removePiece(piece) {
        // remove piece when it is taken off the board
        // this.pieces = this.pieces.filter()
    }

    getPotentialMoves(pieceLocation) {
        // find which piece is at the given location
        const chosenPiece = this.pieces.filter(piece => piece.currentLocation.letter == pieceLocation.letter && piece.currentLocation.number == pieceLocation.number)[0]
        
        // get possible locations of piece
        let possibleLocations = chosenPiece.getPossibleMoves()

        // filter possible locations by pieces locations of other pieces on board
        let availableSpots = possibleLocations.filter(newLocation => {
            // iterate over pieces on board
            for (var i = 0; i < this.pieces.length; i++) {
                let piece = this.pieces[i]

                // if piece's location matches potential location, return false
                if (piece.currentLocation.letter === newLocation.letter &&
                    piece.currentLocation.number === newLocation.number) {
                    return false
                }
            }
            // return true if nothing has been returned yet
            return true
        })
        return availableSpots
    }

    addPiece(piece) {
        this.pieces.push(piece)
    }
}






// add all pieces to board
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const knights = [
    new Knight({ letter: 'b', number: 1 }, 'white'),
    new Knight({ letter: 'g', number: 1 }, 'white'),
    new Knight({ letter: 'b', number: 8 }, 'black'),
    new Knight({ letter: 'g', number: 8 }, 'black')
]

const pawns = []

// create white pawns and push them to the board
for (let i = 0; i < 8; i++) {
    let newPawn = new Pawn({ letter: letters[i], number: 2 }, 'white')

    pawns.push(newPawn)
}
// create black pawns and push them to the board
for (let i = 0; i < 8; i++) {
    let newPawn = new Pawn({ letter: letters[i], number: 7 }, 'black')

    pawns.push(newPawn)
}

// push pieces from their arrays to the new Board
const board = new Board([...pawns, ...knights])


console.log(board.getPotentialMoves({ letter: 'e', number: 2 }))