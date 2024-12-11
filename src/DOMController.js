const { Ship } = require("./Ship");


function displayBoard(player, mode = "ship-revealed"){
    const newBoard = document.querySelector(`#${player.id}`);
    const board = player.getBoard();
    if(mode === "ship-revealed"){
        renderShips(player);
    }
    
    for(let i = 0; i < 10; i++){
        for(let j=0; j < 10; j++){
            const cell = document.querySelector(`#${player.id} > .cell[data-coordinates="${i},${j}"]`);
            if(board[i][j] === player.board.HIT_MARKER){
                console.log('hit');
                cell.dataset.status = 'HIT';
            }else if(board[i][j] === player.board.MISS_MARKER){
                cell.toggleAttribute = 'MISSED';
                cell.textContent = 'X';
            }
        }
    }
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

function renderShips(player){
    const head = '■';
    const body = '■';
    const tail = '■';
    const ships = player.getShips();
    for(let [ship, coords] of ships){
        
        for(let i =0; i < ship.length; i++){
            const [x,y] = coords[i];
            const cell = document.querySelector(`#${player.id} > .cell[data-coordinates="${x},${y}"]`)
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

module.exports = {displayBoard, renderShips, initializeBoards };