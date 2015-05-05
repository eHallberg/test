angular.module('quotes')
.factory('httpBuffer', [
  '$injector',
  function ($injector) {
    /** Holds all the requests, so they can be re-requested in future. */
    var buffer = [];
    /** Service initialized later because of circular dependency problem. */
    var $http;
    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }
      function errorCallback(response) {
        deferred.reject(response);
      }
      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }
    return {
      append: function (config, deferred) {
        buffer.push({
          config: config,
          deferred: deferred
        });
      },
      retryAll: function () {
        for (var i = 0; i < buffer.length; ++i) {
          retryHttpRequest(buffer[i].config, buffer[i].deferred);
        }
        buffer = [];
      }
    };
  }
])
;