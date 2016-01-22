'use strict';

(function() {

class Plan{

  constructor($resource) {
  	this.$resource = $resource;
    return $resource('/api/plans/:id', { id: '@_id' }, {
    	update: {
    		method: 'PUT'
    	}
    });	
	}
}

angular.module('wellnessPlanApp')
  .service('Plan', Plan);
})();