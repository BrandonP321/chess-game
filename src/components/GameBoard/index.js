import React, { useState, useEffect, Component } from 'react'
// import Queen from '../../classes/Queen'
// import Board from '../../classes/Board'
import createNewBoard from './createBoard'
import './index.css'

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
    const [currentlySelectedPiece, setCurrentlySelectedPiece] = useState({})


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
        console.log(pieceLocation)
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

    const squareClick = (event) => {
        // get location of square clicked
        const locationLetter = event.target.parentElement.getAttribute('data-letter')
        const locationNumber = parseInt(event.target.parentElement.getAttribute('data-number'))
        const location = locationLetter + locationNumber

        // if user is currently searching for a square to move a piece to, validate the move

        // if user is clicking a piece to see where it can move to, show available options
        // TODO: add if statement to this later

        // check that square clicked has a piece on it
        if (pieces.filter(piece => piece.currentLocation.letter === locationLetter && piece.currentLocation.number === locationNumber).length > 0) {
            // first make sure no squares are being shown as having an open spot
            const allSquares = document.querySelectorAll('.square-available-circle')
            allSquares.forEach(square => {
                square.style.opacity = 0
            })
            // if user is clicking a square other than the currently selected square, show possible move locations
            if (locationLetter !== currentlySelectedPiece.letter || locationNumber !== currentlySelectedPiece.number) {
                // update currently selected square in state
                setCurrentlySelectedPiece({ letter: locationLetter, number: locationNumber })
                const openSquares = getPotentialMoves({ letter: locationLetter, number: locationNumber })
                console.log(openSquares)
                openSquares.forEach(square => {
                    // identify square at the given location
                    const squareNode = document.querySelector(`[data-location=${square.letter + square.number}]`)
                    // reference circle element showing that the square is open
                    const squareCircle = squareNode.children[0]
                    // give circle and opacity of .6
                    squareCircle.style.opacity = .6
                })
            }  else {
                // if user is clicking the piece they already have selected, reset state to nothing
                setCurrentlySelectedPiece({})
            }
        }
    }

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    // create each square of board and push it to an array
    const boardSquares = []

    let isDarkSquare = true
    for (let i = 8; i > 0; i--) {
        letters.forEach(letter => {
            boardSquares.push(<div className={isDarkSquare ? 'board-square square-light' : 'board-square square-dark'} data-letter={letter} data-number={i} data-location={letter + i}>
                <div className='square-available-circle'></div>
                <div className='square-clickable' onClick={squareClick}></div>
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
