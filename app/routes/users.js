var Lazy = require('lazy.js');

module.exports = /* @ngInject */ function($stateProvider) {
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