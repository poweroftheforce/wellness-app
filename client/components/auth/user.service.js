'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    update: {
      method: 'PUT',
      params: {
        id:'me'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    }
  });
}

angular.module('wellnessPlanApp.auth')
  .factory('User', UserResource);

})();
