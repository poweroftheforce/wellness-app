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
    },
    addPharmacy: {
      method: 'POST',
      url: '/api/users/:id/pharmacies',
      params: {
        id: 'me'
      }
    },
    removePharmacy: {
      method: 'DELETE',
      url: '/api/users/:id/pharmacies/:pharmacy_id',
      params: {
        id: 'me'
      }
    },
    addNetwork: {
      method: 'POST',
      url: '/api/users/:id/networks',
      params: {
        id: 'me'
      }
    },
    removeNetwork: {
      method: 'DELETE',
      url: '/api/users/:id/networks/:network_id',
      params: {
        id: 'me'
      }
    },
    addStore: {
      method: 'POST',
      url: '/api/users/:id/stores',
      params: {
        id: 'me'
      }
    },
    removeStore: {
      method: 'DELETE',
      url: '/api/users/:id/stores/:stores_id',
      params: {
        id: 'me'
      }
    }
  });
}

angular.module('wellnessPlanApp.auth')
  .factory('User', UserResource);

})();
