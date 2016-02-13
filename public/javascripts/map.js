angular.module('takeAHike').controller('mapCtr', function ($scope, $http, $location) {
	function fetchPlaces () {
		$http.get('api/places').then(function (result) {
			$scope.places = result.data;
		});
	}

	$scope.logout = function() {
		$http.post('/logout').then(function () {
			console.log('success');
			$location.path('/login');
		}, function () {
			console.log('fail');
		});
	};
	$scope.similarPlaces = function(rating) {
		$scope.rating = rating;
	};
	$scope.addToFavourite = function(place) {
		$http.post('/favourite/' + place._id).then(fetchPlaces, function() {
			console.log('fail');
		});
	};

	fetchPlaces();
});
