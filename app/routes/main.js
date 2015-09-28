
angular.module('foosApp.routes')
	.config(function($stateProvider, $urlRouterProvider) {
		var main = {};

		main.main = {
			name: 'main',
			abstract: true,
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		}

		main.base = {
			name: 'base',
			parent: 'main',
			abstract: true,
			views: {
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
					// controller: 'MainCtrl'
				}
			}
		}

		Lazy(main).each(function(route) {
			$stateProvider.state(route);
			console.log(route);
		});

    $urlRouterProvider.otherwise('/');

	});