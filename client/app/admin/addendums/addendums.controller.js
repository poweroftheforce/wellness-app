'use strict';

(function() {

class AddendumsController {
  //start-non-standard
  item = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Addendum, addendums, $sanitize) {

    this.pageTitle = 'Addendums';
    this.Addendum = Addendum;
    this.addendums = addendums;
    this.wellnessPoints = {
      'nutrition': false,
      'exercise': false,
      'hormones': false,
      'inflammation': false,
      'detoxification': false
    }
  }

  createAddendum(form) {
    console.log('create');
    if (form.$valid) {
      this.item = new this.Addendum({
        title: this.newAddendum.title,
        description: this.newAddendum.description,
        nutrition: this.newAddendum.nutrition,
        exercise: this.newAddendum.exercise,
        hormones: this.newAddendum.hormones,
        inflammation: this.newAddendum.inflammation,
        detixification: this.newAddendum.detixification
      });

      this.item.$save()
      .then((data) => {
        this.addendums.push(data);

        this.resetForm();

      })
      .catch(err => {
        // this.errors = err.data.errors;
        console.log(err);
      });
    }
  }

  updateAddendum(form) {
    console.log(this.newAddendum.sections);
    if (form.$valid) {
      this.newAddendum.sections = this.wellnessPoints;
      this.newAddendum.$update()
      .then((data) => {
        this.addendums = this.Addendum.query();
        this.resetForm();
      });
    }


    // this.resetForm();

  }

  deleteItem(item) {
    item.$delete()
    .then((data) => {
      this.addendums = this.Addendum.query();
    });
  }

  resetForm() {
    this.submitted = false;
    this.item = {};
    this.editingItem = false;
    this.newAddendum = {};
    this.showForm = false;
  }
}

angular.module('wellnessPlanApp')
  .controller('AddendumsController', AddendumsController);

})();
