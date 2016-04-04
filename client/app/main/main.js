'use strict';

angular.module('wellnessPlanApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        authenticate: 'user',
        url: '/dashboard',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        resolve: {
          plans: function(Plan, Auth) {
            return Plan.query({});
          }
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: function($scope) {
          $scope.pageTitle = 'About Seasons Wellness';
        }
      })
      .state('tutorial', {
        url: '/tutorial',
        templateUrl: 'app/main/tutorial.html',
        controller: function($scope) {
          $scope.pageTitle = 'Tutorial';
        }
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/main/contact.html',
        controller: function($scope) {
          $scope.pageTitle = 'Contact Us';
        }
      });
  });
