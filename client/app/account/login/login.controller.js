'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, Util) {
    this.Auth = Auth;
    this.Util = Util;
    this.$state = $state;

    // Already logged in, redirect to dashboard
    if (this.Auth.isLoggedIn()) {
      this.$state.go('dashboard');
    }

    setInterval(function() {
      Util.changeBackground();
    }, 5000)
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
