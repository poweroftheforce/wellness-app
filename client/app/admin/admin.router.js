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
        controllerAs: 'vm',
        authenticate: 'admin'
      })
      .state('template', {
        url: '/admin/template/:id',
        templateUrl: 'app/admin/templates/templates.detail.html',
        resolve: {
          template: function(Template, $stateParams, $log, $state) {
            var promise = Template.get({id: $stateParams.id});
            return promise.$promise.then((data) => {
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
      })
      .state('nutraceuticals', {
        url: '/admin/nutraceuticals',
        templateUrl: 'app/admin/nutraceuticals/nutraceuticals.html',
        controller: 'NutraceuticalsController',
        controllerAs: 'vm',
        authenticate: 'admin'
      })
      .state('prescriptions', {
        url: '/admin/prescriptions',
        templateUrl: 'app/admin/prescriptions/prescriptions.html',
        controller: 'PrescriptionsController',
        controllerAs: 'vm',
        authenticate: 'admin'
      })
      .state('predefinedMaterials', {
        url: '/admin/predefinedMaterials',
        templateUrl: 'app/admin/predefinedMaterials/predefinedMaterials.html',
        controller: 'PredefinedMaterialsController',
        controllerAs: 'vm',
        authenticate: 'admin'
      })
      .state('references', {
        url: '/admin/references',
        templateUrl: 'app/admin/references/references.html',
        controller: 'ReferencesController',
        controllerAs: 'vm',
        authenticate: 'admin'
      });

  });

function templateProvider(template) {
  return template.query();
}