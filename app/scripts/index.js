(function () {
  var gol = {
    canvasSize: 800,
    canvasGrid: 40,
    period: 100,
    initProbability: 0.2
  };
  gol.cellSize = gol.canvasSize / gol.canvasGrid;

  // Create a canvas
  var c = document.createElement('canvas');
  c.id = 'canvas';
  c.height = gol.canvasSize;
  c.width = gol.canvasSize;

  document.body.appendChild(c);
  var ctx = c.getContext('2d');

  // Draw a grid
  ctx.strokeStyle = 'gray';
  for (var i = 0; i < gol.canvasGrid + 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gol.cellSize, 0);
    ctx.lineTo(i * gol.cellSize, gol.canvasSize);
    ctx.stroke();
    ctx.moveTo(0, i * gol.cellSize);
    ctx.lineTo(gol.canvasSize, i * gol.cellSize);
    ctx.stroke();
    ctx.closePath();
  }

  // Cell Object
  var Cell = function () {
    this.states = [];
    for (var i = 0; i < gol.canvasGrid; i++) {
      this.states[i] = [];
      for (var j = 0; j < gol.canvasGrid; j++) {
        this.states[i][j] = 0;
      }
    }
  };

  // Initialize cells
  Cell.prototype.init = function () {
    for (var i = 0; i < gol.canvasGrid; i++) {
      for (var j = 0; j < gol.canvasGrid; j++) {
        if (Math.random() < gol.initProbability)
          this.states[i][j] = 1;
      }
    }
  };

  // Display cells according to states
  Cell.prototype.draw = function () {
    for (var i = 0; i < gol.canvasGrid; i++) {
      for (var j = 0; j < gol.canvasGrid; j++) {
        if (this.states[i][j] === 1) {
          ctx.fillStyle = 'gray';
          ctx.fillRect(i * gol.cellSize + 1, j * gol.cellSize + 1, gol.cellSize - 2, gol.cellSize - 2);
        } else {
          ctx.fillStyle = 'white';
          ctx.fillRect(i * gol.cellSize + 1, j * gol.cellSize + 1, gol.cellSize - 2, gol.cellSize - 2);
        }
      }
    }
  };

  // Create cells
  var cell = new Cell();
  cell.init();
  cell.draw();

  // Apply Conway's rule
  function animate() {
    var backup = cell.states;
    for (var i = 0; i < gol.canvasGrid; i++) {
      for (var j = 0; j < gol.canvasGrid; j++) {
        var surrounds =
          backup[(i - 1 + gol.canvasGrid) % gol.canvasGrid][(j - 1 + gol.canvasGrid) % gol.canvasGrid] +
          backup[(i + gol.canvasGrid) % gol.canvasGrid][(j - 1 + gol.canvasGrid) % gol.canvasGrid] +
          backup[(i + 1 + gol.canvasGrid) % gol.canvasGrid][(j - 1 + gol.canvasGrid) % gol.canvasGrid] +
          backup[(i - 1 + gol.canvasGrid) % gol.canvasGrid][(j + gol.canvasGrid) % gol.canvasGrid] +
          backup[(i + 1 + gol.canvasGrid) % gol.canvasGrid][(j + gol.canvasGrid) % gol.canvasGrid] +
          backup[(i - 1 + gol.canvasGrid) % gol.canvasGrid][(j + 1 + gol.canvasGrid) % gol.canvasGrid] +
          backup[(i + gol.canvasGrid) % gol.canvasGrid][(j + 1 + gol.canvasGrid) % gol.canvasGrid] +
          backup[(i + 1 + gol.canvasGrid) % gol.canvasGrid][(j + 1 + gol.canvasGrid) % gol.canvasGrid];
        cell.states[i][j] = (surrounds === 3) | (surrounds === 2 & cell.states[i][j]);
      }
    }
    cell.draw();
  }

  setInterval(animate, gol.period);
})();
