'use strict';

angular.module('wellnessPlanApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: function($scope) {
          $scope.pageTitle = 'About Us';
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