'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.user = Auth.getCurrentUser();
    this.myPlans = [];
    this.$scope = $scope;

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



  addPlan(form) {
    this.submitted = true;

    var latest_template = this.$http.get('/api/template/latest');

    console.log(latest_template);

    if (form.$valid) {
      this.$http.post('/api/plans', { patient: {name: {first: this.newPlan.firstname, last: this.newPlan.lastname}, dob: this.newPlan.dob }, author: this.user._id})
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }

  exportPlan(plan) {
    alert('export to PDF');
  }

  editPlan(plan) {
    this.$scope.plan = plan;
  }

  viewAllPlans() {
    this.$scope.plan = {};
  }

  deletePlan(plan) {
    this.$http.delete('/api/plans/' + plan._id);
  }
}

angular.module('wellnessPlanApp')
  .controller('MainController', MainController);

})();
