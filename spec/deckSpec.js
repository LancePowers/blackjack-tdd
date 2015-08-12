var Player = require('../js/player.js');
var Game = require('../js/game.js');
var Hand = require('../js/hand.js');
var Deck = require('../js/deck.js');


var player;
var game;
var hand;
var deck;
var card;

//////////////////////////////////////////
////////////CREATE DECK///////////////////
/////////////////////////////////////////

describe('Deck', function(){
  it('should create a deck', function(){
    deck = new Deck();
    expect(deck.cards).toEqual([]);
    expect(deck.deckImages.length).toEqual(52);
  })
  it('should add cards to the deck',function(){
    deck.createCards();
    expect(deck.cards.length).toEqual(52);
    expect(deck.cards[0].value).toBeGreaterThan(1);
    expect(deck.cards[0].value).toBeLessThan(12);
  })
  it('should remove a card at random', function(){
    expect(deck.cards.length).toEqual(52);
    card = deck.getCard();
    expect(card).not.toBeUndefined();
    expect(card.value).toBeGreaterThan(1);
    expect(card.value).toBeLessThan(12);
    expect(deck.cards.length).toEqual(51);
  })
})

describe('Player',function(){

  beforeEach(function(){
    game = new Game();
    game.deck.createCards();
    game.addPlayer('Lance');
    game.addPlayer('Bythe Book');
    lance = game.players[0];
    book = game.players[1];
  })

  describe('addPlayer',function(){
      it('should add players to the game', function(){
        expect(game.players.length).not.toEqual(0);
      })
  })

  describe('new Player', function(){
    it('should have chips, name, id', function(){
      expect(lance.name).toEqual('Lance');
      expect(lance.chips).toEqual(100);
      expect(lance.currentBet).toEqual(10);
    })
  })

  describe('playerBet', function(){
    it('should allow player to change the bet', function(){
      lance.changeBet(20);
      expect(lance.currentBet).toEqual(20);
    })
  })
});

// // describe('Deal Functions',function(){
//
//   describe('new Hand', function(){
//     it('should create a hand for the player', function(){
//       game.addHand(0,10,0);
//       expect(lance.hands.length).toEqual(1);
//       expect(lance.hands[0].cards[0].value).toEqual(11);
//       expect(lance.hands[0].cards[1].value).toEqual(10);
//     })
//   })
//
//   describe('betOnHand', function(){
//     it('should add chips to the hand bet.', function(){
//       lance.betOnHand();
//       expect(lance.hands[0].bet).toEqual(20);
//       expect(lance.chips).toEqual(80);
//     })
//   })
//
//   describe('Dealer Hand',function(){
//     it('should start a hand for the dealer',function(){
//       game.addHand(11,20);
//       expect(game.dealerHand).not.toBeUndefined();
//       expect(game.dealerHand.cards[0].value).toEqual(11);
//       expect(game.dealerHand.cards[1].value).toEqual(10);
//     })
//   })
//
//   describe('Dealer isBlackJack', function(){
//     it('should check the dealers hand for blackjack',function(){
//       expect(game.dealerHand.isBlackJack()).toEqual(true);
//       game.addHand(10,22);
//       expect(game.dealerHand.isBlackJack()).not.toEqual(true);
//     })
//   })
//   describe('Player isBlackJack', function(){
//     it('should check the players hands for blackJack', function(){
//       game.addHand(11,12,1);
//       expect(lance.hands[0].isBlackJack()).toEqual(true);
//       expect(book.hands[0].isBlackJack()).not.toEqual(true);
//     })
//   })
//   describe('Player Loses', function(){
//     it('should remove the players hand', function(){
//       book.take();
//       expect(book.hands).toEqual([]);
//     })
//   })
//   describe('Player Pushes',function(){
//     it('should return bet to chips and clear hand',function(){
//       lance.tie();
//       expect(lance.chips).toEqual(100);
//       expect(lance.hands).toEqual([]);
//     })
//   })
//   describe('Player Wins blackJack',function(){
//     it('should add 1.5x bet to chips and take hand', function(){
//       lance.win(1.5);
//       expect(lance.chips).toEqual(130);
//       expect(lance.hands).toEqual([]);
//     })
//   })
//
// })

describe('Deal', function(){

  beforeEach(function(){
    game = new Game();
    game.sitDown();
    game.deal();
    lance = game.players[0];
    book = game.players[1];
  })

  it('should create a hand for each player', function(){
    expect(lance.hands.length).toEqual(1);
    expect(book.hands.length).toEqual(1);
  })

  it('should set active player back to 0',function(){
    expect(game.active).toEqual(0);
  })

  it('should create the dealer hand', function(){
      expect(game.dealerHand).not.toBeUndefined();
      expect(game.dealerHand.cards[0]).not.toBeUndefined();
      expect(game.dealerHand.cards[0].value).not.toBeUndefined();
  })
})

describe('Dealer BlackJack', function(){
  beforeEach(function(){
    game = new Game();
    game.sitDown();
    game.deal();
    lance = game.players[0];
    book = game.players[1];
    game.dealerHand.cards[0].value = 11;
    game.dealerHand.cards[1].value = 10;
    lance.hands[0].cards[0].value = 11;
    lance.hands[0].cards[1].value = 10;
    book.hands[0].cards[0].value = 11;
    book.hands[0].cards[0].value = 8;
    game.checkBlackJack();
  })

  it('should clear any hands that aren\'t BlackJack', function(){
    expect(book.hands.length).toEqual(0);
    expect(book.chips).toEqual(90);
  })

  it('should push with any hands that are BlackJack', function(){
    expect(lance.hands.length).toEqual(0);
    expect(lance.chips).toEqual(100);
  })
})

describe('Player BlackJack', function(){

  beforeEach(function(){
    game = new Game();
    game.sitDown();
    game.deal();
    lance = game.players[0];
    book = game.players[1];
    game.dealerHand.cards[0].value = 11;
    game.dealerHand.cards[1].value = 8;
    lance.hands[0].cards[0].value = 11;
    lance.hands[0].cards[1].value = 10;
    book.hands[0].cards[0].value = 11;
    book.hands[0].cards[0].value = 8;
    game.checkBlackJack();
  })

  it('should pay 1.5x bet for blackJack', function(){
    expect(lance.chips).toEqual(115);
    expect(book.chips).toEqual(90);
  })
  it('should clear hands that had blackJack', function(){
    expect(lance.hands.length).toEqual(0);
    expect(book.hands.length).toEqual(1);
  })

})


//  && she should go to the next hand
//dealer should check to see if the hand is a pair
//  if so, player should be able to split
//  && dealer should seperate the cards
//  && dealer should add another card to each
//player should be able to hit
//  if so, game should add card to his hand
//  && game should return the sum of the card values in the hand
//    if player's hand is more than 21
//    game should check for aces
//      if so, game should change ace values from 11 to 1
//   if not. take player's chips
//player should be able to stand
//dealer should check if it's hand is less than 17
//  if so, dealer should set the value a player must beat to the value of her cards
//dealer should add a card to her hand
//dealer should check if her cards total more than 21
//  if so, she should check for a soft hand
//game should check the first hand remaining on the table
//if it is higher than the dealers
//game should give chips
//if not
//game should remove chips
