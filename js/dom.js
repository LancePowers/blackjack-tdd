
function Table(){
  this.seats = [
    {name:'player', handPosition:1},
    {name:'book', handPosition:1},
    {name:'dealer', handPosition:1}
  ];
  this.dealOn = false;
  this.stayOn = false;
  this.hitOn = false;
  this.splitOn = false;
}

//it should show a players hand -green
Table.prototype.placeHand = function () {
    this.placeCard(this.renderCard());
    this.placeCard(this.renderCard());
};

//it should show the dealers hand -green
Table.prototype.placeDealerHand = function () {
  var cardBack = "<img src = img/card_back.png class = 'card'/>"
  var cardImage = "<img src = img/"+game.dealerHand.cards[1].image+" class = 'card'/>"
  $('#dealer-hand-1 > .c1').append(cardBack);
  $('#dealer-hand-1 > .c2').append(cardImage);
};

// it should have a button to deal -green
Table.prototype.toggleDeal = function () {
  if(this.dealOn){
    $( "#deal-btn" ).off();
    this.dealOn = false;
  } else {
    this.dealOn = true;
    $( "#deal-btn" ).on('click', function(){ game.deal();})
  }
};

// it should have a button to hit -green
Table.prototype.toggleHit = function () {
  if(this.hitOn){
    $( "#hit-btn" ).off();
    this.hitOn = false;
  } else {
    $( "#hit-btn" ).on('click', function(){ game.hit();})
    this.hitOn = true;
  }
};

// it should have a button to split -green
Table.prototype.toggleSplit = function () {
  if(this.splitOn){
    $( "#split-btn" ).off();
    this.splitOn = false;
  } else {
    $( "#split-btn" ).on('click', function(){ game.split();})
    this.splitOn = true;
  }
};

// it should have a button to stay -green
Table.prototype.toggleStay = function () {
  if(this.stayOn){
    $( "#stay-btn" ).off();
    this.stayOn = false;
  } else {
    $( "#stay-btn" ).on('click', function(){ game.stay();})
    this.stayOn = true;
  }
};

//should find the current hand container
Table.prototype.findHandContainer = function (seat) {
  return '#'+ seat.name + '-hand-'+ seat.handPosition;
};

//it should find the container to place the card in.
Table.prototype.findCardContainer = function (spot) {
  return $(this.findHandContainer(this.seats[game.active]) + ' > .c'+ spot)
};

//it should find which card to place
Table.prototype.findCard = function () {
  var current = this.seats[game.active];
  return $("#"+current.name+"-hand-"+current.handPosition+" * > img").length;
};

//it should make the card an element
Table.prototype.renderCard = function () {
  var image = game.activeCards()[this.findCard()].image;
  return "<img src = img/"+image+" class = 'card'/>"
};

// it should show a card on the table
Table.prototype.placeCard = function (card) {
  this.findCardContainer(this.findCard()+1).append(card);
};

//should show the dealers down card
Table.prototype.showDownCards = function () {
  var cardImage = "<img src = img/"+game.dealerHand.cards[0].image+" class = 'card'/>"
  $('#dealer-hand-1 > .c1').html(cardImage);
};

// it should remove cards
Table.prototype.removeCards = function () {
  $('#dealer-hand-1 * > img').remove();
  $('#players-hands * > img').remove();
};

//it should show split cards
Table.prototype.placeSplitHands = function () {
  $(this.findHandContainer() +' * > img').remove();
  this.placeHand();
};

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
