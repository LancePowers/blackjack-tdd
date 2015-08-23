// var Game = require('../js/game.js');
// var Hand = require('../js/hand.js');
// var Deck = require('../js/deck.js');

function Player(name){
    this.name = name;
    this.chips = 100;
    this.currentBet = 10;
    this.hands = [];
    this.stayHands = [];
    this.blackJack = false;
    this.betSquare = new BetSquare(name);
}

Player.prototype.addHand = function () {
  var card1 = game.deck.getCard();
  var card2 = game.deck.getCard();
  var hand = new Hand(card1, card2);
  this.hands.push(hand);
};

Player.prototype.showHand = function () {
  this.assignHandPosition()
  if (this.name === 'dealer'){
    this.hands[0].showDealerHand();
  } else {
    for (var i = 0; i < this.hands.length; i++) {
      this.hands[i].show();
    }
  }
};

Player.prototype.assignHandPosition = function () {
  var start = this.stayHands.length;
  for (var i = start; i < (start + this.hands.length); i++) {
    this.hands[i-start].setPosition($('#'+this.name+'-hand-'+(i+1)));
    this.hands[i-start].setPayPosition($('#'+this.name+'-pay-'+(i+1)));
  }
};

Player.prototype.betSquareDroppable = function () {
  this.betSquare.droppable();
};

Player.prototype.take = function(){
  this.hands.splice(0,1);
  this.betSquare.chipsIn();
}

Player.prototype.hasHand = function () {
  if (this.hands.length) {return true;}
};

Player.prototype.win = function(multiplier){
    this.betSquare.chipsOut(1*multiplier);
    this.stayHands.splice(0,1);
}

// module.exports = Player;
