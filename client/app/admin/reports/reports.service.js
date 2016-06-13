'use strict';

(function() {

class Report {

	constructor( $resource ) {
		this.$resource = $resource;
		return $resource( '/api/reports/:id', { id: '@_id' }, {
			update : {
				method : 'PUT'
			}
		});
	}

};

angular.module( 'wellnessPlanApp' ).service( 'Report', Report );
})();
