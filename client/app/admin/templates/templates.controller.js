'use strict';

(function() {

class TemplatesController {

  constructor($http, $scope, socket, Auth, templates) {
    this.$http = $http;
    this.$scope = $scope;
    this.index = [];
    this.currentUser = Auth.getCurrentUser();
    this.index = templates;
    
    $scope.pageTitle = 'PDF Template';

    // I need to wrap this somewhere else.
    $('.content').css('min-height', ($(window).outerHeight() - 230));
    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });
  }

  view(template) {
    this.$scope.template = template;
  }

  viewAll() {
    this.$scope.template = {};
  }

  new() {
  	if (this.newTemplateVersion) {
  		this.$http.post('/api/templates', { version: this.newTemplateVersion, author: this.currentUser.name });	
  	}
  }

  delete(template) {
    this.$http.delete('/api/templates/' + template._id);
  }

  addSection(template, name) {

    if (this.$scope.template && this.newSectionName) {
      // return array of sections, add new section, then update model in db
      var newSection = {name: this.newSectionName, cover_page: '<h2>Cover Page</h2>', html: '<b>blank</b>'};
      this.$scope.template.sections.push(newSection);
      // this.$http.put('/api/templates/' + template._id, { });
    }
  }
}

angular.module('wellnessPlanApp')
  .controller('TemplatesController', TemplatesController);

})();