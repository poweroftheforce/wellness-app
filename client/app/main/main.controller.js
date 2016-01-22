'use strict';

(function() {

class MainController {

  constructor($http, $scope, Auth, Template, TemplateSection, PlanSection) {
    this.$http = $http;
    this.user = Auth.getCurrentUser();
    this.myPlans = [];
    this.Template = Template;
    this.TemplateSection = TemplateSection;
    this.PlanSection = PlanSection;
    this.sections = [];
    this.newPlan = {firstname: 'Justin', lastname: 'Rhyne', dob: '10-1-80'};
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
    var sections = [];
    var promise = this.$http.get('/api/templates/latest');
      promise.success(function(data) {
      })  
      .then((data) => {
        var template_id = data.data[0]._id;

        var promise = this.TemplateSection.query({template_id: template_id});
        promise.$promise.then((data) => { 
          // sections = data;
          this.submitted = true;  

          if (form.$valid) {
            this.$http.post('/api/plans', { 
              patient: {
                name: {
                  first: this.newPlan.firstname, 
                  last: this.newPlan.lastname}, 
              dob: this.newPlan.dob }, 
              author: this.user._id
            })
            .catch(err => {
              err = err.data;
              this.errors = {};

              // Update validity of form fields that match the mongoose errors
              angular.forEach(err.errors, (error, field) => {
                form[field].$setValidity('mongoose', false);
                this.errors[field] = error.message;
              });
            });

            // Add sections for new plan.

          }
        });
      });
  }

  exportPlan(plan) {
    var doc = new jsPDF('p', 'pt','letter');
    var options = {
      pagesplit: true,
      dim: {
        w: 400, 
        h: 600
      }
    };

    doc.setProperties({
      title: 'NEW WELLNESS PLAN',
      author: 'admin@wellness.com',
      creator: 'Seasons Wellness'
    });

    // doc.fromHTML($('#plan-wrapper').get(0), 25, 25, {
    //   'width': 560
    // });
  
    // for (var i = 0; i<$('#plan-wrapper .plan-page').length; i++ ) {
    //   doc.addHTML($('#plan-wrapper .plan-page')[i], function() {
    //     doc.addPage();
    //   });
    // }

    doc.addHTML($('#plan-wrapper'), options, function() {
      var string = doc.output('datauristring');
      $('.plan-preview').attr('src', string);
      doc.save(plan.patient.name.last + ', ' + plan.patient.name.first + '.pdf');
    });

    // $('.plan-preview').attr('src', string);
    // doc.save(plan.patient.name.last + ', ' + plan.patient.name.first + '.pdf');
  }

  editPlan(plan) {

    // we need the latest template file for it's data.
    var version;
    var ctl = this;
    var promise = this.$http.get('/api/templates/latest');
    promise.success(function(data) {
    })  
    .then((data) => {
      version = data.data[0].version;

      var promise = this.TemplateSection.query({_template_version: version});
      promise.$promise.then((data) => { 
        this.sections = data;
        // TODO Need to make Cover active!
        this.activeSection = data[0];
      });
      
      
      this.plan = plan;
      this.viewing = false;  
      

    });
  
    
  }

  viewAllPlans() {
    this.$scope.plan = {};
  }

  deletePlan(plan) {
    this.$http.delete('/api/plans/' + plan._id);
  }

}

angular.module('wellnessPlanApp')
  .controller('MainController', MainController);

})();
