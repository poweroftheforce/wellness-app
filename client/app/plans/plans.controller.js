'use strict';

(function() {

class PlansController {

  constructor($http, $state, Auth, plan, latestTemplate, PlanSection) {
    this.$http = $http;
    this.$state = $state;
    this.user = Auth.getCurrentUser();
    this.plan = plan;
    this.PlanSection = PlanSection;
    this.pageTitle = 'Wellness Plan';
    this.previewPages;
    this.currentPreviewPage;
    this.planSections;
    this.planSection;
    this.templateSections = latestTemplate.sections;
    this.templateSection = this.templateSections[0];
    this.latestTemplate = latestTemplate;

    $('.content').css('min-height', ($(window).outerHeight() - 230));
    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });
  }

  addSection(section, cb) {
    // I think this will be an slient action when edits are made.
    var newPlanSection = new this.PlanSection({
      title: section.title,
      html: section.html,
      _plan_id: this.plan._id,
      nutraceuticals: section.nutraceuticals,
      prescriptions: section.prescriptions,
      references: section.references,
      predefinedContent: section.predefinedContent
    });
    newPlanSection.$save({plan_id: this.plan._id})
    .then((newSection) => {
      this.plan.sections.push(newSection._id); // this.plan.sections.push(newSection) => same result, larger request?
      this.plan.$update()
      .then(() => {
        this.$state.reload();
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  saveSection(section) {
    // if a plan section has been created
    if (this.planSection.title) {

      // and it doesn't have any html present
      if (this.planSection.html == "") {
        this.planSection.html = section.html;
      }
      // update the plan section accordingly  
      this.planSection.$update({plan_id: this.plan._id, id: this.planSection._id})
      .then(() => {
        this.$state.reload();
      });
    }
    else { // update section with new html, etc.
      this.addSection(section);
    }  
  }

  setSection(section) {
    var title = section.title;
    this.planSection = {};

    for (var i=0;i<this.plan.sections.length;i++) {
      // if the current plan has this section added...
      if (this.plan.sections[i].title == title) {
        this.PlanSection.get({plan_id: this.plan._id, id: this.plan.sections[i]._id }).$promise
        .then((data) => {
          // set planSection and ct-ps-id cookie or should it be state params?
          this.planSection = data;
          // this.$cookies.put('current-plans-ps', this.planSection._id);
        });
      } 
    }
    // set the template section always, for updating/adding sections and the sidebar.
    this.templateSection = section;    
    // this.$cookies.put('current-plans-ts', this.templateSection._id);
  }

// might just get rid of these.
  view(plan) {
    this.viewing = true;
  }

  edit(plan) {
    this.viewing = false;
  }

  nextPage() {
    // pages[page] ??????
    if (this.page < this.pages.length()) {
      this.page ++;
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page --;
    }
  }
}
angular.module('wellnessPlanApp')
  .controller('PlansController', PlansController);

})();
