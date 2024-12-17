console.log('starting');
import './styles.css';
const {Player} = require('./Player');
const {Gameboard} = require('./Gameboard');
const {Ship} = require('./Ship');
const { displayMessage, initializeBoards, displayBoard, renderPlacementScreen, showBlackout} = require('./DOMController');

let gameMode = 1; // 1 for single player, 2 for 2-player
let playerOne;
let playerTwo;
let currentPlayer;
let otherPlayer;
let isProcessing = false; // flag to prevent click events from firing again before an event is done being handled.

document.querySelectorAll('.board-container > .board').forEach((board) => board.addEventListener('click', (e)=>{
    if(isProcessing) return;
    isProcessing = true;
    if(e.target.classList.contains('cell')){
        if(e.currentTarget.id === `${currentPlayer.id}`){
            displayMessage('Aim at them!');
            isProcessing = false;
            return;
        }
        const [x,y] = e.target.dataset.coordinates.split(',')
        try {
            const hit =otherPlayer.board.receiveAttack([x,y]);
            if(hit){
                displayMessage('hit');

            }else{
                displayMessage('Missed!');
            }
        } catch (error) {
            displayMessage(error);
            isProcessing = false;
            return;
        }
        displayBoards();

        // check for win condition
        if(otherPlayer.board.isOver()){
            displayMessage(`Game is over! ${currentPlayer} won.`);
            alert('Shall we play again?');
            newGame();
        }
        setTimeout(() =>{
            switchPlayers();
            displayBoards();
            isProcessing = false;
        }, 1000);
        
    }
    
}))


newGame();
playerOne.board.generateRandom();
playerTwo.board.generateRandom();


function newGame(){
    playerOne = new Player('one','PlayerOne');
    playerTwo = new Player('two','PlayerTwo');
    currentPlayer = playerOne;
    otherPlayer = playerTwo;
   // initializeBoards();
}



function switchPlayers() {
  [currentPlayer, otherPlayer] = [otherPlayer, currentPlayer];
  showBlackout(`${otherPlayer.name} finished his turn, it is now ${currentPlayer.name}'s turn! \n (CLICK anywhere to continue)`);
  displayMessage(`${currentPlayer.name} it is now your turn!`);
}


function displayBoards(){
    displayBoard(currentPlayer, "all");
    displayBoard(otherPlayer, "revealed-only");
}

function toggleScreen(screen){
    document.querySelectorAll('.screen').forEach((screen) => screen.style.display = 'none');
    document.querySelector(`#${screen}`).style.display = 'flex';
}

function launchWelcomeScreen(){


    // show/hide second-player's name input when game mode is selected
    document.querySelector('#game-mode').addEventListener('click', () =>{
        gameMode = document.querySelector('input[name="mode"]:checked').value;
        if(gameMode === '1'){
            document.querySelector('#secondPlayerName').style.display = 'none';
        }else{
            document.querySelector('#secondPlayerName').style.display = 'flex';
        }
    });

    // handle submit
    document.querySelector('#gameOptionsForm').addEventListener('submit', (e) =>{
        e.preventDefault();
        gameMode = document.querySelector('input[name="mode"]:checked').value;
        playerOne.name = e.target.elements["playerOneName"].value;
        playerTwo.name = e.target.elements["playerTwoName"].value;
        launchPlacementScreen();
    })
}

function launchPlacementScreen(){
    toggleScreen('placement-screen');
    renderPlacementScreen(playerOne);

    document.querySelector('button#confirm').addEventListener('click', (e) =>{
        if(gameMode === '2' && currentPlayer === playerOne){
            currentPlayer = playerTwo;
            renderPlacementScreen(playerTwo);
        }else{
            currentPlayer = playerOne;
            launchGameScreen();
        }
    });

    document.querySelector('button#rearrange').addEventListener('click', (e) =>{
        currentPlayer.board.generateRandom();
        renderPlacementScreen(currentPlayer);
    });
}

function launchGameScreen(){
    toggleScreen('game-screen');
    displayBoards();
    document.querySelector('.player-name#one').textContent = playerOne.name;
    document.querySelector('.player-name#two').textContent = playerTwo.name;
}

launchWelcomeScreen();