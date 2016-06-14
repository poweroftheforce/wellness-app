'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var planSectionCtrlStub = {
  index: 'planSectionCtrl.index',
  show: 'planSectionCtrl.show',
  create: 'planSectionCtrl.create',
  update: 'planSectionCtrl.update',
  destroy: 'planSectionCtrl.destroy'
};

var authServiceStub = {
  isAuthenticated: function isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole: function hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  'delete': sinon.spy()
};

// require the index with our stubbed out modules
var planSectionIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './planSection.controller': planSectionCtrlStub,
  '../../../auth/auth.service': authServiceStub
});

describe('Plan Section API Router:', function () {

  it('should return an express router instance', function () {
    planSectionIndex.should.equal(routerStub);
  });

  describe('When authenticated', function () {
    describe('GET /api/plans/:plan_id/sections', function () {
      it('should route to planSection.controller.index', function () {
        routerStub.get.withArgs('/', 'authService.isAuthenticated', 'planSectionCtrl.index').should.have.been.calledOnce;
      });
    });

    describe('GET /api/plans/:plan_id/sections/:id', function () {

      it('should not route to plan.controller.show', function () {
        routerStub.get.withArgs('/:id', 'authService.isAuthenticated', 'planSectionCtrl.show').should.not.have.been.calledOnce;
      });
    });

    describe('POST /api/plans', function () {

      it('should route to plan.controller.create', function () {
        routerStub.post.withArgs('/', 'authService.isAuthenticated', 'planSectionCtrl.create').should.have.been.calledOnce;
      });
    });

    describe('PUT /api/plans/:plan_id/sections/:id', function () {

      it('should route to plan.controller.update', function () {
        routerStub.put.withArgs('/:id', 'authService.isAuthenticated', 'planSectionCtrl.update').should.have.been.calledOnce;
      });
    });

    describe('PATCH /api/plans/:plan_id/sections/:id', function () {

      it('should route to plan.controller.update', function () {
        routerStub.patch.withArgs('/:id', 'authService.isAuthenticated', 'planSectionCtrl.update').should.have.been.calledOnce;
      });
    });

    describe('DELETE /api/plans/:plan_id/sections/:id', function () {

      it('should route to plan.controller.destroy', function () {
        routerStub['delete'].withArgs('/:id', 'authService.isAuthenticated', 'planSectionCtrl.destroy').should.have.been.calledOnce;
      });
    });
  });

  describe('When not authenticated', function () {
    describe('GET /api/plans', function () {
      it('should not route to plan.controller.index', function () {
        routerStub.get.withArgs('/', 'planSectionCtrl.index').should.not.have.been.calledOnce;
      });
    });

    describe('GET /api/plans/:plan_id/sections/:id', function () {

      it('should not route to plan.controller.show', function () {
        routerStub.get.withArgs('/:id', 'planSectionCtrl.show').should.not.have.been.calledOnce;
      });
    });

    describe('POST /api/plans', function () {

      it('should not route to plan.controller.create', function () {
        routerStub.post.withArgs('/', 'planSectionCtrl.create').should.not.have.been.calledOnce;
      });
    });

    describe('PUT /api/plans/:plan_id/sections/:id', function () {

      it('should not route to plan.controller.update', function () {
        routerStub.put.withArgs('/:id', 'planSectionCtrl.update').should.not.have.been.calledOnce;
      });
    });

    describe('PATCH /api/plans/:plan_id/sections/:id', function () {

      it('should not route to plan.controller.update', function () {
        routerStub.patch.withArgs('/:id', 'planSectionCtrl.update').should.not.have.been.calledOnce;
      });
    });

    describe('DELETE /api/plans/:plan_id/sections/:id', function () {

      it('should not route to plan.controller.destroy', function () {
        routerStub['delete'].withArgs('/:id', 'planSectionCtrl.destroy').should.not.have.been.calledOnce;
      });
    });
  });
});
//# sourceMappingURL=index.spec.js.map
