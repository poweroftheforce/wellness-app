'use strict';

(function() {

class UsersController {

  constructor($http, $scope, User) {

  	$scope.pageTitle = 'User List';
    	
    this.index = User.query();


    $('.content').css('min-height', ($(window).outerHeight() - 230));

    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });
  }

}

angular.module('wellnessPlanApp')
  .controller('UsersController', UsersController);

})();
