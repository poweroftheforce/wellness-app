'use strict';

(function() {

class FocusItem{

  constructor($resource) {
    this.$resource = $resource;
    return $resource('/api/focusItems/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });

  }

}
angular.module('wellnessPlanApp')
  .service('FocusItem', FocusItem);
})();
