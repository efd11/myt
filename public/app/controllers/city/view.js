angular.module('myApp').controller('ViewCityController', ['$scope', '$routeParams', '$location', 'CityService', function($scope, $routeParams, $location, CityService) {

	function init() {
		$scope.city = {
			name : null 
		
		};
		$scope.dataReceived = false;

		CityService.getDocument($routeParams.id).then(function (httpResponse) {
			$scope.city = httpResponse.data;
			$scope.dataReceived = true;
		});

	}

	$scope.gotoList = function (event) {
		$location.path('/city/');
	};	
	$scope.edit = function (event) {
		$location.path('/city/edit/' + $scope.city._id );
	};

	init();

}]);
