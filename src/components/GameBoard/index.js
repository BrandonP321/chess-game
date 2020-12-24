import React, { useState, useEffect, Component } from 'react'
import './index.css'
import board from './board'
// destructure createBoard file for functions to create & manipulate board
const { createNewBoardPieces, createWhiteTeamBoard, createBlackTeamBoard, getPotentialMoves } = board

export default function GameBoard() {
    const pieceIcons = {
        rook: '<i class="fas fa-chess-rook piece-icon"></i>',
        knight: '<i class="fas fa-chess-knight piece-icon"></i>',
        bishop: '<i class="fas fa-chess-bishop piece-icon"></i>',
        queen: '<i class="fas fa-chess-queen piece-icon"></i>',
        king: '<i class="fas fa-chess-king piece-icon"></i>',
        pawn: '<i class="fas fa-chess-pawn piece-icon"></i>'
    }

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    // this boolean is used to control useEffect when user moves a piece
    const [doRemovePiece, setDoRemovePiece] = useState(false)

    const [pieces, setPieces] = useState(createNewBoardPieces())
    const [currentlySelectedPiece, setCurrentlySelectedPiece] = useState({})
    const [selectedPieceOpenSpots, setSelectedPieceOpenSpots] = useState([])


    // update piece locations on page when location in state changes
    useEffect(() => {
        renderPieces()
    }, [])

    useEffect(() => {
        // only run code if a piece needs to be removed
        if (doRemovePiece) {
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

    // function to get reference to piece instance in state array of all pieces
    const getPieceReference = (location) => {
        const pieceArr = pieces.filter(piece => {
            const { letter, number } = piece.currentLocation;
            return letter === location.letter && number === location.number
        })
        const piece = pieceArr[0]
        return piece
    }

    const updatePieceLocation = (currentLocation, newLocation) => {
        const piece = getPieceReference(currentLocation)

        piece.currentLocation = { letter: newLocation.letter, number: newLocation.number }
    }

    const addPiece = (piece) => {
        setPieces([...pieces, piece])
    }

    const removePiece = (pieceLocation) => {
        // get pieces from array of pieces excpet piece to remove
        const newPiecesArr = pieces.filter(piece => {
            const { letter, number } = piece.currentLocation
            return letter !== pieceLocation.letter || number !== pieceLocation.number
        })
        // update the state with the new array of pieces
        setPieces(newPiecesArr)

        return newPiecesArr
    }

    const movePiece = (selectedPiece, newLocation) => {
        // get piece at clicked spot if any, will be null if no piece
        const pieceAtNewSpot = getPieceReference(newLocation)

        // this is an array of length 1 if square is open
        const newSquareisOpen = selectedPieceOpenSpots.filter(spot => spot.letter === newLocation.letter && spot.number === newLocation.number)

        // if new square is not available, return false
        if (newSquareisOpen.length === 0) {
            return false
        } else {
            // if there is another piece on that square, remove it from the state
            if (pieceAtNewSpot) {
                // signify that a piece is being moved
                setDoRemovePiece(true)
                // remove piece at the new location
                removePiece(newLocation)
                // update the location of the moved piece
                updatePieceLocation(selectedPiece.currentLocation, newLocation)
                // a useEffect now updates the piece's location and render's the pieces
            } else {
                // if no piece is at new square, just update the pieces on the board
                selectedPiece.setCurrentLocation({ letter: newLocation.letter, number: newLocation.number })
                renderPieces();
            }
        }

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
                const openSquares = getPotentialMoves({ letter: locationLetter, number: locationNumber }, pieces, getPieceReference)

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
                // if user is clicking the piece they already have selected, reset state to nothing
                setCurrentlySelectedPiece({})
            }
        }
    }

    // array of squares for board if player is team white, will be mapped over to render to page
    const boardSquares = createWhiteTeamBoard(squareClick)
    // const boardSquares = createBlackTeamBoard(squareClick)

    return (
        <div className='board'>
            {boardSquares.map(square => square)}
        </div>
    )
}
