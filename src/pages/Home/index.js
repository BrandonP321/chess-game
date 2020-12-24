import React, { useEffect, useState} from 'react'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:8000'

export default function Home() {
    let socket;

    // on load, connect to socket server
    useEffect(() => {
        socket = socketIOClient(ENDPOINT)

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('newRoomCreated', room => {
            console.log('created room ' + room)
            // redirect to game room with room's id
            window.location.href = '/game/' + room
        })
    }, [])

    const handleNewRoomCreate = () => {
        socket.emit('createNewRoom')
    }

    const handleAttemptRoomJoin = () => {

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
