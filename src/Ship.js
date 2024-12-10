class Ship{
  constructor(length, orientation = 'horizontal') {
    this.length = length;
    this.strikes = 0;
    this.orientation = orientation; // either 'horizontal' or 'vertical'
  }

  hit(){
    this.strikes += 1;
  }

  isSunk(){
    return this.strikes >= this.length;
  }
}

module.exports = {Ship, }