'use strict';

angular.module('wellnessPlanApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('templates', {
        url: '/admin/templates',
        templateUrl: 'app/admin/templates/templates.html',
        controller: 'TemplatesController',
        controllerAs: 'templates',
        authenticate: 'admin'
      })
      .state('users', {
        url: '/admin/users',
        templateUrl: 'app/admin/users/users.html',
        controller: 'UsersController',
        controllerAs: 'users',
        authenticate: 'admin'
      });
  });
