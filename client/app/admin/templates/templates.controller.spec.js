'use strict';

describe('Controller: TemplatesController', function () {

  // load the controller's module
  beforeEach(module('wellnessPlanApp'));

  var TemplatesController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TemplatesController = $controller('TemplatesController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
