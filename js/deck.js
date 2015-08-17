function Card(value,image){
  this.value = value;
  this.image = image;
}

Card.prototype = new Deck();

function Deck(){
  this.cards = [];
  this.deckImages = [
     "ace_of_Spades.png", "2_of_Spades.png", "3_of_Spades.png", "4_of_Spades.png",
     "5_of_Spades.png", "6_of_Spades.png", "7_of_Spades.png", "8_of_Spades.png",
     "9_of_Spades.png", "10_of_Spades.png", "jack_of_Spades.png", "queen_of_Spades.png",
     "king_of_Spades.png", "ace_of_Hearts.png", "2_of_Hearts.png", "3_of_Hearts.png",
     "4_of_Hearts.png", "5_of_Hearts.png", "6_of_Hearts.png", "7_of_Hearts.png",
     "8_of_Hearts.png", "9_of_Hearts.png", "10_of_Hearts.png", "jack_of_Hearts.png",
     "queen_of_Hearts.png", "king_of_Hearts.png", "ace_of_Diamonds.png", "2_of_Diamonds.png",
     "3_of_Diamonds.png", "4_of_Diamonds.png", "5_of_Diamonds.png", "6_of_Diamonds.png",
     "7_of_Diamonds.png", "8_of_Diamonds.png", "9_of_Diamonds.png", "10_of_Diamonds.png",
     "jack_of_Diamonds.png", "queen_of_Diamonds.png", "king_of_Diamonds.png", "ace_of_Clubs.png",
     "2_of_Clubs.png", "3_of_Clubs.png", "4_of_Clubs.png", "5_of_Clubs.png", "6_of_Clubs.png",
     "7_of_Clubs.png", "8_of_Clubs.png", "9_of_Clubs.png", "10_of_Clubs.png", "jack_of_Clubs.png",
     "queen_of_Clubs.png", "king_of_Clubs.png"
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

// 
// module.exports = Deck;
