
angular.module('foosApp.routes')
	.config(function($stateProvider) {
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

	});