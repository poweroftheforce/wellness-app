'use strict';

(function() {

class TemplatesService{

  constructor($resource) {
    this.$resource = $resource;
    return this.$resource('/api/templates/:id');
  }
}

angular.module('wellnessPlanApp')
  .service('Template', TemplatesService);
})();