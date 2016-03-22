'use strict';

(function() {

class FocusItemsController {
  //start-non-standard
  item = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(FocusItem, focusItems, $sanitize) {

    this.pageTitle = 'Focus Items';
    this.FocusItem = FocusItem;
    this.focusItems = focusItems;
    this.wellnessPoints = {
      'nutrition': false,
      'exercise': false,
      'hormones': false,
      'inflammation': false,
      'detoxification': false
    }
  }

  createFocusItem(form) {
    console.log('create');
    if (form.$valid) {
      this.item = new this.FocusItem({
        title: this.newFocusItem.title,
        description: this.newFocusItem.description,
        nutrition: this.newFocusItem.nutrition,
        exercise: this.newFocusItem.exercise,
        hormones: this.newFocusItem.hormones,
        inflammation: this.newFocusItem.inflammation,
        detixification: this.newFocusItem.detixification
      });

      this.item.$save()
      .then((data) => {
        this.focusItems.push(data);

        this.resetForm();

      })
      .catch(err => {
        // this.errors = err.data.errors;
        console.log(err);
      });
    }
  }

  updateFocusItem(form) {
    console.log(this.newFocusItem.sections);
    if (form.$valid) {
      this.newFocusItem.sections = this.wellnessPoints;
      this.newFocusItem.$update()
      .then((data) => {
        this.focusItems = this.FocusItem.query();
        this.resetForm();
      });
    }


    // this.resetForm();

  }

  deleteItem(item) {
    item.$delete()
    .then((data) => {
      this.focusItems = this.FocusItem.query();
    });
  }

  resetForm() {
    this.submitted = false;
    this.item = {};
    this.editingItem = false;
    this.newFocusItem = {};
    this.showForm = false;
  }
}

angular.module('wellnessPlanApp')
  .controller('FocusItemsController', FocusItemsController);

})();
