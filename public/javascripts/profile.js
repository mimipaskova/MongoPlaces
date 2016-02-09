angular.module('takeAHike').controller('profileCtr', function ($scope, $http, $location) {
	$http.get('api/profile').then(function (result) {
		$scope.user = result.data;
	});
	$scope.logout = function() {
		$http.post('/logout').then(function () {
			console.log('success');
			$location.path('/login');
		}, function () {
			console.log('fail');
		});
	}
});