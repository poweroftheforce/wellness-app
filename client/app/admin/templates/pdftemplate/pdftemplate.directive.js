'use strict';

angular.module('wellnessPlanApp')
  .directive('pdfTemplate', function () {
    return {
      templateUrl: 'app/admin/templates/pdftemplate/pdftemplate.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
