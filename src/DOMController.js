const { Ship } = require("./Ship");


function displayBoard(player, mode = "all"){
    const newBoard = document.querySelector(`.board#${player.id}`);
    newBoard.innerHTML = '';
    const board = player.getBoard();
 
    
    for(let i = 0; i < 10; i++){
        for(let j=0; j < 10; j++){
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.coordinates = `${i},${j}`;
            newBoard.appendChild(cell);
            
            if(board[i][j] === player.board.HIT_MARKER){
                cell.dataset.status = 'HIT';
            }else if(board[i][j] === player.board.MISS_MARKER){
                cell.toggleAttribute = 'MISSED';
                cell.textContent = 'X';
            }
        }
    }
   
        renderShips(player, mode);
}

function displayMessage(message){
    const messageWindow = document.querySelector('#message-box');
    messageWindow.textContent = message;
    
}

// Create html for boards
function initializeBoards(){
    document.querySelectorAll('.board').forEach((board) =>{
        for(let i = 0; i < 10; i++){
            for(let j=0; j < 10; j++){
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.coordinates = `${i},${j}`;
                board.appendChild(cell);
            }
        }
    })
}

function renderShips(player, mode){
    const head = '■';
    const body = '■';
    const tail = '■';
    const ships = player.getShips();
    for(let [ship, coords] of ships){
        
        for(let i =0; i < ship.length; i++){
            const [x,y] = coords[i];
            const cell = document.querySelector(`#${player.id} > .cell[data-coordinates="${x},${y}"]`)
            if(mode === "revealed-only" && cell.dataset.status != 'HIT'){
                continue;
            }
            if(ship.isSunk()){
                cell.dataset.health = 'sunk';
            }
            
            if(ship.orientation === "vertical"){
                    if(i === 0){
                        cell.textContent = head;
                    }else if(i === ship.length -1){
                        cell.textContent = tail;
                    }
                    else{
                        cell.textContent = body;
                    }
            } else if(ship.orientation === "horizontal"){
                    if(i === 0){
                        cell.textContent = head;
                    }else if(i === ship.length -1){
                        cell.textContent = tail;
                    }
                    else{
                        cell.textContent = body;
                    }
                }
        }
    }
}

module.exports = {displayBoard, displayMessage, initializeBoards };