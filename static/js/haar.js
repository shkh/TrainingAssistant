var coords = new Array();
//var imgsrc = "static/img/0.jpg";
var canvas;
var context;

onload = function(){
  draw();
  $('#reset').click(function(){
    resetstatus();
  });
  $('#next').live('click', function(){
    nextajax();
  });
};

function draw(){
  var image = new Image();
  image.src = imgsrc;
  image.onload = function(){
    var wrapper = $('#canvas-wrapper');
    $(wrapper).empty();
    var c = $('<canvas/>').attr('id', 'cnvs');
    $(wrapper).append(c);
    canvas = $('#cnvs').get(0);
    context = canvas.getContext('2d');
    $('#cnvs').css({'width': image.naturalWidth + 'px', 'height': image.naturalHeight + 'px'}).attr({'width': image.naturalWidth + 'px', 'height': image.naturalHeight + 'px'});
    context.drawImage(image, 0, 0);
    $(function(){
      $('#cnvs').Jcrop({
        onSelect: selected, 
      });
    });
  }
}

function selected(c){
  coords.push([c.x, c.y, c.w, c.h]);
  context.beginPath();
  context.lineWidth = 3;
  context.strokeStyle = 'rgba(192, 80, 77, 0.4)';
  context.strokeRect(c.x, c.y, c.w, c.h);
  console.log(coords);
}

function resetstatus(){
  coords = new Array();
  draw();
}

function nextajax(){
  coords = JSON.stringify(coords);
  $.ajax({
    type: 'GET', 
    dataType: "json",
    data: {'coords': coords}, 
    url: "/_next",
    success: function (data) {
      imgsrc = data.imgsrc;
      flag = data.flag;
      if (flag==false){
        $('#canvas-wrapper').empty().append('<h2>お疲れ様でした。</h2>');
        $('#buttons').empty();
      } else{
        resetstatus();
      }
    }
  });
}
