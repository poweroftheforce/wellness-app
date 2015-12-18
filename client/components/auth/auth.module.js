'use strict';

angular.module('wellnessPlanApp.auth', [
  'wellnessPlanApp.constants',
  'wellnessPlanApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
