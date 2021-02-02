import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import HomeHeader from '../../components/HomeHeader'
import socketIOClient from 'socket.io-client'
import './index.css'

// endpoint for socket.io connection
const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT

export default function Home() {
    let history = useHistory();

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
            history.push('/game/' + room)
        })

        socket.current.on('allowRoomJoin', room => {
            // redirect to the game with the given room id
            history.push('/game/' + room)
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
        <>
            <div className='home-bg-white'></div>
            <HomeHeader />
            <div className='home-bg-div'></div>
            <div className='home-content-wrapper'>
                <div className='new-room-wrapper'>
                    <h2>Create New Room</h2>
                    <button className='btn btn-primary new-room-btn' onClick={handleNewRoomCreate}>Create New Room</button>
                </div>
                <div className='join-room-wrapper'>
                    <h2>Join Existing Room</h2>
                    <form className='join-room-form' onSubmit={handleAttemptRoomJoin}>
                        <input className='form-control' type='text' placeholder='Room ID'></input>
                        <button className='btn btn-primary join-room-btn'>Join</button>
                    </form>
                </div>
            </div>
        </>
    )
}
