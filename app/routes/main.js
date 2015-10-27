var Lazy = require('lazy.js');

module.exports = /* @ngInject */ function($stateProvider, $urlRouterProvider) {
	var main = {};

	main.main = {
		name: 'main',
		abstract: true,
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
		controllerAs: 'main'
	}

	main.base = {
		name: 'base',
		parent: 'main',
		abstract: true,
		views: {
			'navbar@main': {
				templateUrl: 'views/navbar.html'
			},
			'': {
				templateUrl: 'views/base.html'
			}
		}
	}

	main.indexView = {
		name: 'indexView',
		parent: 'base',
		url: '/',
		views: {
			'content@base': {
				templateUrl: 'views/indexView.html',
				controller: 'LeaguesCtrl',
				controllerAs: 'leagues'
			}
		},
		ncyBreadcrumb: {
			label: 'Index'
		}
	}

	Lazy(main).each(function(route) {
		$stateProvider.state(route);
	});

  $urlRouterProvider.otherwise('/');

};