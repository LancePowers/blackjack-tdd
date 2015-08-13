// var Player = require('../js/player.js');
// var Game = require('../js/game.js');
// var Deck = require('../js/deck.js');

function Hand(card1,card2){
  this.cards = [card1,card2];
  this.bet = 0;
  this.ace = null;
}

Hand.prototype.isBlackJack = function(){
  if((this.cards[0].value + this.cards[1].value) === 21){
    return true;
  }
}

Hand.prototype.hasAce = function() {
  for (var i = 0; i < this.cards.length; i++) {
    if(this.cards[i].value === 11){
      this.ace = i;
      return true;
    }
  }
};

Hand.prototype.changeAce = function() {
  this.cards[this.ace].value = 1;
};

Hand.prototype.total = function() {
  var total = 0;
  for (var i = 0; i < this.cards.length; i++) {
    total += this.cards[i].value;
  }
  return total;
};

Hand.prototype.value = function() {
  while( this.total() > 21 && this.hasAce()){
    this.changeAce();
  };
  return this.total();
};

Hand.prototype.isPair = function(){
  if(this.cards[0].value === this.cards[1].value){
    return true;
  }
}

module.exports = Hand;
