function Book(){
  this.bookValue;
  this.showing;
  this.soft;
  this.pair;
}

Book.prototype.play = function () {
  var decision = this.decide();
  if(decision === 'h'){
    game.hit();
    this.play();
  }else if(decision === 's'){
    game.stay();
    console.log('s stay')
  }else if(decision === 'p'){
    game.split();
    this.play();
  }else {
    console.log('double play')
    this.doublePlay(decision);
  }
};

Book.prototype.doublePlay = function (decision) {
  if(game.activeHands()[0].length === 2){
    game.double();
  } else if( decision === 'dh'){
    game.hit();
    this.play();
  } else {
    game.stay();
  }
};

///////This needs to go!
Book.prototype.decide = function () {
  this.updateValues();
  return this.getPlay();
};

Book.prototype.getPlay = function () {
  this.updateValues();
  var index = this.showing - 2;
  return this.getPlaySheet()[index];
};

Book.prototype.updateValues = function () {
  this.bookValue = game.activeHands()[0].value();
  this.showing = game.dealerHand().cards[1].value;
  this.soft = game.activeHands()[0].hasAce();
  this.pair = game.activeHands()[0].isPair();
};

Book.prototype.getPlaySheet = function () {
  if(this.soft){ return this.softPlay(); }
  if(this.pair){ return this.splitPlay(); }
  else{ return this.hardPlay(); }
};

Book.prototype.hardPlay = function(){
  var index = this.bookValue - 4;
  var strategy = [
    ['h','h','h','h','h','h','h','h','h','h'],
    ['h','h','h','h','h','h','h','h','h','h'],
    ['h','h','h','h','h','h','h','h','h','h'],
    ['h','h','h','h','h','h','h','h','h','h'],
    ['h','h','h','h','h','h','h','h','h','h'],
    ['h','dh','dh','dh','dh','h','h','h','h','h'],
    ['dh','dh','dh','dh','dh','dh','dh','dh','h','dh'],
    ['dh','dh','dh','dh','dh','dh','dh','dh','dh','h'],
    ['h','h','s','s','s','h','h','h','h','h'],
    ['s','s','s','s','s','h','h','h','h','h'],
    ['s','s','s','s','s','h','h','h','h','h'],
    ['s','s','s','s','s','h','h','h','h','h'],
    ['s','s','s','s','s','h','h','h','h','h'],
    ['s','s','s','s','s','s','s','s','s','s'],
    ['s','s','s','s','s','s','s','s','s','s'],
    ['s','s','s','s','s','s','s','s','s','s'],
    ['s','s','s','s','s','s','s','s','s','s'],
    ['s','s','s','s','s','s','s','s','s','s'],
  ];
  return strategy[index];
}

Book.prototype.softPlay = function () {
  var index = this.bookValue - 13;
  var strategy = [
    ['h','h','h','dh','dh','h','h','h','h','h'],
    ['h','h','h','dh','dh','h','h','h','h','h'],
    ['h','h','dh','dh','dh','h','h','h','h','h'],
    ['h','h','dh','dh','dh','h','h','h','h','h'],
    ['h','dh','dh','dh','dh','h','h','h','h','h'],
    ['h','ds','ds','ds','ds','s','s','h','h','h'],
    ['s','s','s','s','s','s','s','s','s','s'],
    ['s','s','s','s','s','s','s','s','s','s'],
    ['s','s','s','s','s','s','s','s','s','s']
  ];
  return strategy[index];
}

Book.prototype.splitPlay = function () {
  var index = this.bookValue/2 - 2;
  var strategy = [
    ['p','p','p','p','p','p','h','h','h','h'],
    ['p','p','p','p','p','p','h','h','h','h'],
    ['h','h','h','p','p','h','h','h','h','h'],
    ['dh','dh','dh','dh','dh','dh','dh','dh','h','dh'],
    ['p','p','p','p','p','h','h','h','h','h'],
    ['p','p','p','p','p','p','h','h','h','h'],
    ['p','p','p','p','p','p','p','p','p','p'],
    ['p','p','p','p','p','s','p','p','s','s'],
    ['s','s','s','s','s','s','s','s','s','s'],
    ['p','p','p','p','p','p','p','p','p','p']
  ];
  return strategy[index];
};
