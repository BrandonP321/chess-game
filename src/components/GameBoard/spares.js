    // const squareClick = (event) => {
    //     // get location of square clicked
    //     const locationLetter = event.target.parentElement.getAttribute('data-letter')
    //     const locationNumber = parseInt(event.target.parentElement.getAttribute('data-number'))
    //     const location = locationLetter + locationNumber
    //     const pieceAtClickedSquare = pieces.filter(piece => piece.currentLocation.letter === locationLetter && piece.currentLocation.number === locationNumber)[0]
    //     const selectedPiece = pieces.filter(piece => piece.currentLocation.letter === currentlySelectedPiece.letter && piece.currentLocation.number === currentlySelectedPiece.number)[0]
    //     const piecesAreSameTeam = selectedPiece && pieceAtClickedSquare ? pieceAtClickedSquare.color === selectedPiece.color : false

    //     // if state has any keys, the user must be looking to move a piece somewhere else
    //     // don't attempt to move if user is reclicking selected piece or pieces are same color
    //     console.log(currentlySelectedPiece)
    //     if (Object.keys(currentlySelectedPiece).length > 0 && !piecesAreSameTeam && (locationLetter !== currentlySelectedPiece.letter || locationNumber !== currentlySelectedPiece.number)) {
    //         // move character to new location if spot is available
    //         movePiece(selectedPiece, { letter: locationLetter, number: locationNumber })
    //     }
    //     // if user is clicking a piece to see where it can move to, show available options
    //     // TODO: add if statement to this later

    //     // check that square clicked has a piece on it
    //     else if (pieces.filter(piece => piece.currentLocation.letter === locationLetter && piece.currentLocation.number === locationNumber).length > 0) {
    //         // first make sure no squares are being shown as having an open spot
    //         const allSquares = document.querySelectorAll('.square-available-circle')
    //         allSquares.forEach(square => {
    //             square.style.opacity = 0
    //         })
    //         // if user is clicking a square other than the currently selected square, show possible move locations
    //         if (locationLetter !== currentlySelectedPiece.letter || locationNumber !== currentlySelectedPiece.number) {
    //             // update currently selected square in state
    //             setCurrentlySelectedPiece({ letter: locationLetter, number: locationNumber })
    //             const openSquares = getPotentialMoves({ letter: locationLetter, number: locationNumber }, pieces, getPieceReference)

    //             // set array of available spots in state
    //             setSelectedPieceOpenSpots(openSquares)
    //             // display a ciricle over each available spot on board
    //             openSquares.forEach(square => {
    //                 // identify square at the given location
    //                 const squareNode = document.querySelector(`[data-location=${square.letter + square.number}]`)
    //                 // reference circle element showing that the square is open
    //                 const squareCircle = squareNode.children[0]
    //                 // give circle and opacity of .6
    //                 squareCircle.style.opacity = .6
    //             })
    //         } else {
    //             // if user is clicking the piece they already have selected, reset state to nothing
    //             setCurrentlySelectedPiece({})
    //         }
    //     }
    // }

    // array of squares for board if player is team white, will be mapped over to render to page
    // const boardSquares = createWhiteTeamBoard(squareClick)
    // const boardSquares = createBlackTeamBoard(squareClick)