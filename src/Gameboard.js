const { Ship } = require("./Ship");

class Gameboard{
    constructor(){
        
        this.DIMENSION = 10; 
        this.MAX_SHIP_SIZE = 5;
        this.SUNK_MARKER = 'S';
        this.HIT_MARKER = 'H';
        this.MISS_MARKER = 'X';
        this.board = this.initiateBoard();
        this.ships = [];
    }

    clearBoard(){
        this.board = this.initiateBoard();
        this.ships = [];
    }

    initiateBoard(){
        return Array.from({ length: this.DIMENSION }, () => Array(this.DIMENSION).fill(' ')); 
    }

    //set ship on board in the given coordinates
    set(ship, firstCoord){
        let coordinates = [];
        let coordinate;
        //calculate coordinates
        for(let i=0; i < ship.length; i++){
            if(ship.orientation === 'vertical'){
                coordinate = [firstCoord[0], firstCoord[1] +i];
            }else{ //orientation is horizontal
                coordinate = [firstCoord[0] +i, firstCoord[1]];
               }
            this.validateCoord(coordinate);
            coordinates.push(coordinate);   
        }
        // all tests passed
        this.ships.push([ship, coordinates]);
        
        for(let [x, y] of coordinates){
            this.board[x][y] = ship;
        }
    }

    validateCoord([x,y], mode = 'set'){
          
        if(x >= this.DIMENSION || x < 0 || y >= this.DIMENSION || y < 0){
            throw new Error(`Illegal coordinates: every coordinate must be a number between 0-${this.DIMENSION - 1}`);
        }

        if(this.board[x][y] != ' ' && mode === 'set'){
            throw new Error('Cell is already occupied');
        }

        if(this.board[x][y] === this.MISS_MARKER || this.board[x][y] === this.HIT_MARKER){
            throw new Error('Cell has already been targeted');
        } 


        //test for no-adjacency rule during placement phase
        if(mode ==='set'){
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue; // Skip the current cell

                    const adjX = x + dx;
                    const adjY = y + dy;

                    if (adjX >= 0 && adjX < this.DIMENSION && adjY >= 0 && adjY < this.DIMENSION) {
                        if (this.board[adjX][adjY] instanceof Ship) {
                            throw new Error('Cell is adjacent to another ship');
                        }
                    }
                }
            }
        }
        return true;
    }

    receiveAttack([x,y]){
        let result;
        try {
            this.validateCoord([x,y], 'target');
        } catch (error) {
           return {status:'error', reason: error.message}; 
        }

        
        if(this.board[x][y] instanceof Ship){
            this.board[x][y].hit();
            if(this.board[x][y].isSunk()){
                result = {status: 'sunk'};
            }else{
                 result = {status:'hit'};
            }
            this.board[x][y] = this.HIT_MARKER;
        }else{
            this.board[x][y] = this.MISS_MARKER;
            result = {status:'miss'};
        }
        return result;
    }

    isOver(){
        for(let [ship, coords] of this.ships){
            if(!ship.isSunk()){
                return false;
            }
        }
        return true;
    }

    // generates a random board;
    generateRandom(arr = [5, 4, 3, 3, 2]){

        this.clearBoard();

        for(let length of arr){
            
            while(true){
                const orientation = Math.random() < 0.5? 'vertical':'horizontal';
                const ship = new Ship(length, orientation);
                let xCor = Math.floor(Math.random() * (this.DIMENSION));
                let yCor = Math.floor(Math.random() * (this.DIMENSION));


                try {
                    this.set(ship, [xCor, yCor]);
                    break;
                } catch (error) {
                    //placing failed, try again
                }
                
            }
        }
    }
}





module.exports = {Gameboard};