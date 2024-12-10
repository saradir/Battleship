const { Gameboard } = require("./Gameboard");

class Player{
    constructor(id, name = 'guest', type = 'human', ){
        this.board = new Gameboard();
        this.name = name;
        this.id = id;

    }

    getBoard(){
        return this.board.board;
    }

    getShips(){
        return this.board.ships;
    }
}

module.exports = {Player};