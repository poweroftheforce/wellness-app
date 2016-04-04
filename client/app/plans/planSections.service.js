'use strict';

(function() {

class PlanSection{

  constructor($resource) {
  	this.$resource = $resource;
    return $resource('/api/plans/:plan_id/sections/:id', { id: '@_id', plan_id: '@_plan_id' }, {
    	update: {
    		method: 'PUT'
    	},
      addFocusItem: {
        method: 'POST',
        url: '/api/plans/:plan_id/sections/:id/focusItems/:focusItem_id',
        // isArray: true
      },
      removeFocusItem: {
        method: 'DELETE',
        url: '/api/plans/:plan_id/sections/:id/focusItems/:focusItem_id',
        // isArray: true
      }
    });
	}
}
angular.module('wellnessPlanApp')
  .service('PlanSection', PlanSection);
})();
