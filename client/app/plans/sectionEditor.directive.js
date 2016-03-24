'use strict';

angular.module('wellnessPlanApp')
  .directive('sectionEditor', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/plans/sectionEditor.html',
      transclude: true,
      scope: {
        section: '=section',
        vm: '=ctrl'
      }
    };
  });
