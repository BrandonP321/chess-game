const Pawn = require('./Pawn')
const Knight = require('./Knight')
const Rook = require('./Rook')

class Board {
    constructor(pieces = []) {
        this.pieces = pieces
        this.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
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

        // locations of friendly pieces blocking a path
        const blockedSpots = []

        // filter possible locations by pieces locations of other pieces on board
        let availableSpots = possibleLocations.filter(newLocation => {
            // iterate over pieces on board
            for (var i = 0; i < this.pieces.length; i++) {
                let piece = this.pieces[i]


                // if piece's location matches potential location and is not friendly
                if (piece.currentLocation.letter === newLocation.letter &&
                    piece.currentLocation.number === newLocation.number) {
                    // if piece being moved is a knight, we don't need to worry about a path being blocked by a friendly piece
                    if (chosenPiece.pieceType === 'knight') {
                        return false
                    } else if (piece.color === chosenPiece.color) {
                        // add location of piece to blockedSpots array
                        blockedSpots.push(piece.currentLocation)
                        // return false to remove this spot option
                        return false
                    }
                }
            }
            // return true if nothing has been returned yet
            return true
        })

        // if no paths were blocked, return now
        if (blockedSpots.length === 0) {
            console.log('blocked spots was 0')
            return availableSpots
        }
        // now filter potential spots again to remove any spots blocked by a friendly piece
        availableSpots = chosenPiece.removeBlockedPaths(blockedSpots, availableSpots)

        
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

const rooks = [
    new Rook({ letter: 'a', number: 1 }, 'white'),
    new Rook({ letter: 'h', number: 1 }, 'white'),
    new Rook({ letter: 'a', number: 8 }, 'black'),
    new Rook({ letter: 'h', number: 8 }, 'black'),
]

// push pieces from their arrays to the new Board
const board = new Board([...pawns, ...knights, ...rooks])

console.log('moves:')
console.log(board.getPotentialMoves({ letter: 'a', number: 1 }))