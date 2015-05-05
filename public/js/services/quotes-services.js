angular.module('quotes')
.factory('quoteService', function($http){
	var getAll = function(user){
		var url = '/quotes';
		return $http.get(url, { timeout: 30000 });
	};

	var get = function(id){
		var url = '/quotes/' + id;
		return $http.get(url, { timeout: 30000});
	};

	var saveItem = function(payload) {
        var url = '/quotes';
        return $http.post(url, $.param(payload), {
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    };

	var service = {
		get: getAll,
		post: saveItem,
		getOne: get
	};

	return service;

});