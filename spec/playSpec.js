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


describe('split', function(){
  beforeEach(function(){
    game = new Game();
    game.sitDown();
    game.deal();
    lance = game.players[0];
    book = game.players[1];
    lance.hands[0].cards[0].value = 8;
    lance.hands[0].cards[1].value = 8;
  })
  it('should determine if a player has a pair', function(){
    expect(lance.hands[0].isPair()).toEqual(true);
    if (book.hands[0].cards[0].value === book.hands[0].cards[1].value) {
      expect(book.hands[0].isPair()).toBe(true);
    } else {
      expect(book.hands[0].isPair()).not.toBe(true);
    }
  })

  // if book gets pair something happens, else something else happens

  it('should split cards into two hands', function(){
    game.split();
    expect(lance.hands.length).toEqual(2);
    expect(lance.hands[0].cards[0].value).toEqual(8);
    expect(lance.hands[1].cards[0].value).toEqual(8);
    expect(lance.hands[0].cards[1].image).not.toEqual(
      lance.hands[1].cards[0].image
    )
    expect(lance.hands[0].bet).toEqual(10);
    expect(lance.hands[1].bet).toEqual(10);
  })
})

describe('hit', function(){
  beforeEach(function(){
    game = new Game();
    game.sitDown();
    game.deal();
    lance = game.players[0];
    book = game.players[1];
    lance.hands[0].cards[0].value = 2;
    lance.hands[0].cards[1].value = 8;
    book.hands[0].cards[0].value = 10;
    book.hands[0].cards[1].value = 10;
  })

  it('should calculate the value of the hand',function(){
    expect(lance.hands[0].value()).toEqual(10);
    expect(book.hands[0].value()).toEqual(20)
  })

  it('should add a card to a hand', function(){
    expect(lance.hands[0].cards.length).toEqual(2);
    game.hit();
    expect(lance.hands[0].cards.length).toEqual(3);
  })

  it('should check if a hand has an ace', function(){
    expect(lance.hands[0].hasAce()).not.toEqual(true);
    game.hit();
    lance.hands[0].cards[2].value = 11;
    expect(lance.hands[0].hasAce()).toEqual(true);
  })

  it('should change an ace to a value of 1', function(){
    game.hit();
    lance.hands[0].cards[2].value = 11;
    expect(lance.hands[0].value()).toEqual(21);
    lance.hands[0].hasAce();
    lance.hands[0].changeAce();
    expect(lance.hands[0].value()).toEqual(11);
  })

  it('should determine if a player hand > 21', function(){
    game.hit();
    lance.hands[0].cards[2].value = 11;
    game.hit();
    expect(lance.hands[0].value()).toBeLessThan(22);
    game.active = 1;
    game.hit();
    // Not needed with Bust Function
    // expect(book.hands[0].value()).toBeGreaterThan(21);
  })

  it('should take a players hand if they bust', function(){
    game.active = 1;
    book.hands[0].cards[0].value = 10;
    book.hands[0].cards[1].value = 10;
    game.hit();
    if(book.hands[0]) {
      expect(book.hands[0].value()).toEqual(21);
    } else {
      expect(book.hands.length).toEqual(0);
    }
    expect(lance.hands.length).toEqual(1);
  })

  it('should move to the players next hand', function(){
    lance.hands[0].cards[0].value = 11;
    lance.hands[0].cards[1].value = 11;
    game.split();
    lance.hands[0].cards[0].value = 10;
    lance.hands[0].cards[1].value = 10;
    expect(game.active).toEqual(0);
    expect(lance.hands[0].value()).toBeLessThan(21);
  })

  it('should move to the next player', function(){
    lance.hands[0].cards[0].value = 10;
    lance.hands[0].cards[1].value = 10;
    game.hit();
    if(lance.hands[0]) {
      expect(lance.hands[0].value()).toEqual(21);
      expect(game.active).toEqual(0);
    } else {
      expect(lance.hands.length).toEqual(0);
      expect(game.active).toEqual(1);
    }
  })
})


describe('stand',function(){

  beforeEach(function(){
    game = new Game();
    game.sitDown();
    game.deal();
    lance = game.players[0];
    book = game.players[1];
  })

  it('should remove hand and store for later',function(){
    game.stay();
    expect(lance.hands.length).toEqual(0);
    expect(lance.stayHands.length).toEqual(1);
  })

  it('should go to the next hand',function(){
    expect(lance.hands.length).toEqual(1);
    game.split();
    game.stay();
    expect(game.active).toEqual(0);
    game.stay();
    expect(game.active).toEqual(1);
  })

})


describe('double', function(){

  it('should double the bet', function(){
    game = new Game();
    game.sitDown();
    game.deal();
    lance = game.players[0];
    game.double();
    expect(lance.stayHands[0].bet).toEqual(20);
  })
})

//////////////// restored incomplete verison of dealer turn/////////

// describe('dealer turn', function(){
//
//   beforeEach(function(){
//     game = new Game();
//     game.sitDown();
//     game.deal();
//     lance = game.players[0];
//     book = game.players[0];
//   })
//
//   it('should start when there are no active hands',function(){
//     game.dealerHand.cards[0].value = 10;
//     game.dealerHand.cards[1].value = 10;
//     game.stay();
//     game.stay();
//     expect(game.activeHands()[0]).toEqual(game.dealerHand);
//   })
//
//   it('should check if the dealers hand is < 17',function(){
//
//   })
//
//   it('should add a card to the hand',function(){
//
//   })
//
//   it('should check if the hand is greater than 21', function(){
//
//   })
//
//   it('should bust', function(){
//
//   })
//
//   it('should determine if a player wins',function(){
//
//   })
//
//   it('should determine if a player loses', function(){
//
//   })
//
// })

///////////////////////current version of dealer turn///////////

describe('dealer turn', function(){

  beforeEach(function(){
      game = new Game();
      game.sitDown();
      game.deal();
      lance = game.players[0];
      book = game.players[0];
    })

  it('should start when there are no active hands',function(){
    game.dealerHand.cards[0].value = 10;
    game.dealerHand.cards[1].value = 10;
    game.stay();
    game.stay();
    expect(game.activeHands()[0]).toEqual(game.dealerHand);
  })

  it('should add a card to a hand under 17',function(){
    game.dealerHand.cards[0].value = 7;
    game.dealerHand.cards[1].value = 9;
    game.stay();
    game.stay();
    expect(game.dealerHand.value()).toBeGreaterThan(16);
  })

  it('should bust', function(){
    game.dealerHand.cards[0].value = 10;
    game.dealerHand.cards[1].value = 6;
    game.stay();
    game.stay();

    if(game.dealerHand.value() === 0){
      expect(lance.chips).toEqual(110);
      expect(book.chips).toEqual(110);
    }
  })

  it('should determine if a player wins',function(){
    game.dealerHand.cards[0].value = 10;
    game.dealerHand.cards[1].value = 8;
    lance.hands[0].cards[0].value = 10;
    lance.hands[0].cards[1].value = 10;
    game.stay();
    game.stay();
    expect(lance.chips).toEqual(110);
  })

  it('should determine if a player loses', function(){
    game.dealerHand.cards[0].value = 10;
    game.dealerHand.cards[1].value = 8;
    book.hands[0].cards[0].value = 7;
    book.hands[0].cards[1].value = 10;
    game.stay();
    game.stay();
    expect(book.chips).toEqual(90);
  })

})
// })


















//dealer should check if it's hand is less than 17
//dealer should add a card to her hand
//dealer should check if her cards total more than 21
//  if so, she should check for a soft hand
//game should check the first hand remaining on the table
//if it is higher than the dealers
//game should give chips
//if not
//game should remove chips

// take out all if statements.
// think of actual real-life objects


//
//
//
//
//
//
//
// var Player = require('../js/player.js');
// var Game = require('../js/game.js');
// var Hand = require('../js/hand.js');
// var Deck = require('../js/deck.js');
//
//
// var player;
// var game;
// var hand;
// var deck;
// var card;
//
// //////////////////////////////////////////
// ////////////CREATE DECK///////////////////
// /////////////////////////////////////////
//
// describe('Deck', function(){
//   it('should create a deck', function(){
//     deck = new Deck();
//     expect(deck.cards).toEqual([]);
//     expect(deck.deckImages.length).toEqual(52);
//   })
//   it('should add cards to the deck',function(){
//     deck.createCards();
//     expect(deck.cards.length).toEqual(52);
//     expect(deck.cards[0].value).toBeGreaterThan(1);
//     expect(deck.cards[0].value).toBeLessThan(12);
//   })
//   it('should remove a card at random', function(){
//     expect(deck.cards.length).toEqual(52);
//     card = deck.getCard();
//     expect(card).not.toBeUndefined();
//     expect(card.value).toBeGreaterThan(1);
//     expect(card.value).toBeLessThan(12);
//     expect(deck.cards.length).toEqual(51);
//   })
// })
// describe('Game', function(){
//
//   beforeEach(function(){
//     game = new Game();
//     game.sitDown();
//     game.deal();
//     lance = game.players[0];
//     book = game.players[1];
//   })
//
//   describe('Player',function(){
//
//     it('should add players to the game', function(){
//       expect(game.players.length).not.toEqual(0);
//     })
//
//     it('should have chips, name, id', function(){
//       expect(lance.name).toEqual('Lance');
//       expect(lance.chips).toEqual(100);
//       expect(lance.currentBet).toEqual(10);
//     })
//
//     it('should allow player to change the bet', function(){
//       lance.changeBet(20);
//       expect(lance.currentBet).toEqual(20);
//     })
//   })
//
//
//   describe('split', function(){
//
//     beforeEach(function(){
//       lance.hands[0].cards[0].value = 8;
//       lance.hands[0].cards[1].value = 8;
//     })
//
//     it('should determine if a player has a pair', function(){
//       expect(lance.hands[0].isPair()).toEqual(true);
//       expect(book.hands[0].isPair()).not.toEqual(true);
//     })
//
//     it('should split cards into two hands', function(){
//       game.split();
//       expect(lance.hands.length).toEqual(2);
//       expect(lance.hands[0].cards[0].value).toEqual(8);
//       expect(lance.hands[1].cards[0].value).toEqual(8);
//       expect(lance.hands[0].cards[1].image).not.toEqual(
//         lance.hands[1].cards[0].image
//       )
//       expect(lance.hands[0].bet).toEqual(10);
//       expect(lance.hands[1].bet).toEqual(10);
//     })
//   })
//
//   describe('hit', function(){
//
//     beforeEach(function(){
//       lance.hands[0].cards[0].value = 2;
//       lance.hands[0].cards[1].value = 8;
//       book.hands[0].cards[0].value = 10;
//       book.hands[0].cards[1].value = 10;
//     })
//
//     it('should calculate the value of the hand',function(){
//       expect(lance.hands[0].value()).toEqual(10);
//       expect(book.hands[0].value()).toEqual(20)
//     })
//
//     it('should add a card to a hand', function(){
//       expect(lance.hands[0].cards.length).toEqual(2);
//       game.hit();
//       expect(lance.hands[0].cards.length).toEqual(3);
//     })
//
//     it('should check if a hand has an ace', function(){
//       expect(lance.hands[0].hasAce()).not.toEqual(true);
//       game.hit();
//       lance.hands[0].cards[2].value = 11;
//       expect(lance.hands[0].hasAce()).toEqual(true);
//     })
//
//     it('should change an ace to a value of 1', function(){
//       game.hit();
//       lance.hands[0].cards[2].value = 11;
//       expect(lance.hands[0].value()).toEqual(21);
//       lance.hands[0].hasAce();
//       lance.hands[0].changeAce();
//       expect(lance.hands[0].value()).toEqual(11);
//     })
//
//     it('should take a players hand if they bust', function(){
//       game.active = 1;
//       book.hands[0].cards[0].value = 10;
//       book.hands[0].cards[1].value = 10;
//       game.hit();
//       expect(book.hands.length).toEqual(0);
//       expect(lance.hands.length).toEqual(1);
//     })
//
//     it('should move to the players next hand', function(){
//       lance.hands[0].cards[0].value = 11;
//       lance.hands[0].cards[1].value = 11;
//       game.split();
//       lance.hands[0].cards[0].value = 10;
//       lance.hands[0].cards[1].value = 10;
//       expect(game.active).toEqual(0);
//       expect(lance.hands[0].value()).toBeLessThan(21);
//     })
//
//     it('should move to the next player', function(){
//       lance.hands[0].cards[0].value = 10;
//       lance.hands[0].cards[1].value = 10;
//       game.hit();
//       expect(game.active).toEqual(1);
//     })
//   })
//
//
//   describe('stand',function(){
//
//     it('should remove hand and store for later',function(){
//       game.stay();
//       expect(lance.hands.length).toEqual(0);
//       expect(lance.stayHands.length).toEqual(1);
//     })
//
//     it('should go to the next hand',function(){
//       expect(lance.hands.length).toEqual(1);
//       game.split();
//       game.stay();
//       expect(game.active).toEqual(0);
//       game.stay();
//       expect(game.active).toEqual(1);
//     })
//
//   })
//
//   describe('double', function(){
//
//     it('should double the bet', function(){
//       game.double();
//       expect(lance.stayHands[0].bet).toEqual(20);
//     })
//
//   })
//

// // take out all if statements.
// // think of actual real-life objects
