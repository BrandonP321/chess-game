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
    const usernameRef = useRef('')
    const setUsernameRef = data => {
        usernameRef.current = data
    }

    const [whiteUsername, setWhiteUsername] = useState('')
    const [blackUsername, setBlackUsername] = useState('')

    const [whitePiecesTaken, setWhitePiecesTaken] = useState([])
    const [blackPiecesTaken, setBlackPiecesTaken] = useState(['rook', 'rook', 'pawn', 'pawn', 'knight', 'pawn', 'bishop', 'queen', 'rook', 'rook', 'pawn', 'pawn', 'knight', 'pawn', 'bishop', 'queen'])

    const teamRef = useRef()
    const setTeamRef = data => {
        teamRef.current = data
    }

    const [team, setTeam] = useState()

    const isGameActive = useRef(false)
    const setIsGameActive = data => {
        isGameActive.current = data
    }

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
            setUsernameRef(newUser.username)
            if (newUser.color === 'white') {
                setTeam('white')
                setTeamRef('white')
                setWhiteUsername(newUser.username)
            } else if (newUser.color === 'black') {
                setTeam('black')
                setTeamRef('black')
                setBlackUsername(newUser.username)
            } else {
                setTeamRef('watcher')
                setTeam('watcher')
            }
        })

        socket.current.on('notEnoughPlayersToStart', () => {

        })

        socket.current.on('startGame', team => {
            console.log('game started ', team)
            // if no team is up, game has not yet started and can be set to white
            if (teamUp.current === 'none'){
                setTeamUp(team)
            }
            setIsGameActive(true)
        })

        socket.current.on('userLeft', user => {
            const { team, username } = user
            console.log('user left', user)

            if (team === 'white') {
                // if a white player left, remove their username and stop the game
                setWhiteUsername('')
                setIsGameActive(false)
            } else if (team === 'black') {
                // if a black player left, remove their username and stop the game
                console.log()
                setBlackUsername('')
                setIsGameActive(false)
            } else {
                // otherwise a spectator must have left, remove their name from the board
                setWatchers(watchers.filter(watcher => watcher !== username))
            }
        })

        // send message to server before user leaves page
        window.onbeforeunload = () => {
            socket.current.emit('userLeaving', { username: usernameRef.current, team: teamRef.current})
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
                    <GameBoard 
                        team={team} 
                        socket={socket} 
                        username={username} 
                        teamUp={teamUp} 
                        setTeamUp={setTeamUp} 
                        isSocketConnected={isSocketConnected}
                        isGameActive={isGameActive}
                    />
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
