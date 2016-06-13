'use strict';

(function() {

class Addendum{

  constructor($resource) {
    this.$resource = $resource;
    return $resource('/api/addendums/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });

  }

}
angular.module('wellnessPlanApp').service('Addendum', Addendum);
})();
