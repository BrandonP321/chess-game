import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import socketIOClient from 'socket.io-client'
import GameBoard from '../../components/GameBoard'
import './index.css'

const ENDPOINT = 'http://localhost:8000/game'
// const ENDPOINT = 'https://chess-123-server.herokuapp.com/game'


export default function GameRoom() {
    const { room } = useParams();

    // show controls the state of the modal
    const [show, setShow] = useState(true)

    const [username, setUsername] = useState('')

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

        socket.current.on('usernameCreated', color => {
            console.log('username good, color: ' + color)
            // color will tell whether you are white, black, or a watcher
            // re-render board squares to the respective team color
            if (color === 'white') {
                setTeam('white')
                setShow(!show)
            } else if (color === 'black') {
                setTeam('black')
                setShow(!show)
            } else {
                setTeam('watcher')
                setShow(!show)
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
    }

    return (
        <div>
            <h1>hi</h1>
            <GameBoard team={team} socket={socket} username={username} teamUp={teamUp} setTeamUp={setTeamUp} isSocketConnected={isSocketConnected} />
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
            <button onClick={() => {
                socket.current.emit('beginGame')
            }}>Start Game</button>
        </div>
    )

}
