import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:8000'
// const ENDPOINT = 'https://chess-123-server.herokuapp.com'

export default function Home() {
    const socket = useRef()
    const setSocket = data => {
        socket.current = data

        // when socket is defined, create listeners
        socket.current.on('connect', () => {
            console.log('connected')
        })
        
        socket.current.on('newRoomCreated', room => {
            console.log('created room ' + room)
            // redirect to game room with room's id
            window.location.href = '/game/' + room
        })
        
        socket.current.on('allowRoomJoin', room => {
            // redirect to the game with the given room id
            window.location.href = '/game/' + room
        })
    }    

    // on load, connect to socket.io server
    useEffect(() => {
        setSocket(socketIOClient(ENDPOINT))
    }, [])

    const handleNewRoomCreate = () => {
        // tell socket.io server to make a new room for the user
        socket.current.emit('createNewRoom')
    }

    const handleAttemptRoomJoin = (event) => {
        event.preventDefault();
        
        // roomid from input field
        const roomId = event.target.children[0].value

        // tell socket.io server to check for a room with the given id
        socket.current.emit('joinExistingRoom', roomId)
    }

    return (
        <div>
            <div>
                <h2>Create New Room</h2>
                <button className='new-room-btn' onClick={handleNewRoomCreate}>Create New Room</button>
            </div>
            <div>
                <h2>Join Existing Room</h2>
                <form className='join-room-form' onSubmit={handleAttemptRoomJoin}>
                    <input className='form-control' type='text' placeholder='Room ID'></input>
                    <button className='join-room-btn'>Join</button>
                </form>
            </div>
        </div>
    )
}
