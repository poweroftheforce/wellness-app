'use strict';

(function() {

class Template{

  constructor($resource) {
  	this.$resource = $resource;
    return $resource('/api/templates/:id', { id: '@_id' }, {
    	update: {
    		method: 'PUT'
    	}
    });	
	}
}
angular.module('wellnessPlanApp')
  .service('Template', Template);
})();