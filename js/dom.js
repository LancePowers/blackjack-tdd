

function Table(players){
  this.seats = [
    players[0],
    players[1],
    players[2]
  ];
  this.dealOn = false;
  this.stayOn = false;
  this.hitOn = false;
  this.splitOn = false;
  this.doubleOn = false;
  this.changeOn = false;
}

Table.prototype.alert = function (text,type,name) {
  console.log(name)
  $('#'+name+'-alert').append(this.buildAlert(text,type));
};

Table.prototype.buildAlert = function (text,type) {
  var close =
    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"
  var message = "<span class ='text-center'>"+text+"</span>"
  var alert = "<div id='alert-box' class = 'alert "+type+"'>"+close+message+"</div>"
  return alert;
};

//should show the dealers down card
Table.prototype.showDownCards = function () {
  var cardImage = "<img src = img/"+game.dealerHand().cards[0].image+" class = 'card'/>"
  $('#dealer-hand-1 > .c1').html(cardImage);
};

// it should remove cards
Table.prototype.removeCards = function () {
  $('#dealer-hand-1 * > img').remove();
  $('#players-hands * > img').remove();
  $('#book-alert').html("");
  $('#player-alert').html("");
};

//it should show split cards
Table.prototype.placeSplitHands = function () {
  $(this.findHandContainer(this.seats[game.active]) +' * > img').remove();
  this.placeHand();
  this.seats[game.active].handPosition += 1;
  var card1 = this.renderCard(0,1);
  var card2 = this.renderCard(1,1);
  this.placeCard(card1);
  this.placeCard(card2);
  this.seats[game.active].handPosition -= 1;
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

//it should have a button to double
Table.prototype.toggleDouble = function () {
  if(this.doubleOn){
    $( "#double-btn" ).off();
    this.doubleOn = false;
  } else {
    $( "#double-btn" ).on('click', function(){ game.double();})
    this.doubleOn = true;
  }
};

//it should have a button to change chips
Table.prototype.toggleChange = function () {
  if(this.changeOn){
    $( "#change-btn" ).off();
    this.changeOn = false;
  } else {
    $( "#change-btn" ).on('click', function(){ game.change();})
    this.changeOn = true;
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



//betAmount
//alerts and Double


// it should let you drop chips after the deal.
// it should require you to drag more chips to split.
// it should remove the chips from the box.
// it should show chips above the hand.
// it could change multiple chips into one new one.
// it could let you tip the dealer to cheat
