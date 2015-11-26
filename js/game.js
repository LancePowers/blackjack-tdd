//hand holds information on where it should be shown?


var game = new Game();


function Game() {
    this.deck = new Deck();
    this.players = [];
    this.active = 0;
    this.table = new Table(this.players);
    this.dealerBust = false;
    this.book = new Book();
    this.chips = 0;
}

Game.prototype.sitDown = function () {
    //prompt('what\'s your name?');
    this.addPlayer('player');
    this.addPlayer('book');
    this.addPlayer('dealer');
    this.table.toggleDeal();
    this.table.toggleHit();
    this.table.toggleStay();
    this.table.toggleSplit();
    this.table.toggleDouble();
    this.table.toggleBook();
}


///Getters using to simplify functions
Game.prototype.dealerHand = function () {
    return this.players[this.players.length - 1].hands[0];
}

Game.prototype.activeHands = function () {
    return this.players[this.active].hands;
};

Game.prototype.activeCards = function (i) {
    return this.activeHands()[i].cards;
};

Game.prototype.activePlayer = function () {
    return this.players[this.active];
}

Game.prototype.addPlayer = function (name) {
    var player = new Player(name);
    player.betSquareDroppable();
    for (var i = 0; i < 10; i++) {
        $('#' + name + '-chips').append(new Chip('red', '#' + name + '-chips'));
    }
    this.players.push(player);
}

/* adds another deck of cards to the game deck whenever
the number of cards are less that a determined amount */
Game.prototype.shuffle = function () {
    if (this.deck.cards.length < 10) {
        this.deck.createCards()
    };
}

/*
clearHands removes the card image - sets the active player to 0
- resets dealer bust to false - sets both play and stay hands
for loop to add and render hand object - starts checkBlackJack
*/
Game.prototype.deal = function () {
    this.clearHands();
    this.shuffle();
    for (var i = 0; i < this.players.length; i++) {
        this.players[i].addHand();
        this.players[i].showHand();
    }
    this.checkBlackJack();
};

//Detemines if and who got blackjack
Game.prototype.checkBlackJack = function () {
    if (this.dealerHand().isBlackJack()) { //**** player
        this.dealerBlackJack(); //**** should be good.
    } else {
        this.playerBlackJack();
    }
};

/*
 Shows the dealers down card
 alerts dealer got blackjack
 loops through each player hand and takes or ties.
*/
Game.prototype.dealerBlackJack = function () {
    this.players[this.players.length - 1].showHand();
    for (var i = 0; i < this.players.length - 1; i++) {
        if (this.players[i].hands[0].isBlackJack()) {
            this.deactivateHand();
            this.players[i].win(0);
            this.table.alert('Push', 'alert-warning', this.players[i].name);
        } else {
            this.table.alert('Dealer BlackJack!', 'alert-danger', this.players[i].name);
            this.players[i].take();
        }
    }
};


//
Game.prototype.playerBlackJack = function () {
    for (var i = 0; i < this.players.length - 1; i++) {
        if (this.players[i].hands[0].isBlackJack()) {
            this.players[i].blackJack = true;
            var hand = this.players[i].hands.splice(0, 1);
            this.players[i].stayHands.push(hand[0]);
            this.table.alert('BlackJack!', 'alert-success', this.players[i].name);
        }
    }
};

Game.prototype.split = function () {
    this.addSecondHand(this.activePlayer());
    this.activeHands()[0].cards.push(this.deck.getCard());
    this.activePlayer().showHand();
};

Game.prototype.addSecondHand = function (player) {
    var split1 = player.hands[0].cards.splice(1, 1);
    var splitHand = new Hand(split1[0], this.deck.getCard())
    player.hands.push(splitHand);
}

Game.prototype.hit = function () {
    this.activeHands()[0].cards.push(
        this.deck.getCard()
    )
    this.activePlayer().showHand();
    if (this.activeHands()[0].value() > 21) {
        this.bust();
    }
};

Game.prototype.double = function () {
    this.hit();
    this.stay();
};

Game.prototype.stay = function () {
    this.deactivateHand();
    this.endRound();
};

Game.prototype.deactivateHand = function () {
    var hand = this.activeHands().splice(0, 1);
    this.activePlayer().stayHands.push(hand[0]);
    this.activePlayer().handPosition += 1;
};

Game.prototype.bust = function () {
    if (this.active == 2) {
        this.dealerBust = true;
    } else {
        this.activePlayer().take();
        this.table.alert('Bust', 'alert-danger', this.activePlayer().name);
        this.endRound();
    }
}

Game.prototype.endRound = function () { //stay bust blackJack
    if (this.activePlayer().hands.length === 0) {
        this.active += 1;
    }
    if (this.active === 2) {
        this.dealerTurn();
    } else if (this.active === 1) {
        this.book.play();
    }
};

Game.prototype.dealerTurn = function () {
    this.players[this.players.length - 1].showHand();
    while (this.dealerHand().value() < 17) {
        this.hit();
    }
    this.payout();
};

Game.prototype.processHands = function (player) {
    for (var i = 0; i < player.stayHands.length; i++) {
        if (player.blackJack) { //****
            player.win(1.5);
        } else if (this.dealerBust) { //****
            player.win(1);
            this.table.alert('Dealer Bust!', 'alert-success', player.name);
        } else if (this.playerWins(player)) {
            player.win(1);
            this.table.alert(player.name + 'Win!', 'alert-success', player.name);
        } else if (this.playerTies(player)) {
            this.table.alert('Push', 'alert-warning', player.name);
        } else {
            this.table.alert('Dealer Win', 'alert-danger', player.name);
            player.take();
        }
    }
};

Game.prototype.payout = function () {
    for (var i = 0; i < this.players.length - 1; i++) {
        this.processHands(this.players[i]);
    }
};

Game.prototype.playerWins = function (player) {
    if (player.stayHands[0].value() > this.dealerHand().value()) { //****
        return true;
    }
};

Game.prototype.playerTies = function (player) {
    if (player.stayHands[0].value() === this.dealerHand().value()) { //****
        return true;
    }
};

Game.prototype.clearHands = function () {
    this.table.removeCards();
    this.active = 0;
    this.dealerBust = false;
    for (var i = 0; i < this.players.length; i++) {
        this.players[i].stayHands = [];
        this.players[i].hands = [];
    }
};
game.sitDown();