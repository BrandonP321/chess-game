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
    // get room id from url
    const { room } = useParams();

    // controls the state of the modal
    const [showModal, setShowModal] = useState(true)

    // state of heading and button showing when game is inactive
    const [gamePendingHeading, setGamePendingHeading] = useState('Waiting for second Player')
    const [gamePendingButtonText, setGamePendingButtonText] = useState('')


    // state and ref for people spectating the game
    const [watchers, setWatchers] = useState([])

    // state and ref for user's username
    const [usernameState, setUsernameState] = useState('')
    const usernameRef = useRef('')
    const setUsername = data => {
        usernameRef.current = data
        setUsernameState(data)
    }

    const [whiteUsername, setWhiteUsername] = useState('')
    const [blackUsername, setBlackUsername] = useState('')

    // state and ref for white pieces taken by black player
    const [whitePiecesTakenState, setWhitePiecesTakenState] = useState([])
    const whitePiecesTakenRef = useRef([])
    const setWhitePiecesTaken = data => {
        whitePiecesTakenRef.current = data
        setWhitePiecesTakenState(data)
    }

    // state and ref for black pieces taken by white player
    const [blackPiecesTakenState, setBlackPiecesTakenState] = useState([])
    const blackPiecesTakenRef = useRef([])
    const setBlackPiecesTaken = data => {
        blackPiecesTakenRef.current = data;
        setBlackPiecesTakenState(data)
    }

    // state and ref for user's team
    const [teamState, setTeamState] = useState()
    const teamRef = useRef()
    const setTeam = data => {
        teamRef.current = data;
        setTeamState(data)
    }
    
    // state and ref indicating if game is active
    const [isGameActiveState, setIsGameActiveState] = useState(false)
    const isGameActiveRef = useRef(false)
    const setIsGameActive = data => {
        isGameActiveRef.current = data;
        setIsGameActiveState(data);
    }

    // state and ref for which team is able to move
    const [teamUpState, setTeamUpState] = useState('none')
    const teamUpRef = useRef('none')
    const setTeamUp = data => {
        teamUpRef.current = data
        setTeamUpState(data)
    }

    // state indicating if site is connected to the socket.io server
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    // reference to the socket.io connection
    const socket = useRef()
    const setSocket = data => {
        socket.current = data

        // when the useRef hook for the socket is set, we know we are now connected to the server
        setIsSocketConnected(true)

        // create socket.io listeners

        socket.current.on('connect', data => {
            console.log('connected to game name space')
            // make request to join the current room on the server
            socket.current.emit('joinRoom', room)
        })

        // when the user joins a room, get all current info on that room
        socket.current.on('roomJoined', room => {
            // update state and reference hooks to contain current info on room
            setBlackUsername(room.blackPlayer)
            setWhiteUsername(room.whitePlayer)
            setTeamUp(room.teamUp)
            setWatchers(room.watchers)
            setWhitePiecesTaken(room.whitePiecesTaken)
            setBlackPiecesTaken(room.blackPiecesTaken)
        })

        socket.current.on('usernameCreated', newUser => {
            console.log('username good, color: ' + newUser.color)
            // hide the modal
            setShowModal(!showModal)
            // update hooks for user's username
            setUsername(newUser.username)
            // assign team and username to hooks based on team color
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
            // if no team is up, game has not yet started and can be set to white
            if (teamUpRef.current === 'none'){
                console.log('team should be updated')
                setTeamUp(team)
            }
            setIsGameActive(true)
        })

        socket.current.on('gameOver', winningTeam => {
            // capitalize color of winning team
            const teamCapitalized = winningTeam.charAt(0).toUpperCase() + winningTeam.slice(1)
            // stop game
            setGamePendingHeading(teamCapitalized + ' Wins')
            setGamePendingButtonText('Start New Game')
            setIsGameActive(false)
        })

        socket.current.on('resetGame', () => {
            // reset all states and refs
            setWhitePiecesTaken([])
            setBlackPiecesTaken([])
            setTeamUp('white')
            setIsGameActive(true)
        })

        socket.current.on('userLeft', user => {
            const { team, username } = user
            console.log('user left', user)
            // remove username of player that left and stop the game
            if (team === 'white') {
                setWhiteUsername('')
                setIsGameActive(false)
            } else if (team === 'black') {
                setBlackUsername('')
                setIsGameActive(false)
            } else {
                setWatchers(watchers.filter(watcher => watcher !== username))
            }
        })

        // tell the server when a player is leaving the page
        window.onbeforeunload = () => {
            socket.current.emit('userLeaving', { username: usernameRef.current, team: teamRef.current})
        }
    }

    // on load, connect to the socket.io server
    useEffect(() => {
        setSocket(socketIOClient(ENDPOINT))
    }, [])

    // handles closing of the modal to create a username
    const handleModalClose = () => {
        setShowModal(!showModal)
    }

    const handleModalInputChange = (event) => {
        const value = event.target.value
        setUsername(value)
    }

    const attemptUsernameCreate = () => {
        socket.current.emit('createUsername', usernameRef.current)

        // move this code in to a socket.on() once username validation on server
    }

    const updatePiecesTaken = piece => {
        // based on the pieces color, add that piece to it's appropriate array
        if (piece.color === 'white') {
            setWhitePiecesTaken([...whitePiecesTakenRef.current, piece.pieceType])
        } else if (piece.color === 'black') {
            setBlackPiecesTaken([...blackPiecesTakenRef.current, piece.pieceType])
        }
    }

    const handleOverlayButtonClick = event => {
        // based on the buttons text, execute the appropriate code
        const btnText = event.target.innerText
        console.log(btnText)
        if (btnText === 'Start Game') {
            socket.current.emit('beginGame')
        } else if (btnText === 'resumeGame') {
            socket.current.emit('beginGame')
        } else if (btnText === 'Start New Game') {
            socket.current.emit('startNewGame')
        }
    }

    return (
        <>
            <div className='content-wrapper'>
                <div className='game-main-content'>
                    <GameBoard 
                        teamRef={teamRef}
                        teamState={teamState} 
                        socket={socket} 
                        usernameState={usernameState} 
                        usernameRef={usernameRef} 
                        teamUpRef={teamUpRef}
                        teamUpState={teamUpState} 
                        setTeamUp={setTeamUp} 
                        isSocketConnected={isSocketConnected}
                        isGameActiveRef={isGameActiveRef}
                        isGameActiveState={isGameActiveState}
                        updatePiecesTaken={updatePiecesTaken}
                        gamePendingHeading={gamePendingHeading}
                        setGamePendingHeading={setGamePendingHeading}
                        gamePendingButtonText={gamePendingButtonText}
                        setGamePendingButtonText={setGamePendingButtonText}
                        handleOverlayButtonClick={handleOverlayButtonClick}
                    />
                    <button onClick={() => {
                        socket.current.emit('beginGame')
                    }}>Start Game</button>
                    <button onClick={() => {
                        socket.current.emit('startNewGame')
                    }}>reset Game</button>
                </div>
                <div className='game-aside-content'>
                    <PlayersAside 
                        teamRef={teamRef} 
                        teamState={teamState}
                        whitePiecesTakenRef={whitePiecesTakenRef} 
                        whitePiecesTakenState={whitePiecesTakenState} 
                        blackPiecesTakenRef={blackPiecesTakenRef} 
                        blackPiecesTakenState={blackPiecesTakenState} 
                        whiteUsername={whiteUsername}
                        blackUsername={blackUsername}
                        usernameRef={usernameRef}
                        usernameState={usernameState}
                    />
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Create a Username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='text' className='form-control' value={usernameState} placeholder='Username' onChange={handleModalInputChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={attemptUsernameCreate}>Let's Go</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
