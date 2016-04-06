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
        url: '/api/plans/:plan_id/sections/:id/focusItems/:focusItem_id'
      },
      removeFocusItem: {
        method: 'DELETE',
        url: '/api/plans/:plan_id/sections/:id/focusItems/:focusItem_id'
      },
      addAddendum: {
        method: 'POST',
        url: '/api/plans/:plan_id/sections/:id/addendums/:addendum_id'
      },
      removeAddendum: {
        method: 'DELETE',
        url: '/api/plans/:plan_id/sections/:id/addendums/:addendum_id'
      }
    });
	}
}
angular.module('wellnessPlanApp')
  .service('PlanSection', PlanSection);
})();
