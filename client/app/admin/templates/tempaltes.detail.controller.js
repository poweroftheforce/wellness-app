'use strict';

(function() {

class TemplatesDetailController {

  constructor($http, $stateParams, Auth, template, $log) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    
    this.currentUser = Auth.getCurrentUser();
    // this.version = '';
    // this.version = $stateParams.version;
    

    // this.activate(template);
    this.template = template;
    $log.debug(template);
    // this.pageTitle = 'Template Version: ' + this.template.version;
  }

  activate(template) {
    this.getTemplate(template);
  }

  getTemplate(template) {
    this.template = template[0];
  }
  // updateSection(section) {
  // 	this.$http.put('/api/templates/' + this.template.version)
  // }
}


angular.module('wellnessPlanApp')
  .controller('TemplatesDetailController', TemplatesDetailController);

})();