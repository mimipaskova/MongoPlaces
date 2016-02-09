angular.module('takeAHike').controller('loginCtr', function ($scope, $http, $location) {
	$scope.login = function () {
		$http.post('/login', {
			blah: 3,
			username: $scope.useremail,
			password: $scope.password
		}).then(function () {
			console.log('success');
			$location.path('/profile');
		}, function () {
			console.log('fail');
		});
	};
});