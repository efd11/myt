angular.module('myApp').service('MetadataService', [function () {
	var MetadataService = {};


	var metaData = {
		"user" 		: 	["name","surname"],
		"city" 		: 	["name"]
	};

	MetadataService.getPropertiesFor = function (className) {
		return (metaData[className] || [] ).slice(0);
	};

	MetadataService.getResourceList = function() {
		return [{
			key: 'users',
			value: 'Users'	
		}, {
			key: 'cities',
			value: 'Cities'	
		}];
	};

	return MetadataService;

}]);

