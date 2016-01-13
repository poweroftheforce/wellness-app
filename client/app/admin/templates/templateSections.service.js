'use strict';

(function() {

class TemplateSection{

  constructor($resource) {
  	this.$resource = $resource;
    return $resource('/api/sections/:id', { id: '@_id' }, {
    	update: {
    		method: 'PUT'
    	}
    });	
	}
}
angular.module('wellnessPlanApp')
  .service('TemplateSection', TemplateSection);
})();