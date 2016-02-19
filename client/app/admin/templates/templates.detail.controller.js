'use strict';

(function() {

class TemplatesDetailController {

  constructor($http, $stateParams, Auth, template, $log, $state, TemplateSection, $cookies) {
    this.$log = $log;
    this.$http = $http;
    this.$cookies = $cookies;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.TemplateSection = TemplateSection;
    this.currentUser = Auth.getCurrentUser();

    this.editing = true;

    this.activate(template);
  }

  // addSection() {
  // Not sure if we need new sections. breaking off.
    // var newSection = new this.TemplateSection({
    //   _template_version: this.template.version,
    //   title: this.section_title
    // });

  //   newSection.$save()
  //     .then((data) => {
  //       var template = this.Template.get({id: this.template._id});

  //       console.log(template);
  //       console.log('finished!');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //     this.newSectionForm = false;
  //     this.section_title = ''
  // }

  updateSection() {

    // get section reference
    this.TemplateSection.update({id: this.currentSection._id, template_id: this.currentSection._template_id}, this.currentSection);
    this.$cookies.put('current-ts', this.currentSection._id);
    this.$state.reload();
  }

  activate(template) {
    this.template = template;

    if (this.$cookies.get('current-ts')) {

      for (var i in this.template.sections) {
        if (this.template.sections[i]._id == this.$cookies.get('current-ts')) {

          this.currentSection = this.template.sections[i];
        }

      }
    }
    else {
      this.currentSection = this.template.sections[0];
    }
    this.pageTitle = 'Template Version: ' + this.template.version;
  }
}

angular.module('wellnessPlanApp')
  .controller('TemplatesDetailController', TemplatesDetailController);

})();
