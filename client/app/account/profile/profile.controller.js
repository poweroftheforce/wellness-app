'use strict';

class ProfileController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $scope) {
    this.Auth = Auth;

    $scope.pageTitle = 'My Profile';
  }

  

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  updateInfo(form) {
    this.submitted = true;
    console.log(form);
  }
}

angular.module('wellnessPlanApp')
  .controller('ProfileController', ProfileController);
