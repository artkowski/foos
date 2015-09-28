// serwis z userami zwracający singleton

angular.module('foosApp.services')
	.factory('UserService', function($q) {
		var UserService = {};

		UserService.getAll = function() {
			var def = $q.defer();

			def.resolve([{name: 'John'}, {name: 'Olek'}]);

			return def.promise;
		}

		return UserService;
	});