require('angular-ui-router');

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
				templateUrl: 'src/users/templates/users.html',
				controller: 'UsersCtrl'
			}
		}
	};

	Lazy(users).each(function(route) {
		$stateProvider.state(route);
	});

};

module.exports = angular.module('foosApp.routes.users', ['ui.router'])
	.config(usersRoute);