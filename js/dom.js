
function Table(){
  this.seats = [
    {name:'player', handPosition:1},
    {name:'book', handPosition:1},
    {name:'dealer', handPosition:1}
  ];
}

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

//it should show a hand on the table
Table.prototype.placeHand = function (dealer) {
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







//// Some may need to go into Game logic
// it should show hands for 2 players
// it should clear the hand.
// it should have a button to hit
// it should have a button to stay
// it should have a button to split
// it should have a button to deal
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
