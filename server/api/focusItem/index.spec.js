'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var focusItemCtrlStub = {
  index: 'focusItemCtrl.index',
  show: 'focusItemCtrl.show',
  create: 'focusItemCtrl.create',
  update: 'focusItemCtrl.update',
  destroy: 'focusItemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var focusItemIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './focusItem.controller': focusItemCtrlStub
});

describe('FocusItem API Router:', function() {

  it('should return an express router instance', function() {
    focusItemIndex.should.equal(routerStub);
  });

  describe('GET /api/focusItems', function() {

    it('should route to focusItem.controller.index', function() {
      routerStub.get
        .withArgs('/', 'focusItemCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/focusItems/:id', function() {

    it('should route to focusItem.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'focusItemCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/focusItems', function() {

    it('should route to focusItem.controller.create', function() {
      routerStub.post
        .withArgs('/', 'focusItemCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/focusItems/:id', function() {

    it('should route to focusItem.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'focusItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/focusItems/:id', function() {

    it('should route to focusItem.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'focusItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/focusItems/:id', function() {

    it('should route to focusItem.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'focusItemCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
