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
    const [gamePendingHeading, setGamePendingHeadingState] = useState('Waiting for Second Player')
    const gamePendingHeadingRef = useRef('Waiting for Second Player')
    const setGamePendingHeading = data => {
        gamePendingHeadingRef.current = data
        setGamePendingHeadingState(data)
        console.log('pending heading updated')
    }
    const [gamePendingButtonText, setGamePendingButtonTextState] = useState('')
    const gamePendingButtonTextRef = useRef('')
    const setGamePendingButtonText = data => {
        gamePendingButtonTextRef.current = data
        setGamePendingButtonTextState(data)
    }


    // state and ref for people spectating the game
    const [watchers, setWatchersState] = useState([])
    const watchersRef = useRef([])
    const setWatchers = data => {
        setWatchersState(data)
        watchersRef.current = data
    }

    // state and ref for user's username
    const [usernameState, setUsernameState] = useState('')
    const usernameRef = useRef('')
    const setUsername = data => {
        usernameRef.current = data
        setUsernameState(data)
    }

    const [whiteUsername, setWhiteUsernameState] = useState('')
    const whiteUsernameRef = useRef('')
    const setWhiteUsername = data => {
        whiteUsernameRef.current = data
        setWhiteUsernameState(data)
    }
    const [blackUsername, setBlackUsernameState] = useState('')
    const blackUsernameRef = useRef('')
    const setBlackUsername = data => {
        blackUsernameRef.current = data
        setBlackUsernameState(data)
    }

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
        console.log('game status updated to ', data)
        isGameActiveRef.current = data;
        setIsGameActiveState(data);
        // update boolean for game status on server
        socket.current.emit('gameStatusChange', data)
    }

    // state and ref for which team is able to move
    const [teamUpState, setTeamUpState] = useState('none')
    const teamUpRef = useRef('none')
    const setTeamUp = data => {
        teamUpRef.current = data
        setTeamUpState(data)

        // update value on server
        socket.current.emit('updateTeamUp', data)
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
            console.log('room joined ', room)
            // update state and reference hooks to contain current info on room
            setBlackUsername(room.blackPlayer)
            setWhiteUsername(room.whitePlayer)
            setTeamUp(room.teamUp)
            setWatchers(room.watchers)
            setWhitePiecesTaken(room.whitePiecesTaken)
            setBlackPiecesTaken(room.blackPiecesTaken)
            setIsGameActive(room.gameStatus)
        })

        socket.current.on('usernameCreated', newUser => {
            if (newUser) {
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
                    console.log('setting watchers to ', [...watchers, newUser.username])
                    setWatchers([...watchersRef.current, newUser.username])
                }
                // if there is a user in both the white and black spot, update overlay text for game to start
                if (whiteUsernameRef.current && blackUsernameRef.current) {
                    setGamePendingHeading('Game Ready to Begin')
                    // setGamePendingButtonText("Start Game")
                }
            } else {
                console.log('username taken')
            }
        })

        socket.current.on('newPlayerJoined', user => {
            // add new user's username to state
            if (user.color === 'white') {
                setWhiteUsername(user.username)
            } else if (user.color === 'black') {
                setBlackUsername(user.username)
            } else {
                console.log('new user joined, watchers: ', [...watchers, user.username])
                setWatchers([...watchersRef.current, user.username])
            }
            console.log(gamePendingHeadingRef.current)
            // if game is waiting on a second user to start, update display to let user start the game
            if (gamePendingHeadingRef.current === 'Waiting for Second Player') {
                setGamePendingHeading("Game Ready to Begin")
                setGamePendingButtonText("Start Game")
            } else if (gamePendingHeadingRef.current === 'User Left, Waiting for New Player') {
                // if user left and game was waiting for a new user, allow game to resume
                setGamePendingHeading('New User Joined')
                setGamePendingButtonText("Resume Game")
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
            // remove text from game pending button
            setGamePendingButtonText('')
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

        socket.current.on('gameIsDraw', () => {
            // when the game is a draw, end the game and let the user restart the game
            setIsGameActive(false)
            setGamePendingHeading('Game is a Draw')
            setGamePendingButtonText('Start New Game')
        })

        socket.current.on('resetGame', () => {
            // reset all states and refs
            setWhitePiecesTaken([])
            setBlackPiecesTaken([])
            setTeamUp('white')
            setIsGameActive(true)
        })

        socket.current.on('resumeGame', () => {
            // when game is resumed, game status just needs to be updated
            setIsGameActive(true)
        })

        socket.current.on('userLeft', user => {
            const { team, username } = user
            console.log('user left', user)
            // remove username of player that left and stop the game
            if (team === 'white') {
                setWhiteUsername('')
                setIsGameActive(false)
                setGamePendingHeading('User Left, Waiting for New Player')
            } else if (team === 'black') {
                setBlackUsername('')
                setIsGameActive(false)
                setGamePendingHeading('User Left, Waiting for New Player')
            } else {
                setWatchers(watchersRef.current.filter(watcher => watcher !== username))
            }
        })

        // when user has left but a spectator is taking over for them
        socket.current.on('userTakingOver', user => {
            // update game status to active
            setIsGameActive(true)
            console.log('user taking over: ', user)
            // assign user's username to appropriate state
            if (user.team === 'white') {
                setWhiteUsername(user.username)
            } else if (user.team === 'black') {
                setBlackUsername(user.username)
            }
            // if you are the user taking over, update your team
            if (usernameRef.current === user.username) {
                setTeam(user.team)
            }
            // remove user from array of watchers in state
            setWatchers(watchersRef.current.filter(watcher => watcher !== user.username))
        })

        socket.current.on('userResigned', user => {
            console.log(user)
            const teamCapitalized = user.team.charAt(0).toUpperCase() + user.team.slice(1)
            const winningTeam = user.team === 'white' ? 'Black' : 'White'
            // end game and show which team won
            setIsGameActive(false)
            setGamePendingHeading(`${teamCapitalized} Resigned, ${winningTeam} Wins`)
            setGamePendingButtonText('Start New Game')
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
        } else if (btnText === 'Resume Game') {
            // if game is to be resumed, update the game status
            setIsGameActive(true)
            setGamePendingButtonText('')
            socket.current.emit('resumeGame')
        } else if (btnText === 'Start New Game') {
            socket.current.emit('startNewGame')
        }
    }

    return (
        <>
            <div className='content-wrapper'>
                <div className='game-main-content'>
                    <GameBoard 
                        roomId={room}
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
                        watchers={watchers}
                        socket={socket}
                        isSocketConnected={isSocketConnected}
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
