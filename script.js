(function () {
  var canvas = document.getElementById("nodes");
  var sections = document.querySelectorAll(".section");
  var ctx;
  var points = [];
  var width = 0;
  var height = 0;
  var i;
  var j;

  for (i = 0; i < sections.length; i = i + 1) {
    sections[i].classList.add("reveal");
  }

  function updateReveals() {
    var viewportBottom = window.innerHeight * 0.9;
    var section;
    var rect;

    for (i = 0; i < sections.length; i = i + 1) {
      section = sections[i];
      rect = section.getBoundingClientRect();

      if (rect.top < viewportBottom) {
        section.classList.add("is-visible");
      }
    }
  }

  function resize() {
    if (!canvas) {
      return;
    }

    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    buildPoints();
  }

  function buildPoints() {
    var count;
    var point;

    points = [];

    if (width < 700) {
      count = 28;
    } else {
      count = 48;
    }

    for (i = 0; i < count; i = i + 1) {
      point = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25
      };
      points.push(point);
    }
  }

  function draw() {
    var a;
    var b;
    var dx;
    var dy;
    var dist;

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (i = 0; i < points.length; i = i + 1) {
      a = points[i];
      a.x = a.x + a.vx;
      a.y = a.y + a.vy;

      if (a.x < 0) {
        a.x = width;
      } else {
        if (a.x > width) {
          a.x = 0;
        }
      }

      if (a.y < 0) {
        a.y = height;
      } else {
        if (a.y > height) {
          a.y = 0;
        }
      }

      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(158, 240, 212, 0.55)";
      ctx.fill();

      for (j = i + 1; j < points.length; j = j + 1) {
        b = points[j];
        dx = a.x - b.x;
        dy = a.y - b.y;
        dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = "rgba(126, 182, 255, " + (0.16 * (1 - dist / 140)) + ")";
          ctx.stroke();
        }
      }
    }

    window.requestAnimationFrame(draw);
  }

  if (canvas) {
    ctx = canvas.getContext("2d");
    resize();
    draw();
    window.addEventListener("resize", resize);
  }

  window.addEventListener("scroll", updateReveals, { passive: true });
  window.addEventListener("resize", updateReveals);
  updateReveals();
})();
