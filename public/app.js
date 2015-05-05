'use strict';

var quotesApp = angular.module('quotes', ['ngRoute', 'ui.bootstrap']);
  
  var userProfile = {};
  quotesApp.config(function ($httpProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/templates/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'js/templates/register.html',
        controller: 'CreateUserCtrl'
      })
      .when('/quotes', {
        templateUrl: 'js/templates/quotes.html',
        controller: 'QuotesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // var requestBuffer = 0;

    //     //start interceptor
    // var interceptor = ['$rootScope', '$q', '$log', 'httpBuffer', '$location', '$window',
    //     function($rootScope, $q, $log, httpBuffer, $location, $window, UserProfileConst) {
    //         return {
    //             response: function(response) {
    //                 requestBuffer = requestBuffer - 1;
    //                 if (requestBuffer == 0) {
                       
    //                 }
    //                 return response;
    //             },
    //             responseError: function(response) {
    //                 $log.debug('Intercepted HTTP error response');
    //                 // Auth required
    //                 if (response.status === 401 && !response.config.ignoreAuthModule) {
    //                     var deferred = $q.defer();
    //                     httpBuffer.append(response.config, deferred);

    //                     //                    if (
    //                     //                        $window.location.pathname != "/login" 
    //                     //                        && 
    //                     //                        $window.location.pathname != "/user/request-new-password"
    //                     //                        &&
    //                     //                        $window.location.pathname != "/user/password-reset"
    //                     //                    ) {
    //                     $rootScope.$broadcast('event:auth-loginRequired', $location.path());
    //                     //                    }
    //                     //$('#loading').hide();
    //                     return deferred.promise;
    //                 }
    //                 // Access denied to data
    //                 else if (response.status === 403) {
    //                     var deferred = $q.defer();
    //                     // Broadcast general access denied message
    //                     $rootScope.$broadcast('event:error-accessDenied');
    //                     // Broadcast alert mess//age
    //                     var alertMessage = new AlertMessage({
    //                         text: 'alert_msg-access_denied_patient',
    //                         severity: 'error',
    //                         errorType: 'http-403',
    //                         ttl: 10000
    //                     });
    //                     $rootScope.$broadcast('event:wizard-alert', alertMessage);
    //                     //$('#loading').hide();
    //                     return deferred.promise;
    //                 }

    //                 requestBuffer = requestBuffer - 1;
    //                 //if (requestBuffer == 0) {
    //                 //    $('#loading').hide();
    //                 //}
    //                 // otherwise, default behaviour
    //                 return $q.reject(response);
    //             }
    //         };
    //     }
    // ];
    // // Register interceptor
    // $httpProvider.interceptors.push(interceptor);
    // end interceptor

    // Register requests
    // var spinnerFunction = function(data) {
    //     // Start spinner
    //     if (requestBuffer <= 0) {
    //         $('#loading').show();
    //     }
    //     requestBuffer = requestBuffer + 1;
    //     return data;
    // };
    // $httpProvider.defaults.transformRequest.push(spinnerFunction);
  });