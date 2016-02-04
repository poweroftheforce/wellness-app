'use strict';

(function() {

class PlansController {

  constructor($http, Auth, plan,  PlanSection, TemplateSection, $state) {
    this.$http = $http;
    this.$state = $state;
    this.user = Auth.getCurrentUser();
    this.plan = plan;
    this.PlanSection = PlanSection;
    this.TemplateSection = TemplateSection;
    
    this.pageTitle = 'Wellness Plan';
    this.previewPages;
    this.currentPreviewPage;
    this.planSections;
    this.planSection;
    this.templateSections;
    this.templateSection;
    this.getTemplateSections();

    $('.content').css('min-height', ($(window).outerHeight() - 230));
    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });
  }


  view(plan) {
    this.viewing = true;
  }

  edit(plan) {
  	this.viewing = false;
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
        console.log('plan updated');
        this.$state.reload();
      });
    })
    .catch((err) => {
      console.log('plan NOT updated');
      console.log(err);
    });
  }

  saveSection(section) {

    if (this.planSection.title) {
      // we have the section.
      this.planSection.$update({plan_id: this.plan._id, id: this.planSection._id})
      .then(() => {
        this.$state.reload();
      });
    }
    else { // update section with new html, etc.
      this.addSection(section);
    }  

    // for (var i=0;i<this.plan.sections.length;i++) {
    //   if (this.plan.sections[i].title == title) {
    //     found = true;
    //     var promise = this.PlanSection.get({plan_id: this.plan._id, id: this.plan.sections[i]._id}).$promise
    //     .then((data) => {
    //       planSection = data;
    //       if (section.html) { planSection.html = section.html; }
    //       if (section.nutraceuticals) { planSection.nutraceuticals = section.nutraceuticals; }
    //       if (section.prescriptions) { planSection.prescriptions = section.prescriptions; }
    //       if (section.references) { planSection.references = section.references; }
    //       if (section.predefinedContent) { planSection.predefinedContent = section.predefinedContent; }
    //       planSection.$update({plan_id: this.plan._id, _id: planSection._id})
    //       .then(() => {
    //         this.$state.reload();
    //       });
    //     });
    //   }
    // }
    // if (!found) { // update section with new html, etc.
    //   console.log('need to add section.');
    //   this.addSection(section);
    // }  
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
          this.templateSection = data[0];
          // Prep plan pages! - Put this shit in a directive.
          // this.previewPages = $('.plan-page');
          // this.currentPreviewPage = $('.plan-page')[0];
          // $(this.currentPreviewPage).addClass('current-page');
      });
    });
  }

  getPlanSections() {
    //Really?
    return this.plan.sections;
  }

  setSection(section) {
    var title = section.title;
    this.planSection = {};
    for (var i=0;i<this.plan.sections.length;i++) {
      if (this.plan.sections[i].title == title) {
        this.PlanSection.get({plan_id: this.plan._id, id: this.plan.sections[i]._id }).$promise
        .then((data) => {
          this.planSection = data;
        });
      } 
    }
    this.templateSection = section;    
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
