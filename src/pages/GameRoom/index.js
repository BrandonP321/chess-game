import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import socketIOClient from 'socket.io-client'
import GameBoard from '../../components/GameBoard'
import PlayersAside from '../../components/PlayersAside'
import './index.css'

const ENDPOINT = 'http://localhost:8000/game'
// const ENDPOINT = 'https://chess-123-server.herokuapp.com/game'


export default function GameRoom() {
    const { room } = useParams();

    // show controls the state of the modal
    const [show, setShow] = useState(true)

    const [watchers, setWatchers] = useState([])

    const [username, setUsername] = useState('')

    const [whiteUsername, setWhiteUsername] = useState('')
    const [blackUsername, setBlackUsername] = useState('')

    const [whitePiecesTaken, setWhitePiecesTaken] = useState([])
    const [blackPiecesTaken, setBlackPiecesTaken] = useState(['rook', 'rook', 'pawn', 'pawn', 'knight', 'pawn', 'bishop', 'queen', 'rook', 'rook', 'pawn', 'pawn', 'knight', 'pawn', 'bishop', 'queen'])

    const [team, setTeam] = useState()

    const teamUp = useRef('none')
    const setTeamUp = data => {
        teamUp.current = data
    }

    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const socket = useRef()
    const setSocket = data => {
        socket.current = data

        // update socket state, this tells GameBoard.js that we are connected to the 
        //socket.io server and it can create socket.io listerners on that file
        setIsSocketConnected(true)


        socket.current.on('connect', data => {
            console.log('connected to game name space')
            // make request to join the current room on the server
            socket.current.emit('joinRoom', room)
        })

        // when the user joins a room, get all current info on that room
        socket.current.on('roomJoined', room => {
            console.log(room)
            // update states and reference hooks to contain current info on room
            setBlackUsername(room.blackPlayer)
            setWhiteUsername(room.whitePlayer)
            setTeamUp(room.teamUp)
            setWatchers(room.watchers)
        })

        socket.current.on('usernameCreated', newUser => {
            console.log('username good, color: ' + newUser.color)
            // color will tell whether you are white, black, or a watcher
            // re-render board squares to the respective team color
            setShow(!show)
            setUsername(newUser.username)
            if (newUser.color === 'white') {
                setTeam('white')
                setWhiteUsername(newUser.username)
            } else if (newUser.color === 'black') {
                setTeam('black')
                setBlackUsername(newUser.username)
            } else {
                setTeam('watcher')
            }
        })

        socket.current.on('notEnoughPlayersToStart', () => {

        })

        socket.current.on('startGame', team => {
            console.log('game started ', team)
            setTeamUp(team)
        })

        // send message to server before user leaves page
        window.onbeforeunload = () => {
            socket.current.emit('userLeaving')
        }
    }

    useEffect(() => {
        // connect to server main socket
        setSocket(socketIOClient(ENDPOINT))
    }, [])

    // handles closing of the modal to create a username
    const handleClose = () => {
        setShow(!show)
    }

    const handleModalInputChange = (event) => {
        const value = event.target.value
        setUsername(value)
    }

    const attemptUsernameCreate = () => {
        socket.current.emit('createUsername', username)

        // move this code in to a socket.on() once username validation on server
    }

    return (
        <>
            <div className='content-wrapper'>
                <div className='game-main-content'>
                    <GameBoard team={team} socket={socket} username={username} teamUp={teamUp} setTeamUp={setTeamUp} isSocketConnected={isSocketConnected} />
                    <button onClick={() => {
                        socket.current.emit('beginGame')
                    }}>Start Game</button>
                </div>
                <div className='game-aside-content'>
                    <PlayersAside 
                        team={team} 
                        whitePiecesTaken={whitePiecesTaken} 
                        blackPiecesTaken={blackPiecesTaken} 
                        whiteUsername={whiteUsername}
                        blackUsername={blackUsername}
                        username={username}
                    />
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Create a Username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='text' className='form-control' value={username} placeholder='Username' onChange={handleModalInputChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={attemptUsernameCreate}>Let's Go</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
