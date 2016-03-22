'use strict';

angular.module('wellnessPlanApp')
  .directive('footer', function () {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function(scope, element) {
        element.addClass('footer');
        $('.footer-logo').attr('src', 'assets/images/seasons-logo-green.png');

        // resize content to fit window ( This needs a nice forever home )
        $('.content').css('min-height', ($(window).outerHeight() - 230));
        $(window).resize(function() {
          $('.content').css('min-height', ($(window).outerHeight() - 230));
        });
      }
    };
  });
