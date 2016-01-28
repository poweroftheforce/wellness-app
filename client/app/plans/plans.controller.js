'use strict';

(function() {

class PlansController {

  constructor($http, Auth, plan, PlanSection, TemplateSection) {
    this.$http = $http;
    this.user = Auth.getCurrentUser();
    this.plan = plan;
    this.PlanSection = PlanSection;
    this.TemplateSection = TemplateSection;
    
    this.pageTitle = 'Wellness Plan';
    this.viewing = true;
    this.previewPages;
    this.currentPreviewPage;
    this.planSections;
    this.templateSections;
    
    this.getTemplateSections();

    $('.content').css('min-height', ($(window).outerHeight() - 230));
    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });
  }

  // print(plan) {
  // 	// This means print!
  // }

  edit(plan) {
  	this.viewing = false;
    // // we need the latest template file for it's data.
    // var version;
    // var ctl = this;
    // var promise = this.$http.get('/api/templates/latest');
    // promise.success(function(data) {
    // })  
    // .then((data) => {
    //   version = data.data[0].version;
    //   var promise = this.TemplateSection.query({_template_version: version});
    //   promise.$promise.then((data) => { 
    //     this.sections = data;
    //     // TODO Need to make Cover active!
    //     this.activeSection = data[0];
    //   });
    //   this.plan = plan;
    //   this.viewing = false;  
    // });  
  }

  view(plan) {
    this.viewing = true;
  }

  popPlan() {
    var plan = this.plan;
    var sections = [];
    
    
    console.log('populating plan');

    for (var i=0; i<this.templateSections.length; i++) {
      var tempSec = this.templateSections[i];
      console.log(tempSec.order + ' - ' + tempSec.title);  
    }
  }

  getTemplateSections() {
    var self = this;
    var promise = this.$http.get('api/templates/latest');
    promise.success(function(data) {
      
    })
    .then((data) => {

      var promise = self.TemplateSection.query({template_id: data.data[0]._id});
      self.templateSections = promise.$promise
      .then((data) => {
         self.templateSections = data;

          // Prep plan pages!
          this.previewPages = $('.plan-page');
          this.currentPreviewPage = $('.plan-page')[0];
          $(this.currentPreviewPage).addClass('current-page');
      });
    });
  }

  getPlanSections() {
    var self = this;
    var promise = this.$http.get('api/templates/latest');
    promise.success(function(data) {
      
    })
    .then((data) => {

      var promise = self.TemplateSection.query({template_id: data.data[0]._id});
      self.templateSections = promise.$promise
      .then((data) => {
         self.templateSections = data;

          // Prep plan pages!
          this.previewPages = $('.plan-page');
          this.currentPreviewPage = $('.plan-page')[0];
          $(this.currentPreviewPage).addClass('current-page');
      });
    });
  }

  nextPage() {

  }

  previousPage() {

  }
}
angular.module('wellnessPlanApp')
  .controller('PlansController', PlansController);

})();
