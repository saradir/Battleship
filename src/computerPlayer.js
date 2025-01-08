const {Player} = require("./Player");

class computerPlayer extends Player{
    constructor(id='two', name='computerPlayer', type='computer'){
        super(id, name, type );
        this.BOARD_DIMENSION = 10;
        this.possibleMoves = this.generateMoves();
        this.horizontalMoves = [];
        this.verticalMoves = [];
        this.orientation = 'unknown';
    }


    getMove(){
        if(this.horizontalMoves.length > 0 && (this.orientation === 'horizontal' || this.orientation === 'tryingHorizontal')){
            return this.horizontalMoves.pop();
        } else if(this.verticalMoves.length > 0 && (this.orientation === 'vertical' || this.orientation === 'tryingVertical')){
            return this.verticalMoves.pop();
        }else{
        return this.possibleMoves[Math.floor(Math.random() * this.possibleMoves.length)];
        }
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
        // remove move from all possible moves to avoid future repeats
        this.removeMove(move);
        this.updateOrientation(result);

        // if 'hit', generate cadidate moves
        if(result === 'hit'){
            //update horizontal targets
            if(this.orientation !== 'vertical'){
                const adjacentHorizontal = this.getAdjacentMoves(move, 'horizontal');
                for(let move of adjacentHorizontal){
                    if(this.possibleMoves.some(m => m.length === move.length && m.every((val, index) => val === move[index])
                    )){   
                        this.horizontalMoves.push(move);                    
                    }
                }
            }

            //update vertical targets
            if(this.orientation !== 'horizontal'){
                const adjacentVertical = this.getAdjacentMoves(move, 'vertical');
                for(let move of adjacentVertical){
                    if(this.possibleMoves.some(m => m.length === move.length && m.every((val, index) => val === move[index])
                    )){
                        this.verticalMoves.push(move);
                    }
                
                }
            }
            this.getAdjacentMoves(move, 'diagonal').forEach(diagonal => this.removeMove(diagonal));

            }

        if(result === 'sunk'){
            this.getAdjacentMoves(move, 'diagonal').forEach(diagonal => this.removeMove(diagonal));
            this.horizontalMoves = [];
            this.verticalMoves = [];
        }        
    }
    
    updateOrientation(status){
        if(status === 'hit'){
            if(this.orientation === "unknown"){
                this.orientation = "tryingHorizontal";
            }else if(this.orientation === "tryingHorizontal"){
                this.orientation = "horizontal";
            }else if(this.orientation === "tryingVertical"){
                this.orientation = "vertical";
            }
            return;
        }

        if(status === 'miss' && this.orientation === "tryingHorizontal" && this.horizontalMoves.length === 0){
            this.orientation = "tryingVertical";
            return;
        }

        if(status ==="sunk"){
            this.orientation = "unknown";
            return;
        }
    }

    removeMove(move){
        const index = this.possibleMoves.findIndex(
            m => m.length === move.length && m.every((val, idx) => val === move[idx])
        );
    
        if(index > -1){
            this.possibleMoves.splice(index , 1);
            return true;

        }else{
            return false;
        }

    }

    getAdjacentMoves([x,y], direction){
        const moves = [];
        if(direction === "vertical"){
            if(x < 9){
                moves.push([x+1, y]);
            }
            if(x > 0){
                moves.push([x-1, y]);
            }
        }

        if(direction ==="horizontal"){
            if(y < 9){
                moves.push([x, y+1]);
            }
            if(y > 0){
                moves.push([x, y-1]);
            }
        }

        if(direction === "diagonal"){
            moves.push([x-1, y+1]);
            moves.push([x-1, y-1]);
            moves.push([x+1, y+1]);
            moves.push([x+1, y-1]);
        }
        return moves;
    }
}

const player = new computerPlayer();


module.exports = {computerPlayer};