(function () {
  'use strict';
  describe('gol (config object)', function () {
    it('should be a object', function () {
      assert.isObject(gol);
    });
    it('should have keys canvasSize ', function () {
      expect(gol).to.include.keys('canvasSize');
    });
    it('should have keys canvasGrid ', function () {
      expect(gol).to.include.keys('canvasGrid');
    });
    it('should have keys period ', function () {
      expect(gol).to.include.keys('period');
    });
    it('should have keys initProbability ', function () {
      expect(gol).to.include.keys('initProbability');
    });
    it('should have keys cellSize ', function () {
      expect(gol).to.include.keys('cellSize');
    });
  });

  describe('Cell', function () {
    it('should be a function', function () {
      assert.isFunction(Cell);
    });
    it('should have one parameter', function () {
      expect(Cell).to.have.lengthOf(1);
    });
    context('Cell.prototype.init', function () {
      it('should have prototype init', function () {
        expect(Cell).to.respondTo('init');
      });
      it('should have one parameter', function () {
        expect(Cell.prototype.init).to.have.lengthOf(1);
      })
    });
    context('Cell.prototype.draw', function () {
      it('should have prototype draw', function () {
        expect(Cell).to.respondTo('draw');
      });
      it('should have two parameters', function () {
        expect(Cell.prototype.draw).to.have.lengthOf(2);
      });
    });
  });

  describe('canvasInit', function () {
    it('should be a function', function () {
      assert.isFunction(canvasInit);
    });
    it('should have one parameter', function () {
      expect(canvasInit).to.have.lengthOf(1);
    });
    it('should return an object', function () {
      expect(typeof canvasInit(gol)).to.be.deep.equal('object');
      document.body.removeChild(document.querySelector('#canvas'));
    });
  });

  describe('aliveCellCal', function () {
    it('should be a function', function () {
      assert.isFunction(aliveCellCal);
    });
    it('should have four parameters', function () {
      expect(aliveCellCal).to.have.lengthOf(4);
    });
    it('should return a number', function () {
      var cell = new Cell(gol);
      cell.init(gol);
      expect(typeof aliveCellCal(cell.states, 1, 1, gol)).to.be.deep.equal('number');
    });
  });

  describe('animate', function () {
    it('should be a function', function () {
      assert.isFunction(animate);
    });
    it('should have three parameters', function () {
      expect(animate).to.have.lengthOf(3);
    });
  });

  describe('start', function () {
    it('should be a function', function () {
      assert.isFunction(start);
    });
    it('should have one parameter', function () {
      expect(start).to.have.lengthOf(1);
    });
  });
})();
