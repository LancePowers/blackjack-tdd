
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
