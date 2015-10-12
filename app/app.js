var angular = require('angular');
// var Lazy = require('lazy.js'),
	routes = require('./routes/index.js'),
	// config = require('./assets/helpers/config.js'),
	services = require('./services'),
	modules = require('./modules');


angular.module('foosApp.app', [
	services.name,
	// config.name,
	routes.name,
	modules.name,
	require('angular-bootstrap-npm')
])

.constant("$config", {
	api_url: "http://localhost:3000/"
})


// .config(function($httpProvider) {
// 	var httpStatusCodeInterceptorFactory = function($q) {

// 	}

// 	$httpProvider.interceptors.push('');
// })

.run(function($rootScope, $state, $config) {
	console.log($config);
	$rootScope.$state = $state;
});