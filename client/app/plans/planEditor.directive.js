'use strict';

angular.module('wellnessPlanApp')
  .directive('planEditor', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/plans/planEditor.html',
      link: function(scope, element) {
      	//Do things Here'
      	var vm = scope.vm;

      }
    };
  });
