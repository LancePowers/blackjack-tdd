$(document).on('ready', function(e){
  //var playerCount = prompt('How many players do we have?')
  blackJack.alertResults();
});

$('#change-bet').on('click', function(){this.player[0].defaultBet = prompt("What would you like to change your bet to?");});
$(".deal").on("click", function(event){ blackJack.deal(); });

//Turns player controls on or off
Game.prototype.buttons = function(toggle){//WORKING
  if(toggle === true){
    $("#hit").on("click", function(event){ blackJack.players[blackJack.activePlayer].hit();});
    $("#stay").on("click", function(event){ blackJack.players[blackJack.activePlayer].stay(); });
    $("#double").on("click", function(event){ blackJack.players[blackJack.activePlayer]; });
    $("#split").on("click", function(event){ player.hand = new Hand('split'); });
  } else {
    $("#hit").off();
    $("#stay").off();
    $("#double").off();
    $("#split").off();
  }
}

Player.prototype.updateCards = function(){
  this.spot.html('');
  for (var i = 0; i < this.hands[0].cards.length; i++) {
    this.spot.append(this.hands[0].cards[i].image);
  }
}
Game.prototype.alertResults = function(results){
  var alertType;
  var alertText;
  switch (results) {
    case 'win':
      alertType = 'btn-success';
      alertText = 'You Win!'
      break;
    case 'lose':
      alertType = 'btn-danger';
      alertText = 'You Lose!';
      break;
    case 'playerBJ':
      alertType = 'btn-success';
      alertText = 'You got BlackJack!';
      break;
    case 'dealerBJ':
      alertType = 'btn-danger';
      alertText = 'Dealer got BlackJack';
      break;
    case 'dealerBust':
      alertType = 'btn-success';
      alertText = 'Dealer Bust!';
      break;
    case 'playerBust':
      alertType = 'btn-danger';
      alertText = 'You Busted.';
      break;
    case 'push':
      alertType = 'btn-warning';
      alertText = 'Push';
      break;
    default:
      alertType = 'btn-primary';
      alertText = 'Welcome to the Table! Click here to get started.';

  }
  $('#results > button').toggleClass('hidden');
  $('#results').addClass(alertType);
  $('#results').text(alertText);
  blackJack.buttons();
  $('#results').on('click', function(){blackJack.clearResults(alertType);})
}
Game.prototype.clearResults = function(alertType){
  $('#results').removeClass(alertType);
  $('#results').text("");
}
Player.prototype.updateBets = function(){
  $('#chips').html('$'+ this.stack);
  $('#bet-amount').html('$'+ this.currentBet);
}
