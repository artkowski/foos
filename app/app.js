angular.module('foosApp.config', []);
angular.module('foosApp.routes', ['ui.router']);
angular.module('foosApp.services', []);

angular.module('foosApp.app', [
	'foosApp.routes',
	'foosApp.services',
	'foosApp.config'
])

.run(function($rootScope, $state) {
	$rootScope.$state = $state;
})