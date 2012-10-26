var coords = new Array();
var curcrd;
var canvas;
var context;

onload = function(){
  draw();
  $('#reset').click(function(){
    resetstatus();
  });
  $('#skip').click(function(){
    nextajax(skip=1);
  })
  $('#next').live('click', function(){
    nextajax(skip=0);
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

function released(c){
  coords.push(curcrd);
  context.beginPath();
  context.lineWidth = 3;
  context.strokeStyle = '#b22222';
  context.strokeRect(curcrd[0], curcrd[1], curcrd[2], curcrd[3]);
  //console.log(coords);
}

function resetstatus(){
  coords = new Array();
  draw();
}

function nextajax(skip){
  console.log('座標:'+coords);
  coords = JSON.stringify(coords);
  $.ajax({
    type: 'GET', 
    dataType: "json",
    data: {'coords': coords, 'skip': skip}, 
    url: "/_next",
    success: function (data) {
      imgsrc = data.imgsrc;
      var count = data.count;
      var flag = data.flag;
      //console.log(count*100/imgnum);
      $('.bar').css({'width': count*100/imgnum + '%'});

      if (flag==false){
        w = $('.head-wrapper').width()
        $('.main-wrapper').css({'width': w, 'minWidth': w});
        $('#canvas-wrapper').empty().append('<div class="messages"><div class="message">' + imgnum + ' Images were</div><div class="message">Successfuly Processed!</div><div class="message">Bye!</div></div>');
        $('.btn').addClass('disabled');
      } else{
        var tmp = (count + 1).toString();
        while(tmp.length < imgnum.toString.length){
          tmp = '0' + tmmp;
        }
        $('.count').html( tmp + ' of ' + imgnum);
        resetstatus();
      }
    }
  });
}
