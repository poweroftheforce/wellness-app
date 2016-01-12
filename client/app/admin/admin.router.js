'use strict';

angular.module('wellnessPlanApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('templates', {
        url: '/admin/templates',
        templateUrl: 'app/admin/templates/templates.html',
        resolve: {
          templates: function(Template) {
            return Template.query();
          }
        },
        controller: 'TemplatesController',
        controllerAs: 'templates',
        authenticate: 'admin'
      })
      .state('template', {
        url: '/admin/template/:id',
        templateUrl: 'app/admin/templates/templates.detail.html',
        resolve: {
          template: function(Template, $stateParams, $log, $state) {
            var promise = Template.get({id: $stateParams.id});
            return promise.$promise.then((data) => {
              $log.info('Returning template: ' + $stateParams.id);
              return data;
            })
            .catch((error) => {
              $log.error('There was an error accessing this template.\n' + angular.toJson(error.data, true));              
              $state.go('templates');
            });
          }
        },
        controller: 'TemplatesDetailController',
        controllerAs: 'vm',
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

function templateProvider(template) {
  return template.query();
}