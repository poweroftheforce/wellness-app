'use strict';

(function() {

class Store{

  constructor($resource) {
    this.$resource = $resource;
    return $resource('/api/stores/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });

  }

}
angular.module('wellnessPlanApp')
  .service('Store', Store);
})();
