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
  });