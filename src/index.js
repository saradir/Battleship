console.log('starting');
import './styles.css';
const {Player} = require('./Player');
const {Gameboard} = require('./Gameboard');
const {Ship} = require('./Ship');
const { initializeBoards, displayBoard} = require('./DOMController');

let playerOne;
let playerTwo;
let currentPlayer;
let otherPlayer;


document.querySelectorAll('.board').forEach((board) => board.addEventListener('click', (e)=>{
    
    if(e.target.classList.contains('cell')){
        console.log('it is a cell alright');
        if(e.currentTarget.id === `${currentPlayer.id}`){
            console.log('Aim at them!');
            return;
        }
        const [x,y] = e.target.dataset.coordinates.split(',')
        otherPlayer.board.receiveAttack([x,y]);
        displayBoards();
        switchPlayers();
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
}


function displayBoards(){
    displayBoard(currentPlayer, "ship-revealed");
    displayBoard(otherPlayer, "hidden");
}