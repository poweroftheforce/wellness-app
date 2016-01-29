'use strict';

(function() {

class MainController {

  constructor($http, $state, Auth, Template, Plan, PlanSection, template_sections) {
    this.$http = $http;
    this.$state = $state;
    this.user = Auth.getCurrentUser();
    this.myPlans = [];
    this.Template = Template;
    this.template_sections = template_sections;
    this.Plan = Plan;
    this.PlanSection = PlanSection;
    this.sections = [];
    this.newPlanModel = {patient: {name: {first: 'J', last: 'Rhyne'}, dob: '10-1-80'}};
    this.pageTitle = 'Dashboard';
    this.viewing = true;
    this.activeSection;

    $http.get('/api/plans').then(response => {
      this.myPlans = response.data;
    });

    $('.content').css('min-height', ($(window).outerHeight() - 230));

    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });
  }

  addPlan(form) {
    var ctr = this;
    var counter = 0;
    this.submitted = true;  
    var newPlanSections = [];
    var newPlan = new this.Plan(this.newPlanModel);
    var sections = this.template_sections;
    var $http = this.$http;
    newPlan._author_id = this.user._id;
    newPlan.$save()

    .then((newPlan) => {
      // Navigate to new plan         
      this.$state.go('plan', {id: newPlan._id}, {reload: true});
      // this.$state.reload();
    });
  }

  deletePlan(plan) {
    this.$http.delete('/api/plans/' + plan._id);
    this.$state.reload()
  }

}

angular.module('wellnessPlanApp')
  .controller('MainController', MainController);

})();
