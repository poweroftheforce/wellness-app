'use strict';

angular.module('wellnessPlanApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('plan', {
        url: '/plans/:id',
        templateUrl: 'app/plans/plan.html',
        resolve: {
          plan: function(Plan, $stateParams, $log, $state) {
            var promise = Plan.get({id: $stateParams.id});
            return promise.$promise.then((data) => {
              return data;
            })
            .catch((error) => {
              $log.error('There was an error accessing this plan.\n' + angular.toJson(error.data, true));              
              $state.go('dashboard');
            });
          },

          latestTemplate: function(Template) {
            var promise = Template.latest();
            return promise.$promise.then((data) => {
              return data[0];
            })
            .catch((err) => {
              $log.error('There was an error accessing the latest template.\n' + angular.toJson(error.data, true));              
              $state.go('dashboard');
            });
            
          }
        },
        controller: 'PlansController',
        controllerAs: 'vm'
      });
  });