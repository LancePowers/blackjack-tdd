
function Table(){
  this.seats = [
    {name:'player', handPosition:1},
    {name:'book', handPosition:1},
    {name:'dealer', handPosition:1}
  ];
}

//it should show a players hand
Table.prototype.placeHand = function () {
    this.placeCard();
    this.placeCard();
};

//it should show the dealers hand
Table.prototype.placeDealerHand = function () {
  var dealerSpot = $('#dealer-hand * > img').length + 1;
  var cardBack = "<img src = img/card_back.png class = 'card'/>"
  $('#dealer-hand > .D'+ dealerSpot).append(cardBack);
  $('#dealer-hand > .D'+ dealerSpot).append(this.renderCard());
};

// it should have a button to deal
Table.prototype.toggleDeal = function () {
  $( "#deal-btn" ).on()){
    $( "#deal-btn" ).off();
  } else {
    $( "#deal-btn" ).on('click', function(){ game.deal();})
  }
};

// it should have a button to hit
Table.prototype.toggleHit = function () {
  $( "#hit-btn" ).on()){
    $( "#hit-btn" ).off();
  } else {
    $( "#hit-btn" ).on('click', function(){ game.hit();})
  }
};

// it should have a button to split
Table.prototype.toggleSplit = function () {
  $( "#split-btn" ).on()){
    $( "#split-btn" ).off();
  } else {
    $( "#split-btn" ).on('click', function(){ game.split();})
  }
};

// it should have a button to stay
Table.prototype.toggleStay = function () {
  $( "#stay-btn" ).on()){
    $( "#stay-btn" ).off();
  } else {
    $( "#stay-btn" ).on('click', function(){ game.stay();})
  }
};

//should find the current hand position
Table.prototype.findCardContainer = function () {
  var seat = this.seats[game.active].name;
  var position = this.seats[game.active].position;
  var spot = this.cardSpot()+1;
  return $('#'+ seat + '-hand-'+ position + ' > .c'+ spot)
};

//it should find which spot to put the card
Table.prototype.cardSpot = function (dealer) {
  var current = this.seats[game.active];
  return $("#"+current.name+"-hand-"+current.handPosition+" * > img").length;
};

//it should make the card an element
Table.prototype.renderCard = function () {
  var image = game.activeCards()[this.cardSpot()].image;
  return "<img src = img/"+image+" class = 'card'/>"
};

// it should show a card on the table
Table.prototype.placeCard = function () {
  var card = this.renderCard();
  this.findCardContainer().append(card);
};








//// Some may need to go into Game logic
// it should show hands for 2 players
// it should clear the hand.
// it should have a button to double
// it should have a button to change chips
// it should show chips for the players
// it should let you drag the chips
// it should let you drop chips on the square to bet.
// it should let you drop chips after the deal.
// it should require you to drag more chips to split.
// it should remove the chips from the box.
// it should show chips above the hand.
// it could change multiple chips into one new one.
// it could let you tip the dealer to cheat
