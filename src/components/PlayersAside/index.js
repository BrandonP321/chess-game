import React, { useState, useRef, useEffect } from 'react'
import './index.css'

const pieceIcons = {
    rook: <i class="fas fa-chess-rook taken-piece-icon"></i>,
    knight: <i class="fas fa-chess-knight taken-piece-icon"></i>,
    bishop: <i class="fas fa-chess-bishop taken-piece-icon"></i>,
    queen: <i class="fas fa-chess-queen taken-piece-icon"></i>,
    king: <i class="fas fa-chess-king taken-piece-icon"></i>,
    pawn: <i class="fas fa-chess-pawn taken-piece-icon"></i>
}

export default function PlayersAside(props) {
    const { 
        socket,
        isSocketConnected,
        teamRef,
        teamState, 
        whitePiecesTakenState, 
        blackPiecesTakenState, 
        whiteUsername, 
        blackUsername, 
        usernameRef,
        usernameState,
        watchers,
    } = props
    
    const [drawIsAsked, setDrawIsAsked] = useState(false)
    
        useEffect(() => {
            if (socket.current) {
                socket.current.on('userWantsDraw', () => {
                    // if the current user is on either team, ask if they want a draw
                    if (teamRef.current === 'white' || teamRef.current === 'black') {
                        setDrawIsAsked(true)
                    }
                })
            }
        }, [isSocketConnected])
    
    const askForDraw = () => {
        // emite to server that user wants to draw
        socket.current.emit('userWantsDraw')
    }

    const answerDraw = (doesAccept) => {
        console.log('you answered draw with ', doesAccept)
        // hide the text asking for a draw
        setDrawIsAsked(false)

        // if user accepts draw, send message to server to draw the game
        if (doesAccept) {
            socket.current.emit('userAcceptsDraw')
        }
    }

    const playerResign = () => {
        // emit to other users that user has resigned
        socket.current.emit('resign', { username: usernameRef.current, team: teamRef.current })
    }
    
    return (
        <div>
            <div className='player-btns'>
                <button onClick={askForDraw}>Draw</button>
                <button onClick={playerResign}>Resign</button>
            </div>
            <div className='draw-question-wrapper' style={drawIsAsked ? {} : {opacity: 0}}>
                <p>Would you like to call it a draw?</p>
                <button className='draw-btn-yes' onClick={() => answerDraw(true)}>Yes</button>
                <button className='draw-btn-no' onClick={() => answerDraw(false)}>No</button>
            </div>
            <div className='player-info-container'>
                <h3 className='player-username'>
                    <span><i class="fas fa-chess-king team-icon icon-white"></i> </span>
                    {!whiteUsername ? 'No Player': whiteUsername === usernameState ? 'You': whiteUsername}
                </h3>
                <div className='taken-pieces-container taken-pieces-black'>
                    {blackPiecesTakenState.map(piece => {
                        return (
                            <div className='taken-piece-container'>
                                {pieceIcons[piece]}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='player-info-container'>
                <h3 className='player-username'>
                    <span><i class="fas fa-chess-king team-icon icon-black"></i> </span>
                    {!blackUsername ? 'No Player': blackUsername === usernameState ? 'You': blackUsername}
                </h3>
                <div className='taken-pieces-container taken-pieces-white'>
                    {whitePiecesTakenState.map(piece => {
                        return (
                            <div className='taken-piece-container'>
                                {pieceIcons[piece]}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='spectators-container'>
                {watchers.map(watcher => {
                    return <p>{watcher === usernameRef.current ? 'You' : watcher}</p>
                })}
            </div>
        </div>
    )
}
