console.log('starting');
import './styles.css';
const {Player} = require('./Player');
const {Gameboard} = require('./Gameboard');
const {Ship} = require('./Ship');
const {renderShips, initializeBoards, displayBoard} = require('./DOMController');

console.log('starting');
let playerOne;
let playerTwo;
newGame();
playerOne.board.generateRandom();
console.log(playerOne.getBoard());
renderShips(playerOne);



function newGame(){
    playerOne = new Player('one','PlayerOne');
    playerTwo = new Player('two','PlayerTwo');
    initializeBoards();
}