'use strict';

(function() {

class Template{

  constructor($resource) {
  	this.$resource = $resource;
    return $resource('/api/templates/:id', {
    	id: '@id'
    });
  }
}

angular.module('wellnessPlanApp')
  .service('Template', Template);
})();