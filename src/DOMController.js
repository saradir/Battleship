const { Ship } = require("./Ship");


function displayBoard(player, mode = "all"){
    const boardContainer = document.querySelector(`#game-screen .board#${player.id}`);
    boardContainer.innerHTML = '';
    const board = player.board;
    
    renderGrid(board, boardContainer);
    renderShips(player, mode, 'game-screen');
}

function displayMessage(message){
    const messageWindow = document.querySelector('#message-box');
    messageWindow.textContent = message;
    
}



function renderShips(player, mode, screen){
    const head = '■';
    const body = '■';
    const tail = '■';
    const ships = player.getShips();
    const container = document.querySelector(`#${screen}`);
    for(let [ship, coords] of ships){
        
        for(let i =0; i < ship.length; i++){
            const [x,y] = coords[i];
            const cell = container.querySelector(`#${player.id} > .cell[data-coordinates="${x},${y}"]`)
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

// renders a game grid given an array representation of the board and a html container
function renderGrid(board, container){
    for(let i = 0; i < 10; i++){
        for(let j=0; j < 10; j++){
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.coordinates = `${i},${j}`;
            container.appendChild(cell);
            
            if(board.board[i][j] === board.HIT_MARKER){
                cell.dataset.status = 'HIT';
            }else if(board.board[i][j] === board.MISS_MARKER){
                cell.toggleAttribute = 'MISSED';
                cell.textContent = 'X';
            }
        }
    }
}

function renderPlacementScreen(player){
    const screen = document.querySelector('#placement-screen');
    const title = document.querySelector('#placementTitle');
    title.textContent = `${player.name}, set your ships in position!`;
    const boardContainer = document.querySelector('#placement-screen > .board');
    boardContainer.innerHTML = '';
    boardContainer.id = player.id;
    
    screen.appendChild(boardContainer);


    renderGrid(player.board, boardContainer);
    renderShips(player, 'all', 'placement-screen');
}
// blacks out screen when players change
function showBlackout(message){
    const blackout = document.querySelector('#blackout-overlay');
    blackout.querySelector('#blackout-message').textContent = message;
    blackout.classList.remove('hidden');

    blackout.addEventListener('click', hideBlackout, { once: true });
}

function hideBlackout(){
    const blackout = document.querySelector('#blackout-overlay');
    blackout.classList.add('hidden');
}


module.exports = {renderPlacementScreen, displayBoard, displayMessage, showBlackout };