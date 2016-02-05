'use strict';

(function() {

class Template{

  constructor($resource) {
  	this.$resource = $resource;
    return $resource('/api/templates/:id', { id: '@_id' }, {
    	update: {
    		method: 'PUT'
    	},
    	latest: {
    		method: 'GET',
    		url: '/api/templates/latest',
    		isArray: true
    	}
    });	

	}

}
angular.module('wellnessPlanApp')
  .service('Template', Template);
})();