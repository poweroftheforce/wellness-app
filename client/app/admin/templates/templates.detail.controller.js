'use strict';

(function() {

class TemplatesDetailController {

  constructor($http, $stateParams, Auth, template, $log, Template, $state, TemplateSection) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$log = $log;
    this.$state = $state;
    this.currentUser = Auth.getCurrentUser();
    this.Template = Template;
    this.TemplateSection = TemplateSection;
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
    this.$log.info('testing 123');
    // get section reference
    this.TemplateSection.update({id: this.currentSection._id, template_id: this.currentSection._template_id}, this.currentSection);
    
    // get new section
    // update sections based on new section
    // update view?
  }

  activate(template) {
    this.template = template;
    this.currentSection = this.template.sections[0];
    this.pageTitle = 'Template Version: ' + this.template.version;
  }
}

angular.module('wellnessPlanApp')
  .controller('TemplatesDetailController', TemplatesDetailController);

})();
