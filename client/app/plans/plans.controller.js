'use strict';

(function() {

class PlansController {

  constructor($state, $cookies, Auth, plan, latestTemplate, Plan, PlanSection, $http, FocusItem) {
    this.$state = $state;
    this.$cookies = $cookies;
    this.$http = $http;
    this.user = Auth.getCurrentUser();
    this.PlanSection = PlanSection;
    this.Plan = Plan;
    this.FocusItem = FocusItem;
    this.pageTitle = 'Wellness Plan';
    this.previewPages;
    this.currentPreviewPage;
    this.planSections;
    this.planSection = {};
    this.focusItems;
    this.templateSections = latestTemplate.sections;
    this.viewing = false;
    this.itemSelected = false;
    this.activate(plan);
    this.page = 1;
  }

  /*
   *  Editor Functions
   *
   */

  addSection(section, cb) {
    // I think this will be a slient action when edits are made.
    var newPlanSection = new this.PlanSection(section);
    newPlanSection.$save({plan_id: this.plan._id})
    .then((newSection) => {
      this.plan.sections.push(newSection._id); // this.plan.sections.push(newSection) => same result, larger request?
      this.plan.$update()
      .then(() => {
        // this.$cookies.put('current-ts', this.currentSection._id);
        if (cb) {
           cb();
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  saveSection(section) {
    var self = this;
    if (section._id) {
      self.PlanSection.update({plan_id: self.plan._id, id: section._id }, section, function() {
        //need a toaster!
        console.log('updated');
        self.plan = self.Plan.get({id: self.plan._id}, function(plan) {
          self.activate(plan);
        });

      });
    }
    else {
      self.addSection(section, function() {
        // need a toaster!
        self.plan = self.Plan.get({id: self.plan._id}, function(plan) {
          self.activate(plan);
        });
      });
    }
  }

  setSection(section) {
    var title = section.title;
    if (section.has_extras) {
      this.getExtras(title);
    }
    this.templateSection = section;
    this.$cookies.put('ts-id', section._id);
  }

  activate(plan) {
    var self = this;
    this.plan = plan;
    var c_id = this.$cookies.get('ts-id');
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
      section.planSection = this.plan.sections.filter(function(val) {return val.title == section.title} )[0];
      // Add basic info for new sections.
      if (!section.planSection) {
        section.planSection = {
          title: section.title,
          intro: section.html,
          _plan_id: this.plan._id
        }
      }
      // Add editor refs
      section.planSection.is_editable = section.is_editable;
      section.planSection.has_extras = section.has_extras;
    }

    // This is probably the worst way to do this =/
    if (this.templateSection.has_extras) {
      this.getExtras(this.templateSection.title);
    }
  }

  getExtras(section) {
    var self = this;
    var query = {};

    this.selectedFocusItem = undefined;

    query[section.toLowerCase()] = true;
    self.focusItems = self.FocusItem.query(query);
  }

  addFocusItem(item, section) {
    if (section.focusItems) {
      section.focusItems.push(item._id);
      this.saveSection(section);
    }
    else {
      section.focusItems = [];
      section.focusItems.push(item._id);
      this.saveSection(section);
    }
    this.selectedFocusItem = undefined;
  }

  removeFocusItem(item, section) {

    console.log(section);

    var index = section.focusItems.indexOf(item);
      if (index > -1) {
        section.focusItems.splice(index, 1);
      }
    // this takes a special update call.
    this.PlanSection.updateItems({plan_id: section._plan_id, id: section._id}, section);



    console.log('removed ' + item.title); // TOASTRRRRRR
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
