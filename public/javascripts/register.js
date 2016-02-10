angular.module('takeAHike').controller('registerCtr', function ($scope, $http, $location) {
	$scope.register = function () {
		$http.post('/register', {
			username: $scope.useremail,
			password: $scope.password
		}).then(function () {
			console.log('success');
			$location.path('/profile');
		}, function () {
			alert("Exists such user");
			console.log('fail');
		});
	};
});