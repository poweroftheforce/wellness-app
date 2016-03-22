'use strict';

(function() {

class PlansController {

  constructor($state, $cookies, Auth, plan, latestTemplate, PlanSection) {
    this.$state = $state;
    this.$cookies = $cookies;
    this.user = Auth.getCurrentUser();
    this.PlanSection = PlanSection;
    this.pageTitle = 'Wellness Plan';
    this.previewPages;
    this.currentPreviewPage;
    this.planSections;
    this.planSection;
    this.templateSections = latestTemplate.sections;
    this.viewing=true;
    this.activate(plan);
    this.page = 1;
  }

  /*
   *  Editor Functions
   *
   */

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
        // this.$cookies.put('current-ts', this.currentSection._id);
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

    // set the template section always, for updating/adding sections and the sidebar.
    this.templateSection = section;
    this.$cookies.put('ps-id', this.templateSection._id);

    for (var i=0;i<this.plan.sections.length;i++) {
      // if the current plan has this section added...
      if (this.plan.sections[i].title == title) {
        this.PlanSection.get({plan_id: this.plan._id, id: this.plan.sections[i]._id }).$promise
        .then((data) => {
          // set planSection and ct-ps-id cookie or should it be state params?
          this.planSection = data;
          this.templateSection.planSection = this.planSection;
          // this.$cookies.put('current-plan-ps', this.planSection._id);
        });
      }
    }
  }

  activate(plan) {
    var self = this;
    this.plan = plan;
    var c_id = this.$cookies.get('ps-id');
    this.templateSection = this.templateSections[0];


    // link existing plan sections to template sections
    for (var i=0;i<this.templateSections.length;i++) {

      var section = this.templateSections[i];

      // If the user has a cookie for last edited section...
      if (c_id) {
        // We need that section to be the active section
        if ( this.templateSections[i]._id == c_id ) {
          this.templateSection = this.templateSections[i];
        }
      }

      // link any plan sections to their templates
      for (var j=0;j<this.plan.sections.length;j++) {

        // If a plan section has been made, we can link it here.
        if (this.plan.sections[j].title == section.title) {
          section.planSection = this.plan.sections[j];
        }
      }
    }

    // Loop through plan sections to see if any of them match the current section.
    for (var j=0;j<this.plan.sections.length;j++) {
      if (this.plan.sections[j].title == this.templateSection.title) {
        this.PlanSection.get({plan_id: this.plan._id, id: this.plan.sections[j]._id }).$promise
        .then((data) => {
          this.planSection = data;
        });
      }
    }


    // if (c_id) {

    //   // set active section from template sections
    //   for (var i=0;i<this.templateSections.length;i++) {
    //     if ( this.templateSections[i]._id == c_id ) {
    //       this.templateSection = this.templateSections[i];
    //     }

    //     for (var j=0;j<this.plan.sections.length;j++) {
    //       console.log('j: ' j);
    //       // If there are any plan sections that correspond to template sections, link them.
    //       if (this.plan.sections[j].title == this.templateSections[i].title) {
    //         this.templateSections[i].planSection = this.planSections[j]
    //       }
    //     }

    //   }
    //   for (var j=0;j<this.plan.sections.length;j++) {
    //     // If there are any plan sections that correspond to template sections, link them.
    //     if (this.plan.sections[j].title == this.templateSections[i].title) {
    //      this.templateSections[i].planSection = this.planSections[j]
    //     }

    //     // if the current plan has this section added...
    //     if (this.plan.sections[j].title == this.templateSection.title) {
    //       this.PlanSection.get({plan_id: this.plan._id, id: this.plan.sections[j]._id }).$promise
    //       .then((data) => {
    //         this.planSection = data;
    //       });
    //     }
    //   }
    // }
  }


  /*
   *  Preview Functions
   *
   */
  nextPage() {
    this.pages = $('.plan-page').toArray();
    if (this.page < $(this.pages).length) {
      //Prep
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      var page = this.pages[this.page - 1];

      // Fade out current page
      $(page).addClass('animated fadeOutLeft').one(animationEnd, function() {
        $(page).css('opacity', 0);
        $(page).removeClass('animated fadeOutLeft');
      });

      // Set Page
      this.page ++;
      var nextPage = this.pages[this.page - 1];

      // Fade in new page
      $(nextPage).addClass('animated fadeInRight').one(animationEnd, function() {
        $(nextPage).css('opacity', 1);
        $(nextPage).removeClass('animated fadeInRight');
      });
    }
  }

  previousPage() {
    if (this.page > 1) {

      //Prep
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      var page = this.pages[this.page - 1];

      // Fade out current page
      $(page).addClass('animated fadeOutRight').one(animationEnd, function() {
        $(page).css('opacity', 0);
        $(page).css('z-index', 0);
        $(page).removeClass('animated fadeOutRight');
      });

      // Set Page
      this.page --;
      var nextPage = this.pages[this.page - 1];

      // Fade in new page
      $(nextPage).addClass('animated fadeInLeft').one(animationEnd, function() {
        $(nextPage).css('opacity', 1);
        $(nextPage).css('z-index', 1);
        $(nextPage).removeClass('animated fadeInLeft');
      });
    }
  }

  printPlan() {
    window.print();
  }
}
angular.module('wellnessPlanApp')
  .controller('PlansController', PlansController);

})();
