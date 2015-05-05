angular.module('quotes')
.factory('AuthService', function ($http, Session) {
	var authService = {};

	authService.login = function (credentials) {
		return $http.post('/login', credentials)
		.then(function (res) {
			if(res.data.id){
				Session.create(res.data.id);
				res.data.token = 'test';
				return res.data;
			} else {
				return false;
			}
		});
	};

	authService.isAuthenticated = function () {
		return !!Session.userId;
	};

	// authService.isAuthorized = function (authorizedRoles) {
	// 	if (!angular.isArray(authorizedRoles)) {
	// 		authorizedRoles = [authorizedRoles];
	// 	}
	// 	return (authService.isAuthenticated() &&
	// 		authorizedRoles.indexOf(Session.userRole) !== -1);
	// };

	return authService;
})
.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
});