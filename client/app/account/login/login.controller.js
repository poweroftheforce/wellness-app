'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

    // Already logged in, redirect to dashboard
    if (this.Auth.isLoggedIn()) {
      this.$state.go('dashboard');
    }

    $('.content').css('min-height', ($(window).outerHeight() - 225));

    $(window).resize(function() {
      $('.content').css('min-height', ($(window).outerHeight() - 225));
    });
  }

  

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to dashboard
        this.$state.go('dashboard');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('wellnessPlanApp')
  .controller('LoginController', LoginController);
