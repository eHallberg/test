angular.module('quotes').controller('MainCtrl', function(){
	console.log("MainCtrl");

}).
controller('LoginCtrl', function($scope, $location, $http, AuthService){
	console.log("LoginCtrl");
	userProfile.csrf_token = "lol";
	$scope.user = {};
	// $scope.login = function(){
	// 	// Login
	// 	console.log("#user login#", $scope.user);
	// 	// auth the user, and change path to /quotes
	// 	if($scope.user){
	// 		if($location.path() == '/'){
	// 			$location.path('/quotes');	
	// 		}
	// 	}
	// };

	$scope.login = function (credentials) {
		AuthService.login(credentials)
		.then(handleUserLogin, handleResponseError);
	};

	var handleUserLogin = function(response){
		if(response.token) {
			userProfile.token = response.token;
			$http.defaults.headers.common['X-Csrf-Token'] = userProfile.csrf_token;
			if($location.path() == '/'){
				$location.path('/quotes');	
			}
		} 
		else {
			console.log("## failed to auth");
		}
	};

	var handleResponseError = function(response){
		console.log("### handleResponseError ###");
	};

	var init = function(){
		console.log("LoginCtrl init");
	};
	init();
}).

controller('CreateUserCtrl', function($scope){
	console.log("CreateUserCtrl");
	$scope.user = {};

	$scope.createUser = function(){
		console.log("createUser", $scope.user);
		// Make a post
	};

	var init = function(){
		console.log("#CreateUserCtrl init");

	};

	init();
}).

controller('QuotesCtrl', function($scope, $http, $location, quoteService, AuthService){
		// just a test token.
		userProfile.csrf_token = "hej";
        // Append csrf token header to all posts
        $http.defaults.headers.common['X-Csrf-Token'] = userProfile.csrf_token;

        $scope.quote = {};
        $scope.user = {username: "eduhal", password: "hej"};

        // Fill dropdown with years.
        $scope.populateYearsArray = function(){
        	var min = new Date().getFullYear() - 200;
        	var range = [];
        	range.push(min);

        	for(var i=1;i<200;i++) {
        		range.push(min + i);
        	}
        	$scope.years = range;
        };

        $scope.$on("$routeUpdate", function(event, route) {
        	console.log("##routeupdate");
        });

        $scope.saveQuote = function(){
        	console.log("####", $scope.quote);
        	if($scope.createQuote.$valid){
			// post to db
			quoteService.post($scope.quote)
			.then(handleCreateQuoteResponseData, handleResponseError);
		}
		else {
			console.log("fail", $scope.createQuote);
			$scope.activateHighlight = true;
		}

	};

	$scope.openQuote = function(quote){
		quoteService.getOne(quote.id)
		.then(handleGetQuoteResponseData, handleResponseError);
	};

	var handleGetQuoteResponseData = function(response){
		$scope.quote = response.data;
	};

	var handleQuoteResponseData = function(response){
		console.log("response quotes ##", response.data);
		$scope.quotes = response.data;
	};

	var handleCreateQuoteResponseData = function(response){
		$scope.quotes.push(response.data);
		console.log(response.data);
		// 
		$scope.createQuote.$setPristine();
		$scope.createQuote.$setUntouched();
		$scope.quote = {};
		$scope.activateHighlight = false;
	};

	var handleResponseError = function(response) {
		console.log("error");
	};

	var init = function(){
		$scope.populateYearsArray();

		// if(AuthService.isAuthenticated()){
			quoteService.get($scope.user)
			.then(handleQuoteResponseData, handleResponseError);
			// Check if there is an id in url
			if($location.search().id){
				var quote = {};
				quote.id = $location.search().id;
				quoteService.getOne(quote.id)
				.then(handleGetQuoteResponseData, handleResponseError);
				$scope.showOne = true;
			}
			else {
				$scope.showOne = false;
			}

		// }
	};

	init();

});