// var Game = require('../js/game.js');
// var Hand = require('../js/hand.js');
// var Deck = require('../js/deck.js');

function Player(name,betId){
    this.name = name;
    this.chips = 100;
    this.currentBet = 10;
    this.hands = [];
    this.stayHands = [];
    this.blackJack = false;
    this.betSquare = new BetSquare(betId);
}

Player.prototype.changeBet = function(newBet) {
  this.currentBet = newBet;
};

Player.prototype.betSquareDroppable = function () {
  this.betSquare.droppable();
};

Player.prototype.betOnHand = function(i){
  this.chips -= this.currentBet;
  this.hands[i].bet += this.currentBet;
}

Player.prototype.take = function(){
  this.hands.splice(0,1);
  this.betSquare.chipsIn();
}

Player.prototype.hasHand = function () {
  if (this.hands.length) {return true;}
};

Player.prototype.win = function(multiplier){
    this.betSquare.chipsOut(1+multiplier);
    this.stayHands.splice(0,1);
}

// module.exports = Player;
