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
  }

  addSection() {
    var newPlanSection = new this.PlanSection({
      title: 'new section',
      _plan_id: this.plan._id
    });
    newPlanSection.$save({plan_id: this.plan._id})
    .then(() => {
      // this.$state.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  view(plan) {
    this.viewing = true;
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
