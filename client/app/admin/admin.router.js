'use strict';

angular.module('wellnessPlanApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/users',
        templateUrl: 'app/admin/users.index.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin'
      });
  });
