'use strict';

angular.module('wellnessPlanApp', [
  'wellnessPlanApp.auth',
  'wellnessPlanApp.admin',
  'wellnessPlanApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'validation.match',
  'angularMoment',
  'textAngular'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(true);
});
