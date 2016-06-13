'use strict';

angular.module( 'wellnessPlanApp.admin' ).config(function( $stateProvider ) {
	$stateProvider.state('templates', {
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
	.state('templateEditor', {
		url: '/admin/templateEditor',
		templateUrl: 'app/admin/templates/templates.detail.html',
		resolve: {
			template: function(Template, $stateParams, $log, $state) {
				var promise = Template.latest();
				return promise.$promise.then((data) => {
					return data[0];
				})
				.catch((error) => {
					$log.error('There was an error accessing the editor.\n' + angular.toJson(error.data, true));
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
	.state('references', {
		url: '/admin/references',
		templateUrl: 'app/admin/references/references.html',
		controller: 'ReferencesController',
		controllerAs: 'vm',
		authenticate: 'admin'
	})
	.state('reports', {
		url: '/admin/reports',
		templateUrl: 'app/admin/reports/reports.htm',
		//resolve: {
		//	reports: function( reports) {
		//		return reports.query();
		//	}
		//},
		controller: 'ReportsController',
		controllerAs: 'vm',
		authenticate: 'admin'
	})
	.state('focusItems', {
		url: '/admin/focusItems',
		templateUrl: 'app/admin/focusItems/focusItems.html',
		resolve: {
			focusItems: function(FocusItem) {
				return FocusItem.query();
			}
		},
		controller: 'FocusItemsController',
		controllerAs: 'vm',
		authenticate: 'admin'
	})
	.state('addendums', {
		url: '/admin/addendums',
		templateUrl: 'app/admin/addendums/addendums.html',
		resolve: {
			addendums: function(Addendum) {
				return Addendum.query();
			}
		},
		controller: 'AddendumsController',
		controllerAs: 'vm',
		authenticate: 'admin'
	});

});

function templateProvider(template) {
return template.query();
}
