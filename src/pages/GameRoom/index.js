import React, { Component } from 'react'
import GameBoard from '../../components/GameBoard'
import './index.css'

export default class GameRoom extends Component {
    render() {
        return (
            <div>
                <GameBoard />
            </div>
        )
    }
}
