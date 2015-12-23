'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.user = Auth.getCurrentUser();
    this.myPlans = [];

    $scope.pageTitle = 'Dashboard';

    $http.get('/api/plans').then(response => {
      this.myPlans = response.data;
      socket.syncUpdates('plan', this.myPlans);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('plan');
    });

    $('.content').css('min-height', ($(window).outerHeight() - 230));

    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });
  }

  addPlan() {
    if (this.newPlan) {
      this.$http.post('/api/plans', { patient: {name: this.newPlan}, author: this.user._id});
      this.newPlan = '';
    }
  }

  deletePlan(plan) {
    this.$http.delete('/api/plans/' + plan._id);
  }
}

angular.module('wellnessPlanApp')
  .controller('MainController', MainController);

})();
