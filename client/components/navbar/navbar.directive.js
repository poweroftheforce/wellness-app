'use strict';

angular.module(	'wellnessPlanApp' ).directive( 'navbar', () => ({
	templateUrl		: 'components/navbar/navbar.htm',
	restrict		: 'E',
	controller		: 'NavbarController',
	controllerAs	: 'nav'
}) );
