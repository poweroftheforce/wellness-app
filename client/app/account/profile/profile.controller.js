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

  updateInfo() {
    this.submitted = true;
    this.Auth.updateInfo(this.user);
  }

  addPharmacy(pharmacy) {
    var self = this;
    var newPharmacy = new this.Pharmacy(pharmacy);
    newPharmacy.$save(function(data) {
      self.user.pharmacies.push(data);
      self.Auth.updateInfo(self.user);
      self.user = self.Auth.getCurrentUser();
      self.newPharmacy = {};
    });
  }
  removePharmacy(pharmacy) {
    var self = this;
    var idx = this.user.pharmacies.indexOf(pharmacy);
    this.user.pharmacies.splice(idx, 1);
    this.Auth.updateInfo(this.user)
    .then(() => {
      this.user = self.Auth.getCurrentUser();
    });
    // var promise = this.Pharmacy.get({id: pharmacy._id}, function(pharma) {

    // });

  }

  addStore(store) {
    var self = this;
    var newStore = new this.Store(store);
    newStore.$save(function(data) {
      self.Auth.addStoreToUser(self.user, data);
      self.newStore = {};
    });
  }
  removeStore(store) {
    var self = this;
    self.Auth.removeStoreFromUser(self.user, store);
  }

  addNetwork(network) {
    var self = this;
    var newNetwork = new this.Network(network);
    newNetwork.$save(function(data) {
      self.Auth.addNetworkToUser(self.user, data);
      self.newNetwork = {};
    });
  }
  removeNetwork(network) {
    var self = this;
    self.Auth.removeNetworkFromUser(self.user, network);
  }
}

angular.module('wellnessPlanApp')
  .controller('ProfileController', ProfileController);
