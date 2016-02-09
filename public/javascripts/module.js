angular.module('takeAHike', ['ngRoute']).config(['$routeProvider', function ($route) {
	$route
	.when('/profile', {
		templateUrl: 'html/profile.html',
		controller: 'profileCtr'
	})
	.when('/login', {
		templateUrl: 'html/login.html',
		controller: 'loginCtr'
	})
	.otherwise({
		redirectTo: '/login'
	});
}])