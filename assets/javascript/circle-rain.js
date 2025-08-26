  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;

  var canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  var ctx = canvas.getContext('2d');

  document.body.appendChild(canvas);


  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();


  var DUST = [];
  var LAYERS = [{
    x : 2,
    y : 5
  },
  {
    x : -1,
    y : 4
  },
  {
    x : -3,
    y : 3
  },
  {
    x : 1,
    y : 2
  }
  ];

  for (var i = 0; i < 100; ++i) {
    LAYERS.push(
    {
      x : Math.random() * 5 - 2.5,
      y : Math.random() * 5
    }
    );
  }

  for (var i = 0; i < 2000; ++i) {
    DUST.push({
      x : Math.random() * WIDTH | 0,
      y : Math.random() * HEIGHT | 0,
      l : Math.random() * LAYERS.length | 0
    })
  }

  function run() {
    requestAnimFrame(run);
  
    ctx.fillStyle = '#EDF0F4'
    ctx.fillRect(0,0,WIDTH, HEIGHT);
    animateDust();
    renderDust();
  }

  function animateDust() {
    for (var i = 0; i < LAYERS.length; ++i) {
      var l = LAYERS[i];
      l.y += Math.random() * .1 - .05;
      if (l.y <= 2) {
        l.y = 2;
      }
      if (l.y > 5) {
        l.y = 5;
      }
    }

    for (var i = 0; i < DUST.length; ++i) {
      var d = DUST[i];

      d.x += LAYERS[d.l].x;
      d.y += LAYERS[d.l].y;
      if (d.x < 0) {
        d.x = WIDTH;
      }
      if (d.x > WIDTH) {
        d.x = 0;
      }

      if (d.y < 0) {
        d.y = HEIGHT;
      }
      if (d.y > HEIGHT) {
        d.y = 0;
      }
    }
  }

  function renderDust() {
    ctx.strokeStyle = '#C1C9C8';

    ctx.beginPath();
    for (var i = 0; i < DUST.length; ++i) {
      var d = DUST[i];
      ctx.moveTo(d.x + 3 , d.y);
      ctx.arc(d.x, d.y, 3,0,Math.PI *2, true);
    }

    ctx.stroke();
  }

  run();
