// var Player = require('../js/player.js');
// var Game = require('../js/game.js');
// var Deck = require('../js/deck.js');

function Hand(card1,card2){
  this.cards = [card1,card2];
  this.bet = 0;
  this.ace = null;
  this.position = null;
  this.payPosition = null;
  this.dealerDown = null;
  this.firstDeal = true;
}

Hand.prototype.setPosition = function (position) {
  this.position = (position)[0];
};

Hand.prototype.setPayPosition = function (position) {
  this.payPosition = (position)[0];
};

Hand.prototype.show = function (dealer) {
  if(dealer === 'first'){
    this.showDealerHand();
  } else {
    for (var i = 0; i < this.cards.length; i++) {
      $(this.position.children[i]).html('').append(this.render(this.cards[i]));
    }
  }
};

Hand.prototype.showDealerHand = function () {
  this.position = $('#dealer-hand-1')[0];
  if (this.firstDeal) {
    this.dealerDown = this.cards[0].image;
    this.cards[0].image = 'card_back.png'
    this.firstDeal = false;
  } else {
    this.cards[0].image = this.dealerDown;
  }
  this.show();
};

Hand.prototype.render= function (card) {
  return "<img src = img/"+card.image+" class = 'card'/>"
};

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

// module.exports = Hand;
