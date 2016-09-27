(function () {
  'use strict';
  describe('gol (config object)', function () {
    it('should be a object', function () {
      assert.isObject(gol);
    });
    it('should have property canvasSize ', function () {
      expect(gol).to.have.property('canvasSize');
    });
    it('should have property canvasGrid ', function () {
      expect(gol).to.have.property('canvasGrid');
    });
    it('should have property period ', function () {
      expect(gol).to.have.property('period');
    });
    it('should have property initProbability ', function () {
      expect(gol).to.have.property('initProbability');
    });
    it('should have property cellSize ', function () {
      expect(gol).to.have.property('cellSize');
    });
  });

  describe('Cell', function () {
    it('should be a function', function () {
      assert.isFunction(Cell);
    });
    it('should have a parameter', function () {
      expect(Cell).to.have.lengthOf(1);
    });
    it('should have prototype init', function () {
      expect(Cell).to.respondTo('init');
    });
    it('should have prototype draw', function () {
      expect(Cell).to.respondTo('draw');
    });
  });
})();
