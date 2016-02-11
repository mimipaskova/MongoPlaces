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
	},
	$scope.removePlace = function(placeId) {
		console.log(placeId);
		$http.post('/profile/removePlace').then(function () {
			placeIdToRemove: placeId,
			console.log('success');
		}, function () {
			console.log('fail');
		});
		// Delete place from user's favourite places
	},
	$scope.map = function() {
		$http.post('/map').then(function () {
			console.log('successMap');
			$location.path('/map');
		}, function () {
			console.log('fail');
		});
	}
});