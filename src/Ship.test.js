const shipClass = require('./Ship');
const {Gameboard} = require('./Gameboard');
test('is hit', () =>{
  const ship = new shipClass.Ship(5);
  ship.hit();
    expect(ship.isSunk()).toBe(false);
});


test('is sunk', () =>{
  const ship = new shipClass.Ship(5);
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
     ship = new shipClass.Ship(5);
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
  const ship = new shipClass.Ship(2);
  board.set(ship, [0, 0]);

  test('a hit', ()=>{
    expect(
      board.receiveAttack([0,0]))
      .toBe(true);
  });

  test('a miss', ()=>{
    expect(
      board.receiveAttack([0,2]))
      .toBe(false);
  });

  test('illegal move: cell already hit', ()=>{
    expect(() => 
      board.receiveAttack([0,2])).toThrow('Cell has already been targeted');
  });

  test('game over when all ships are sunk', () =>{
    expect(board.isOver()).toBe(false);
    board.receiveAttack([1,0]);
    expect(board.isOver()).toBe(true);
  });

});

/*describe('testing generateRandom()', ()=>{
  const board = new Gameboard();
  board.generateRandom();
  
  
})*/