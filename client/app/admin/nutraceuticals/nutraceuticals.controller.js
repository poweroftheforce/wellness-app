'use strict';

(function() {

class NutraceuticalsController {

  constructor() {
    
    this.pageTitle = 'Title';

    // I need to wrap this somewhere else (directive? decorator?).
    $('.content').css('min-height', ($(window).outerHeight() - 230));
    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 230));
    });
  }
}

angular.module('wellnessPlanApp')
  .controller('NutraceuticalsController', NutraceuticalsController);

})();