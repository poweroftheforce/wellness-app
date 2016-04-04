'use strict';

(function() {

class MainController {

  constructor($http, $state, Auth, Template, Plan, PlanSection, plans) {
    this.$http = $http;
    this.$state = $state;

    this.Plan = Plan;
    this.Template = Template;

    this.pageTitle = 'Dashboard';
    this.user = Auth.getCurrentUser();
    this.plans = plans;


    // this.template_sections = template_sections;
    this.newPlanModel = {patient: {name: {first: 'John', last: 'Doe'}, dob: '01-01-76'}};

    // $http.get('/api/plans').then(response => {
    //   this.myPlans = response.data;
    // });
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
