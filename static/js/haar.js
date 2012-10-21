var coords = new Array();
var curcrd;
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
    var wid = image.naturalWidth;
    var hei = image.naturalHeight;
    $('.main-wrapper').css({'width': wid, 'minWidth': wid});
    var wrapper = $('#canvas-wrapper');
    $(wrapper).empty();
    var c = $('<canvas/>').attr('id', 'cnvs');
    $(wrapper).append(c);
    canvas = $('#cnvs').get(0);
    context = canvas.getContext('2d');
    $('#cnvs').css({'width': wid + 'px', 'height': hei + 'px'}).attr({'width': wid + 'px', 'height': hei + 'px'});
    context.drawImage(image, 0, 0);
    $(function(){
      $('#cnvs').Jcrop({
        onSelect: selected, 
        //onChange: changed, 
        onRelease: released, 
      });
    });
  }
}

function selected(c){
  curcrd = [c.x, c.y, c.w, c.h];
}

//function changed(c){
  //curcrd[0] += c.x;
  //curcrd[1] += c.y;
  //curcrd[2] += c.w;
  //curcrd[3] += c.h;
//}

function released(c){
  coords.push(curcrd);
  //curcrd = []
  //coords.push([c.x, c.y, c.w, c.h]);
  context.beginPath();
  context.lineWidth = 3;
  context.strokeStyle = '#b22222';
  context.strokeRect(curcrd[0], curcrd[1], curcrd[2], curcrd[3]);
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
      var count = data.count;
      var flag = data.flag;
      console.log(count*100/imgnum);
      $('.bar').css({'width': count*100/imgnum + '%'});

      if (flag==false){
        $('#canvas-wrapper').empty().append('<div class="messages"><div class="message">' + imgnum + ' Images were</div><div class="message">Successfuly Processed!</div><div class="message">Bye!</div></div>');
        $('.btn').addClass('disabled');
      } else{
        resetstatus();
      }
    }
  });
}
