class Piece {
    constructor(startLocation, color) {
        this.startLocation = startLocation;
        this.color = color;
        this.currentLocation = startLocation;
        this.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    }
}

module.exports = Piece