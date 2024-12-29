const {Player} = require("./Player");

class computerPlayer extends Player{
    constructor(name='computerPlayer', id='2', type='computer'){
        super(name, id, type );
        this.BOARD_DIMENSION = 10;
        this.possibleMoves = this.generateMoves();
    }


    getMove(){
        return this.possibleMoves[Math.floor(Math.random() * this.possibleMoves.length)];
    }

    //Generate an array of all possible moves on a new board
    generateMoves(){
        const moves = [];
        for (let i = 0; i < this.BOARD_DIMENSION; i++) {
            for (let j = 0; j < this.BOARD_DIMENSION; j++) { 
                moves.push([i,j]);
            }
        }

        return moves;
    }

    updateResult(move, result){
        const index = this.possibleMoves.indexOf(move);
        if(index > -1){
            this.possibleMoves.splice(index , 1);
            return true;
        }
    }


    removeMove(move){
        const index = this.possibleMoves.indexOf(move);
        if(index > -1){
            this.possibleMoves.splice(index , 1);
            return true;
        }else{
            return false;
        }

    }
}

const player = new computerPlayer();

for(i = 0; i < 100; i++){
    const move = player.getMove();
    console.log(move);
    console.log(player.updateResult(move));
    console.log(player.possibleMoves);
}
module.exports = {computerPlayer};