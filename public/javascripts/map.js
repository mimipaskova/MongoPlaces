angular.module('takeAHike').controller('mapCtr', function ($scope, $http, $location) {
	$http.get('api/map').then(function (result) {
		$scope.places = result.data;
	});
	$scope.logout = function() {
		$http.post('/logout').then(function () {
			console.log('success');
			$location.path('/login');
		}, function () {
			console.log('fail');
		});
	},
	$scope.profile = function() {
		$http.post('/profile').then(function () {
			console.log('success');
			$location.path('/profile');
		}, function () {
			console.log('fail');
		});
	}
});