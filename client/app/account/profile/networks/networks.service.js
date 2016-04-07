'use strict';

(function() {

class Network{

  constructor($resource) {
    this.$resource = $resource;
    return $resource('/api/networks/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });

  }

}
angular.module('wellnessPlanApp')
  .service('Network', Network);
})();
