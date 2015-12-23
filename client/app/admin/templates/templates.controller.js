'use strict';

(function() {

class TemplatesController {

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.$scope = $scope;
    this.index = [];
    this.currentUser = Auth.getCurrentUser();

    $scope.pageTitle = 'PDF Template';

    $http.get('/api/templates').then(response => {
      this.index = response.data;
      socket.syncUpdates('template', this.index);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('template');
    });

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