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
		resolve: {
			Users: getUsers
		},
		ncyBreadcrumb: {
			label: 'Users',
			parent: 'indexView'
		}
	};

	function getUsers(UserService) {
		return UserService.getAll();
	}

	Lazy(users).each(function(route) {
		$stateProvider.state(route);
	});

};