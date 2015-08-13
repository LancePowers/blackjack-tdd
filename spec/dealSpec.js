var Player = require('../js/player.js');
var Game = require('../js/game.js');
var Hand = require('../js/hand.js');
var Deck = require('../js/deck.js');


var player;
var game;
var hand;
var deck;
var card;

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

describe('endRound',function(){

  it('should check if there are any hands left', function(){
    expect(game.handsRemaining()).toEqual(true);
  })

  it('should set active player to first player w/ hand', function(){
    game.setActivePlayer();
    expect(game.active).toEqual(1);
  })

  it('should confirm if no hands are remaining', function(){
    book.take();
    expect(game.handsRemaining()).not.toEqual(true);
  })

})
