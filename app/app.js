var angular = require('angular');
require('angular-ui-router');
var Lazy = require('lazy.js'),
	routes = require('./routes/index.js'),
	config = require('./assets/helpers/config.js');

console.log(routes);
console.log(config);

// angular.module('foosApp.config', []);
angular.module('foosApp.services', []);

angular.module('foosApp.app', [
	'ui.router',
	'foosApp.services',
	// 'foosApp.config',
	config.name,
	routes.name
])

.run(function($rootScope, $state, $config) {
	console.log($config);
	$rootScope.$state = $state;
})