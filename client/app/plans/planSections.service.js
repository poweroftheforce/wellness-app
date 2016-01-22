'use strict';

(function() {

class PlanSection{

  constructor($resource) {
  	this.$resource = $resource;
    return $resource('/api/plans/:plan_id/sections/:id', { id: '@_id', plan_id: '@plan_id' }, {
    	update: {
    		method: 'PUT'
    	}
    });	
	}
}
angular.module('wellnessPlanApp')
  .service('PlanSection', PlanSection);
})();