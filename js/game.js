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

Game.prototype.addPlayer = function(name){
  var player = new Player(name);
  this.players.push(player);
}

Game.prototype.deal = function() {
  this.shuffle();
  this.addHand('D');
  for (var i = 0; i < this.players.length; i++) {
    this.addHand();
    this.players[i].betOnHand(0);
    this.nextPlayer();
  }
  // this.checkBlackJack();
  // this.endRound();
};

Game.prototype.activeHands = function() {
  return this.players[this.active].hands;
};

Game.prototype.activePlayer = function(){
  return this.players[this.active];
}

Game.prototype.shuffle = function(){
  if(this.deck.cards.length < 10){
    this.deck.createCards()
  };
}

Game.prototype.addHand = function (dealer) {
  var card1 = this.deck.getCard();
  var card2 = this.deck.getCard();
  var hand = new Hand(card1, card2);
  if(dealer === undefined){
    this.activeHands().push(hand);
  } else { this.dealerHand = hand; }
};

Game.prototype.checkBlackJack = function () {
  if(this.dealerHand.isBlackJack()){
    this.dealerBlackJack();
  } else {
    this.playerBlackJack();
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

Game.prototype.playerBlackJack = function () {
  for (var i = 0; i < this.players.length; i++) {
    if(this.players[i].hands[0].isBlackJack()){
      this.players[i].win(1.5);
    }
  }
};

Game.prototype.split = function () {
  this.addSecondHand(this.activePlayer());
  this.activeHands()[0].cards.push(this.deck.getCard());
  this.activePlayer().betOnHand(1);
};

Game.prototype.addSecondHand = function(player){
  var split1 = player.hands[0].cards.splice(1,1);
  var splitHand = new Hand(split1[0], this.deck.getCard())
  player.hands.push(splitHand);
}

Game.prototype.hit = function () {
  this.activeHands()[0].cards.push(
    this.deck.getCard()
  )
  if(this.activeHands()[0].value() > 21){
    this.bust();
  }
};

Game.prototype.stay = function () {
  var hand = this.activeHands().splice(0,1);
  this.activePlayer().stayHands.push(hand[0]);
  this.endRound();
};

Game.prototype.bust = function(){
  this.activePlayer().take();
  this.endRound();
}

Game.prototype.endRound = function () {
  if(this.handsRemaining()){
    this.setActivePlayer();
  } else {

  }
};

Game.prototype.setActivePlayer = function(){
  for (var i = 0; i < this.players.length; i++) {
    if(this.players[i].hasHand()){this.active = i}
  }
}

Game.prototype.handsRemaining = function () {
  for (var i = 0; i < this.players.length; i++) {
    if(this.players[i].hasHand()){return true;}
  }
};

Game.prototype.nextPlayer = function(){
  if(this.active === this.players.length -1){
    this.active = 0;
  } else {
    this.active += 1;
  }
}

module.exports = Game;
