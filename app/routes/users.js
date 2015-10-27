var Lazy = require('lazy.js');

module.exports = /* @ngInject */ function($stateProvider) {
	var users = {};

	users.base = {
		abstract: true,
		name:'users-base',
		parent: 'base'
	}

	users.users = {
		name: 'users',
		parent: 'users-base',
		url: '/users',
		views: {
			'content@base': {
				templateUrl: 'modules/users/templates/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'users'
			}
		},
		ncyBreadcrumb: {
			label: 'Users',
			parent: 'indexView'
		}
	};

	Lazy(users).each(function(route) {
		$stateProvider.state(route);
	});

};