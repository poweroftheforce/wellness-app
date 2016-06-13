'use strict';

class NavbarController {
	//start-non-standard
	menu = [{
		'title': 'Home',
		'state': 'dashboard'
	}, {
		'title': 'About',
		'state': 'about'
	}, {
		'title': 'Tutorial',
		'state': 'tutorial'
	}, {
		'title': 'Contact',
		'state': 'contact'
	}];

	isCollapsed = true;
	//end-non-standard

	constructor(Auth) {
		this.isLoggedIn = Auth.isLoggedIn;
		this.isAdmin = Auth.isAdmin;
		this.getCurrentUser = Auth.getCurrentUser;
	}
};

angular.module( 'wellnessPlanApp' ).controller( 'NavbarController', NavbarController );
