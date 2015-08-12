// var Player = require('../js/player.js');
// var Game = require('../js/game.js');
// var Deck = require('../js/deck.js');

function Hand(card1,card2){
  this.cards = [card1,card2];
  this.bet = 0;
}

Hand.prototype.isBlackJack = function(){
  if((this.cards[0].value + this.cards[1].value) === 21){
    return true;
  }
}

Hand.prototype.isPair = function(){
  if(this.cards[0].value === this.cards[1].value){
    return true;
  }
}

module.exports = Hand;
