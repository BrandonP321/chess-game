import React, { useState, useEffect, Component } from 'react'
// import Queen from '../../classes/Queen'
// import Board from '../../classes/Board'
import createNewBoard from './createBoard'
import './index.css'

export default function GameBoard() {
    const pieceIcons = {
        rook: '<i class="fas fa-chess-rook piece-icon"></i>',
        knight: '<i class="fas fa-chess-knight piece-icon"></i>',
        bishop: '<i class="fas fa-chess-bishop piece-icon"></i>',
        queen: '<i class="fas fa-chess-queen piece-icon"></i>',
        king: '<i class="fas fa-chess-king piece-icon"></i>',
        pawn: '<i class="fas fa-chess-pawn piece-icon"></i>'
    }

    // this boolean is used to control useEffect when user moves a piece
    // let pieceNeedsToBeRemoved = false // is not a state to avoid async issues
    const [doRemovePiece, setDoRemovePiece] = useState(false)
    

    const [pieces, setPieces] = useState(createNewBoard())
    const [currentlySelectedPiece, setCurrentlySelectedPiece] = useState({})
    const [selectedPieceOpenSpots, setSelectedPieceOpenSpots] = useState([])


    // update piece locations on page when location in state changes
    useEffect(() => {
        renderPieces()
    }, [])

    useEffect(() => {
        console.log('hell')
        console.log(doRemovePiece)
        // only run code if a piece needs to be removed
        if (doRemovePiece) {
            console.log('0')
            // selectedPiece.setCurrentLocation({ letter: newLocation.letter, number: newLocation.number })
            renderPieces();
            setDoRemovePiece(false)
        }
    }, [pieces])

    // function to render all pieces on board
    const renderPieces = () => {
        // clear all pieces off of board before rendering them back on board
        document.querySelectorAll('.piece-icon-container').forEach(iconEle => {
            iconEle.remove()
        })

        pieces.forEach(piece => {
            const pieceLocation = piece.currentLocation.letter + piece.currentLocation.number
            // square on board for piece to be added to
            const locationNode = document.querySelector(`[data-location=${pieceLocation}]`)
            // create element to contain piece icon
            const iconEle = document.createElement('div')
            iconEle.innerHTML = pieceIcons[piece.pieceType]
            iconEle.className = 'piece-icon-container ' + `icon-container-${piece.color}`

            // append piece to square on board
            locationNode.appendChild(iconEle)
        })

        // clear all circles from board
        document.querySelectorAll('.square-available-circle').forEach(circleEle => {
            circleEle.style.opacity = 0
        })

        // reset states
        setCurrentlySelectedPiece({})
        setSelectedPieceOpenSpots([])
    }

    const addPiece = (piece) => {
        setPieces([...pieces, piece])
    }

    const removePiece = (pieceLocation) => {
        
    }

    const movePiece = (selectedPiece, newLocation) => {
        // get piece at clicked spot if any, will be null if no piece
        const pieceAtNewSpot = pieces.filter(piece => piece.currentLocation.letter === newLocation.letter && piece.currentLocation.number === newLocation.number)[0]
        console.log(pieceAtNewSpot)

        // this is an array of length 1 if square is open
        const newSquareisOpen = selectedPieceOpenSpots.filter(spot => spot.letter === newLocation.letter && spot.number === newLocation.number)
        // if new square is not available, return false
        if (newSquareisOpen.length === 0) {
            return false
        } else {
            console.log('space is open')
            // if there is another piece on that square, remove it from the state
            if (pieceAtNewSpot) {
                // signify that a piece is being moved
                setDoRemovePiece(true)
                
                const newPiecesArr = pieces.filter(piece => piece.currentLocation.letter !== newLocation.letter || piece.currentLocation.number !== newLocation.number)
                
                selectedPiece.setCurrentLocation({ letter: newLocation.letter, number: newLocation.number })
                setPieces(newPiecesArr)
                // a useEffect now updates the piece's location and render's the pieces
            } else {
                console.log("didn't need to update state")
                // if no piece is at new square, just update the pieces on the board
                selectedPiece.setCurrentLocation({ letter: newLocation.letter, number: newLocation.number })
                renderPieces();
            }
        }

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
        const pieceAtClickedSquare = pieces.filter(piece => piece.currentLocation.letter === locationLetter && piece.currentLocation.number === locationNumber)[0]
        const selectedPiece = pieces.filter(piece => piece.currentLocation.letter === currentlySelectedPiece.letter && piece.currentLocation.number === currentlySelectedPiece.number)[0]
        const piecesAreSameTeam = selectedPiece && pieceAtClickedSquare ? pieceAtClickedSquare.color === selectedPiece.color : false

        // if state has any keys, the user must be looking to move a piece somewhere else
        // don't attempt to move if user is reclicking selected piece or pieces are same color
        if (Object.keys(currentlySelectedPiece).length > 0 && !piecesAreSameTeam && (locationLetter !== currentlySelectedPiece.letter || locationNumber !== currentlySelectedPiece.number)) {
            console.log('user trying to move')
            // move character to new location if spot is available
            movePiece(selectedPiece, { letter: locationLetter, number: locationNumber })
        }
        // if user is clicking a piece to see where it can move to, show available options
        // TODO: add if statement to this later

        // check that square clicked has a piece on it
        else if (pieces.filter(piece => piece.currentLocation.letter === locationLetter && piece.currentLocation.number === locationNumber).length > 0) {
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

                // set array of available spots in state
                setSelectedPieceOpenSpots(openSquares)

                // display a ciricle over each available spot on board
                openSquares.forEach(square => {
                    // identify square at the given location
                    const squareNode = document.querySelector(`[data-location=${square.letter + square.number}]`)
                    // reference circle element showing that the square is open
                    const squareCircle = squareNode.children[0]
                    // give circle and opacity of .6
                    squareCircle.style.opacity = .6
                })
            } else {
                 console.log('i should not be seen')
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
