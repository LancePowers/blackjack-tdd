//hand holds information on where it should be shown?


var game = new Game();


function Game(){
  this.deck = new Deck();
  this.players = [];
  // this.dealerHand();                        //****function this.dealerHand()(return this.players[players.lenght -1]);
  this.active = 0;
  this.table = new Table(this.players);
  this.dealerBust = false;                //**** stay thes same for now?
  this.book = new Book();
}

Game.prototype.sitDown = function(){
  //prompt('what\'s your name?');
  this.addPlayer('player');
  this.addPlayer('book');
  this.addPlayer('dealer');
  this.table.toggleDeal();
  this.table.toggleHit();
  this.table.toggleStay();
  this.table.toggleSplit();
  this.table.toggleDouble();
}

Game.prototype.addPlayer = function(name,betPosition){
  var player = new Player(name,betPosition);
  player.betSquareDroppable();
  for (var i = 0; i < 5; i++) {
    $(betPosition).append(new Chip('red'));
  }
  this.players.push(player);
}

Game.prototype.deal = function() {
  this.clearHands();
  this.shuffle();
  for (var i = 0; i < this.players.length; i++) {
    this.addHand();
    this.players[i].showHand();
    this.nextPlayer();
  }
  this.checkBlackJack();
};

Game.prototype.dealerHand = function(){
  return this.players[this.players.length-1].hands[0];
}

Game.prototype.activeHands = function() {
    return this.players[this.active].hands;
};

Game.prototype.activeCards = function (i) {
    return this.activeHands()[i].cards;
};

Game.prototype.activePlayer = function(){
  return this.players[this.active];
}

Game.prototype.shuffle = function(){
  if(this.deck.cards.length < 10){
    this.deck.createCards()
  };
}

Game.prototype.addHand = function () {     //**** removed dealer paramater
  var card1 = this.deck.getCard();
  var card2 = this.deck.getCard();
  var hand = new Hand(card1, card2);
//   if(dealer === undefined){                      //**** what does this do?
    this.activeHands().push(hand);
//   } else { this.dealerHand() = hand; }              //**** unnecessary
};

Game.prototype.checkBlackJack = function () {
  if(this.dealerHand().isBlackJack()){              //**** player
    this.dealerBlackJack();                       //**** should be good.
  } else {
    this.playerBlackJack();
  }
};

Game.prototype.dealerBlackJack = function () {
  this.table.showDownCards();
  this.table.alert('Dealer BlackJack','alert-danger');
  for (var i = 0; i < this.players.length-1; i++) {
    if(this.players[i].hands[0].isBlackJack()){
      this.deactivateHand();
      this.players[i].win(0);
    } else {
      this.players[i].take();
    }
    this.nextPlayer();
  }
};

Game.prototype.playerBlackJack = function () {
  for (var i = 0; i < this.players.length-1; i++) {
    if(this.players[i].hands[0].isBlackJack()){
      this.players[i].blackJack = true;
      this.table.alert('BlackJack!','alert-success');
    }
  }
};

Game.prototype.split = function () {
  this.addSecondHand(this.activePlayer());
  this.activeHands()[0].cards.push(this.deck.getCard());
  this.this.activePlayer().showHand;
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
  this.activePlayer().showHand();
  if(this.activeHands()[0].value() > 21){
    this.bust();
  }
};

Game.prototype.double = function () {
  this.hit();
  this.stay();
};

Game.prototype.stay = function () {
  this.deactivateHand();
  this.endRound();
};

Game.prototype.deactivateHand = function () {
  var hand = this.activeHands().splice(0,1);
  this.activePlayer().stayHands.push(hand[0]);
  this.activePlayer().handPosition += 1;
};

Game.prototype.bust = function(){
  if(this.active === this.players.length){
    this.dealerBust = true;
    this.table.alert('Dealer Bust!','alert-success');
    this.endRound();
  } else {
    this.activePlayer().take();
    this.table.alert('Bust','alert-danger');
    this.endRound();
  }
}

Game.prototype.endRound = function () {      //**** need this
  if(this.handsRemaining()){
    this.setActivePlayer();
  } else {
    this.nextPlayer();
    this.dealerTurn();
  }
};

Game.prototype.setActivePlayer = function(){
  for (var i = 0; i < this.players.length - 1; i++) {
    if(this.players[i].hasHand()){
      this.active = i;
      if(this.players[i].blackJack){
        this.stay();
      }
      break;
    }
  }
}

Game.prototype.handsRemaining = function () {
  for (var i = 0; i < this.players.length-1; i++) {
    if(this.players[i].hasHand()){return true;}
  }
};

Game.prototype.dealerTurn = function () {          //****
  this.players[this.players.length - 1].showHand();
  // this.activateDealer();
  while(this.dealerHand().value() < 17){
    this.hit();
  }
  this.payout();
};

Game.prototype.payout = function () {
  for (var i = 0; i < this.players.length - 1; i++) {
    this.processHands(this.players[i]);
  }
};

Game.prototype.processHands = function (player) {
  for (var i = 0; i < player.stayHands.length; i++){
    if(player.blackJack){               //****
      player.win(1.5);
    } else if(this.dealerBust){         //****
      player.win(1);
      this.table.alert('Dealer Bust!','alert-success');
    } else if(this.playerWins(player)){
      player.win(1);
      this.table.alert(player.name + 'Win!','alert-success');
    }else if (this.playerTies(player)) {
      this.table.alert('Push','alert-warning');
    } else {this.table.alert('Dealer Win','alert-danger');}
  }
};

Game.prototype.clearHands = function () {
  this.table.removeCards();
  this.active = 0;
  this.dealerBust = false;
  for (var i = 0; i < this.players.length; i++) {
    this.players[i].stayHands = [];
    this.players[i].hands = [];
  }
};
Game.prototype.playerWins = function (player) {
  if(player.stayHands[0].value() > this.dealerHand().value()){    //****
    return true;
  }
};

Game.prototype.playerTies = function (player) {
  if(player.stayHands[0].value() === this.dealerHand().value()){     //****
    return true;
  }
};

Game.prototype.nextPlayer = function(){
  if(this.active === this.players.length-1){
    this.active = 0;
  } else {
    this.active += 1;
  }
}

game.sitDown();

// this.deactivateDealer();                  //****   not needed
// this.addHand('D');                        //****   need to know what's special about this. - nothing
// this.dealerHand().show('first');            //****   set the show function in player

// Game.prototype.activateDealer = function () {          //**** this should stay
//   // this.activeHands = function(){return [this.dealerHand()];}
//   this.dealerBust = false;
//   this.bust = function(){
//     this.dealerBust = true;
//   }
//   // this.active = 2;
// };

// Game.prototype.deactivateDealer = function () {            //**** would
//   this.bust = function(){
//     this.activePlayer().take();
//     this.endRound();
//   }
//   // this.activeHands = function() {
//   //     return this.players[this.active].hands;
//   // };
//   this.active = 0;
// };

// module.exports = Game;
