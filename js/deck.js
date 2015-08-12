function Card(value,image){
  this.value = value;
  this.image = image;
}

Card.prototype = new Deck();

function Deck(){
  this.cards = [];
  this.deckImages = [
     "ace_of_Spades.svg", "2_of_Spades.svg", "3_of_Spades.svg", "4_of_Spades.svg",
     "5_of_Spades.svg", "6_of_Spades.svg", "7_of_Spades.svg", "8_of_Spades.svg",
     "9_of_Spades.svg", "10_of_Spades.svg", "jack_of_Spades.svg", "queen_of_Spades.svg",
     "king_of_Spades.svg", "ace_of_Hearts.svg", "2_of_Hearts.svg", "3_of_Hearts.svg",
     "4_of_Hearts.svg", "5_of_Hearts.svg", "6_of_Hearts.svg", "7_of_Hearts.svg",
     "8_of_Hearts.svg", "9_of_Hearts.svg", "10_of_Hearts.svg", "jack_of_Hearts.svg",
     "queen_of_Hearts.svg", "king_of_Hearts.svg", "ace_of_Diamonds.svg", "2_of_Diamonds.svg",
     "3_of_Diamonds.svg", "4_of_Diamonds.svg", "5_of_Diamonds.svg", "6_of_Diamonds.svg",
     "7_of_Diamonds.svg", "8_of_Diamonds.svg", "9_of_Diamonds.svg", "10_of_Diamonds.svg",
     "jack_of_Diamonds.svg", "queen_of_Diamonds.svg", "king_of_Diamonds.svg", "ace_of_Clubs.svg",
     "2_of_Clubs.svg", "3_of_Clubs.svg", "4_of_Clubs.svg", "5_of_Clubs.svg", "6_of_Clubs.svg",
     "7_of_Clubs.svg", "8_of_Clubs.svg", "9_of_Clubs.svg", "10_of_Clubs.svg", "jack_of_Clubs.svg",
     "queen_of_Clubs.svg", "king_of_Clubs.svg"
   ];
   this.deckValues = [
     11,2,3,4,5,6,7,8,9,10,10,10,10,
     11,2,3,4,5,6,7,8,9,10,10,10,10,
     11,2,3,4,5,6,7,8,9,10,10,10,10,
     11,2,3,4,5,6,7,8,9,10,10,10,10
   ];
}

Deck.prototype.createCards = function(){
  this.cards = [];
  for (var i = 0; i < 52; i++) {
    var value = this.deckValues[i];
    var image = this.deckImages[i];
    var card = new Card(value,image);
    this.cards.push(card);
  }
}

Deck.prototype.getCard = function(){
  var position = Math.floor(Math.random()*this.cards.length);
  var card = this.cards.splice(position,1);
  return card[0];
}


module.exports = Deck;
