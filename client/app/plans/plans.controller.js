'use strict';

(function() {

class PlansController {

  constructor($state, $cookies, Auth, plan, latestTemplate, Plan, PlanSection, $http, FocusItem, Addendum) {
    this.$state = $state;
    this.$cookies = $cookies;
    this.$http = $http;
    this.user = Auth.getCurrentUser();
    this.PlanSection = PlanSection;
    this.Plan = Plan;
    this.FocusItem = FocusItem;
    this.Addendum = Addendum;
    this.pageTitle = 'Wellness Plan';
    this.previewPages;
    this.currentPreviewPage;
    this.planSections;
    this.planSection = {};
    this.focusItems;
    this.addendums;
    this.templateSections = latestTemplate.sections.filter(function(val) {return val.is_active} );
    this.viewing = true;
    this.itemSelected = false;
    this.activate(plan);
    this.page = 1;
  }

  activate(plan) {
    var self = this;
    this.plan = plan;
    // var c_id = this.$cookies.get('ts-id');
    this.templateSection = this.templateSections[0];

    // link existing plan sections to template sections
    for (var i=0;i<this.templateSections.length;i++) {

      var section = this.templateSections[i];
      // If the user has a cookie for last edited section...
      // if (c_id) {
      //   // We need that section to be the active section
      //   if ( this.templateSections[i]._id == c_id ) {
      //     this.templateSection = this.templateSections[i];
      //   }
      // }

      // link any plan sections to their templates
      section.planSection = this.plan.sections.filter(function(val) {return val.title == section.title} )[0];
      // Add basic info for new sections.
      if (!section.planSection) {
        section.planSection = {
          title: section.title,
          _plan_id: this.plan._id,
          addendums: [],
          focusItems: []
        }
      }
      // Add editor refs
      section.planSection.intro = section.intro;
      section.planSection.is_editable = section.is_editable;
      section.planSection.has_extras = section.has_extras;
    }

    // This is probably the worst way to do this =/  ( It breaks in production )
    if (this.templateSection.has_extras && !this.focusItems || this.templateSection.has_extras && !this.addendums) {
      this.getExtras(this.templateSection.title);
    }
  }

  logSection(section) {
    console.log(section);
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
      .then((data) => {
        // this.$cookies.put('current-ts', this.currentSection._id);
        if (cb) {
           cb(data);
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

  getExtras(section) {
    var self = this;
    var query = {};

    this.selectedFocusItem = undefined;

    query[section.toLowerCase()] = true;
    self.focusItems = self.FocusItem.query(query);
    self.addendums = self.Addendum.query(query);
  }

  addFocusItem(item, section) {
    var self = this;
    // What if the section hasn't been added yet? =[

    if (section._id) {
      this.PlanSection.addFocusItem({plan_id: section._plan_id, id: section._id, focusItem_id: item._id }, item, function(data) {
        self.activate(data);
      });
    }
    else {
      section.focusItems.push(item);
      this.addSection(section, function(res) {

      });
    }
  }

  removeFocusItem(item, section) {
    var self = this;
    this.PlanSection.removeFocusItem({plan_id: section._plan_id, id: section._id, focusItem_id: item._id}, function(data) {
      self.activate(data);
    });
  }

  addAddendum(item, section) {
    var self = this;

    if (section._id) {
      this.PlanSection.addAddendum({plan_id: section._plan_id, id: section._id, addendum_id: item._id }, item, function(data) {
        self.activate(data);
      });
    }
    else {
      section.addendums.push(item);
      this.addSection(section, function(res) {

      });
    }
  }

  removeAddendum(item, section) {
    var self = this;
    this.PlanSection.removeAddendum({plan_id: section._plan_id, id: section._id, addendum_id: item._id}, function(data) {
      self.activate(data);
    });
  }

  /*
   *  Preview Functions
   *
   */
  sectionPreview(section) {
    var html = '';
    var items = section.focusItems;
    var addendums = section.addendums;

    if (section.intro) {
      html += section.intro;
    }

    if (section.comments) {
      html += section.comments;
    }

    if (items && items.length > 0) {
      for (var i=0; i<items.length; i++) {
        html += '<strong>' + items[i].title + '</strong>';
        html += items[i].description;
      }
    }

    if (section.recommendations) {
      html += '<h2 class="plan-page-sub-heading">Recommendations</h2>';
      html += section.recommendations;
    }

    if (section.nutraceuticals) {
      html += '<h2 class="plan-page-sub-heading">Nutraceuticals</h2>';
      html += section.nutraceuticals;
    }

    if (section.prescriptions) {
      html += '<h2 class="plan-page-sub-heading">Prescriptions</h2>';
      html += section.prescriptions;
    }

    if (section.references) {
      html += '<h2 class="plan-page-sub-heading">References</h2>';
      html += section.references;
    }

    if (addendums  && addendums.length > 0) {
      html += '<h2 class="plan-page-sub-heading">Addendums</h2>';
      for (var i=0; i<addendums.length; i++) {
        html += '<strong>' + addendums[i].title + '</strong>';
        html += addendums[i].description;
      }
    }

    return html;
  }

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
    this.viewing = true;
    setTimeout(function() {
      window.print();
      // this.viewing = false;
    }, 2000);

  }
}
angular.module('wellnessPlanApp')
  .controller('PlansController', PlansController);

})();
