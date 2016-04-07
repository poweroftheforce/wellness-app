'use strict';

class ProfileController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $scope, User, Pharmacy, Network, Store) {
    this.Auth = Auth;
    this.User = User;
    this.Pharmacy = Pharmacy;
    this.Network = Network;
    this.Store = Store;
    this.user = Auth.getCurrentUser();
    this.newPharmacy = {};
    this.newStore = {};
    this.newNetwork = {};

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
    console.log(this.user);
    this.Auth.updateInfo(this.user);
  }

  addPharmacy(pharmacy) {
    var self = this;
    var newPharmacy = new this.Pharmacy(pharmacy);
    newPharmacy.$save(function(data) {
      console.log(data);
      self.Auth.addPharmacyToUser(self.user, data);
    });
  }
  removePharmacy(pharmacy) {
    var self = this;
    self.Auth.removePharmacyFromUser(self.user, pharmacy);
  }

  addStore(store) {
    var self = this;
    console.log('begin adding store:');
    var newStore = new this.Store(store);
    newStore.$save(function(data) {
      self.Auth.addStoreToUser(self.user, data);
    });
  }
  removeStore(store) {
    var self = this;
    self.Auth.removeStoreFromUser(self.user, store);
  }

  addNetwork(network) {
    var self = this;
    console.log('begin adding network:');
    var newNetwork = new this.Network(network);
    newNetwork.$save(function(data) {
      self.Auth.addNetworkToUser(self.user, data);
    });
  }
  removeNetwork(network) {
    var self = this;
    self.Auth.removeNetworkFromUser(self.user, network);
  }
}

angular.module('wellnessPlanApp')
  .controller('ProfileController', ProfileController);
