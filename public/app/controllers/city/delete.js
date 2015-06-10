angular.module('myApp').controller('DeleteCityController', ['$scope', '$routeParams', '$location', 'CityService', function($scope, $routeParams, $location, CityService) {

	function init() {
		$scope.city = {};
		$scope.dataReceived = false;

		if($location.path() !== '/city/delete') {
			CityService.getDocument($routeParams.id).then(function (httpResponse) {
				$scope.city = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}
	}

	$scope.delete = function () {
		CityService.delete($scope.city._id).then(function () {
			$location.path('/city/');
		});
	};

	$scope.cancel = function () {
		$location.path('/city/');
	};

	init();

}]);
