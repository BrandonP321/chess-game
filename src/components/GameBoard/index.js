import React, { useState, useEffect, Component } from 'react'
// import Queen from '../../classes/Queen'
// import Board from '../../classes/Board'
import createNewBoard from './createBoard'
import './index.css'

// export default function GameBoard() {
//     // state containing a Board class instance
//     const [pieces, setPieces] = useState(new Board(createNewBoard()))

//     useEffect(() => {
//         // const board = new Board([new Queen({ letter: 'd', number: 1 }, 'white')])
//         // console.log(board)
//         // console.log(board.getPotentialMoves({ letter: 'd', number: 1 }))
//     }, [])

//     // update locations on board when a piece has it's position changed
//     useEffect(() => {
//         console.log('change')
//     }, [pieces])

//     // console.log(pieces)
//     // console.log(pieces.getPotentialMoves({letter: 'b', number: 1}))
//     // pieces.addPiece({letter: 'd', number: 2})


//     const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
//     // create each square of board and push it to an array
//     const boardSquares = []

//     let isDarkSquare = true
//     for (let i = 8; i > 0; i--) {
//         letters.forEach(letter => {
//             boardSquares.push(<div className={isDarkSquare ? 'board-square square-light' : 'board-square square-dark'} data-letter={letter} data-number={i}>
//                 <div className='square-available-circle'></div>
//             </div>)
//             // only change isDarkSquare boolean if not on last letter
//             if (letter !== 'h') {
//                 isDarkSquare = !isDarkSquare
//             }
//         })
//     }
//     // console.log(boardSquares)

//     return (
//         <div className='board'>
//             {boardSquares.map(square => square)}
//         </div>
//     )
// }


export default function GameBoard() {
    const pieceIcons = {
        rook: '<i class="fas fa-chess-rook"></i>',
        knight: '<i class="fas fa-chess-knight"></i>',
        bishop: '<i class="fas fa-chess-bishop"></i>',
        queen: '<i class="fas fa-chess-queen"></i>',
        king: '<i class="fas fa-chess-king"></i>',
        pawn: '<i class="fas fa-chess-pawn"></i>'
    }

    const [pieces, setPieces] = useState(createNewBoard())

    // update piece locations on page when location in state changes
    useEffect(() => {
        pieces.forEach(piece => {
            const pieceLocation = piece.currentLocation.letter + piece.currentLocation.number
            // square on board for piece to be added to
            const locationNode = document.querySelector(`[data-location=${pieceLocation}]`)
            // create element to contain piece icon
            const iconEle = document.createElement('div')
            iconEle.innerHTML = pieceIcons[piece.pieceType]
            iconEle.className = 'piece-icon-container'
            
            // append piece to square on board
            locationNode.appendChild(iconEle)
        })
    }, [pieces])

    const addPiece = (piece) => {
        setPieces([...pieces, piece])
    }

    const removePiece = (pieceLocation) => {
        // remove piece by location
    }

    const getPotentialMoves = (pieceLocation) => {
        // find which piece is at the given location
        const chosenPiece = pieces.filter(piece => piece.currentLocation.letter == pieceLocation.letter && piece.currentLocation.number == pieceLocation.number)[0]

        // get possible locations of piece
        let possibleLocations = chosenPiece.getPossibleMoves()

        // locations of friendly pieces blocking a path
        const blockedSpots = []

        // filter possible locations by pieces locations of other pieces on board
        let availableSpots = possibleLocations.filter(newLocation => {
            // iterate over pieces on board
            for (var i = 0; i < pieces.length; i++) {
                let piece = pieces[i]

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

        // if any paths are blocked, remove the blocked spots from possible moves
        if (blockedSpots.length > 0) {
            availableSpots = chosenPiece.removeBlockedPaths(blockedSpots, availableSpots)
        }

        return availableSpots
    }

    console.log(getPotentialMoves({letter: 'b', number: 1}))

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    // create each square of board and push it to an array
    const boardSquares = []

    let isDarkSquare = true
    for (let i = 8; i > 0; i--) {
        letters.forEach(letter => {
            boardSquares.push(<div className={isDarkSquare ? 'board-square square-light' : 'board-square square-dark'} data-letter={letter} data-number={i} data-location={letter + i}>
                <div className='square-available-circle'></div>
            </div>)
            // only change isDarkSquare boolean if not on last letter
            if (letter !== 'h') {
                isDarkSquare = !isDarkSquare
            }
        })
    }

    return (
        <div className='board'>
            {boardSquares.map(square => square)}
        </div>
    )
}
