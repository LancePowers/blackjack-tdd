
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
  this.name = '#'+name+'-bet';
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
  while(chips > 0){
    if(chips >= 1000){
      $(this.name).append(new Chip('yellow'));
      chips -= 1000;
    } else if(chips >= 100){
      $(this.name).append(new Chip('black'));
      chips -= 100;
    } else if(chips >= 25){
      $(this.name).append(new Chip('green'));
      chips -= 25;
    } else if(chips >= 5){
      $(this.name).append(new Chip('red'));
      chips -= 5;
    }
  }
};

BetSquare.prototype.chipsIn = function () {
  for (var i = 0; i < this.draggables.length; i++) {
    $('#'+this.draggables[i]).remove();
  }
};

BetSquare.prototype.droppable = function () {
  var name = this.name;
  $(this.name).droppable({
    over: function(event,ui){
      if(name === '#player-bet'){
        game.players[0].betSquare.draggables.push(ui.draggable.attr('id'));
      } else {
        game.players[1].betSquare.draggables.push(ui.draggable.attr('id'));
      }
    },
    out: function(event,ui){
      if(name === '#player-bet'){
        game.players[0].betSquare.draggables.splice(ui.draggable.attr('id'));
      } else {
        game.players[0].betSquare.draggables.splice(ui.draggable.attr('id'));
      }
    },
  })
};
