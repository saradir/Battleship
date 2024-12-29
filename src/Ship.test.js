const {Ship} = require('./Ship');
const {Gameboard} = require('./Gameboard');
const { computerPlayer } = require('./computerPlayer');
test('is hit', () =>{
  const ship = new Ship(5);
  ship.hit();
    expect(ship.isSunk()).toBe(false);
});


test('is sunk', () =>{
  const ship = new Ship(5);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
})


describe('testing set()', () => {
  let board;
  let ship;
  beforeEach(() => {
     board = new Gameboard();
     ship = new Ship(5);
     ship.orientation = 'horizontal';
  });
  
  test('legal position', () =>{
    console.log(board.board);
    expect(() => 
      board.set(ship, [0,0])).not.toThrow();

  });

  test('illegal coordinates', () =>{
    expect(() =>
      board.set(ship,[7,3])).toThrow();
  });

  test('occupied cells', () =>{
    board.set(ship, [0, 1]);
    expect(() =>
      board.set(ship,[3,1])).toThrow();
  });
});


describe('testing receiveAttack', () =>{
  const board = new Gameboard();
  const ship = new Ship(2);
  board.set(ship, [0, 0]);

  test('a hit', ()=>{
    expect(
      board.receiveAttack([0,0]).status).toBe('hit');
  });

  test('a miss', ()=>{
    expect(
      board.receiveAttack([0,2]).status)
      .toBe('miss');
  });

  test('illegal move: cell already hit', ()=>{
    const result = board.receiveAttack([0,2]);
    expect(result.reason).toBe('Cell has already been targeted');
  });

  test('game over when all ships are sunk', () =>{
    expect(board.isOver()).toBe(false);
    board.receiveAttack([1,0]);
    expect(board.isOver()).toBe(true);
  });

});

describe('test testPlayer', () =>{
  let player, testBoard;
  const omniship = new Ship(5);
  beforeEach(() => {
    testPlayer = new computerPlayer();
    testBoard = new Gameboard();
    // Fill the test board with ships
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        testBoard.board[i][j] = omniship;
      }
    }
  });
      
  test('computer player generates a valid move', () =>{

    for(let i = 0; i < 100;i++){
      const move = testPlayer.getMove();
      const result = testBoard.receiveAttack(move);
      testPlayer.updateResult(move, result);

      expect(result.status).not.toBe('error');
    }
  });

  test('computer player can follow up on a hit', ()=>{
    testPlayer.updateResult([5,5], 'hit');
    const possibleMoves = ([5,4],[5,6],[6,5],[4,5]);
    const move = testPlayer.getMove();
    expect(possibleMoves).toContain(move);
  });

  test('computer player avoids out-of-bounds moves', () => {
    testPlayer.updateResult([0, 0], 'hit');
    const move = testPlayer.getMove();
    const possibleMoves = [[0, 1], [1, 0]];
    expect(possibleMoves).toContainEqual(move);
  });

  test('computer can deduce orientation of ship', ()=>{
    testPlayer.updateResult([5,5], 'hit');
    testPlayer.updateResult([6,5], 'hit');
    const move = testPlayer.getMove();
    const horizontalMoves = [[4,5],[7,5]];
    expect(horizontalMoves.toContain(move));
  })


});