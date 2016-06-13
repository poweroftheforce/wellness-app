'use strict';

(function() {

class MainController {

  constructor( $http, $state, $uibModal, Auth, Template, Plan, PlanSection, Modal ) {
    this.$http = $http;
    this.$state = $state;

    this.Plan = Plan;
    this.Template = Template;
    this.$uibModal = $uibModal;
    this.Modal = Modal;

    this.pageTitle = 'Dashboard';
    this.user = Auth.getCurrentUser();
    // this.plans = plans;
    this.newPlanModel = {};
    this.plans = Plan.query();

    this.deletePlan = Modal.confirm.deletePlan(plan => {
      plan.$remove();
      this.plans.splice(this.plans.indexOf(plan), 1);
    });
  }

  addPlan( form ) {
    var ctr = this;
    var counter = 0;
    this.submitted = true;
    var newPlanSections = [];
    var newPlan = new this.Plan(this.newPlanModel);
    var sections = this.template_sections;
    var $http = this.$http;
    newPlan._author_id = this.user._id;
    newPlan.$save()

    .then(( newPlan ) => {
      // Navigate to new plan
      this.$state.go('plan', {id: newPlan._id}, {reload: true});
      // this.$state.reload();
    });
  }
}

angular.module( 'wellnessPlanApp' )
  .controller( 'MainController', MainController );

})();
