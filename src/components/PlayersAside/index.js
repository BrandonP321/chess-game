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
        teamRef,
        teamState, 
        whitePiecesTakenState, 
        blackPiecesTakenState, 
        whiteUsername, 
        blackUsername, 
        usernameRef,
        usernameState,
        watchers
    } = props
    
    return (
        <div>
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
                    return <p>{watcher}</p>
                })}
            </div>
        </div>
    )
}
