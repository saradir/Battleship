console.log('starting');
import './styles.css';
const {Player} = require('./Player');
const {Gameboard} = require('./Gameboard');
const {Ship} = require('./Ship');
const { displayMessage, initializeBoards, displayBoard} = require('./DOMController');

let playerOne;
let playerTwo;
let currentPlayer;
let otherPlayer;
let isProcessing = false; // flag to prevent click events from firing again before an event is done being handled.

document.querySelectorAll('.board').forEach((board) => board.addEventListener('click', (e)=>{
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
            isProcessing = false;
        }, 1000);
        
    }
    
}))


newGame();
playerOne.board.generateRandom();
playerTwo.board.generateRandom();
displayBoards();

function newGame(){
    playerOne = new Player('one','PlayerOne');
    playerTwo = new Player('two','PlayerTwo');
    currentPlayer = playerOne;
    otherPlayer = playerTwo;
    initializeBoards();
}



function switchPlayers() {
  [currentPlayer, otherPlayer] = [otherPlayer, currentPlayer];
  displayMessage(`${currentPlayer.name} it is now your turn!`);
  displayBoards();
}


function displayBoards(){
    displayBoard(currentPlayer, "all");
    displayBoard(otherPlayer, "revealed-only");
}