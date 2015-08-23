
function Chip(color){
  this.chipCount = $('.chip').length;
  if(color === 'red'){
    this.image = "<img src ='img/red-chip.png' value=5 id="+this.chipCount+" class = 'chip'/>";
  } else if (color === 'green') {
    this.image = "<img src ='img/green-chip.png' value=25 id="+this.chipCount+" class = 'chip'/>";
  } else if (color === 'black') {
    this.image = "<img src ='img/black-chip.png' value= 100 id="+this.chipCount+" class = 'chip'/>";
  } else {
    this.image = "<img src ='img/yellow-chip.png' value = 1000 id="+this.chipCount+" class = 'chip'/>";
  }
  $('#player-chips').append($(this.image));
  $('#'+this.chipCount).draggable();
}

function BetSquare(name){
  this.name = name;
  this.draggables = [];
}
BetSquare.prototype.betAmount = function () {
 var amount = 0;
 for (var i = 0; i < this.draggables.length; i++) {
   amount += parseInt($('#'+this.draggables[i]).attr('value'));
 }
 return amount;
};

BetSquare.prototype.chipsOut = function (multiplier) {
  var chips = this.betAmount()* (1 + multiplier);
  var payPosition = '#'+this.name+'-pay-1';
  while(chips > 0){
    if(chips >= 1000){
      $(payPosition).append(new Chip('yellow'));
      chips -= 1000;
    } else if(chips >= 100){
      $(payPosition).append(new Chip('black'));
      chips -= 100;
    } else if(chips >= 25){
      $(payPosition).append(new Chip('green'));
      chips -= 25;
    } else if(chips >= 5){
      $(payPosition).append(new Chip('red'));
      chips -= 5;
    }
  }
};

BetSquare.prototype.chipsIn = function () {
  for (var i = 0; i < this.draggables.length; i++) {
    $('#'+this.draggables[i]).remove();
  }
};
/* sets the bet squares to droppable On drop chips are added to array
on out chips are removed from array*/
BetSquare.prototype.droppable = function () {
  var squareName = '#'+this.name+'-bet';
  $(squareName).droppable({
    over: function(event,ui){
      if(squareName === '#player-bet'){
        game.players[0].betSquare.draggables.push(ui.draggable.attr('id'));
      } else {
        game.players[1].betSquare.draggables.push(ui.draggable.attr('id'));
      }
    },
    out: function(event,ui){
      if(squareName === '#player-bet'){
        game.players[0].betSquare.draggables.splice(ui.draggable.attr('id'));
      } else {
        game.players[0].betSquare.draggables.splice(ui.draggable.attr('id'));
      }
    },
  })
};
