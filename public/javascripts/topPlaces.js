angular.module('takeAHike').controller('topPlacesCtr', function ($scope, $http, $location) {
	$http.get('/top').then(function (result) {
		console.log(result.data);
		$scope.types = result.data;
	});
});