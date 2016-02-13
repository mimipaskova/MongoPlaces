angular.module('takeAHike').controller('mapCtr', function ($scope, $http, $location) {
	var type = $location.search().type;
	var rating = $location.search().rating;
	var la = $location.search().la;
	var lo = $location.search().lo;

	function fetchPlaces () {
		var url = 'api/places';
		if (type) {
			url = '/api/map/by-type/' + type;
		} else if (rating) {
			url = '/api/map/by-rating/' + rating;
		} else if(lo && la) {
			url = '/api/map/near/' + la + '/' + lo;
		}
		return $http.get(url).then(function (result) {
			$scope.places = result.data;
			populateMap($scope.places);
		});
	}

	function initMap() {
		var sofia = {lat: 42.696465, lng: 23.322129};
			$scope.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: sofia
		});

	}

	function populateMap(places) {
		places.forEach(function (place) {
			var content = '<div id="content">'+
		      '<div id="bodyContent">'+
		      '<p>' + place.name + ' ' + place.description + '</p>'+
		      '<a href="#/map?rating=' + place.rating + '">'+
		      'Рейтинг</a> '+
		      '<a href="#/map?type=' + place.type + '">'+
		      'Тип</a> '+
		      '<a href="#/map?la=' + place.loc.coordinates[0] + '&lo=' + place.loc.coordinates[1] + '">'+
		      'Близки</a> '+
		      '</div>'+
		      '</div>';
			var placePosition = {
				lat: place.loc.coordinates[0],
				lng: place.loc.coordinates[1]
			};
			var marker = new google.maps.Marker({
			    position: placePosition,
			    map: $scope.map,
			    title: place.name
			});

			var infowindow = new google.maps.InfoWindow({
			    content: content
			});

			marker.addListener('click', function() {
				infowindow.open($scope.map, marker);
			});
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

	initMap();

	fetchPlaces();
});
