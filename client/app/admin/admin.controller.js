'use strict';

(function() {

class AdminController {
  constructor(User, $state, $scope) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    $scope.pageTitle = 'User Management';
    
    $('.content').css('min-height', ($(window).outerHeight() - 230));

    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });

  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('wellnessPlanApp.admin')
  .controller('AdminController', AdminController);

})();