'use strict';

angular.module('wellnessPlanApp')
  .directive('footer', function () {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function(scope, element) {
        element.addClass('footer');
        $('.footer-logo').attr('src', 'assets/images/seasons-logo-green.png');
      }
    };
  });
