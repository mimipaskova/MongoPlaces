angular.module('takeAHike').controller('loginCtr', function ($scope, $http, $location) {
	$scope.login = function () {
		$http.post('/login', {
			username: $scope.useremail,
			password: $scope.password
		}).then(function () {
			console.log('success');
			$location.path('/map');
		}, function () {
			console.log('fail');
		});
	};
});