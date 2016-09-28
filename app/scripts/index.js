'use strict';
/* exported start */

// Define config
var gol = {
  canvasSize: 800,
  canvasGrid: 80,
  period: 50,
  initProbability: 0.5
};
gol.cellSize = gol.canvasSize / gol.canvasGrid;

// Cell Object
var Cell = function (conf) {
  this.states = [];
  for (var i = 0; i < conf.canvasGrid; i++) {
    this.states[i] = [];
    for (var j = 0; j < conf.canvasGrid; j++) {
      this.states[i][j] = 0;
    }
  }
};

// Initialize cells
Cell.prototype.init = function (conf) {
  for (var i = 0; i < conf.canvasGrid; i++) {
    for (var j = 0; j < conf.canvasGrid; j++) {
      if (Math.random() < conf.initProbability) {
        this.states[i][j] = 1;
      }
    }
  }
};

// Display cells according to states
Cell.prototype.draw = function (ctx, conf) {
  for (var i = 0; i < conf.canvasGrid; i++) {
    for (var j = 0; j < conf.canvasGrid; j++) {
      if (this.states[i][j] === 1) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(i * conf.cellSize + 1, j * conf.cellSize + 1, conf.cellSize - 2, conf.cellSize - 2);
      } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(i * conf.cellSize + 1, j * conf.cellSize + 1, conf.cellSize - 2, conf.cellSize - 2);
      }
    }
  }
};

// Create a canvas
var canvasInit = function (conf) {
  var c = document.createElement('canvas');
  c.id = 'canvas';
  c.height = conf.canvasSize;
  c.width = conf.canvasSize;

  document.body.appendChild(c);
  var ctx = c.getContext('2d');

  // Draw a grid
  ctx.strokeStyle = 'gray';
  for (var i = 0; i < conf.canvasGrid + 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * conf.cellSize, 0);
    ctx.lineTo(i * conf.cellSize, conf.canvasSize);
    ctx.stroke();
    ctx.moveTo(0, i * conf.cellSize);
    ctx.lineTo(conf.canvasSize, i * conf.cellSize);
    ctx.stroke();
    ctx.closePath();
  }
  return ctx;
};

// Calculate alive cell around
var aliveCellCal = function (pos, i, j, conf) {
  return pos[(i - 1 + conf.canvasGrid) % conf.canvasGrid][(j - 1 + conf.canvasGrid) % conf.canvasGrid] +
    pos[(i + conf.canvasGrid) % conf.canvasGrid][(j - 1 + conf.canvasGrid) % conf.canvasGrid] +
    pos[(i + 1 + conf.canvasGrid) % conf.canvasGrid][(j - 1 + conf.canvasGrid) % conf.canvasGrid] +
    pos[(i - 1 + conf.canvasGrid) % conf.canvasGrid][(j + conf.canvasGrid) % conf.canvasGrid] +
    pos[(i + 1 + conf.canvasGrid) % conf.canvasGrid][(j + conf.canvasGrid) % conf.canvasGrid] +
    pos[(i - 1 + conf.canvasGrid) % conf.canvasGrid][(j + 1 + conf.canvasGrid) % conf.canvasGrid] +
    pos[(i + conf.canvasGrid) % conf.canvasGrid][(j + 1 + conf.canvasGrid) % conf.canvasGrid] +
    pos[(i + 1 + conf.canvasGrid) % conf.canvasGrid][(j + 1 + conf.canvasGrid) % conf.canvasGrid];
};

// Apply Conway's rule
var animate = function (cell, ctx, conf) {
  // Backup
  var backup = [];
  for (var m = 0; m < conf.canvasGrid; m++) {
    backup[m] = [];
    for (var n = 0; n < conf.canvasGrid; n++) {
      backup[m][n] = cell.states[m][n];
    }
  }
  // Update
  for (var i = 0; i < conf.canvasGrid; i++) {
    for (var j = 0; j < conf.canvasGrid; j++) {
      var surrounds = aliveCellCal(backup, i, j, conf);
      if (surrounds === 3) {
        cell.states[i][j] = 1;
      } else if (surrounds !== 2) {
        cell.states[i][j] = 0;
      }
    }
  }
  // Draw
  cell.draw(ctx, conf);
};

var start = function (conf) {
  var ctx = canvasInit(conf);

  // Create cells
  var cell = new Cell(conf);
  cell.init(conf);
  cell.draw(ctx, conf);

  // Start
  setInterval(animate.bind(null, cell, ctx, conf), conf.period);
};

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('#button')) {
    document.querySelector('#button').onclick = function () {
      if (document.querySelector('#canvas')) {
        document.body.removeChild(document.querySelector('#canvas'));
      }
      gol.canvasSize = parseInt(document.querySelector('#canvasSize').value);
      gol.canvasGrid = parseInt(document.querySelector('#gridNum').value);
      gol.period = parseInt(document.querySelector('#period').value);
      gol.cellSize = gol.canvasSize / gol.canvasGrid;
      start(gol);
    };
  }
});
