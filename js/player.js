// var Game = require('../js/game.js');
// var Hand = require('../js/hand.js');
// var Deck = require('../js/deck.js');

function Player(name){
    this.name = name;
    this.chips = 100;
    this.currentBet = 10;
    this.hands = [];
}

Player.prototype.changeBet = function(newBet) {
  this.currentBet = newBet;
};

Player.prototype.betOnHand = function(){
  this.chips -= this.currentBet;
  this.hands[0].bet += this.currentBet;
}

Player.prototype.take = function(){
  this.hands.splice(0,1);
}

Player.prototype.hasHand = function () {
  if (this.hands.length) {return true;} 
};

Player.prototype.win = function(multiplier){
    this.chips += this.hands[0].bet * (1 + multiplier);
    this.take();
}

module.exports = Player;
