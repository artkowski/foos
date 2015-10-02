var Lazy = require('lazy.js');

var usersRoute = function($stateProvider) {
	var users = {};

	users.base = {
		name:'users-base',
		parent: 'base',
		url: '/users'
		// label: 'users' etc
	}

	users.users = {
		name: 'users',
		parent: 'users-base',
		url: '/',
		views: {
			'content@base': {
				templateUrl: 'modules/users/templates/users.html',
				controller: 'UsersCtrl'
			}
		}
	};

	Lazy(users).each(function(route) {
		$stateProvider.state(route);
	});

};

module.exports = angular.module('foosApp.routes.users', [])
	.config(usersRoute);