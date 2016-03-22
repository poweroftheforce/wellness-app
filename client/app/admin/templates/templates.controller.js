'use strict';

(function() {

class TemplatesController {

  constructor($http, Auth, templates, Template) {
    this.$http = $http;
    this.index = [];
    this.currentUser = Auth.getCurrentUser();
    this.templates = templates;
    this.Template = Template;

    this.pageTitle = 'PDF Template';
  }

  addTemplate() {
  	if (this.newTemplateVersion) {
  		// this.$http.post('/api/templates', { version: this.newTemplateVersion, author: this.currentUser.name });
      var newTemplate = new this.Template({version: this.newTemplateVersion, author: this.currentUser.name});
      newTemplate.$save()
      .then((data) => {
        this.newTemplateVersion = '';
        this.templates.push(data);
      });
  	}
  }

  deleteTemplate(template) {
    // this.$http.delete('/api/templates/' + template._id);
    template.$delete()
    .then((data) => {
      this.templates = this.Template.query();
    });
  }
}

angular.module('wellnessPlanApp')
  .controller('TemplatesController', TemplatesController);

})();
