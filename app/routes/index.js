var uiRouter = require('angular-ui-router');
// var users = require('./users.js');

// console.log(users);

var mainRoute = function($stateProvider, $urlRouterProvider) {
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
			}
		}
	}

	Lazy(main).each(function(route) {
		$stateProvider.state(route);
		console.log(route);
	});

  $urlRouterProvider.otherwise('/');

};

module.exports = angular.module('foosApp.routes', [
	uiRouter.name,
	// users.name
	])
	.config(mainRoute);