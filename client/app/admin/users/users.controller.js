'use strict';

(function() {

class UsersController {

  constructor($http, $scope, User) {

  	$scope.pageTitle = 'Users';

    this.index = User.query();
  }

}

angular.module('wellnessPlanApp')
  .controller('UsersController', UsersController);

})();
