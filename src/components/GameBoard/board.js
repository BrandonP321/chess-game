import React from 'react'

import Pawn from '../../classes/Pawn'
import Knight from '../../classes/Knight'
import Rook from '../../classes/Rook'
import Bishop from '../../classes/Bishop'
import Queen from '../../classes/Queen'

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function createNewBoardPieces() {
    const pawns = []
    // create white pawns and push them to the array
    for (let i = 0; i < 8; i++) {
        let newPawn = new Pawn({ letter: letters[i], number: 2 }, 'white')

        pawns.push(newPawn)
    }
    // create black pawns and push them to the array
    for (let i = 0; i < 8; i++) {
        let newPawn = new Pawn({ letter: letters[i], number: 7 }, 'black')

        pawns.push(newPawn)
    }

    const knights = [
        new Knight({ letter: 'b', number: 1 }, 'white'),
        new Knight({ letter: 'g', number: 1 }, 'white'),
        new Knight({ letter: 'b', number: 8 }, 'black'),
        new Knight({ letter: 'g', number: 8 }, 'black')
    ]

    const rooks = [
        new Rook({ letter: 'a', number: 1 }, 'white'),
        new Rook({ letter: 'h', number: 1 }, 'white'),
        new Rook({ letter: 'a', number: 8 }, 'black'),
        new Rook({ letter: 'h', number: 8 }, 'black'),
    ]

    const bishops = [
        new Bishop({ letter: 'c', number: 1 }, 'white'),
        new Bishop({ letter: 'f', number: 1 }, 'white'),
        new Bishop({ letter: 'c', number: 8 }, 'black'),
        new Bishop({ letter: 'f', number: 8 }, 'black'),
    ]

    const queens = [
        new Queen({ letter: 'd', number: 1 }, 'white'),
        new Queen({ letter: 'd', number: 8 }, 'black')
    ]

    return [...queens, ...bishops, ...rooks, ...knights, ...pawns]
}

function createWhiteTeamBoard(squareClickFunction) {
    // create each square of board and push it to an array
    const boardSquares = []

    let isDarkSquare = true
    for (let i = 8; i > 0; i--) {
        letters.forEach(letter => {
            boardSquares.push(<div className={isDarkSquare ? 'board-square square-light' : 'board-square square-dark'} data-letter={letter} data-number={i} data-location={letter + i}>
                <div className='square-available-circle'></div>
                <div className='square-clickable' onClick={squareClickFunction}></div>
            </div>)
            // only change isDarkSquare boolean if not on last letter
            if (letter !== 'h') {
                isDarkSquare = !isDarkSquare
            }
        })
    }

    return boardSquares
}

function createBlackTeamBoard(squareClickFunction) {
    // because board for black team is the reverse of the white team's, we can
    // just call the white board creation function and reverse the array
    return createWhiteTeamBoard(squareClickFunction).reverse()
}

function getPotentialMoves(pieceLocation, pieces, getPieceReferenceFunc) {
    // find which piece is at the given location
    const chosenPiece = getPieceReferenceFunc(pieceLocation)

    // get possible locations of piece
    let possibleLocations = chosenPiece.getPossibleMoves()

    // if piece is a pawn at it's starting spot, allow a two square move
    if (chosenPiece.pieceType === 'pawn') {
        // if piece is white and at number of 2, allow 2 square jump
        if (chosenPiece.color === 'white' && chosenPiece.currentLocation.number === 2) {
            possibleLocations.push({ letter: chosenPiece.currentLocation.letter, number: 4 })
        }
        // if piece is black and at number of 7, allow 2 square jump
        else if (chosenPiece.color === 'black' && chosenPiece.currentLocation.number === 7) {
            possibleLocations.push({ letter: chosenPiece.currentLocation.letter, number: 5 })
        }

        // if piece is white and there is a piece up and to it's diagonal, add that square as an option
        if (chosenPiece.color === 'white') {
            // filter pieces for any pieces to the pawn's diagonal
            const diagonalPieces = pieces.filter(pieces => {
                const { letter, number } = pieces.currentLocation
                const letterIndex = letters.indexOf(chosenPiece.currentLocation.letter)
                const upAndLeftSquareLetter = letters[letterIndex - 1]
                const upAndRightSquareLetter = letters[letterIndex + 1]
                console.log(upAndLeftSquareLetter)
                return (letter === upAndLeftSquareLetter || letter === upAndRightSquareLetter) && number === chosenPiece.currentLocation.number + 1
            })
            diagonalPieces.forEach(piece => possibleLocations.push(piece.currentLocation))
        }
        // allow diagonal attacks for black pieces as well
        else if (chosenPiece.color === 'black') {
            // filter pieces for any pieces to the pawn's diagonal
            const diagonalPieces = pieces.filter(pieces => {
                const { letter, number } = pieces.currentLocation
                const letterIndex = letters.indexOf(chosenPiece.currentLocation.letter)
                const downAndLeftSquareLetter = letters[letterIndex - 1]
                const downAndRightSquareLetter = letters[letterIndex + 1]
                return (letter === downAndLeftSquareLetter || letter === downAndRightSquareLetter) && number === chosenPiece.currentLocation.number - 1
            })
            diagonalPieces.forEach(piece => possibleLocations.push(piece.currentLocation))
        }
    }

    // locations of friendly pieces blocking a path
    const blockedSpots = []

    // filter possible locations by pieces locations of other pieces on board
    let availableSpots = possibleLocations.filter(newLocation => {
        // iterate over pieces on board
        for (var i = 0; i < pieces.length; i++) {
            let piece = pieces[i]

            // check if piece's location matches potential location and is not friendly
            if (piece.currentLocation.letter === newLocation.letter &&
                piece.currentLocation.number === newLocation.number) {
                // if piece being moved is a knight, we don't need to worry about a path being blocked by a friendly piece
                if (chosenPiece.pieceType === 'knight') {
                    // check if piece is of same color as knight

                    if (piece.color === chosenPiece.color) {
                        // if pieces are same color, don't let knight move there
                        return false
                    } else {
                        // if pieces are different colors, allow knight to move there
                        return true
                    }
                } else if (piece.color === chosenPiece.color) {
                    // add location of piece to blockedSpots array
                    blockedSpots.push(piece.currentLocation)
                    // return false to remove this spot option
                    return false
                } else if (piece.color !== chosenPiece.color) {
                    // if piece is an enemy piece, add that piece to blocked spots but keep the spot as available
                    // this will restrict player from accessing any spots beyond the enemy
                    blockedSpots.push(piece.currentLocation)
                    return true;
                }
            }
        }
        // return true if nothing has been returned yet
        return true
    })

    // if any paths are blocked, remove the blocked spots from possible moves
    if (blockedSpots.length > 0) {
        availableSpots = chosenPiece.removeBlockedPaths(blockedSpots, availableSpots)
    }

    return availableSpots
}

export default {
    createNewBoardPieces: createNewBoardPieces,
    createWhiteTeamBoard: createWhiteTeamBoard,
    createBlackTeamBoard: createBlackTeamBoard,
    getPotentialMoves: getPotentialMoves
}