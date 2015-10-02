// serwis z userami zwracający singleton

module.exports = angular.module('foosApp.services')
	.factory('UserService', function($q) {
		var UserService = {};

		UserService.getAll = function() {
			var def = $q.defer();

			def.resolve([{name: 'John'}, {name: 'Olek'}]);

			return def.promise;
		}

/*
	http requrest
	
	UserService.getAll = function(force) {
    var def = $q.defer();

    $http({
      method: 'GET',
      url: $config.API_URL + this.resource
    }).success(function(data) {
      def.resolve(data);
    }).error(function(data) {
      def.reject(data);
    });

    return def.promise;
  }
*/


		return UserService;
	});