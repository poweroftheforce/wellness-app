'use strict';

class ProfileController {
	//start-non-standard
	errors = {};
	submitted = false;
	//end-non-standard

	constructor(Auth, $scope, $state, User, Pharmacy, Network, Store) {
		this.$state = $state;
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

	changePassword( form ) {
		var self = this;

		self.submitted = true;
		if ( form.$valid ) {
			self.Auth.changePassword( self.user.oldPassword, self.user.newPassword )
				.then(() => {
					self.message = 'Password successfully changed.';
				})
				.catch(() => {
					form.password.$setValidity( 'mongoose', false );
					self.errors.other = 'Incorrect password';
					self.message = '';
				});
		} else {
			form.password.$setValidity( 'mongoose', false );
			self.errors.other = 'Incorrect password';
			self.message = '';
		}
	};

	updateInfo( form ) {
		var self = this;

		clog( form );

		self.submitted = true;
		self.Auth.updateInfo( self.user )
			.then(() => {
				// TOAST IT
			})
			.catch(( err ) => {
				console.log( err );
			});
	};

	addPharmacy( pharmacy ) {
		var self = this;
		var newPharmacy = new this.Pharmacy( pharmacy );

		newPharmacy.$save(function( data ) {
			self.user.pharmacies.push( data );
			self.updateInfo();
			self.newPharmacy = {};
		});
	};

	removePharmacy( pharmacy ) {
		var self = this;
		var idx = this.user.pharmacies.indexOf( pharmacy );

		this.user.pharmacies.splice( idx, 1 );
		//console.log( this.user.pharmacies );
		var promise = this.Pharmacy.get({ id : pharmacy._id }, function( pharmacy ) {
			pharmacy.$delete(function() {
				self.updateInfo();
			});
		});
	};

	addStore( store ) {
		var self = this;
		var newStore = new this.Store( store );

		newStore.$save(function( data ) {
			self.user.stores.push( data );
			self.updateInfo();
			self.newStore = {};
		});
	};

	removeStore( store ) {
		var self = this;
		var idx = this.user.stores.indexOf( store );

		this.user.stores.splice( idx, 1 );
		//console.log( this.user.stores );
		var promise = this.Store.get({ id : store._id }, function( store ) {
			store.$delete(function() {
				self.updateInfo();
			});
		});
	};

	addNetwork( network ) {
		var self = this;
		var newNetwork = new this.Network( network );

		newNetwork.$save(function( data ) {
			self.user.networks.push( data );
			self.updateInfo();
			self.newNetwork = {};
		});
	};

    removeNetwork( network ) {
        var self = this;
        var idx = this.user.networks.indexOf( network );

	    this.user.networks.splice( idx, 1 );
        //console.log(this.user.networks);
        var promise = this.Network.get({ id : network._id }, function( network ) {
            network.$delete(function() {
                self.updateInfo();
            });
        });
    };

};


angular.module( 'wellnessPlanApp' )
    .controller( 'ProfileController', ProfileController );
