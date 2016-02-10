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
	.when('/register', {
		templateUrl: 'html/register.html',
		controller: 'registerCtr'
	})
	.when('/map', {
		templateUrl: 'html/map.html',
		controller: 'mapCtr'
	})
	.otherwise({
		redirectTo: '/login'
	});
}])