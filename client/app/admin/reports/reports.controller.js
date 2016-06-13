'use strict';

(function() {
/*
class ReportsController {
  constructor( Report, reports, $sanitize ) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.pageTitle = 'Reports';
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
*/

/*
class ReportsController {
	constructor( Report, reports, $sanitize ) {
		this.pageTitle = 'Test';
	};
};
*/
function ReportsController() {
	this.pageTitle = 'Crap';
	
}
angular.module( 'wellnessPlanApp.admin' ).controller( 'ReportsController', ReportsController );

})();
