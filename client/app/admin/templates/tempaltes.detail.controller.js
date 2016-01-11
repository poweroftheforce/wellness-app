'use strict';

(function() {

class TemplatesDetailController {

  constructor($http, $scope, $stateParams, Auth, $resource, Template) {
    this.$http = $http;
    this.$scope = $scope;
    this.currentUser = Auth.getCurrentUser();
    this.version = $stateParams.version;
    this.template = {};

    
    this.$scope.pageTitle = 'Template Version ' + this.version;

    this.template = Template.query({version: this.version}, function() {
    	console.log('success?');
    });

  }

  updateSection(section) {
  	this.$http.put('/api/templates/' + this.template.version)
  }
}


angular.module('wellnessPlanApp')
  .controller('TemplatesDetailController', TemplatesDetailController);

})();