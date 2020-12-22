import React, { useState, useEffect, Component } from 'react'
import Queen from '../../classes/Queen'
import Board from '../../classes/Board'
import createNewBoard from './createBoard'
import './index.css'

export default function GameBoard() {
    // state containing a Board class instance
    const [pieces, setPieces] = useState(new Board(createNewBoard()))

    useEffect(() => {
        // const board = new Board([new Queen({ letter: 'd', number: 1 }, 'white')])
        // console.log(board)
        // console.log(board.getPotentialMoves({ letter: 'd', number: 1 }))
    }, [])

    // update locations on board when a piece has it's position changed
    useEffect(() => {
        console.log('change')
    }, [pieces])

    // console.log(pieces)
    // console.log(pieces.getPotentialMoves({letter: 'b', number: 1}))
    // pieces.addPiece({letter: 'd', number: 2})


    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    // create each square of board and push it to an array
    const boardSquares = []

    let isDarkSquare = true
    for (let i = 8; i > 0; i--) {
        letters.forEach(letter => {
            boardSquares.push(<div className={isDarkSquare ? 'board-square square-light' : 'board-square square-dark'} data-letter={letter} data-number={i}>
                <div className='square-available-circle'></div>
            </div>)
            // only change isDarkSquare boolean if not on last letter
            if (letter !== 'h') {
                isDarkSquare = !isDarkSquare
            }
        })
    }
    // console.log(boardSquares)

    return (
        <div className='board'>
            {boardSquares.map(square => square)}
        </div>
    )
}
