var Player = require('../js/player.js');
var Game = require('../js/game.js');
var Hand = require('../js/hand.js');
var Deck = require('../js/deck.js');


var player;
var game;
var hand;
var deck;
var lance;
var book;

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
//
// describe('Deal', function(){
//
//   describe('Init Hands', function() {
//
//     it('should create a hand for each player', function(){
//       console.log(lance.hands)
//       expect(lance.hands.length).toEqual(1);
//       expect(book.hands.length).toEqual(1);
//     })
//
//     it('should set active player back to 0',function(){
//       expect(game.active).toEqual(0);
//     })
//
//     it('should create the dealer hand', function(){
//       expect(game.dealerHand).not.toBeUndefined();
//       expect(game.dealerHand.cards[0]).not.toBeUndefined();
//       expect(game.dealerHand.cards[0].value).not.toBeUndefined();
//     })
//
//   });
//
//   describe('Dealer BlackJack', function(){
//     beforeEach(function(){
//       game.dealerHand.cards[0].value = 11;
//       game.dealerHand.cards[1].value = 10;
//       lance.hands[0].cards[0].value = 11;
//       lance.hands[0].cards[1].value = 10;
//       book.hands[0].cards[0].value = 11;
//       book.hands[0].cards[0].value = 8;
//       // game.checkBlackJack();
//     })
//
//     it('should clear any hands that aren\'t BlackJack', function(){
//       expect(book.hands.length).toEqual(0);
//       expect(book.chips).toEqual(90);
//     })
//
//     it('should push with any hands that are BlackJack', function(){
//       expect(lance.hands.length).toEqual(0);
//       expect(lance.chips).toEqual(100);
//     })
//   })
//
//   describe('Player BlackJack', function(){
//
//     beforeEach(function(){
//       game.dealerHand.cards[0].value = 11;
//       game.dealerHand.cards[1].value = 8;
//       lance.hands[0].cards[0].value = 11;
//       lance.hands[0].cards[1].value = 10;
//       book.hands[0].cards[0].value = 11;
//       book.hands[0].cards[0].value = 8;
//       game.checkBlackJack();
//     })
//
//     it('should pay 1.5x bet for blackJack', function(){
//       expect(lance.chips).toEqual(115);
//       expect(book.chips).toEqual(90);
//     })
//
//     it('should clear hands that had blackJack', function(){
//       expect(lance.hands.length).toEqual(0);
//       expect(book.hands.length).toEqual(1);
//     })
//   })
//
//   describe('endRound',function(){
//
//     it('should check if there are any hands left', function(){
//       expect(game.handsRemaining()).toEqual(true);
//     })
//
//     it('should set active player to first player w/ hand', function(){
//       game.setActivePlayer();
//       expect(game.active).toEqual(1);
//     })
//
//     it('should confirm if no hands are remaining', function(){
//       book.take();
//       expect(game.handsRemaining()).not.toEqual(true);
//     })
//
//   })
// })
