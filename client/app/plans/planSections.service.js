'use strict';

(function() {

class PlanSection{

  constructor($resource) {
  	this.$resource = $resource;
    return $resource('/api/plans/:plan_id/sections/:id', { id: '@_id', plan_id: '@_plan_id' }, {
    	update: {
    		method: 'PUT'
    	},
      updateItems: {
        method: 'PUT',
        url: '/api/plans/:plan_id/sections/:id/focusItems',
        isArray: true
      }
    });
	}
}
angular.module('wellnessPlanApp')
  .service('PlanSection', PlanSection);
})();
