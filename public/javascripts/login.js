angular.module('takeAHike').controller('loginCtr', function ($scope, $http, $location) {
	$scope.login = function () {
		$http.post('/login', {
			username: $scope.useremail,
			password: $scope.password
		}).then(function () {
			console.log('success');
			$location.path('/map').search({});
		}, function () {
			alert("Wrong password or email");
			console.log('fail');
		});
	};
	$scope.register = function () {
		$location.path('/register');
	};
});