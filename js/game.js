var Player = require('../js/player.js');
var Hand = require('../js/hand.js');
var Deck = require('../js/deck.js');


function Game(){
  this.deck = new Deck();
  this.players = [];
  this.dealerHand;
  this.active = 0;
}

Game.prototype.sitDown = function(){
  //prompt('what\'s your name?');
  this.addPlayer('Lance');
  this.addPlayer('Bythe Book');
}

Game.prototype.deal = function() {
  this.shuffle();
  this.addHand('D');
  for (var i = 0; i < this.players.length; i++) {
    this.addHand();
    this.players[i].betOnHand();
    this.nextPlayer();
  }
  // this.checkBlackJack();
};

Game.prototype.shuffle = function(){
  if(this.deck.cards.length < 10){
    this.deck.createCards()
  };
}

Game.prototype.checkBlackJack = function () {
  if(this.dealerHand.isBlackJack()){
    this.dealerBlackJack();
  } else {
    for (var i = 0; i < this.players.length; i++) {
      if(this.players[i].hands[0].isBlackJack()){
        this.players[i].win(1.5);
      }
    }
  }
};

Game.prototype.dealerBlackJack = function () {
  for (var i = 0; i < this.players.length; i++) {
    if(this.players[i].hands[0].isBlackJack()){
      this.players[i].win(0);
    } else {
      this.players[i].take();
    }
  }
};

Game.prototype.addPlayer = function(name){
  var player = new Player(name);
  this.players.push(player);
}

Game.prototype.addHand = function (dealer) {
  var card1 = this.deck.getCard();
  var card2 = this.deck.getCard();
  var hand = new Hand(card1, card2);
  if(dealer === undefined){this.players[this.active].hands.push(hand);}
  else {this.dealerHand = hand;}
};

Game.prototype.nextPlayer = function(){
  if(this.active === this.players.length -1){
    this.active = 0;
  } else {
    this.active += 1;
  }
}

module.exports = Game;
