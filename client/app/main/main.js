'use strict';

angular.module('wellnessPlanApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        resolve: {
          template_sections: function(Template, TemplateSection, $http) {
            var promise = Template.query({});
            return promise.$promise.then((data) => {
              var promise = TemplateSection.query({template_id: data[0]._id});
              return promise.$promise.then((data) => { 
                return data;
              })
            });
          }
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: function($scope) {
          $scope.pageTitle = 'About Seasons Wellness';
          $('.content').css('min-height', ($(window).outerHeight() - 230));

          $(window).resize(function() {
            $('.content').css('min-height', ($(window).outerHeight() - 230));
          });
        }
      })
      .state('tutorial', {
        url: '/tutorial',
        templateUrl: 'app/main/tutorial.html',
        controller: function($scope) {
          $scope.pageTitle = 'Tutorial';
          $('.content').css('min-height', ($(window).outerHeight() - 230));

          $(window).resize(function() {
            $('.content').css('min-height', ($(window).outerHeight() - 230));
          });
        }
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/main/contact.html',
        controller: function($scope) {
          $scope.pageTitle = 'Contact Us';
          $('.content').css('min-height', ($(window).outerHeight() - 230));

          $(window).resize(function() {
            $('.content').css('min-height', ($(window).outerHeight() - 230));
          });
        }
      });
  });