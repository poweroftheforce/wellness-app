'use strict';

angular.module('wellnessPlanApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'login',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'login';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        resolve: {
          networks: function(Network, $log) {
            var promise = Network.query();
            return promise.$promise.then((data) => {
              return data;
            })
            .catch((error) => {
              $log.error('There was an error accessing your social networks.\n' + angular.toJson(error.data, true));
              $state.go('profile');
            });
          },

          pharmacies: function(Pharmacy, $log) {
            var promise = Pharmacy.query();
            return promise.$promise.then((data) => {
              return data;
            })
            .catch((error) => {
              $log.error('There was an error accessing your pharmacies.\n' + angular.toJson(error.data, true));
              $state.go('profile');
            });
          },

          stores: function(Store, $log) {
            var promise = Store.query();
            return promise.$promise.then((data) => {
              return data;
            })
            .catch((error) => {
              $log.error('There was an error accessing your supplement stores.\n' + angular.toJson(error.data, true));
              $state.go('profile');
            });
          }
        },
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
