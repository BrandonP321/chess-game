import React, { useState, useEffect, Component, useRef } from 'react'
import './index.css'
import board from './board'
import { useParams } from 'react-router-dom'
import { render } from '@testing-library/react'
// destructure createBoard file for functions to create & manipulate board
const {
    createNewBoardPieces,
    createPiecesInstancesArray,
    getPotentialMoves
} = board

const pieceIcons = {
    rook: '<i class="fas fa-chess-rook piece-icon"></i>',
    knight: '<i class="fas fa-chess-knight piece-icon"></i>',
    bishop: '<i class="fas fa-chess-bishop piece-icon"></i>',
    queen: '<i class="fas fa-chess-queen piece-icon"></i>',
    king: '<i class="fas fa-chess-king piece-icon"></i>',
    pawn: '<i class="fas fa-chess-pawn piece-icon"></i>'
}

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export default function GameBoard(props) {
    const {
        teamRef,
        teamState,
        socket,
        isSocketConnected,
        usernameRef,
        usernameState,
        teamUpRef,
        teamUpState,
        setTeamUp,
        isGameActiveRef,
        isGameActiveState,
        updatePiecesTaken
    } = props

    const [boardSquaresState, setBoardSquaresState] = useState([])

    // reference will be same as boardSquaresState but will be used as a reference for functions rather than for rendering the board
    const boardSquaresRef = useRef([])
    const setBoardSquaresRef = data => {
        boardSquaresRef.current = data
    }

    // const [pieces, setPieces] = useState([])
    const pieces = useRef([])
    const setPieces = data => {
        pieces.current = data
        if (pieces.current.length > 0 && boardSquaresRef.current.length > 0) {
            renderPieces()
        }
    }

    const currentlySelectedPiece = useRef({})
    const setCurrentlySelectedPiece = data => {
        currentlySelectedPiece.current = data
    }
    // const [selectedPieceOpenSpots, setSelectedPieceOpenSpots] = useState([])
    const selectedPieceOpenSpots = useRef([])

    // when user changes this ref, also update the shown circles on the board
    const setSelectedPieceOpenSpots = data => {
        selectedPieceOpenSpots.current = data

        // first make sure all circles are hidden
        document.querySelectorAll('.square-available-circle').forEach(circle => {
            circle.style.opacity = 0
        })

        // now show a circle on each square that is available
        selectedPieceOpenSpots.current.forEach(square => {
            // get reference to square at the given loaction
            const squareNode = document.querySelector(`[data-location=${square.letter + square.number}]`)
            // get reference to ciricle inside of square node
            const circle = squareNode.children[0]
            // update opacity of the circle
            circle.style.opacity = .6
        })
    }

    // on component load, ...
    useEffect(() => {
        // if no pieces are set in the state, generate all board pieces and add them to the state
        if (pieces.current.length < 1) {
            setPieces(createNewBoardPieces())
        }
    }, [])

    useEffect(() => {
        if (socket.current) {
            socket.current.on('opponentMove', move => {
                console.log('opponent has moved')
                forceMove(move.startLocation, move.endLocation)
                // now update which team is able to move a piece
                if (teamUpRef.current === 'white') {
                    setTeamUp('black')
                } else if (teamUpRef.current === 'black') {
                    setTeamUp('white')
                }
            })

            socket.current.on('roomJoined', room => {
                // if room.pieces has more than 0 items, set the state to that
                if (room.pieces.length > 0) {
                    // because each piece is now just an object in server, create array of pieces as instances of their respective piece class
                    const piecesWithInstances = createPiecesInstancesArray(room.pieces)
                    // set the new array of pieces to the state
                    setPieces(piecesWithInstances)
                }
            })
        }
    }, [isSocketConnected])

    // render board when the team is changed
    useEffect(() => {
        console.log('should create board for team ', teamState)
        if (teamState === 'white' || teamState === 'watcher') {
            createTeamBoard('white')
        } else if (teamState === 'black') {
            createTeamBoard('black');
        }
    }, [teamState])

    useEffect(() => {
        if (boardSquaresState.length > 0 && pieces.current.length > 0) {
            // update board squares reference to contain up to date version of board
            setBoardSquaresRef(boardSquaresState)
            renderPieces()
            // now that boards are loaded back on to the page, add event listeners to each square
            createClickEventListener()
        }
    }, [boardSquaresState])

    // function to get reference to piece instance in state array of all pieces
    const getPieceReference = (location) => {
        const pieceArr = pieces.current.filter(piece => {
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
        setPieces([...pieces.current, piece])
    }

    const removePiece = (pieceLocation) => {
        // get pieces from array of pieces excpet piece to remove
        const newPiecesArr = pieces.current.filter(piece => {
            const { letter, number } = piece.currentLocation

            return letter !== pieceLocation.letter || number !== pieceLocation.number
        })

        return newPiecesArr
    }

    const movePiece = (selectedPiece, newLocation) => {
        // get piece at clicked spot, will be null if no piece
        const pieceAtNewSpot = getPieceReference(newLocation)

        // this is an array of length 1 if square is open
        const newSquareisOpen = selectedPieceOpenSpots.current.filter(spot => spot.letter === newLocation.letter && spot.number === newLocation.number)
        // if new square is not available, return false
        if (newSquareisOpen.length === 0) {
            return false
        } else {
            // send message to server that a piece was just moved
            socket.current.emit('userMovedPiece', { startLocation: selectedPiece.currentLocation, endLocation: newLocation })
            // update which team is up
            if (teamUpRef.current === 'black') {
                setTeamUp('white')
            } else if (teamUpRef.current === 'white') {
                setTeamUp('black')
            }

            // if there is another piece on that square, remove it from the state
            if (pieceAtNewSpot) {
                // remove piece at the new location
                const newPiecesArr = removePiece(newLocation)
                // update the location of the moved piece
                updatePieceLocation(selectedPiece.currentLocation, newLocation)
                // update pieces state with new array of pieces
                setPieces(newPiecesArr)
                // update array of pieces taken
                updatePiecesTaken(pieceAtNewSpot)
                // send piece taken to server
                socket.current.emit('pieceTaken', pieceAtNewSpot)
            } else {
                // if no piece is at new square, just update the pieces on the board
                selectedPiece.setCurrentLocation({ letter: newLocation.letter, number: newLocation.number })
                renderPieces();
            }
        }
    }

    // force a piece to move if server sends opponent's move
    const forceMove = (startLocation, newLocation) => {
        console.log('start location: ', startLocation)
        const selectedPiece = getPieceReference(startLocation)
        console.log(pieces.current)
        const pieceAtNewSpot = getPieceReference(newLocation)

        // if there is another piece on that square, remove it from the state
        if (pieceAtNewSpot) {
            // remove piece at the new location
            const newPiecesArr = removePiece(newLocation)
            // update the location of the moved piece
            updatePieceLocation(selectedPiece.currentLocation, newLocation)
            // update pieces state with new array of pieces
            setPieces(newPiecesArr)
            // update array of pieces taken
            updatePiecesTaken(pieceAtNewSpot)
        } else {
            // if no piece is at new square, just update the pieces on the board
            selectedPiece.setCurrentLocation({ letter: newLocation.letter, number: newLocation.number })
            renderPieces();
        }
    }

    const createTeamBoard = team => {
        // create each square of board and push it to an array
        let boardSquares = []

        let isDarkSquare = true
        for (let i = 8; i > 0; i--) {
            letters.forEach(letter => {
                boardSquares.push(<div className={isDarkSquare ? 'board-square square-light' : 'board-square square-dark'} data-letter={letter} data-number={i} data-location={letter + i}>
                    <div className='square-available-circle'></div>
                    <div className='square-clickable' ></div>
                </div>)
                // only change isDarkSquare boolean if not on last letter
                if (letter !== 'h') {
                    isDarkSquare = !isDarkSquare
                }
            })
        }

        // if the team is black, reverse the board array
        if (team === 'black') {
            boardSquares = boardSquares.reverse()
        }

        return setBoardSquaresState(boardSquares)
    }

    const renderPieces = () => {
        console.log('rendering pieces')
        // clear all pieces off of board before rendering back to board
        document.querySelectorAll('.piece-icon-container').forEach(iconEle => {
            iconEle.remove()
        })

        pieces.current.forEach(piece => {
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

        // send message to server that pieces array has changed since this function gets called when a piece gets moved
        if (isSocketConnected) {
            console.log('updating pieces on server')
            socket.current.emit('piecesUpdate', { pieces: pieces.current, teamUp: teamUpRef.current })
        }
    }

    const createClickEventListener = () => {
        document.querySelectorAll('.square-clickable').forEach(square => {
            square.addEventListener('click', event => {
                // if the team that is up is not the user's team or game is not active, don't let anything happen on click
                if (teamUpRef.current !== teamRef.current || !isGameActiveRef.current) {
                    console.log('you are not up')
                    return
                }
                const clickedLocationLetter = event.target.parentElement.getAttribute('data-letter')
                const clickedLocationNumber = parseInt(event.target.parentElement.getAttribute('data-number'))
                // get the piece at the given square, if no piece will be undefined
                const pieceAtClickedSquare = getPieceReference({ letter: clickedLocationLetter, number: clickedLocationNumber })
                // get the currently selected piece, will be undefined if no piece is selected
                let selectedPiece = getPieceReference(currentlySelectedPiece.current)
                // if a piece is selected and a piece is at the square you are trying to move to , check if they are the same color
                let piecesAreSameTeam = selectedPiece && pieceAtClickedSquare ? selectedPiece.color === pieceAtClickedSquare.color : false

                // if there is a selected piece, user must be looking to move that piece
                if (selectedPiece && !piecesAreSameTeam && (selectedPiece.currentLocation.letter !== clickedLocationLetter || selectedPiece.currentLocation.number !== clickedLocationNumber)) {
                    movePiece(selectedPiece, { letter: clickedLocationLetter, number: clickedLocationNumber })
                }

                // if user is clicking a piece to see where it can move to, show available squares
                else if (pieceAtClickedSquare) {
                    // update state to contain open spots for selcted piece
                    // setSelectedPieceOpenSpots([])

                    // if another square is already clicked and user is swithcing to another piece
                    if (selectedPiece && (clickedLocationLetter !== selectedPiece.currentLocation.letter || clickedLocationNumber !== selectedPiece.currentLocation.number)) {
                        // update currently selected piece state to new piece
                        setCurrentlySelectedPiece({ letter: clickedLocationLetter, number: clickedLocationNumber })
                        // update available spots state
                        setSelectedPieceOpenSpots(getPotentialMoves(pieceAtClickedSquare, pieces.current))
                    }
                    // if user is just re-selcting their currently selcted piece, remove open spots from board
                    else if (selectedPiece && clickedLocationLetter === selectedPiece.currentLocation.letter && clickedLocationNumber === selectedPiece.currentLocation.number) {
                        setSelectedPieceOpenSpots([])
                        // reset currently selected piece state
                        setCurrentlySelectedPiece({})
                    }

                    // if no other piece is currently selected, select piece and show available spots if team is same as user's team
                    else if (!selectedPiece && pieceAtClickedSquare.color === teamRef.current) {
                        setCurrentlySelectedPiece({ letter: clickedLocationLetter, number: clickedLocationNumber })
                        setSelectedPieceOpenSpots(getPotentialMoves(pieceAtClickedSquare, pieces.current))
                    }

                    else {
                        console.log('user is on a different team than selected piece')
                    }

                }

                else {
                }
            })
        })
    }

    return (
        <>
            <div className='board'>
                {boardSquaresState.map(square => square)}
            </div>
            <button onClick={renderPieces}>Click me</button>
        </>
    )
}