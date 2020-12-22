import React from 'react'

import Pawn from '../../classes/Pawn'
import Knight from '../../classes/Knight'
import Rook from '../../classes/Rook'
import Bishop from '../../classes/Bishop'
import Queen from '../../classes/Queen'

export default function createNewBoard() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    
    const pawns = []
    // create white pawns and push them to the array
    // for (let i = 0; i < 8; i++) {
    //     let newPawn = new Pawn({ letter: letters[i], number: 2 }, 'white')
        
    //     pawns.push(newPawn)
    // }
    // create black pawns and push them to the array
    for (let i = 0; i < 8; i++) {
        let newPawn = new Pawn({ letter: letters[i], number: 7 }, 'black')
        
        pawns.push(newPawn)
    }
    
    const knights = [
        new Knight({ letter: 'b', number: 1 }, 'white'),
        new Knight({ letter: 'g', number: 1 }, 'white'),
        new Knight({ letter: 'b', number: 8 }, 'black'),
        new Knight({ letter: 'g', number: 8 }, 'black')
    ]
    
    const rooks = [
        new Rook({ letter: 'a', number: 1 }, 'white'),
        new Rook({ letter: 'h', number: 1 }, 'white'),
        new Rook({ letter: 'a', number: 8 }, 'black'),
        new Rook({ letter: 'h', number: 8 }, 'black'),
    ]
    
    const bishops = [
        new Bishop({ letter: 'c', number: 1 }, 'white'),
        new Bishop({ letter: 'f', number: 1 }, 'white'),
        new Bishop({ letter: 'c', number: 8 }, 'black'),
        new Bishop({ letter: 'f', number: 8 }, 'black'),
    ]
    
    const queens = [
        new Queen({ letter: 'd', number: 1 }, 'white'),
        new Queen({ letter: 'd', number: 8 }, 'black')
    ]

    return [...queens, ...bishops, ... rooks, ...knights, ...pawns]
}
