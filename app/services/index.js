
module.exports = angular.module('foosApp.services', [])
	.factory('AuthService', require('./AuthService'))
	.factory('UserService', require('./UserService'))
	.factory('LeagueService', require('./LeagueService'))