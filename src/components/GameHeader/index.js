import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.css'

export default function GameHeader(props) {
    let history = useHistory();

    const { toggleMobileMenu, handleLeaveGame } = props

    return (
        <header className='game-header'>
            <h1 onClick={() => history.push('/')}><i class="fas fa-chess-king header-icon" /> 1-2-3 Chess</h1>
            <div className='responsive-header-btns'>
                <button className='leave-room-btn btn btn-danger' onClick={handleLeaveGame}>Leave Room</button>
                <i className='fas fa-bars menu-icon' onClick={toggleMobileMenu}></i>
            </div>
        </header>
    )
}
