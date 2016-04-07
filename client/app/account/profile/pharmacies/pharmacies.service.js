'use strict';

(function() {

class Pharmacy{

  constructor($resource) {
    this.$resource = $resource;
    return $resource('/api/pharmacies/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });

  }

}
angular.module('wellnessPlanApp')
  .service('Pharmacy', Pharmacy);
})();
